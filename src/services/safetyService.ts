import AsyncStorage from '@react-native-async-storage/async-storage';

export const BLOCKED_USERS_STORAGE_KEY = '@exegeomai_blocked_users_v1';
export const SAFETY_REPORTS_STORAGE_KEY = '@exegeomai_safety_reports_v1';

export interface SafetyReport {
  id: string;
  targetId: string;
  targetType: 'user' | 'scholar' | 'comment' | 'reflection';
  targetName?: string;
  reason: 'harassment' | 'inappropriate' | 'spam' | 'impersonation' | 'other';
  details?: string;
  createdAt: string;
  status: 'pending_review' | 'resolved';
}

export const SafetyService = {
  /**
   * Retrieves the list of blocked user IDs from storage.
   */
  getBlockedUserIds: async (): Promise<string[]> => {
    try {
      const raw = await AsyncStorage.getItem(BLOCKED_USERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Blocks a user by adding their ID to blocked list.
   */
  blockUser: async (userId: string): Promise<string[]> => {
    try {
      const current = await SafetyService.getBlockedUserIds();
      if (!current.includes(userId)) {
        const updated = [...current, userId];
        await AsyncStorage.setItem(BLOCKED_USERS_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
      return current;
    } catch (e) {
      console.warn('[SafetyService] Block user error:', e);
      return [];
    }
  },

  /**
   * Unblocks a user by removing their ID from the blocked list.
   */
  unblockUser: async (userId: string): Promise<string[]> => {
    try {
      const current = await SafetyService.getBlockedUserIds();
      const updated = current.filter((id) => id !== userId);
      await AsyncStorage.setItem(BLOCKED_USERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn('[SafetyService] Unblock user error:', e);
      return [];
    }
  },

  /**
   * Submits a safety or moderation report against a user, profile, or contribution.
   */
  submitReport: async (
    targetId: string,
    targetType: 'user' | 'scholar' | 'comment' | 'reflection',
    reason: SafetyReport['reason'],
    targetName?: string,
    details?: string
  ): Promise<SafetyReport> => {
    const newReport: SafetyReport = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      targetId,
      targetType,
      targetName,
      reason,
      details,
      createdAt: new Date().toISOString(),
      status: 'pending_review',
    };

    try {
      const raw = await AsyncStorage.getItem(SAFETY_REPORTS_STORAGE_KEY);
      const reports: SafetyReport[] = raw ? JSON.parse(raw) : [];
      reports.unshift(newReport);
      await AsyncStorage.setItem(SAFETY_REPORTS_STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.warn('[SafetyService] Submit report error:', e);
    }

    return newReport;
  },

  /**
   * Retrieves all filed reports.
   */
  getReports: async (): Promise<SafetyReport[]> => {
    try {
      const raw = await AsyncStorage.getItem(SAFETY_REPORTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
};

export default SafetyService;
