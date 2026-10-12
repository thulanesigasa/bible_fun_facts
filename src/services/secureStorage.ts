import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHUNK_SIZE = 1800;
const MAX_CHUNKS = 1024;

/**
 * Storage for authentication sessions, tokens and encryption keys.
 *
 * Security invariant: NEVER downgrade a sensitive value to plaintext storage.
 * An unavailable or malfunctioning native key store is an authentication/storage
 * error, not permission to persist credentials in AsyncStorage.
 */
async function requireSecureStore(): Promise<void> {
  if (!(await SecureStore.isAvailableAsync())) {
    throw new Error('Secure storage is unavailable on this device.');
  }
}

function parseChunkCount(raw: string): number {
  const count = Number(raw);
  if (!Number.isSafeInteger(count) || count < 1 || count > MAX_CHUNKS) {
    throw new Error('Invalid secure storage chunk manifest.');
  }
  return count;
}

export const SecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    await requireSecureStore();

    const chunkCountStr = await SecureStore.getItemAsync(`${key}_chunk_count`);
    if (chunkCountStr !== null) {
      const chunkCount = parseChunkCount(chunkCountStr);
      const chunks: string[] = [];
      for (let index = 0; index < chunkCount; index++) {
        const chunk = await SecureStore.getItemAsync(`${key}_chunk_${index}`);
        if (chunk === null) {
          throw new Error('Incomplete secure storage payload.');
        }
        chunks.push(chunk);
      }
      return chunks.join('');
    }

    // Old plaintext credentials are deliberately NOT restored.
    return SecureStore.getItemAsync(key);
  },

  setItem: async (key: string, value: string): Promise<void> => {
    await requireSecureStore();

    if (value.length <= CHUNK_SIZE) {
      // Complete the encrypted write before exposing the new direct value.
      await SecureStore.setItemAsync(key, value);
      const manifest = await SecureStore.getItemAsync(`${key}_chunk_count`);
      if (manifest !== null) {
        const count = parseChunkCount(manifest);
        // Remove the manifest before deleting old chunks; readers now use key.
        await SecureStore.deleteItemAsync(`${key}_chunk_count`);
        for (let i = 0; i < count; i++) {
          await SecureStore.deleteItemAsync(`${key}_chunk_${i}`);
        }
      }
    } else {
      const count = Math.ceil(value.length / CHUNK_SIZE);
      if (count > MAX_CHUNKS) {
        throw new Error('Secure storage payload is too large.');
      }

      // Chunk writes precede the manifest. An incomplete write is not readable
      // as a valid new payload. The manifest is the visibility boundary.
      for (let i = 0; i < count; i++) {
        await SecureStore.setItemAsync(
          `${key}_chunk_${i}`,
          value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
        );
      }
      await SecureStore.setItemAsync(`${key}_chunk_count`, String(count));
      await SecureStore.deleteItemAsync(key);
    }

    // Clean up a legacy plaintext copy only after successful secure storage.
    // Failure to delete it is surfaced rather than silently ignored.
    await AsyncStorage.removeItem(key);
  },

  removeItem: async (key: string): Promise<void> => {
    await requireSecureStore();

    const manifest = await SecureStore.getItemAsync(`${key}_chunk_count`);
    await SecureStore.deleteItemAsync(key);

    if (manifest !== null) {
      const count = parseChunkCount(manifest);
      for (let i = 0; i < count; i++) {
        await SecureStore.deleteItemAsync(`${key}_chunk_${i}`);
      }
      await SecureStore.deleteItemAsync(`${key}_chunk_count`);
    }

    await AsyncStorage.removeItem(key);
  },
};

export default SecureStoreAdapter;
