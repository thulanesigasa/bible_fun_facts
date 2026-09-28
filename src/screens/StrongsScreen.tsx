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
  StrongsIconSvg,
} from '../components/SvgIcons';
import {
  LexiconEntry,
  searchConcordance,
} from '../data/lexiconData';

interface StrongsScreenProps {
  navigation: any;
}

const ALPHABET_LETTERS = [
  'All',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

export default function StrongsScreen({ navigation }: StrongsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<'all' | 'hebrew' | 'greek'>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    return searchConcordance(searchQuery, selectedLang, selectedLetter);
  }, [searchQuery, selectedLang, selectedLetter]);

  const handleOpenScripture = (entry: LexiconEntry) => {
    if (entry.keyScripture?.book && entry.keyScripture?.chapter) {
      navigation.navigate('WOTD', {
        book: entry.keyScripture.book,
        chapter: entry.keyScripture.chapter,
        verse: entry.keyScripture.verse || 1,
      });
    }
  };

  const handleShareEntry = async (entry: LexiconEntry) => {
    try {
      const titleWord = entry.englishWord
        ? `${entry.englishWord} (${entry.strongsNumber})`
        : `Strong's ${entry.strongsNumber}: ${entry.transliteration}`;
      await Share.share({
        title: titleWord,
        message: `${entry.englishWord ? `${entry.englishWord.toUpperCase()} — ` : ''}Strong's ${entry.strongsNumber} (${entry.language.toUpperCase()})\nWord: ${entry.originalScript} (${entry.transliteration})\nPronunciation: ${entry.pronunciation}\nDefinition: ${entry.shortDefinition}\n\n"${entry.keyScripture.snippet}" — ${entry.keyScripture.reference}\n\nDiscovered on exégeomai.`,
      });
    } catch (e) {
      // User cancelled
    }
  };

  const renderConcordanceItem = ({ item, isLast }: { item: LexiconEntry; isLast: boolean }) => {
    const isExpanded = expandedId === item.strongsNumber;
    const isHebrew = item.language === 'hebrew';

    return (
      <View style={[styles.entryRow, !isLast && styles.rowDivider]}>
        {/* Row Header: English Word & Strong's Number & Language Label */}
        <View style={styles.rowHeader}>
          <View style={styles.headerLeftWrap}>
            <Text variant="h3" weight="800" color={colors.textPrimary}>
              {item.englishWord || item.transliteration}
            </Text>
            <Text variant="caption" weight="800" color={colors.accent} style={styles.strongsNumberText}>
              {`  ${item.strongsNumber}`}
            </Text>
            <Text variant="caption" weight="700" color={colors.textTertiary}>
              {` • ${isHebrew ? 'HEBREW OT' : 'KOINE GREEK NT'}`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={() => handleShareEntry(item)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={`Share ${item.englishWord || item.strongsNumber}`}
          >
            <ShareSvg size={15} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Original Script & Transliteration */}
        <View style={styles.wordRow}>
          <Text
            style={[
              styles.originalScriptText,
              isHebrew ? styles.hebrewScript : styles.greekScript,
            ]}
          >
            {item.originalScript}
          </Text>
          <View style={styles.transliterationBox}>
            <Text variant="body" weight="700" color={colors.textPrimary}>
              {item.transliteration}
            </Text>
            {item.pronunciation ? (
              <Text variant="caption" color={colors.textTertiary}>
                /{item.pronunciation}/
              </Text>
            ) : null}
          </View>
        </View>

        {/* Part of Speech & Origin */}
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

        {/* Expandable Theological Exegesis (Continuous Body Flow) */}
        {isExpanded && (
          <View style={styles.theologicalSection}>
            <Text variant="label" weight="800" color={colors.textTertiary} style={styles.theologicalHeader}>
              THEOLOGICAL EXEGESIS
            </Text>
            <Text style={styles.theologicalText}>
              {item.theologicalSignificance || item.exhaustiveDefinition}
            </Text>
          </View>
        )}

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
              {item.keyScripture.reference} • Open in Reader ›
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
            {isExpanded ? 'Show Less ▴' : 'Deep Dive Exegesis ▾'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Search Input Bar & Controls */}
      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <SearchSvg size={16} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search words (e.g. life, love, faith, H2416, G2222)..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
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

        {/* Language Filter Tabs */}
        <View style={styles.filterTabsRow}>
          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedLang === 'all' && styles.filterTabActive,
            ]}
            onPress={() => setSelectedLang('all')}
            activeOpacity={0.8}
          >
            <Text
              variant="caption"
              weight="700"
              color={selectedLang === 'all' ? '#0F172A' : colors.textSecondary}
            >
              All ({filteredEntries.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedLang === 'hebrew' && styles.filterTabActive,
            ]}
            onPress={() => setSelectedLang('hebrew')}
            activeOpacity={0.8}
          >
            <Text
              variant="caption"
              weight="700"
              color={selectedLang === 'hebrew' ? '#0F172A' : colors.textSecondary}
            >
              Hebrew (OT)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedLang === 'greek' && styles.filterTabActive,
            ]}
            onPress={() => setSelectedLang('greek')}
            activeOpacity={0.8}
          >
            <Text
              variant="caption"
              weight="700"
              color={selectedLang === 'greek' ? '#0F172A' : colors.textSecondary}
            >
              Greek (NT)
            </Text>
          </TouchableOpacity>
        </View>

        {/* A-to-Z Alphabetical Quick Browser */}
        <FlatList
          horizontal
          data={ALPHABET_LETTERS}
          keyExtractor={(letter) => letter}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.alphabetList}
          renderItem={({ item: letter }) => {
            const isActive = selectedLetter === letter;
            return (
              <TouchableOpacity
                style={[
                  styles.letterPill,
                  isActive && styles.letterPillActive,
                ]}
                onPress={() => setSelectedLetter(letter)}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={`Filter by letter ${letter}`}
              >
                <Text
                  variant="caption"
                  weight={isActive ? '800' : '600'}
                  color={isActive ? '#0F172A' : colors.textSecondary}
                  style={styles.letterText}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Concordance List */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => `${item.strongsNumber}-${item.englishWord || item.transliteration}`}
        renderItem={({ item, index }) =>
          renderConcordanceItem({
            item,
            isLast: index === filteredEntries.length - 1,
          })
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <StrongsIconSvg size={36} color={colors.accent} />
            <Text variant="h3" style={styles.emptyTitle}>
              No Concordance Entries Found
            </Text>
            <Text
              variant="body"
              color={colors.textSecondary}
              style={styles.emptyMessage}
            >
              No entries match "{searchQuery || selectedLetter}". Try searching for another biblical word (e.g. life, love, faith, peace) or Strong's ID.
            </Text>
            {(searchQuery.length > 0 || selectedLetter !== 'All' || selectedLang !== 'all') && (
              <TouchableOpacity
                style={styles.resetFilterBtn}
                onPress={() => {
                  setSearchQuery('');
                  setSelectedLetter('All');
                  setSelectedLang('all');
                }}
                activeOpacity={0.8}
              >
                <Text variant="caption" weight="700" color="#0F172A">
                  Reset All Filters
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Continuous flat 30% panel surface
  },
  searchSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  filterTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  filterTab: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  filterTabActive: {
    backgroundColor: '#FDD223',
  },

  // A-to-Z Alphabetical Horizontal List
  alphabetList: {
    gap: 5,
    paddingVertical: 8,
  },
  letterPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  letterPillActive: {
    backgroundColor: '#FDD223',
    borderColor: '#FDD223',
  },
  letterText: {
    fontSize: 11.5,
  },

  listContent: {
    paddingBottom: 96,
  },

  // Continuous Flat Body Row Styling (No Card Divs)
  entryRow: {
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
    marginBottom: 4,
  },
  headerLeftWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    flex: 1,
  },
  strongsNumberText: {
    marginRight: 2,
  },
  shareBtn: {
    padding: 4,
    marginLeft: 6,
  },

  wordRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginVertical: 4,
  },
  originalScriptText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  hebrewScript: {
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  greekScript: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  transliterationBox: {
    flex: 1,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  definitionText: {
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.textPrimary,
    marginBottom: 8,
  },

  // Unboxed Theological Exegesis (Part of Body)
  theologicalSection: {
    marginTop: 4,
    marginBottom: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
  },
  theologicalHeader: {
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  theologicalText: {
    fontSize: 13,
    lineHeight: 20,
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

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
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
  resetFilterBtn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FDD223',
  },
});
