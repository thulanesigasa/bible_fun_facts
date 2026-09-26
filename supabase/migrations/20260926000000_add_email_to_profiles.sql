-- ==============================================================================
-- Migration: 20260926000000_add_email_to_profiles.sql
-- Description: Add email column to profiles, update handle_new_user,
--              add resolve_email_by_username function, and reset facts_viewed_count to 0
-- ==============================================================================

-- 1. Add email column to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email TEXT;

-- 2. Backfill email from auth.users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');

-- 3. Reset falsely inflated facts_viewed_count to 0
UPDATE public.profiles
SET facts_viewed_count = 0
WHERE username = 'thulanesigasa';

-- 4. Update handle_new_user trigger to save email to profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    username,
    email,
    first_name,
    last_name,
    full_name,
    avatar_url,
    preferred_translation,
    study_focus,
    daily_goal,
    knowledge_level,
    streak,
    facts_viewed_count,
    last_login_date
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'lastName',
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatarUrl',
    COALESCE(new.raw_user_meta_data->>'preferredTranslation', 'ESV'),
    COALESCE(new.raw_user_meta_data->>'studyFocus', 'Original Languages & Strong''s'),
    COALESCE(new.raw_user_meta_data->>'dailyGoal', '15 mins / day'),
    COALESCE(new.raw_user_meta_data->>'knowledgeLevel', 'Growing Disciple'),
    COALESCE((new.raw_user_meta_data->>'streak')::INTEGER, 1),
    COALESCE((new.raw_user_meta_data->>'factsViewedCount')::INTEGER, 0),
    COALESCE(new.raw_user_meta_data->>'lastLoginDate', now()::TEXT)
  )
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    streak = COALESCE(EXCLUDED.streak, public.profiles.streak),
    facts_viewed_count = COALESCE(EXCLUDED.facts_viewed_count, public.profiles.facts_viewed_count),
    last_login_date = COALESCE(EXCLUDED.last_login_date, public.profiles.last_login_date),
    updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Helper function for login lookup by username
CREATE OR REPLACE FUNCTION public.resolve_email_by_username(lookup_username TEXT)
RETURNS TEXT AS $$
DECLARE
  found_email TEXT;
BEGIN
  SELECT email INTO found_email
  FROM public.profiles
  WHERE LOWER(username) = LOWER(TRIM(lookup_username))
  LIMIT 1;

  RETURN found_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.resolve_email_by_username(TEXT) TO anon, authenticated;
