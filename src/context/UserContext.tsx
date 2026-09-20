import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';
import { colors } from '../theme/colors';

interface UserState {
  userProfile: { name: string } | null;
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
  login: (name: string) => void;
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

  const login = (name: string) => {
    setState(prev => ({ ...prev, userProfile: { name } }));
  };

  const logout = () => {
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
