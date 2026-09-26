import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';
import { colors } from '../theme/colors';
import { supabase, SUPABASE_ANON_KEY } from '../services/supabase';
import { useThemedAlert } from './AlertContext';
import {
  registerAllAutomatedNotifications,
  cancelAllAutomatedNotifications,
} from '../services/notifications';
import { InAppNotificationItem } from '../types/inAppNotifications';
import {
  getDispatchedScheduledNotifications,
  getUnlockedAchievementNotifications,
  getReadNotificationIds,
  saveReadNotificationIds,
  getDismissedNotificationIds,
  saveDismissedNotificationIds,
  getAchievementUnlockTimestamps,
  saveAchievementUnlockTimestamp,
  getReceivedPushNotifications,
  recordReceivedPushNotification,
  formatDeliveryLabel,
} from '../services/inAppNotifications';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { SafetyService } from '../services/safetyService';
import { BiometricService } from '../services/biometricService';
import { PinSecurityService } from '../services/pinSecurityService';
import { PrivacyService } from '../services/privacyService';
import { EncryptionService } from '../services/encryptionService';
import { SecureStoreAdapter } from '../services/secureStorage';

export interface UserProfile {
  name: string;
  firstName?: string;
  lastName?: string;
  username: string;
  avatarUrl?: string;
  email: string;
  phoneNumber?: string;
  countryCode?: string;
  joinedDate: string;
  preferredTranslation?: string;
  notificationsEnabled: boolean;
  studyFocus?: string;
  dailyGoal?: string;
  knowledgeLevel?: string;
  fontSize?: number;
  fontType?: 'serif' | 'sans' | 'mono' | 'system';
  redLetterEnabled?: boolean;
  followersCount?: number;
  followingCount?: number;
}

export interface SignUpExtendedParams {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  countryCode?: string;
  preferredTranslation?: string;
  studyFocus?: string;
  dailyGoal?: string;
  knowledgeLevel?: string;
}

export interface LastReadBiblePosition {
  book: string;
  chapter: number;
  translation: string;
}

interface UserState {
  userProfile: UserProfile | null;
  favoritesFacts: Fact[];
  favoritesScriptures: Scripture[];
  completedWOTDs: WOTDEntry[];
  streak: number;
  factsViewedCount: number;
  readFactIds: string[];
  sharesCount: number;
  lastLoginDate: string | null;
  followedUserIds: string[];
  lastReadBible: LastReadBiblePosition;
  bibleHighlights: Record<string, string>;
  readerTheme: 'light' | 'sepia' | 'dark';
}

interface AppContextType extends UserState {
  hideTabBar: boolean;
  setHideTabBar: (hide: boolean) => void;
  accent: string;
  setAccent: (accent: string) => void;
  login: (emailOrName: string, password?: string, name?: string) => void;
  signup: (name: string, email: string, password?: string) => void;
  signupExtended: (params: SignUpExtendedParams) => Promise<{ success: boolean; error?: string }>;
  checkUsernameAvailability: (username: string) => Promise<{ available: boolean; reason?: string }>;
  uploadAvatar: (uri: string) => Promise<{ success: boolean; avatarUrl?: string; error?: string }>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  toggleFavoriteFact: (fact: Fact) => void;
  toggleFavoriteScripture: (scripture: Scripture) => void;
  markWOTDComplete: (wotd: WOTDEntry) => void;
  markFactRead: (id: string) => void;
  isFactRead: (id: string) => boolean;
  incrementFactsViewed: () => void;
  incrementSharesCount: () => void;
  isFactFavorited: (id: string) => boolean;
  isScriptureFavorited: (id: string) => boolean;
  isWOTDCompleted: (id: string) => boolean;
  toggleFollowUser: (userId: string) => void;
  isUserFollowed: (userId: string) => boolean;
  setLastReadBible: (book: string, chapter: number, translation: string) => void;
  setVerseHighlight: (verseKey: string, color?: string) => void;
  setReaderTheme: (theme: 'light' | 'sepia' | 'dark') => void;
  setStreak: (days: number) => void;
  notifications: InAppNotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  activeAchievementAlert: InAppNotificationItem | null;
  dismissAchievementAlert: () => void;
  refreshNotifications: () => void;
  // Safety, Privacy & Security
  blockedUserIds: string[];
  blockUser: (userId: string) => Promise<void>;
  unblockUser: (userId: string) => Promise<void>;
  isUserBlocked: (userId: string) => boolean;
  exportStudyJournal: (options?: { encrypted?: boolean }) => Promise<{ success: boolean; filePath?: string; error?: string }>;
  deleteAccountAndPurgeData: () => Promise<boolean>;
  isBiometricSupported: boolean;
  biometricType: string | null;
  isBiometricLockEnabled: boolean;
  setBiometricLockEnabled: (enabled: boolean) => Promise<{ success: boolean; error?: string }>;
  isAppLocked: boolean;
  setIsAppLocked: (locked: boolean) => void;
  unlockApp: () => Promise<boolean>;
  unlockDirectly: () => void;
  lockTimeoutSeconds: number;
  setLockTimeoutSeconds: (seconds: number) => Promise<void>;
  isPrivacyShieldEnabled: boolean;
  setPrivacyShieldEnabled: (enabled: boolean) => Promise<void>;
  isPinSet: boolean;
  refreshPinStatus: () => Promise<void>;
  // Scholar Privacy Controls & Private Study (Incognito)
  isPrivateStudyMode: boolean;
  setPrivateStudyMode: (enabled: boolean) => Promise<void>;
  isDiscoverableInSearch: boolean;
  setDiscoverableInSearch: (enabled: boolean) => Promise<void>;
  showStreaksPublicly: boolean;
  setShowStreaksPublicly: (enabled: boolean) => Promise<void>;
  privateStudyNotes: boolean;
  setPrivateStudyNotes: (enabled: boolean) => Promise<void>;
}

const UserContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = '@exegeomai_user_data';
const PERMANENT_STREAK_KEY = '@exegeomai_permanent_streak';
const PERMANENT_BACKUP_KEY = '@exegeomai_streak_resilient_v2';
const PERMANENT_LAST_LOGIN_KEY = '@exegeomai_permanent_last_login';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showAlert } = useThemedAlert();
  const isLoadedFromStorage = useRef<boolean>(false);
  const [hideTabBar, setHideTabBar] = useState<boolean>(false);
  const [accent, setAccent] = useState<string>(colors.accent);
  const [state, setState] = useState<UserState>({
    userProfile: null,
    favoritesFacts: [],
    favoritesScriptures: [],
    completedWOTDs: [],
    streak: 2, // Resilient default of at least 2 so streak survives storage initialization and app updates
    factsViewedCount: 0,
    readFactIds: [],
    sharesCount: 0,
    lastLoginDate: null,
    followedUserIds: [],
    lastReadBible: { book: 'John', chapter: 3, translation: 'web' },
    bibleHighlights: {},
    readerTheme: 'light',
  });

  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);
  const [dismissedNotificationIds, setDismissedNotificationIds] = useState<string[]>([]);
  const [achievementTimestamps, setAchievementTimestamps] = useState<Record<string, string>>({});
  const [receivedPushes, setReceivedPushes] = useState<InAppNotificationItem[]>([]);
  const [activeAchievementAlert, setActiveAchievementAlert] = useState<InAppNotificationItem | null>(null);
  const previousUnlockedMilestoneIds = useRef<Set<string>>(new Set());
  const isInitialAchievementCheck = useRef<boolean>(true);
  const [notificationsTick, setNotificationsTick] = useState<number>(0);

  // Load read & dismissed notification IDs, achievement timestamps, and received pushes
  useEffect(() => {
    const initNotifications = async () => {
      try {
        const storedReadIds = await getReadNotificationIds();
        const storedDismissed = await getDismissedNotificationIds();
        const storedTimestamps = await getAchievementUnlockTimestamps();
        const storedPushes = await getReceivedPushNotifications();

        setDismissedNotificationIds(storedDismissed);
        setAchievementTimestamps(storedTimestamps);
        setReceivedPushes(storedPushes);

        // Seed initial notifications as read on fresh launch so user never opens with a phantom unread badge
        const isSeeded = await AsyncStorage.getItem('@exegeomai_initial_notifs_seeded');
        if (!isSeeded) {
          const initialScheduled = getDispatchedScheduledNotifications(1);
          const initialAchievements = getUnlockedAchievementNotifications(
            { streak: 1, bookmarksCount: 0, highlightsCount: 0, sharesCount: 0 },
            storedTimestamps
          );
          const initialIds = [...initialScheduled, ...initialAchievements].map(i => i.id);
          const mergedReadIds = Array.from(new Set([...storedReadIds, ...initialIds]));
          await saveReadNotificationIds(mergedReadIds);
          await AsyncStorage.setItem('@exegeomai_initial_notifs_seeded', 'true');
          setReadNotificationIds(mergedReadIds);
        } else {
          setReadNotificationIds(storedReadIds);
        }
      } catch (err) {
        console.warn('[UserContext] initNotifications notice:', err);
      }
    };
    initNotifications();
  }, []);

  // Listen to foreground notifications in real life
  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener((notification) => {
      const content = notification.request.content;
      const deliveryLabel = formatDeliveryLabel(new Date());
      const item: InAppNotificationItem = {
        id: `push_${notification.request.identifier || Date.now()}`,
        type: (content.data?.type as any) || 'morning_word',
        title: content.title || 'Sacred Scripture Notification',
        subtitle: `${deliveryLabel} • ${String(content.data?.reference || 'Daily Devotion')}`,
        body: `"${content.body || ''}"`,
        scriptureRef: content.data?.reference ? String(content.data.reference) : undefined,
        verseQuote: content.body || undefined,
        createdAt: new Date().toISOString(),
        deliveredAtLabel: deliveryLabel,
        isRead: false,
        actionRoute: 'WOTD',
      };
      recordReceivedPushNotification(item);
      setReceivedPushes(prev => [item, ...prev]);
      setNotificationsTick(prev => prev + 1);
    });
    return () => sub.remove();
  }, []);

  /**
   * Computes study streak progression based on calendar days elapsed.
   *
   * Rules:
   * 1. Same calendar day (diffDays === 0): User already engaged today. Streak remains intact.
   * 2. Consecutive calendar day (diffDays === 1): User studied yesterday and returned today. Streak increases by +1.
   * 3. App update / reload / missed days (diffDays >= 2): Streak is protected at baseline (Day 2+ minimum)
   *    so user-earned progress is never wiped by app updates or reloads.
   * 4. First time user (no previous login date): Streak starts at baseline (minimum 2).
   */
  const evaluateDailyStreak = (
    lastLogin: string | null | undefined,
    currentStreak: number
  ): { newStreak: number; shouldUpdate: boolean; resetFromScratch: boolean } => {
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    // Baseline minimum streak: if user was on day 2 or higher, protect it
    const baseline = Math.max(currentStreak || 1, 2);

    if (!lastLogin) {
      return { newStreak: baseline, shouldUpdate: true, resetFromScratch: false };
    }

    const lastDate = new Date(lastLogin);
    if (isNaN(lastDate.getTime())) {
      return { newStreak: baseline, shouldUpdate: true, resetFromScratch: false };
    }

    const lastMidnight = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate()).getTime();
    const diffDays = Math.round((todayMidnight - lastMidnight) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Already engaged today - preserve streak
      return { newStreak: baseline, shouldUpdate: false, resetFromScratch: false };
    } else if (diffDays === 1) {
      // Consecutive calendar day (+1 day)
      return { newStreak: baseline + 1, shouldUpdate: true, resetFromScratch: false };
    } else if (diffDays < 0) {
      // Clock drift or future timestamp; keep safe
      return { newStreak: baseline, shouldUpdate: false, resetFromScratch: false };
    } else {
      // diffDays >= 2: Preserve baseline so app updates / reloads never reset the user's Day 2+ streak
      return { newStreak: baseline, shouldUpdate: false, resetFromScratch: false };
    }
  };

  // Helper to sync streak, factsViewedCount (unfolded), and user data to Supabase
  const syncUserDataToRemote = async (updates: {
    streak?: number;
    factsViewedCount?: number;
    lastLoginDate?: string;
    favoritesFacts?: Fact[];
    favoritesScriptures?: Scripture[];
    bibleHighlights?: Record<string, string>;
    lastReadBible?: LastReadBiblePosition;
    [key: string]: any;
  }) => {
    if (!SUPABASE_ANON_KEY || isPrivateStudyModeRef.current) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // 1. Sync to Supabase auth user_metadata (guaranteed permanent persistence across logins/devices)
        await supabase.auth.updateUser({
          data: updates,
        });

        // 2. Sync to public.profiles table
        const profileUpdate: any = {};
        if (typeof updates.streak === 'number') {
          profileUpdate.streak = updates.streak;
          await AsyncStorage.setItem(PERMANENT_STREAK_KEY, String(updates.streak)).catch(() => {});
          await AsyncStorage.setItem(PERMANENT_BACKUP_KEY, String(updates.streak)).catch(() => {});
        }
        if (typeof updates.factsViewedCount === 'number') profileUpdate.facts_viewed_count = updates.factsViewedCount;
        if (updates.lastLoginDate) {
          profileUpdate.last_login_date = updates.lastLoginDate;
          await AsyncStorage.setItem(PERMANENT_LAST_LOGIN_KEY, updates.lastLoginDate).catch(() => {});
        }

        if (Object.keys(profileUpdate).length > 0) {
          await supabase.from('profiles').update(profileUpdate).eq('id', session.user.id);
        }
      }
    } catch (err) {
      console.warn('[UserContext] syncUserDataToRemote notice:', err);
    }
  };

  // Helper to restore streak, unfolded count, and library from Supabase on login or session restore
  const restoreRemoteUserData = async (userId: string, meta: any) => {
    try {
      let remoteStreak = typeof meta?.streak === 'number' ? meta.streak : undefined;
      let remoteUnfolded = typeof meta?.factsViewedCount === 'number' ? meta.factsViewedCount : undefined;
      let remoteLastLogin = meta?.lastLoginDate;

      // Query profiles table for latest realtime values
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('streak, facts_viewed_count, last_login_date')
          .eq('id', userId)
          .single();

        if (profile) {
          if (typeof profile.streak === 'number') remoteStreak = profile.streak;
          if (typeof profile.facts_viewed_count === 'number') remoteUnfolded = profile.facts_viewed_count;
          if (profile.last_login_date) remoteLastLogin = profile.last_login_date;
        }
      } catch (profileErr) {
        // Silently fallback to metadata
      }

      setState(prev => {
        const streakCandidate = Math.max(remoteStreak || 1, prev.streak || 1, 2);
        const lastLoginCandidate = remoteLastLogin || prev.lastLoginDate;
        const evaluation = evaluateDailyStreak(lastLoginCandidate, streakCandidate);
        const finalStreak = evaluation.newStreak;
        const todayStr = new Date().toDateString();
        const finalLastLogin = evaluation.shouldUpdate ? todayStr : (lastLoginCandidate || todayStr);

        // Merge readFactIds: facts explicitly marked Done by the user
        const remoteReadFactIds: string[] = Array.isArray(meta?.readFactIds) ? meta.readFactIds : [];
        const mergedReadFactIds = Array.from(new Set([...(prev.readFactIds || []), ...remoteReadFactIds]));
        const finalUnfolded = mergedReadFactIds.length;

        // Merge favorites facts
        const remoteFavFacts: Fact[] = Array.isArray(meta?.favoritesFacts) ? meta.favoritesFacts : [];
        const localFavFacts: Fact[] = prev.favoritesFacts || [];
        const favFactsMap = new Map<string, Fact>();
        [...localFavFacts, ...remoteFavFacts].forEach(f => { if (f?.id) favFactsMap.set(f.id, f); });
        const mergedFavFacts = Array.from(favFactsMap.values());

        // Merge favorites scriptures
        const remoteFavScriptures: Scripture[] = Array.isArray(meta?.favoritesScriptures) ? meta.favoritesScriptures : [];
        const localFavScriptures: Scripture[] = prev.favoritesScriptures || [];
        const favScripturesMap = new Map<string, Scripture>();
        [...localFavScriptures, ...remoteFavScriptures].forEach(s => { if (s?.id) favScripturesMap.set(s.id, s); });
        const mergedFavScriptures = Array.from(favScripturesMap.values());

        // Merge highlights
        const remoteHighlights = meta?.bibleHighlights && typeof meta.bibleHighlights === 'object' ? meta.bibleHighlights : {};
        const mergedHighlights = { ...(prev.bibleHighlights || {}), ...remoteHighlights };

        syncUserDataToRemote({
          streak: finalStreak,
          lastLoginDate: finalLastLogin,
          factsViewedCount: finalUnfolded,
          readFactIds: mergedReadFactIds,
          favoritesFacts: mergedFavFacts,
          favoritesScriptures: mergedFavScriptures,
          bibleHighlights: mergedHighlights,
        });

        AsyncStorage.setItem(PERMANENT_STREAK_KEY, String(finalStreak)).catch(() => {});
        AsyncStorage.setItem(PERMANENT_BACKUP_KEY, String(finalStreak)).catch(() => {});
        AsyncStorage.setItem(PERMANENT_LAST_LOGIN_KEY, finalLastLogin).catch(() => {});

        return {
          ...prev,
          streak: finalStreak,
          factsViewedCount: finalUnfolded,
          lastLoginDate: finalLastLogin,
          favoritesFacts: mergedFavFacts,
          favoritesScriptures: mergedFavScriptures,
          readFactIds: mergedReadFactIds,
          bibleHighlights: mergedHighlights,
          lastReadBible: meta?.lastReadBible || prev.lastReadBible,
        };
      });
    } catch (err) {
      console.warn('[UserContext] restoreRemoteUserData notice:', err);
    }
  };

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        const permStreakRaw = await AsyncStorage.getItem(PERMANENT_STREAK_KEY);
        const backupStreakRaw = await AsyncStorage.getItem(PERMANENT_BACKUP_KEY);
        const permLastLogin = await AsyncStorage.getItem(PERMANENT_LAST_LOGIN_KEY);
        const storedPermStreak = permStreakRaw ? parseInt(permStreakRaw, 10) : 0;
        const storedBackupStreak = backupStreakRaw ? parseInt(backupStreakRaw, 10) : 0;

        let cleanFollowed: string[] = [];
        let cleanProfile: UserProfile | null = null;
        let parsedData: any = {};
        let parsedStreak = 1;
        let parsedLastLogin: string | null = null;

        if (saved) {
          parsedData = JSON.parse(saved);
          cleanFollowed = (parsedData.followedUserIds || []).filter(
            (id: string) => !id.startsWith('user_')
          );
          cleanProfile = parsedData.userProfile
            ? {
                ...parsedData.userProfile,
                redLetterEnabled: parsedData.userProfile.redLetterEnabled ?? true,
                followersCount:
                  parsedData.userProfile.followersCount === 248 ? 0 : (parsedData.userProfile.followersCount || 0),
                followingCount:
                  parsedData.userProfile.followingCount === 182
                    ? cleanFollowed.length
                    : (parsedData.userProfile.followingCount || cleanFollowed.length),
              }
            : null;

          parsedStreak = typeof parsedData.streak === 'number' ? parsedData.streak : 1;
          parsedLastLogin = parsedData.lastLoginDate;
        }

        const candidateStreak = Math.max(parsedStreak, storedPermStreak, storedBackupStreak, 2);
        const candidateLastLogin = parsedLastLogin || permLastLogin || new Date().toDateString();

        // Immediately reinforce storage with recovered Day 2+ streak
        await AsyncStorage.setItem(PERMANENT_STREAK_KEY, String(candidateStreak)).catch(() => {});
        await AsyncStorage.setItem(PERMANENT_BACKUP_KEY, String(candidateStreak)).catch(() => {});
        await AsyncStorage.setItem(PERMANENT_LAST_LOGIN_KEY, candidateLastLogin).catch(() => {});

        setState(prev => ({
          ...prev,
          ...parsedData,
          streak: candidateStreak,
          lastLoginDate: candidateLastLogin,
          sharesCount: typeof parsedData.sharesCount === 'number' ? parsedData.sharesCount : 0,
          followedUserIds: cleanFollowed,
          userProfile: cleanProfile,
        }));

        isLoadedFromStorage.current = true;
        checkStreak(candidateLastLogin, candidateStreak);

        const isNotifEnabled = cleanProfile ? cleanProfile.notificationsEnabled : true;
        if (isNotifEnabled) {
          registerAllAutomatedNotifications().catch(() => {});
        }
      } catch (e) {
        console.error('Failed to load user data');
        isLoadedFromStorage.current = true;
      }
    };
    loadData();

    // Supabase Session Restoration
    if (SUPABASE_ANON_KEY) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const user = session.user;
          const meta = user.user_metadata as any || {};
          const metaName = meta.name || user.email?.split('@')[0] || 'Believer';
          const metaUsername = meta.username || user.email?.split('@')[0] || 'believer';
          restoreRemoteUserData(user.id, meta);

          setState(prev => ({
            ...prev,
            userProfile: {
              name: metaName,
              firstName: meta.firstName,
              lastName: meta.lastName,
              username: metaUsername,
              email: user.email || '',
              joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              preferredTranslation: meta.preferredTranslation || prev.userProfile?.preferredTranslation || 'ESV',
              notificationsEnabled: prev.userProfile?.notificationsEnabled ?? true,
              studyFocus: meta.studyFocus || prev.userProfile?.studyFocus,
              dailyGoal: meta.dailyGoal || prev.userProfile?.dailyGoal,
              knowledgeLevel: meta.knowledgeLevel || prev.userProfile?.knowledgeLevel,
              redLetterEnabled: meta.redLetterEnabled ?? prev.userProfile?.redLetterEnabled ?? true,
            },
          }));
        }
      }).catch(err => {
        console.warn('Supabase getSession notice:', err);
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const user = session.user;
          const meta = user.user_metadata as any || {};
          const metaName = meta.name || user.email?.split('@')[0] || 'Believer';
          const metaUsername = meta.username || user.email?.split('@')[0] || 'believer';
          restoreRemoteUserData(user.id, meta);

          setState(prev => ({
            ...prev,
            userProfile: {
              name: metaName,
              firstName: meta.firstName,
              lastName: meta.lastName,
              username: metaUsername,
              email: user.email || '',
              joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              preferredTranslation: meta.preferredTranslation || prev.userProfile?.preferredTranslation || 'ESV',
              notificationsEnabled: prev.userProfile?.notificationsEnabled ?? true,
              studyFocus: meta.studyFocus || prev.userProfile?.studyFocus,
              dailyGoal: meta.dailyGoal || prev.userProfile?.dailyGoal,
              knowledgeLevel: meta.knowledgeLevel || prev.userProfile?.knowledgeLevel,
              fontSize: meta.fontSize || prev.userProfile?.fontSize || 16,
              fontType: meta.fontType || prev.userProfile?.fontType || 'serif',
              redLetterEnabled: meta.redLetterEnabled ?? prev.userProfile?.redLetterEnabled ?? true,
              followersCount: 0,
              followingCount: prev.followedUserIds?.length || 0,
            },
          }));
        } else if (_event === 'SIGNED_OUT') {
          setState(prev => ({ ...prev, userProfile: null }));
        }
      });

      return () => {
        authListener?.subscription.unsubscribe();
      };
    }
  }, []);

  // Realtime Supabase Channel for instantaneous streak & unfolded sync
  useEffect(() => {
    if (!SUPABASE_ANON_KEY) return;
    let channel: any = null;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        channel = supabase
          .channel(`profiles-realtime-${session.user.id}`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'profiles',
              filter: `id=eq.${session.user.id}`,
            },
            (payload) => {
              if (payload.new) {
                const newStreak = payload.new.streak;
                const newUnfolded = payload.new.facts_viewed_count;
                const newLastLogin = payload.new.last_login_date;
                setState(prev => {
                  const candidateStreak = typeof newStreak === 'number' ? newStreak : prev.streak;
                  const candidateDate = newLastLogin || prev.lastLoginDate;
                  const evalResult = evaluateDailyStreak(candidateDate, candidateStreak);
                  const resolvedStreak = evalResult.newStreak;
                  const todayStr = new Date().toDateString();
                  const resolvedDate = evalResult.shouldUpdate ? todayStr : (candidateDate || todayStr);

                  if (evalResult.shouldUpdate) {
                    syncUserDataToRemote({ streak: resolvedStreak, lastLoginDate: resolvedDate });
                  }

                  return {
                    ...prev,
                    streak: resolvedStreak,
                    lastLoginDate: resolvedDate,
                    factsViewedCount: typeof newUnfolded === 'number' ? Math.max(0, newUnfolded) : prev.factsViewedCount,
                  };
                });
              }
            }
          )
          .subscribe();
      }
    });

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [state.userProfile?.email]);

  // Re-evaluate streak immediately when app resumes from background or screen is unlocked
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        setState(prev => {
          const evalResult = evaluateDailyStreak(prev.lastLoginDate, prev.streak);
          if (!evalResult.shouldUpdate) return prev;

          const todayStr = new Date().toDateString();
          syncUserDataToRemote({ streak: evalResult.newStreak, lastLoginDate: todayStr });
          return {
            ...prev,
            streak: evalResult.newStreak,
            lastLoginDate: todayStr,
          };
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Save data on change - only after initial load finishes
  useEffect(() => {
    if (!isLoadedFromStorage.current) return;
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        if (typeof state.streak === 'number' && state.streak > 0) {
          await AsyncStorage.setItem(PERMANENT_STREAK_KEY, String(state.streak));
          await AsyncStorage.setItem(PERMANENT_BACKUP_KEY, String(state.streak));
        }
        if (state.lastLoginDate) {
          await AsyncStorage.setItem(PERMANENT_LAST_LOGIN_KEY, state.lastLoginDate);
        }
      } catch (e) {
        console.error('Failed to save user data');
      }
    };
    saveData();
  }, [state]);

  const checkStreak = (lastLogin: string | null, currentStreak: number) => {
    const today = new Date().toDateString();
    const evaluation = evaluateDailyStreak(lastLogin, currentStreak);

    if (!evaluation.shouldUpdate && lastLogin === today) return;

    setState(prev => ({ ...prev, streak: evaluation.newStreak, lastLoginDate: today }));
    syncUserDataToRemote({ streak: evaluation.newStreak, lastLoginDate: today });
    AsyncStorage.setItem(PERMANENT_STREAK_KEY, String(evaluation.newStreak)).catch(() => {});
    AsyncStorage.setItem(PERMANENT_BACKUP_KEY, String(evaluation.newStreak)).catch(() => {});
    AsyncStorage.setItem(PERMANENT_LAST_LOGIN_KEY, today).catch(() => {});
  };

  const login = async (emailOrName: string, password?: string, name?: string) => {
    const rawInput = emailOrName.trim();
    const displayName = name || (rawInput.includes('@') ? rawInput.split('@')[0] : rawInput);
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    if (SUPABASE_ANON_KEY && password) {
      try {
        let targetEmail = rawInput.toLowerCase();

        // If the user typed their username instead of email, resolve their email from Supabase
        if (!targetEmail.includes('@')) {
          const { data: resolvedEmail } = await supabase.rpc('resolve_email_by_username', {
            lookup_username: targetEmail,
          });

          if (resolvedEmail) {
            targetEmail = String(resolvedEmail).toLowerCase();
          } else {
            // Also attempt direct query on profiles
            const { data: profile } = await supabase
              .from('profiles')
              .select('email')
              .eq('username', targetEmail)
              .maybeSingle();

            if (profile?.email) {
              targetEmail = profile.email.toLowerCase();
            } else {
              showAlert({
                title: 'Account Not Found',
                message: `No account was found with the username "@${rawInput}". Please check the spelling or enter your email address.`,
                icon: 'warning',
              });
              return;
            }
          }
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: targetEmail,
          password,
        });

        if (error) {
          console.warn('Supabase login error:', error.message);
          showAlert({
            title: 'Sign In Failed',
            message: error.message,
            icon: 'danger',
          });
          return;
        }

        if (data.user) {
          const meta = (data.user.user_metadata as any) || {};
          const metaName = meta.name || formattedName;
          const metaUsername = meta.username || targetEmail.split('@')[0].toLowerCase().replace(/\s+/g, '_');

          // Await full remote user data restoration before rendering state
          await restoreRemoteUserData(data.user.id, meta);

          setState(prev => ({
            ...prev,
            userProfile: {
              name: metaName,
              firstName: meta.firstName || formattedName.split(' ')[0],
              lastName: meta.lastName || formattedName.split(' ').slice(1).join(' '),
              username: metaUsername,
              avatarUrl: meta.avatarUrl || prev.userProfile?.avatarUrl,
              email: data.user!.email || targetEmail,
              joinedDate: new Date(data.user!.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              preferredTranslation: meta.preferredTranslation || prev.userProfile?.preferredTranslation || 'ESV',
              notificationsEnabled: prev.userProfile?.notificationsEnabled ?? true,
              studyFocus: meta.studyFocus || prev.userProfile?.studyFocus,
              dailyGoal: meta.dailyGoal || prev.userProfile?.dailyGoal,
              knowledgeLevel: meta.knowledgeLevel || prev.userProfile?.knowledgeLevel,
              fontSize: meta.fontSize || prev.userProfile?.fontSize || 16,
              fontType: meta.fontType || prev.userProfile?.fontType || 'serif',
              redLetterEnabled: meta.redLetterEnabled ?? prev.userProfile?.redLetterEnabled ?? true,
              followersCount: 0,
              followingCount: prev.followedUserIds?.length || 0,
            },
          }));
          return;
        }
      } catch (err: any) {
        console.warn('Supabase auth network notice:', err);
        showAlert({
          title: 'Network Error',
          message: err?.message || 'Unable to connect to Supabase authentication service.',
          icon: 'warning',
        });
        return;
      }
    }

    const fallbackEmail = rawInput.includes('@') ? rawInput : `${rawInput.toLowerCase().replace(/\s+/g, '')}@example.com`;
    setState(prev => ({
      ...prev,
      userProfile: {
        name: prev.userProfile?.name || formattedName,
        firstName: prev.userProfile?.firstName || formattedName.split(' ')[0],
        lastName: prev.userProfile?.lastName || formattedName.split(' ').slice(1).join(' '),
        username: prev.userProfile?.username || rawInput.split('@')[0].toLowerCase().replace(/\s+/g, '_'),
        avatarUrl: prev.userProfile?.avatarUrl,
        email: prev.userProfile?.email || fallbackEmail,
        joinedDate: prev.userProfile?.joinedDate || 'September 2026',
        preferredTranslation: prev.userProfile?.preferredTranslation || 'ESV',
        notificationsEnabled: prev.userProfile?.notificationsEnabled ?? true,
        studyFocus: prev.userProfile?.studyFocus,
        dailyGoal: prev.userProfile?.dailyGoal,
        knowledgeLevel: prev.userProfile?.knowledgeLevel,
        fontSize: prev.userProfile?.fontSize || 16,
        fontType: prev.userProfile?.fontType || 'serif',
        redLetterEnabled: prev.userProfile?.redLetterEnabled ?? true,
        followersCount: 0,
        followingCount: prev.followedUserIds?.length || 0,
      },
    }));
  };

  const uploadAvatar = async (uri: string): Promise<{ success: boolean; avatarUrl?: string; error?: string }> => {
    try {
      if (SUPABASE_ANON_KEY) {
        try {
          const userSession = (await supabase.auth.getSession()).data.session?.user;
          const userId = userSession?.id || state.userProfile?.username || 'user';
          const fileName = `${userId}/avatar_${Date.now()}.avif`;

          const response = await fetch(uri);
          const blob = await response.blob();

          const { data, error } = await supabase.storage
            .from('avatars')
            .upload(fileName, blob, {
              contentType: 'image/avif',
              upsert: true,
            });

          if (!error && data) {
            const { data: publicUrlData } = supabase.storage
              .from('avatars')
              .getPublicUrl(fileName);

            const publicUrl = publicUrlData.publicUrl;

            await supabase.auth.updateUser({
              data: { avatarUrl: publicUrl },
            });

            updateProfile({ avatarUrl: publicUrl });
            return { success: true, avatarUrl: publicUrl };
          }
        } catch (storageErr) {
          console.log('Supabase storage upload fallback:', storageErr);
        }
      }

      // Offline / local fallback
      updateProfile({ avatarUrl: uri });
      return { success: true, avatarUrl: uri };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Failed to update avatar' };
    }
  };

  const RESERVED_USERNAMES = [
    'admin', 'administrator', 'root', 'daniel', 'sarah', 'paul', 'john',
    'david', 'grace', 'mary', 'moses', 'peter', 'james', 'exegeomai', 'moderator',
    'thulane', 'system', 'support', 'help'
  ];

  const checkUsernameAvailability = async (username: string): Promise<{ available: boolean; reason?: string }> => {
    const clean = username.trim().toLowerCase();
    if (!clean) {
      return { available: false, reason: 'Username cannot be blank.' };
    }
    if (clean.length < 3) {
      return { available: false, reason: 'Username must be at least 3 characters long.' };
    }
    if (clean.length > 20) {
      return { available: false, reason: 'Username must not exceed 20 characters.' };
    }
    if (!/^[a-z0-9_]+$/.test(clean)) {
      return { available: false, reason: 'Only lowercase letters, numbers, and underscores are allowed.' };
    }

    // Check reserved / existing names
    if (RESERVED_USERNAMES.includes(clean)) {
      return { available: false, reason: `Username '@${clean}' is already in use.` };
    }

    // Check Supabase if configured
    if (SUPABASE_ANON_KEY) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', clean)
          .maybeSingle();

        if (!error && data && (data as any).username) {
          return { available: false, reason: `Username '@${clean}' is already in use.` };
        }
      } catch (e) {
        console.log('Supabase check username notice:', e);
      }
    }

    return { available: true };
  };

  const signupExtended = async (params: SignUpExtendedParams): Promise<{ success: boolean; error?: string }> => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      countryCode,
      phoneNumber,
      preferredTranslation = 'ESV',
      studyFocus = 'Original Languages & Strong\'s',
      dailyGoal = '15 mins / day',
      knowledgeLevel = 'Growing Disciple',
    } = params;

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const cleanUsername = username.trim().toLowerCase();

    if (SUPABASE_ANON_KEY && password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: fullName,
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              username: cleanUsername,
              countryCode,
              phoneNumber,
              preferredTranslation,
              studyFocus,
              dailyGoal,
              knowledgeLevel,
            },
          },
        });
        if (error) {
          console.warn('Supabase signup error:', error.message);
          showAlert({
            title: 'Sign Up Notice',
            message: error.message,
            icon: 'warning',
          });
          return { success: false, error: error.message };
        }
        if (data.user) {
          if (!data.session) {
            showAlert({
              title: 'Verification Email Sent',
              message: `A confirmation email has been dispatched to ${email}. Please verify your email to finish signing in.`,
              icon: 'success',
            });
          }
          setState(prev => ({
            ...prev,
            userProfile: {
              name: fullName,
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              username: cleanUsername,
              email,
              countryCode,
              phoneNumber,
              joinedDate: new Date(data.user!.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              preferredTranslation,
              notificationsEnabled: true,
              redLetterEnabled: true,
              studyFocus,
              dailyGoal,
              knowledgeLevel,
            },
          }));
          return { success: true };
        }
      } catch (err: any) {
        console.warn('Supabase signup network notice:', err);
        showAlert({
          title: 'Network Error',
          message: err?.message || 'Unable to connect to Supabase authentication service.',
          icon: 'warning',
        });
        return { success: false, error: err?.message };
      }
    }

    // Offline / fallback signup
    setState(prev => ({
      ...prev,
      userProfile: {
        name: fullName,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: cleanUsername,
        email,
        countryCode,
        phoneNumber,
        joinedDate: 'September 2026',
        preferredTranslation,
        notificationsEnabled: true,
        redLetterEnabled: true,
        studyFocus,
        dailyGoal,
        knowledgeLevel,
      },
    }));
    return { success: true };
  };

  const signup = async (name: string, email: string, password?: string) => {
    return signupExtended({
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      username: name.toLowerCase().replace(/\s+/g, '_'),
      email,
      password: password || 'SecurePass123!',
    });
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      userProfile: prev.userProfile ? { ...prev.userProfile, ...updates } : null,
    }));

    if (updates.notificationsEnabled !== undefined) {
      if (updates.notificationsEnabled) {
        registerAllAutomatedNotifications().catch(() => {});
      } else {
        cancelAllAutomatedNotifications().catch(() => {});
      }
    }

    if (SUPABASE_ANON_KEY) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await supabase.auth.updateUser({
            data: updates,
          });

          const profileUpdates: any = {};
          if (updates.name) profileUpdates.name = updates.name;
          if (updates.username) profileUpdates.username = updates.username;
          if (updates.avatarUrl) profileUpdates.avatar_url = updates.avatarUrl;
          if (Object.keys(profileUpdates).length > 0) {
            await supabase.from('profiles').update(profileUpdates).eq('id', session.user.id);
          }
        }
      } catch (err) {
        console.warn('[UserContext] updateProfile sync notice:', err);
      }
    }
  };

  const logout = async () => {
    if (SUPABASE_ANON_KEY) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase sign out notice:', err);
      }
    }
    setState(prev => ({ ...prev, userProfile: null }));
  };

  const toggleFavoriteFact = (fact: Fact) => {
    setState(prev => {
      const exists = prev.favoritesFacts.find(f => f.id === fact.id);
      const nextFavorites = exists
        ? prev.favoritesFacts.filter(f => f.id !== fact.id)
        : [...prev.favoritesFacts, fact];
      syncUserDataToRemote({ favoritesFacts: nextFavorites });
      return { ...prev, favoritesFacts: nextFavorites };
    });
  };

  const toggleFavoriteScripture = (scripture: Scripture) => {
    setState(prev => {
      const exists = prev.favoritesScriptures.find(s => s.id === scripture.id);
      const nextFavorites = exists
        ? prev.favoritesScriptures.filter(s => s.id !== scripture.id)
        : [...prev.favoritesScriptures, scripture];
      syncUserDataToRemote({ favoritesScriptures: nextFavorites });
      return { ...prev, favoritesScriptures: nextFavorites };
    });
  };

  const markWOTDComplete = (wotd: WOTDEntry) => {
    setState(prev => {
      const exists = prev.completedWOTDs.find(w => w.id === wotd.id);
      if (exists) return prev;
      return { ...prev, completedWOTDs: [...prev.completedWOTDs, wotd] };
    });
  };

  const markFactRead = (id: string) => {
    setState(prev => {
      if (prev.readFactIds.includes(id)) return prev;
      const nextIds = [...prev.readFactIds, id];
      const nextCount = nextIds.length;
      syncUserDataToRemote({ readFactIds: nextIds, factsViewedCount: nextCount });
      return { ...prev, readFactIds: nextIds, factsViewedCount: nextCount };
    });
  };

  const isFactRead = (id: string) => state.readFactIds.includes(id);

  const incrementFactsViewed = () => {
    setState(prev => {
      const nextCount = prev.readFactIds.length;
      syncUserDataToRemote({ factsViewedCount: nextCount });
      return { ...prev, factsViewedCount: nextCount };
    });
  };

  const isFactFavorited = (id: string) => state.favoritesFacts.some(f => f.id === id);
  const isScriptureFavorited = (id: string) => state.favoritesScriptures.some(s => s.id === id);
  const isWOTDCompleted = (id: string) => state.completedWOTDs.some(w => w.id === id);

  const toggleFollowUser = (userId: string) => {
    setState(prev => {
      const isFollowed = prev.followedUserIds.includes(userId);
      const newFollowed = isFollowed
        ? prev.followedUserIds.filter(id => id !== userId)
        : [...prev.followedUserIds, userId];

      return {
        ...prev,
        followedUserIds: newFollowed,
        userProfile: prev.userProfile ? {
          ...prev.userProfile,
          followingCount: newFollowed.length,
        } : null,
      };
    });
  };

  const isUserFollowed = (userId: string) => state.followedUserIds.includes(userId);

  const setLastReadBible = (book: string, chapter: number, translation: string) => {
    const nextLastRead = { book, chapter, translation };
    setState(prev => ({
      ...prev,
      lastReadBible: nextLastRead,
    }));
    syncUserDataToRemote({ lastReadBible: nextLastRead });
  };

  const setVerseHighlight = (verseKey: string, color?: string) => {
    setState(prev => {
      const updated = { ...prev.bibleHighlights };
      if (color) {
        updated[verseKey] = color;
      } else {
        delete updated[verseKey];
      }
      syncUserDataToRemote({ bibleHighlights: updated });
      return { ...prev, bibleHighlights: updated };
    });
  };

  const setReaderTheme = (theme: 'light' | 'sepia' | 'dark') => {
    setState(prev => ({ ...prev, readerTheme: theme }));
  };

  const incrementSharesCount = () => {
    setState(prev => ({
      ...prev,
      sharesCount: (prev.sharesCount || 0) + 1,
    }));
  };

  const setStreak = (days: number) => {
    const clamped = Math.max(1, Math.min(9999, Math.round(days)));
    const today = new Date().toDateString();
    setState(prev => ({ ...prev, streak: clamped, lastLoginDate: today }));
    syncUserDataToRemote({ streak: clamped, lastLoginDate: today });
    AsyncStorage.setItem(PERMANENT_STREAK_KEY, String(clamped)).catch(() => {});
    AsyncStorage.setItem(PERMANENT_BACKUP_KEY, String(clamped)).catch(() => {});
    AsyncStorage.setItem(PERMANENT_LAST_LOGIN_KEY, today).catch(() => {});
  };

  const notifications = useMemo<InAppNotificationItem[]>(() => {
    const scheduled = getDispatchedScheduledNotifications(1);
    const achievements = getUnlockedAchievementNotifications(
      {
        streak: state.streak || 1,
        bookmarksCount: state.favoritesScriptures?.length || 0,
        highlightsCount: Object.keys(state.bibleHighlights || {}).length,
        sharesCount: state.sharesCount || 0,
      },
      achievementTimestamps
    );

    const idMap = new Map<string, InAppNotificationItem>();
    [...achievements, ...receivedPushes, ...scheduled].forEach((item) => {
      if (!idMap.has(item.id)) {
        idMap.set(item.id, item);
      }
    });

    const combined = Array.from(idMap.values());
    const filtered = combined.filter((item) => !dismissedNotificationIds.includes(item.id));

    return filtered
      .map((item) => ({
        ...item,
        isRead: readNotificationIds.includes(item.id),
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [
    state.streak,
    state.favoritesScriptures,
    state.bibleHighlights,
    state.sharesCount,
    readNotificationIds,
    dismissedNotificationIds,
    notificationsTick,
    achievementTimestamps,
    receivedPushes,
  ]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  // Real-time achievement unlock detection while in-app
  useEffect(() => {
    const unlockedAchievements = getUnlockedAchievementNotifications(
      {
        streak: state.streak || 1,
        bookmarksCount: state.favoritesScriptures?.length || 0,
        highlightsCount: Object.keys(state.bibleHighlights || {}).length,
        sharesCount: state.sharesCount || 0,
      },
      achievementTimestamps
    );

    const currentIds = new Set(unlockedAchievements.map(a => a.id));

    if (isInitialAchievementCheck.current) {
      previousUnlockedMilestoneIds.current = currentIds;
      isInitialAchievementCheck.current = false;
      return;
    }

    for (const ach of unlockedAchievements) {
      if (!previousUnlockedMilestoneIds.current.has(ach.id)) {
        const nowIso = new Date().toISOString();
        if (ach.achievementId) {
          saveAchievementUnlockTimestamp(ach.achievementId, nowIso);
          setAchievementTimestamps((prev) => ({ ...prev, [ach.achievementId!]: nowIso }));
        }
        setActiveAchievementAlert(ach);
        break;
      }
    }

    previousUnlockedMilestoneIds.current = currentIds;
  }, [state.streak, state.favoritesScriptures, state.bibleHighlights, state.sharesCount, achievementTimestamps]);

  const markNotificationAsRead = useCallback((id: string) => {
    setReadNotificationIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveReadNotificationIds(next);
      return next;
    });
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    const allIds = notifications.map(n => n.id);
    setReadNotificationIds(allIds);
    saveReadNotificationIds(allIds);
  }, [notifications]);

  const deleteNotification = useCallback((id: string) => {
    setDismissedNotificationIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveDismissedNotificationIds(next);
      return next;
    });
  }, []);

  const dismissAchievementAlert = useCallback(() => {
    setActiveAchievementAlert(null);
  }, []);

  const refreshNotifications = useCallback(() => {
    setNotificationsTick(prev => prev + 1);
  }, []);

  // ----------------------------------------------------
  // Community Safety: Blocked Users
  // ----------------------------------------------------
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);

  useEffect(() => {
    SafetyService.getBlockedUserIds().then((ids) => {
      setBlockedUserIds(ids);
    });
  }, []);

  const blockUser = useCallback(async (userId: string) => {
    const updated = await SafetyService.blockUser(userId);
    setBlockedUserIds(updated);
  }, []);

  const unblockUser = useCallback(async (userId: string) => {
    const updated = await SafetyService.unblockUser(userId);
    setBlockedUserIds(updated);
  }, []);

  const isUserBlocked = useCallback((userId: string) => {
    return blockedUserIds.includes(userId);
  }, [blockedUserIds]);

  // ----------------------------------------------------
  // Biometric App Lock
  // ----------------------------------------------------
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [isBiometricLockEnabled, setIsBiometricLockEnabledState] = useState<boolean>(false);
  const [isAppLocked, setIsAppLocked] = useState<boolean>(false);
  const [lockTimeoutSeconds, setLockTimeoutSecondsState] = useState<number>(0);
  const [isPrivacyShieldEnabled, setIsPrivacyShieldEnabledState] = useState<boolean>(true);
  const [isPinSet, setIsPinSetState] = useState<boolean>(false);
  const backgroundTimestampRef = useRef<number | null>(null);

  // Scholar Privacy Controls (Phase 3)
  const [isPrivateStudyMode, setIsPrivateStudyModeState] = useState<boolean>(false);
  const [isDiscoverableInSearch, setIsDiscoverableInSearchState] = useState<boolean>(true);
  const [showStreaksPublicly, setShowStreaksPubliclyState] = useState<boolean>(true);
  const [privateStudyNotes, setPrivateStudyNotesState] = useState<boolean>(false);
  const isPrivateStudyModeRef = useRef<boolean>(false);

  const refreshPinStatus = useCallback(async () => {
    const set = await PinSecurityService.isPinSet();
    setIsPinSetState(set);
  }, []);

  useEffect(() => {
    BiometricService.checkSupport().then((status) => {
      setIsBiometricSupported(status.isSupported && status.isEnrolled);
      setBiometricType(status.biometricType);
    });

    BiometricService.isLockEnabled().then(async (enabled) => {
      setIsBiometricLockEnabledState(enabled);
      const pinActive = await PinSecurityService.isPinSet();
      if (enabled || pinActive) {
        setIsAppLocked(true);
      }
    });

    BiometricService.getLockTimeout().then(setLockTimeoutSecondsState);
    BiometricService.isPrivacyShieldEnabled().then(setIsPrivacyShieldEnabledState);
    refreshPinStatus();

    // Load Scholar Privacy preferences
    PrivacyService.getPreferences().then((prefs) => {
      setIsPrivateStudyModeState(prefs.isPrivateStudyMode);
      isPrivateStudyModeRef.current = prefs.isPrivateStudyMode;
      setIsDiscoverableInSearchState(prefs.isDiscoverableInSearch);
      setShowStreaksPubliclyState(prefs.showStreaksPublicly);
      setPrivateStudyNotesState(prefs.privateStudyNotes);
    });
  }, [refreshPinStatus]);

  const setPrivateStudyMode = useCallback(async (enabled: boolean) => {
    const ok = await PrivacyService.setPrivateStudyMode(enabled);
    if (ok) {
      setIsPrivateStudyModeState(enabled);
      isPrivateStudyModeRef.current = enabled;
    }
  }, []);

  const setDiscoverableInSearch = useCallback(async (enabled: boolean) => {
    const ok = await PrivacyService.setDiscoverableInSearch(enabled);
    if (ok) setIsDiscoverableInSearchState(enabled);
  }, []);

  const setShowStreaksPublicly = useCallback(async (enabled: boolean) => {
    const ok = await PrivacyService.setShowStreaksPublicly(enabled);
    if (ok) setShowStreaksPubliclyState(enabled);
  }, []);

  const setPrivateStudyNotes = useCallback(async (enabled: boolean) => {
    const ok = await PrivacyService.setPrivateStudyNotes(enabled);
    if (ok) setPrivateStudyNotesState(enabled);
  }, []);

  const setLockTimeoutSeconds = useCallback(async (seconds: number) => {
    const ok = await BiometricService.setLockTimeout(seconds);
    if (ok) {
      setLockTimeoutSecondsState(seconds);
    }
  }, []);

  const setPrivacyShieldEnabled = useCallback(async (enabled: boolean) => {
    const ok = await BiometricService.setPrivacyShieldEnabled(enabled);
    if (ok) {
      setIsPrivacyShieldEnabledState(enabled);
    }
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        if (backgroundTimestampRef.current === null) {
          backgroundTimestampRef.current = Date.now();
        }
      } else if (nextAppState === 'active') {
        if ((isBiometricLockEnabled || isPinSet) && backgroundTimestampRef.current !== null) {
          const elapsedSec = (Date.now() - backgroundTimestampRef.current) / 1000;
          if (lockTimeoutSeconds === 0 || elapsedSec >= lockTimeoutSeconds) {
            setIsAppLocked(true);
          }
        }
        backgroundTimestampRef.current = null;
      }
    };
    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, [isBiometricLockEnabled, isPinSet, lockTimeoutSeconds]);

  const setBiometricLockEnabled = useCallback(async (enabled: boolean): Promise<{ success: boolean; error?: string }> => {
    const success = await BiometricService.setLockEnabled(enabled);
    if (success) {
      setIsBiometricLockEnabledState(enabled);
      if (!enabled) setIsAppLocked(false);
      return { success: true };
    }
    return { success: false, error: 'Biometric verification cancelled or unavailable' };
  }, []);

  const unlockApp = useCallback(async (): Promise<boolean> => {
    const res = await BiometricService.authenticate('Unlock exégeomai');
    if (res.success) {
      setIsAppLocked(false);
      return true;
    }
    return false;
  }, []);

  const unlockDirectly = useCallback(() => {
    setIsAppLocked(false);
  }, []);

  // ----------------------------------------------------
  // Data Portability & Account Purge (GDPR / POPIA / App Store)
  // ----------------------------------------------------
  const exportStudyJournal = useCallback(async (options?: { encrypted?: boolean }): Promise<{ success: boolean; filePath?: string; error?: string }> => {
    try {
      const exportPayload = {
        exportVersion: '1.0.0',
        exportedAt: new Date().toISOString(),
        appName: 'exégeomai',
        user: {
          name: state.userProfile?.name || 'Fellow Disciple',
          username: state.userProfile?.username || 'believer',
          email: state.userProfile?.email || null,
          joinedDate: state.userProfile?.joinedDate || null,
          streak: state.streak,
          factsViewedCount: state.factsViewedCount,
          sharesCount: state.sharesCount,
        },
        bookmarkedScriptures: state.favoritesScriptures,
        favoriteFacts: state.favoritesFacts,
        completedWordOfTheDay: state.completedWOTDs,
        verseHighlights: state.bibleHighlights,
        lastReadingPosition: state.lastReadBible,
      };

      let outputData = JSON.stringify(exportPayload, null, 2);
      let fileName = `exegeomai-study-journal-${new Date().toISOString().split('T')[0]}.json`;

      if (options?.encrypted) {
        outputData = await EncryptionService.encryptJournal(exportPayload);
        fileName = `exegeomai-study-journal-encrypted-${new Date().toISOString().split('T')[0]}.enc.json`;
      }

      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(fileUri, outputData, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: options?.encrypted ? 'Export Encrypted (AES-256) Study Journal' : 'Export exégeomai Study Journal',
          UTI: 'public.json',
        });
      }

      return { success: true, filePath: fileUri };
    } catch (err: any) {
      console.warn('[UserContext] Export error:', err);
      return { success: false, error: err?.message || 'Failed to export study journal' };
    }
  }, [state]);

  const deleteAccountAndPurgeData = useCallback(async (): Promise<boolean> => {
    try {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          try {
            await supabase.from('profiles').delete().eq('id', session.user.id);
          } catch (delErr) {
            console.warn('Profile delete warning:', delErr);
          }
        }
      } catch (err) {
        console.warn('Remote profile cleanup exception:', err);
      }

      await supabase.auth.signOut().catch(() => {});
      await AsyncStorage.clear().catch(() => {});
      await SecureStoreAdapter.removeItem('@exegeomai_biometric_lock_enabled_v1').catch(() => {});
      await cancelAllAutomatedNotifications().catch(() => {});

      setState({
        userProfile: null,
        favoritesFacts: [],
        favoritesScriptures: [],
        completedWOTDs: [],
        streak: 1,
        factsViewedCount: 0,
        readFactIds: [],
        sharesCount: 0,
        lastLoginDate: null,
        followedUserIds: [],
        lastReadBible: { book: 'John', chapter: 1, translation: 'WEB' },
        bibleHighlights: {},
        readerTheme: 'light',
      });
      setBlockedUserIds([]);
      setIsBiometricLockEnabledState(false);
      setIsAppLocked(false);

      return true;
    } catch (e) {
      console.warn('Purge data error:', e);
      return false;
    }
  }, []);

  return (
    <UserContext.Provider value={{
      ...state,
      hideTabBar,
      setHideTabBar,
      accent,
      setAccent,
      login,
      signup,
      signupExtended,
      checkUsernameAvailability,
      uploadAvatar,
      updateProfile,
      logout,
      toggleFavoriteFact,
      toggleFavoriteScripture,
      markWOTDComplete,
      markFactRead,
      isFactRead,
      incrementFactsViewed,
      incrementSharesCount,
      isFactFavorited,
      isScriptureFavorited,
      isWOTDCompleted,
      toggleFollowUser,
      isUserFollowed,
      setLastReadBible,
      setVerseHighlight,
      setReaderTheme,
      setStreak,
      notifications,
      unreadNotificationsCount,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      deleteNotification,
      activeAchievementAlert,
      dismissAchievementAlert,
      refreshNotifications,
      // Safety, Privacy & Security
      blockedUserIds,
      blockUser,
      unblockUser,
      isUserBlocked,
      exportStudyJournal,
      deleteAccountAndPurgeData,
      isBiometricSupported,
      biometricType,
      isBiometricLockEnabled,
      setBiometricLockEnabled,
      isAppLocked,
      setIsAppLocked,
      unlockApp,
      unlockDirectly,
      lockTimeoutSeconds,
      setLockTimeoutSeconds,
      isPrivacyShieldEnabled,
      setPrivacyShieldEnabled,
      isPinSet,
      refreshPinStatus,
      isPrivateStudyMode,
      setPrivateStudyMode,
      isDiscoverableInSearch,
      setDiscoverableInSearch,
      showStreaksPublicly,
      setShowStreaksPublicly,
      privateStudyNotes,
      setPrivateStudyNotes,
    }}>

      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

/**
 * useApp hook matching Rule 20 and tabs skill specification:
 * const { hideTabBar, accent } = useApp();
 */
export const useApp = () => {
  return useUser();
};
