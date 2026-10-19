import { OfflineStudyQueue } from '../src/services/offlineStudyQueue';
import { SecureStoreAdapter } from '../src/services/secureStorage';
import { supabase } from '../src/services/supabase';
import { readLocalSessionUser } from '../src/services/localSession';
import { PrivacyService } from '../src/services/privacyService';

jest.mock('../src/services/secureStorage', () => ({
  SecureStoreAdapter: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() },
}));
jest.mock('../src/services/privacyService', () => ({
  PrivacyService: { getPreferences: jest.fn(), getLocalPreferences: jest.fn() },
}));
jest.mock('../src/services/supabase', () => ({
  supabase: { auth: { getSession: jest.fn() }, from: jest.fn() },
}));

jest.mock('../src/services/localSession', () => ({ readLocalSessionUser: jest.fn() }));

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
  (readLocalSessionUser as jest.Mock).mockImplementation(async () => activeUser ? { id: activeUser } : null);
  (PrivacyService.getLocalPreferences as jest.Mock).mockImplementation(() => PrivacyService.getPreferences());
  (PrivacyService.getPreferences as jest.Mock).mockResolvedValue({
    isPrivateStudyMode: false, privateStudyNotes: false,
    isDiscoverableInSearch: false, showStreaksPublicly: false,
  });
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
      remote.add(`${table}:${row.user_id}:${row.fact_id || row.scripture_id || row.wotd_id || row.verse_key || row.achievement_id || row.id}`);
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
  it('queues completed reads, highlights, edits and removals in replay order', async () => {
    await OfflineStudyQueue.enqueue('read_fact', 'fact-10', true);
    await OfflineStudyQueue.enqueue('highlight_verse', 'GEN.1.1', true, '#FF0000');
    await OfflineStudyQueue.enqueue('highlight_verse', 'GEN.1.1', true, '#00FF00');
    await OfflineStudyQueue.enqueue('highlight_verse', 'GEN.1.1', false);
    expect(await OfflineStudyQueue.pendingCount()).toBe(4);
    databaseOnline = true;
    await expect(OfflineStudyQueue.flush()).resolves.toEqual({ synced: 4, pending: 0 });
    expect(remote.has('user_read_facts:account-a:fact-10')).toBe(true);
    expect(remote.has('user_verse_highlights:account-a:GEN.1.1')).toBe(false);
  });

  it('rejects empty or excessively large highlight payloads', async () => {
    await expect(OfflineStudyQueue.enqueue('highlight_verse', 'JHN.3.16', true, ''))
      .rejects.toThrow(/Invalid verse highlight/);
    await expect(OfflineStudyQueue.enqueue('highlight_verse', 'JHN.3.16', true, 'X'.repeat(90)))
      .rejects.toThrow(/Invalid verse highlight/);
  });
  it('durably saves and deletes note mutations under the same account', async () => {
    const noteId = 'e2c93866-5115-4112-8e26-c22de8ea9301';
    await OfflineStudyQueue.enqueueNote(noteId, 'John 3:16', 'A private reflection');
    expect(await OfflineStudyQueue.pendingCount()).toBe(1);
    databaseOnline = true;
    expect(await OfflineStudyQueue.flush()).toEqual({ synced: 1, pending: 0 });
    expect(remote.has(`study_notes:account-a:${noteId}`)).toBe(true);

    // Offline deletion is replayed only for the original owner.
    databaseOnline = false;
    await OfflineStudyQueue.enqueueNote(noteId, 'John 3:16', null);
    activeUser = 'account-b';
    expect(await OfflineStudyQueue.pendingCount()).toBe(0);
    activeUser = 'account-a';
    databaseOnline = true;
    expect(await OfflineStudyQueue.flush()).toEqual({ synced: 1, pending: 0 });
    expect(remote.has(`study_notes:account-a:${noteId}`)).toBe(false);
  });

  it('refuses invalid note identifiers or oversized local-only text', async () => {
    await expect(OfflineStudyQueue.enqueueNote('not-uuid', 'John 1:1', 'text')).rejects.toThrow(/stable UUID/);
    await expect(OfflineStudyQueue.enqueueNote('e2c93866-5115-4112-8e26-c22de8ea9301', 'John 1:1', 'a'.repeat(32001)))
      .rejects.toThrow(/Invalid offline study note/);
  });
  it('persists an earned milestone exactly once per user after reconnect', async () => {
    await OfflineStudyQueue.enqueue('earn_achievement', 'streak_7', true);
    expect(await OfflineStudyQueue.pendingCount()).toBe(1);
    databaseOnline = true;
    await expect(OfflineStudyQueue.flush()).resolves.toEqual({ synced: 1, pending: 0 });
    expect(remote.has('user_earned_achievements:account-a:streak_7')).toBe(true);
    activeUser = 'account-b';
    expect(await OfflineStudyQueue.pendingCount()).toBe(0);
    await expect(OfflineStudyQueue.flush()).resolves.toEqual({ synced: 0, pending: 0 });
    expect(remote.has('user_earned_achievements:account-b:streak_7')).toBe(false);
  });

  it('rejects attempts to remove earned milestones or use malformed IDs', async () => {
    await expect(OfflineStudyQueue.enqueue('earn_achievement', 'streak_7', false))
      .rejects.toThrow(/Invalid earned achievement/);
    await expect(OfflineStudyQueue.enqueue('earn_achievement', 'other:scope', true))
      .rejects.toThrow(/Invalid earned achievement/);
  });
  it('does not replay any pending events while private study mode is enabled', async () => {
    await OfflineStudyQueue.enqueue('favorite_fact', 'sensitive', true);
    (PrivacyService.getPreferences as jest.Mock).mockResolvedValue({
      isPrivateStudyMode: true, privateStudyNotes: true,
    });
    databaseOnline = true;
    expect(await OfflineStudyQueue.flush()).toEqual({ synced: 0, pending: 1 });
    expect(remote.size).toBe(0);
  });

  it('blocks even direct note enqueues when server notes are private', async () => {
    (PrivacyService.getPreferences as jest.Mock).mockResolvedValue({
      isPrivateStudyMode: false, privateStudyNotes: true,
    });
    await expect(OfflineStudyQueue.enqueueNote(
      'e2c93866-5115-4112-8e26-c22de8ea9301', 'John 3:16', 'keep private',
    )).rejects.toThrow(/cloud synchronization is disabled/);
    expect(await OfflineStudyQueue.pendingCount()).toBe(0);
  });

  it('retains queued note edits if the privacy setting is switched to local-only', async () => {
    const noteId = 'e2c93866-5115-4112-8e26-c22de8ea9301';
    await OfflineStudyQueue.enqueueNote(noteId, 'John 3:16', 'draft');
    (PrivacyService.getPreferences as jest.Mock).mockResolvedValue({
      isPrivateStudyMode: false, privateStudyNotes: true,
    });
    databaseOnline = true;
    expect(await OfflineStudyQueue.flush()).toEqual({ synced: 0, pending: 1 });
    expect(remote.size).toBe(0);
  });
  it('keeps scripture and fact bookmarks local when the private-notes preference is enabled', async () => {
    (PrivacyService.getPreferences as jest.Mock).mockResolvedValue({
      isPrivateStudyMode: false, privateStudyNotes: true,
    });
    await expect(OfflineStudyQueue.enqueue('favorite_fact', 'f-private', true))
      .rejects.toThrow(/remain local/);
    await expect(OfflineStudyQueue.enqueue('favorite_scripture', 's-private', true))
      .rejects.toThrow(/remain local/);
    expect(await OfflineStudyQueue.pendingCount()).toBe(0);
    expect(remote.size).toBe(0);
  });
});

it('saves new offline actions while a cloud token refresh is stalled', async () => {
  await OfflineStudyQueue.enqueue('read_fact', 'first', true);
  let resume!: (value: any) => void;
  (client.auth.getSession as jest.Mock).mockImplementationOnce(() => new Promise(resolve => { resume = resolve; }));
  const flushing = OfflineStudyQueue.flush();
  // Allow flush to reach the cloud boundary before appending locally.
  for (let i = 0; i < 30; i++) await Promise.resolve();
  await OfflineStudyQueue.enqueue('read_fact', 'second', true);
  expect(await OfflineStudyQueue.pendingCount()).toBe(2);
  resume({ data: { session: null }, error: null });
  await flushing;
  expect(await OfflineStudyQueue.pendingCount()).toBe(2);
});
