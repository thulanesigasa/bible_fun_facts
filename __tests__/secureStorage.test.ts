import { SecureStoreAdapter } from '../src/services/secureStorage';
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
  (secureMock.getItemAsync as jest.Mock).mockImplementation(async (key: string) => native.get(key) ?? null);
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
});
