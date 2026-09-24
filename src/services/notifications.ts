import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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

// ─── Notification Slot Identifiers ───────────────────────────────────────────
export const NOTIFICATION_IDS = {
  MORNING_WORD: 'exegeomai-morning-word-8am',
  MIDDAY_AFFIRMATION: 'exegeomai-midday-affirmation-1pm',
  AFTERNOON_MOTIVATION: 'exegeomai-afternoon-motivation-4pm',
  STREAK_GUARDIAN: 'exegeomai-streak-guardian-830pm',
  NIGHTLY_PEACE: 'exegeomai-nightly-peace-10pm',
} as const;

// ─── Types & Scripture Repositories ──────────────────────────────────────────
export interface DivineAffirmation {
  title: string;
  body: string;
  reference: string;
}

export const DIVINE_AFFIRMATIONS: DivineAffirmation[] = [
  {
    title: 'Fearfully & Wonderfully Made',
    body: '“I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.”',
    reference: 'Psalm 139:14',
  },
  {
    title: 'Loved with an Everlasting Love',
    body: '“I have loved you with an everlasting love; I have drawn you with unfailing kindness.”',
    reference: 'Jeremiah 31:3',
  },
  {
    title: "You Are God's Masterpiece",
    body: '“For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.”',
    reference: 'Ephesians 2:10',
  },
  {
    title: 'Precious & Honored in His Sight',
    body: '“Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.”',
    reference: 'Isaiah 43:4',
  },
  {
    title: 'Rejoicing Over You with Singing',
    body: '“The Lord your God is with you... He will take great delight in you; in His love He will no longer rebuke you, but will rejoice over you with singing.”',
    reference: 'Zephaniah 3:17',
  },
  {
    title: 'Inseparable from Divine Love',
    body: '“Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.”',
    reference: 'Romans 8:38-39',
  },
  {
    title: "Lavished with the Father's Love",
    body: '“See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!”',
    reference: '1 John 3:1',
  },
  {
    title: 'Known & Chosen Before Time',
    body: '“Before I formed you in the womb I knew you, before you were born I set you apart.”',
    reference: 'Jeremiah 1:5',
  },
  {
    title: 'A Living Hope & Sacred Future',
    body: '“‘For I know the plans I have for you,’ declares the Lord, ‘plans to prosper you and not to harm you, plans to give you hope and a future.’”',
    reference: 'Jeremiah 29:11',
  },
  {
    title: 'The Apple of His Eye',
    body: '“Keep me as the apple of your eye; hide me in the shadow of your wings.”',
    reference: 'Psalm 17:8',
  },
  {
    title: 'Crowned with Steadfast Love',
    body: '“He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.”',
    reference: 'Psalm 103:4-5',
  },
  {
    title: 'Never Forsaken, Always Accompanied',
    body: '“The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.”',
    reference: 'Deuteronomy 31:8',
  },
  {
    title: 'Engraved on the Palms of His Hands',
    body: '“Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.”',
    reference: 'Isaiah 49:15-16',
  },
  {
    title: "A Royal Priesthood, God's Treasure",
    body: '“You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare the praises of him who called you out of darkness.”',
    reference: '1 Peter 2:9',
  },
  {
    title: 'A New Creation in Christ',
    body: '“Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!”',
    reference: '2 Corinthians 5:17',
  },
  {
    title: 'More Than Conquerors',
    body: '“No, in all these things we are more than conquerors through him who loved us.”',
    reference: 'Romans 8:37',
  },
];

export const MORNING_SCRIPTURES = [
  { ref: 'Psalm 119:105', text: '“Your word is a lamp to my feet and a light to my path.”' },
  { ref: 'Lamentations 3:22-23', text: '“His mercies never come to an end; they are new every morning; great is your faithfulness.”' },
  { ref: 'Psalm 143:8', text: '“Let the morning bring me word of your unfailing love, for I have put my trust in you.”' },
  { ref: 'Proverbs 3:5-6', text: '“Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him.”' },
  { ref: 'Matthew 6:33', text: '“Seek first his kingdom and his righteousness, and all these things will be given to you as well.”' },
  { ref: 'Psalm 5:3', text: '“In the morning, Lord, you hear my voice; in the morning I lay my requests before you and wait expectantly.”' },
  { ref: 'Isaiah 40:31', text: '“Those who hope in the Lord will renew their strength. They will soar on wings like eagles.”' },
];

export const EVENING_GUARDIAN_PROMPTS = [
  {
    title: 'Protect Your Daily Streak • The Word Awaits',
    body: 'The day is winding down. Take 2 minutes tonight to read your daily chapter and keep your sacred streak alive.',
  },
  {
    title: "Keep Your Sacred Walk Alive • Today's Word",
    body: "Don't let today close without opening the Scripture. Refresh your soul with tonight's reading.",
  },
  {
    title: 'Evening Reflection • Nourish Your Spirit',
    body: "Before you rest tonight, open God's Word. Your continuous study streak is waiting for you.",
  },
  {
    title: 'Close the Day in Peace • Daily Reading',
    body: "A few moments in God's Word will anchor your thoughts before sleep. Complete today's chapter.",
  },
];

export const NIGHTLY_PEACE_SCRIPTURES = [
  { ref: 'Psalm 4:8', text: '“In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.”' },
  { ref: 'John 14:27', text: '“Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.”' },
  { ref: 'Proverbs 3:24', text: '“When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.”' },
  { ref: 'Philippians 4:6-7', text: '“The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.”' },
  { ref: 'Psalm 91:1-2', text: '“Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.”' },
];

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

    await Notifications.setNotificationChannelAsync('streak-guardian', {
      name: 'Streak Guardian & Evening Reading',
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

// ─── Automated Notification Registration ─────────────────────────────────────
export async function registerAllAutomatedNotifications(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const granted = await requestNotificationPermissions();
  if (!granted) return false;

  await setupAndroidNotificationChannels();

  // Cancel prior schedules to avoid duplicate delivery
  await cancelAllAutomatedNotifications();

  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  const morningScripture = MORNING_SCRIPTURES[dayOfYear % MORNING_SCRIPTURES.length];
  const middayAffirmation = DIVINE_AFFIRMATIONS[dayOfYear % DIVINE_AFFIRMATIONS.length];
  const afternoonAffirmation = DIVINE_AFFIRMATIONS[(dayOfYear + 7) % DIVINE_AFFIRMATIONS.length];
  const eveningPrompt = EVENING_GUARDIAN_PROMPTS[dayOfYear % EVENING_GUARDIAN_PROMPTS.length];
  const peaceScripture = NIGHTLY_PEACE_SCRIPTURES[dayOfYear % NIGHTLY_PEACE_SCRIPTURES.length];

  try {
    // 1. Morning Word at 08:00 AM Daily
    await Notifications.scheduleNotificationAsync({
      identifier: NOTIFICATION_IDS.MORNING_WORD,
      content: {
        title: 'Morning Manna • Walk in the Light',
        body: `${morningScripture.text} (${morningScripture.ref}) — Start your morning in the Word.`,
        data: { screen: 'WOTD', tab: 'bible' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        channelId: 'morning-word',
        hour: 8,
        minute: 0,
      },
    });

    // 2. Mid-Day God's Love & Identity Affirmation at 13:15 (1:15 PM) Daily
    await Notifications.scheduleNotificationAsync({
      identifier: NOTIFICATION_IDS.MIDDAY_AFFIRMATION,
      content: {
        title: `How God Sees You • ${middayAffirmation.title}`,
        body: `${middayAffirmation.body} (${middayAffirmation.reference})`,
        data: { screen: 'Discover', type: 'affirmation' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        channelId: 'divine-affirmations',
        hour: 13,
        minute: 15,
      },
    });

    // 3. Afternoon Scripture Motivation & Strength at 16:30 (4:30 PM) Daily
    await Notifications.scheduleNotificationAsync({
      identifier: NOTIFICATION_IDS.AFTERNOON_MOTIVATION,
      content: {
        title: `Strength for Your Afternoon • ${afternoonAffirmation.title}`,
        body: `${afternoonAffirmation.body} (${afternoonAffirmation.reference})`,
        data: { screen: 'Discover', type: 'affirmation' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        channelId: 'divine-affirmations',
        hour: 16,
        minute: 30,
      },
    });

    // 4. Evening Streak Guardian at 20:30 (8:30 PM) Daily
    await Notifications.scheduleNotificationAsync({
      identifier: NOTIFICATION_IDS.STREAK_GUARDIAN,
      content: {
        title: eveningPrompt.title,
        body: eveningPrompt.body,
        data: { screen: 'WOTD', tab: 'bible' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        channelId: 'streak-guardian',
        hour: 20,
        minute: 30,
      },
    });

    // 5. Nightly Scripture of Peace at 22:00 (10:00 PM) Daily
    await Notifications.scheduleNotificationAsync({
      identifier: NOTIFICATION_IDS.NIGHTLY_PEACE,
      content: {
        title: 'Nightly Peace • Rest in the Lord',
        body: `${peaceScripture.text} (${peaceScripture.ref})`,
        data: { screen: 'WOTD', tab: 'bible' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        channelId: 'nightly-peace',
        hour: 22,
        minute: 0,
      },
    });

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

  const randomAffirmation = DIVINE_AFFIRMATIONS[Math.floor(Math.random() * DIVINE_AFFIRMATIONS.length)];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `How God Sees You • ${randomAffirmation.title}`,
      body: `${randomAffirmation.body} (${randomAffirmation.reference})`,
      data: { screen: 'Discover', type: 'affirmation' },
    },
    trigger: null,
  });
}

// Backward-compatible alias
export const scheduleDidYouKnowNotifications = registerAllAutomatedNotifications;
