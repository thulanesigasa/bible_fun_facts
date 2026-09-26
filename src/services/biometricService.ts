import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SecureStoreAdapter } from './secureStorage';

export const BIOMETRIC_LOCK_KEY = '@exegeomai_biometric_lock_enabled_v1';
export const LOCK_TIMEOUT_KEY = '@exegeomai_lock_timeout_seconds_v1';
export const PRIVACY_SHIELD_KEY = '@exegeomai_privacy_shield_enabled_v1';

export interface LockTimeoutOption {
  seconds: number;
  label: string;
  description: string;
}

export const LOCK_TIMEOUT_OPTIONS: LockTimeoutOption[] = [
  { seconds: 0, label: 'Immediately', description: 'Lock as soon as app is minimized or backgrounded' },
  { seconds: 60, label: 'After 1 minute', description: 'Convenient grace period for brief app switching' },
  { seconds: 300, label: 'After 5 minutes', description: 'Balanced protection for active daily reading' },
  { seconds: 900, label: 'After 15 minutes', description: 'Extended reading session grace period' },
];

export interface BiometricStatus {
  isSupported: boolean;
  isEnrolled: boolean;
  biometricType: 'Face ID' | 'Fingerprint' | 'Iris' | 'Biometrics' | null;
}

export const BiometricService = {
  /**
   * Checks whether the device hardware supports biometrics and has enrolled records.
   */
  checkSupport: async (): Promise<BiometricStatus> => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = hasHardware ? await LocalAuthentication.isEnrolledAsync() : false;

      let biometricType: BiometricStatus['biometricType'] = null;
      if (hasHardware) {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          biometricType = 'Face ID';
        } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          biometricType = 'Fingerprint';
        } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
          biometricType = 'Iris';
        } else if (types.length > 0) {
          biometricType = 'Biometrics';
        }
      }

      return {
        isSupported: hasHardware,
        isEnrolled,
        biometricType,
      };
    } catch (e) {
      console.warn('[BiometricService] Hardware check notice:', e);
      return {
        isSupported: false,
        isEnrolled: false,
        biometricType: null,
      };
    }
  },

  /**
   * Checks whether Biometric App Lock has been toggled ON by the user.
   */
  isLockEnabled: async (): Promise<boolean> => {
    try {
      const val = await SecureStoreAdapter.getItem(BIOMETRIC_LOCK_KEY);
      return val === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Toggles Biometric App Lock ON or OFF.
   */
  setLockEnabled: async (enabled: boolean): Promise<boolean> => {
    try {
      if (enabled) {
        // Authenticate first before enabling
        const auth = await BiometricService.authenticate('Confirm Face ID / Fingerprint to enable App Lock');
        if (!auth.success) {
          return false;
        }
      }
      await SecureStoreAdapter.setItem(BIOMETRIC_LOCK_KEY, enabled ? 'true' : 'false');
      return true;
    } catch (e) {
      console.warn('[BiometricService] setLockEnabled error:', e);
      return false;
    }
  },

  /**
   * Retrieves configured inactivity timeout in seconds (default: 0 = Immediately).
   */
  getLockTimeout: async (): Promise<number> => {
    try {
      const val = await SecureStoreAdapter.getItem(LOCK_TIMEOUT_KEY);
      if (val !== null && !isNaN(Number(val))) {
        return Number(val);
      }
      return 0; // Default to Immediately
    } catch {
      return 0;
    }
  },

  /**
   * Sets inactivity timeout in seconds.
   */
  setLockTimeout: async (seconds: number): Promise<boolean> => {
    try {
      await SecureStoreAdapter.setItem(LOCK_TIMEOUT_KEY, String(seconds));
      return true;
    } catch (e) {
      console.warn('[BiometricService] setLockTimeout error:', e);
      return false;
    }
  },

  /**
   * Checks whether the App Switcher Privacy Shield is active (default: true).
   */
  isPrivacyShieldEnabled: async (): Promise<boolean> => {
    try {
      const val = await SecureStoreAdapter.getItem(PRIVACY_SHIELD_KEY);
      if (val === null) return true; // Default to true for maximum privacy
      return val === 'true';
    } catch {
      return true;
    }
  },

  /**
   * Toggles App Switcher Privacy Shield ON or OFF.
   */
  setPrivacyShieldEnabled: async (enabled: boolean): Promise<boolean> => {
    try {
      await SecureStoreAdapter.setItem(PRIVACY_SHIELD_KEY, enabled ? 'true' : 'false');
      return true;
    } catch (e) {
      console.warn('[BiometricService] setPrivacyShieldEnabled error:', e);
      return false;
    }
  },

  /**
   * Prompts native biometric prompt (Face ID / Touch ID / Android Biometric).
   */
  authenticate: async (promptMessage = 'Unlock exégeomai'): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage,
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use Device Passcode',
        disableDeviceFallback: false,
      });

      if (res.success) {
        return { success: true };
      }
      return { success: false, error: res.error || 'Authentication failed' };
    } catch (e: any) {
      console.warn('[BiometricService] Auth error:', e);
      return { success: false, error: e?.message || 'Biometric hardware unavailable' };
    }
  },
};

export default BiometricService;
