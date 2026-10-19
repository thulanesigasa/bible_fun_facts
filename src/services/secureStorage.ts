import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Expo permits only letters, numbers, dots, dashes and underscores in keys.
// Encode logical account-scoped keys injectively; retain existing valid auth keys.
export function nativeStorageKey(key: string): string {
  return /^[A-Za-z0-9._-]+$/.test(key) && !key.startsWith('ss3_')
    ? key
    : 'ss3_' + Array.from(key).map(c => c.codePointAt(0)!.toString(16).padStart(6, '0')).join('');
}

const CHUNK_SIZE = 1800;
const MAX_CHUNKS = 1024;
type Manifest = { version: 2; bank: 0 | 1; count: number };
const manifestKey = (key: string) => `${key}_manifest_v2`;
const bankChunk = (key: string, bank: 0 | 1, index: number) =>
  `${key}_v2_${bank}_${index}`;

async function requireSecureStore(): Promise<void> {
  if (!(await SecureStore.isAvailableAsync())) {
    throw new Error('Secure storage is unavailable on this device.');
  }
}

function validateCount(raw: string): number {
  const count = Number(raw);
  if (!Number.isSafeInteger(count) || count < 1 || count > MAX_CHUNKS) {
    throw new Error('Invalid secure storage chunk manifest.');
  }
  return count;
}

function parseManifest(raw: string): Manifest {
  const value: unknown = JSON.parse(raw);
  if (typeof value !== 'object' || !value ||
      !('version' in value) || value.version !== 2 ||
      !('bank' in value) || (value.bank !== 0 && value.bank !== 1) ||
      !('count' in value) || typeof value.count !== 'number') {
    throw new Error('Invalid secure storage manifest.');
  }
  return { version: 2, bank: value.bank, count: validateCount(String(value.count)) };
}

async function getManifest(key: string): Promise<Manifest | null> {
  const raw = await SecureStore.getItemAsync(manifestKey(key));
  return raw === null ? null : parseManifest(raw);
}

async function deleteBank(key: string, bank: 0 | 1, count: number): Promise<void> {
  for (let i = 0; i < count; i++) {
    await SecureStore.deleteItemAsync(bankChunk(key, bank, i));
  }
}

// Serializes changes to each key within the process. The active bank remains
// intact until the replacement bank is fully written and committed.
const pending = new Map<string, Promise<unknown>>();
function locked<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const prev = pending.get(key) || Promise.resolve();
  const next = prev.catch(() => {}).then(fn);
  const settle = next.catch(() => {});
  pending.set(key, settle);
  void settle.then(() => { if (pending.get(key) === settle) pending.delete(key); });
  return next;
}

/** Native encrypted storage only; never use AsyncStorage for secret retrieval. */
export const SecureStoreAdapter = {
  getItem: async (logicalKey: string): Promise<string | null> => {
    const key = nativeStorageKey(logicalKey);
    await requireSecureStore();
    return locked(key, async () => {
      const active = await getManifest(key);
      if (active) {
        const parts: string[] = [];
        for (let i = 0; i < active.count; i++) {
          const part = await SecureStore.getItemAsync(bankChunk(key, active.bank, i));
          if (part === null) throw new Error('Incomplete secure storage payload.');
          parts.push(part);
        }
        return parts.join('');
      }

      // Read existing native SecureStore v1 installations for forward compatibility.
      const countRaw = await SecureStore.getItemAsync(`${key}_chunk_count`);
      if (countRaw !== null) {
        const count = validateCount(countRaw);
        const parts: string[] = [];
        for (let i = 0; i < count; i++) {
          const part = await SecureStore.getItemAsync(`${key}_chunk_${i}`);
          if (part === null) throw new Error('Incomplete secure storage payload.');
          parts.push(part);
        }
        return parts.join('');
      }
      return SecureStore.getItemAsync(key);
    });
  },

  setItem: async (logicalKey: string, value: string): Promise<void> => {
    const key = nativeStorageKey(logicalKey);
    await requireSecureStore();
    return locked(key, async () => {
      const old = await getManifest(key);
      const bank: 0 | 1 = old?.bank === 0 ? 1 : 0;
      const count = Math.max(1, Math.ceil(value.length / CHUNK_SIZE));
      if (count > MAX_CHUNKS) throw new Error('Secure storage payload is too large.');

      // Never mutate the active bank before the new manifest is committed.
      for (let i = 0; i < count; i++) {
        await SecureStore.setItemAsync(
          bankChunk(key, bank, i),
          value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
        );
      }
      await SecureStore.setItemAsync(manifestKey(key), JSON.stringify({
        version: 2, bank, count,
      } satisfies Manifest));

      // Cleanup is best-effort AFTER commit. A cleanup failure must not undo
      // a successfully published secure value or cause plaintext fallback.
      if (old) await deleteBank(key, old.bank, old.count).catch(() => {});
      const legacy = await SecureStore.getItemAsync(`${key}_chunk_count`).catch(() => null);
      if (legacy !== null) {
        const legacyCount = validateCount(legacy);
        for (let i = 0; i < legacyCount; i++) {
          await SecureStore.deleteItemAsync(`${key}_chunk_${i}`).catch(() => {});
        }
        await SecureStore.deleteItemAsync(`${key}_chunk_count`).catch(() => {});
      }
      await SecureStore.deleteItemAsync(key).catch(() => {});
      await AsyncStorage.removeItem(logicalKey);
    });
  },

  removeItem: async (logicalKey: string): Promise<void> => {
    const key = nativeStorageKey(logicalKey);
    await requireSecureStore();
    return locked(key, async () => {
      const old = await getManifest(key);
      // Hide the previous encrypted value first, then erase both banks.
      await SecureStore.deleteItemAsync(manifestKey(key));
      if (old) {
        await deleteBank(key, old.bank, old.count);
      }
      const legacy = await SecureStore.getItemAsync(`${key}_chunk_count`);
      if (legacy !== null) {
        const count = validateCount(legacy);
        for (let i = 0; i < count; i++) {
          await SecureStore.deleteItemAsync(`${key}_chunk_${i}`);
        }
        await SecureStore.deleteItemAsync(`${key}_chunk_count`);
      }
      await SecureStore.deleteItemAsync(key);
      await AsyncStorage.removeItem(logicalKey);
    });
  },
};

export default SecureStoreAdapter;
