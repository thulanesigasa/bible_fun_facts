import { supabase } from './supabase';
import { SecureStoreAdapter } from './secureStorage';

/**
 * Durable, per-account offline sync for idempotent study actions.
 * Not an authentication mechanism. A Supabase session must already exist.
 */
export type OfflineStudyAction =
  | 'favorite_fact'
  | 'favorite_scripture'
  | 'complete_wotd';

export interface OfflineStudyOperation {
  version: 1;
  operationId: string;
  userId: string;
  action: OfflineStudyAction;
  entityId: string;
  desired: boolean;
  createdAt: string;
  retryCount: number;
}

const MAX_PENDING = 500;
const queueKey = (userId: string) => `@exegeomai_offline_study_queue_v1:${userId}`;
let serializedTask: Promise<unknown> = Promise.resolve();

function serialize<T>(job: () => Promise<T>): Promise<T> {
  const next = serializedTask.then(job, job);
  serializedTask = next.catch(() => undefined);
  return next;
}

function newOperationId(): string {
  if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
    throw new Error('Secure random generator is unavailable for offline operation IDs.');
  }
  const b = new Uint8Array(16);
  globalThis.crypto.getRandomValues(b);
  return Array.from(b, n => n.toString(16).padStart(2, '0')).join('');
}

async function currentUserId(): Promise<string> {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session?.user?.id) {
    throw new Error('Sign in online first to use authenticated offline study.');
  }
  return session.user.id;
}

async function readQueue(userId: string): Promise<OfflineStudyOperation[]> {
  const raw = await SecureStoreAdapter.getItem(queueKey(userId));
  if (!raw) return [];
  const values: unknown = JSON.parse(raw);
  if (!Array.isArray(values) || values.length > MAX_PENDING) {
    throw new Error('Offline queue is corrupt or exceeds its safe capacity.');
  }
  return values.map((item) => {
    if (!item || item.version !== 1 || item.userId !== userId ||
        !['favorite_fact', 'favorite_scripture', 'complete_wotd'].includes(item.action) ||
        typeof item.entityId !== 'string' || typeof item.operationId !== 'string' ||
        typeof item.desired !== 'boolean') {
      throw new Error('Offline queue contains an invalid or cross-account operation.');
    }
    return item as OfflineStudyOperation;
  });
}

async function writeQueue(userId: string, queue: OfflineStudyOperation[]): Promise<void> {
  if (queue.length > MAX_PENDING) throw new Error('Offline queue is full.');
  if (queue.length === 0) {
    await SecureStoreAdapter.removeItem(queueKey(userId));
  } else {
    await SecureStoreAdapter.setItem(queueKey(userId), JSON.stringify(queue));
  }
}

async function executeOperation(operation: OfflineStudyOperation): Promise<void> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.user || session.user.id !== operation.userId) {
    throw new Error('Account changed before offline sync; refusing to submit operation.');
  }
  const config = {
    favorite_fact: { table: 'user_favorites_facts', field: 'fact_id' },
    favorite_scripture: { table: 'user_favorites_scriptures', field: 'scripture_id' },
    complete_wotd: { table: 'user_study_progress', field: 'wotd_id' },
  } as const;
  const { table, field } = config[operation.action];

  if (operation.desired) {
    const { error } = await supabase.from(table).upsert(
      { user_id: operation.userId, [field]: operation.entityId },
      { onConflict: `user_id,${field}`, ignoreDuplicates: true },
    );
    if (error) throw error;
  } else {
    const { error } = await supabase.from(table)
      .delete().eq('user_id', operation.userId).eq(field, operation.entityId);
    if (error) throw error;
  }
}

export const OfflineStudyQueue = {
  enqueue(action: OfflineStudyAction, entityId: string, desired: boolean): Promise<void> {
    return serialize(async () => {
      const userId = await currentUserId();
      if (!entityId.trim()) throw new Error('Cannot queue an empty study entity ID.');
      const queue = await readQueue(userId);
      if (queue.length >= MAX_PENDING) throw new Error('Offline queue is full. Reconnect to sync before continuing.');
      queue.push({
        version: 1,
        operationId: newOperationId(),
        userId,
        action,
        entityId,
        desired,
        createdAt: new Date().toISOString(),
        retryCount: 0,
      });
      // Persist before attempting network delivery. Offline actions remain durable.
      await writeQueue(userId, queue);
    });
  },

  flush(): Promise<{ synced: number; pending: number }> {
    return serialize(async () => {
      const userId = await currentUserId();
      const queue = await readQueue(userId);
      let synced = 0;
      while (queue.length > 0) {
        const op = queue[0];
        try {
          await executeOperation(op);
        } catch {
          op.retryCount += 1;
          await writeQueue(userId, queue);
          break;
        }
        // Server upsert/delete is idempotent; retry after crash cannot duplicate.
        queue.shift();
        synced += 1;
        await writeQueue(userId, queue);
      }
      return { synced, pending: queue.length };
    });
  },

  pendingCount(): Promise<number> {
    return serialize(async () => {
      const userId = await currentUserId();
      return (await readQueue(userId)).length;
    });
  },
};
