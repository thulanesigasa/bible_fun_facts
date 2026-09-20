import fs from 'fs';
import path from 'path';
import { facts, scriptures, wotd } from '../src/data/mockDatabase';

function escapeSql(str: string | undefined | null): string {
  if (str === undefined || str === null) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function escapeSqlArray(arr: string[] | undefined | null): string {
  if (!arr || arr.length === 0) return "'{}'";
  const elements = arr.map((item) => `"${item.replace(/"/g, '\\"')}"`);
  return `'{${elements.join(',')}}'`;
}

const categories = [
  {
    id: 'history',
    name: 'History',
    slug: 'history',
    description: 'Ancient Near Eastern and Greco-Roman historical events and archaeological context',
    icon: 'landmark',
  },
  {
    id: 'language',
    name: 'Language',
    slug: 'language',
    description: 'Original Hebrew, Aramaic, and Koine Greek linguistic depth and Strong numbers',
    icon: 'languages',
  },
  {
    id: 'people',
    name: 'People',
    slug: 'people',
    description: 'Patriarchs, kings, prophets, apostles, and historical figures',
    icon: 'users',
  },
  {
    id: 'prophecy',
    name: 'Prophecy',
    slug: 'prophecy',
    description: 'Messianic covenants, typology, and apocalyptic fulfillment',
    icon: 'compass',
  },
  {
    id: 'customs',
    name: 'Customs',
    slug: 'customs',
    description: 'Ancient Near Eastern ceremonies, cultural practices, and daily life idioms',
    icon: 'scroll',
  },
];

let sql = `-- ==============================================================================
-- Supabase Canonical Seed Data
-- Automatically generated from src/data/mockDatabase.ts
-- ==============================================================================

`;

// 1. Seed Categories
sql += `-- 1. Seed Categories\n`;
for (const cat of categories) {
  sql += `INSERT INTO public.categories (id, name, slug, description, icon)
VALUES (${escapeSql(cat.id)}, ${escapeSql(cat.name)}, ${escapeSql(cat.slug)}, ${escapeSql(cat.description)}, ${escapeSql(cat.icon)})
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;\n\n`;
}

// 2. Seed Facts
sql += `-- 2. Seed Facts (${facts.length} items)\n`;
for (const fact of facts) {
  const catId = fact.category.toLowerCase();
  sql += `INSERT INTO public.facts (
  id, category_id, fact_title, scripture_ref, verse_text, historical_context,
  cultural_practice, strongs_word, strongs_transliteration, strongs_definition,
  strongs_number, category, tags, likes_count, verified
)
VALUES (
  ${escapeSql(fact.id)},
  ${escapeSql(catId)},
  ${escapeSql(fact.fact_title)},
  ${escapeSql(fact.scripture_ref)},
  ${escapeSql(fact.verse_text)},
  ${escapeSql(fact.historical_context)},
  ${escapeSql(fact.cultural_practice)},
  ${escapeSql(fact.strongs_word)},
  ${escapeSql(fact.strongs_transliteration)},
  ${escapeSql(fact.strongs_definition)},
  ${escapeSql(fact.strongs_number)},
  ${escapeSql(fact.category)},
  ${escapeSqlArray(fact.tags)},
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  fact_title = EXCLUDED.fact_title,
  scripture_ref = EXCLUDED.scripture_ref,
  verse_text = EXCLUDED.verse_text,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags;\n\n`;
}

// 3. Seed Scriptures
sql += `-- 3. Seed Scriptures (${scriptures.length} items)\n`;
for (const sc of scriptures) {
  sql += `INSERT INTO public.scriptures (
  id, reference, book, chapter, verse_range, text, testament, genre,
  tags, summary, historical_context, cultural_practice, strongs_word,
  strongs_transliteration, strongs_definition, strongs_number, likes_count
)
VALUES (
  ${escapeSql(sc.id)},
  ${escapeSql(sc.reference)},
  ${escapeSql(sc.book)},
  ${sc.chapter},
  ${escapeSql(sc.verse_range)},
  ${escapeSql(sc.text)},
  ${escapeSql(sc.testament)},
  ${escapeSql(sc.genre)},
  ${escapeSqlArray(sc.tags)},
  ${escapeSql(sc.summary)},
  ${escapeSql(sc.historical_context)},
  ${escapeSql(sc.cultural_practice)},
  ${escapeSql(sc.strongs_word)},
  ${escapeSql(sc.strongs_transliteration)},
  ${escapeSql(sc.strongs_definition)},
  ${escapeSql(sc.strongs_number)},
  0
)
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference,
  book = EXCLUDED.book,
  chapter = EXCLUDED.chapter,
  verse_range = EXCLUDED.verse_range,
  text = EXCLUDED.text,
  testament = EXCLUDED.testament,
  genre = EXCLUDED.genre,
  tags = EXCLUDED.tags,
  summary = EXCLUDED.summary,
  historical_context = EXCLUDED.historical_context,
  cultural_practice = EXCLUDED.cultural_practice,
  strongs_word = EXCLUDED.strongs_word,
  strongs_transliteration = EXCLUDED.strongs_transliteration,
  strongs_definition = EXCLUDED.strongs_definition,
  strongs_number = EXCLUDED.strongs_number;\n\n`;
}

// 4. Seed Word of the Day
sql += `-- 4. Seed Word of the Day\n`;
sql += `INSERT INTO public.word_of_the_day (
  id, date, verse, reference, original_intent, theological_truth, modern_walk, prayer_focus, memory_verse
)
VALUES (
  ${escapeSql(wotd.id)},
  CURRENT_DATE,
  ${escapeSql(wotd.verse)},
  ${escapeSql(wotd.reference)},
  ${escapeSql(wotd.original_intent)},
  ${escapeSql(wotd.theological_truth)},
  ${escapeSql(wotd.modern_walk)},
  ${escapeSql(wotd.prayer_focus)},
  ${escapeSql(wotd.memory_verse)}
)
ON CONFLICT (id) DO UPDATE SET
  verse = EXCLUDED.verse,
  reference = EXCLUDED.reference,
  original_intent = EXCLUDED.original_intent,
  theological_truth = EXCLUDED.theological_truth,
  modern_walk = EXCLUDED.modern_walk,
  prayer_focus = EXCLUDED.prayer_focus,
  memory_verse = EXCLUDED.memory_verse;\n`;

const outputPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
fs.writeFileSync(outputPath, sql, 'utf-8');
console.log(`Successfully generated ${outputPath}`);
