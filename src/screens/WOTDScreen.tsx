import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  Animated,
  Clipboard,
  Dimensions,
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
  ChevronLeftSvg,
  CopySvg,
  FavoritesSvg,
  XCloseSvg,
  SearchSvg,
  AaTextSvg,
  BookmarkSvg,
} from '../components/SvgIcons';

// ─── Types ───────────────────────────────────────────────────────────────────
type LensKey = 'original_intent' | 'theological_truth' | 'modern_walk' | 'prayer_focus';
type ActiveTab = 'bible' | 'exegesis';
type BibleTranslation = 'web' | 'kjv' | 'bbe';
type ReaderTheme = 'light' | 'sepia' | 'dark';
type NavStep = 'books' | 'chapters' | 'verses';

// ─── YouVersion Highlight Colors ─────────────────────────────────────────────
const HIGHLIGHT_COLORS = [
  { id: 'gold',  hex: '#FDD223', label: 'Gold' },
  { id: 'sage',  hex: '#86EFAC', label: 'Sage' },
  { id: 'sky',   hex: '#93C5FD', label: 'Sky' },
  { id: 'lilac', hex: '#D8B4FE', label: 'Lilac' },
  { id: 'peach', hex: '#FDBA74', label: 'Peach' },
];

// ─── Reader Themes ────────────────────────────────────────────────────────────
const THEMES: Record<ReaderTheme, { bg: string; surface: string; text: string; textSecondary: string; label: string }> = {
  light: { bg: '#F8FAFC', surface: '#FFFFFF', text: '#0F172A', textSecondary: '#64748B', label: 'Light' },
  sepia: { bg: '#FDF6E2', surface: '#F5EDD0', text: '#2C2416', textSecondary: '#8B7355', label: 'Sepia' },
  dark:  { bg: '#0F172A', surface: '#1E293B', text: '#F8FAFC', textSecondary: '#94A3B8', label: 'Dark' },
};

const TRANSLATIONS: BibleTranslation[] = ['web', 'kjv', 'bbe'];
const TRANSLATION_LABELS: Record<BibleTranslation, string> = {
  web: 'WEB',
  kjv: 'KJV',
  bbe: 'BBE',
};
const TRANSLATION_META: Record<BibleTranslation, { name: string; desc: string }> = {
  web: { name: 'World English Bible', desc: 'Modern English, public domain' },
  kjv: { name: 'King James Version', desc: 'Classic 1611 translation, public domain' },
  bbe: { name: 'Bible in Basic English', desc: 'Simple vocabulary, public domain' },
};


// ─── Helper: font family ─────────────────────────────────────────────────────
const getFontFamily = (fontType?: 'serif' | 'sans' | 'mono' | 'system') => {
  switch (fontType) {
    case 'serif': return Platform.OS === 'ios' ? 'Georgia' : 'serif';
    case 'sans':  return Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif';
    case 'mono':  return Platform.OS === 'ios' ? 'Courier New' : 'monospace';
    default:      return Platform.OS === 'ios' ? 'Georgia' : 'serif';
  }
};

const getLensIcon = (key: LensKey, color: string) => {
  const size = 18;
  switch (key) {
    case 'original_intent':   return <OriginalIntentSvg size={size} color={color} />;
    case 'theological_truth': return <TheologicalTruthSvg size={size} color={color} />;
    case 'modern_walk':       return <ModernWalkSvg size={size} color={color} />;
    case 'prayer_focus':      return <PrayerFocusSvg size={size} color={color} />;
  }
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WOTDScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bible');
  const [activeLens, setActiveLens] = useState<LensKey>('original_intent');

  const {
    markWOTDComplete,
    isWOTDCompleted,
    userProfile,
    lastReadBible,
    setLastReadBible,
    toggleFavoriteScripture,
    isScriptureFavorited,
    bibleHighlights,
    readerTheme,
    setVerseHighlight,
    setReaderTheme,
  } = useUser();

  // ── Bible Reader State ────────────────────────────────────────────────────
  const initialBook = useMemo(() =>
    BIBLE_BOOKS.find(b => b.name.toLowerCase() === lastReadBible.book.toLowerCase()) || BIBLE_BOOKS[42],
  [lastReadBible.book]);

  const [selectedBook, setSelectedBook] = useState<BibleBook>(initialBook);
  const [selectedChapter, setSelectedChapter] = useState<number>(lastReadBible.chapter || 1);
  const [translation, setTranslation] = useState<BibleTranslation>(
    (lastReadBible.translation as BibleTranslation) || 'web'
  );
  const [chapterData, setChapterData] = useState<BibleChapterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ── Multi-verse selection ─────────────────────────────────────────────────
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);

  // ── Navigator Modal ───────────────────────────────────────────────────────
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navStep, setNavStep] = useState<NavStep>('books');
  const [navTestament, setNavTestament] = useState<'OT' | 'NT'>('NT');
  const [navBook, setNavBook] = useState<BibleBook | null>(null);
  const [navChapter, setNavChapter] = useState<number | null>(null);
  const [bookSearchText, setBookSearchText] = useState('');

  // ── Translation picker ───────────────────────────────────────────
  const [isTranslationPickerOpen, setIsTranslationPickerOpen] = useState(false);

  // ── Aa Settings Sheet ─────────────────────────────────────────────────────
  const [isAaOpen, setIsAaOpen] = useState(false);
  const localFontSize = useRef(userProfile?.fontSize || 17);
  const [fontSize, setFontSize] = useState<number>(localFontSize.current);
  const [fontType, setFontType] = useState<'serif' | 'sans' | 'mono'>(
    (userProfile?.fontType as 'serif' | 'sans' | 'mono') || 'serif'
  );

  // ── Action bar animation ─────────────────────────────────────────────────
  const actionBarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(actionBarAnim, {
      toValue: selectedVerses.length > 0 ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [selectedVerses.length, actionBarAnim]);

  const theme = THEMES[readerTheme];

  // ── Chapter Fetch ─────────────────────────────────────────────────────────
  // Store setLastReadBible in a ref so loadCurrentChapter stays stable.
  // Without this, every render gives setLastReadBible a new reference (it's
  // not useCallback-wrapped in the context), which causes loadCurrentChapter
  // to get a new reference too, which triggers the useEffect, which reloads
  // the chapter — even when only selectedVerses changed.
  const setLastReadBibleRef = useRef(setLastReadBible);
  useEffect(() => {
    setLastReadBibleRef.current = setLastReadBible;
  });

  const loadCurrentChapter = useCallback(
    async (bookName: string, chapterNum: number, trans: BibleTranslation) => {
      setLoading(true);
      setErrorMsg(null);
      setSelectedVerses([]);
      try {
        const data = await fetchChapter(bookName, chapterNum, trans);
        setChapterData(data);
        setLastReadBibleRef.current(bookName, chapterNum, trans);
      } catch {
        setErrorMsg('Unable to load chapter. Please check your connection.');
      } finally {
        setLoading(false);
      }
    },
    [] // ← zero deps: stable forever, never recreated on re-render
  );

  useEffect(() => {
    loadCurrentChapter(selectedBook.name, selectedChapter, translation);
  }, [selectedBook.name, selectedChapter, translation, loadCurrentChapter]);


  // ── Chapter Navigation ────────────────────────────────────────────────────
  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(c => c - 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (idx > 0) {
        const prev = BIBLE_BOOKS[idx - 1];
        setSelectedBook(prev);
        setSelectedChapter(prev.chaptersCount);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < selectedBook.chaptersCount) {
      setSelectedChapter(c => c + 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (idx < BIBLE_BOOKS.length - 1) {
        const next = BIBLE_BOOKS[idx + 1];
        setSelectedBook(next);
        setSelectedChapter(1);
      }
    }
  };

  // ── Verse Selection Toggle ────────────────────────────────────────────────
  const toggleVerseSelection = (verseNum: number) => {
    setSelectedVerses(prev => {
      if (prev.includes(verseNum)) {
        return prev.filter(v => v !== verseNum).sort((a, b) => a - b);
      }
      return [...prev, verseNum].sort((a, b) => a - b);
    });
  };

  const getSelectionRef = () => {
    if (selectedVerses.length === 0) return '';
    const min = selectedVerses[0];
    const max = selectedVerses[selectedVerses.length - 1];
    const trans = TRANSLATION_LABELS[translation];
    return min === max
      ? `${selectedBook.name} ${selectedChapter}:${min} (${trans})`
      : `${selectedBook.name} ${selectedChapter}:${min}-${max} (${trans})`;
  };

  const getSelectedText = () => {
    if (!chapterData) return '';
    return chapterData.verses
      .filter(v => selectedVerses.includes(v.verse))
      .map(v => `${v.verse}. ${v.text.trim()}`)
      .join(' ');
  };

  // ── Verse Key ─────────────────────────────────────────────────────────────
  const verseKey = (verseNum: number) =>
    `${selectedBook.id}_${selectedChapter}_${verseNum}`;

  // ── Action: Copy ─────────────────────────────────────────────────────────
  const onCopy = () => {
    const ref = getSelectionRef();
    const text = getSelectedText();
    Clipboard.setString(`"${text}" — ${ref}`);
    setSelectedVerses([]);
  };

  // ── Action: Share ─────────────────────────────────────────────────────────
  const onShare = async () => {
    const ref = getSelectionRef();
    const text = getSelectedText();
    try {
      await Share.share({ message: `"${text}"\n— ${ref}` });
    } catch {}
    setSelectedVerses([]);
  };

  // ── Action: Bookmark ─────────────────────────────────────────────────────
  const onBookmark = () => {
    const ref = getSelectionRef();
    const text = getSelectedText();
    const scriptureObj: Scripture = {
      id: `bible_${selectedBook.id}_${selectedChapter}_${selectedVerses.join('_')}`,
      reference: ref,
      text: text,
      testament: selectedBook.testament,
      book: selectedBook.name,
      chapter: selectedChapter,
      verse_range: selectedVerses.join('-'),
      genre: selectedBook.category,
      historical_context: `Scripture passage from ${selectedBook.name} chapter ${selectedChapter}.`,
      cultural_practice: 'Sacred biblical canon.',
      strongs_word: selectedBook.name,
      strongs_transliteration: selectedBook.name,
      strongs_definition: 'Sacred Scripture Canon',
      strongs_number: 'N/A',
    };
    toggleFavoriteScripture(scriptureObj);
    setSelectedVerses([]);
  };

  // ── Action: Highlight ─────────────────────────────────────────────────────
  const onHighlight = (hexColor: string) => {
    selectedVerses.forEach(vNum => setVerseHighlight(verseKey(vNum), hexColor));
    setSelectedVerses([]);
  };

  const onEraseHighlight = () => {
    selectedVerses.forEach(vNum => setVerseHighlight(verseKey(vNum), undefined));
    setSelectedVerses([]);
  };

  // ── Navigator Helpers ─────────────────────────────────────────────────────
  const filteredBooks = useMemo(() =>
    BIBLE_BOOKS.filter(b => {
      const matchT = navTestament === 'OT' ? b.testament === 'Old Testament' : b.testament === 'New Testament';
      const matchS = bookSearchText === '' || b.name.toLowerCase().includes(bookSearchText.toLowerCase());
      return matchT && matchS;
    }),
  [navTestament, bookSearchText]);

  const openNav = () => {
    setNavStep('books');
    setNavBook(selectedBook);
    setNavChapter(null);
    setBookSearchText('');
    setIsNavOpen(true);
  };

  const onNavBookTap = (book: BibleBook) => {
    setNavBook(book);
    setNavStep('chapters');
  };

  const onNavChapterTap = (ch: number) => {
    setNavChapter(ch);
    setNavStep('verses');
  };

  const onNavVerseTap = (v: number) => {
    if (navBook && navChapter) {
      setSelectedBook(navBook);
      setSelectedChapter(navChapter);
      setIsNavOpen(false);
    }
  };

  const onNavChapterConfirm = (ch: number) => {
    if (navBook) {
      setSelectedBook(navBook);
      setSelectedChapter(ch);
      setIsNavOpen(false);
    }
  };

  // ── Exegesis ─────────────────────────────────────────────────────────────
  const getLensContent = () => {
    switch (activeLens) {
      case 'original_intent':   return wotd.original_intent;
      case 'theological_truth': return wotd.theological_truth;
      case 'modern_walk':       return wotd.modern_walk;
      case 'prayer_focus':      return wotd.prayer_focus;
    }
  };

  const onShareExegesis = async () => {
    try {
      const msg = `${wotd.verse}\n— ${wotd.reference}\n\nOriginal Intent:\n${wotd.original_intent}\n\nTheological Truth:\n${wotd.theological_truth}`;
      await Share.share({ message: msg });
    } catch {}
  };

  const completed = isWOTDCompleted(wotd.id);

  // ── Action bar translation ────────────────────────────────────────────────
  const actionBarTranslateY = actionBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [120, 0],
  });

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]} edges={['left', 'right']}>
      {/* ── YouVersion Top App Bar (pill row) ── */}
      <View style={[styles.topBar, { backgroundColor: theme.surface, borderBottomColor: readerTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)' }]}>
        {/* Left: Book & Chapter pill */}
        <TouchableOpacity style={[styles.pill, styles.pillPrimary]} onPress={openNav} activeOpacity={0.75}>
          <BookOpenSvg size={14} color={colors.accent} />
          <Text style={styles.pillTextBold}>{selectedBook.name} {selectedChapter}</Text>
          <ChevronDownSvg size={13} color={colors.accent} />
        </TouchableOpacity>

        <View style={styles.pillRow}>
          {/* Translation pill — opens picker modal */}
          <TouchableOpacity style={styles.pill} onPress={() => setIsTranslationPickerOpen(true)} activeOpacity={0.75}>
            <Text style={styles.pillText}>{TRANSLATION_LABELS[translation]}</Text>
            <ChevronDownSvg size={13} color={colors.textSecondary || '#64748B'} />
          </TouchableOpacity>

          {/* Aa settings pill */}
          <TouchableOpacity style={styles.pill} onPress={() => setIsAaOpen(true)} activeOpacity={0.75}>
            <AaTextSvg size={16} color={theme.text} />
          </TouchableOpacity>

          {/* Bible / Exegesis toggle */}
          <TouchableOpacity
            style={[styles.pill, activeTab === 'exegesis' && styles.pillAccent]}
            onPress={() => setActiveTab(prev => prev === 'bible' ? 'exegesis' : 'bible')}
            activeOpacity={0.75}
          >
            <WotdSvg size={14} color={activeTab === 'exegesis' ? '#FFFFFF' : colors.accent} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ════════════════════════════════════════════════════ */}
      {/* VIEW 1: FULL BIBLE READER                           */}
      {/* ════════════════════════════════════════════════════ */}
      {activeTab === 'bible' ? (
        <View style={styles.flex1}>
          <ScrollView
            style={styles.flex1}
            contentContainerStyle={[styles.scriptureCanvas, { paddingBottom: selectedVerses.length > 0 ? 200 : 130 }]}
            showsVerticalScrollIndicator={false}
          >
            {/* Chapter Heading */}
            <View style={styles.chapterHeading}>
              <Text style={[styles.chapterHeadingBook, { color: theme.text }]}>{selectedBook.name.toUpperCase()}</Text>
              <Text style={[styles.chapterHeadingNumber, { color: colors.accent }]}>Chapter {selectedChapter}</Text>
              <Text style={[styles.chapterMeta, { color: theme.textSecondary }]}>
                {translation === 'web' ? 'World English Bible' : translation === 'kjv' ? 'King James Version' : 'Bible in Basic English'}
              </Text>
            </View>

            {/* Scripture Content */}
            {loading ? (
              <View style={styles.loaderBox}>
                <ActivityIndicator size="large" color={colors.accent} />
                <Text style={[styles.loaderText, { color: theme.textSecondary }]}>
                  Loading {selectedBook.name} {selectedChapter}...
                </Text>
              </View>
            ) : errorMsg ? (
              <View style={styles.errorBox}>
                <Text style={[styles.errorText, { color: theme.textSecondary }]}>{errorMsg}</Text>
                <TouchableOpacity
                  style={[styles.retryBtn, { backgroundColor: colors.accent }]}
                  onPress={() => loadCurrentChapter(selectedBook.name, selectedChapter, translation)}
                >
                  <Text style={styles.retryBtnText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* ── YouVersion verse flow: flexWrap row of pressable verse units ── */
              /* Each verse is its own TouchableOpacity so taps are 100% reliable  */
              <View style={styles.verseParagraphWrap}>
                {chapterData?.verses.map((v: BibleVerse) => {
                  const isSelected = selectedVerses.includes(v.verse);
                  const hlColor = bibleHighlights[verseKey(v.verse)];
                  const isFav = isScriptureFavorited(`bible_${selectedBook.id}_${selectedChapter}_${v.verse}`);
                  return (
                    <TouchableOpacity
                      key={v.verse}
                      onPress={() => toggleVerseSelection(v.verse)}
                      activeOpacity={0.75}
                      style={[
                        styles.versePressable,
                        isSelected && { backgroundColor: '#FDD22340', borderRadius: 4 },
                        hlColor ? { backgroundColor: hlColor + '66', borderRadius: 4 } : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.verseUnit,
                          {
                            fontSize: fontSize,
                            fontFamily: getFontFamily(fontType),
                            lineHeight: fontSize * 1.75,
                            color: theme.text,
                            textAlign: 'justify',
                          },
                        ]}
                      >
                        <Text style={[styles.verseNumInline, { color: colors.accent }]}>
                          [{v.verse}]
                        </Text>
                        {' '}{v.text.trim()}
                        {isFav ? <Text style={{ color: colors.accent }}> ♥</Text> : null}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* ── Chapter Stepper ── */}
            {!loading && !errorMsg && (
              <View style={[styles.chapterStepper, { borderTopColor: readerTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)' }]}>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={handlePrevChapter}
                  disabled={selectedBook.id === 'GEN' && selectedChapter === 1}
                  activeOpacity={0.7}
                >
                  <ChevronLeftSvg size={20} color={selectedBook.id === 'GEN' && selectedChapter === 1 ? '#CBD5E1' : colors.accent} />
                  <Text style={[styles.stepBtnText, { color: selectedBook.id === 'GEN' && selectedChapter === 1 ? '#CBD5E1' : colors.accent }]}>
                    {selectedChapter > 1
                      ? `${selectedBook.name} ${selectedChapter - 1}`
                      : 'First Chapter'}
                  </Text>
                </TouchableOpacity>

                <View style={[styles.stepCenter, { backgroundColor: readerTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.04)' }]}>
                  <Text style={[styles.stepCenterText, { color: theme.textSecondary }]}>
                    {selectedChapter} / {selectedBook.chaptersCount}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={handleNextChapter}
                  disabled={selectedBook.id === 'REV' && selectedChapter === selectedBook.chaptersCount}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.stepBtnText, { color: selectedBook.id === 'REV' && selectedChapter === selectedBook.chaptersCount ? '#CBD5E1' : colors.accent }]}>
                    {selectedChapter < selectedBook.chaptersCount
                      ? `${selectedBook.name} ${selectedChapter + 1}`
                      : 'Last Chapter'}
                  </Text>
                  <ChevronDownSvg size={20} color={selectedBook.id === 'REV' && selectedChapter === selectedBook.chaptersCount ? '#CBD5E1' : colors.accent} style={{ transform: [{ rotate: '-90deg' }] }} />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          {/* ── Floating YouVersion Action Bar ── */}
          {selectedVerses.length > 0 && (
            <Animated.View
              style={[
                styles.floatingActionBar,
                {
                  transform: [{ translateY: actionBarTranslateY }],
                  opacity: actionBarAnim,
                  backgroundColor: theme.surface,
                },
              ]}
            >
              {/* Reference header */}
              <View style={styles.fabHeader}>
                <View style={styles.fabRefRow}>
                  <View style={styles.fabVerseCountBadge}>
                    <Text style={styles.fabVerseCountText}>{selectedVerses.length}</Text>
                  </View>
                  <Text style={[styles.fabRef, { color: theme.text }]} numberOfLines={1}>
                    {getSelectionRef()}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedVerses([])} style={styles.fabClose}>
                  <XCloseSvg size={18} color={theme.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Highlight color row */}
              <View style={styles.fabColorRow}>
                <Text style={[styles.fabSectionLabel, { color: theme.textSecondary }]}>Highlight</Text>
                {HIGHLIGHT_COLORS.map(hc => (
                  <TouchableOpacity
                    key={hc.id}
                    style={[styles.fabColorDot, { backgroundColor: hc.hex }]}
                    onPress={() => onHighlight(hc.hex)}
                    activeOpacity={0.8}
                  />
                ))}
                <TouchableOpacity style={[styles.fabColorDot, styles.fabEraseDot]} onPress={onEraseHighlight} activeOpacity={0.8}>
                  <XCloseSvg size={14} color="#64748B" />
                </TouchableOpacity>
              </View>

              {/* Action buttons */}
              <View style={styles.fabActions}>
                <TouchableOpacity style={styles.fabActionBtn} onPress={onCopy}>
                  <CopySvg size={20} color={colors.accent} />
                  <Text style={[styles.fabActionLabel, { color: theme.textSecondary }]}>Copy</Text>
                </TouchableOpacity>
                <View style={[styles.fabDivider, { backgroundColor: readerTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)' }]} />
                <TouchableOpacity style={styles.fabActionBtn} onPress={onBookmark}>
                  <BookmarkSvg size={20} color={colors.accent} />
                  <Text style={[styles.fabActionLabel, { color: theme.textSecondary }]}>Bookmark</Text>
                </TouchableOpacity>
                <View style={[styles.fabDivider, { backgroundColor: readerTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)' }]} />
                <TouchableOpacity style={styles.fabActionBtn} onPress={onShare}>
                  <ShareSvg size={20} color={colors.accent} />
                  <Text style={[styles.fabActionLabel, { color: theme.textSecondary }]}>Share</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {/* ── 3-Step Canonical Navigator Modal ── */}
          <Modal visible={isNavOpen} animationType="slide" transparent={false} onRequestClose={() => setIsNavOpen(false)}>
            <SafeAreaView style={[styles.navModal, { backgroundColor: theme.bg }]}>
              {/* Nav modal header */}
              <View style={[styles.navModalHeader, { backgroundColor: theme.surface, borderBottomColor: readerTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)' }]}>
                <TouchableOpacity onPress={() => setIsNavOpen(false)} style={styles.navModalClose}>
                  <XCloseSvg size={22} color={theme.textSecondary} />
                </TouchableOpacity>
                {/* 3 step tabs */}
                <View style={styles.navStepRow}>
                  {(['books', 'chapters', 'verses'] as NavStep[]).map(step => (
                    <TouchableOpacity
                      key={step}
                      style={[styles.navStepTab, navStep === step && styles.navStepTabActive]}
                      onPress={() => {
                        if (step === 'chapters' && navBook) setNavStep('chapters');
                        else if (step === 'books') setNavStep('books');
                        else if (step === 'verses' && navBook && navChapter) setNavStep('verses');
                      }}
                    >
                      <Text style={[styles.navStepLabel, { color: navStep === step ? colors.accent : theme.textSecondary }]}>
                        {step.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* BOOKS step */}
              {navStep === 'books' && (
                <View style={styles.flex1}>
                  <View style={[styles.navSearchBox, { backgroundColor: theme.surface, borderColor: readerTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)' }]}>
                    <SearchSvg size={16} color={colors.accent} />
                    <TextInput
                      style={[styles.navSearchInput, { color: theme.text }]}
                      placeholder="Search book..."
                      placeholderTextColor={theme.textSecondary}
                      value={bookSearchText}
                      onChangeText={setBookSearchText}
                    />
                  </View>
                  <View style={styles.navTestamentRow}>
                    {(['OT', 'NT'] as const).map(t => (
                      <TouchableOpacity
                        key={t}
                        style={[styles.navTestTab, navTestament === t && { backgroundColor: colors.accent }]}
                        onPress={() => setNavTestament(t)}
                      >
                        <Text style={{ color: navTestament === t ? '#FFFFFF' : theme.textSecondary, fontSize: 12, fontWeight: '700' }}>
                          {t === 'OT' ? 'Old Testament' : 'New Testament'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.navBookList}>
                    {filteredBooks.map(book => {
                      const isCur = selectedBook.id === book.id;
                      return (
                        <TouchableOpacity
                          key={book.id}
                          style={[styles.navBookRow, isCur && { backgroundColor: '#FDD22320' }]}
                          onPress={() => onNavBookTap(book)}
                          activeOpacity={0.7}
                        >
                          <View>
                            <Text style={[styles.navBookName, { color: isCur ? colors.accent : theme.text }]}>{book.name}</Text>
                            <Text style={[styles.navBookMeta, { color: theme.textSecondary }]}>{book.category}</Text>
                          </View>
                          <Text style={[styles.navBookCh, { color: theme.textSecondary }]}>{book.chaptersCount} ch</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}

              {/* CHAPTERS step */}
              {navStep === 'chapters' && navBook && (
                <View style={styles.flex1}>
                  <TouchableOpacity style={styles.navBackRow} onPress={() => setNavStep('books')}>
                    <ChevronLeftSvg size={18} color={colors.accent} />
                    <Text style={{ color: colors.accent, fontWeight: '700', fontSize: 14 }}>All Books</Text>
                  </TouchableOpacity>
                  <Text style={[styles.navBookTitle, { color: theme.text }]}>{navBook.name}</Text>
                  <ScrollView contentContainerStyle={styles.navChapterGrid} showsVerticalScrollIndicator={false}>
                    {Array.from({ length: navBook.chaptersCount }, (_, i) => i + 1).map(ch => {
                      const isActive = selectedBook.id === navBook.id && selectedChapter === ch;
                      return (
                        <TouchableOpacity
                          key={ch}
                          style={[styles.navChTile, isActive && { backgroundColor: colors.accent }]}
                          onPress={() => onNavChapterConfirm(ch)}
                          activeOpacity={0.7}
                        >
                          <Text style={[styles.navChTileText, { color: isActive ? '#FFFFFF' : theme.text }]}>{ch}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}

              {/* VERSES step */}
              {navStep === 'verses' && navBook && navChapter && (
                <View style={styles.flex1}>
                  <TouchableOpacity style={styles.navBackRow} onPress={() => setNavStep('chapters')}>
                    <ChevronLeftSvg size={18} color={colors.accent} />
                    <Text style={{ color: colors.accent, fontWeight: '700', fontSize: 14 }}>Chapters</Text>
                  </TouchableOpacity>
                  <Text style={[styles.navBookTitle, { color: theme.text }]}>{navBook.name} {navChapter}</Text>
                  <ScrollView contentContainerStyle={styles.navChapterGrid} showsVerticalScrollIndicator={false}>
                    {Array.from({ length: 50 }, (_, i) => i + 1).map(v => (
                      <TouchableOpacity
                        key={v}
                        style={styles.navChTile}
                        onPress={() => onNavVerseTap(v)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.navChTileText, { color: theme.text }]}>{v}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </SafeAreaView>
          </Modal>

          {/* ── Aa Reader Settings Sheet ── */}
          <Modal visible={isAaOpen} animationType="slide" transparent={true} onRequestClose={() => setIsAaOpen(false)}>
            <TouchableOpacity style={styles.aaOverlay} activeOpacity={1} onPress={() => setIsAaOpen(false)}>
              <View style={[styles.aaSheet, { backgroundColor: theme.surface }]} onStartShouldSetResponder={() => true}>
                <View style={[styles.aaSheetHandle, { backgroundColor: readerTheme === 'dark' ? '#334155' : '#E2E8F0' }]} />

                <Text style={[styles.aaSectionLabel, { color: theme.textSecondary }]}>FONT SIZE</Text>
                <View style={styles.aaFontSizeRow}>
                  <TouchableOpacity
                    style={[styles.aaFontBtn, { borderColor: colors.accent }]}
                    onPress={() => setFontSize(s => Math.max(12, s - 1))}
                  >
                    <Text style={[styles.aaFontBtnText, { color: colors.accent }]}>A−</Text>
                  </TouchableOpacity>
                  <Text style={[styles.aaFontSizeVal, { color: theme.text }]}>{fontSize}px</Text>
                  <TouchableOpacity
                    style={[styles.aaFontBtn, { borderColor: colors.accent }]}
                    onPress={() => setFontSize(s => Math.min(28, s + 1))}
                  >
                    <Text style={[styles.aaFontBtnText, { color: colors.accent }]}>A+</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.aaSectionLabel, { color: theme.textSecondary }]}>TYPEFACE</Text>
                <View style={styles.aaTypefaceRow}>
                  {([['serif', 'Serif'], ['sans', 'Sans'], ['mono', 'Mono']] as ['serif'|'sans'|'mono', string][]).map(([key, label]) => (
                    <TouchableOpacity
                      key={key}
                      style={[styles.aaTypePill, fontType === key && { backgroundColor: colors.accent }]}
                      onPress={() => setFontType(key)}
                    >
                      <Text style={{ fontFamily: getFontFamily(key), color: fontType === key ? '#FFFFFF' : theme.textSecondary, fontSize: 14 }}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.aaSectionLabel, { color: theme.textSecondary }]}>READING THEME</Text>
                <View style={styles.aaThemeRow}>
                  {(Object.keys(THEMES) as ReaderTheme[]).map(t => (
                    <TouchableOpacity
                      key={t}
                      style={[styles.aaThemeTile, { backgroundColor: THEMES[t].bg, borderColor: readerTheme === t ? colors.accent : 'transparent', borderWidth: 2 }]}
                      onPress={() => setReaderTheme(t)}
                    >
                      <Text style={[styles.aaThemeLabel, { color: THEMES[t].text }]}>{THEMES[t].label}</Text>
                      <Text style={{ fontSize: 10, color: THEMES[t].textSecondary }}>Aa</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          {/* ── Translation Picker Sheet ── */}
          <Modal
            visible={isTranslationPickerOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsTranslationPickerOpen(false)}
          >
            <TouchableOpacity
              style={styles.aaOverlay}
              activeOpacity={1}
              onPress={() => setIsTranslationPickerOpen(false)}
            >
              <View
                style={[styles.aaSheet, { backgroundColor: theme.surface }]}
                onStartShouldSetResponder={() => true}
              >
                <View style={[styles.aaSheetHandle, { backgroundColor: readerTheme === 'dark' ? '#334155' : '#E2E8F0' }]} />
                <Text style={[styles.aaSectionLabel, { color: theme.textSecondary }]}>SELECT TRANSLATION</Text>

                {(Object.keys(TRANSLATION_META) as BibleTranslation[]).map(key => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.translationRow,
                      translation === key && { backgroundColor: colors.accentSoft, borderColor: colors.accent, borderWidth: 1 },
                    ]}
                    onPress={() => {
                      setTranslation(key);
                      setIsTranslationPickerOpen(false);
                    }}
                    activeOpacity={0.75}
                  >
                    <View style={styles.translationRowLeft}>
                      <Text style={[styles.translationKey, { color: translation === key ? colors.accent : theme.text }]}>
                        {TRANSLATION_LABELS[key]}
                      </Text>
                      <Text style={[styles.translationDesc, { color: theme.textSecondary }]}>
                        {TRANSLATION_META[key].name}
                      </Text>
                      <Text style={[styles.translationMeta, { color: theme.textSecondary }]}>
                        {TRANSLATION_META[key].desc}
                      </Text>
                    </View>
                    {translation === key && (
                      <View style={[styles.translationCheck, { backgroundColor: colors.accent }]} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

      ) : (
        /* ════════════════════════════════════════════════════ */
        /* VIEW 2: DAILY EXEGESIS                              */
        /* ════════════════════════════════════════════════════ */
        <ScrollView
          style={styles.flex1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.exegesisContainer}
        >
          {/* Header */}
          <View style={styles.exegesisHeader}>
            <View style={styles.exegesisHeaderRow}>
              <WotdSvg size={22} color={colors.accent} fill={colors.accentSoft} />
              <Text style={[styles.exegesisTitle, { color: theme.text }]}>Daily Word & Exegesis</Text>
            </View>
            <Text style={[styles.exegesisSubtitle, { color: theme.textSecondary }]}>
              4 analytical perspectives on today's scripture
            </Text>
          </View>

          {/* Verse Card */}
          <View style={[styles.verseCard, { backgroundColor: theme.surface }]}>
            <View style={styles.verseMeta}>
              <CalendarSvg size={14} color={colors.accent} />
              <Text style={styles.verseMetaLabel}>DAILY SCRIPTURE</Text>
            </View>
            <Text style={[styles.verseCardText, { color: theme.text }]}>
              "{wotd.verse}"
            </Text>
            <Text style={[styles.verseCardRef, { color: colors.accent }]}>{wotd.reference}</Text>
          </View>

          {/* Lens Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.lensTabs}>
            {LENS_TABS.map(tab => {
              const isActive = activeLens === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[styles.lensTab, isActive && { borderColor: colors.accent, backgroundColor: colors.accentSoft }]}
                  onPress={() => setActiveLens(tab.key as LensKey)}
                  activeOpacity={0.8}
                >
                  {getLensIcon(tab.key as LensKey, isActive ? colors.accent : (theme.textSecondary))}
                  <Text style={[styles.lensTabText, { color: isActive ? colors.accent : theme.textSecondary }]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Lens Content Card */}
          <View style={[styles.lensCard, { backgroundColor: theme.surface }]}>
            <View style={styles.lensCardHeader}>
              {getLensIcon(activeLens, colors.accent)}
              <Text style={[styles.lensCardTitle, { color: colors.accent }]}>
                {activeLens.replace(/_/g, ' ').toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.lensCardBody, { color: theme.text }]}>{getLensContent()}</Text>
          </View>

          {/* Action Footer */}
          <View style={styles.exegesisFooter}>
            <TouchableOpacity
              style={[styles.markBtn, completed && { backgroundColor: colors.accent }]}
              onPress={() => markWOTDComplete(wotd)}
              activeOpacity={0.85}
            >
              <CheckSvg size={18} color={completed ? '#FFFFFF' : colors.accent} />
              <Text style={[styles.markBtnText, { color: completed ? '#FFFFFF' : colors.accent }]}>
                {completed ? 'Reflected Today' : 'Mark as Studied'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareExBtn, { backgroundColor: theme.surface }]} onPress={onShareExegesis} activeOpacity={0.8}>
              <ShareSvg size={18} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex1: { flex: 1 },

  // ── Top App Bar ─────────────────────────────────────────────────────────────
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(15,23,42,0.05)',
    gap: 5,
  },
  pillPrimary: {
    backgroundColor: '#FDD22318',
    borderWidth: 1,
    borderColor: '#FDD22340',
  },
  pillAccent: {
    backgroundColor: colors.accent,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  pillTextBold: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },

  // ── Scripture Canvas ────────────────────────────────────────────────────────
  scriptureCanvas: {
    paddingHorizontal: 22,
    paddingTop: 20,
  },

  // Chapter heading
  chapterHeading: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,23,42,0.06)',
  },
  chapterHeadingBook: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
  },
  chapterHeadingNumber: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  chapterMeta: {
    fontSize: 11,
    marginTop: 4,
    letterSpacing: 0.5,
  },

  // ── Verse flow (flexWrap row of pressable units) ─────────────────────────
  verseParagraphWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 0,
    columnGap: 0,
  },
  versePressable: {
    // no fixed width — wraps to content so text flows naturally
  },
  verseUnit: {
    // text style applied inline per-verse
  },
  verseNumInline: {
    fontWeight: '700',
    fontSize: 11,
  },

  // ── Loader / Error ──────────────────────────────────────────────────────────
  loaderBox: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  loaderText: {
    fontSize: 14,
  },
  errorBox: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 14,
  },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  // ── Chapter Stepper ─────────────────────────────────────────────────────────
  chapterStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    paddingTop: 16,
    borderTopWidth: 1,
    marginBottom: 16,
  },
  stepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  stepBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  stepCenter: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  stepCenterText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // ── FAB ─────────────────────────────────────────────────────────────────────
  floatingActionBar: {
    position: 'absolute',
    bottom: 90,
    left: 12,
    right: 12,
    borderRadius: 18,
    ...shadow.md,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.06)',
  },
  fabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fabRefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  fabVerseCountBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabVerseCountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  fabRef: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  fabClose: {
    padding: 4,
  },
  fabSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginRight: 4,
  },
  fabColorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  fabColorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    ...shadow.sm,
  },
  fabEraseDot: {
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabActions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(15,23,42,0.06)',
    paddingTop: 12,
  },
  fabActionBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
  },
  fabActionLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  fabDivider: {
    width: 1,
    height: 36,
    marginHorizontal: 4,
  },

  // ── Navigator Modal ─────────────────────────────────────────────────────────
  navModal: {
    flex: 1,
  },
  navModalHeader: {
    borderBottomWidth: 1,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  navModalClose: {
    alignSelf: 'flex-end',
    padding: 4,
    marginBottom: 8,
  },
  navStepRow: {
    flexDirection: 'row',
  },
  navStepTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  navStepTabActive: {
    borderBottomColor: colors.accent,
  },
  navStepLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  navSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  navSearchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  navTestamentRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  navTestTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(15,23,42,0.04)',
  },
  navBookList: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  navBookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,23,42,0.04)',
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  navBookName: {
    fontSize: 15,
    fontWeight: '600',
  },
  navBookMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  navBookCh: {
    fontSize: 12,
    fontWeight: '600',
  },
  navBackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  navBookTitle: {
    fontSize: 22,
    fontWeight: '800',
    paddingHorizontal: 16,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  navChapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 40,
  },
  navChTile: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: 'rgba(15,23,42,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navChTileText: {
    fontSize: 15,
    fontWeight: '700',
  },

  // ── Aa Settings Sheet ────────────────────────────────────────────────────────
  aaOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15,23,42,0.4)',
  },
  aaSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  aaSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  aaSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginTop: 8,
  },
  aaFontSizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  aaFontBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aaFontBtnText: {
    fontSize: 15,
    fontWeight: '800',
  },
  aaFontSizeVal: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  aaTypefaceRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  aaTypePill: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(15,23,42,0.05)',
  },
  aaThemeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  aaThemeTile: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    gap: 4,
  },
  aaThemeLabel: {
    fontSize: 13,
    fontWeight: '700',
  },

  // ── Translation Picker ───────────────────────────────────────────────────────
  translationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(15,23,42,0.04)',
  },
  translationRowLeft: {
    flex: 1,
    gap: 2,
  },
  translationKey: {
    fontSize: 15,
    fontWeight: '700',
  },
  translationDesc: {
    fontSize: 13,
    fontWeight: '500',
  },
  translationMeta: {
    fontSize: 11,
    fontWeight: '400',
  },
  translationCheck: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 12,
  },

  // ── Daily Exegesis ──────────────────────────────────────────────────────────
  exegesisContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
  },
  exegesisHeader: {
    marginBottom: 16,
  },
  exegesisHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  exegesisTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  exegesisSubtitle: {
    fontSize: 13,
  },
  verseCard: {
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    ...shadow.sm,
  },
  verseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  verseMetaLabel: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  verseCardText: {
    fontSize: 17,
    fontStyle: 'italic',
    lineHeight: 28,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 10,
  },
  verseCardRef: {
    fontSize: 14,
    fontWeight: '700',
  },
  lensTabs: {
    gap: 8,
    marginBottom: 16,
  },
  lensTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    gap: 7,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.06)',
  },
  lensTabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  lensCard: {
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    ...shadow.sm,
  },
  lensCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  lensCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  lensCardBody: {
    fontSize: 15,
    lineHeight: 25,
  },
  exegesisFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  markBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
    gap: 8,
  },
  markBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  shareExBtn: {
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.08)',
  },
});
