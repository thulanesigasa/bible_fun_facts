import { createClient } from '@supabase/supabase-js';
import { SecureStoreAdapter } from './secureStorage';

// Project Ref: ibwooiejzxhbzplnldcz
export const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://ibwooiejzxhbzplnldcz.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlid29vaWVqenhoYnpwbG5sZGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4ODgwNjcsImV4cCI6MjEwNTQ2NDA2N30.1RTBu4znHqhQRx5dnNAR5Oyfgfq3Kiqsp4NnS4FmPfk';

const createSafeClient = () => {
  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: SecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  } catch (error) {
    console.warn('[Supabase] Client init exception handled:', error);
    return createClient(SUPABASE_URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder', {
      auth: {
        storage: SecureStoreAdapter,
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });
  }
};

export const supabase = createSafeClient();
