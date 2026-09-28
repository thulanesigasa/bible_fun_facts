/**
 * Domain-Focused User Data Context
 *
 * Manages study progress, favorites (facts & scriptures), daily streaks,
 * completed WOTD reflections, bookmarks, and sharing metrics.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';

interface UserDataContextType {
  favoritesFacts: Fact[];
  favoritesScriptures: Scripture[];
  completedWOTDs: WOTDEntry[];
  streak: number;
  factsViewedCount: number;
  readFactIds: string[];
  sharesCount: number;
  lastLoginDate: string | null;
  followedUserIds: string[];
  toggleFavoriteFact: (fact: Fact) => void;
  toggleFavoriteScripture: (scripture: Scripture) => void;
  markFactAsRead: (factId: string) => void;
  completeWOTD: (wotd: WOTDEntry) => void;
  incrementSharesCount: () => void;
  toggleFollowUser: (userId: string) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const FAV_FACTS_KEY = '@fav_facts_v1';
const FAV_SCRIPTURES_KEY = '@fav_scriptures_v1';
const COMPLETED_WOTD_KEY = '@completed_wotd_v1';
const STREAK_KEY = '@user_streak_v1';
const READ_FACT_IDS_KEY = '@read_fact_ids_v1';
const SHARES_COUNT_KEY = '@shares_count_v1';
const LAST_LOGIN_DATE_KEY = '@last_login_date_v1';
const FOLLOWED_USERS_KEY = '@followed_users_v1';

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoritesFacts, setFavoritesFacts] = useState<Fact[]>([]);
  const [favoritesScriptures, setFavoritesScriptures] = useState<Scripture[]>([]);
  const [completedWOTDs, setCompletedWOTDs] = useState<WOTDEntry[]>([]);
  const [streak, setStreak] = useState<number>(1);
  const [readFactIds, setReadFactIds] = useState<string[]>([]);
  const [sharesCount, setSharesCount] = useState<number>(0);
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);
  const [followedUserIds, setFollowedUserIds] = useState<string[]>([]);

  useEffect(() => {
    async function restoreUserData() {
      try {
        const [
          favFactsRaw,
          favScripturesRaw,
          completedRaw,
          streakRaw,
          readIdsRaw,
          sharesRaw,
          lastLoginRaw,
          followedRaw,
        ] = await Promise.all([
          AsyncStorage.getItem(FAV_FACTS_KEY),
          AsyncStorage.getItem(FAV_SCRIPTURES_KEY),
          AsyncStorage.getItem(COMPLETED_WOTD_KEY),
          AsyncStorage.getItem(STREAK_KEY),
          AsyncStorage.getItem(READ_FACT_IDS_KEY),
          AsyncStorage.getItem(SHARES_COUNT_KEY),
          AsyncStorage.getItem(LAST_LOGIN_DATE_KEY),
          AsyncStorage.getItem(FOLLOWED_USERS_KEY),
        ]);

        if (favFactsRaw) setFavoritesFacts(JSON.parse(favFactsRaw));
        if (favScripturesRaw) setFavoritesScriptures(JSON.parse(favScripturesRaw));
        if (completedRaw) setCompletedWOTDs(JSON.parse(completedRaw));
        if (streakRaw) setStreak(Number(streakRaw) || 1);
        if (readIdsRaw) setReadFactIds(JSON.parse(readIdsRaw));
        if (sharesRaw) setSharesCount(Number(sharesRaw) || 0);
        if (lastLoginRaw) setLastLoginDate(lastLoginRaw);
        if (followedRaw) setFollowedUserIds(JSON.parse(followedRaw));
      } catch (e) {
        console.warn('[UserDataContext] Restore error:', e);
      }
    }
    restoreUserData();
  }, []);

  const toggleFavoriteFact = useCallback((fact: Fact) => {
    setFavoritesFacts((prev) => {
      const exists = prev.some((f) => f.id === fact.id);
      const updated = exists ? prev.filter((f) => f.id !== fact.id) : [...prev, fact];
      AsyncStorage.setItem(FAV_FACTS_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const toggleFavoriteScripture = useCallback((scripture: Scripture) => {
    setFavoritesScriptures((prev) => {
      const exists = prev.some((s) => s.id === scripture.id);
      const updated = exists ? prev.filter((s) => s.id !== scripture.id) : [...prev, scripture];
      AsyncStorage.setItem(FAV_SCRIPTURES_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const markFactAsRead = useCallback((factId: string) => {
    setReadFactIds((prev) => {
      if (prev.includes(factId)) return prev;
      const updated = [...prev, factId];
      AsyncStorage.setItem(READ_FACT_IDS_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const completeWOTD = useCallback((wotd: WOTDEntry) => {
    setCompletedWOTDs((prev) => {
      const exists = prev.some((w) => w.id === wotd.id);
      if (exists) return prev;
      const updated = [...prev, wotd];
      AsyncStorage.setItem(COMPLETED_WOTD_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const incrementSharesCount = useCallback(() => {
    setSharesCount((prev) => {
      const updated = prev + 1;
      AsyncStorage.setItem(SHARES_COUNT_KEY, String(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const toggleFollowUser = useCallback((userId: string) => {
    setFollowedUserIds((prev) => {
      const exists = prev.includes(userId);
      const updated = exists ? prev.filter((id) => id !== userId) : [...prev, userId];
      AsyncStorage.setItem(FOLLOWED_USERS_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        favoritesFacts,
        favoritesScriptures,
        completedWOTDs,
        streak,
        factsViewedCount: readFactIds.length,
        readFactIds,
        sharesCount,
        lastLoginDate,
        followedUserIds,
        toggleFavoriteFact,
        toggleFavoriteScripture,
        markFactAsRead,
        completeWOTD,
        incrementSharesCount,
        toggleFollowUser,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export function useUserData(): UserDataContextType {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}

export default UserDataContext;
