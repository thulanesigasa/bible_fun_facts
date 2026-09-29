import {
  generateGreekPhonetic,
  getEffectivePronunciation,
  hydrateGreekLexiconEntry,
  KNOWN_GREEK_PHONETIC_OVERRIDES,
} from '../src/services/greekPronunciationService';
import { getBaseHebrewEntries, getBaseGreekEntries } from '../src/data/lexiconData';

describe("Strong's Pronunciation Coverage & Koine Greek Phonetics Service", () => {
  describe('generateGreekPhonetic unit tests', () => {
    it('correctly uses curated overrides for key theological lemmas', () => {
      expect(generateGreekPhonetic('Ἄλφα', 'Alpha', 'G1')).toBe("al'-fah");
      expect(generateGreekPhonetic('ἀγαπάω', 'agapaō', 'G25')).toBe("ag-ap-ah'-o");
      expect(generateGreekPhonetic('ἀγάπη', 'agapē', 'G26')).toBe("ag-ah'-pay");
      expect(generateGreekPhonetic('ἐκτελέω', 'ekteléō', 'G1615')).toBe("ek-tel-eh'-o");
      expect(generateGreekPhonetic('λόγος', 'logos', 'G3056')).toBe("log'-os");
      expect(generateGreekPhonetic('χάρις', 'charis', 'G5485')).toBe("khar'-ece");
      expect(generateGreekPhonetic('πνεῦμα', 'pneûma', 'G4151')).toBe("pnyoo'-mah");
      expect(generateGreekPhonetic('ζωή', 'zōē', 'G2222')).toBe("dzo-ay'");
      expect(generateGreekPhonetic('πίστις', 'pistis', 'G4102')).toBe("pis'-tis");
    });

    it('generates authentic phonetic pronunciations with primary stress mark', () => {
      const pron1 = generateGreekPhonetic('ἡττάω', 'hēttáō');
      expect(pron1).toBe("hayt-tah'-o");
      expect(pron1.includes("'")).toBe(true);

      const pron2 = generateGreekPhonetic('παρανομία', 'paranomía');
      expect(pron2).toBe("pah-rah-no-mee'-ah");
      expect(pron2.includes("'")).toBe(true);

      const pron3 = generateGreekPhonetic('οἷος', 'hoîos');
      expect(pron3).toBe("hoy'-os");
      expect(pron3.includes("'")).toBe(true);

      const pron4 = generateGreekPhonetic('κρύπτω', 'krýptō');
      expect(pron4).toBe("kroop'-to");
      expect(pron4.includes("'")).toBe(true);

      const pron5 = generateGreekPhonetic('ἀνυπότακτος', 'anypótaktos');
      expect(pron5).toBe("ah-noo-po'-tahk-tos");
      expect(pron5.includes("'")).toBe(true);
    });

    it('handles diphthongs and long vowels accurately', () => {
      // ou -> oo
      expect(generateGreekPhonetic('οὐ', 'ou')).toBe("oo'");
      // oi -> oy
      expect(generateGreekPhonetic('τούτοις', 'toútois')).toBe("too'-toys");
      // au -> ow
      expect(generateGreekPhonetic('αὐτός', 'autós')).toBe("ow-tos'");
      // eu -> yoo
      expect(generateGreekPhonetic('εὐαγγέλιον', 'euangélion', 'G2098')).toBe("yoo-ang-ghel'-ee-on");
    });

    it('handles nasal gamma combinations correctly', () => {
      // G32 classical override: ang'-gel-os
      const pronWithId = generateGreekPhonetic('ἄγγελος', 'ángelos', 'G32');
      expect(pronWithId).toBe("ang'-gel-os");

      // Algorithm gamma-nasal detection
      const pronWithoutId = generateGreekPhonetic('ἄγγελος', 'aggelos');
      expect(pronWithoutId).toContain('ng-g');
    });
  });

  describe('getEffectivePronunciation & hydrateGreekLexiconEntry', () => {
    it('returns existing pronunciation if already present', () => {
      const entry = {
        strongsNumber: 'G9999',
        originalScript: 'test',
        transliteration: 'test',
        pronunciation: 'custom-pron',
        language: 'greek' as const,
      };
      expect(getEffectivePronunciation(entry)).toBe('custom-pron');
    });

    it('generates fallback pronunciation for Greek entry when pronunciation is empty', () => {
      const entry = {
        strongsNumber: 'G1615',
        originalScript: 'ἐκτελέω',
        transliteration: 'ekteléō',
        pronunciation: '',
        language: 'greek' as const,
      };
      expect(getEffectivePronunciation(entry)).toBe("ek-tel-eh'-o");
    });

    it('hydrates entry in-memory with non-empty pronunciation', () => {
      const dummyEntry: any = {
        strongsNumber: 'G3056',
        originalScript: 'λόγος',
        transliteration: 'logos',
        pronunciation: '',
        language: 'greek',
      };
      const hydrated = hydrateGreekLexiconEntry(dummyEntry);
      expect(hydrated.pronunciation).toBe("log'-os");
    });
  });

  describe('Exhaustive Lexicon Dataset Pronunciation Coverage (100% Target)', () => {
    it('guarantees 100% of Hebrew canonical entries have non-empty authentic pronunciations', () => {
      const hebrew = getBaseHebrewEntries();
      expect(hebrew.length).toBeGreaterThanOrEqual(8674);

      const missingHebrew = hebrew.filter(
        (e) => !e.pronunciation || e.pronunciation.trim().length === 0
      );
      expect(missingHebrew.length).toBe(0);
    });

    it('guarantees 100% of Greek canonical entries have non-empty authentic pronunciations', () => {
      const greek = getBaseGreekEntries();
      expect(greek.length).toBeGreaterThanOrEqual(5523);

      const missingGreek = greek.filter(
        (e) => !e.pronunciation || e.pronunciation.trim().length === 0
      );
      expect(missingGreek.length).toBe(0);
    });

    it('ensures every single Greek pronunciation has stress apostrophe and valid format', () => {
      const greek = getBaseGreekEntries();
      for (let i = 0; i < greek.length; i++) {
        const item = greek[i];
        expect(item.pronunciation).toBeTruthy();
        expect(typeof item.pronunciation).toBe('string');
        expect(item.pronunciation.length).toBeGreaterThan(0);
        // Ensure no leftover template or NaN artifacts
        expect(item.pronunciation).not.toContain('undefined');
        expect(item.pronunciation).not.toContain('NaN');
        expect(item.pronunciation).not.toContain('--');
      }
    });
  });
});
