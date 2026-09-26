import AsyncStorage from '@react-native-async-storage/async-storage';
import { BibleChapterData, PREBUNDLED_CHAPTERS, BIBLE_BOOKS } from '../data/bibleCanon';
import {
  getOfflineChapter,
  downloadTranslation,
  TRANSLATION_SOURCES,
  findBookIndex,
} from './offlineBibleService';

export * from './offlineBibleService';

const CACHE_PREFIX = '@bible_chapter_cache_';
const LAST_READ_KEY = '@bible_last_read_position';

// In-memory fast cache
const memoryCache = new Map<string, BibleChapterData>();

export interface LastReadPosition {
  book: string;
  chapter: number;
  translation: string;
  verse?: number;
  timestamp: number;
}

/**
 * Fetch full chapter from multi-tier caching:
 * 0. Offline downloaded full Bible translation packages (instant 0ms)
 * 1. Memory cache
 * 2. AsyncStorage persistent local cache
 * 3. Network fetch via direct translation APIs or bible-api.com
 * 4. Fallback to prebundled chapters if network fails and cache is empty
 */
export async function fetchChapter(
  book: string,
  chapter: number,
  translation: string = 'web'
): Promise<BibleChapterData> {
  const normalizedBook = book.trim();
  const cacheKey = `${translation}_${normalizedBook.replace(/\s+/g, '_')}_${chapter}`;

  // 0. Check offline downloaded full translation package (instant 0ms, complete 66 books)
  try {
    const offlineChapter = await getOfflineChapter(normalizedBook, chapter, translation);
    if (offlineChapter) {
      memoryCache.set(cacheKey, offlineChapter);
      return offlineChapter;
    }
  } catch (offlineErr) {
    console.warn('Offline package lookup error:', offlineErr);
  }

  // 1. Check memory cache
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey)!;
  }

  // 2. Check AsyncStorage persistent cache
  try {
    const cached = await AsyncStorage.getItem(CACHE_PREFIX + cacheKey);
    if (cached) {
      const parsed: BibleChapterData = JSON.parse(cached);
      memoryCache.set(cacheKey, parsed);
      return parsed;
    }
  } catch (e) {
    console.warn('Cache read notice:', e);
  }

  // 3a. High-speed live single-chapter streaming for The Message (MSG)
  if (translation === 'msg') {
    try {
      const bIdx = findBookIndex(normalizedBook);
      if (bIdx !== -1) {
        const bookNum = bIdx + 1;
        const bollsRes = await fetch(`https://bolls.life/get-chapter/MSG/${bookNum}/${chapter}/`);
        if (bollsRes.ok) {
          const rawVerses: Array<{ verse: number; text: string }> = await bollsRes.json();
          if (Array.isArray(rawVerses) && rawVerses.length > 0) {
            const canonicalBook = BIBLE_BOOKS[bIdx];
            const verses = rawVerses.map((v) => ({
              book_id: canonicalBook.id,
              book_name: canonicalBook.name,
              chapter,
              verse: v.verse,
              text: (v.text || '').trim(),
            }));
            const chapterData: BibleChapterData = {
              reference: `${canonicalBook.name} ${chapter}`,
              book_name: canonicalBook.name,
              chapter,
              verses,
              text: verses.map((v) => `${v.verse} ${v.text}`).join('\n\n'),
              translation_id: 'msg',
              translation_name: 'The Message',
            };
            memoryCache.set(cacheKey, chapterData);
            AsyncStorage.setItem(CACHE_PREFIX + cacheKey, JSON.stringify(chapterData)).catch(() => {});
            return chapterData;
          }
        }
      }
    } catch (msgErr) {
      console.warn('Direct live MSG stream attempt notice:', msgErr);
    }
  }

  // 3b. If translation source is defined in TRANSLATION_SOURCES, trigger auto-download full package for offline reading
  if (TRANSLATION_SOURCES[translation]) {
    try {
      await downloadTranslation(translation);
      const freshlyDownloaded = await getOfflineChapter(normalizedBook, chapter, translation);
      if (freshlyDownloaded) {
        memoryCache.set(cacheKey, freshlyDownloaded);
        return freshlyDownloaded;
      }
    } catch (dlErr) {
      console.warn(`Auto-download failed for ${translation}:`, dlErr);
    }
  }

  // 4. Network fetch from public bible-api.com
  try {
    const encodedBook = encodeURIComponent(normalizedBook);
    const url = `https://bible-api.com/${encodedBook}+${chapter}?translation=${translation}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data && data.verses && data.verses.length > 0) {
        const chapterData: BibleChapterData = {
          reference: data.reference || `${normalizedBook} ${chapter}`,
          book_name: data.verses[0].book_name || normalizedBook,
          chapter: chapter,
          verses: data.verses.map((v: any) => ({
            book_id: v.book_id || '',
            book_name: v.book_name || normalizedBook,
            chapter: v.chapter || chapter,
            verse: v.verse,
            text: (v.text || '').trim(),
          })),
          text: data.text || '',
          translation_id: data.translation_id || translation,
          translation_name: data.translation_name || translation.toUpperCase(),
        };

        // Save to memory cache
        memoryCache.set(cacheKey, chapterData);

        // Save to persistent storage asynchronously
        AsyncStorage.setItem(CACHE_PREFIX + cacheKey, JSON.stringify(chapterData)).catch((err) =>
          console.warn('Failed to persist chapter cache:', err)
        );

        return chapterData;
      }
    }
  } catch (netErr) {
    console.warn('Network Bible fetch failed, checking fallback:', netErr);
  }

  // 4. Fallback to prebundled chapters or generate synthetic placeholder
  const fallbackKeyWithTrans = `${normalizedBook.replace(/\s+/g, '_')}_${chapter}_${translation}`;
  const fallbackKey = `${normalizedBook.replace(/\s+/g, '_')}_${chapter}`;
  if (PREBUNDLED_CHAPTERS[fallbackKeyWithTrans]) {
    const fb = PREBUNDLED_CHAPTERS[fallbackKeyWithTrans];
    memoryCache.set(cacheKey, fb);
    return fb;
  }
  if (PREBUNDLED_CHAPTERS[fallbackKey]) {
    const fb = PREBUNDLED_CHAPTERS[fallbackKey];
    memoryCache.set(cacheKey, fb);
    return fb;
  }

  // Emergency graceful offline fallback
  return {
    reference: `${normalizedBook} ${chapter}`,
    book_name: normalizedBook,
    chapter: chapter,
    verses: [
      {
        book_id: '',
        book_name: normalizedBook,
        chapter: chapter,
        verse: 1,
        text: `You are currently offline. Please connect to the internet to load ${normalizedBook} ${chapter}, or download ${translation.toUpperCase()} in the translation picker for full offline access to all 66 books.`,
      },
    ],
    text: `Connecting to Bible Library for ${normalizedBook} ${chapter}...`,
    translation_id: translation,
    translation_name: translation.toUpperCase(),
  };
}

/**
 * Save user's reading position
 */
export async function saveLastReadPosition(position: Omit<LastReadPosition, 'timestamp'>): Promise<void> {
  try {
    const payload: LastReadPosition = {
      ...position,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(LAST_READ_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn('Failed to save last read position:', e);
  }
}

/**
 * Get user's reading position, defaulting to John 3
 */
export async function getLastReadPosition(): Promise<LastReadPosition> {
  try {
    const saved = await AsyncStorage.getItem(LAST_READ_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load last read position:', e);
  }
  return {
    book: 'John',
    chapter: 3,
    translation: 'web',
    timestamp: Date.now(),
  };
}
