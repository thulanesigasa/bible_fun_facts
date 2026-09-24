import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  Keyboard,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { BIBLICAL_WRITERS, BiblicalWriter } from '../data/biblicalWriters';
import {
  SearchSvg,
  CloseSvg,
  FeatherPenSvg,
  BookOpenSvg,
  ScrollSvg,
  ChevronRightSvg,
  StrongsIconSvg,
} from '../components/SvgIcons';

const CATEGORIES = [
  'All',
  'Torah & History',
  'Major Prophets',
  'Minor Prophets',
  'Gospels',
  'Pauline Epistles',
  'General Epistles',
  'Wisdom',
];

interface SearchSuggestion {
  writer: BiblicalWriter;
  matchType: 'name' | 'book' | 'strongs' | 'role';
  matchDetail: string;
}

interface HistoryScreenProps {
  navigation: any;
}

export default function HistoryScreen({ navigation }: HistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const { width } = useWindowDimensions();
  const CARD_WIDTH = Math.min(width - 32, 380);

  // 1. Filtered Writers based on category and query
  const filteredWriters = useMemo(() => {
    let result = BIBLICAL_WRITERS;

    if (selectedCategory !== 'All') {
      result = result.filter((w) => w.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((w) => {
        return (
          w.name.toLowerCase().includes(q) ||
          w.originalName.toLowerCase().includes(q) ||
          w.transliteration.toLowerCase().includes(q) ||
          w.role.toLowerCase().includes(q) ||
          w.era.toLowerCase().includes(q) ||
          w.booksWritten.some((book) => book.toLowerCase().includes(q)) ||
          (w.linguisticProfile && (
            w.linguisticProfile.strongsRef.toLowerCase().includes(q) ||
            w.linguisticProfile.rootWord.toLowerCase().includes(q) ||
            w.linguisticProfile.literalMeaning.toLowerCase().includes(q)
          ))
        );
      });
    }

    return result;
  }, [searchQuery, selectedCategory]);

  // 2. Strict 5-Character Swiping Dataset
  const displayedWriters = useMemo(() => {
    return filteredWriters.slice(0, 5);
  }, [filteredWriters]);

  // 3. Real-Time Search Assistant Autocomplete Suggestions
  const suggestions = useMemo<SearchSuggestion[]>(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    const results: SearchSuggestion[] = [];
    const addedIds = new Set<string>();

    for (const writer of BIBLICAL_WRITERS) {
      if (addedIds.has(writer.id)) continue;

      // Match A: Name or Original script
      if (
        writer.name.toLowerCase().includes(q) ||
        writer.originalName.toLowerCase().includes(q) ||
        writer.transliteration.toLowerCase().includes(q)
      ) {
        results.push({
          writer,
          matchType: 'name',
          matchDetail: `${writer.category} • ${writer.era}`,
        });
        addedIds.add(writer.id);
        continue;
      }

      // Match B: Book Penned
      const matchedBook = writer.booksWritten.find((b) => b.toLowerCase().includes(q));
      if (matchedBook) {
        results.push({
          writer,
          matchType: 'book',
          matchDetail: `Penned ${matchedBook} (${writer.totalChapters} chs)`,
        });
        addedIds.add(writer.id);
        continue;
      }

      // Match C: Strong's Number or Linguistic Root
      if (
        writer.linguisticProfile &&
        (writer.linguisticProfile.strongsRef.toLowerCase().includes(q) ||
          writer.linguisticProfile.rootWord.toLowerCase().includes(q) ||
          writer.linguisticProfile.literalMeaning.toLowerCase().includes(q))
      ) {
        results.push({
          writer,
          matchType: 'strongs',
          matchDetail: `Strong's ${writer.linguisticProfile.strongsRef} • "${writer.linguisticProfile.literalMeaning}"`,
        });
        addedIds.add(writer.id);
        continue;
      }

      // Match D: Sacred Office / Role
      if (writer.role.toLowerCase().includes(q)) {
        results.push({
          writer,
          matchType: 'role',
          matchDetail: writer.role,
        });
        addedIds.add(writer.id);
        continue;
      }
    }

    return results.slice(0, 5);
  }, [searchQuery]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setActiveIndex(0);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setActiveIndex(0);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    Keyboard.dismiss();
    setIsSearchFocused(false);
    setSearchQuery(suggestion.writer.name);
    navigation.navigate('WriterDetails', { writer: suggestion.writer });
  };

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const itemInterval = CARD_WIDTH + 12;
      const index = Math.round(offsetX / itemInterval);
      if (index >= 0 && index < displayedWriters.length && index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    [CARD_WIDTH, displayedWriters.length, activeIndex]
  );

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < displayedWriters.length) {
      setActiveIndex(index);
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: CARD_WIDTH + 12,
      offset: (CARD_WIDTH + 12) * index,
      index,
    }),
    [CARD_WIDTH]
  );

  const renderSwipeCard = ({ item }: { item: BiblicalWriter; index: number }) => {
    const displayedBooks = item.booksWritten.slice(0, 3);
    const extraBooksCount = item.booksWritten.length - 3;

    return (
      <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
        <ScrollView
          style={styles.cardInnerScroll}
          contentContainerStyle={styles.cardContent}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {/* Card Top Category & Hebrew/Greek Script */}
          <View style={styles.cardHeaderRow}>
            <Text variant="caption" weight="800" color={colors.accent} style={styles.cardCategoryLabel}>
              {item.testament.toUpperCase()} • {item.category.toUpperCase()}
            </Text>
            <Text variant="h2" style={styles.cardOriginalScript}>
              {item.originalName}
            </Text>
          </View>

          {/* Name & Transliteration */}
          <View style={styles.cardNameBlock}>
            <Text variant="h1" style={styles.cardWriterName}>
              {item.name}
            </Text>
            <Text variant="caption" color={colors.accent} weight="700" style={styles.cardTransliteration}>
              {item.transliteration}
            </Text>
            <Text variant="caption" color={colors.textTertiary} style={styles.cardEraText}>
              {item.era}
            </Text>
          </View>

          <View style={styles.cardHairline} />

          {/* Sacred Role */}
          <View style={styles.cardInfoRow}>
            <FeatherPenSvg size={14} color={colors.accent} style={{ marginTop: 2 }} />
            <Text variant="body" color={colors.textPrimary} style={styles.cardRoleText}>
              {item.role}
            </Text>
          </View>

          {/* Canonical Books Penned */}
          <View style={styles.cardInfoRow}>
            <BookOpenSvg size={14} color={colors.textSecondary} style={{ marginTop: 2 }} />
            <Text variant="caption" color={colors.textSecondary} style={styles.cardBooksText}>
              Books: {displayedBooks.join(', ')}
              {extraBooksCount > 0 ? ` (+${extraBooksCount} more)` : ''} • {item.totalChapters} chapters
            </Text>
          </View>

          {/* Strong's Concordance Quick Reference */}
          {item.linguisticProfile && (
            <View style={styles.cardStrongsBox}>
              <View style={styles.strongsPill}>
                <Text variant="caption" weight="800" color={colors.textPrimary}>
                  {item.linguisticProfile.strongsRef}
                </Text>
              </View>
              <Text variant="caption" color={colors.textSecondary} style={{ flex: 1 }}>
                Root: <Text variant="caption" weight="700" color={colors.textPrimary}>{item.linguisticProfile.rootWord}</Text> ("{item.linguisticProfile.literalMeaning}")
              </Text>
            </View>
          )}

          {/* Key Canonical Scripture */}
          <View style={styles.cardQuoteBox}>
            <Text variant="body" numberOfLines={3} style={styles.cardQuoteText}>
              "{item.keyVerse.text}"
            </Text>
            <Text variant="caption" color={colors.textSecondary} weight="700" style={styles.cardQuoteRef}>
              — {item.keyVerse.reference}
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.cardActionBtn}
            onPress={() => navigation.navigate('WriterDetails', { writer: item })}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`Explore complete history of ${item.name}`}
          >
            <Text variant="label" weight="800" color="#0F172A">
              Explore Biography, Timelines & Facts ›
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      {/* Header Bar */}
      <View style={styles.header}>
        <Text variant="h2" style={styles.screenTitle}>
          Sacred History
        </Text>
        <Text variant="caption" color={colors.textSecondary} style={styles.screenSub}>
          Swipe through biblical authors with real-time search assistant
        </Text>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, isSearchFocused && styles.searchBarFocused]}>
          <SearchSvg size={16} color={colors.accent} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search authors, books, Strong's (e.g. Moses, Gen)..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => {
              // Delay hide slightly so tap on suggestion registers
              setTimeout(() => setIsSearchFocused(false), 200);
            }}
            returnKeyType="search"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setIsSearchFocused(false);
              }}
              style={styles.clearBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <CloseSvg size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Real-Time Autocomplete Search Assistant */}
        {isSearchFocused && suggestions.length > 0 && (
          <View style={styles.assistantOverlay}>
            {suggestions.map((item, idx) => (
              <TouchableOpacity
                key={item.writer.id}
                style={[
                  styles.suggestionRow,
                  idx < suggestions.length - 1 && styles.suggestionRowDivider,
                ]}
                onPress={() => handleSelectSuggestion(item)}
                activeOpacity={0.7}
              >
                <View style={styles.suggestionLeft}>
                  <View style={styles.suggestionIconWrap}>
                    {item.matchType === 'book' ? (
                      <BookOpenSvg size={14} color={colors.accent} />
                    ) : item.matchType === 'strongs' ? (
                      <StrongsIconSvg size={14} color={colors.accent} />
                    ) : (
                      <FeatherPenSvg size={14} color={colors.accent} />
                    )}
                  </View>
                  <View style={styles.suggestionTextWrap}>
                    <View style={styles.suggestionTitleRow}>
                      <Text variant="body" weight="800" color={colors.textPrimary}>
                        {item.writer.name}
                      </Text>
                      <Text variant="caption" color={colors.accent} weight="700">
                        {item.writer.originalName}
                      </Text>
                    </View>
                    <Text variant="caption" color={colors.textSecondary} numberOfLines={1}>
                      {item.matchDetail}
                    </Text>
                  </View>
                </View>
                <ChevronRightSvg size={16} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Category Filter Pills (Horizontal non-scrolling screen) */}
      <View style={styles.categoryScrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterPill,
                  isSelected && styles.filterPillActive,
                ]}
                onPress={() => handleSelectCategory(category)}
                activeOpacity={0.8}
              >
                <Text
                  variant="caption"
                  weight={isSelected ? '700' : '600'}
                  color={isSelected ? '#0F172A' : colors.textSecondary}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Swipeable Area */}
      {displayedWriters.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ScrollSvg size={40} color={colors.accent} />
          <Text variant="h3" style={styles.emptyTitle}>
            No Biblical Writers Found
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.emptyText}>
            No authors match "{searchQuery}". Try using the search assistant above or resetting filters.
          </Text>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setActiveIndex(0);
            }}
          >
            <Text variant="caption" weight="700" color="#0F172A">
              Reset Filters
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.swiperWrapper}>
          {/* Horizontal Swiping FlatList */}
          <FlatList
            ref={flatListRef}
            data={displayedWriters}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled={false}
            snapToInterval={CARD_WIDTH + 12}
            snapToAlignment="center"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: (width - CARD_WIDTH) / 2,
              paddingVertical: 4,
            }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            getItemLayout={getItemLayout}
            renderItem={renderSwipeCard}
          />

          {/* 5-Dot Pagination Indicator & Quick Arrow Navigation */}
          <View style={styles.paginationRow}>
            <TouchableOpacity
              style={[styles.arrowNavBtn, activeIndex === 0 && styles.arrowNavBtnDisabled]}
              onPress={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              accessibilityLabel="Previous character"
              activeOpacity={0.7}
            >
              <Text
                variant="caption"
                weight="800"
                color={activeIndex === 0 ? '#CBD5E1' : colors.textPrimary}
                style={{ fontSize: 18, lineHeight: 20 }}
              >
                ‹
              </Text>
            </TouchableOpacity>

            <View style={styles.dotsWrap}>
              {displayedWriters.map((_, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => scrollToIndex(idx)}
                    style={[styles.dot, isActive && styles.dotActive]}
                    accessibilityLabel={`Jump to character ${idx + 1}`}
                  />
                );
              })}
            </View>

            <TouchableOpacity
              style={[
                styles.arrowNavBtn,
                activeIndex === displayedWriters.length - 1 && styles.arrowNavBtnDisabled,
              ]}
              onPress={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === displayedWriters.length - 1}
              accessibilityLabel="Next character"
              activeOpacity={0.7}
            >
              <Text
                variant="caption"
                weight="800"
                color={activeIndex === displayedWriters.length - 1 ? '#CBD5E1' : colors.textPrimary}
                style={{ fontSize: 18, lineHeight: 20 }}
              >
                ›
              </Text>
            </TouchableOpacity>
          </View>

          {/* Swipe Cue & Counter Label */}
          <Text variant="caption" color={colors.textTertiary} weight="700" style={styles.swipeCueText}>
            SWIPE TO EXPLORE • {activeIndex + 1} OF {displayedWriters.length}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  screenTitle: {
    color: colors.textPrimary,
  },
  screenSub: {
    marginTop: 2,
  },

  // Search Bar & Assistant
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: 4,
    position: 'relative',
    zIndex: 99,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    gap: 8,
  },
  searchBarFocused: {
    borderColor: colors.accent,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 2,
  },

  // Autocomplete Search Assistant Overlay
  assistantOverlay: {
    position: 'absolute',
    top: 48,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 999,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  suggestionRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  suggestionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  suggestionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(253, 210, 35, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionTextWrap: {
    flex: 1,
  },
  suggestionTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },

  // Categories Horizontal Row
  categoryScrollContainer: {
    marginTop: 6,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  categoryScrollContent: {
    paddingHorizontal: spacing.lg,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.full,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  filterPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },

  // Swiper Wrapper & Cards
  swiperWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  cardContainer: {
    marginRight: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    overflow: 'hidden',
  },
  cardInnerScroll: {
    flex: 1,
  },
  cardContent: {
    padding: 16,
    paddingBottom: 20,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cardCategoryLabel: {
    letterSpacing: 0.5,
    flex: 1,
    marginRight: 8,
  },
  cardOriginalScript: {
    fontSize: 22,
    color: colors.accent,
    fontWeight: '800',
  },
  cardNameBlock: {
    marginTop: 2,
  },
  cardWriterName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  cardTransliteration: {
    fontSize: 13,
    marginTop: 2,
  },
  cardEraText: {
    fontSize: 11.5,
    marginTop: 2,
  },
  cardHairline: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: 10,
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  cardRoleText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  cardBooksText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
  },
  cardStrongsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: 8,
  },
  strongsPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  cardQuoteBox: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    marginVertical: 8,
  },
  cardQuoteText: {
    fontStyle: 'italic',
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  cardQuoteRef: {
    marginTop: 4,
    textAlign: 'right',
  },
  cardActionBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  // Pagination & Dots Navigation
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  arrowNavBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  arrowNavBtnDisabled: {
    opacity: 0.4,
  },
  dotsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  dotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  swipeCueText: {
    textAlign: 'center',
    fontSize: 10.5,
    letterSpacing: 0.5,
    marginTop: 4,
    marginBottom: 6,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
  },
  resetBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.full,
    marginTop: 8,
  },
});
