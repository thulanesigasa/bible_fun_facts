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
const RECEIVED_PUSH_NOTIFICATIONS_KEY = '@exegeomai_received_push_notifications';
const ACHIEVEMENT_TIMESTAMPS_KEY = '@exegeomai_achievement_unlock_timestamps';

/**
 * Parses canonical book name, chapter number, and verse number from a reference string
 * such as "Psalm 119:105", "1 John 4:19", "Romans 8:38-39", or "Lamentations 3:22-23".
 */
export function parseScriptureCoordinates(ref?: string): { book: string; chapter: number; verse: number } | null {
  if (!ref) return null;
  const cleaned = ref.trim();
  const match = cleaned.match(/^([\d\s]*[A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(\d+)[:\.](\d+)/);
  if (!match) return null;

  let book = match[1].trim();
  if (book === 'Psalm') book = 'Psalms';
  const chapter = parseInt(match[2], 10) || 1;
  const verse = parseInt(match[3], 10) || 1;
  return { book, chapter, verse };
}

/**
 * Formats a real-life human-readable delivery label such as "Today at 08:00 AM" or "Yesterday at 22:00".
 */
export function formatDeliveryLabel(date: Date): string {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  if (isToday) {
    return `Today at ${timeStr}`;
  }
  if (isYesterday) {
    return `Yesterday at ${timeStr}`;
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} at ${timeStr}`;
}

/**
 * Builds the real-life list of scheduled devotions dispatched by the automated push system
 * over the past rolling 7 days up to the current moment.
 */
export function getDispatchedScheduledNotifications(daysBack: number = 7): InAppNotificationItem[] {
  const now = new Date();
  const items: InAppNotificationItem[] = [];

  for (let offset = 0; offset < daysBack; offset++) {
    const dayDate = new Date(now.getTime() - offset * 24 * 60 * 60 * 1000);
    const dayYear = dayDate.getFullYear();
    const calDayOfYear = getDayOfYear(dayDate);

    const morningData = MORNING_365_SCRIPTURES[(calDayOfYear - 1 + 365) % MORNING_365_SCRIPTURES.length];
    const middayData = DIVINE_LOVE_365_AFFIRMATIONS[(calDayOfYear - 1 + 365) % DIVINE_LOVE_365_AFFIRMATIONS.length];
    const afternoonIdx = (calDayOfYear - 1 + 182) % DIVINE_LOVE_365_AFFIRMATIONS.length;
    const afternoonData = DIVINE_LOVE_365_AFFIRMATIONS[afternoonIdx];
    const eveningData = EVENING_FELLOWSHIP_365_PROMPTS[(calDayOfYear - 1 + 365) % EVENING_FELLOWSHIP_365_PROMPTS.length];
    const nightlyData = NIGHTLY_PEACE_365_SCRIPTURES[(calDayOfYear - 1 + 365) % NIGHTLY_PEACE_365_SCRIPTURES.length];

    const slots = [
      {
        hour: 8,
        minute: 0,
        type: 'morning_word' as const,
        title: `Morning Word: ${morningData.theme}`,
        ref: morningData.ref,
        text: morningData.text,
      },
      {
        hour: 13,
        minute: 15,
        type: 'midday_affirmation' as const,
        title: `God's Love: ${middayData.title}`,
        ref: middayData.reference,
        text: middayData.body,
      },
      {
        hour: 16,
        minute: 30,
        type: 'afternoon_strength' as const,
        title: `Afternoon Strength: ${afternoonData.title}`,
        ref: afternoonData.reference,
        text: afternoonData.body,
      },
      {
        hour: 20,
        minute: 30,
        type: 'evening_fellowship' as const,
        title: `Fellowship with Christ: ${eveningData.title}`,
        ref: eveningData.title,
        text: eveningData.body,
      },
      {
        hour: 22,
        minute: 0,
        type: 'nightly_peace' as const,
        title: `Nightly Peace: ${nightlyData.theme}`,
        ref: nightlyData.ref,
        text: nightlyData.text,
      },
    ];

    for (const slot of slots) {
      const slotDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), slot.hour, slot.minute, 0);

      // Skip slots that are in the future
      if (slotDate.getTime() > now.getTime()) {
        continue;
      }

      const coords = parseScriptureCoordinates(slot.ref);
      const deliveryLabel = formatDeliveryLabel(slotDate);

      items.push({
        id: `scheduled_${slot.type}_${calDayOfYear}_${dayYear}`,
        type: slot.type,
        title: slot.title,
        subtitle: `${deliveryLabel} • ${slot.ref}`,
        body: `"${slot.text.trim()}"`,
        scriptureRef: slot.ref,
        verseQuote: slot.text.trim(),
        book: coords?.book,
        chapter: coords?.chapter,
        verse: coords?.verse,
        deliveredAtLabel: deliveryLabel,
        createdAt: slotDate.toISOString(),
        isRead: false,
        actionRoute: 'WOTD',
        actionParams: coords ? { book: coords.book, chapter: coords.chapter, verse: coords.verse } : undefined,
      });
    }
  }

  return items;
}

/**
 * Builds unlocked achievement notification items with persistent unlock timestamps.
 */
export function getUnlockedAchievementNotifications(
  stats: {
    streak: number;
    bookmarksCount: number;
    highlightsCount: number;
    sharesCount: number;
  },
  storedTimestamps: Record<string, string> = {}
): InAppNotificationItem[] {
  const notifications: InAppNotificationItem[] = [];

  const checkCategory = (
    category: 'streak' | 'bookmark' | 'highlight' | 'share',
    count: number
  ) => {
    const milestones = ALL_ACHIEVEMENTS[category] || [];
    milestones.forEach((m) => {
      if (count >= m.target) {
        const coords = parseScriptureCoordinates(m.verseRef);
        const unlockDateIso = storedTimestamps[m.id] || new Date().toISOString();
        const deliveryLabel = formatDeliveryLabel(new Date(unlockDateIso));

        notifications.push({
          id: `achievement_${m.id}`,
          type: 'achievement',
          title: `Milestone Unlocked: ${m.title}`,
          subtitle: `${deliveryLabel} • ${m.badgeLabel} (${m.target} ${m.target === 1 ? 'day' : 'milestones'})`,
          body: m.subtitle,
          scriptureRef: m.verseRef,
          verseQuote: m.verseQuote,
          book: coords?.book,
          chapter: coords?.chapter,
          verse: coords?.verse,
          deliveredAtLabel: deliveryLabel,
          achievementId: m.id,
          achievementCategory: m.category,
          achievementTarget: m.target,
          createdAt: unlockDateIso,
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
 * Stored Achievement Unlock Timestamps
 */
export async function getAchievementUnlockTimestamps(): Promise<Record<string, string>> {
  try {
    const raw = await AsyncStorage.getItem(ACHIEVEMENT_TIMESTAMPS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function saveAchievementUnlockTimestamp(id: string, isoString: string): Promise<void> {
  try {
    const existing = await getAchievementUnlockTimestamps();
    if (!existing[id]) {
      existing[id] = isoString;
      await AsyncStorage.setItem(ACHIEVEMENT_TIMESTAMPS_KEY, JSON.stringify(existing));
    }
  } catch (err) {
    console.warn('[Notifications] Failed to save achievement timestamp:', err);
  }
}

/**
 * Real Received Push Notifications Persistence
 */
export async function getReceivedPushNotifications(): Promise<InAppNotificationItem[]> {
  try {
    const raw = await AsyncStorage.getItem(RECEIVED_PUSH_NOTIFICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function recordReceivedPushNotification(item: InAppNotificationItem): Promise<void> {
  try {
    const existing = await getReceivedPushNotifications();
    const updated = [item, ...existing.filter((e) => e.id !== item.id)].slice(0, 50);
    await AsyncStorage.setItem(RECEIVED_PUSH_NOTIFICATIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[Notifications] Failed to record received push notification:', err);
  }
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
