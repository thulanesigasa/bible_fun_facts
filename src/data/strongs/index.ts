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

let _memoizedHebrewBatches: LexiconEntry[] | null = null;
let _memoizedGreekBatches: LexiconEntry[] | null = null;
let _memoizedBatches: LexiconEntry[] | null = null;

export function isCanonicalHebrewLoaded(): boolean {
  return _memoizedHebrewBatches !== null;
}

export function isCanonicalGreekLoaded(): boolean {
  return _memoizedGreekBatches !== null;
}

/**
 * Merges raw Hebrew canonical dataset (8,674 entries) with curated Hebrew Batch 1.
 * Loads ONLY canonicalHebrew.json lazily on-demand without touching Greek data.
 */
export function getCanonicalHebrewBatches(): LexiconEntry[] {
  if (_memoizedHebrewBatches) return _memoizedHebrewBatches;

  const hebrewRaw = getCanonicalHebrewRaw();
  const map = new Map<string, LexiconEntry>();

  for (let i = 0; i < hebrewRaw.length; i++) {
    const item = hebrewRaw[i];
    map.set(item.strongsNumber, item);
  }

  for (let i = 0; i < HEBREW_BATCH_1.length; i++) {
    const item = HEBREW_BATCH_1[i];
    map.set(item.strongsNumber, item);
  }

  _memoizedHebrewBatches = Array.from(map.values());
  return _memoizedHebrewBatches;
}

/**
 * Merges raw Greek canonical dataset (5,523 entries) with curated Greek Batch 1.
 * Loads ONLY canonicalGreek.json lazily on-demand without touching Hebrew data.
 */
export function getCanonicalGreekBatches(): LexiconEntry[] {
  if (_memoizedGreekBatches) return _memoizedGreekBatches;

  const greekRaw = getCanonicalGreekRaw();
  const map = new Map<string, LexiconEntry>();

  for (let i = 0; i < greekRaw.length; i++) {
    const item = greekRaw[i];
    map.set(item.strongsNumber, item);
  }

  for (let i = 0; i < GREEK_BATCH_1.length; i++) {
    const item = GREEK_BATCH_1[i];
    map.set(item.strongsNumber, item);
  }

  _memoizedGreekBatches = Array.from(map.values());
  return _memoizedGreekBatches;
}

/**
 * Combines both Hebrew and Greek canonical batches into the full 14,298 Strong's lexicon.
 */
export function getAllCanonicalStrongs(): LexiconEntry[] {
  if (!_memoizedBatches) {
    const hebrew = getCanonicalHebrewBatches();
    const greek = getCanonicalGreekBatches();
    _memoizedBatches = [...hebrew, ...greek];
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
