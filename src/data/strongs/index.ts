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

// Load complete raw canonical partitions lazily on-demand
// so initial bundle evaluation does not parse 9.5MB of JSON at application boot
let _hebrewRaw: LexiconEntry[] | null = null;
let _greekRaw: LexiconEntry[] | null = null;

export function getCanonicalHebrewRaw(): LexiconEntry[] {
  if (!_hebrewRaw) {
    _hebrewRaw = require('./canonicalHebrew.json') as LexiconEntry[];
  }
  return _hebrewRaw;
}

export function getCanonicalGreekRaw(): LexiconEntry[] {
  if (!_greekRaw) {
    _greekRaw = require('./canonicalGreek.json') as LexiconEntry[];
  }
  return _greekRaw;
}

/**
 * Merges raw canonical datasets with rich theological batches on-demand.
 * Curated entries in HEBREW_BATCH_1 and GREEK_BATCH_1 override raw definitions,
 * providing deep theological exegesis, scripture citations, and curated categories.
 */
function buildCanonicalBatches(): LexiconEntry[] {
  const hebrewRaw = getCanonicalHebrewRaw();
  const greekRaw = getCanonicalGreekRaw();
  const map = new Map<string, LexiconEntry>();

  // 1. Add all 8,674 Hebrew canonical entries (H1 to H8674)
  for (let i = 0; i < hebrewRaw.length; i++) {
    const item = hebrewRaw[i];
    map.set(item.strongsNumber, item);
  }

  // 2. Add all 5,523 Greek canonical entries (G1 to G5624)
  for (let i = 0; i < greekRaw.length; i++) {
    const item = greekRaw[i];
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

// Lazy Proxy array: accessing methods/properties evaluates the canonical list on-demand
// so importing this module never blocks JS evaluation at application startup!
export const ALL_STRONGS_BATCHES: LexiconEntry[] = new Proxy([] as LexiconEntry[], {
  get(_target, prop, receiver) {
    const batches = getAllCanonicalStrongs();
    return Reflect.get(batches, prop, receiver);
  },
});

export const STRONGS_BATCHES: StrongsBatch[] = [
  {
    batchId: 'hebrew-canonical-complete',
    language: 'hebrew',
    range: 'H1 - H8674',
    description: 'Complete 8,674 Old Testament Hebrew & Aramaic canonical lemmas',
    entries: [],
  },
  {
    batchId: 'greek-canonical-complete',
    language: 'greek',
    range: 'G1 - G5624',
    description: 'Complete 5,523 New Testament Apostolic Koine Greek canonical lemmas',
    entries: [],
  },
];
