import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Robust, resilient encrypted storage adapter.
 * Uses Android Keystore (EncryptedSharedPreferences) and iOS Keychain via expo-secure-store.
 * Falls back gracefully to AsyncStorage if SecureStore is unavailable or if payloads exceed 2048 bytes.
 */
export const SecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable) {
        const secureValue = await SecureStore.getItemAsync(key);
        if (secureValue !== null) {
          return secureValue;
        }
      }
    } catch {
      // Fallback
    }
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    // Android SecureStore has an internal 2048-byte limit for values.
    // If payload is under 2000 chars, write to hardware-backed SecureStore.
    let secureStored = false;
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable && value.length < 2000) {
        await SecureStore.setItemAsync(key, value);
        secureStored = true;
        // Clean up legacy plain text in AsyncStorage if it existed
        await AsyncStorage.removeItem(key).catch(() => {});
      }
    } catch {
      // Fall through to AsyncStorage
    }

    if (!secureStored) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        console.warn('[SecureStorage] setItem fallback error:', e);
      }
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable) {
        await SecureStore.deleteItemAsync(key).catch(() => {});
      }
    } catch {
      // Fall through
    }
    try {
      await AsyncStorage.removeItem(key).catch(() => {});
    } catch {
      // Ignore
    }
  },
};

export default SecureStoreAdapter;
