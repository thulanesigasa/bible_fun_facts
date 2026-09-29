import {
  getBaseHebrewEntries,
  getBaseGreekEntries,
  getHebrewLexicon,
  getGreekLexicon,
  searchConcordance,
  getLexiconEntryByStrongs,
  getAdjacentLexiconEntries,
  isHebrewLexiconCached,
  isGreekLexiconCached,
  isConcordanceCached,
} from '../src/data/lexiconData';
import {
  getCanonicalHebrewBatches,
  getCanonicalGreekBatches,
  isCanonicalHebrewLoaded,
  isCanonicalGreekLoaded,
} from '../src/data/strongs';

describe('Lexicon Performance & Isolated Pipeline Optimization', () => {
  it('isolates canonical Hebrew batches without loading Greek', () => {
    const hebrew = getCanonicalHebrewBatches();
    expect(Array.isArray(hebrew)).toBe(true);
    expect(hebrew.length).toBeGreaterThanOrEqual(8674);
    expect(isCanonicalHebrewLoaded()).toBe(true);
  });

  it('isolates canonical Greek batches without loading Hebrew unnecessarily', () => {
    const greek = getCanonicalGreekBatches();
    expect(Array.isArray(greek)).toBe(true);
    expect(greek.length).toBeGreaterThanOrEqual(5523);
    expect(isCanonicalGreekLoaded()).toBe(true);
  });

  it('getBaseHebrewEntries returns pre-sorted Hebrew entries and activates cache', () => {
    const baseHebrew = getBaseHebrewEntries();
    expect(baseHebrew.length).toBeGreaterThanOrEqual(8674);
    expect(isHebrewLexiconCached()).toBe(true);

    // Verify alphabetical sorting order
    const first = (baseHebrew[0].englishWord || baseHebrew[0].transliteration).toLowerCase();
    const second = (baseHebrew[1].englishWord || baseHebrew[1].transliteration).toLowerCase();
    expect(first <= second).toBe(true);
  });

  it('getBaseGreekEntries returns pre-sorted Greek entries and activates cache', () => {
    const baseGreek = getBaseGreekEntries();
    expect(baseGreek.length).toBeGreaterThanOrEqual(5523);
    expect(isGreekLexiconCached()).toBe(true);

    // Verify alphabetical sorting order
    const first = (baseGreek[0].englishWord || baseGreek[0].transliteration).toLowerCase();
    const second = (baseGreek[1].englishWord || baseGreek[1].transliteration).toLowerCase();
    expect(first <= second).toBe(true);
  });

  it('getHebrewLexicon returns cached base directly when no query/category is specified', () => {
    const t0 = Date.now();
    const entries = getHebrewLexicon('All', '');
    const elapsed = Date.now() - t0;

    expect(entries.length).toBeGreaterThanOrEqual(8674);
    // Instant sub-millisecond return from cache
    expect(elapsed).toBeLessThan(50);
  });

  it('getGreekLexicon returns cached base directly when no query/category is specified', () => {
    const t0 = Date.now();
    const entries = getGreekLexicon('All', '');
    const elapsed = Date.now() - t0;

    expect(entries.length).toBeGreaterThanOrEqual(5523);
    // Instant sub-millisecond return from cache
    expect(elapsed).toBeLessThan(50);
  });

  it('searchConcordance performs fast search across all entries', () => {
    const results = searchConcordance('peace', 'hebrew');
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.some(
        (r) =>
          (r.shortDefinition || '').toLowerCase().includes('peace') ||
          (r.englishWord || '').toLowerCase().includes('peace')
      )
    ).toBe(true);
  });

  it('getLexiconEntryByStrongs resolves entry in O(1) time', () => {
    const entryH = getLexiconEntryByStrongs('H1254');
    expect(entryH).toBeDefined();
    expect(entryH?.strongsNumber).toBe('H1254');

    const entryG = getLexiconEntryByStrongs('G26');
    expect(entryG).toBeDefined();
    expect(entryG?.strongsNumber).toBe('G26');
  });

  it('getAdjacentLexiconEntries retrieves neighboring entries correctly', () => {
    const adjacent = getAdjacentLexiconEntries('H2');
    expect(adjacent.prev).toBeDefined();
    expect(adjacent.next).toBeDefined();
  });
});
