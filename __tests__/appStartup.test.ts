import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { UserProvider, useApp } from '../src/context/UserContext';
import { SecureStoreAdapter } from '../src/services/secureStorage';
import { AUTH_STORAGE_KEY } from '../src/services/localSession';
import { supabase } from '../src/services/supabase';

const mockNative = new Map<string, string>();
const mockPlain = new Map<string, string>();
const mockListeners = new Set<(event: string, session: any) => void>();
const mockForeground = new Set<(status: string) => void>();
jest.mock('react-native', () => ({ AppState: { addEventListener: (_: string, fn: any) => {
  mockForeground.add(fn); return { remove: () => mockForeground.delete(fn) };
} } }));
jest.mock('expo-secure-store', () => ({
  isAvailableAsync: async () => true,
  getItemAsync: async (key: string) => {
    if (!/^[A-Za-z0-9._-]+$/.test(key)) throw Error('Invalid native key');
    return mockNative.get(key) ?? null;
  },
  setItemAsync: async (key: string, value: string) => {
    if (!/^[A-Za-z0-9._-]+$/.test(key)) throw Error('Invalid native key');
    mockNative.set(key, value);
  },
  deleteItemAsync: async (key: string) => { mockNative.delete(key); },
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: async (key: string) => mockPlain.get(key) ?? null,
  setItem: async (key: string, value: string) => { mockPlain.set(key, value); },
  removeItem: async (key: string) => { mockPlain.delete(key); },
  multiRemove: async (keys: string[]) => { keys.forEach(k => mockPlain.delete(k)); },
}));
jest.mock('../src/services/supabase', () => ({ SUPABASE_ANON_KEY: 'test', supabase: {
  auth: {
    getSession: jest.fn(() => new Promise(() => {})),
    onAuthStateChange: (fn: any) => { mockListeners.add(fn); return { data: { subscription: { unsubscribe: () => mockListeners.delete(fn) } } }; },
    updateUser: jest.fn(async () => ({ error: null })),
    signOut: jest.fn(async () => { mockListeners.forEach(fn => fn('SIGNED_OUT', null)); return { error: null }; }),
  },
  from: jest.fn(() => ({ select: () => ({ eq: () => ({
    single: async () => ({ data: null, error: Error('offline') }),
    then: (resolve: any) => Promise.resolve({ data: null, error: Error('offline') }).then(resolve),
  }) }) })),
} }));
jest.mock('expo-notifications', () => ({ addNotificationReceivedListener: () => ({ remove: () => {} }) }));
jest.mock('expo-file-system/legacy', () => ({}));
jest.mock('expo-sharing', () => ({}));
jest.mock('../src/context/AlertContext', () => ({ useThemedAlert: () => ({ showAlert: jest.fn() }) }));
jest.mock('../src/context/AuthContext', () => ({ AuthProvider: ({ children }: any) => children }));
jest.mock('../src/context/SecurityContext', () => ({ SecurityProvider: ({ children }: any) => children }));
jest.mock('../src/context/ReaderSettingsContext', () => ({ ReaderSettingsProvider: ({ children }: any) => children }));
jest.mock('../src/context/UserDataContext', () => ({ UserDataProvider: ({ children }: any) => children }));
jest.mock('../src/services/notifications', () => ({ registerAllAutomatedNotifications: async () => {}, cancelAllAutomatedNotifications: async () => {} }));
jest.mock('../src/services/safetyService', () => ({ SafetyService: { getBlockedUserIds: async () => [] } }));
jest.mock('../src/services/biometricService', () => ({ BiometricService: {
  checkSupport: async () => ({ isSupported: false, isEnrolled: false, biometricType: null }),
  isLockEnabled: async () => false, getLockTimeout: async () => 0, isPrivacyShieldEnabled: async () => true,
} }));
jest.mock('../src/services/pinSecurityService', () => ({ PinSecurityService: { isPinSet: async () => false } }));
jest.mock('../src/services/privacyService', () => ({ PrivacyService: { getPreferences: async () => ({ isPrivateStudyMode: false }) } }));
jest.mock('../src/services/encryptionService', () => ({}));
jest.mock('../src/services/offlineStudyQueue', () => ({ OfflineStudyQueue: { enqueue: async () => {}, flush: async () => {} } }));
jest.mock('../src/services/inAppNotifications', () => ({
  getDispatchedScheduledNotifications: () => [], getUnlockedAchievementNotifications: () => [],
  getReadNotificationIds: async () => [], getDismissedNotificationIds: async () => [],
  getAchievementUnlockTimestamps: async () => ({}), getReceivedPushNotifications: async () => [],
  saveReadNotificationIds: async () => {}, saveDismissedNotificationIds: async () => {},
}));

let app: ReturnType<typeof useApp>;
let renderer: ReactTestRenderer | undefined;
const user = (id = 'account-a') => ({ id, email: `${id}@example.com`, created_at: '2026-09-25T12:00:00Z', user_metadata: { name: id } });
const key = (id = 'account-a') => `@exegeomai_user_data_secure_v2:${id}`;
function Observer() { app = useApp(); return null; }
async function settle() { await act(async () => { for (let i = 0; i < 250; i++) await Promise.resolve(); }); }
async function mount() { await act(async () => { renderer = create(React.createElement(UserProvider, null, React.createElement(Observer))); }); await settle(); }
async function unmount() { if (renderer) await act(async () => { renderer!.unmount(); renderer = undefined; }); }
async function seed(id = 'account-a', streak = 19, date = '2026-10-14') {
  await SecureStoreAdapter.setItem(AUTH_STORAGE_KEY, JSON.stringify({ access_token: 'expired', refresh_token: 'cached', user: user(id), expires_at: 1 }));
  await SecureStoreAdapter.setItem(key(id), JSON.stringify({ _authUserId: id, streak, lastLoginDate: date, favoritesFacts: [{ id: 'saved-fact' }] }));
}
beforeEach(() => {
  jest.useFakeTimers(); jest.setSystemTime(new Date('2026-10-16T10:00:00Z'));
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  mockNative.clear(); mockPlain.clear(); mockListeners.clear(); mockForeground.clear();
  jest.spyOn(console, 'error').mockImplementation((message: any, ...args: any[]) => {
    if (!String(message).includes('react-test-renderer is deprecated')) throw Error(String(message) + args.join(' '));
  });
});
afterEach(async () => { await unmount(); jest.restoreAllMocks(); jest.useRealTimers(); });

it('opens the cached account offline with expired tokens and persists 1 -> 2 -> 3 across cold starts', async () => {
  await seed(); await mount();
  expect(app.isLoadingApp).toBe(false); expect(app.userProfile?.email).toBe('account-a@example.com');
  expect(app.streak).toBe(1); expect(app.favoritesFacts[0].id).toBe('saved-fact');
  await unmount(); jest.setSystemTime(new Date('2026-10-17T10:00:00Z')); await mount();
  expect(app.streak).toBe(2);
  await unmount(); jest.setSystemTime(new Date('2026-10-18T10:00:00Z')); await mount();
  expect(app.streak).toBe(3);
  expect(app.lastLoginDate).toBe('2026-10-18');
});
it('does not show a signed-out ready state during delayed local restoration', async () => {
  await seed();
  const original = SecureStoreAdapter.getItem;
  let release!: () => void;
  jest.spyOn(SecureStoreAdapter, 'getItem').mockImplementation(async k => {
    if (k === AUTH_STORAGE_KEY) await new Promise<void>(resolve => { release = resolve; });
    return original(k);
  });
  await mount(); expect(app.isLoadingApp).toBe(true);
  release(); await settle(); expect(app.userProfile?.email).toBe('account-a@example.com'); expect(app.isLoadingApp).toBe(false);
});
it('does not unlock private content from a plaintext profile without a secure session', async () => {
  mockPlain.set('@user_profile_v1', JSON.stringify(user()));
  await mount(); expect(app.isLoadingApp).toBe(false); expect(app.userProfile).toBeNull();
});
it('advances exactly once on next-day foreground and ignores same-account auth updates', async () => {
  await seed('account-a', 2, '2026-10-16'); await mount();
  jest.setSystemTime(new Date('2026-10-17T10:00:00Z'));
  await act(async () => { mockForeground.forEach(fn => fn('active')); }); await settle();
  expect(app.streak).toBe(3);
  await act(async () => { mockListeners.forEach(fn => fn('USER_UPDATED', { user: user() })); }); await settle();
  expect(app.streak).toBe(3);
  await act(async () => { mockForeground.forEach(fn => fn('active')); }); await settle(); expect(app.streak).toBe(3);
});
it('clears local access on sign-out and isolates the next account', async () => {
  await seed(); await mount();
  await act(async () => { await app.logout(); }); await settle();
  expect(app.userProfile).toBeNull(); expect(app.favoritesFacts).toEqual([]);
  await unmount(); await mount(); expect(app.userProfile).toBeNull();
  await SecureStoreAdapter.setItem(AUTH_STORAGE_KEY, JSON.stringify({ access_token: 'new', refresh_token: 'new', user: user('account-b') }));
  await act(async () => { mockListeners.forEach(fn => fn('SIGNED_IN', { user: user('account-b') })); jest.runOnlyPendingTimers(); }); await settle();
  expect(app.userProfile?.email).toBe('account-b@example.com'); expect(app.favoritesFacts).toEqual([]); expect(app.streak).toBe(1);
});
it('reports a corrupt cache without overwriting it or asking for signup', async () => {
  await seed(); await SecureStoreAdapter.setItem(key(), 'invalid-json'); await mount();
  expect(app.startupError).toBe(true); expect(app.isLoadingApp).toBe(false);
  expect(await SecureStoreAdapter.getItem(key())).toBe('invalid-json');
});

it('restores genuine remote progress when this device has no dated local snapshot', async () => {
  await SecureStoreAdapter.setItem(AUTH_STORAGE_KEY, JSON.stringify({ access_token: 'cached', refresh_token: 'cached', user: user() }));
  (supabase.from as jest.Mock).mockImplementationOnce(() => ({ select: () => ({ eq: () => ({
    single: async () => ({ data: { streak: 19, last_login_date: '2026-10-15' }, error: null }),
  }) }) }));
  await mount(); expect(app.streak).toBe(20); expect(app.streakPendingRemote).toBe(false);
});
it('does not reopen a queued account restoration after a later sign-out', async () => {
  await mount();
  await act(async () => {
    mockListeners.forEach(fn => fn('SIGNED_IN', { user: user() }));
    mockListeners.forEach(fn => fn('SIGNED_OUT', null));
    jest.runOnlyPendingTimers();
  }); await settle(); expect(app.userProfile).toBeNull();
});
