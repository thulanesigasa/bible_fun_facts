/**
 * Domain-Focused Reader Settings Context
 *
 * Manages Bible reading preferences, typography, red-letter toggle,
 * theme options (light/sepia/dark), and scripture highlights.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LastReadBiblePosition {
  book: string;
  chapter: number;
  translation: string;
}

export type ReaderTheme = 'light' | 'sepia' | 'dark';
export type FontType = 'serif' | 'sans' | 'mono' | 'system';

interface ReaderSettingsContextType {
  fontSize: number;
  setFontSize: (size: number) => void;
  fontType: FontType;
  setFontType: (type: FontType) => void;
  redLetterEnabled: boolean;
  setRedLetterEnabled: (enabled: boolean) => void;
  readerTheme: ReaderTheme;
  setReaderTheme: (theme: ReaderTheme) => void;
  preferredTranslation: string;
  setPreferredTranslation: (trans: string) => void;
  lastReadBible: LastReadBiblePosition;
  setLastReadBible: (pos: LastReadBiblePosition) => void;
  bibleHighlights: Record<string, string>;
  setHighlight: (verseKey: string, color: string) => void;
  removeHighlight: (verseKey: string) => void;
}

const ReaderSettingsContext = createContext<ReaderSettingsContextType | undefined>(undefined);

const READER_SETTINGS_KEY = '@reader_settings_v1';
const HIGHLIGHTS_KEY = '@bible_highlights_v1';
const LAST_READ_KEY = '@last_read_bible_v1';

export const ReaderSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<number>(18);
  const [fontType, setFontTypeState] = useState<FontType>('serif');
  const [redLetterEnabled, setRedLetterEnabledState] = useState<boolean>(true);
  const [readerTheme, setReaderThemeState] = useState<ReaderTheme>('light');
  const [preferredTranslation, setPreferredTranslationState] = useState<string>('kjv');
  const [lastReadBible, setLastReadBibleState] = useState<LastReadBiblePosition>({
    book: 'Genesis',
    chapter: 1,
    translation: 'kjv',
  });
  const [bibleHighlights, setBibleHighlightsState] = useState<Record<string, string>>({});

  // Restore settings on boot
  useEffect(() => {
    async function restoreSettings() {
      try {
        const [settingsRaw, highlightsRaw, lastReadRaw] = await Promise.all([
          AsyncStorage.getItem(READER_SETTINGS_KEY),
          AsyncStorage.getItem(HIGHLIGHTS_KEY),
          AsyncStorage.getItem(LAST_READ_KEY),
        ]);

        if (settingsRaw) {
          const s = JSON.parse(settingsRaw);
          if (s.fontSize) setFontSizeState(s.fontSize);
          if (s.fontType) setFontTypeState(s.fontType);
          if (s.redLetterEnabled !== undefined) setRedLetterEnabledState(s.redLetterEnabled);
          if (s.readerTheme) setReaderThemeState(s.readerTheme);
          if (s.preferredTranslation) setPreferredTranslationState(s.preferredTranslation);
        }

        if (highlightsRaw) {
          setBibleHighlightsState(JSON.parse(highlightsRaw));
        }

        if (lastReadRaw) {
          setLastReadBibleState(JSON.parse(lastReadRaw));
        }
      } catch (err) {
        console.warn('[ReaderSettingsContext] Failed to restore settings:', err);
      }
    }
    restoreSettings();
  }, []);

  const persistSettings = useCallback(async (overrides: Record<string, any>) => {
    try {
      const current = await AsyncStorage.getItem(READER_SETTINGS_KEY);
      const parsed = current ? JSON.parse(current) : {};
      await AsyncStorage.setItem(READER_SETTINGS_KEY, JSON.stringify({ ...parsed, ...overrides }));
    } catch {
      // Non-blocking
    }
  }, []);

  const setFontSize = useCallback((size: number) => {
    setFontSizeState(size);
    persistSettings({ fontSize: size });
  }, [persistSettings]);

  const setFontType = useCallback((type: FontType) => {
    setFontTypeState(type);
    persistSettings({ fontType: type });
  }, [persistSettings]);

  const setRedLetterEnabled = useCallback((enabled: boolean) => {
    setRedLetterEnabledState(enabled);
    persistSettings({ redLetterEnabled: enabled });
  }, [persistSettings]);

  const setReaderTheme = useCallback((theme: ReaderTheme) => {
    setReaderThemeState(theme);
    persistSettings({ readerTheme: theme });
  }, [persistSettings]);

  const setPreferredTranslation = useCallback((trans: string) => {
    setPreferredTranslationState(trans);
    persistSettings({ preferredTranslation: trans });
  }, [persistSettings]);

  const setLastReadBible = useCallback((pos: LastReadBiblePosition) => {
    setLastReadBibleState(pos);
    AsyncStorage.setItem(LAST_READ_KEY, JSON.stringify(pos)).catch(() => {});
  }, []);

  const setHighlight = useCallback((verseKey: string, color: string) => {
    setBibleHighlightsState((prev) => {
      const updated = { ...prev, [verseKey]: color };
      AsyncStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const removeHighlight = useCallback((verseKey: string) => {
    setBibleHighlightsState((prev) => {
      const updated = { ...prev };
      delete updated[verseKey];
      AsyncStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  return (
    <ReaderSettingsContext.Provider
      value={{
        fontSize,
        setFontSize,
        fontType,
        setFontType,
        redLetterEnabled,
        setRedLetterEnabled,
        readerTheme,
        setReaderTheme,
        preferredTranslation,
        setPreferredTranslation,
        lastReadBible,
        setLastReadBible,
        bibleHighlights,
        setHighlight,
        removeHighlight,
      }}
    >
      {children}
    </ReaderSettingsContext.Provider>
  );
};

export function useReaderSettings(): ReaderSettingsContextType {
  const context = useContext(ReaderSettingsContext);
  if (!context) {
    throw new Error('useReaderSettings must be used within a ReaderSettingsProvider');
  }
  return context;
}

export default ReaderSettingsContext;
