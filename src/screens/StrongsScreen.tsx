import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemedAlert } from '../context/AlertContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme';
import { Text } from '../components/Typography';
import {
  SearchSvg,
  CloseSvg,
  BookOpenSvg,
  ShareSvg,
  StrongsIconSvg,
  DownloadSvg,
  TrashSvg,
} from '../components/SvgIcons';
import {
  LexiconEntry,
  searchConcordance,
} from '../data/lexiconData';
import {
  OfflineDictionaryMeta,
  getOfflineDictionaryStatus,
  downloadOfflineDictionary,
  deleteOfflineDictionary,
} from '../services/dictionaryOfflineService';

interface StrongsScreenProps {
  navigation: any;
}

const ALPHABET_LETTERS = [
  'All',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

export default function StrongsScreen({ navigation }: StrongsScreenProps) {
  const { showAlert } = useThemedAlert();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [offlineMeta, setOfflineMeta] = useState<OfflineDictionaryMeta | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    getOfflineDictionaryStatus().then(setOfflineMeta);
  }, []);

  // Single unified dictionary search across all biblical entries
  const filteredEntries = useMemo(() => {
    return searchConcordance(searchQuery, 'all', selectedLetter);
  }, [searchQuery, selectedLetter]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const meta = await downloadOfflineDictionary();
      setOfflineMeta(meta);
      setIsDownloading(false);
      showAlert({
        title: 'Offline Dictionary Ready',
        message: `The complete Strong's A-to-Z Biblical Dictionary (${meta.sizeFormatted}) is downloaded and saved to your device for 100% offline study.`,
        icon: 'success',
        buttons: [{ text: 'Done' }],
      });
    } catch {
      setIsDownloading(false);
      showAlert({
        title: 'Download Error',
        message: 'Could not cache offline dictionary to local storage. Please check device storage and try again.',
        icon: 'warning',
        buttons: [{ text: 'OK' }],
      });
    }
  };

  const handleRemoveDictionary = () => {
    showAlert({
      title: 'Remove Offline Dictionary?',
      message: `Are you sure you want to remove the Strong's A-to-Z Dictionary (${offlineMeta?.sizeFormatted || '2.4 MB'}) from this device?\n\nYou can re-download it anytime for offline study.`,
      icon: 'trash',
      isDestructive: true,
      buttons: [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await deleteOfflineDictionary();
            setOfflineMeta(null);
            showAlert({
              title: 'Dictionary Removed',
              message: 'The offline Strong\'s dictionary cache has been deleted from your device.',
              icon: 'info',
              buttons: [{ text: 'OK' }],
            });
          },
        },
      ],
    });
  };

  const handleOpenDetail = (entry: LexiconEntry) => {
    (navigation as any).navigate('StrongsDetail', { entry });
  };

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
        message: `${entry.englishWord ? `${entry.englishWord.toUpperCase()} — ` : ''}Strong's ${entry.strongsNumber}\nWord: ${entry.originalScript} (${entry.transliteration})\nPronunciation: ${entry.pronunciation}\nDefinition: ${entry.shortDefinition}\n\n"${entry.keyScripture.snippet}" — ${entry.keyScripture.reference}\n\nDiscovered on exégeomai — Complete Biblical Dictionary.`,
      });
    } catch {
      // User cancelled
    }
  };

  const renderConcordanceItem = ({ item, isLast }: { item: LexiconEntry; isLast: boolean }) => {
    const isExpanded = expandedId === item.strongsNumber;
    const isHebrew = item.language === 'hebrew';

    return (
      <View style={[styles.entryRow, !isLast && styles.rowDivider]}>
        {/* Row Header: English Word & Strong's Number (Single Unified Dictionary) */}
        <View style={styles.rowHeader}>
          <TouchableOpacity
            style={styles.headerLeftWrap}
            onPress={() => handleOpenDetail(item)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Open Lexical Study for ${item.englishWord || item.strongsNumber}`}
          >
            <Text variant="h3" weight="800" color={colors.textPrimary}>
              {item.englishWord || item.transliteration}
            </Text>
            <Text variant="caption" weight="800" color="#B45309" style={styles.strongsNumberText}>
              {`  ${item.strongsNumber}`}
            </Text>
          </TouchableOpacity>

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
        <TouchableOpacity
          style={styles.wordRow}
          onPress={() => handleOpenDetail(item)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Open Lexical Study for ${item.transliteration}`}
        >
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
        </TouchableOpacity>

        {/* Part of Speech & Origin */}
        <View style={styles.metaRow}>
          <Text variant="caption" weight="700" color="#B45309">
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

        {/* Full Lexical Study Detail Navigation Button (Signature Yellow Accent) */}
        <TouchableOpacity
          style={styles.detailStudyLink}
          onPress={() => handleOpenDetail(item)}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel={`Open Lexical Study for ${item.englishWord || item.strongsNumber}`}
        >
          <Text variant="caption" weight="800" color="#B45309">
            View Full Lexical Study & Concordance ›
          </Text>
        </TouchableOpacity>

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
            <BookOpenSvg size={12} color="#B45309" />
            <Text variant="caption" weight="800" color="#B45309">
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
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      {/* Search Input Bar & Controls */}
      <View style={styles.searchSection}>
        {/* Search Input Row with inline download icon button */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <SearchSvg size={16} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search dictionary (life, love, zaó, G2222)..."
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
                accessibilityRole="button"
                accessibilityLabel="Clear search input"
              >
                <CloseSvg size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={offlineMeta?.isDownloaded ? handleRemoveDictionary : handleDownload}
            disabled={isDownloading}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={
              offlineMeta?.isDownloaded
                ? 'Remove downloaded offline dictionary'
                : 'Download dictionary for offline use'
            }
          >
            {isDownloading ? (
              <ActivityIndicator size="small" color="#B45309" />
            ) : offlineMeta?.isDownloaded ? (
              <TrashSvg size={20} color="#DC2626" />
            ) : (
              <DownloadSvg size={20} color="#B45309" />
            )}
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
            <StrongsIconSvg size={40} color={colors.textTertiary} />
            <Text variant="h3" color={colors.textPrimary}>
              No Words Found
            </Text>
            <Text
              variant="body"
              color={colors.textSecondary}
              style={styles.emptyMessage}
            >
              No entries match "{searchQuery || selectedLetter}". Try searching for another biblical word (e.g. life, love, faith, peace) or Strong's ID.
            </Text>
            {(searchQuery.length > 0 || selectedLetter !== 'All') && (
              <TouchableOpacity
                style={styles.resetFilterBtn}
                onPress={() => {
                  setSearchQuery('');
                  setSelectedLetter('All');
                }}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Reset Search and Letter Filter"
              >
                <Text variant="caption" weight="800" color="#B45309" style={styles.resetFilterText}>
                  Reset All Filters ›
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
    backgroundColor: '#F8FAFC',
  },
  searchSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    backgroundColor: '#FFFFFF',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  actionIconBtn: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    padding: 0,
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
  entryRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
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
    writingDirection: 'rtl',
  },
  greekScript: {
    writingDirection: 'ltr',
  },
  transliterationBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    flexWrap: 'wrap',
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
    marginBottom: 4,
  },
  detailStudyLink: {
    paddingVertical: 4,
    marginBottom: 6,
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
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 8,
    paddingHorizontal: spacing.xl,
  },
  emptyMessage: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  resetFilterBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  resetFilterText: {
    fontSize: 13,
  },
});
