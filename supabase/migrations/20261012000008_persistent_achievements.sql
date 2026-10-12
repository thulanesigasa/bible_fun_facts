-- Immutable earned achievements survive offline replay and subsequent
-- removal of a bookmark or highlight. Never expose private milestones publicly.
CREATE TABLE IF NOT EXISTS public.user_earned_achievements (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id text NOT NULL CHECK (length(achievement_id) BETWEEN 1 AND 64),
  earned_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, achievement_id)
);
ALTER TABLE public.user_earned_achievements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS earned_achievements_owner_select ON public.user_earned_achievements;
DROP POLICY IF EXISTS earned_achievements_owner_insert ON public.user_earned_achievements;
CREATE POLICY earned_achievements_owner_select ON public.user_earned_achievements
  FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
CREATE POLICY earned_achievements_owner_insert ON public.user_earned_achievements
  FOR INSERT TO authenticated WITH CHECK (user_id = (SELECT auth.uid()));
