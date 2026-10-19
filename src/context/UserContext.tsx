import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';
import { colors } from '../theme/colors';
import { supabase, SUPABASE_ANON_KEY } from '../services/supabase';
import type { User } from '@supabase/supabase-js';
import { readLocalSessionUser, AUTH_STORAGE_KEY } from '../services/localSession';
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
import { BiometricService, BiometricAuthResult } from '../services/biometricService';
import { PinSecurityService } from '../services/pinSecurityService';
import { PrivacyService } from '../services/privacyService';
import { EncryptionService } from '../services/encryptionService';
import { SecureStoreAdapter } from '../services/secureStorage';
import { OfflineStudyQueue } from '../services/offlineStudyQueue';
import { ALL_ACHIEVEMENTS } from '../data/achievements';
import { AuthProvider, UserProfile, SignUpExtendedParams } from './AuthContext';
import { SecurityProvider } from './SecurityContext';
import { ReaderSettingsProvider, LastReadBiblePosition } from './ReaderSettingsContext';
import { UserDataProvider } from './UserDataContext';

export type { UserProfile, SignUpExtendedParams, LastReadBiblePosition };

interface UserState {
  userProfile: UserProfile | null;
  favoritesFacts: Fact[];
  favoritesScriptures: Scripture[];
  completedWOTDs: WOTDEntry[];
  streak: number;
  factsViewedCount: number;
  readFactIds: string[];
  sharesCount: number;
  earnedAchievementIds: string[];
  lastLoginDate: string | null;
  streakPendingRemote?: boolean;
  followedUserIds: string[];
  lastReadBible: LastReadBiblePosition;
  bibleHighlights: Record<string, string>;
  readerTheme: 'light' | 'sepia' | 'dark';
}

interface AppContextType extends UserState {
  isLoadingApp: boolean;
  startupError: boolean;
  retryStartup: () => void;
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
  clearAllNotifications: () => void;
  clearAllReadNotifications: () => void;
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
  unlockApp: () => Promise<BiometricAuthResult>;
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
const SECURE_STUDY_KEY = (userId: string) => `@exegeomai_user_data_secure_v2:${userId}`;
const LOCAL_OWNER_KEY = '@exegeomai_local_owner_v1';
const PERMANENT_STREAK_KEY = '@exegeomai_permanent_streak';
const PERMANENT_BACKUP_KEY = '@exegeomai_streak_resilient_v2';
const PERMANENT_LAST_LOGIN_KEY = '@exegeomai_permanent_last_login';

export {
  getLocalDateString,
  normalizeDateStringToLocalYMD,
  getDaysDifference,
  getLatestDateString,
  evaluateDailyStreak,
  healHistoricalDay7Clamp,
  STREAK_CANONICAL_LAUNCH_DATE,
  getExpectedCanonicalStreak,
} from '../services/streakEngine';
import {
  reconcileOfflineOnlineStreak,
  getLocalDateString,
  normalizeDateStringToLocalYMD,
  evaluateDailyStreak,
} from '../services/streakEngine';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showAlert } = useThemedAlert();
  const isLoadedFromStorage = useRef<boolean>(false);
  const activeAuthUserIdRef = useRef<string | null>(null);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [startupError, setStartupError] = useState(false);
  const [startupAttempt, setStartupAttempt] = useState(0);
  const retryStartup = () => setStartupAttempt(n => n + 1);
  const hydrationEpoch = useRef(0);
  const [hideTabBar, setHideTabBar] = useState<boolean>(false);
  const [accent, setAccent] = useState<string>(colors.accent);
  const [state, setState] = useState<UserState>({
    userProfile: null,
    favoritesFacts: [],
    favoritesScriptures: [],
    completedWOTDs: [],
    streak: 1,
    factsViewedCount: 0,
    readFactIds: [],
    sharesCount: 0,
    earnedAchievementIds: [],
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
    const expectedUser = activeAuthUserIdRef.current;
    const expectedEpoch = hydrationEpoch.current;
    if (!SUPABASE_ANON_KEY || isPrivateStudyModeRef.current || !expectedUser) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id === expectedUser && activeAuthUserIdRef.current === expectedUser && hydrationEpoch.current === expectedEpoch) {
        // 1. Sync to Supabase auth user_metadata (guaranteed permanent persistence across logins/devices)
        await supabase.auth.updateUser({
          data: updates,
        });

        if (activeAuthUserIdRef.current !== expectedUser || hydrationEpoch.current !== expectedEpoch) return;
        // 2. Sync to public.profiles table
        const profileUpdate: any = {};
        if (typeof updates.streak === 'number') {
          profileUpdate.streak = updates.streak;
        }
        if (typeof updates.factsViewedCount === 'number') profileUpdate.facts_viewed_count = updates.factsViewedCount;
        if (updates.lastLoginDate) {
          profileUpdate.last_login_date = updates.lastLoginDate;
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
    const epoch = hydrationEpoch.current;
    try {
      let remoteStreak = typeof meta?.streak === 'number' ? meta.streak : undefined;
      let remoteLastLogin = meta?.lastLoginDate;

      let profileLoaded = false;
      // Query profiles table for latest realtime values
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('streak, facts_viewed_count, last_login_date')
          .eq('id', userId)
          .single();

        profileLoaded = !profileError;
        if (profile) {
          if (typeof profile.streak === 'number') remoteStreak = profile.streak;
          if (profile.last_login_date) remoteLastLogin = profile.last_login_date;
        }
      } catch (profileErr) {
        // Silently fallback to metadata
      }

      // Restore immutable historical unlocks from the owner's protected
      // server table. Missing migration/offline errors leave local badges intact.
      let remoteAchievementIds: string[] = [];
      try {
        const { data: achievements, error } = await supabase
          .from('user_earned_achievements')
          .select('achievement_id').eq('user_id', userId);
        if (!error && Array.isArray(achievements)) {
          remoteAchievementIds = achievements
            .map(row => row.achievement_id)
            .filter((id): id is string => typeof id === 'string');
        }
      } catch {}

      if (activeAuthUserIdRef.current !== userId || hydrationEpoch.current !== epoch) return;
      setState(prev => {
        if (activeAuthUserIdRef.current !== userId || hydrationEpoch.current !== epoch) return prev;
        const todayStr = getLocalDateString();
        const { finalStreak, finalLastLogin } = reconcileOfflineOnlineStreak({
          localStreak: prev.streak, localLastLogin: prev.streakPendingRemote ? null : prev.lastLoginDate,
          remoteStreak, remoteLastLogin, todayStr,
        });

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

        if (profileLoaded) setTimeout(() => {
          if (activeAuthUserIdRef.current === userId && hydrationEpoch.current === epoch) void syncUserDataToRemote({
            streak: finalStreak, lastLoginDate: finalLastLogin,
          });
        }, 0);

        return {
          ...prev,
          streak: finalStreak,
          streakPendingRemote: prev.streakPendingRemote && !profileLoaded,
          factsViewedCount: finalUnfolded,
          lastLoginDate: finalLastLogin,
          favoritesFacts: mergedFavFacts,
          favoritesScriptures: mergedFavScriptures,
          readFactIds: mergedReadFactIds,
          bibleHighlights: mergedHighlights,
          earnedAchievementIds: Array.from(new Set([
            ...prev.earnedAchievementIds, ...remoteAchievementIds,
          ])),
          lastReadBible: meta?.lastReadBible || prev.lastReadBible,
        };
      });
    } catch (err) {
      console.warn('[UserContext] restoreRemoteUserData notice:', err);
    }
  };

  // Milestones are permanently earned once; bookmark/highlight removals
  // must not revoke a previously unlocked badge. The local secure cache
  // updates immediately when studying offline, while the owner-only queue
  // submits the achievement later if private study mode is disabled.
  useEffect(() => {
    if (!isLoadedFromStorage.current || !activeAuthUserIdRef.current) return;
    const stats: Record<'streak' | 'bookmark' | 'highlight' | 'share', number> = {
      streak: state.streak,
      bookmark: state.favoritesScriptures.length,
      highlight: Object.keys(state.bibleHighlights).length,
      share: state.sharesCount,
    };
    const newlyEarned = Object.values(ALL_ACHIEVEMENTS)
      .flat()
      .filter(a => stats[a.category] >= a.target && !state.earnedAchievementIds.includes(a.id))
      .map(a => a.id);
    if (!newlyEarned.length) return;
    setState(prev => ({
      ...prev,
      earnedAchievementIds: Array.from(new Set([...prev.earnedAchievementIds, ...newlyEarned])),
    }));
    if (!isPrivateStudyModeRef.current) {
      for (const id of newlyEarned) {
        OfflineStudyQueue.enqueue('earn_achievement', id, true)
          .then(() => OfflineStudyQueue.flush())
          .catch(() => console.warn('[OfflineStudy] Earned achievement awaiting sync.'));
      }
    }
  }, [state.streak, state.favoritesScriptures, state.bibleHighlights,
      state.sharesCount, state.earnedAchievementIds]);

  // Replay previously recorded actions when the app returns to the foreground.
  // This does not attempt to authenticate a new user while offline.
  useEffect(() => {
    if (!isPrivateStudyModeRef.current) OfflineStudyQueue.flush().catch(() => {});
    const subscription = AppState.addEventListener('change', status => {
      if (status === 'active' && !isPrivateStudyModeRef.current) OfflineStudyQueue.flush().catch(() => {});
    });
    return () => subscription.remove();
  }, []);

  // Restore local identity and study data before choosing a navigation stack.
  // Never wait for token refresh / internet to unlock an already signed-in user's
  // encrypted local library. SIGNED_OUT remains an explicit local-access boundary.
  useEffect(() => {
    let active = true;
    let sawAuthEvent = false;
    const resetState = () => setState(prev => ({
      ...prev, userProfile: null, favoritesFacts: [], favoritesScriptures: [],
      completedWOTDs: [], readFactIds: [], bibleHighlights: {},
      followedUserIds: [], factsViewedCount: 0, sharesCount: 0,
      earnedAchievementIds: [], streak: 1, lastLoginDate: null, streakPendingRemote: false,
      lastReadBible: { book: 'John', chapter: 3, translation: 'web' }, readerTheme: 'light',
    }));
    const restore = async (user: User | null) => {
      if (!active) return;
      const epoch = ++hydrationEpoch.current;
      const current = () => active && hydrationEpoch.current === epoch;
      isLoadedFromStorage.current = false;
      activeAuthUserIdRef.current = user?.id || null;
      setIsLoadingApp(true);
      setStartupError(false);
      // Hide the previous account while its replacement loads.
      resetState();
      try {
        if (!user) { if (current()) setIsLoadingApp(false); return; }
        let raw = await SecureStoreAdapter.getItem(SECURE_STUDY_KEY(user.id));
        const owner = await AsyncStorage.getItem(LOCAL_OWNER_KEY);
        if (!raw && owner === user.id) {
          const legacy = await AsyncStorage.getItem(STORAGE_KEY);
          if (legacy && JSON.parse(legacy)._authUserId === user.id) raw = legacy;
        }
        const saved = raw ? JSON.parse(raw) : {};
        if (raw && saved._authUserId !== user.id) throw Error('Study cache owner mismatch');
        delete saved._authUserId;
        // Old plaintext backup counters are only eligible for their recorded owner.
        const backupStreak = !raw && owner === user.id
          ? Number(await AsyncStorage.getItem(PERMANENT_STREAK_KEY)) || 1 : 1;
        const backupDate = !raw && owner === user.id
          ? await AsyncStorage.getItem(PERMANENT_LAST_LOGIN_KEY) : null;
        const local = reconcileOfflineOnlineStreak({
          localStreak: saved.streak || 1, localLastLogin: saved.lastLoginDate,
          remoteStreak: backupStreak, remoteLastLogin: backupDate,
        });
        // If no dated local snapshot exists, use the persisted session's metadata.
        const meta = user.user_metadata || {};
        const progress = reconcileOfflineOnlineStreak({
          localStreak: saved.lastLoginDate || backupDate ? local.finalStreak : 1,
          localLastLogin: saved.lastLoginDate || backupDate ? local.finalLastLogin : null,
          remoteStreak: meta.streak, remoteLastLogin: meta.lastLoginDate,
        });
        if (!current()) return;
        const profile: UserProfile = {
          ...(saved.userProfile || {}), ...meta,
          name: meta.name || saved.userProfile?.name || user.email?.split('@')[0] || 'Believer',
          username: meta.username || saved.userProfile?.username || user.email?.split('@')[0] || 'believer',
          email: user.email || '', joinedDate: user.created_at,
          notificationsEnabled: saved.userProfile?.notificationsEnabled ?? true,
          redLetterEnabled: meta.redLetterEnabled ?? saved.userProfile?.redLetterEnabled ?? true,
        };
        isLoadedFromStorage.current = true;
        setState(prev => ({ ...prev, ...saved, userProfile: profile,
          earnedAchievementIds: saved.earnedAchievementIds || [],
          streak: progress.finalStreak, lastLoginDate: progress.finalLastLogin,
          streakPendingRemote: saved.streakPendingRemote ?? !(saved.lastLoginDate || backupDate || meta.lastLoginDate),
        }));
        setIsLoadingApp(false);
        // Remote restoration is a background step, after local hydration, outside
        // Supabase's synchronous auth callback and its internal auth lock.
        void restoreRemoteUserData(user.id, meta);
        if (profile.notificationsEnabled) void registerAllAutomatedNotifications().catch(() => {});
      } catch {
        // A storage failure is not sign-out. Do not erase or overwrite a cache.
        if (current()) { setStartupError(true); setIsLoadingApp(false); }
      }
    };
    setIsLoadingApp(true);
    void readLocalSessionUser().then(user => {
      if (!sawAuthEvent) return restore(user);
    }).catch(() => {
      if (active && !sawAuthEvent) { setStartupError(true); setIsLoadingApp(false); }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      // Initial/token events with no session can be transient during offline
      // refresh. Only explicit SIGNED_OUT closes local access.
      if (event === 'SIGNED_OUT') {
        sawAuthEvent = true;
        ++hydrationEpoch.current;
        activeAuthUserIdRef.current = null;
        isLoadedFromStorage.current = false;
        resetState(); setStartupError(false); setIsLoadingApp(false);
      } else if (session?.user && session.user.id !== activeAuthUserIdRef.current) {
        sawAuthEvent = true;
        const user = session.user;
        const scheduledEpoch = ++hydrationEpoch.current;
        setTimeout(() => { if (active && hydrationEpoch.current === scheduledEpoch) void restore(user); }, 0);
      }
      // USER_UPDATED/TOKEN_REFRESHED for the same user must not rehydrate,
      // rewrite today's date, or start another updateUser feedback loop.
    });
    return () => { active = false; ++hydrationEpoch.current; listener.subscription.unsubscribe(); };
  }, [startupAttempt]);

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
                // Reconcile dated snapshots; repeated same-day events never increment twice.
                setState(prev => {
                  if (activeAuthUserIdRef.current !== session.user.id || !isLoadedFromStorage.current) return prev;
                  const { finalStreak: resolvedStreak, finalLastLogin: resolvedLastLogin } = reconcileOfflineOnlineStreak({
                    localStreak: prev.streak, localLastLogin: prev.lastLoginDate,
                    remoteStreak: newStreak, remoteLastLogin: newLastLogin,
                  });
                  return {
                    ...prev,
                    streak: resolvedStreak,
                    lastLoginDate: resolvedLastLogin,
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
        const todayStr = getLocalDateString();
        setState(prev => {
          const lastLoginYmd = normalizeDateStringToLocalYMD(prev.lastLoginDate);

          if (!isLoadedFromStorage.current || !activeAuthUserIdRef.current) return prev;

          // If already checked today and not lagging, do nothing!
          if (lastLoginYmd === todayStr) return prev;

          // Midnight crossed into a new calendar day
          const evalResult = evaluateDailyStreak(prev.lastLoginDate, prev.streak);
          if (!evalResult.shouldUpdate) return prev;

          const updatedStreak = evalResult.newStreak;
          syncUserDataToRemote({ streak: updatedStreak, lastLoginDate: todayStr });
          AsyncStorage.setItem(PERMANENT_STREAK_KEY, String(updatedStreak)).catch(() => {});
          AsyncStorage.setItem(PERMANENT_BACKUP_KEY, String(updatedStreak)).catch(() => {});
          AsyncStorage.setItem(PERMANENT_LAST_LOGIN_KEY, todayStr).catch(() => {});

          return {
            ...prev,
            streak: updatedStreak,
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
    if (!isLoadedFromStorage.current || !state.userProfile) return;
    const expectedUser = activeAuthUserIdRef.current;
    if (!expectedUser) return;
    const saveData = async () => {
      try {
        // Persist locally without waiting for a network-dependent token refresh.
        if (activeAuthUserIdRef.current !== expectedUser) return;
        await SecureStoreAdapter.setItem(SECURE_STUDY_KEY(expectedUser), JSON.stringify({
          ...state, _authUserId: expectedUser,
        }));
        if (activeAuthUserIdRef.current !== expectedUser) return;
        await AsyncStorage.setItem(LOCAL_OWNER_KEY, expectedUser);
        await AsyncStorage.removeItem(STORAGE_KEY);
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

  const login = async (emailOrName: string, password?: string, name?: string) => {
    const rawInput = emailOrName.trim();

    if (SUPABASE_ANON_KEY && password) {
      try {
        let targetEmail = rawInput.toLowerCase();

        // Public username-to-email resolution is disabled to prevent email
        // enumeration. A secure server-side username/password endpoint can
        // restore username sign-in in a separate, audited migration.
        if (!targetEmail.includes('@')) {
          showAlert({
            title: 'Email Required',
            message: 'For your account security, sign in using your email address.',
            icon: 'warning',
          });
          return;
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

        if (data.user && data.session) return;

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

    // No fabricated accounts: a first login requires a real Supabase session.
    showAlert({
      title: 'Sign In Unavailable',
      message: 'Sign in with your email and password while online. Previously authenticated sessions can use downloaded content offline.',
      icon: 'warning',
    });
  };

  const uploadAvatar = async (uri: string): Promise<{ success: boolean; avatarUrl?: string; error?: string }> => {
    try {
      if (SUPABASE_ANON_KEY) {
        try {
          const userSession = (await supabase.auth.getSession()).data.session?.user;
          if (!userSession?.id) return { success: false, error: 'Sign in before uploading a profile image.' };
          const userId = userSession.id;
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

    return { success: false, error: 'Account creation requires an online Supabase connection.' };
  };

  const signup = async (name: string, email: string, password?: string) => {
    return signupExtended({
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      username: name.toLowerCase().replace(/\s+/g, '_'),
      email,
      password: password || '',
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
    ++hydrationEpoch.current;
    activeAuthUserIdRef.current = null;
    if (SUPABASE_ANON_KEY) {
      try {
        await supabase.auth.signOut({ scope: 'local' });
      } catch (err) {
        console.warn('Supabase sign out notice:', err);
      }
    }
    await SecureStoreAdapter.removeItem(AUTH_STORAGE_KEY);
    // Never leave the next account inside the previous account's cached state.
    isLoadedFromStorage.current = false;
    // Keep the encrypted owner-scoped cache (and pending offline queue) for
    // restoration when this same authenticated account signs in again.
    // Never delete unsynced user study history merely because of sign-out.
    await AsyncStorage.multiRemove([
      STORAGE_KEY, LOCAL_OWNER_KEY, PERMANENT_STREAK_KEY,
      PERMANENT_BACKUP_KEY, PERMANENT_LAST_LOGIN_KEY,
    ]).catch(() => {});
    setState(prev => ({
      ...prev, userProfile: null, favoritesFacts: [], favoritesScriptures: [],
      completedWOTDs: [], readFactIds: [], bibleHighlights: {},
      followedUserIds: [], sharesCount: 0, factsViewedCount: 0,
      earnedAchievementIds: [], streak: 1, lastLoginDate: null,
    }));
    isLoadedFromStorage.current = false;
  };

  const toggleFavoriteFact = (fact: Fact) => {
    setState(prev => {
      const exists = prev.favoritesFacts.find(f => f.id === fact.id);
      const nextFavorites = exists
        ? prev.favoritesFacts.filter(f => f.id !== fact.id)
        : [...prev.favoritesFacts, fact];
      !isPrivateStudyModeRef.current && OfflineStudyQueue.enqueue('favorite_fact', fact.id, !exists)
        .then(() => OfflineStudyQueue.flush())
        .catch(() => console.warn('[OfflineStudy] Fact bookmark pending sync could not be persisted.'));
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
      !isPrivateStudyModeRef.current && OfflineStudyQueue.enqueue('favorite_scripture', scripture.id, !exists)
        .then(() => OfflineStudyQueue.flush())
        .catch(() => console.warn('[OfflineStudy] Scripture bookmark pending sync could not be persisted.'));
      syncUserDataToRemote({ favoritesScriptures: nextFavorites });
      return { ...prev, favoritesScriptures: nextFavorites };
    });
  };

  const markWOTDComplete = (wotd: WOTDEntry) => {
    setState(prev => {
      const exists = prev.completedWOTDs.find(w => w.id === wotd.id);
      if (exists) return prev;
      !isPrivateStudyModeRef.current && OfflineStudyQueue.enqueue('complete_wotd', wotd.id, true)
        .then(() => OfflineStudyQueue.flush())
        .catch(() => console.warn('[OfflineStudy] Devotional completion could not be persisted.'));
      return { ...prev, completedWOTDs: [...prev.completedWOTDs, wotd] };
    });
  };

  const markFactRead = (id: string) => {
    setState(prev => {
      if (prev.readFactIds.includes(id)) return prev;
      const nextIds = [...prev.readFactIds, id];
      const nextCount = nextIds.length;
      !isPrivateStudyModeRef.current && OfflineStudyQueue.enqueue('read_fact', id, true)
        .then(() => OfflineStudyQueue.flush())
        .catch(() => console.warn('[OfflineStudy] Fact read could not be queued.'));
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
      !isPrivateStudyModeRef.current && OfflineStudyQueue.enqueue('highlight_verse', verseKey, !!color, color)
        .then(() => OfflineStudyQueue.flush())
        .catch(() => console.warn('[OfflineStudy] Highlight could not be queued.'));
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
    const today = getLocalDateString();
    setState(prev => ({ ...prev, streak: clamped, lastLoginDate: today }));
    syncUserDataToRemote({ streak: clamped, lastLoginDate: today });
    AsyncStorage.setItem(PERMANENT_STREAK_KEY, String(clamped)).catch(() => {});
    AsyncStorage.setItem(PERMANENT_BACKUP_KEY, String(clamped)).catch(() => {});
    AsyncStorage.setItem(PERMANENT_LAST_LOGIN_KEY, today).catch(() => {});
  };

  const notifications = useMemo<InAppNotificationItem[]>(() => {
    const scheduled = getDispatchedScheduledNotifications(7);
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
    // Active notifications tray: Only dismissed notifications are excluded
    const filtered = combined.filter(
      (item) => !dismissedNotificationIds.includes(item.id)
    );

    return filtered
      .map((item) => ({
        ...item,
        isRead: readNotificationIds.includes(item.id),
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 30); // Cap to 30 items across Today and This Week
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
    return notifications.filter((n) => !n.isRead).length;
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
    setReadNotificationIds(prev => {
      const next = Array.from(new Set([...prev, ...allIds]));
      saveReadNotificationIds(next);
      return next;
    });
  }, [notifications]);

  const deleteNotification = useCallback((id: string) => {
    setDismissedNotificationIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveDismissedNotificationIds(next);
      return next;
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    const allIds = notifications.map(n => n.id);
    setDismissedNotificationIds(prev => {
      const next = Array.from(new Set([...prev, ...allIds]));
      saveDismissedNotificationIds(next);
      return next;
    });
  }, [notifications]);

  const clearAllReadNotifications = useCallback(() => {
    const readIds = notifications.filter(n => n.isRead).map(n => n.id);
    setDismissedNotificationIds(prev => {
      const next = Array.from(new Set([...prev, ...readIds]));
      saveDismissedNotificationIds(next);
      return next;
    });
  }, [notifications]);

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
      // Only after the owner-scoped privacy preference is loaded can pending
      // study operations be sent. Never flush during first-frame restore.
      if (!prefs.isPrivateStudyMode) OfflineStudyQueue.flush().catch(() => {});
    });
  }, [refreshPinStatus]);

  const setPrivateStudyMode = useCallback(async (enabled: boolean) => {
    const ok = await PrivacyService.setPrivateStudyMode(enabled);
    if (ok) {
      setIsPrivateStudyModeState(enabled);
      isPrivateStudyModeRef.current = enabled;
      if (!enabled) OfflineStudyQueue.flush().catch(() => {});
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

  const unlockApp = useCallback(async (): Promise<BiometricAuthResult> => {
    const res = await BiometricService.authenticate('Unlock exégeomai with Fingerprint');
    if (res.success) {
      setIsAppLocked(false);
      return { success: true };
    }
    return res;
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
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) {
        showAlert({ title: 'Deletion Failed', message: 'You must sign in online to delete your account.', icon: 'danger' });
        return false;
      }

      // The server must delete the auth account and its owned records.
      // Deleting only public.profiles is not account deletion.
      const { data: deletionConfirmed, error: deletionError } = await supabase.rpc('delete_user_account');
      if (deletionError || deletionConfirmed !== true) {
        showAlert({ title: 'Deletion Failed', message: 'The server could not confirm account deletion. Your data has not been cleared from this device.', icon: 'danger' });
        return false;
      }

      await supabase.auth.signOut().catch(() => {});
      await SecureStoreAdapter.removeItem(SECURE_STUDY_KEY(session.user.id));
      await SecureStoreAdapter.removeItem(`@exegeomai_secure_user_data_v2:${session.user.id}`);
      await SecureStoreAdapter.removeItem(`@exegeomai_offline_study_queue_v1:${session.user.id}`);
      await AsyncStorage.clear();
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
        earnedAchievementIds: [],
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
  }, [showAlert]);

  return (
    <UserContext.Provider value={{
      ...state,
      isLoadingApp, startupError, retryStartup,
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
      clearAllNotifications,
      clearAllReadNotifications,
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
      <AuthProvider>
        <SecurityProvider>
          <ReaderSettingsProvider>
            <UserDataProvider>
              {children}
            </UserDataProvider>
          </ReaderSettingsProvider>
        </SecurityProvider>
      </AuthProvider>
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

