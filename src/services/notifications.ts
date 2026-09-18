import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { facts } from '../data/mockDatabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
}

export async function scheduleDidYouKnowNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const granted = await requestNotificationPermissions();
  if (!granted) return;

  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Did You Know? - ${randomFact.fact_title}`,
      body: `${randomFact.scripture_ref}: ${randomFact.verse_text.substring(0, 80)}...`,
      data: { factId: randomFact.id },
    },
    trigger: {
      seconds: 7 * 60 * 60,
      repeats: true,
    } as any,
  });
}

export async function sendImmediateTestNotification(): Promise<void> {
  const granted = await requestNotificationPermissions();
  if (!granted) return;

  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Did You Know? - ${randomFact.fact_title}`,
      body: `${randomFact.scripture_ref}: ${randomFact.verse_text.substring(0, 80)}...`,
      data: { factId: randomFact.id },
    },
    trigger: null,
  });
}
