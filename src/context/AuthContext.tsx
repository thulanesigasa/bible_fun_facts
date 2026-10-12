/**
 * Domain-Focused Authentication & Session Context
 *
 * Manages user profile, credentials, Supabase session persistence,
 * and GDPR-compliant account deletion workflows.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/supabase';
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


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Only restore a profile from a securely persisted Supabase session.
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!active || error || !session?.user) return;
      const user = session.user;
      const meta = user.user_metadata || {};
      const username = typeof meta.username === 'string' ? meta.username : (user.email?.split('@')[0] || '');
      const profile: UserProfile = {
        name: typeof meta.name === 'string' ? meta.name : username,
        username,
        email: user.email || '',
        joinedDate: user.created_at,
        notificationsEnabled: true,
      };
      setUserProfile(profile);
      setSentryUser({ id: user.id });
    }).catch(() => {
      // Offline first launch without a verified cached session stays signed out.
    }).finally(() => {
      if (active) setIsLoadingAuth(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session?.user) {
        if (active) { setUserProfile(null); setSentryUser(null); }
      }
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  const login = useCallback(async (emailOrName: string, password?: string): Promise<boolean> => {
    if (!password || !emailOrName.includes('@')) return false;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrName.trim().toLowerCase(), password,
      });
      if (error || !data.user || !data.session) return false;
      const meta = data.user.user_metadata || {};
      const username = typeof meta.username === 'string' ? meta.username : (data.user.email?.split('@')[0] || '');
      setUserProfile({
        name: typeof meta.name === 'string' ? meta.name : username,
        username,
        email: data.user.email || '',
        joinedDate: data.user.created_at,
        notificationsEnabled: true,
      });
      setSentryUser({ id: data.user.id });
      return true;
    } catch { return false; }
  }, []);

  const signup = useCallback(async (name: string, email: string, password?: string): Promise<boolean> => {
    if (!password) return false;
    try {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      return !error && !!data.user;
    } catch { return false; }
  }, []);

  const signupExtended = useCallback(async (params: SignUpExtendedParams): Promise<boolean> => {
    if (!params.password) return false;
    try {
      const { data, error } = await supabase.auth.signUp({
        email: params.email, password: params.password,
        options: { data: {
          name: `${params.firstName} ${params.lastName}`.trim(),
          firstName: params.firstName, lastName: params.lastName,
          username: params.username,
        } },
      });
      return !error && !!data.user;
    } catch { return false; }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('@user_profile_v1');
      await supabase.auth.signOut().catch(() => {});
      setUserProfile(null);
      setSentryUser(null);
    } catch (e) {
      console.warn('[AuthContext] Logout exception:', e);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<void> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) throw new Error('Authentication required');
    const { error } = await supabase.auth.updateUser({ data: updates });
    if (error) throw error;
    setUserProfile(prev => prev ? { ...prev, ...updates } : prev);
  }, []);

  const deleteAccountAndPurgeData = useCallback(async (): Promise<boolean> => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) return false;
      const { error } = await supabase.rpc('delete_user_account');
      if (error) return false;
      await supabase.auth.signOut();
      await AsyncStorage.removeItem('@user_profile_v1');
      setUserProfile(null);
      setSentryUser(null);
      return true;
    } catch { return false; }
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
