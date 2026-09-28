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

export default function StrongsScreen({ navigation }: StrongsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<'all' | 'hebrew' | 'greek'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    return searchConcordance(searchQuery, selectedLang);
  }, [searchQuery, selectedLang]);

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
      await Share.share({
        title: `Strong's ${entry.strongsNumber}: ${entry.transliteration}`,
        message: `Strong's ${entry.strongsNumber} (${entry.language.toUpperCase()})\nWord: ${entry.originalScript} (${entry.transliteration})\nPronunciation: ${entry.pronunciation}\nDefinition: ${entry.shortDefinition}\n\n"${entry.keyScripture.snippet}" — ${entry.keyScripture.reference}\n\nDiscovered on exégeomai.`,
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
        {/* Row Header: Strong's Number & Language Label (Seamless Body Text) */}
        <View style={styles.rowHeader}>
          <View style={styles.headerLeftWrap}>
            <Text variant="caption" weight="800" color="#0F172A">
              {item.strongsNumber}
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
            accessibilityLabel={`Share Strong's ${item.strongsNumber}`}
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
            <Text variant="h3" weight="800" color={colors.textPrimary}>
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
      {/* Search Input Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <SearchSvg size={16} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Strong's (e.g. H7965, G1834, shalom, grace)..."
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
      </View>

      {/* Concordance List */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.strongsNumber}
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
              Try searching by Strong's number (e.g. H7965, G1834) or by root English definition.
            </Text>
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
    paddingBottom: spacing.sm,
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
    marginTop: 10,
  },
  filterTab: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  filterTabActive: {
    backgroundColor: '#FDD223',
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
    marginBottom: 6,
  },
  headerLeftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareBtn: {
    padding: 4,
  },

  wordRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginVertical: 4,
  },
  originalScriptText: {
    fontSize: 26,
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
    marginTop: 6,
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
