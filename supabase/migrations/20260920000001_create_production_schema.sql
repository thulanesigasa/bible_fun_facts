-- ==============================================================================
-- Migration: 20260920000001_create_production_schema.sql
-- Description: Complete 8-table production schema for Bible Fun Facts
-- Includes: categories, facts, scriptures, word_of_the_day, user_favorites_facts,
--           user_favorites_scriptures, user_study_progress, study_notes
-- ==============================================================================

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Facts Table
CREATE TABLE IF NOT EXISTS public.facts (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  fact_title TEXT NOT NULL,
  scripture_ref TEXT NOT NULL,
  verse_text TEXT NOT NULL,
  historical_context TEXT,
  cultural_practice TEXT,
  strongs_word TEXT,
  strongs_transliteration TEXT,
  strongs_definition TEXT,
  strongs_number TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Scriptures Table
CREATE TABLE IF NOT EXISTS public.scriptures (
  id TEXT PRIMARY KEY,
  reference TEXT NOT NULL,
  book TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  verse_range TEXT NOT NULL,
  text TEXT NOT NULL,
  testament TEXT NOT NULL,
  genre TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  summary TEXT,
  historical_context TEXT,
  cultural_practice TEXT,
  strongs_word TEXT,
  strongs_transliteration TEXT,
  strongs_definition TEXT,
  strongs_number TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Word of the Day Table
CREATE TABLE IF NOT EXISTS public.word_of_the_day (
  id TEXT PRIMARY KEY,
  date DATE DEFAULT CURRENT_DATE,
  verse TEXT NOT NULL,
  reference TEXT NOT NULL,
  original_intent TEXT NOT NULL,
  theological_truth TEXT NOT NULL,
  modern_walk TEXT NOT NULL,
  prayer_focus TEXT NOT NULL,
  memory_verse TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. User Favorites (Facts) Table
CREATE TABLE IF NOT EXISTS public.user_favorites_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  fact_id TEXT REFERENCES public.facts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, fact_id)
);

-- 6. User Favorites (Scriptures) Table
CREATE TABLE IF NOT EXISTS public.user_favorites_scriptures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  scripture_id TEXT REFERENCES public.scriptures(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, scripture_id)
);

-- 7. User Daily Study Progress Table
CREATE TABLE IF NOT EXISTS public.user_study_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  wotd_id TEXT REFERENCES public.word_of_the_day(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, wotd_id)
);

-- 8. Study Notes Table
CREATE TABLE IF NOT EXISTS public.study_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reference TEXT NOT NULL,
  note_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- Row Level Security (RLS)
-- ==============================================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scriptures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_of_the_day ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites_scriptures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_study_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_notes ENABLE ROW LEVEL SECURITY;

-- Read policies for public canonical data
DROP POLICY IF EXISTS "Categories are viewable by all users" ON public.categories;
CREATE POLICY "Categories are viewable by all users"
  ON public.categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Facts are viewable by all users" ON public.facts;
CREATE POLICY "Facts are viewable by all users"
  ON public.facts FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Scriptures are viewable by all users" ON public.scriptures;
CREATE POLICY "Scriptures are viewable by all users"
  ON public.scriptures FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Word of the day is viewable by all users" ON public.word_of_the_day;
CREATE POLICY "Word of the day is viewable by all users"
  ON public.word_of_the_day FOR SELECT
  USING (true);

-- User-scoped policies for user_favorites_facts
DROP POLICY IF EXISTS "Users can view own fact favorites" ON public.user_favorites_facts;
CREATE POLICY "Users can view own fact favorites"
  ON public.user_favorites_facts FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own fact favorites" ON public.user_favorites_facts;
CREATE POLICY "Users can insert own fact favorites"
  ON public.user_favorites_facts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own fact favorites" ON public.user_favorites_facts;
CREATE POLICY "Users can delete own fact favorites"
  ON public.user_favorites_facts FOR DELETE
  USING (auth.uid() = user_id);

-- User-scoped policies for user_favorites_scriptures
DROP POLICY IF EXISTS "Users can view own scripture favorites" ON public.user_favorites_scriptures;
CREATE POLICY "Users can view own scripture favorites"
  ON public.user_favorites_scriptures FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own scripture favorites" ON public.user_favorites_scriptures;
CREATE POLICY "Users can insert own scripture favorites"
  ON public.user_favorites_scriptures FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own scripture favorites" ON public.user_favorites_scriptures;
CREATE POLICY "Users can delete own scripture favorites"
  ON public.user_favorites_scriptures FOR DELETE
  USING (auth.uid() = user_id);

-- User-scoped policies for user_study_progress
DROP POLICY IF EXISTS "Users can view own study progress" ON public.user_study_progress;
CREATE POLICY "Users can view own study progress"
  ON public.user_study_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own study progress" ON public.user_study_progress;
CREATE POLICY "Users can insert own study progress"
  ON public.user_study_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User-scoped policies for study_notes
DROP POLICY IF EXISTS "Users can view own study notes" ON public.study_notes;
CREATE POLICY "Users can view own study notes"
  ON public.study_notes FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own study notes" ON public.study_notes;
CREATE POLICY "Users can insert own study notes"
  ON public.study_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own study notes" ON public.study_notes;
CREATE POLICY "Users can update own study notes"
  ON public.study_notes FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own study notes" ON public.study_notes;
CREATE POLICY "Users can delete own study notes"
  ON public.study_notes FOR DELETE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- Performance Indexes
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_facts_category_id ON public.facts(category_id);
CREATE INDEX IF NOT EXISTS idx_facts_category ON public.facts(category);
CREATE INDEX IF NOT EXISTS idx_scriptures_testament ON public.scriptures(testament);
CREATE INDEX IF NOT EXISTS idx_scriptures_genre ON public.scriptures(genre);
CREATE INDEX IF NOT EXISTS idx_user_fav_facts_user ON public.user_favorites_facts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_fav_scriptures_user ON public.user_favorites_scriptures(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_study_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_study_notes_user ON public.study_notes(user_id);
