import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert, AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';
import { colors } from '../theme/colors';
import { supabase, SUPABASE_ANON_KEY } from '../services/supabase';

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
}

const UserContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = '@exegeomai_user_data';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    lastLoginDate: null,
    followedUserIds: [],
    lastReadBible: { book: 'John', chapter: 3, translation: 'web' },
    bibleHighlights: {},
    readerTheme: 'light',
  });

  /**
   * Computes study streak progression based on calendar days elapsed.
   *
   * Rules:
   * 1. Same calendar day (diffDays === 0): User already engaged today. Streak remains intact.
   * 2. Consecutive calendar day (diffDays === 1): User studied yesterday and returned today. Streak increases by +1.
   * 3. Missed 1 or more calendar days (diffDays >= 2): Spiritual discipline broken. STREAK STRICTLY RESTARTS FROM SCRATCH (Day 1).
   * 4. First time user (no previous login date): Streak starts at current streak or 1.
   */
  const evaluateDailyStreak = (
    lastLogin: string | null | undefined,
    currentStreak: number
  ): { newStreak: number; shouldUpdate: boolean; resetFromScratch: boolean } => {
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (!lastLogin) {
      const initial = Math.max(1, currentStreak || 1);
      return { newStreak: initial, shouldUpdate: true, resetFromScratch: false };
    }

    const lastDate = new Date(lastLogin);
    if (isNaN(lastDate.getTime())) {
      return { newStreak: 1, shouldUpdate: true, resetFromScratch: true };
    }

    const lastDateOnly = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
    const diffTime = todayDateOnly.getTime() - lastDateOnly.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Already engaged today
      return { newStreak: Math.max(1, currentStreak), shouldUpdate: false, resetFromScratch: false };
    } else if (diffDays === 1) {
      // Exactly consecutive day (+1 day)
      return { newStreak: Math.max(1, currentStreak) + 1, shouldUpdate: true, resetFromScratch: false };
    } else if (diffDays < 0) {
      // Clock drift or future timestamp; keep safe
      return { newStreak: Math.max(1, currentStreak), shouldUpdate: false, resetFromScratch: false };
    } else {
      // diffDays >= 2: User skipped 1 or more calendar days!
      // Streak MUST RESTART FROM SCRATCH to Day 1!
      return { newStreak: 1, shouldUpdate: true, resetFromScratch: true };
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
    if (!SUPABASE_ANON_KEY) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // 1. Sync to Supabase auth user_metadata (guaranteed permanent persistence across logins/devices)
        await supabase.auth.updateUser({
          data: updates,
        });

        // 2. Sync to public.profiles table
        const profileUpdate: any = {};
        if (typeof updates.streak === 'number') profileUpdate.streak = updates.streak;
        if (typeof updates.factsViewedCount === 'number') profileUpdate.facts_viewed_count = updates.factsViewedCount;
        if (updates.lastLoginDate) profileUpdate.last_login_date = updates.lastLoginDate;

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
        const streakCandidate = remoteStreak !== undefined ? remoteStreak : prev.streak;
        const lastLoginCandidate = remoteLastLogin || prev.lastLoginDate;
        const evaluation = evaluateDailyStreak(lastLoginCandidate, streakCandidate);
        const finalStreak = evaluation.newStreak;
        const todayStr = new Date().toDateString();
        const finalLastLogin = evaluation.shouldUpdate ? todayStr : (lastLoginCandidate || todayStr);
        const finalUnfolded = remoteUnfolded !== undefined ? Math.max(0, remoteUnfolded) : prev.factsViewedCount;

        if (evaluation.shouldUpdate) {
          syncUserDataToRemote({ streak: finalStreak, lastLoginDate: finalLastLogin });
        }

        return {
          ...prev,
          streak: finalStreak,
          factsViewedCount: finalUnfolded,
          lastLoginDate: finalLastLogin,
          favoritesFacts: Array.isArray(meta?.favoritesFacts) ? meta.favoritesFacts : prev.favoritesFacts,
          favoritesScriptures: Array.isArray(meta?.favoritesScriptures) ? meta.favoritesScriptures : prev.favoritesScriptures,
          readFactIds: Array.isArray(meta?.readFactIds) ? meta.readFactIds : prev.readFactIds,
          bibleHighlights: meta?.bibleHighlights && typeof meta.bibleHighlights === 'object' ? meta.bibleHighlights : prev.bibleHighlights,
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
        if (saved) {
          const parsed = JSON.parse(saved);
          // Purge any legacy hardcoded mock followers or user_1
          const cleanFollowed = (parsed.followedUserIds || []).filter(
            (id: string) => !id.startsWith('user_')
          );
          const cleanProfile = parsed.userProfile
            ? {
                ...parsed.userProfile,
                redLetterEnabled: parsed.userProfile.redLetterEnabled ?? true,
                followersCount:
                  parsed.userProfile.followersCount === 248 ? 0 : (parsed.userProfile.followersCount || 0),
                followingCount:
                  parsed.userProfile.followingCount === 182
                    ? cleanFollowed.length
                    : (parsed.userProfile.followingCount || cleanFollowed.length),
              }
            : null;

          setState(prev => ({
            ...prev,
            ...parsed,
            sharesCount: typeof parsed.sharesCount === 'number' ? parsed.sharesCount : 0,
            followedUserIds: cleanFollowed,
            userProfile: cleanProfile,
          }));
          checkStreak(parsed.lastLoginDate, parsed.streak);
        } else {
          // First time user
          checkStreak(null, 1);
        }
      } catch (e) {
        console.error('Failed to load user data');
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

  // Save data on change
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  };

  const login = async (emailOrName: string, password?: string, name?: string) => {
    const displayName = name || (emailOrName.includes('@') ? emailOrName.split('@')[0] : emailOrName);
    const email = emailOrName.includes('@') ? emailOrName : `${emailOrName.toLowerCase().replace(/\s+/g, '')}@example.com`;
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    if (SUPABASE_ANON_KEY && password && emailOrName.includes('@')) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailOrName,
          password,
        });
        if (error) {
          console.warn('Supabase login error:', error.message);
          Alert.alert('Sign In Failed', error.message);
          return;
        }
        if (data.user) {
          const meta = (data.user.user_metadata as any) || {};
          const metaName = meta.name || formattedName;
          const metaUsername = meta.username || email.split('@')[0].toLowerCase().replace(/\s+/g, '_');
          restoreRemoteUserData(data.user.id, meta);
          setState(prev => ({
            ...prev,
            userProfile: {
              name: metaName,
              firstName: meta.firstName || formattedName.split(' ')[0],
              lastName: meta.lastName || formattedName.split(' ').slice(1).join(' '),
              username: metaUsername,
              avatarUrl: meta.avatarUrl || prev.userProfile?.avatarUrl,
              email: data.user!.email || email,
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
        Alert.alert('Network Error', err?.message || 'Unable to connect to Supabase authentication service.');
        return;
      }
    }

    setState(prev => ({
      ...prev,
      userProfile: {
        name: prev.userProfile?.name || formattedName,
        firstName: prev.userProfile?.firstName || formattedName.split(' ')[0],
        lastName: prev.userProfile?.lastName || formattedName.split(' ').slice(1).join(' '),
        username: prev.userProfile?.username || emailOrName.split('@')[0].toLowerCase().replace(/\s+/g, '_'),
        avatarUrl: prev.userProfile?.avatarUrl,
        email: prev.userProfile?.email || email,
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
          Alert.alert('Sign Up Notice', error.message);
          return { success: false, error: error.message };
        }
        if (data.user) {
          if (!data.session) {
            Alert.alert(
              'Verification Email Sent',
              `A confirmation email has been dispatched to ${email}. Please verify your email to finish signing in.`
            );
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
        Alert.alert('Network Error', err?.message || 'Unable to connect to Supabase authentication service.');
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
      const nextCount = prev.factsViewedCount + 1;
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
  };

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
