import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SecureStoreAdapter } from './secureStorage';

export const BIOMETRIC_LOCK_KEY = '@exegeomai_biometric_lock_enabled_v1';

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
