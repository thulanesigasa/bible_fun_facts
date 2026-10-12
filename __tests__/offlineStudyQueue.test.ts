import { OfflineStudyQueue } from '../src/services/offlineStudyQueue';
import { SecureStoreAdapter } from '../src/services/secureStorage';
import { supabase } from '../src/services/supabase';

jest.mock('../src/services/secureStorage', () => ({
  SecureStoreAdapter: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() },
}));
jest.mock('../src/services/supabase', () => ({
  supabase: { auth: { getSession: jest.fn() }, from: jest.fn() },
}));

const secure = SecureStoreAdapter as jest.Mocked<typeof SecureStoreAdapter>;
const client = supabase as jest.Mocked<typeof supabase>;
let activeUser: string | null;
let databaseOnline: boolean;
const saved = new Map<string, string>();
const remote = new Set<string>();

beforeEach(() => {
  jest.clearAllMocks();
  saved.clear();
  remote.clear();
  activeUser = 'account-a';
  databaseOnline = false;
  (client.auth.getSession as jest.Mock).mockImplementation(async () => ({
    data: { session: activeUser ? { user: { id: activeUser } } : null },
    error: null,
  }));
  (secure.getItem as jest.Mock).mockImplementation(async (key: string) => saved.get(key) ?? null);
  (secure.setItem as jest.Mock).mockImplementation(async (key: string, value: string) => { saved.set(key, value); });
  (secure.removeItem as jest.Mock).mockImplementation(async (key: string) => { saved.delete(key); });
  (client.from as jest.Mock).mockImplementation((table: string) => ({
    upsert: async (row: any) => {
      if (!databaseOnline) return { error: new Error('offline') };
      remote.add(`${table}:${row.user_id}:${row.fact_id || row.scripture_id || row.wotd_id}`);
      return { error: null };
    },
    delete: () => ({
      eq: (_column: string, userId: string) => ({
        eq: async (_entityColumn: string, entityId: string) => {
          if (!databaseOnline) return { error: new Error('offline') };
          remote.delete(`${table}:${userId}:${entityId}`);
          return { error: null };
        },
      }),
    }),
  }));
});

describe('OfflineStudyQueue', () => {
  it('refuses first-time unauthenticated offline mutations', async () => {
    activeUser = null;
    await expect(OfflineStudyQueue.enqueue('favorite_fact', 'f1', true))
      .rejects.toThrow(/Sign in online first/);
    expect(saved.size).toBe(0);
  });

  it('persists offline and replays idempotently after reconnect', async () => {
    await OfflineStudyQueue.enqueue('favorite_fact', 'f1', true);
    await expect(OfflineStudyQueue.pendingCount()).resolves.toBe(1);
    await expect(OfflineStudyQueue.flush()).resolves.toEqual({ synced: 0, pending: 1 });

    databaseOnline = true;
    await expect(OfflineStudyQueue.flush()).resolves.toEqual({ synced: 1, pending: 0 });
    await expect(OfflineStudyQueue.flush()).resolves.toEqual({ synced: 0, pending: 0 });
    expect(remote.size).toBe(1);
  });

  it('keeps pending operations strictly isolated between accounts', async () => {
    await OfflineStudyQueue.enqueue('favorite_scripture', 'j3v16', true);
    activeUser = 'account-b';
    expect(await OfflineStudyQueue.pendingCount()).toBe(0);
    databaseOnline = true;
    await OfflineStudyQueue.flush();
    expect(remote.size).toBe(0);
    activeUser = 'account-a';
    await OfflineStudyQueue.flush();
    expect(remote.has('user_favorites_scriptures:account-a:j3v16')).toBe(true);
  });

  it('preserves add/remove order while offline', async () => {
    await OfflineStudyQueue.enqueue('favorite_fact', 'f2', true);
    await OfflineStudyQueue.enqueue('favorite_fact', 'f2', false);
    databaseOnline = true;
    const result = await OfflineStudyQueue.flush();
    expect(result).toEqual({ synced: 2, pending: 0 });
    expect(remote.size).toBe(0);
  });
});
