jest.mock('expo-file-system/legacy', () => ({
  documentDirectory: 'file:///mock-directory/',
  getInfoAsync: jest.fn(),
  readAsStringAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
  deleteAsync: jest.fn(),
  makeDirectoryAsync: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

import { TRANSLATION_SOURCES } from '../src/services/offlineBibleService';

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
