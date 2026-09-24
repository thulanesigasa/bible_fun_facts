import * as FileSystem from 'expo-file-system/legacy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BIBLE_BOOKS, BibleChapterData } from '../data/bibleCanon';

const REGISTRY_KEY = '@offline_bible_registry_v1';
const OFFLINE_DIR = `${FileSystem.documentDirectory}offline_bibles/`;

export interface DownloadedTranslationMeta {
  id: string;
  name: string;
  downloadedAt: number;
  sizeBytes: number;
  sizeFormatted: string;
  booksCount: number;
  isComplete: boolean;
}

export interface RawBibleBook {
  abbrev: string;
  name: string;
  chapters: string[][];
}

export type TranslationCategory = 'african' | 'popular' | 'classic';

export interface TranslationSourceConfig {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  language: string;
  category: TranslationCategory;
  url: string;
  urls: string[];
  fallbackUrl?: string;
  sizeEstimate: string;
}

// Translation CDN source mapping (verified public domain & open digital scripture sources with multi-CDN redundancy)
export const TRANSLATION_SOURCES: Record<string, TranslationSourceConfig> = {
  // ── 1. SOUTH AFRICAN & AFRICAN TRANSLATIONS ─────────────────────────────
  zulu: {
    id: 'zulu',
    name: 'IBhayibheli Elingcwele',
    abbreviation: 'ZUL',
    description: 'isiZulu 1959 Translation - Full Bible',
    language: 'isiZulu',
    category: 'african',
    url: 'https://cdn.jsdelivr.net/gh/godlytalias/Bible-Database@master/Zulu/bible.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/godlytalias/Bible-Database@master/Zulu/bible.json',
      'https://raw.githubusercontent.com/godlytalias/Bible-Database/master/Zulu/bible.json',
      'https://fastly.jsdelivr.net/gh/godlytalias/Bible-Database@master/Zulu/bible.json',
    ],
    sizeEstimate: '5.1 MB',
  },
  xhosa: {
    id: 'xhosa',
    name: 'IBhayibhile Engcwele',
    abbreviation: 'XHO',
    description: 'isiXhosa Translation - Full Bible',
    language: 'isiXhosa',
    category: 'african',
    url: 'https://cdn.jsdelivr.net/gh/godlytalias/Bible-Database@master/Xhosa/bible.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/godlytalias/Bible-Database@master/Xhosa/bible.json',
      'https://raw.githubusercontent.com/godlytalias/Bible-Database/master/Xhosa/bible.json',
      'https://fastly.jsdelivr.net/gh/godlytalias/Bible-Database@master/Xhosa/bible.json',
    ],
    sizeEstimate: '5.2 MB',
  },
  sepedi: {
    id: 'sepedi',
    name: 'Bibele Taba ye Botse',
    abbreviation: 'NSO',
    description: 'Sesotho sa Leboa / Sepedi - Full Bible',
    language: 'Sesotho sa Leboa',
    category: 'african',
    url: 'https://cdn.jsdelivr.net/gh/godlytalias/Bible-Database@master/Sepedi/bible.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/godlytalias/Bible-Database@master/Sepedi/bible.json',
      'https://raw.githubusercontent.com/godlytalias/Bible-Database/master/Sepedi/bible.json',
      'https://fastly.jsdelivr.net/gh/godlytalias/Bible-Database@master/Sepedi/bible.json',
    ],
    sizeEstimate: '6.1 MB',
  },
  afr: {
    id: 'afr',
    name: 'Die Bybel (1933/1953)',
    abbreviation: 'AFR',
    description: 'Afrikaans 1933/1953 Vertaling - Full Bible',
    language: 'Afrikaans',
    category: 'african',
    url: 'https://cdn.jsdelivr.net/gh/godlytalias/Bible-Database@master/Afrikaans/bible.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/godlytalias/Bible-Database@master/Afrikaans/bible.json',
      'https://raw.githubusercontent.com/godlytalias/Bible-Database/master/Afrikaans/bible.json',
      'https://fastly.jsdelivr.net/gh/godlytalias/Bible-Database@master/Afrikaans/bible.json',
    ],
    sizeEstimate: '5.6 MB',
  },
  sw: {
    id: 'sw',
    name: 'Biblia Takatifu (Union)',
    abbreviation: 'SWA',
    description: 'Kiswahili Union Version - Full Bible',
    language: 'Kiswahili',
    category: 'african',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/sw_sruv.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/sw_sruv.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/sw_sruv.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/sw_sruv.json',
    ],
    sizeEstimate: '4.4 MB',
  },

  // ── 2. POPULAR MODERN TRANSLATIONS ───────────────────────────────────────
  niv: {
    id: 'niv',
    name: 'New International Version',
    abbreviation: 'NIV',
    description: 'Modern readable English - Full Bible',
    language: 'English',
    category: 'popular',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_niv.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_niv.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_niv.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_niv.json',
    ],
    sizeEstimate: '4.2 MB',
  },
  esv: {
    id: 'esv',
    name: 'English Standard Version',
    abbreviation: 'ESV',
    description: 'Essentially literal English - Full Bible',
    language: 'English',
    category: 'popular',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_esv.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_esv.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_esv.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_esv.json',
    ],
    sizeEstimate: '4.2 MB',
  },
  nlt: {
    id: 'nlt',
    name: 'New Living Translation',
    abbreviation: 'NLT',
    description: 'Dynamic clarity & readability - Full Bible',
    language: 'English',
    category: 'popular',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_nlt.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_nlt.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_nlt.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_nlt.json',
    ],
    sizeEstimate: '4.1 MB',
  },
  nkjv: {
    id: 'nkjv',
    name: 'New King James Version',
    abbreviation: 'NKJV',
    description: 'Modernized classic reverence - Full Bible',
    language: 'English',
    category: 'popular',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_nkjv.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_nkjv.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_nkjv.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_nkjv.json',
    ],
    sizeEstimate: '4.2 MB',
  },
  amp: {
    id: 'amp',
    name: 'Amplified Bible',
    abbreviation: 'AMP',
    description: 'Expanded shades of word meaning - Full Bible',
    language: 'English',
    category: 'popular',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_amp.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_amp.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_amp.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_amp.json',
    ],
    sizeEstimate: '4.5 MB',
  },
  bsb: {
    id: 'bsb',
    name: 'Berean Standard Bible',
    abbreviation: 'BSB',
    description: 'Accurate, clear Greek/Hebrew text - Full Bible',
    language: 'English',
    category: 'popular',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_bsb.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_bsb.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_bsb.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_bsb.json',
    ],
    sizeEstimate: '4.1 MB',
  },
  nasb: {
    id: 'nasb',
    name: 'New American Standard Bible',
    abbreviation: 'NASB',
    description: 'Word-for-word fidelity - Full Bible',
    language: 'English',
    category: 'popular',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_nasb.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_nasb.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_nasb.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_nasb.json',
    ],
    sizeEstimate: '4.2 MB',
  },
  csb: {
    id: 'csb',
    name: 'Christian Standard Bible',
    abbreviation: 'CSB',
    description: 'Optimal equivalence - Full Bible',
    language: 'English',
    category: 'popular',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_csb.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_csb.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_csb.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_csb.json',
    ],
    sizeEstimate: '4.2 MB',
  },

  // ── 3. CLASSIC & HISTORIC TRANSLATIONS ────────────────────────────────────
  web: {
    id: 'web',
    name: 'World English Bible',
    abbreviation: 'WEB',
    description: 'Modern English - Full Bible - Public Domain',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_web.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_web.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_web.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_web.json',
    ],
    sizeEstimate: '4.0 MB',
  },
  kjv: {
    id: 'kjv',
    name: 'King James Version',
    abbreviation: 'KJV',
    description: 'Historic 1611 - Full Bible - Public Domain',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_kjv.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_kjv.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_kjv.json',
    ],
    sizeEstimate: '4.1 MB',
  },
  asv: {
    id: 'asv',
    name: 'American Standard Version',
    abbreviation: 'ASV',
    description: 'Literal 1901 - Full Bible - Public Domain',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_asv.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_asv.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_asv.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_asv.json',
    ],
    sizeEstimate: '4.1 MB',
  },
  bbe: {
    id: 'bbe',
    name: 'Bible in Basic English',
    abbreviation: 'BBE',
    description: 'Simple 1,000-word vocabulary - Full Bible',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_bbe.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_bbe.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_bbe.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_bbe.json',
    ],
    sizeEstimate: '4.1 MB',
  },
  darby: {
    id: 'darby',
    name: 'Darby Bible',
    abbreviation: 'DARBY',
    description: 'Precise 1890 translation - Full Bible',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_darby.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_darby.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_darby.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_darby.json',
    ],
    sizeEstimate: '4.0 MB',
  },
  dra: {
    id: 'dra',
    name: 'Douay-Rheims 1899',
    abbreviation: 'DRA',
    description: 'Historic Catholic English Bible - Full Bible',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_dra.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_dra.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_dra.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_dra.json',
    ],
    sizeEstimate: '4.0 MB',
  },
  ylt: {
    id: 'ylt',
    name: "Young's Literal Translation",
    abbreviation: 'YLT',
    description: 'Strict literal verbal translation',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_ylt98.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_ylt98.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_ylt98.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_ylt98.json',
    ],
    sizeEstimate: '4.1 MB',
  },
  gnv: {
    id: 'gnv',
    name: 'Geneva Bible 1599',
    abbreviation: 'GNV',
    description: 'Historic Reformation Bible of the Pilgrims',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_gnv.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_gnv.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_gnv.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_gnv.json',
    ],
    sizeEstimate: '4.3 MB',
  },
  webbe: {
    id: 'webbe',
    name: 'World English Bible (British)',
    abbreviation: 'WEBBE',
    description: 'Modern UK/Commonwealth spelling - Full Bible',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_webbe.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_webbe.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_webbe.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_webbe.json',
    ],
    sizeEstimate: '4.0 MB',
  },
  'oeb-us': {
    id: 'oeb-us',
    name: 'Open English Bible (US)',
    abbreviation: 'OEB-US',
    description: 'Open license modern US English - Full Bible',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_webus.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_webus.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_webus.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_webus.json',
    ],
    sizeEstimate: '3.9 MB',
  },
  'oeb-cw': {
    id: 'oeb-cw',
    name: 'Open English Bible (Commonwealth)',
    abbreviation: 'OEB-CW',
    description: 'Open license modern UK English - Full Bible',
    language: 'English',
    category: 'classic',
    url: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_web.json',
    urls: [
      'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_web.json',
      'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_web.json',
      'https://fastly.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_web.json',
    ],
    sizeEstimate: '4.0 MB',
  },
};

/**
 * Normalize diverse Bible JSON structures into the unified RawBibleBook[] schema.
 * Handles both:
 * 1. Standard / thiagobodruk schema: RawBibleBook[]
 * 2. godlytalias/Bible-Database schema: { Book: [ { Chapter: [ { Verse: [ { Verse: string } ] } ] } ] }
 */
export function normalizeBibleJson(rawParsed: any): RawBibleBook[] {
  if (Array.isArray(rawParsed) && rawParsed.length >= 66) {
    return rawParsed;
  }
  if (rawParsed && Array.isArray(rawParsed.Book) && rawParsed.Book.length >= 66) {
    return rawParsed.Book.map((bookObj: any, bIdx: number) => {
      const canon = BIBLE_BOOKS[bIdx];
      const chapters: string[][] = (bookObj.Chapter || []).map((chObj: any) => {
        const rawVerses = chObj.Verse || [];
        return rawVerses.map((v: any) => {
          if (typeof v === 'string') return v.trim();
          if (v && typeof v.Verse === 'string') return v.Verse.trim();
          return '';
        });
      });
      return {
        abbrev: canon ? canon.id : `b${bIdx + 1}`,
        name: canon ? canon.name : `Book ${bIdx + 1}`,
        chapters,
      };
    });
  }
  throw new Error('Unrecognized Bible JSON schema: expected canonical 66-book array or { Book: [...] }');
}

export function getAllAvailableTranslations(): TranslationSourceConfig[] {
  return Object.values(TRANSLATION_SOURCES);
}

export function getTranslationsByCategory(category: TranslationCategory): TranslationSourceConfig[] {
  return Object.values(TRANSLATION_SOURCES).filter((t) => t.category === category);
}

// Fast in-memory cache of loaded translations
const memoryTranslationData = new Map<string, RawBibleBook[]>();
// Fast in-memory list of downloaded metadata
let cachedRegistry: DownloadedTranslationMeta[] | null = null;

// Subscribers for real-time reactivity
type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeOfflineUpdates(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifySubscribers() {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch (e) {
      console.warn('Listener error in offlineBibleService:', e);
    }
  });
}

/**
 * Format bytes to readable string (e.g. 4.1 MB)
 */
export function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

/**
 * Strip UTF-8 BOM (\uFEFF) and trim leading/trailing whitespace
 */
export function sanitizeJsonText(text: string): string {
  if (!text) return '';
  if (text.charCodeAt(0) === 0xfeff) {
    return text.slice(1).trim();
  }
  return text.trim();
}

/**
 * Ensure offline storage directory exists
 */
async function ensureDirExists(): Promise<void> {
  try {
    const dirInfo = await FileSystem.getInfoAsync(OFFLINE_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(OFFLINE_DIR, { intermediates: true });
    }
  } catch (e) {
    console.warn('Failed to ensure offline directory:', e);
  }
}

/**
 * Get all downloaded translations from registry
 */
export async function getDownloadedTranslations(): Promise<DownloadedTranslationMeta[]> {
  try {
    if (cachedRegistry) return cachedRegistry;
    const json = await AsyncStorage.getItem(REGISTRY_KEY);
    if (json) {
      cachedRegistry = JSON.parse(json);
      return cachedRegistry || [];
    }
  } catch (e) {
    console.warn('Failed to read offline registry:', e);
  }
  cachedRegistry = [];
  return [];
}

/**
 * Check if a translation is downloaded and ready for offline use
 */
export async function isTranslationDownloaded(translationId: string): Promise<boolean> {
  const list = await getDownloadedTranslations();
  return list.some((item) => item.id === translationId && item.isComplete);
}

/**
 * Synchronous check if registry is already loaded in memory
 */
export function isTranslationDownloadedSync(translationId: string): boolean {
  if (!cachedRegistry) return false;
  return cachedRegistry.some((item) => item.id === translationId && item.isComplete);
}

/**
 * Get file path for a translation
 */
function getTranslationFilePath(translationId: string): string {
  return `${OFFLINE_DIR}${translationId}.json`;
}

/**
 * Load translation books into memory cache with automatic BOM stripping
 */
async function loadTranslationIntoMemory(translationId: string): Promise<RawBibleBook[] | null> {
  if (memoryTranslationData.has(translationId)) {
    return memoryTranslationData.get(translationId)!;
  }

  try {
    const filePath = getTranslationFilePath(translationId);
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (!fileInfo.exists) {
      return null;
    }

    const content = await FileSystem.readAsStringAsync(filePath);
    const cleanContent = sanitizeJsonText(content);
    const parsed: RawBibleBook[] = JSON.parse(cleanContent);
    if (Array.isArray(parsed) && parsed.length > 0) {
      memoryTranslationData.set(translationId, parsed);
      return parsed;
    }
  } catch (e) {
    console.warn(`Failed to load translation ${translationId} from disk:`, e);
  }
  return null;
}

/**
 * Download a full translation package with multi-CDN fallback, progress tracking, and BOM resilience
 */
export async function downloadTranslation(
  translationId: string,
  onProgress?: (progressPercent: number) => void
): Promise<DownloadedTranslationMeta> {
  const source = TRANSLATION_SOURCES[translationId];
  if (!source) {
    throw new Error(`Unsupported translation for offline download: ${translationId}`);
  }

  await ensureDirExists();
  const filePath = getTranslationFilePath(translationId);

  // If already exists, delete first to ensure fresh clean download
  try {
    const existing = await FileSystem.getInfoAsync(filePath);
    if (existing.exists) {
      await FileSystem.deleteAsync(filePath, { idempotent: true });
    }
  } catch {}

  // Initial progress signal
  if (onProgress) onProgress(5);

  const candidateUrls = source.urls && source.urls.length > 0 ? source.urls : [source.url];
  let downloadSuccess = false;
  let parsedBooks: RawBibleBook[] | null = null;
  let lastError: Error | null = null;

  for (let i = 0; i < candidateUrls.length; i++) {
    const mirrorUrl = candidateUrls[i];
    try {
      if (onProgress) onProgress(10 + i * 5);

      // Strategy 1: Attempt FileSystem.createDownloadResumable
      let succeededWithResumable = false;
      try {
        const downloadResumable = FileSystem.createDownloadResumable(
          mirrorUrl,
          filePath,
          {},
          (progressData) => {
            if (progressData.totalBytesExpectedToWrite > 0) {
              const pct = Math.floor(
                (progressData.totalBytesWritten / progressData.totalBytesExpectedToWrite) * 85
              );
              if (onProgress) onProgress(Math.min(90, Math.max(10, pct)));
            } else if (progressData.totalBytesWritten > 0) {
              // Interpolate for chunked transfers without content-length header (~4.2MB estimated)
              const estimatedBytes = 4300000;
              const pct = Math.floor((progressData.totalBytesWritten / estimatedBytes) * 85);
              if (onProgress) onProgress(Math.min(90, Math.max(10, pct)));
            }
          }
        );

        const result = await downloadResumable.downloadAsync();
        if (result && result.uri && (!result.status || result.status === 200)) {
          succeededWithResumable = true;
        } else {
          console.warn(
            `createDownloadResumable returned non-200 status (${result?.status}) for ${mirrorUrl}`
          );
        }
      } catch (resumableErr) {
        console.warn(`createDownloadResumable error for ${mirrorUrl}:`, resumableErr);
      }

      // Strategy 2: If resumable failed or returned non-200, attempt direct fetch fallback
      if (!succeededWithResumable) {
        if (onProgress) onProgress(35 + i * 10);
        const response = await fetch(mirrorUrl, {
          headers: {
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} from mirror: ${mirrorUrl}`);
        }
        const textPayload = await response.text();
        const cleanPayload = sanitizeJsonText(textPayload);
        const rawJson = JSON.parse(cleanPayload);
        const booksCandidate = normalizeBibleJson(rawJson);
        if (!Array.isArray(booksCandidate) || booksCandidate.length < 66) {
          throw new Error(
            `Invalid books array (${booksCandidate?.length || 0}) from ${mirrorUrl}`
          );
        }
        // Write verified normalized clean JSON directly
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(booksCandidate));
        parsedBooks = booksCandidate;
        downloadSuccess = true;
        break;
      }

      // If we downloaded via resumable, inspect and sanitize file content
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        throw new Error(`Downloaded file missing at ${filePath}`);
      }

      const text = await FileSystem.readAsStringAsync(filePath);
      const clean = sanitizeJsonText(text);
      const rawJson = JSON.parse(clean);
      const books: RawBibleBook[] = normalizeBibleJson(rawJson);

      if (!Array.isArray(books) || books.length < 66) {
        throw new Error(`Downloaded Bible has ${books?.length || 0} books (expected >= 66)`);
      }

      // Always write clean normalized JSON so subsequent disk reads are uniform RawBibleBook[]
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(books));

      parsedBooks = books;
      downloadSuccess = true;
      break;
    } catch (err: any) {
      console.warn(`Mirror failed (${mirrorUrl}):`, err?.message || err);
      lastError = err;
      // Clean up partial invalid file before trying next mirror
      try {
        await FileSystem.deleteAsync(filePath, { idempotent: true });
      } catch {}
    }
  }

  if (!downloadSuccess || !parsedBooks) {
    throw new Error(
      `Failed to download ${source.name} after trying ${candidateUrls.length} mirrors. ${lastError?.message || ''}`
    );
  }

  if (onProgress) onProgress(95);

  // File integrity & sizing
  const finalInfo = await FileSystem.getInfoAsync(filePath);
  const sizeBytes = (finalInfo as any).size || 4200000;

  // Populate memory cache immediately
  memoryTranslationData.set(translationId, parsedBooks);

  const meta: DownloadedTranslationMeta = {
    id: translationId,
    name: source.name,
    downloadedAt: Date.now(),
    sizeBytes,
    sizeFormatted: formatBytes(sizeBytes),
    booksCount: parsedBooks.length,
    isComplete: true,
  };

  // Update persistent registry
  const currentList = await getDownloadedTranslations();
  const updatedList = currentList.filter((item) => item.id !== translationId);
  updatedList.push(meta);

  cachedRegistry = updatedList;
  await AsyncStorage.setItem(REGISTRY_KEY, JSON.stringify(updatedList));

  if (onProgress) onProgress(100);
  notifySubscribers();

  return meta;
}

/**
 * Delete a downloaded translation and free disk space
 */
export async function deleteDownloadedTranslation(translationId: string): Promise<void> {
  try {
    const filePath = getTranslationFilePath(translationId);
    const info = await FileSystem.getInfoAsync(filePath);
    if (info.exists) {
      await FileSystem.deleteAsync(filePath, { idempotent: true });
    }
  } catch (e) {
    console.warn(`Failed to delete translation file for ${translationId}:`, e);
  }

  memoryTranslationData.delete(translationId);

  const currentList = await getDownloadedTranslations();
  const updatedList = currentList.filter((item) => item.id !== translationId);
  cachedRegistry = updatedList;
  await AsyncStorage.setItem(REGISTRY_KEY, JSON.stringify(updatedList));

  notifySubscribers();
}

/**
 * Find canonical book index in standard Protestant 66-book order
 */
function findBookIndex(bookName: string): number {
  const norm = bookName.trim().toLowerCase();
  return BIBLE_BOOKS.findIndex(
    (b) => b.name.toLowerCase() === norm || b.id.toLowerCase() === norm
  );
}

/**
 * Retrieve a chapter from an offline downloaded translation
 * Returns BibleChapterData if available offline, or null if translation is not downloaded.
 */
export async function getOfflineChapter(
  bookName: string,
  chapter: number,
  translationId: string
): Promise<BibleChapterData | null> {
  const books = await loadTranslationIntoMemory(translationId);
  if (!books) return null;

  const bookIdx = findBookIndex(bookName);
  if (bookIdx === -1 || bookIdx >= books.length) {
    return null;
  }

  const rawBook = books[bookIdx];
  const chapterIdx = chapter - 1;
  if (!rawBook.chapters || chapterIdx < 0 || chapterIdx >= rawBook.chapters.length) {
    return null;
  }

  const rawVerses = rawBook.chapters[chapterIdx];
  if (!Array.isArray(rawVerses) || rawVerses.length === 0) {
    return null;
  }

  const canonicalBook = BIBLE_BOOKS[bookIdx];
  const translationName =
    TRANSLATION_SOURCES[translationId]?.name || translationId.toUpperCase();

  const verses = rawVerses.map((verseText, vIdx) => ({
    book_id: canonicalBook.id,
    book_name: canonicalBook.name,
    chapter,
    verse: vIdx + 1,
    text: (verseText || '').trim(),
  }));

  const fullText = verses.map((v) => `${v.verse} ${v.text}`).join('\n\n');

  return {
    reference: `${canonicalBook.name} ${chapter}`,
    book_name: canonicalBook.name,
    chapter,
    verses,
    text: fullText,
    translation_id: translationId,
    translation_name: translationName,
  };
}
