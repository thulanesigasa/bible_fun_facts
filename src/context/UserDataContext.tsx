/**
 * User-owned study data stored under the immutable Supabase account ID.
 * Never restore a globally shared plaintext user profile after sign-out.
 */
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';
import { supabase } from '../services/supabase';
import { SecureStoreAdapter } from '../services/secureStorage';
import { OfflineStudyQueue } from '../services/offlineStudyQueue';

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

interface StudyState {
  favoritesFacts: Fact[];
  favoritesScriptures: Scripture[];
  completedWOTDs: WOTDEntry[];
  streak: number;
  readFactIds: string[];
  sharesCount: number;
  lastLoginDate: string | null;
  followedUserIds: string[];
}

const emptyState = (): StudyState => ({
  favoritesFacts: [],
  favoritesScriptures: [],
  completedWOTDs: [],
  streak: 1,
  readFactIds: [],
  sharesCount: 0,
  lastLoginDate: null,
  followedUserIds: [],
});
const localKey = (id: string) => `@exegeomai_secure_user_data_v2:${id}`;
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StudyState>(emptyState);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [readyUserId, setReadyUserId] = useState<string | null>(null);

  // When a session changes, reset sensitive data before loading another user's
  // encrypted cache. A restored session is not equivalent to fake offline login.
  useEffect(() => {
    let active = true;
    const restore = async (id: string | null) => {
      if (!active) return;
      setReadyUserId(null);
      setActiveUserId(id);
      setState(emptyState());
      if (!id) return;
      try {
        const raw = await SecureStoreAdapter.getItem(localKey(id));
        if (!active) return;
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<StudyState>;
          setState({
            ...emptyState(),
            ...parsed,
            favoritesFacts: Array.isArray(parsed.favoritesFacts) ? parsed.favoritesFacts : [],
            favoritesScriptures: Array.isArray(parsed.favoritesScriptures) ? parsed.favoritesScriptures : [],
            completedWOTDs: Array.isArray(parsed.completedWOTDs) ? parsed.completedWOTDs : [],
            readFactIds: Array.isArray(parsed.readFactIds) ? parsed.readFactIds : [],
            followedUserIds: Array.isArray(parsed.followedUserIds) ? parsed.followedUserIds : [],
          });
        }
        setReadyUserId(id);
      } catch {
        // Secure storage unavailable: fail closed, never reuse plaintext data.
        if (active) setReadyUserId(null);
      }
    };

    supabase.auth.getSession()
      .then(({ data: { session } }) => restore(session?.user?.id || null))
      .catch(() => restore(null));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Do not reset study data on token refresh for the same account.
      if (session?.user?.id !== activeUserId) {
        void restore(session?.user?.id || null);
      }
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [activeUserId]);

  useEffect(() => {
    if (!activeUserId || readyUserId !== activeUserId) return;
    const save = async () => {
      try {
        // Prevent an in-flight save from writing to a different active user.
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id !== activeUserId) return;
        await SecureStoreAdapter.setItem(localKey(activeUserId), JSON.stringify(state));
      } catch {
        console.warn('[UserDataContext] Secure study data not persisted.');
      }
    };
    void save();
  }, [state, activeUserId, readyUserId]);

  const authenticated = () => !!activeUserId && readyUserId === activeUserId;
  const queue = (action: 'favorite_fact' | 'favorite_scripture' | 'complete_wotd', entityId: string, desired: boolean) => {
    OfflineStudyQueue.enqueue(action, entityId, desired)
      .then(() => OfflineStudyQueue.flush())
      .catch(() => console.warn('[UserDataContext] Offline operation could not be queued.'));
  };

  const toggleFavoriteFact = useCallback((fact: Fact) => {
    if (!authenticated()) return;
    setState(prev => {
      const exists = prev.favoritesFacts.some(f => f.id === fact.id);
      queue('favorite_fact', fact.id, !exists);
      return {
        ...prev,
        favoritesFacts: exists ? prev.favoritesFacts.filter(f => f.id !== fact.id) : [...prev.favoritesFacts, fact],
      };
    });
  }, [activeUserId, readyUserId]);

  const toggleFavoriteScripture = useCallback((scripture: Scripture) => {
    if (!authenticated()) return;
    setState(prev => {
      const exists = prev.favoritesScriptures.some(s => s.id === scripture.id);
      queue('favorite_scripture', scripture.id, !exists);
      return {
        ...prev,
        favoritesScriptures: exists ? prev.favoritesScriptures.filter(s => s.id !== scripture.id) : [...prev.favoritesScriptures, scripture],
      };
    });
  }, [activeUserId, readyUserId]);

  const markFactAsRead = useCallback((factId: string) => {
    if (!authenticated()) return;
    setState(prev => prev.readFactIds.includes(factId)
      ? prev : { ...prev, readFactIds: [...prev.readFactIds, factId] });
  }, [activeUserId, readyUserId]);

  const completeWOTD = useCallback((wotd: WOTDEntry) => {
    if (!authenticated()) return;
    setState(prev => {
      if (prev.completedWOTDs.some(w => w.id === wotd.id)) return prev;
      queue('complete_wotd', wotd.id, true);
      return { ...prev, completedWOTDs: [...prev.completedWOTDs, wotd] };
    });
  }, [activeUserId, readyUserId]);

  const incrementSharesCount = useCallback(() => {
    if (authenticated()) setState(prev => ({ ...prev, sharesCount: prev.sharesCount + 1 }));
  }, [activeUserId, readyUserId]);

  const toggleFollowUser = useCallback((userId: string) => {
    if (!authenticated()) return;
    setState(prev => ({
      ...prev,
      followedUserIds: prev.followedUserIds.includes(userId)
        ? prev.followedUserIds.filter(id => id !== userId) : [...prev.followedUserIds, userId],
    }));
  }, [activeUserId, readyUserId]);

  return (
    <UserDataContext.Provider value={{
      ...state,
      factsViewedCount: state.readFactIds.length,
      toggleFavoriteFact, toggleFavoriteScripture, markFactAsRead,
      completeWOTD, incrementSharesCount, toggleFollowUser,
    }}>
      {children}
    </UserDataContext.Provider>
  );
};

export function useUserData(): UserDataContextType {
  const context = useContext(UserDataContext);
  if (!context) throw new Error('useUserData must be used within a UserDataProvider');
  return context;
}

export default UserDataContext;
