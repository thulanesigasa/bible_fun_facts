import { SecureStoreAdapter, nativeStorageKey } from '../src/services/secureStorage';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-secure-store', () => ({
  isAvailableAsync: jest.fn(),
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const native = new Map<string, string>();
const secureMock = SecureStore as jest.Mocked<typeof SecureStore>;
const plainMock = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

beforeEach(() => {
  jest.clearAllMocks();
  native.clear();
  (secureMock.isAvailableAsync as jest.Mock).mockResolvedValue(true);
  (secureMock.getItemAsync as jest.Mock).mockImplementation(async (key: string) => {
    if (!/^[A-Za-z0-9._-]+$/.test(key)) throw Error('Invalid native key');
    return native.get(key) ?? null;
  });
  (secureMock.setItemAsync as jest.Mock).mockImplementation(async (key: string, value: string) => { native.set(key, value); });
  (secureMock.deleteItemAsync as jest.Mock).mockImplementation(async (key: string) => { native.delete(key); });
  (plainMock.removeItem as jest.Mock).mockResolvedValue(undefined);
});

describe('SecureStoreAdapter fail-closed behavior', () => {
  it('refuses to read plaintext legacy tokens', async () => {
    (plainMock.getItem as jest.Mock).mockResolvedValue('plaintext-secret');
    await expect(SecureStoreAdapter.getItem('auth-token')).resolves.toBeNull();
    expect(plainMock.getItem).not.toHaveBeenCalled();
  });

  it('never writes plaintext when secure hardware is unavailable', async () => {
    (secureMock.isAvailableAsync as jest.Mock).mockResolvedValue(false);
    await expect(SecureStoreAdapter.setItem('auth-token', 'secret')).rejects.toThrow(/unavailable/);
    expect(plainMock.setItem).not.toHaveBeenCalled();
  });

  it('does not downgrade after native write failure', async () => {
    (secureMock.setItemAsync as jest.Mock).mockRejectedValue(new Error('key store failure'));
    await expect(SecureStoreAdapter.setItem('auth-token', 'secret')).rejects.toThrow('key store failure');
    expect(plainMock.setItem).not.toHaveBeenCalled();
  });

  it('stores and reads a normal encrypted value', async () => {
    await SecureStoreAdapter.setItem('auth-token', 'encrypted-token');
    await expect(SecureStoreAdapter.getItem('auth-token')).resolves.toBe('encrypted-token');
    expect(plainMock.removeItem).toHaveBeenCalledWith('auth-token');
  });

  it('stores large values as secure chunks', async () => {
    const large = 'X'.repeat(4000);
    await SecureStoreAdapter.setItem('auth-token', large);
    await expect(SecureStoreAdapter.getItem('auth-token')).resolves.toBe(large);
    expect(plainMock.setItem).not.toHaveBeenCalled();
  });

  it('rejects incomplete secure manifests rather than returning partial secrets', async () => {
    native.set('auth-token_chunk_count', '2');
    native.set('auth-token_chunk_0', 'only-one');
    await expect(SecureStoreAdapter.getItem('auth-token')).rejects.toThrow(/Incomplete/);
  });
  it('preserves the previous committed secret when replacement chunk writing fails', async () => {
    const previous = 'A'.repeat(3900);
    await SecureStoreAdapter.setItem('auth-token', previous);
    const setter = secureMock.setItemAsync as jest.Mock;
    const original = setter.getMockImplementation()!;
    setter.mockImplementation(async (key: string, value: string) => {
      if (key.includes('_v2_1_1')) throw new Error('interrupted encrypted write');
      return original(key, value);
    });
    await expect(SecureStoreAdapter.setItem('auth-token', 'B'.repeat(3900)))
      .rejects.toThrow('interrupted encrypted write');
    expect(await SecureStoreAdapter.getItem('auth-token')).toBe(previous);
    expect(plainMock.setItem).not.toHaveBeenCalled();
  });

  it('recovers an existing native SecureStore v1 chunked value', async () => {
    native.set('old-token_chunk_count', '2');
    native.set('old-token_chunk_0', 'old-');
    native.set('old-token_chunk_1', 'secret');
    await expect(SecureStoreAdapter.getItem('old-token')).resolves.toBe('old-secret');
    await SecureStoreAdapter.setItem('old-token', 'new-secret');
    await expect(SecureStoreAdapter.getItem('old-token')).resolves.toBe('new-secret');
  });

  it('does not expose partial data if the committed manifest points to missing chunks', async () => {
    native.set('auth-token_manifest_v2', JSON.stringify({ version: 2, bank: 0, count: 2 }));
    native.set('auth-token_v2_0_0', 'first');
    await expect(SecureStoreAdapter.getItem('auth-token')).rejects.toThrow(/Incomplete/);
  });
});

  it('persists account-scoped keys under Expo native key constraints across updates/removal', async () => {
    const logical = '@exegeomai_user_data_secure_v2:account-a';
    await SecureStoreAdapter.setItem(logical, 'first');
    expect(await SecureStoreAdapter.getItem(logical)).toBe('first');
    await SecureStoreAdapter.setItem(logical, 'second');
    expect(await SecureStoreAdapter.getItem(logical)).toBe('second');
    await SecureStoreAdapter.removeItem(logical);
    expect(await SecureStoreAdapter.getItem(logical)).toBeNull();
    expect([...native.keys()].every(k => /^[A-Za-z0-9._-]+$/.test(k))).toBe(true);
    expect(nativeStorageKey(logical)).not.toBe(nativeStorageKey(nativeStorageKey(logical)));
    expect(nativeStorageKey('sb-project-auth-token')).toBe('sb-project-auth-token');
  });
