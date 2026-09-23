-- ==============================================================================
-- Migration: 20260923000000_add_streak_and_unfolded_to_profiles.sql
-- Description: Add streak, facts_viewed_count (unfolded), and last_login_date to profiles
-- ==============================================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS streak INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS facts_viewed_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_login_date TEXT;

-- Update handle_new_user function to initialize streak and facts_viewed_count from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    username,
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
    full_name = EXCLUDED.full_name,
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    streak = COALESCE(EXCLUDED.streak, public.profiles.streak),
    facts_viewed_count = COALESCE(EXCLUDED.facts_viewed_count, public.profiles.facts_viewed_count),
    last_login_date = COALESCE(EXCLUDED.last_login_date, public.profiles.last_login_date),
    updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
