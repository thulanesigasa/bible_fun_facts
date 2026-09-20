import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';
import { colors } from '../theme/colors';
import { supabase, SUPABASE_ANON_KEY } from '../services/supabase';

export interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
  preferredTranslation: string;
  notificationsEnabled: boolean;
}

interface UserState {
  userProfile: UserProfile | null;
  favoritesFacts: Fact[];
  favoritesScriptures: Scripture[];
  completedWOTDs: WOTDEntry[];
  streak: number;
  factsViewedCount: number;
  lastLoginDate: string | null;
}

interface AppContextType extends UserState {
  hideTabBar: boolean;
  setHideTabBar: (hide: boolean) => void;
  accent: string;
  setAccent: (accent: string) => void;
  login: (emailOrName: string, password?: string, name?: string) => void;
  signup: (name: string, email: string, password?: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  toggleFavoriteFact: (fact: Fact) => void;
  toggleFavoriteScripture: (scripture: Scripture) => void;
  markWOTDComplete: (wotd: WOTDEntry) => void;
  incrementFactsViewed: () => void;
  isFactFavorited: (id: string) => boolean;
  isScriptureFavorited: (id: string) => boolean;
  isWOTDCompleted: (id: string) => boolean;
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
    streak: 0,
    factsViewedCount: 0,
    lastLoginDate: null,
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setState(prev => ({ ...prev, ...parsed }));
          checkStreak(parsed.lastLoginDate, parsed.streak);
        } else {
          // First time user
          checkStreak(null, 0);
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
          const metaName = (user.user_metadata as any)?.name || user.email?.split('@')[0] || 'Believer';
          setState(prev => ({
            ...prev,
            userProfile: {
              name: metaName,
              email: user.email || '',
              joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              preferredTranslation: prev.userProfile?.preferredTranslation || 'ESV',
              notificationsEnabled: prev.userProfile?.notificationsEnabled ?? true,
            },
          }));
        }
      }).catch(err => {
        console.warn('Supabase getSession notice:', err);
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const user = session.user;
          const metaName = (user.user_metadata as any)?.name || user.email?.split('@')[0] || 'Believer';
          setState(prev => ({
            ...prev,
            userProfile: {
              name: metaName,
              email: user.email || '',
              joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              preferredTranslation: prev.userProfile?.preferredTranslation || 'ESV',
              notificationsEnabled: prev.userProfile?.notificationsEnabled ?? true,
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
    if (lastLogin === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    let newStreak = currentStreak;
    if (lastLogin === yesterdayStr) {
      newStreak += 1;
    } else if (lastLogin === null) {
      newStreak = 1;
    } else {
      newStreak = 1; // Reset if missed a day
    }

    setState(prev => ({ ...prev, streak: newStreak, lastLoginDate: today }));
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
          const metaName = (data.user.user_metadata as any)?.name || formattedName;
          setState(prev => ({
            ...prev,
            userProfile: {
              name: metaName,
              email: data.user!.email || email,
              joinedDate: new Date(data.user!.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              preferredTranslation: prev.userProfile?.preferredTranslation || 'ESV',
              notificationsEnabled: prev.userProfile?.notificationsEnabled ?? true,
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
        email: prev.userProfile?.email || email,
        joinedDate: prev.userProfile?.joinedDate || 'September 2026',
        preferredTranslation: prev.userProfile?.preferredTranslation || 'ESV',
        notificationsEnabled: prev.userProfile?.notificationsEnabled ?? true,
      },
    }));
  };

  const signup = async (name: string, email: string, password?: string) => {
    if (SUPABASE_ANON_KEY && password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
          },
        });
        if (error) {
          console.warn('Supabase signup error:', error.message);
          Alert.alert('Sign Up Notice', error.message);
          return;
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
              name,
              email,
              joinedDate: new Date(data.user!.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              preferredTranslation: 'ESV',
              notificationsEnabled: true,
            },
          }));
          return;
        }
      } catch (err: any) {
        console.warn('Supabase signup network notice:', err);
        Alert.alert('Network Error', err?.message || 'Unable to connect to Supabase authentication service.');
        return;
      }
    }

    setState(prev => ({
      ...prev,
      userProfile: {
        name,
        email,
        joinedDate: 'September 2026',
        preferredTranslation: 'ESV',
        notificationsEnabled: true,
      },
    }));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      userProfile: prev.userProfile ? { ...prev.userProfile, ...updates } : null,
    }));
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
      if (exists) {
        return { ...prev, favoritesFacts: prev.favoritesFacts.filter(f => f.id !== fact.id) };
      }
      return { ...prev, favoritesFacts: [...prev.favoritesFacts, fact] };
    });
  };

  const toggleFavoriteScripture = (scripture: Scripture) => {
    setState(prev => {
      const exists = prev.favoritesScriptures.find(s => s.id === scripture.id);
      if (exists) {
        return { ...prev, favoritesScriptures: prev.favoritesScriptures.filter(s => s.id !== scripture.id) };
      }
      return { ...prev, favoritesScriptures: [...prev.favoritesScriptures, scripture] };
    });
  };

  const markWOTDComplete = (wotd: WOTDEntry) => {
    setState(prev => {
      const exists = prev.completedWOTDs.find(w => w.id === wotd.id);
      if (exists) return prev;
      return { ...prev, completedWOTDs: [...prev.completedWOTDs, wotd] };
    });
  };

  const incrementFactsViewed = () => {
    setState(prev => ({ ...prev, factsViewedCount: prev.factsViewedCount + 1 }));
  };

  const isFactFavorited = (id: string) => state.favoritesFacts.some(f => f.id === id);
  const isScriptureFavorited = (id: string) => state.favoritesScriptures.some(s => s.id === id);
  const isWOTDCompleted = (id: string) => state.completedWOTDs.some(w => w.id === id);

  return (
    <UserContext.Provider value={{
      ...state,
      hideTabBar,
      setHideTabBar,
      accent,
      setAccent,
      login,
      signup,
      updateProfile,
      logout,
      toggleFavoriteFact,
      toggleFavoriteScripture,
      markWOTDComplete,
      incrementFactsViewed,
      isFactFavorited,
      isScriptureFavorited,
      isWOTDCompleted,
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
