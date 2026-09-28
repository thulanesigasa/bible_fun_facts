import { LexiconEntry } from '../lexiconData';

export interface StrongsBatch {
  batchId: string;
  language: 'hebrew' | 'greek';
  range: string;
  description: string;
  entries: LexiconEntry[];
}
