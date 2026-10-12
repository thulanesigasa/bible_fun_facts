-- Owner-scoped durable study data for offline replay.
CREATE TABLE IF NOT EXISTS public.user_read_facts (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fact_id text NOT NULL REFERENCES public.facts(id) ON DELETE CASCADE,
  read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, fact_id)
);
CREATE TABLE IF NOT EXISTS public.user_verse_highlights (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  verse_key text NOT NULL,
  color text NOT NULL CHECK (length(color) BETWEEN 1 AND 32),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, verse_key)
);
ALTER TABLE public.user_read_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_verse_highlights ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read_facts_owner_select" ON public.user_read_facts;
DROP POLICY IF EXISTS "read_facts_owner_insert" ON public.user_read_facts;
DROP POLICY IF EXISTS "read_facts_owner_delete" ON public.user_read_facts;
DROP POLICY IF EXISTS "highlights_owner_select" ON public.user_verse_highlights;
DROP POLICY IF EXISTS "highlights_owner_insert" ON public.user_verse_highlights;
DROP POLICY IF EXISTS "highlights_owner_update" ON public.user_verse_highlights;
DROP POLICY IF EXISTS "highlights_owner_delete" ON public.user_verse_highlights;
CREATE POLICY "read_facts_owner_select" ON public.user_read_facts
 FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
CREATE POLICY "read_facts_owner_insert" ON public.user_read_facts
 FOR INSERT TO authenticated WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "read_facts_owner_delete" ON public.user_read_facts
 FOR DELETE TO authenticated USING (user_id = (SELECT auth.uid()));
CREATE POLICY "highlights_owner_select" ON public.user_verse_highlights
 FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
CREATE POLICY "highlights_owner_insert" ON public.user_verse_highlights
 FOR INSERT TO authenticated WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "highlights_owner_update" ON public.user_verse_highlights
 FOR UPDATE TO authenticated USING (user_id = (SELECT auth.uid()))
 WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "highlights_owner_delete" ON public.user_verse_highlights
 FOR DELETE TO authenticated USING (user_id = (SELECT auth.uid()));
