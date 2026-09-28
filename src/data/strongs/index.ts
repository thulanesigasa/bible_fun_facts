import { LexiconEntry } from '../lexiconData';
import { HEBREW_BATCH_1 } from './hebrewBatch1';
import { GREEK_BATCH_1 } from './greekBatch1';
import { StrongsBatch } from './types';

export * from './types';
export * from './hebrewBatch1';
export * from './greekBatch1';

/**
 * Strong's Exhaustive Canonical Concordance Batch Registry
 * Target Total: 14,298 Words (8,674 Hebrew + 5,624 Greek)
 * Exhaustive canonical dataset sourced from OpenScriptures public-domain scholarly lexicons.
 */
export const TOTAL_CANONICAL_STRONGS_COUNT = 14298;
export const TOTAL_HEBREW_CANONICAL_COUNT = 8674;
export const TOTAL_GREEK_CANONICAL_COUNT = 5624;

// Load complete raw canonical partitions lazily/safely using require
// to prevent massive TypeScript type-synthesis overhead on 14,000+ objects
const CANONICAL_HEBREW_RAW = require('./canonicalHebrew.json') as LexiconEntry[];
const CANONICAL_GREEK_RAW = require('./canonicalGreek.json') as LexiconEntry[];

/**
 * Merges raw canonical datasets with rich theological batches.
 * Curated entries in HEBREW_BATCH_1 and GREEK_BATCH_1 override raw definitions,
 * providing deep theological exegesis, scripture citations, and curated categories.
 */
function buildCanonicalBatches(): LexiconEntry[] {
  const map = new Map<string, LexiconEntry>();

  // 1. Add all 8,674 Hebrew canonical entries (H1 to H8674)
  for (let i = 0; i < CANONICAL_HEBREW_RAW.length; i++) {
    const item = CANONICAL_HEBREW_RAW[i];
    map.set(item.strongsNumber, item);
  }

  // 2. Add all 5,523 Greek canonical entries (G1 to G5624)
  for (let i = 0; i < CANONICAL_GREEK_RAW.length; i++) {
    const item = CANONICAL_GREEK_RAW[i];
    map.set(item.strongsNumber, item);
  }

  // 3. Override with curated theological batch 1 (higher depth & scholarly exegesis)
  for (let i = 0; i < HEBREW_BATCH_1.length; i++) {
    const item = HEBREW_BATCH_1[i];
    map.set(item.strongsNumber, item);
  }
  for (let i = 0; i < GREEK_BATCH_1.length; i++) {
    const item = GREEK_BATCH_1[i];
    map.set(item.strongsNumber, item);
  }

  return Array.from(map.values());
}

let _memoizedBatches: LexiconEntry[] | null = null;

export function getAllCanonicalStrongs(): LexiconEntry[] {
  if (!_memoizedBatches) {
    _memoizedBatches = buildCanonicalBatches();
  }
  return _memoizedBatches;
}

export const ALL_STRONGS_BATCHES: LexiconEntry[] = getAllCanonicalStrongs();

export const STRONGS_BATCHES: StrongsBatch[] = [
  {
    batchId: 'hebrew-canonical-complete',
    language: 'hebrew',
    range: 'H1 - H8674',
    description: 'Complete 8,674 Old Testament Hebrew & Aramaic canonical lemmas',
    entries: CANONICAL_HEBREW_RAW,
  },
  {
    batchId: 'greek-canonical-complete',
    language: 'greek',
    range: 'G1 - G5624',
    description: 'Complete 5,523 New Testament Apostolic Koine Greek canonical lemmas',
    entries: CANONICAL_GREEK_RAW,
  },
];
