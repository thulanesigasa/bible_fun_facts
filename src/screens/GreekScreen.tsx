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
  ScripturesSvg,
} from '../components/SvgIcons';
import {
  LexiconEntry,
  getGreekLexicon,
  GREEK_ALPHABET_GUIDE,
  GreekLetterGuide,
} from '../data/lexiconData';

interface GreekScreenProps {
  navigation: any;
}

const GREEK_CATEGORIES = [
  'All',
  'Christology',
  'Grace & Salvation',
  'Holy Spirit',
  'Love & Fellowship',
  'Righteousness',
];

export default function GreekScreen({ navigation }: GreekScreenProps) {
  const [activeTab, setActiveTab] = useState<'words' | 'alphabet'>('words');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredWords = useMemo(() => {
    return getGreekLexicon(selectedCategory, searchQuery);
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
        title: `Koine Greek Study: ${entry.transliteration} (${entry.originalScript})`,
        message: `Koine Greek Study (${entry.strongsNumber})\nWord: ${entry.originalScript} (${entry.transliteration})\nMeaning: ${entry.shortDefinition}\n\nApostolic Exegesis: ${entry.theologicalSignificance}\n\n"${entry.keyScripture.snippet}" — ${entry.keyScripture.reference}\n\nDiscovered on exégeomai.`,
      });
    } catch (e) {
      // User cancelled
    }
  };

  const renderWordItem = ({ item }: { item: LexiconEntry }) => {
    const isExpanded = expandedId === item.strongsNumber;

    return (
      <View style={styles.card}>
        {/* Card Header: Category & Strong's Tag */}
        <View style={styles.cardHeader}>
          <View style={styles.strongsBadge}>
            <Text variant="caption" weight="800" color="#0F172A">
              {item.strongsNumber}
            </Text>
          </View>
          <View style={styles.categoryBadge}>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.categoryText}>
              {item.category.toUpperCase()}
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

        {/* Greek Script & Transliteration */}
        <View style={styles.wordHeaderRow}>
          <Text style={styles.greekScriptText}>{item.originalScript}</Text>
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

        {/* Deep Dive Apostolic Exegesis */}
        <View style={styles.exegesisSection}>
          <Text variant="caption" weight="800" color={colors.textTertiary} style={styles.sectionLabel}>
            APOSTOLIC THEOLOGY & NT CONTEXT
          </Text>
          <Text
            style={styles.exegesisText}
            numberOfLines={isExpanded ? undefined : 3}
          >
            {item.theologicalSignificance}
          </Text>
        </View>

        {/* Key Scripture Passage Box */}
        <TouchableOpacity
          style={styles.scriptureBox}
          activeOpacity={0.8}
          onPress={() => handleOpenScripture(item)}
          accessibilityRole="button"
          accessibilityLabel={`Open ${item.keyScripture.reference} in Word Reader`}
        >
          <View style={styles.scriptureHeader}>
            <View style={styles.scriptureRefRow}>
              <BookOpenSvg size={13} color={colors.accent} />
              <Text variant="caption" weight="800" color={colors.accent}>
                {item.keyScripture.reference}
              </Text>
            </View>
            <Text variant="caption" color={colors.accent} weight="700">
              Open in Word Reader ›
            </Text>
          </View>
          <Text style={styles.scriptureSnippetText} numberOfLines={2}>
            "{item.keyScripture.snippet}"
          </Text>
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

  const renderAlphabetItem = ({ item }: { item: GreekLetterGuide }) => {
    return (
      <View style={styles.alphabetRow}>
        <View style={styles.alphabetLetterBox}>
          <Text style={styles.alphabetGlyph}>{item.letter}</Text>
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

          <View style={styles.theologyNoteBox}>
            <Text variant="caption" weight="700" color="#0F172A">
              {item.theologicalSignificance}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Segmented Mode Control: Word Studies vs Alpha-Omega */}
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
              Greek Word Studies ({filteredWords.length})
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
              Alpha-Omega Guide (24)
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
                placeholder="Search Greek (e.g. agape, logos, G1834)..."
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
              data={GREEK_CATEGORIES}
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
          renderItem={renderWordItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ScripturesSvg size={36} color={colors.accent} />
              <Text variant="h3" style={styles.emptyTitle}>
                No Greek Terms Found
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
          data={GREEK_ALPHABET_GUIDE}
          keyExtractor={(item) => item.letter}
          renderItem={renderAlphabetItem}
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 96,
  },

  // Word Study Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  strongsBadge: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginLeft: 6,
    marginRight: 'auto',
  },
  categoryText: {
    fontSize: 10,
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
  greekScriptText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
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

  exegesisSection: {
    backgroundColor: '#FAFAF9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  exegesisText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },

  scriptureBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.05)',
  },
  scriptureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  scriptureRefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  scriptureSnippetText: {
    fontSize: 12.5,
    fontStyle: 'italic',
    lineHeight: 18,
    color: colors.textSecondary,
  },

  expandToggle: {
    alignItems: 'center',
    paddingVertical: 6,
    marginTop: 4,
  },

  // Alphabet Guide Row
  alphabetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    padding: 12,
    marginBottom: 10,
    gap: 14,
  },
  alphabetLetterBox: {
    width: 58,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#E0F2FE',
    borderWidth: 1,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alphabetGlyph: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  alphabetDetailCol: {
    flex: 1,
  },
  alphabetTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 2,
  },
  alphabetSoundText: {
    fontSize: 12,
    marginBottom: 4,
  },
  theologyNoteBox: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
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
