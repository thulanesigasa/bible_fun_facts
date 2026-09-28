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
 * Modular batches are ingested incrementally across canonical partitions.
 */
export const TOTAL_CANONICAL_STRONGS_COUNT = 14298;
export const TOTAL_HEBREW_CANONICAL_COUNT = 8674;
export const TOTAL_GREEK_CANONICAL_COUNT = 5624;

export const STRONGS_BATCHES: StrongsBatch[] = [
  {
    batchId: 'hebrew-batch-1',
    language: 'hebrew',
    range: 'H1 - H8674 (Pillars)',
    description: 'Foundational Hebrew Old Testament theological roots & covenant names',
    entries: HEBREW_BATCH_1,
  },
  {
    batchId: 'greek-batch-1',
    language: 'greek',
    range: 'G1 - G5624 (Pillars)',
    description: 'Foundational Greek New Testament Christological & gospel vocabulary',
    entries: GREEK_BATCH_1,
  },
];

export const ALL_STRONGS_BATCHES: LexiconEntry[] = [
  ...HEBREW_BATCH_1,
  ...GREEK_BATCH_1,
];
