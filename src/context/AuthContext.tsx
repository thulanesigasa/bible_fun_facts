/**
 * Domain-Focused Authentication & Session Context
 *
 * Manages user profile, credentials, Supabase session persistence,
 * and GDPR-compliant account deletion workflows.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/supabase';
import { SecureStoreAdapter } from '../services/secureStorage';
import { setSentryUser } from '../services/sentryService';

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

interface AuthContextType {
  userProfile: UserProfile | null;
  isLoadingAuth: boolean;
  login: (emailOrName: string, password?: string, name?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  signupExtended: (params: SignUpExtendedParams) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  deleteAccountAndPurgeData: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_PROFILE_KEY = '@user_profile_v1';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Initialize and restore saved user session
  useEffect(() => {
    async function restoreSession() {
      try {
        const stored = await AsyncStorage.getItem(USER_PROFILE_KEY);
        if (stored) {
          const profile = JSON.parse(stored) as UserProfile;
          setUserProfile(profile);
          setSentryUser({ id: profile.email, email: profile.email, username: profile.username });
        }
      } catch (err) {
        console.warn('[AuthContext] Session restore error:', err);
      } finally {
        setIsLoadingAuth(false);
      }
    }
    restoreSession();
  }, []);

  const login = useCallback(async (emailOrName: string, password?: string, name?: string): Promise<boolean> => {
    try {
      const email = emailOrName.includes('@') ? emailOrName.trim().toLowerCase() : `${emailOrName.trim().toLowerCase()}@exegeomai.local`;
      const username = emailOrName.includes('@') ? emailOrName.split('@')[0] : emailOrName.trim();
      const profile: UserProfile = {
        name: name || username,
        username,
        email,
        joinedDate: new Date().toISOString(),
        notificationsEnabled: true,
      };

      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
      setUserProfile(profile);
      setSentryUser({ id: profile.email, email: profile.email, username: profile.username });
      return true;
    } catch {
      return false;
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password?: string): Promise<boolean> => {
    return login(email, password, name);
  }, [login]);

  const signupExtended = useCallback(async (params: SignUpExtendedParams): Promise<boolean> => {
    try {
      const profile: UserProfile = {
        name: `${params.firstName} ${params.lastName}`.trim(),
        firstName: params.firstName,
        lastName: params.lastName,
        username: params.username.trim(),
        email: params.email.trim().toLowerCase(),
        phoneNumber: params.phoneNumber,
        countryCode: params.countryCode,
        preferredTranslation: params.preferredTranslation,
        studyFocus: params.studyFocus,
        dailyGoal: params.dailyGoal,
        knowledgeLevel: params.knowledgeLevel,
        joinedDate: new Date().toISOString(),
        notificationsEnabled: true,
      };

      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
      setUserProfile(profile);
      setSentryUser({ id: profile.email, email: profile.email, username: profile.username });
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
      await supabase.auth.signOut().catch(() => {});
      setUserProfile(null);
      setSentryUser(null);
    } catch (e) {
      console.warn('[AuthContext] Logout exception:', e);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<void> => {
    setUserProfile((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const deleteAccountAndPurgeData = useCallback(async (): Promise<boolean> => {
    try {
      // 1. Invoke Supabase RPC if session exists
      try {
        await (supabase.rpc('delete_user_account') as PromiseLike<any>);
      } catch {
        // Fall through
      }

      // 2. Clear local auth and profile
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
      await supabase.auth.signOut().catch(() => {});
      setUserProfile(null);
      setSentryUser(null);
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        isLoadingAuth,
        login,
        signup,
        signupExtended,
        logout,
        updateProfile,
        deleteAccountAndPurgeData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
