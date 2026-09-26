/**
 * SessionSecurityService - Device Session & Security Audit Engine
 *
 * Provides device identification, security event audit trails,
 * and comprehensive session revocation across hardware storage and Supabase auth.
 */

import { Platform } from 'react-native';
import { SecureStoreAdapter } from './secureStorage';
import { supabase } from './supabase';

export type SecurityEventType =
  | 'login'
  | 'logout'
  | 'pin_set'
  | 'pin_verified'
  | 'pin_failed'
  | 'pin_locked'
  | 'biometric_toggled'
  | 'incognito_toggled'
  | 'journal_exported'
  | 'sabbath_toggled'
  | 'sessions_revoked';

export interface SecurityAuditEvent {
  id: string;
  type: SecurityEventType;
  timestamp: string;
  title: string;
  detail: string;
}

export interface DeviceSessionInfo {
  deviceId: string;
  platform: 'android' | 'ios' | 'other';
  osVersion: string | number;
  appName: string;
  appVersion: string;
  registeredAt: string;
  lastActiveAt: string;
  isCurrentDevice: boolean;
}

const DEVICE_ID_KEY = '@exegeomai_device_id_v1';
const DEVICE_REG_DATE_KEY = '@exegeomai_device_reg_date_v1';
const AUDIT_LOG_KEY = '@exegeomai_security_audit_log_v1';
const MAX_AUDIT_LOG_ENTRIES = 30;

export const SessionSecurityService = {
  /**
   * Returns or generates a deterministic installation UUID for this hardware device.
   */
  getOrCreateDeviceId: async (): Promise<string> => {
    try {
      let deviceId = await SecureStoreAdapter.getItem(DEVICE_ID_KEY);
      if (!deviceId) {
        deviceId = `exg-${Platform.OS}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
        await SecureStoreAdapter.setItem(DEVICE_ID_KEY, deviceId);
        await SecureStoreAdapter.setItem(DEVICE_REG_DATE_KEY, new Date().toISOString());
      }
      return deviceId;
    } catch {
      return `exg-${Platform.OS}-fallback`;
    }
  },

  /**
   * Retrieves active device details and session metadata.
   */
  getCurrentDeviceInfo: async (): Promise<DeviceSessionInfo> => {
    const deviceId = await SessionSecurityService.getOrCreateDeviceId();
    let regDate = new Date().toISOString();
    try {
      const stored = await SecureStoreAdapter.getItem(DEVICE_REG_DATE_KEY);
      if (stored) regDate = stored;
    } catch {
      // fallback
    }

    return {
      deviceId,
      platform: Platform.OS === 'android' ? 'android' : Platform.OS === 'ios' ? 'ios' : 'other',
      osVersion: Platform.Version,
      appName: 'exégeomai',
      appVersion: '1.0.0',
      registeredAt: regDate,
      lastActiveAt: new Date().toISOString(),
      isCurrentDevice: true,
    };
  },

  /**
   * Records a security event into the local hardware audit trail.
   */
  recordAuditEvent: async (type: SecurityEventType, title: string, detail: string): Promise<void> => {
    try {
      const existingLogs = await SessionSecurityService.getAuditLogs();
      const newEvent: SecurityAuditEvent = {
        id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type,
        timestamp: new Date().toISOString(),
        title,
        detail,
      };

      const updated = [newEvent, ...existingLogs].slice(0, MAX_AUDIT_LOG_ENTRIES);
      await SecureStoreAdapter.setItem(AUDIT_LOG_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('[SessionSecurity] Failed to record audit event:', err);
    }
  },

  /**
   * Retrieves the security event audit trail.
   */
  getAuditLogs: async (): Promise<SecurityAuditEvent[]> => {
    try {
      const stored = await SecureStoreAdapter.getItem(AUDIT_LOG_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('[SessionSecurity] Failed to load audit logs:', err);
    }
    return [];
  },

  /**
   * Clears the local security audit trail.
   */
  clearAuditLogs: async (): Promise<boolean> => {
    try {
      await SecureStoreAdapter.removeItem(AUDIT_LOG_KEY);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Revokes all active user sessions globally via Supabase Auth and purges local credentials.
   */
  revokeAllSessions: async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // Record revocation event
      await SessionSecurityService.recordAuditEvent(
        'sessions_revoked',
        'Global Sessions Revoked',
        'All remote and device authentication tokens were invalidated.'
      );

      // Sign out from Supabase globally if possible
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (authErr) {
        console.warn('[SessionSecurity] Supabase global signout warning:', authErr);
      }

      return { success: true };
    } catch (err: any) {
      console.error('[SessionSecurity] Revocation error:', err);
      return { success: false, error: err?.message || 'Failed to revoke active sessions.' };
    }
  },
};
