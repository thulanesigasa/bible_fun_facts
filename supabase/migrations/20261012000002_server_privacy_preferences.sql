-- Owner-controlled server-enforced privacy preferences.
-- Public discoverability and public streaks default to OFF.
CREATE TABLE IF NOT EXISTS public.user_privacy_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_discoverable BOOLEAN NOT NULL DEFAULT FALSE,
  show_streaks_publicly BOOLEAN NOT NULL DEFAULT FALSE,
  private_study_notes BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_privacy_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "privacy_read_own" ON public.user_privacy_settings;
DROP POLICY IF EXISTS "privacy_insert_own" ON public.user_privacy_settings;
DROP POLICY IF EXISTS "privacy_update_own" ON public.user_privacy_settings;

CREATE POLICY "privacy_read_own"
 ON public.user_privacy_settings FOR SELECT TO authenticated
 USING (user_id = (SELECT auth.uid()));

CREATE POLICY "privacy_insert_own"
 ON public.user_privacy_settings FOR INSERT TO authenticated
 WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "privacy_update_own"
 ON public.user_privacy_settings FOR UPDATE TO authenticated
 USING (user_id = (SELECT auth.uid()))
 WITH CHECK (user_id = (SELECT auth.uid()));

-- Public search is intentionally deny-by-default until a vetted,
-- minimal public directory endpoint applies these preferences.
