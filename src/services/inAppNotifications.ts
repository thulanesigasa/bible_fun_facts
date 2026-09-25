import AsyncStorage from '@react-native-async-storage/async-storage';
import { InAppNotificationItem } from '../types/inAppNotifications';
import {
  getDayOfYear,
  MORNING_365_SCRIPTURES,
  DIVINE_LOVE_365_AFFIRMATIONS,
  NIGHTLY_PEACE_365_SCRIPTURES,
  EVENING_FELLOWSHIP_365_PROMPTS,
} from '../data/notificationVerses';
import { ALL_ACHIEVEMENTS } from '../data/achievements';

const READ_NOTIFICATION_IDS_KEY = '@exegeomai_read_notification_ids';
const DISMISSED_NOTIFICATION_IDS_KEY = '@exegeomai_dismissed_notification_ids';

/**
 * Builds the list of scheduled devotions dispatched by the automated push system
 * up to the current time, so the user can review them inside the app.
 */
export function getDispatchedScheduledNotifications(dayOfYearOverride?: number): InAppNotificationItem[] {
  const now = new Date();
  const currentDay = dayOfYearOverride ?? getDayOfYear();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const items: InAppNotificationItem[] = [];

  // 1. Morning Word (Dispatched at 08:00 AM)
  if (currentHour >= 8) {
    const morning = MORNING_365_SCRIPTURES[(currentDay - 1 + 365) % MORNING_365_SCRIPTURES.length];
    const morningDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
    items.push({
      id: `scheduled_morning_${currentDay}_${now.getFullYear()}`,
      type: 'morning_word',
      title: 'Morning Word & Devotion',
      subtitle: `Dispatched Today at 08:00 AM • ${morning.theme}`,
      body: `"${morning.text}"`,
      scriptureRef: morning.ref,
      verseQuote: morning.text,
      createdAt: morningDate.toISOString(),
      isRead: false,
      actionRoute: 'WOTD',
    });
  }

  // 2. Midday God's Love & Identity Affirmation (Dispatched at 13:15 / 1:15 PM)
  if (currentHour > 13 || (currentHour === 13 && currentMinute >= 15)) {
    const midday = DIVINE_LOVE_365_AFFIRMATIONS[(currentDay - 1 + 365) % DIVINE_LOVE_365_AFFIRMATIONS.length];
    const middayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 15, 0);
    items.push({
      id: `scheduled_midday_${currentDay}_${now.getFullYear()}`,
      type: 'midday_affirmation',
      title: "God's Love & Identity Affirmation",
      subtitle: `Dispatched Today at 13:15 • ${midday.title}`,
      body: `"${midday.body}"`,
      scriptureRef: midday.reference,
      verseQuote: midday.body,
      createdAt: middayDate.toISOString(),
      isRead: false,
      actionRoute: 'WOTD',
    });
  }

  // 3. Afternoon Motivation & Strength (Dispatched at 16:30 / 4:30 PM)
  if (currentHour > 16 || (currentHour === 16 && currentMinute >= 30)) {
    const afternoonIdx = (currentDay - 1 + 182) % DIVINE_LOVE_365_AFFIRMATIONS.length;
    const afternoon = DIVINE_LOVE_365_AFFIRMATIONS[afternoonIdx];
    const afternoonDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 30, 0);
    items.push({
      id: `scheduled_afternoon_${currentDay}_${now.getFullYear()}`,
      type: 'afternoon_strength',
      title: 'Afternoon Strength & Encouragement',
      subtitle: `Dispatched Today at 16:30 • ${afternoon.title}`,
      body: `"${afternoon.body}"`,
      scriptureRef: afternoon.reference,
      verseQuote: afternoon.body,
      createdAt: afternoonDate.toISOString(),
      isRead: false,
      actionRoute: 'WOTD',
    });
  }

  // 4. Evening Fellowship with Christ (Dispatched at 20:30 / 8:30 PM)
  if (currentHour > 20 || (currentHour === 20 && currentMinute >= 30)) {
    const evening = EVENING_FELLOWSHIP_365_PROMPTS[(currentDay - 1 + 365) % EVENING_FELLOWSHIP_365_PROMPTS.length];
    const eveningDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 30, 0);
    items.push({
      id: `scheduled_evening_${currentDay}_${now.getFullYear()}`,
      type: 'evening_fellowship',
      title: 'Evening Fellowship with Christ',
      subtitle: `Dispatched Today at 20:30 • ${evening.title}`,
      body: `"${evening.body}"`,
      scriptureRef: evening.title,
      createdAt: eveningDate.toISOString(),
      isRead: false,
      actionRoute: 'DiscoverMain',
    });
  }

  // 5. Nightly Scripture of Peace (Dispatched at 22:00 / 10:00 PM)
  if (currentHour >= 22) {
    const nightly = NIGHTLY_PEACE_365_SCRIPTURES[(currentDay - 1 + 365) % NIGHTLY_PEACE_365_SCRIPTURES.length];
    const nightlyDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0);
    items.push({
      id: `scheduled_nightly_${currentDay}_${now.getFullYear()}`,
      type: 'nightly_peace',
      title: 'Nightly Scripture of Peace',
      subtitle: `Dispatched Tonight at 22:00 • ${nightly.theme}`,
      body: `"${nightly.text}"`,
      scriptureRef: nightly.ref,
      verseQuote: nightly.text,
      createdAt: nightlyDate.toISOString(),
      isRead: false,
      actionRoute: 'WOTD',
    });
  }

  // Also include yesterday's evening fellowship & nightly peace if morning has started
  if (currentHour < 12) {
    const yesterday = (currentDay - 2 + 365) % 365;
    const yEvening = EVENING_FELLOWSHIP_365_PROMPTS[yesterday % EVENING_FELLOWSHIP_365_PROMPTS.length];
    const yEveningDate = new Date(now.getTime() - 14 * 60 * 60 * 1000);
    items.push({
      id: `scheduled_evening_${yesterday}_yesterday`,
      type: 'evening_fellowship',
      title: 'Evening Fellowship with Christ',
      subtitle: `Dispatched Yesterday at 20:30 • ${yEvening.title}`,
      body: `"${yEvening.body}"`,
      scriptureRef: yEvening.title,
      createdAt: yEveningDate.toISOString(),
      isRead: false,
      actionRoute: 'DiscoverMain',
    });
  }

  return items;
}

/**
 * Builds unlocked achievement notification items based on user statistics.
 */
export function getUnlockedAchievementNotifications(stats: {
  streak: number;
  bookmarksCount: number;
  highlightsCount: number;
  sharesCount: number;
}): InAppNotificationItem[] {
  const notifications: InAppNotificationItem[] = [];

  const checkCategory = (
    category: 'streak' | 'bookmark' | 'highlight' | 'share',
    count: number
  ) => {
    const milestones = ALL_ACHIEVEMENTS[category] || [];
    milestones.forEach((m) => {
      if (count >= m.target) {
        notifications.push({
          id: `achievement_${m.id}`,
          type: 'achievement',
          title: `Achievement Unlocked: ${m.title}`,
          subtitle: `${m.badgeLabel} Milestone (${m.target} ${m.target === 1 ? 'target' : 'targets'}) • ${m.tier.toUpperCase()}`,
          body: m.subtitle,
          scriptureRef: m.verseRef,
          verseQuote: m.verseQuote,
          achievementId: m.id,
          achievementCategory: m.category,
          achievementTarget: m.target,
          createdAt: new Date().toISOString(),
          isRead: false,
          actionRoute: 'Achievements',
        });
      }
    });
  };

  checkCategory('streak', stats.streak || 1);
  checkCategory('bookmark', stats.bookmarksCount || 0);
  checkCategory('highlight', stats.highlightsCount || 0);
  checkCategory('share', stats.sharesCount || 0);

  return notifications;
}

/**
 * Read and Dismissal Persistence
 */
export async function getReadNotificationIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(READ_NOTIFICATION_IDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveReadNotificationIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(READ_NOTIFICATION_IDS_KEY, JSON.stringify(ids));
  } catch (err) {
    console.warn('[Notifications] Failed to save read IDs:', err);
  }
}

export async function getDismissedNotificationIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(DISMISSED_NOTIFICATION_IDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveDismissedNotificationIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(DISMISSED_NOTIFICATION_IDS_KEY, JSON.stringify(ids));
  } catch (err) {
    console.warn('[Notifications] Failed to save dismissed IDs:', err);
  }
}
