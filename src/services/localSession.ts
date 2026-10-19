import type { User } from '@supabase/supabase-js';
import { SecureStoreAdapter } from './secureStorage';

// Same explicit key as Supabase. Reading native encrypted storage does not
// refresh a token or contact Auth. This identity unlocks LOCAL content only;
// every cloud request still uses Supabase Auth and database RLS.
export const AUTH_STORAGE_KEY = 'sb-ibwooiejzxhbzplnldcz-auth-token';
export async function readLocalSessionUser(): Promise<User | null> {
  const raw = await SecureStoreAdapter.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  const session = JSON.parse(raw);
  if (typeof session?.access_token !== 'string' || typeof session?.refresh_token !== 'string' ||
      typeof session?.user?.id !== 'string' || !session.user.id ||
      typeof session.user.email !== 'string' || typeof session.user.created_at !== 'string') return null;
  return session.user as User;
}
