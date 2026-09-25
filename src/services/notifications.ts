import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import {
  getDayOfYear,
  MORNING_365_SCRIPTURES,
  DIVINE_LOVE_365_AFFIRMATIONS,
  NIGHTLY_PEACE_365_SCRIPTURES,
  EVENING_FELLOWSHIP_365_PROMPTS,
} from '../data/notificationVerses';

// ─── Foreground Notification Handler ──────────────────────────────────────────
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// ─── Permission Management ───────────────────────────────────────────────────
export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === 'granted';
  } catch (error) {
    console.warn('[Notifications] Permission request notice:', error);
    return false;
  }
}

// ─── Android Channel Setup ───────────────────────────────────────────────────
export async function setupAndroidNotificationChannels(): Promise<void> {
  if (Platform.OS !== 'android') return;
  try {
    await Notifications.setNotificationChannelAsync('morning-word', {
      name: 'Morning Word & Devotion',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FDD223',
    });

    await Notifications.setNotificationChannelAsync('evening-fellowship', {
      name: 'Evening Fellowship with Christ',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FDD223',
    });

    await Notifications.setNotificationChannelAsync('divine-affirmations', {
      name: "God's Love & Identity Affirmations",
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'default',
      lightColor: '#FDD223',
    });

    await Notifications.setNotificationChannelAsync('nightly-peace', {
      name: 'Nightly Scripture of Peace',
      importance: Notifications.AndroidImportance.LOW,
      sound: 'default',
      lightColor: '#FDD223',
    });
  } catch (error) {
    console.warn('[Notifications] Channel setup notice:', error);
  }
}

// ─── Cancel All Scheduled Notifications ──────────────────────────────────────
export async function cancelAllAutomatedNotifications(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.warn('[Notifications] Cancel scheduled error:', error);
  }
}

// ─── Automated 365-Day Rolling Calendar Scheduler ────────────────────────────
/**
 * Schedules a rolling 7-day window of non-repeating, calendar-indexed scriptures.
 * Works 100% offline without internet data, utilizing native OS alarms.
 * Stays strictly within OS limits (7 days x 5 notifications = 35 total).
 */
export async function registerAllAutomatedNotifications(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const granted = await requestNotificationPermissions();
  if (!granted) return false;

  await setupAndroidNotificationChannels();

  // Cancel prior schedules to avoid duplicate delivery
  await cancelAllAutomatedNotifications();

  const now = new Date();

  try {
    // Schedule a 7-day rolling window from the 365-day calendar dataset
    for (let offset = 0; offset < 7; offset++) {
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + offset);

      const targetDayOfYear = getDayOfYear(targetDate);
      const morningItem =
        MORNING_365_SCRIPTURES[targetDayOfYear - 1] || MORNING_365_SCRIPTURES[0];
      const middayItem =
        DIVINE_LOVE_365_AFFIRMATIONS[targetDayOfYear - 1] ||
        DIVINE_LOVE_365_AFFIRMATIONS[0];
      const afternoonIndex =
        (targetDayOfYear - 1 + 182) % DIVINE_LOVE_365_AFFIRMATIONS.length;
      const afternoonItem = DIVINE_LOVE_365_AFFIRMATIONS[afternoonIndex];
      const eveningItem =
        EVENING_FELLOWSHIP_365_PROMPTS[targetDayOfYear - 1] ||
        EVENING_FELLOWSHIP_365_PROMPTS[0];
      const peaceItem =
        NIGHTLY_PEACE_365_SCRIPTURES[targetDayOfYear - 1] ||
        NIGHTLY_PEACE_365_SCRIPTURES[0];

      // 1. Morning Word at 08:00 AM
      const morningTrigger = new Date(targetDate);
      morningTrigger.setHours(8, 0, 0, 0);
      if (morningTrigger.getTime() > now.getTime()) {
        await Notifications.scheduleNotificationAsync({
          identifier: `morning-day-${targetDayOfYear}`,
          content: {
            title: `Morning Manna • ${morningItem.theme}`,
            body: `${morningItem.text} (${morningItem.ref}) — Start your morning in the Word.`,
            data: { screen: 'WOTD', tab: 'bible' },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: morningTrigger,
            channelId: 'morning-word',
          },
        });
      }

      // 2. Mid-Day God's Love & Identity Affirmation at 13:15 (1:15 PM)
      const middayTrigger = new Date(targetDate);
      middayTrigger.setHours(13, 15, 0, 0);
      if (middayTrigger.getTime() > now.getTime()) {
        await Notifications.scheduleNotificationAsync({
          identifier: `midday-love-day-${targetDayOfYear}`,
          content: {
            title: `How God Sees You • ${middayItem.title}`,
            body: `${middayItem.body} (${middayItem.reference})`,
            data: { screen: 'Discover', type: 'affirmation' },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: middayTrigger,
            channelId: 'divine-affirmations',
          },
        });
      }

      // 3. Afternoon Scripture Motivation & Strength at 16:30 (4:30 PM)
      const afternoonTrigger = new Date(targetDate);
      afternoonTrigger.setHours(16, 30, 0, 0);
      if (afternoonTrigger.getTime() > now.getTime()) {
        await Notifications.scheduleNotificationAsync({
          identifier: `afternoon-motivation-day-${targetDayOfYear}`,
          content: {
            title: `Strength for Your Afternoon • ${afternoonItem.title}`,
            body: `${afternoonItem.body} (${afternoonItem.reference})`,
            data: { screen: 'Discover', type: 'affirmation' },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: afternoonTrigger,
            channelId: 'divine-affirmations',
          },
        });
      }

      // 4. Evening Fellowship with Christ at 20:30 (8:30 PM)
      const eveningTrigger = new Date(targetDate);
      eveningTrigger.setHours(20, 30, 0, 0);
      if (eveningTrigger.getTime() > now.getTime()) {
        await Notifications.scheduleNotificationAsync({
          identifier: `evening-fellowship-day-${targetDayOfYear}`,
          content: {
            title: eveningItem.title,
            body: eveningItem.body,
            data: { screen: 'WOTD', tab: 'bible' },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: eveningTrigger,
            channelId: 'evening-fellowship',
          },
        });
      }

      // 5. Nightly Scripture of Peace at 22:00 (10:00 PM)
      const nightlyTrigger = new Date(targetDate);
      nightlyTrigger.setHours(22, 0, 0, 0);
      if (nightlyTrigger.getTime() > now.getTime()) {
        await Notifications.scheduleNotificationAsync({
          identifier: `nightly-peace-day-${targetDayOfYear}`,
          content: {
            title: `Nightly Peace • ${peaceItem.theme}`,
            body: `${peaceItem.text} (${peaceItem.ref})`,
            data: { screen: 'WOTD', tab: 'bible' },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: nightlyTrigger,
            channelId: 'nightly-peace',
          },
        });
      }
    }

    return true;
  } catch (error) {
    console.warn('[Notifications] Automated schedule error:', error);
    return false;
  }
}

// ─── Immediate Test Notification ─────────────────────────────────────────────
export async function sendImmediateTestNotification(): Promise<void> {
  const granted = await requestNotificationPermissions();
  if (!granted) return;

  const dayOfYear = getDayOfYear();
  const todayAffirmation =
    DIVINE_LOVE_365_AFFIRMATIONS[dayOfYear - 1] || DIVINE_LOVE_365_AFFIRMATIONS[0];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `How God Sees You • ${todayAffirmation.title}`,
      body: `${todayAffirmation.body} (${todayAffirmation.reference})`,
      data: { screen: 'Discover', type: 'affirmation' },
    },
    trigger: null,
  });
}

// Backward-compatible alias
export const scheduleDidYouKnowNotifications = registerAllAutomatedNotifications;
