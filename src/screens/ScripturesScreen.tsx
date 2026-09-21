import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { scriptures as initialScriptures, Scripture, Genre } from '../data/mockDatabase';
import { useUser } from '../context/UserContext';
import { supabase } from '../services/supabase';
import {
  SearchSvg,
  ScripturesSvg,
  FavoritesSvg,
  ShareSvg,
  ChevronRightSvg,
  StrongsIconSvg,
  XCloseSvg,
} from '../components/SvgIcons';

const QUICK_SEARCH_CHIPS = [
  'John 3:16',
  'Psalm 23',
  'Romans 8',
  'Genesis 1',
  'Galatians 5',
  'Ephesians 6',
  'Grace',
  'Peace',
];

const GENRE_FILTERS: (Genre | 'All')[] = ['All', 'Gospel', 'Wisdom', 'Prophecy', 'Epistle'];

export default function ScripturesScreen({ navigation }: { navigation: any }) {
  const [searchText, setSearchText] = useState('');
  const [activeGenre, setActiveGenre] = useState<Genre | 'All'>('All');
  const [displayCount, setDisplayCount] = useState(3);
  const [liveScriptures, setLiveScriptures] = useState<Scripture[]>(initialScriptures);

  const { isScriptureFavorited, toggleFavoriteScripture } = useUser();

  const fetchLiveScriptures = async () => {
    try {
      const { data, error } = await supabase
        .from('scriptures')
        .select('*')
        .order('created_at', { ascending: false });
      if (data && !error && data.length > 0) {
        setLiveScriptures(data as Scripture[]);
      }
    } catch (err) {
      console.warn('Live scriptures fetch notice:', err);
    }
  };

  React.useEffect(() => {
    fetchLiveScriptures();
  }, []);

  const filteredScriptures = useMemo(() => {
    return liveScriptures.filter((s) => {
      const q = searchText.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        s.reference.toLowerCase().includes(q) ||
        s.text.toLowerCase().includes(q) ||
        s.book.toLowerCase().includes(q) ||
        s.strongs_word.toLowerCase().includes(q) ||
        s.strongs_transliteration.toLowerCase().includes(q) ||
        s.strongs_number.toLowerCase().includes(q) ||
        (s.tags && s.tags.some((t) => t.toLowerCase().includes(q)));

      const matchGenre = activeGenre === 'All' || s.genre === activeGenre;

      return matchSearch && matchGenre;
    });
  }, [liveScriptures, searchText, activeGenre]);

  const displayedList = useMemo(() => {
    // If searching actively, show up to 4 exact matches to keep view focused
    if (searchText.trim() !== '') {
      return filteredScriptures.slice(0, 4);
    }
    return filteredScriptures.slice(0, displayCount);
  }, [filteredScriptures, searchText, displayCount]);

  const onShareScripture = async (scripture: Scripture) => {
    try {
      const message = `"${scripture.text}"\n- ${scripture.reference}\n\nRoot: ${scripture.strongs_transliteration} (${scripture.strongs_number}) - "${scripture.strongs_definition}"`;
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChip = (chip: string) => {
    setSearchText(chip);
    setDisplayCount(3);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setDisplayCount(3);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerIconWrap}>
            <ScripturesSvg size={20} color={colors.accent} fill={colors.accentSoft} />
          </View>
          <View style={styles.headerTextWrap}>
            <Text variant="h2" style={styles.title}>Scripture Finder</Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.subtitle}>
              Search verses, topics, or original lexical roots
            </Text>
          </View>
        </View>

        {/* Focused Search Bar */}
        <View style={[styles.searchContainer, shadow.sm]}>
          <SearchSvg size={16} color={colors.accent} />
          <TextInput
            style={styles.searchInput}
            placeholder="Type a book, verse (e.g. John 3), or root..."
            placeholderTextColor={colors.textTertiary}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              setDisplayCount(3);
            }}
            clearButtonMode="never"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearSearchBtn}>
              <XCloseSvg size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* 1-Tap Quick Search Chips */}
        <View style={styles.chipsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsScroll}
          >
            {QUICK_SEARCH_CHIPS.map((chip) => {
              const isSelected = searchText.toLowerCase() === chip.toLowerCase();
              return (
                <TouchableOpacity
                  key={chip}
                  style={[styles.quickChip, isSelected && styles.quickChipActive]}
                  onPress={() => handleSelectChip(chip)}
                  activeOpacity={0.8}
                >
                  <Text
                    variant="caption"
                    weight={isSelected ? '700' : '500'}
                    style={[styles.quickChipText, isSelected && styles.quickChipTextActive]}
                  >
                    {chip}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Genre Filter Tabs */}
        <View style={styles.genreRow}>
          {GENRE_FILTERS.map((genre) => {
            const isActive = activeGenre === genre;
            return (
              <TouchableOpacity
                key={genre}
                style={[styles.genreTab, isActive && styles.genreTabActive]}
                onPress={() => {
                  setActiveGenre(genre);
                  setDisplayCount(3);
                }}
                activeOpacity={0.8}
              >
                <Text
                  variant="caption"
                  weight={isActive ? '700' : '500'}
                  style={[styles.genreTabText, isActive && styles.genreTabTextActive]}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Search Results Summary */}
        <View style={styles.countRow}>
          <Text variant="caption" color={colors.textSecondary}>
            {filteredScriptures.length === 0
              ? 'No matching scriptures found'
              : `Showing ${displayedList.length} of ${filteredScriptures.length} result${filteredScriptures.length !== 1 ? 's' : ''}`}
          </Text>
        </View>

        {/* Compact, Focused Verse Cards */}
        <View style={styles.scripturesList}>
          {displayedList.map((scripture) => {
            const isFavorited = isScriptureFavorited(scripture.id);

            return (
              <TouchableOpacity
                key={scripture.id}
                activeOpacity={0.88}
                onPress={() => navigation.navigate('ScriptureDetails', { scripture })}
              >
                <View style={[styles.compactCard, shadow.sm]}>
                  {/* Top line: Reference + Genre + Actions */}
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.referenceWrap}>
                      <Text variant="h3" color={colors.accent} style={styles.cardReference}>
                        {scripture.reference}
                      </Text>
                      <Text variant="caption" color={colors.textTertiary}>
                        • {scripture.genre}
                      </Text>
                    </View>

                    <View style={styles.cardActionsRow}>
                      <TouchableOpacity
                        onPress={() => toggleFavoriteScripture(scripture)}
                        style={styles.iconBtn}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <FavoritesSvg
                          size={16}
                          color={colors.accent}
                          fill={isFavorited ? colors.accent : 'none'}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => onShareScripture(scripture)}
                        style={styles.iconBtn}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <ShareSvg size={16} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Full scripture text (no truncation) */}
                  <Text
                    variant="body"
                    color={colors.textPrimary}
                    style={styles.verseExcerpt}
                  >
                    "{scripture.text}"
                  </Text>

                  {/* Strong's Root info (full definition) */}
                  <View style={styles.cardFooterRow}>
                    <View style={styles.strongsPill}>
                      <StrongsIconSvg size={12} color={colors.accent} />
                      <Text variant="caption" color={colors.accent} weight="600" style={styles.strongsWordText}>
                        {scripture.strongs_transliteration} ({scripture.strongs_number})
                      </Text>
                      <Text variant="caption" color={colors.textTertiary} style={styles.strongsDefText}>
                        • {scripture.strongs_definition}
                      </Text>
                    </View>

                    <ChevronRightSvg size={14} color={colors.textTertiary} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Load More / Next Page Button (Avoids scroll fatigue) */}
        {filteredScriptures.length > displayedList.length && (
          <TouchableOpacity
            style={styles.showMoreBtn}
            onPress={() => setDisplayCount((prev) => prev + 3)}
            activeOpacity={0.8}
          >
            <Text variant="caption" weight="700" color={colors.accent}>
              Load Next {Math.min(3, filteredScriptures.length - displayedList.length)} Verses ›
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 96,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: 10,
  },
  headerIconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    gap: 8,
    marginBottom: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    padding: 0,
  },
  clearSearchBtn: {
    padding: 2,
  },
  chipsSection: {
    marginBottom: spacing.sm,
  },
  chipsScroll: {
    gap: 6,
    paddingVertical: 2,
  },
  quickChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  quickChipActive: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  quickChipText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  quickChipTextActive: {
    color: colors.accent,
  },
  genreRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    borderRadius: radius.sm,
    padding: 2,
    marginBottom: 6,
    gap: 4,
  },
  genreTab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: radius.sm - 2,
  },
  genreTabActive: {
    backgroundColor: '#FFFFFF',
    ...shadow.sm,
  },
  genreTabText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  genreTabTextActive: {
    color: colors.accent,
  },
  countRow: {
    marginVertical: 4,
  },
  scripturesList: {
    gap: 8,
  },
  compactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  referenceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  cardReference: {
    fontSize: 14,
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    padding: 2,
  },
  verseExcerpt: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textPrimary,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.04)',
  },
  strongsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    marginRight: 6,
  },
  strongsWordText: {
    fontSize: 11,
  },
  strongsDefText: {
    fontSize: 11,
    flex: 1,
  },
  showMoreBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    marginTop: 8,
  },
});
