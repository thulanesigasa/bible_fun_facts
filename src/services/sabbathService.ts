/**
 * SabbathService - Digital Sabbath & Sacred Quiet Hours Engine
 *
 * Implements automated sacred rest periods and quiet hours (Genesis 2:2-3,
 * Exodus 20:8-11, Mark 2:27) that suppress non-critical push notifications
 * and telemetry broadcasts during consecrated prayer, reflection, and rest.
 */

import { SecureStoreAdapter } from './secureStorage';

export type SabbathScheduleMode =
  | 'sunday'   // The Lord's Day (Sunday 00:00 - 23:59)
  | 'saturday' // Seventh-Day Traditional Sabbath (Friday Sunset 18:00 - Saturday Sunset 18:00)
  | 'weekend'  // Friday 18:00 - Sunday 23:59
  | 'nightly'  // Nightly quiet hours (e.g. 21:00 - 07:00 every day)
  | 'custom';  // Custom selected days and hours

export interface SabbathConfig {
  isEnabled: boolean;
  mode: SabbathScheduleMode;
  startHour: number;   // 0 - 23 (e.g., 21)
  startMinute: number; // 0 - 59 (e.g., 0)
  endHour: number;     // 0 - 23 (e.g., 7)
  endMinute: number;   // 0 - 59 (e.g., 0)
  customDays: number[]; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  allowUrgentVerses: boolean; // Allow Morning Bread of Life devotion
}

export const DEFAULT_SABBATH_CONFIG: SabbathConfig = {
  isEnabled: false,
  mode: 'sunday',
  startHour: 21,
  startMinute: 0,
  endHour: 7,
  endMinute: 0,
  customDays: [0], // Default Sunday
  allowUrgentVerses: true,
};

const SABBATH_STORAGE_KEY = '@exegeomai_digital_sabbath_config_v1';

export const SabbathService = {
  /**
   * Retrieves the current Sabbath configuration from hardware-backed storage.
   */
  getConfig: async (): Promise<SabbathConfig> => {
    try {
      const stored = await SecureStoreAdapter.getItem(SABBATH_STORAGE_KEY);
      if (stored) {
        return {
          ...DEFAULT_SABBATH_CONFIG,
          ...JSON.parse(stored),
        };
      }
    } catch (err) {
      console.warn('[SabbathService] Failed to load config:', err);
    }
    return DEFAULT_SABBATH_CONFIG;
  },

  /**
   * Persists updated Sabbath configuration.
   */
  saveConfig: async (config: SabbathConfig): Promise<boolean> => {
    try {
      await SecureStoreAdapter.setItem(SABBATH_STORAGE_KEY, JSON.stringify(config));
      return true;
    } catch (err) {
      console.error('[SabbathService] Failed to save config:', err);
      return false;
    }
  },

  /**
   * Evaluates if the current moment is within the believer's consecrated Sabbath rest window.
   */
  isCurrentlySabbath: (config: SabbathConfig, now: Date = new Date()): boolean => {
    if (!config.isEnabled) return false;

    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = config.startHour * 60 + config.startMinute;
    const endMinutes = config.endHour * 60 + config.endMinute;

    switch (config.mode) {
      case 'sunday': {
        // Active all day Sunday (day 0) or during Sunday quiet hours
        return day === 0;
      }

      case 'saturday': {
        // Traditional Friday 18:00 through Saturday 18:00
        if (day === 5 && currentMinutes >= 18 * 60) return true;
        if (day === 6 && currentMinutes <= 18 * 60) return true;
        return false;
      }

      case 'weekend': {
        // Friday 18:00 through Sunday 23:59
        if (day === 5 && currentMinutes >= 18 * 60) return true;
        if (day === 6) return true;
        if (day === 0) return true;
        return false;
      }

      case 'nightly': {
        // Evaluates daily overnight quiet hours (e.g. 21:00 to 07:00)
        if (startMinutes > endMinutes) {
          // Crosses midnight
          return currentMinutes >= startMinutes || currentMinutes < endMinutes;
        } else {
          return currentMinutes >= startMinutes && currentMinutes < endMinutes;
        }
      }

      case 'custom': {
        if (!config.customDays.includes(day)) return false;
        if (startMinutes > endMinutes) {
          return currentMinutes >= startMinutes || currentMinutes < endMinutes;
        } else {
          return currentMinutes >= startMinutes && currentMinutes < endMinutes;
        }
      }

      default:
        return false;
    }
  },

  /**
   * Generates a descriptive string describing the Sabbath schedule.
   */
  formatScheduleSummary: (config: SabbathConfig): string => {
    if (!config.isEnabled) return 'Disabled';

    const pad = (n: number) => n.toString().padStart(2, '0');
    const timeRange = `${pad(config.startHour)}:${pad(config.startMinute)} – ${pad(config.endHour)}:${pad(config.endMinute)}`;

    switch (config.mode) {
      case 'sunday':
        return "The Lord's Day (Full Sunday)";
      case 'saturday':
        return 'Biblical Sabbath (Fri 18:00 – Sat 18:00)';
      case 'weekend':
        return 'Full Weekend Rest (Fri 18:00 – Sun 23:59)';
      case 'nightly':
        return `Nightly Quiet Hours (${timeRange})`;
      case 'custom':
        return `Custom Consecrated Days (${timeRange})`;
      default:
        return 'Active';
    }
  },
};
