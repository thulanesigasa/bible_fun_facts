import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  Share,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme';
import { Text } from '../components/Typography';
import {
  SearchSvg,
  CloseSvg,
  BookOpenSvg,
  ShareSvg,
  ScrollSvg,
} from '../components/SvgIcons';
import {
  LexiconEntry,
  getHebrewLexicon,
  HEBREW_ALPHABET_GUIDE,
  HebrewLetterGuide,
} from '../data/lexiconData';

interface HebrewScreenProps {
  navigation: any;
}

const HEBREW_CATEGORIES = [
  'All',
  'Covenant & Names',
  'Creation & Spirit',
  'Worship & Praise',
  'Righteousness',
];

export default function HebrewScreen({ navigation }: HebrewScreenProps) {
  const [activeTab, setActiveTab] = useState<'words' | 'alphabet'>('words');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredWords = useMemo(() => {
    return getHebrewLexicon(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  const handleOpenScripture = (entry: LexiconEntry) => {
    if (entry.keyScripture?.book && entry.keyScripture?.chapter) {
      navigation.navigate('WOTD', {
        book: entry.keyScripture.book,
        chapter: entry.keyScripture.chapter,
        verse: entry.keyScripture.verse || 1,
      });
    }
  };

  const handleShareWord = async (entry: LexiconEntry) => {
    try {
      await Share.share({
        title: `Hebrew Word Study: ${entry.transliteration} (${entry.originalScript})`,
        message: `Ancient Hebrew Study (${entry.strongsNumber})\nWord: ${entry.originalScript} (${entry.transliteration})\nMeaning: ${entry.shortDefinition}\n\nExegesis: ${entry.theologicalSignificance}\n\n"${entry.keyScripture.snippet}" — ${entry.keyScripture.reference}\n\nDiscovered on exégeomai.`,
      });
    } catch (e) {
      // User cancelled
    }
  };

  const renderWordItem = ({ item, isLast }: { item: LexiconEntry; isLast: boolean }) => {
    const isExpanded = expandedId === item.strongsNumber;

    return (
      <View style={[styles.wordRow, !isLast && styles.rowDivider]}>
        {/* Row Header: Category & Strong's Label (Directly on Body Canvas) */}
        <View style={styles.rowHeader}>
          <View style={styles.headerLeftWrap}>
            <Text variant="caption" weight="800" color="#0F172A">
              {item.strongsNumber}
            </Text>
            <Text variant="caption" weight="700" color={colors.textTertiary}>
              {` • ${item.category.toUpperCase()}`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={() => handleShareWord(item)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={`Share ${item.transliteration}`}
          >
            <ShareSvg size={15} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Hebrew Script & Transliteration */}
        <View style={styles.wordHeaderRow}>
          <Text style={styles.hebrewScriptText}>{item.originalScript}</Text>
          <View style={styles.transliterationCol}>
            <Text variant="h2" weight="800" color={colors.textPrimary}>
              {item.transliteration}
            </Text>
            {item.pronunciation ? (
              <Text variant="caption" color={colors.textTertiary}>
                /{item.pronunciation}/
              </Text>
            ) : null}
          </View>
        </View>

        {/* Part of speech & root */}
        <View style={styles.metaRow}>
          <Text variant="caption" weight="700" color={colors.accent}>
            {item.partOfSpeech}
          </Text>
          {item.rootOrigin ? (
            <Text variant="caption" color={colors.textTertiary} numberOfLines={1}>
              • {item.rootOrigin}
            </Text>
          ) : null}
        </View>

        {/* Short Definition */}
        <Text style={styles.definitionText}>{item.shortDefinition}</Text>

        {/* Deep Dive Covenant Exegesis (Continuous Body Flow) */}
        <View style={styles.exegesisSection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionLabel}>
            HEBRAIC THEOLOGY & COVENANT CONTEXT
          </Text>
          <Text
            style={styles.exegesisText}
            numberOfLines={isExpanded ? undefined : 3}
          >
            {item.theologicalSignificance}
          </Text>
        </View>

        {/* Key Scripture Quote & Reader Link (Unboxed Body Element) */}
        <TouchableOpacity
          style={styles.scriptureLink}
          activeOpacity={0.7}
          onPress={() => handleOpenScripture(item)}
          accessibilityRole="button"
          accessibilityLabel={`Open ${item.keyScripture.reference} in Word Reader`}
        >
          <Text style={styles.scriptureSnippetText}>
            "{item.keyScripture.snippet}"
          </Text>
          <View style={styles.scriptureMetaRow}>
            <BookOpenSvg size={12} color={colors.accent} />
            <Text variant="caption" weight="700" color={colors.accent}>
              {item.keyScripture.reference} • Open in Word Reader ›
            </Text>
          </View>
        </TouchableOpacity>

        {/* Expand Toggle */}
        <TouchableOpacity
          style={styles.expandToggle}
          onPress={() => setExpandedId(isExpanded ? null : item.strongsNumber)}
          activeOpacity={0.7}
        >
          <Text variant="caption" weight="700" color={colors.textSecondary}>
            {isExpanded ? 'Show Less ▴' : 'Read Full Theological Study ▾'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAlphabetItem = ({ item, isLast }: { item: HebrewLetterGuide; isLast: boolean }) => {
    return (
      <View style={[styles.alphabetRow, !isLast && styles.rowDivider]}>
        <View style={styles.alphabetGlyphCol}>
          <Text style={styles.alphabetGlyph}>{item.letter}</Text>
          <Text variant="caption" weight="800" color={colors.accent}>
            {item.numericValue}
          </Text>
        </View>

        <View style={styles.alphabetDetailCol}>
          <View style={styles.alphabetTitleRow}>
            <Text variant="h3" weight="800" color={colors.textPrimary}>
              {item.name}
            </Text>
            <Text variant="caption" color={colors.textTertiary}>
              ({item.transliteration})
            </Text>
          </View>

          <Text variant="body" color={colors.textSecondary} style={styles.alphabetSoundText}>
            Sound: {item.sound}
          </Text>

          <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.paleoText}>
            Paleo Meaning: {item.paleoMeaning}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Segmented Mode Control: Word Studies vs Aleph-Bet */}
      <View style={styles.topControlSection}>
        <View style={styles.modeSegment}>
          <TouchableOpacity
            style={[
              styles.modeSegmentBtn,
              activeTab === 'words' && styles.modeSegmentBtnActive,
            ]}
            onPress={() => setActiveTab('words')}
            activeOpacity={0.8}
          >
            <Text
              variant="caption"
              weight="800"
              color={activeTab === 'words' ? '#0F172A' : colors.textSecondary}
            >
              Hebrew Word Studies ({filteredWords.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeSegmentBtn,
              activeTab === 'alphabet' && styles.modeSegmentBtnActive,
            ]}
            onPress={() => setActiveTab('alphabet')}
            activeOpacity={0.8}
          >
            <Text
              variant="caption"
              weight="800"
              color={activeTab === 'alphabet' ? '#0F172A' : colors.textSecondary}
            >
              Aleph-Bet Guide (22)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Word Studies Search & Filter Controls */}
        {activeTab === 'words' && (
          <>
            <View style={styles.searchInputContainer}>
              <SearchSvg size={16} color={colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Hebrew (e.g. shalom, hesed, H7965)..."
                placeholderTextColor={colors.textTertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <CloseSvg size={14} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>

            {/* Category Filter Pills */}
            <FlatList
              horizontal
              data={HEBREW_CATEGORIES}
              keyExtractor={(cat) => cat}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesRow}
              renderItem={({ item: cat }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryPill,
                    selectedCategory === cat && styles.categoryPillActive,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text
                    variant="caption"
                    weight="700"
                    color={selectedCategory === cat ? '#0F172A' : colors.textSecondary}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}
      </View>

      {/* Main Content Area */}
      {activeTab === 'words' ? (
        <FlatList
          data={filteredWords}
          keyExtractor={(item) => item.strongsNumber}
          renderItem={({ item, index }) =>
            renderWordItem({
              item,
              isLast: index === filteredWords.length - 1,
            })
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ScrollSvg size={36} color={colors.accent} />
              <Text variant="h3" style={styles.emptyTitle}>
                No Hebrew Terms Found
              </Text>
              <Text
                variant="body"
                color={colors.textSecondary}
                style={styles.emptyMessage}
              >
                No entries match "{searchQuery}" in {selectedCategory}. Try searching by transliteration or Strong's number.
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={HEBREW_ALPHABET_GUIDE}
          keyExtractor={(item) => item.letter}
          renderItem={({ item, index }) =>
            renderAlphabetItem({
              item,
              isLast: index === HEBREW_ALPHABET_GUIDE.length - 1,
            })
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Continuous flat 30% panel surface
  },
  topControlSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    backgroundColor: '#FFFFFF',
  },
  modeSegment: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    marginBottom: 8,
  },
  modeSegmentBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  modeSegmentBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    gap: 8,
    marginVertical: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  categoriesRow: {
    gap: 6,
    paddingVertical: 6,
  },
  categoryPill: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  categoryPillActive: {
    backgroundColor: '#FDD223',
  },

  listContent: {
    paddingBottom: 96,
  },

  // Continuous Flat Body Row Styling (No Card Divs)
  wordRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  headerLeftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareBtn: {
    padding: 4,
  },

  wordHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 14,
    marginVertical: 4,
  },
  hebrewScriptText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  transliterationCol: {
    flex: 1,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  definitionText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    color: colors.textPrimary,
    marginBottom: 8,
  },

  // Unboxed Exegesis Section (Continuous Body Flow)
  exegesisSection: {
    marginTop: 2,
    marginBottom: 8,
  },
  sectionLabel: {
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  exegesisText: {
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  // Unboxed Scripture Link (Part of Body)
  scriptureLink: {
    marginTop: 4,
    marginBottom: 6,
  },
  scriptureSnippetText: {
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 19,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  scriptureMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  expandToggle: {
    alignItems: 'flex-start',
    paddingVertical: 6,
    marginTop: 2,
  },

  // Continuous Body Alphabet Row (No Card Divs)
  alphabetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  alphabetGlyphCol: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alphabetGlyph: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  alphabetDetailCol: {
    flex: 1,
  },
  alphabetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  alphabetSoundText: {
    fontSize: 13,
    marginBottom: 2,
  },
  paleoText: {
    fontSize: 11.5,
    marginTop: 2,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 8,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});
