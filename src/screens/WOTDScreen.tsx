import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  ActivityIndicator,
  Modal,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { wotd, LENS_TABS, Scripture } from '../data/mockDatabase';
import { useUser } from '../context/UserContext';
import { BIBLE_BOOKS, BibleBook, BibleChapterData, BibleVerse } from '../data/bibleCanon';
import { fetchChapter } from '../services/bibleService';
import {
  OriginalIntentSvg,
  TheologicalTruthSvg,
  ModernWalkSvg,
  PrayerFocusSvg,
  CheckSvg,
  ShareSvg,
  WotdSvg,
  CalendarSvg,
  BookOpenSvg,
  ChevronDownSvg,
  CopySvg,
  FavoritesSvg,
  XCloseSvg,
  SearchSvg,
} from '../components/SvgIcons';

type LensKey = 'original_intent' | 'theological_truth' | 'modern_walk' | 'prayer_focus';
type ActiveTab = 'bible' | 'exegesis';
type BibleTranslation = 'web' | 'kjv' | 'bbe';

const getLensIcon = (key: LensKey, color: string) => {
  const size = 18;
  switch (key) {
    case 'original_intent':
      return <OriginalIntentSvg size={size} color={color} />;
    case 'theological_truth':
      return <TheologicalTruthSvg size={size} color={color} />;
    case 'modern_walk':
      return <ModernWalkSvg size={size} color={color} />;
    case 'prayer_focus':
      return <PrayerFocusSvg size={size} color={color} />;
  }
};

const getFontFamily = (fontType?: 'serif' | 'sans' | 'mono' | 'system') => {
  switch (fontType) {
    case 'serif':
      return Platform.OS === 'ios' ? 'Georgia' : 'serif';
    case 'sans':
      return Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif';
    case 'mono':
      return Platform.OS === 'ios' ? 'Courier New' : 'monospace';
    default:
      return undefined;
  }
};

export default function WOTDScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bible');
  const [activeLens, setActiveLens] = useState<LensKey>('original_intent');
  
  // User context
  const {
    markWOTDComplete,
    isWOTDCompleted,
    userProfile,
    lastReadBible,
    setLastReadBible,
    toggleFavoriteScripture,
    isScriptureFavorited,
  } = useUser();

  // Bible Reader State
  const initialBook = useMemo(() => {
    return BIBLE_BOOKS.find((b) => b.name.toLowerCase() === lastReadBible.book.toLowerCase()) || BIBLE_BOOKS[42]; // Default: John
  }, [lastReadBible.book]);

  const [selectedBook, setSelectedBook] = useState<BibleBook>(initialBook);
  const [selectedChapter, setSelectedChapter] = useState<number>(lastReadBible.chapter || 1);
  const [translation, setTranslation] = useState<BibleTranslation>(
    (lastReadBible.translation as BibleTranslation) || 'web'
  );
  const [chapterData, setChapterData] = useState<BibleChapterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modal selector state
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectorTestament, setSelectorTestament] = useState<'OT' | 'NT'>('NT');
  const [bookSearchText, setBookSearchText] = useState('');
  const [browsingBookForChapters, setBrowsingBookForChapters] = useState<BibleBook | null>(null);

  // Verse action modal
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);

  // Fetch chapter logic
  const loadCurrentChapter = useCallback(async (bookName: string, chapterNum: number, trans: BibleTranslation) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await fetchChapter(bookName, chapterNum, trans);
      setChapterData(data);
      setLastReadBible(bookName, chapterNum, trans);
    } catch (err: any) {
      setErrorMsg('Unable to load chapter. Please verify your connection or choose another translation.');
    } finally {
      setLoading(false);
    }
  }, [setLastReadBible]);

  useEffect(() => {
    loadCurrentChapter(selectedBook.name, selectedChapter, translation);
  }, [selectedBook.name, selectedChapter, translation, loadCurrentChapter]);

  // Navigate to previous / next chapter
  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter((prev) => prev - 1);
    } else {
      const currentIndex = BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id);
      if (currentIndex > 0) {
        const prevBook = BIBLE_BOOKS[currentIndex - 1];
        setSelectedBook(prevBook);
        setSelectedChapter(prevBook.chaptersCount);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < selectedBook.chaptersCount) {
      setSelectedChapter((prev) => prev + 1);
    } else {
      const currentIndex = BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id);
      if (currentIndex < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[currentIndex + 1];
        setSelectedBook(nextBook);
        setSelectedChapter(1);
      }
    }
  };

  const toggleTranslation = () => {
    const nextTrans: BibleTranslation = translation === 'web' ? 'kjv' : 'web';
    setTranslation(nextTrans);
  };

  // Exegesis share
  const onShareExegesis = async () => {
    try {
      const message = `${wotd.verse}\n- ${wotd.reference}\n\nOriginal Intent:\n${wotd.original_intent}\n\nTheological Truth:\n${wotd.theological_truth}\n\nModern Walk:\n${wotd.modern_walk}\n\nPrayer Focus:\n${wotd.prayer_focus}`;
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  // Verse actions
  const onShareVerse = async (verse: BibleVerse) => {
    try {
      const ref = `${selectedBook.name} ${selectedChapter}:${verse.verse} (${translation.toUpperCase()})`;
      const message = `"${verse.text.trim()}"\n- ${ref}`;
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  const onCopyVerse = (verse: BibleVerse) => {
    const ref = `${selectedBook.name} ${selectedChapter}:${verse.verse} (${translation.toUpperCase()})`;
    const textToCopy = `"${verse.text.trim()}" - ${ref}`;
    Alert.alert('Verse Copied', textToCopy);
  };

  const onToggleFavoriteVerse = (verse: BibleVerse) => {
    const ref = `${selectedBook.name} ${selectedChapter}:${verse.verse}`;
    const scriptureObj: Scripture = {
      id: `bible_${selectedBook.id}_${selectedChapter}_${verse.verse}`,
      reference: ref,
      text: verse.text.trim(),
      testament: selectedBook.testament,
      book: selectedBook.name,
      chapter: selectedChapter,
      verse_range: `${verse.verse}`,
      genre: selectedBook.category,
      historical_context: `Scripture passage from ${selectedBook.name} chapter ${selectedChapter}.`,
      cultural_practice: 'Sacred biblical canon preservation.',
      strongs_word: selectedBook.name,
      strongs_transliteration: selectedBook.name,
      strongs_definition: 'Sacred Scripture Canon',
      strongs_number: 'N/A',
    };
    toggleFavoriteScripture(scriptureObj);
  };

  const isCurrentVerseFavorited = (verse: BibleVerse) => {
    return isScriptureFavorited(`bible_${selectedBook.id}_${selectedChapter}_${verse.verse}`);
  };

  // Book filtering for selector modal
  const filteredBooks = useMemo(() => {
    return BIBLE_BOOKS.filter((b) => {
      const matchesTestament =
        selectorTestament === 'OT' ? b.testament === 'Old Testament' : b.testament === 'New Testament';
      const matchesSearch =
        bookSearchText === '' ||
        b.name.toLowerCase().includes(bookSearchText.toLowerCase()) ||
        b.category.toLowerCase().includes(bookSearchText.toLowerCase());
      return matchesTestament && matchesSearch;
    });
  }, [selectorTestament, bookSearchText]);

  const customFontSize = userProfile?.fontSize || 16;
  const customFontFamily = getFontFamily(userProfile?.fontType);

  const completed = isWOTDCompleted(wotd.id);

  const getLensContent = () => {
    switch (activeLens) {
      case 'original_intent':
        return wotd.original_intent;
      case 'theological_truth':
        return wotd.theological_truth;
      case 'modern_walk':
        return wotd.modern_walk;
      case 'prayer_focus':
        return wotd.prayer_focus;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      {/* Top Segmented Navigation: Holy Bible vs Daily Exegesis */}
      <View style={styles.topSegmentContainer}>
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'bible' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('bible')}
            activeOpacity={0.8}
          >
            <BookOpenSvg size={16} color={activeTab === 'bible' ? colors.accent : colors.textSecondary} />
            <Text
              variant="caption"
              weight={activeTab === 'bible' ? '700' : '600'}
              style={[styles.segmentText, activeTab === 'bible' && styles.segmentTextActive]}
            >
              Holy Bible
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'exegesis' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('exegesis')}
            activeOpacity={0.8}
          >
            <WotdSvg size={16} color={activeTab === 'exegesis' ? colors.accent : colors.textSecondary} />
            <Text
              variant="caption"
              weight={activeTab === 'exegesis' ? '700' : '600'}
              style={[styles.segmentText, activeTab === 'exegesis' && styles.segmentTextActive]}
            >
              Daily Exegesis
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* VIEW 1: FULL HOLY BIBLE READER */}
      {activeTab === 'bible' ? (
        <View style={styles.bibleContainer}>
          {/* Reader Subheader Bar */}
          <View style={[styles.readerHeaderBar, shadow.sm]}>
            <TouchableOpacity
              style={styles.bookSelectorButton}
              onPress={() => {
                setBrowsingBookForChapters(selectedBook);
                setIsSelectorOpen(true);
              }}
              activeOpacity={0.7}
            >
              <View style={styles.bookSelectorIcon}>
                <BookOpenSvg size={18} color={colors.accent} />
              </View>
              <View style={styles.bookSelectorTextWrap}>
                <Text variant="h3" style={styles.bookSelectorTitle}>
                  {selectedBook.name} {selectedChapter}
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  {selectedBook.testament} • {selectedBook.category}
                </Text>
              </View>
              <ChevronDownSvg size={18} color={colors.accent} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.translationBadge}
              onPress={toggleTranslation}
              activeOpacity={0.7}
            >
              <Text variant="caption" weight="700" style={styles.translationText}>
                {translation.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Chapter Content Stream */}
          <ScrollView
            style={styles.bibleScrollView}
            contentContainerStyle={styles.bibleScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header info */}
            <View style={styles.chapterHeader}>
              <Text variant="h1" style={styles.chapterMainTitle}>
                {selectedBook.name}
              </Text>
              <Text variant="h3" color={colors.accent} style={styles.chapterNumberLabel}>
                Chapter {selectedChapter}
              </Text>
              <Text variant="caption" color={colors.textTertiary} style={styles.chapterTranslationMeta}>
                {translation === 'web' ? 'World English Bible (Public Domain)' : 'King James Version (KJV)'}
              </Text>
            </View>

            {loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.accent} />
                <Text variant="body" color={colors.textSecondary} style={{ marginTop: spacing.md }}>
                  Loading {selectedBook.name} {selectedChapter}...
                </Text>
              </View>
            ) : errorMsg ? (
              <View style={styles.errorContainer}>
                <Text variant="body" color={colors.textSecondary} style={styles.errorText}>
                  {errorMsg}
                </Text>
                <TouchableOpacity
                  style={styles.retryBtn}
                  onPress={() => loadCurrentChapter(selectedBook.name, selectedChapter, translation)}
                >
                  <Text variant="caption" weight="700" color="#FFFFFF">Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.versesWrapper}>
                {chapterData?.verses.map((v: BibleVerse) => {
                  const isFavorited = isCurrentVerseFavorited(v);
                  return (
                    <TouchableOpacity
                      key={v.verse}
                      activeOpacity={0.7}
                      onPress={() => setSelectedVerse(v)}
                      style={[
                        styles.verseRow,
                        selectedVerse?.verse === v.verse && styles.verseRowHighlight,
                      ]}
                    >
                      <Text variant="label" style={styles.verseNumberBadge}>
                        {v.verse}
                      </Text>
                      <Text
                        style={[
                          styles.verseBodyText,
                          {
                            fontSize: customFontSize,
                            fontFamily: customFontFamily,
                            lineHeight: Math.max(customFontSize * 1.55, 20),
                          },
                        ]}
                      >
                        {v.text.trim()}
                      </Text>
                      {isFavorited && (
                        <View style={styles.verseFavIndicator}>
                          <FavoritesSvg size={12} color={colors.accent} fill={colors.accent} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* Chapter Navigation Footer */}
            <View style={styles.chapterNavFooter}>
              <TouchableOpacity
                style={[
                  styles.navBtn,
                  selectedBook.id === 'GEN' && selectedChapter === 1 && styles.navBtnDisabled,
                ]}
                onPress={handlePrevChapter}
                disabled={selectedBook.id === 'GEN' && selectedChapter === 1}
                activeOpacity={0.8}
              >
                <Text
                  variant="body"
                  weight="600"
                  color={selectedBook.id === 'GEN' && selectedChapter === 1 ? colors.textTertiary : colors.accent}
                >
                  ‹ Prev Chapter
                </Text>
              </TouchableOpacity>

              <View style={styles.navProgress}>
                <Text variant="caption" color={colors.textSecondary}>
                  {selectedChapter} of {selectedBook.chaptersCount}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.navBtn,
                  selectedBook.id === 'REV' && selectedChapter === selectedBook.chaptersCount && styles.navBtnDisabled,
                ]}
                onPress={handleNextChapter}
                disabled={selectedBook.id === 'REV' && selectedChapter === selectedBook.chaptersCount}
                activeOpacity={0.8}
              >
                <Text
                  variant="body"
                  weight="600"
                  color={
                    selectedBook.id === 'REV' && selectedChapter === selectedBook.chaptersCount
                      ? colors.textTertiary
                      : colors.accent
                  }
                >
                  Next Chapter ›
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Book / Chapter Selector Modal */}
          <Modal
            visible={isSelectorOpen}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setIsSelectorOpen(false)}
          >
            <SafeAreaView style={styles.modalSafeArea}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderLeft}>
                  <BookOpenSvg size={22} color={colors.accent} />
                  <Text variant="h2" style={styles.modalTitle}>
                    {browsingBookForChapters ? browsingBookForChapters.name : 'Select Scripture'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => {
                    setBrowsingBookForChapters(null);
                    setIsSelectorOpen(false);
                  }}
                >
                  <XCloseSvg size={22} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {browsingBookForChapters ? (
                /* Chapter grid selection for chosen book */
                <View style={styles.chapterSelectionContainer}>
                  <View style={styles.chapterSelectionTopRow}>
                    <TouchableOpacity
                      onPress={() => setBrowsingBookForChapters(null)}
                      style={styles.backToBooksBtn}
                    >
                      <Text variant="caption" weight="700" color={colors.accent}>
                        ‹ All Books
                      </Text>
                    </TouchableOpacity>
                    <Text variant="body" color={colors.textSecondary}>
                      {browsingBookForChapters.chaptersCount} Chapters
                    </Text>
                  </View>

                  <ScrollView contentContainerStyle={styles.chapterGrid} showsVerticalScrollIndicator={false}>
                    {Array.from({ length: browsingBookForChapters.chaptersCount }, (_, i) => i + 1).map((ch) => {
                      const isCurrent =
                        selectedBook.id === browsingBookForChapters.id && selectedChapter === ch;
                      return (
                        <TouchableOpacity
                          key={ch}
                          style={[styles.chapterTile, isCurrent && styles.chapterTileActive]}
                          onPress={() => {
                            setSelectedBook(browsingBookForChapters);
                            setSelectedChapter(ch);
                            setBrowsingBookForChapters(null);
                            setIsSelectorOpen(false);
                          }}
                          activeOpacity={0.7}
                        >
                          <Text
                            variant="body"
                            weight={isCurrent ? '700' : '500'}
                            style={[styles.chapterTileText, isCurrent && styles.chapterTileTextActive]}
                          >
                            {ch}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : (
                /* Books list view with Old/New Testament tabs */
                <View style={styles.booksSelectionContainer}>
                  {/* Search bar */}
                  <View style={[styles.bookSearchBox, shadow.sm]}>
                    <SearchSvg size={16} color={colors.accent} />
                    <TextInput
                      style={styles.bookSearchInput}
                      placeholder="Search book or category..."
                      placeholderTextColor={colors.textTertiary}
                      value={bookSearchText}
                      onChangeText={setBookSearchText}
                      clearButtonMode="while-editing"
                    />
                  </View>

                  {/* Testament segmented tabs */}
                  <View style={styles.testamentTabRow}>
                    <TouchableOpacity
                      style={[styles.testamentTab, selectorTestament === 'OT' && styles.testamentTabActive]}
                      onPress={() => setSelectorTestament('OT')}
                    >
                      <Text
                        variant="caption"
                        weight={selectorTestament === 'OT' ? '700' : '500'}
                        style={[styles.testamentTabText, selectorTestament === 'OT' && styles.testamentTabTextActive]}
                      >
                        Old Testament (39)
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.testamentTab, selectorTestament === 'NT' && styles.testamentTabActive]}
                      onPress={() => setSelectorTestament('NT')}
                    >
                      <Text
                        variant="caption"
                        weight={selectorTestament === 'NT' ? '700' : '500'}
                        style={[styles.testamentTabText, selectorTestament === 'NT' && styles.testamentTabTextActive]}
                      >
                        New Testament (27)
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <ScrollView
                    contentContainerStyle={styles.booksListContainer}
                    showsVerticalScrollIndicator={false}
                  >
                    {filteredBooks.map((book) => {
                      const isSelected = selectedBook.id === book.id;
                      return (
                        <TouchableOpacity
                          key={book.id}
                          style={[styles.bookRowItem, isSelected && styles.bookRowItemActive]}
                          onPress={() => setBrowsingBookForChapters(book)}
                          activeOpacity={0.7}
                        >
                          <View style={styles.bookRowMain}>
                            <Text
                              variant="body"
                              weight={isSelected ? '700' : '600'}
                              style={[styles.bookRowName, isSelected && styles.bookRowNameActive]}
                            >
                              {book.name}
                            </Text>
                            <Text variant="caption" color={colors.textTertiary}>
                              {book.category}
                            </Text>
                          </View>
                          <View style={styles.bookRowRight}>
                            <Text variant="caption" color={colors.textSecondary} style={{ marginRight: 6 }}>
                              {book.chaptersCount} ch
                            </Text>
                            <ChevronDownSvg size={14} color={colors.accent} style={{ transform: [{ rotate: '-9deg' }] }} />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </SafeAreaView>
          </Modal>

          {/* Verse Tap Action Bottom Sheet Modal */}
          <Modal
            visible={!!selectedVerse}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setSelectedVerse(null)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setSelectedVerse(null)}
            >
              <View style={[styles.verseActionCard, shadow.md]}>
                <View style={styles.verseActionHeader}>
                  <View>
                    <Text variant="h3" color={colors.accent}>
                      {selectedBook.name} {selectedChapter}:{selectedVerse?.verse}
                    </Text>
                    <Text variant="caption" color={colors.textTertiary}>
                      {translation.toUpperCase()} Translation
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedVerse(null)} style={styles.closeVerseActionBtn}>
                    <XCloseSvg size={18} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>

                <Text
                  variant="body"
                  color={colors.textPrimary}
                  style={styles.verseActionSnippet}
                  numberOfLines={4}
                >
                  "{selectedVerse?.text.trim()}"
                </Text>

                <View style={styles.verseActionButtonsRow}>
                  {/* Copy */}
                  <TouchableOpacity
                    style={styles.verseActionBtn}
                    onPress={() => {
                      if (selectedVerse) onCopyVerse(selectedVerse);
                    }}
                  >
                    <CopySvg size={18} color={colors.accent} />
                    <Text variant="caption" weight="600" color={colors.textPrimary}>
                      Copy
                    </Text>
                  </TouchableOpacity>

                  {/* Favorite */}
                  <TouchableOpacity
                    style={styles.verseActionBtn}
                    onPress={() => {
                      if (selectedVerse) onToggleFavoriteVerse(selectedVerse);
                    }}
                  >
                    <FavoritesSvg
                      size={18}
                      color={colors.accent}
                      fill={selectedVerse && isCurrentVerseFavorited(selectedVerse) ? colors.accent : 'none'}
                    />
                    <Text variant="caption" weight="600" color={colors.textPrimary}>
                      {selectedVerse && isCurrentVerseFavorited(selectedVerse) ? 'Saved' : 'Favorite'}
                    </Text>
                  </TouchableOpacity>

                  {/* Share */}
                  <TouchableOpacity
                    style={styles.verseActionBtn}
                    onPress={() => {
                      if (selectedVerse) {
                        onShareVerse(selectedVerse);
                        setSelectedVerse(null);
                      }
                    }}
                  >
                    <ShareSvg size={18} color={colors.accent} />
                    <Text variant="caption" weight="600" color={colors.textPrimary}>
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      ) : (
        /* VIEW 2: DAILY EXEGESIS */
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <WotdSvg size={24} color={colors.accent} fill={colors.accentSoft} />
              <Text variant="h2" style={styles.titleText}>Daily Word & Exegesis</Text>
            </View>
            <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
              Deepen your understanding across 4 distinct analytical perspectives
            </Text>
          </View>

          {/* Verse Highlight Card */}
          <Card style={styles.verseCard}>
            <View style={styles.metaRow}>
              <CalendarSvg size={14} color={colors.accent} />
              <Text variant="label" color={colors.accent} style={styles.metaLabel}>DAILY SCRIPTURE</Text>
            </View>

            <View style={styles.quoteWrapper}>
              <Text variant="h2" style={styles.verseText}>
                "{wotd.verse}"
              </Text>
            </View>

            <Text variant="h3" style={styles.verseRef}>{wotd.reference}</Text>
          </Card>

          {/* Lens Selection Tabs */}
          <View style={styles.lensTabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.lensScroll}>
              {LENS_TABS.map((tab) => {
                const isActive = activeLens === tab.key;
                return (
                  <TouchableOpacity
                    key={tab.key}
                    style={[styles.lensTab, isActive && styles.lensTabActive]}
                    onPress={() => setActiveLens(tab.key as LensKey)}
                    activeOpacity={0.8}
                  >
                    {getLensIcon(tab.key as LensKey, isActive ? colors.accent : colors.textSecondary)}
                    <Text
                      variant="caption"
                      weight={isActive ? '700' : '500'}
                      style={[styles.lensTabText, isActive && styles.lensTabTextActive]}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Active Lens Insight Card */}
          <Card style={styles.lensCard}>
            <View style={styles.lensCardHeader}>
              <View style={styles.lensHeaderTitleRow}>
                {getLensIcon(activeLens, colors.accent)}
                <Text variant="label" color={colors.accent} style={styles.lensHeaderTitle}>
                  {activeLens.replace('_', ' ').toUpperCase()}
                </Text>
              </View>
            </View>

            <Text variant="body" style={styles.lensContentText}>
              {getLensContent()}
            </Text>
          </Card>

          {/* Action Footer */}
          <View style={styles.actionFooter}>
            <TouchableOpacity
              style={[styles.actionBtn, completed && styles.completedBtn]}
              onPress={() => markWOTDComplete(wotd)}
              activeOpacity={0.8}
            >
              <CheckSvg size={18} color={completed ? '#FFFFFF' : colors.accent} />
              <Text
                variant="body"
                weight="600"
                style={[styles.actionBtnText, completed && styles.completedBtnText]}
              >
                {completed ? 'Reflected Today' : 'Mark as Studied'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareBtn} onPress={onShareExegesis} activeOpacity={0.8}>
              <ShareSvg size={18} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Top segment
  topSegmentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
    borderRadius: radius.full,
    padding: 3,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: radius.full,
    gap: 6,
  },
  segmentBtnActive: {
    backgroundColor: '#FFFFFF',
    ...shadow.sm,
  },
  segmentText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  segmentTextActive: {
    color: colors.accent,
  },

  // Full Bible Styles
  bibleContainer: {
    flex: 1,
  },
  readerHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  bookSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  bookSelectorIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookSelectorTextWrap: {
    flex: 1,
  },
  bookSelectorTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  translationBadge: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.2)',
  },
  translationText: {
    color: colors.accent,
    fontSize: 12,
  },
  bibleScrollView: {
    flex: 1,
  },
  bibleScrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 110,
  },
  chapterHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  chapterMainTitle: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
  },
  chapterNumberLabel: {
    marginTop: 2,
    fontSize: 18,
  },
  chapterTranslationMeta: {
    marginTop: 4,
    fontSize: 11,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  versesWrapper: {
    gap: 8,
  },
  verseRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
    alignItems: 'flex-start',
  },
  verseRowHighlight: {
    backgroundColor: colors.accentSoft,
  },
  verseNumberBadge: {
    width: 28,
    paddingTop: 2,
    color: colors.accent,
    fontWeight: '700',
    fontSize: 12,
  },
  verseBodyText: {
    flex: 1,
    color: colors.textPrimary,
  },
  verseFavIndicator: {
    marginLeft: 6,
    paddingTop: 4,
  },
  chapterNavFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
  },
  navBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navBtnDisabled: {
    opacity: 0.3,
  },
  navProgress: {
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full,
  },

  // Modal Selector Styles
  modalSafeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    color: colors.textPrimary,
  },
  modalCloseBtn: {
    padding: 6,
  },
  chapterSelectionContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  chapterSelectionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  backToBooksBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.sm,
  },
  chapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 40,
  },
  chapterTile: {
    width: 52,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    ...shadow.sm,
  },
  chapterTileActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chapterTileText: {
    color: colors.textPrimary,
  },
  chapterTileTextActive: {
    color: '#FFFFFF',
  },
  booksSelectionContainer: {
    flex: 1,
  },
  bookSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    gap: 8,
  },
  bookSearchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    padding: 0,
  },
  testamentTabRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: 8,
    marginBottom: spacing.sm,
  },
  testamentTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    borderRadius: radius.sm,
  },
  testamentTabActive: {
    backgroundColor: colors.accent,
  },
  testamentTabText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  testamentTabTextActive: {
    color: '#FFFFFF',
  },
  booksListContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
  },
  bookRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.04)',
  },
  bookRowItemActive: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
  },
  bookRowMain: {
    gap: 2,
  },
  bookRowName: {
    color: colors.textPrimary,
  },
  bookRowNameActive: {
    color: colors.accent,
  },
  bookRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Verse Action Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  verseActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: 40,
  },
  verseActionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  closeVerseActionBtn: {
    padding: 4,
  },
  verseActionSnippet: {
    fontStyle: 'italic',
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  verseActionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
    paddingTop: spacing.md,
  },
  verseActionBtn: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },

  // Daily Exegesis View Styles
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 110,
  },
  header: {
    marginBottom: spacing.lg,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 4,
  },
  verseCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  metaLabel: {
    letterSpacing: 1.5,
  },
  quoteWrapper: {
    marginVertical: spacing.sm,
  },
  verseText: {
    fontStyle: 'italic',
    lineHeight: 28,
    color: colors.textPrimary,
  },
  verseRef: {
    color: colors.accent,
    marginTop: spacing.sm,
  },
  lensTabsContainer: {
    marginBottom: spacing.md,
  },
  lensScroll: {
    gap: 8,
  },
  lensTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: '#FFFFFF',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  lensTabActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  lensTabText: {
    color: colors.textSecondary,
  },
  lensTabTextActive: {
    color: colors.accent,
  },
  lensCard: {
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
    marginBottom: spacing.xl,
  },
  lensCardHeader: {
    marginBottom: spacing.md,
  },
  lensHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lensHeaderTitle: {
    letterSpacing: 1,
  },
  lensContentText: {
    lineHeight: 24,
    color: colors.textPrimary,
  },
  actionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: radius.full,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
    gap: 8,
  },
  completedBtn: {
    backgroundColor: colors.accent,
  },
  actionBtnText: {
    color: colors.accent,
  },
  completedBtnText: {
    color: '#FFFFFF',
  },
  shareBtn: {
    padding: 14,
    borderRadius: radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
});
