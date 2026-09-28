/**
 * Offline Strong's Biblical Dictionary Service
 *
 * Provides persistent local caching and download capabilities for the complete
 * A-to-Z Strong's Biblical Concordance and Lexicon, ensuring 100% offline study
 * with zero network requirement.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LexiconEntry, getAllConcordanceEntries } from '../data/lexiconData';

const OFFLINE_DICT_META_KEY = '@strongs_offline_dictionary_meta_v1';
const OFFLINE_DICT_DATA_KEY = '@strongs_offline_dictionary_data_v1';

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
    if (!raw) return null;
    return JSON.parse(raw) as OfflineDictionaryMeta;
  } catch (error) {
    console.warn('Error reading offline dictionary status:', error);
    return null;
  }
}

/**
 * Downloads and caches the complete unified A-to-Z Strong's Biblical Dictionary to persistent storage
 */
export async function downloadOfflineDictionary(
  onProgress?: (progress: number) => void
): Promise<OfflineDictionaryMeta> {
  if (onProgress) onProgress(0.2);

  // 1. Gather all canonical entries
  const allEntries = getAllConcordanceEntries();
  if (onProgress) onProgress(0.5);

  // 2. Serialize entries
  const serialized = JSON.stringify(allEntries);
  const sizeBytes = new Blob ? new Blob([serialized]).size : serialized.length;
  const sizeMb = (sizeBytes / (1024 * 1024)).toFixed(1);
  const sizeFormatted = `${sizeMb} MB`;

  if (onProgress) onProgress(0.7);

  // 3. Save to local storage
  await AsyncStorage.setItem(OFFLINE_DICT_DATA_KEY, serialized);

  const meta: OfflineDictionaryMeta = {
    isDownloaded: true,
    downloadedAt: Date.now(),
    entriesCount: allEntries.length,
    sizeBytes,
    sizeFormatted,
    version: '1.0.0',
  };

  await AsyncStorage.setItem(OFFLINE_DICT_META_KEY, JSON.stringify(meta));
  if (onProgress) onProgress(1.0);

  return meta;
}

/**
 * Delete downloaded offline dictionary from persistent local storage
 */
export async function deleteOfflineDictionary(): Promise<void> {
  try {
    await AsyncStorage.removeItem(OFFLINE_DICT_DATA_KEY);
    await AsyncStorage.removeItem(OFFLINE_DICT_META_KEY);
  } catch (error) {
    console.warn('Error removing offline dictionary:', error);
  }
}

/**
 * Retrieve offline entries from local storage (or fallback to prebundled entries)
 */
export async function getOfflineEntries(): Promise<LexiconEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(OFFLINE_DICT_DATA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Error reading cached offline entries:', error);
  }
  // Fallback to in-memory bundled entries
  return getAllConcordanceEntries();
}
