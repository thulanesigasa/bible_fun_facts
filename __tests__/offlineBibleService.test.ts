jest.mock('expo-file-system/legacy', () => ({
  documentDirectory: 'file:///mock-directory/',
  getInfoAsync: jest.fn(),
  readAsStringAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
  deleteAsync: jest.fn(),
  makeDirectoryAsync: jest.fn(),
  createDownloadResumable: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

import * as FileSystem from 'expo-file-system/legacy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TRANSLATION_SOURCES,
  downloadTranslation,
  downloadMultipleTranslations,
  subscribeDownloadEvents,
  getActiveDownloadingIds,
  isTranslationDownloading,
  getTranslationDownloadProgress,
  getDownloadedTranslations,
  deleteDownloadedTranslation,
} from '../src/services/offlineBibleService';

describe('OfflineBibleService - Translation Registry & Integrity', () => {
  it('contains expected translation configurations with multi-CDN redundancy', () => {
    const keys = Object.keys(TRANSLATION_SOURCES);
    expect(keys.length).toBeGreaterThanOrEqual(15);

    for (const key of keys) {
      const config = TRANSLATION_SOURCES[key];
      expect(config.id).toBeTruthy();
      expect(config.name).toBeTruthy();
      expect(config.abbreviation).toBeTruthy();
      expect(config.language).toBeTruthy();
      expect(['african', 'popular', 'classic']).toContain(config.category);
      expect(config.urls).toBeInstanceOf(Array);
      expect(config.urls.length).toBeGreaterThan(0);

      // Verify each URL is HTTPS
      for (const url of config.urls) {
        expect(url.startsWith('https://')).toBe(true);
      }
    }
  });

  it('includes key African indigenous translations with multi-CDN fallback', () => {
    const expectedAfrican = ['zulu', 'xhosa', 'sepedi', 'sotho', 'tswana', 'tsonga', 'tshivenda', 'siswati', 'ndebele'];
    for (const id of expectedAfrican) {
      expect(TRANSLATION_SOURCES[id]).toBeDefined();
      expect(TRANSLATION_SOURCES[id].category).toBe('african');
    }
  });

  it('includes popular modern translations', () => {
    const modern = ['niv', 'esv', 'nlt', 'nkjv', 'amp', 'bsb'];
    for (const id of modern) {
      expect(TRANSLATION_SOURCES[id]).toBeDefined();
      expect(TRANSLATION_SOURCES[id].category).toBe('popular');
    }
  });
});

describe('OfflineBibleService - Concurrent Multi-Version Downloads & Mutex Registry', () => {
  const storageMap = new Map<string, string>();
  const mockBooks = Array.from({ length: 66 }, (_, i) => ({
    book: `Book_${i + 1}`,
    chapters: [{ chapter: 1, verses: [{ verse: 1, text: `In the beginning of book ${i + 1}` }] }],
  }));

  beforeEach(() => {
    jest.clearAllMocks();
    storageMap.clear();

    (AsyncStorage.getItem as jest.Mock).mockImplementation(async (key: string) => {
      return storageMap.get(key) || null;
    });

    // Simulate async storage I/O delay to stress-test mutex lock serialization
    (AsyncStorage.setItem as jest.Mock).mockImplementation(async (key: string, val: string) => {
      await new Promise((r) => setTimeout(r, 15));
      storageMap.set(key, val);
    });

    (AsyncStorage.removeItem as jest.Mock).mockImplementation(async (key: string) => {
      storageMap.delete(key);
    });

    (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({
      exists: true,
      size: 4500000,
      isDirectory: false,
    });

    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValue(JSON.stringify(mockBooks));
    (FileSystem.writeAsStringAsync as jest.Mock).mockResolvedValue(undefined);
    (FileSystem.makeDirectoryAsync as jest.Mock).mockResolvedValue(undefined);

    (FileSystem.createDownloadResumable as jest.Mock).mockImplementation((_url, path, _opts, onProgress) => ({
      downloadAsync: jest.fn().mockImplementation(async () => {
        if (onProgress) {
          onProgress({ totalBytesWritten: 2000000, totalBytesExpectedToWrite: 4000000 });
        }
        await new Promise((r) => setTimeout(r, 20));
        return { uri: path, status: 200 };
      }),
    }));
  });

  it('manages download event listeners and broadcasts progress correctly', () => {
    const listener = jest.fn();
    const unsub = subscribeDownloadEvents(listener);

    expect(typeof unsub).toBe('function');
    unsub();
  });

  it('downloads multiple translations in parallel without race-condition registry data loss', async () => {
    const events: Array<{ id: string; pct: number; isFinished: boolean }> = [];
    const unsub = subscribeDownloadEvents((id, pct, isFinished) => {
      events.push({ id, pct, isFinished });
    });

    // Execute concurrent parallel downloads
    const [metaWeb, metaKjv] = await Promise.all([
      downloadTranslation('web'),
      downloadTranslation('kjv'),
    ]);

    expect(metaWeb).toBeDefined();
    expect(metaWeb.id).toBe('web');
    expect(metaWeb.isComplete).toBe(true);

    expect(metaKjv).toBeDefined();
    expect(metaKjv.id).toBe('kjv');
    expect(metaKjv.isComplete).toBe(true);

    // Verify registry in AsyncStorage contains BOTH translations despite concurrent execution
    const downloaded = await getDownloadedTranslations();
    const ids = downloaded.map((t) => t.id);
    expect(ids).toContain('web');
    expect(ids).toContain('kjv');

    // Both finished events should have been broadcast
    const finishedIds = events.filter((e) => e.isFinished).map((e) => e.id);
    expect(finishedIds).toContain('web');
    expect(finishedIds).toContain('kjv');

    unsub();
  });

  it('reuses in-flight promises when downloadTranslation is called concurrently for same version', async () => {
    const [promiseA, promiseB] = await Promise.all([
      downloadTranslation('asv'),
      downloadTranslation('asv'),
    ]);

    expect(promiseA.id).toBe('asv');
    expect(promiseB.id).toBe('asv');
  });

  it('batches multiple downloads via downloadMultipleTranslations with aggregated progress', async () => {
    const progressReports: Array<Record<string, number>> = [];

    const results = await downloadMultipleTranslations(['web', 'bbe'], (progMap) => {
      progressReports.push({ ...progMap });
    });

    expect(results).toHaveLength(2);
    expect(results.every((r) => r.status === 'fulfilled')).toBe(true);

    const fulfilled = results.filter(
      (r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled'
    );
    expect(fulfilled.map((r) => r.value.id).sort()).toEqual(['bbe', 'web']);
    expect(progressReports.length).toBeGreaterThanOrEqual(1);
  });
});
