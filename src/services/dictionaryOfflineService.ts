/**
 * Offline Strong's Biblical Dictionary Service
 *
 * Provides persistent on-device SQLite database storage and download management
 * for the complete 14,298 Strong's Biblical Concordance and Lexicon, ensuring
 * 100% offline study with zero network requirement.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LexiconEntry, getAllConcordanceEntries } from '../data/lexiconData';
import {
  isStrongsDbSeeded,
  seedStrongsDatabase,
  getStrongsDb,
  queryStrongsFromDb,
} from './strongsDatabase';

const OFFLINE_DICT_META_KEY = '@strongs_offline_dictionary_meta_v1';
const SEED_FLAG_KEY = '@strongs_sqlite_seeded_v1';

export interface OfflineDictionaryMeta {
  isDownloaded: boolean;
  downloadedAt: number;
  entriesCount: number;
  sizeBytes: number;
  sizeFormatted: string;
  version: string;
}

/**
 * Check if the offline Strong's dictionary is downloaded and ready locally
 */
export async function getOfflineDictionaryStatus(): Promise<OfflineDictionaryMeta | null> {
  try {
    const raw = await AsyncStorage.getItem(OFFLINE_DICT_META_KEY);
    const isSeeded = await isStrongsDbSeeded();

    if (!raw && !isSeeded) return null;

    if (raw) {
      const meta = JSON.parse(raw) as OfflineDictionaryMeta;
      return { ...meta, isDownloaded: isSeeded || meta.isDownloaded };
    }

    if (isSeeded) {
      return {
        isDownloaded: true,
        downloadedAt: Date.now(),
        entriesCount: 14298,
        sizeBytes: 9646000,
        sizeFormatted: '9.2 MB',
        version: '1.0.4',
      };
    }

    return null;
  } catch (error) {
    console.warn('Error reading offline dictionary status:', error);
    return null;
  }
}

/**
 * Downloads and caches the complete unified A-to-Z Strong's Biblical Dictionary
 * into the on-device SQLite database.
 */
export async function downloadOfflineDictionary(
  onProgress?: (progress: number) => void
): Promise<OfflineDictionaryMeta> {
  // 1. Seed SQLite database with high-performance batch transactions
  await seedStrongsDatabase(onProgress);

  const sizeFormatted = '9.2 MB';

  // 2. Persist download metadata safely
  const meta: OfflineDictionaryMeta = {
    isDownloaded: true,
    downloadedAt: Date.now(),
    entriesCount: 14298,
    sizeBytes: 9646000,
    sizeFormatted,
    version: '1.0.4',
  };

  await AsyncStorage.setItem(OFFLINE_DICT_META_KEY, JSON.stringify(meta));
  await AsyncStorage.setItem(SEED_FLAG_KEY, 'true');

  if (onProgress) onProgress(1.0);
  return meta;
}

/**
 * Delete downloaded offline dictionary from persistent local SQLite database
 */
export async function deleteOfflineDictionary(): Promise<void> {
  try {
    const db = await getStrongsDb();
    await db.execAsync('DELETE FROM strongs_entries;');
    await AsyncStorage.removeItem(OFFLINE_DICT_META_KEY);
    await AsyncStorage.removeItem(SEED_FLAG_KEY);
  } catch (error) {
    console.warn('Error removing offline dictionary from SQLite:', error);
  }
}

/**
 * Retrieve offline entries from local SQLite storage (or fallback to prebundled entries)
 */
export async function getOfflineEntries(): Promise<LexiconEntry[]> {
  try {
    const isSeeded = await isStrongsDbSeeded();
    if (isSeeded) {
      const dbEntries = await queryStrongsFromDb({ limit: 14500 });
      if (dbEntries.length > 0) return dbEntries;
    }
  } catch {
    // Fall back to memory
  }
  return getAllConcordanceEntries();
}
