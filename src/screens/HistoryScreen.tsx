import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
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

interface HistoryScreenProps {
  navigation: any;
}

export default function HistoryScreen({ navigation }: HistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const renderWriterItem = ({ item, index }: { item: BiblicalWriter; index: number }) => {
    const displayedBooks = item.booksWritten.slice(0, 4);
    const extraBooksCount = item.booksWritten.length - 4;
    const isLast = index === filteredWriters.length - 1;

    return (
      <TouchableOpacity
        style={[styles.writerRow, !isLast && styles.rowDivider]}
        activeOpacity={0.75}
        onPress={() => navigation.navigate('WriterDetails', { writer: item })}
        accessibilityRole="button"
        accessibilityLabel={`View history of ${item.name}`}
      >
        {/* Top header row: Name + Hebrew/Greek script */}
        <View style={styles.cardHeaderRow}>
          <View style={styles.nameContainer}>
            <View style={styles.titleWithIcon}>
              <FeatherPenSvg size={15} color={colors.accent} />
              <Text variant="h3" style={styles.writerName}>
                {item.name}
              </Text>
            </View>
            <Text variant="caption" color={colors.accent} weight="700" style={styles.transliteration}>
              {item.transliteration}
            </Text>
          </View>

          <Text variant="h2" style={styles.originalScript}>
            {item.originalName}
          </Text>
        </View>

        {/* Meta Category & Era */}
        <View style={styles.metaRow}>
          <Text variant="caption" weight="700" color={colors.accent} style={{ letterSpacing: 0.5 }}>
            {item.category.toUpperCase()}
          </Text>
          <Text variant="caption" color={colors.textTertiary} numberOfLines={1}>
            • {item.era}
          </Text>
        </View>

        {/* Role Summary */}
        <Text variant="body" color={colors.textPrimary} style={styles.roleSummary}>
          {item.role}
        </Text>

        {/* Canonical Books Penned */}
        <View style={styles.booksWrap}>
          <BookOpenSvg size={13} color={colors.textSecondary} />
          <Text variant="caption" color={colors.textSecondary} style={{ fontSize: 12 }}>
            Books: {displayedBooks.join(', ')}{extraBooksCount > 0 ? ` (+${extraBooksCount} more)` : ''}
          </Text>
        </View>

        {/* Key Verse Box (Clean Sacred Quote with Accent Left-Border) */}
        <View style={styles.keyVerseBox}>
          <Text variant="body" numberOfLines={2} style={styles.keyVerseText}>
            "{item.keyVerse.text}"
          </Text>
          <Text variant="caption" color={colors.textSecondary} weight="700" style={styles.keyVerseRef}>
            — {item.keyVerse.reference}
          </Text>
        </View>

        {/* Action Footer */}
        <View style={styles.rowFooter}>
          <Text variant="caption" weight="700" color={colors.accent}>
            Explore Biography & Manuscripts ›
          </Text>
          <Text variant="caption" color={colors.textTertiary}>
            {item.totalChapters} chapters
          </Text>
        </View>
      </TouchableOpacity>
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
          Biographies, callings & manuscript scholarship of biblical authors
        </Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchSvg size={16} color={colors.accent} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search authors, books (e.g. Paul, Genesis)..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <CloseSvg size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter Pills */}
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
                onPress={() => setSelectedCategory(category)}
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

      {/* Subtle Hairline Divider before continuous body list */}
      <View style={styles.hairlineDivider} />

      {/* Writers Continuous Body List (Zero Card Divs) */}
      <FlatList
        data={filteredWriters}
        keyExtractor={(item) => item.id}
        renderItem={renderWriterItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ScrollSvg size={40} color={colors.accent} />
            <Text variant="h3" style={styles.emptyTitle}>
              No Biblical Writers Found
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.emptyText}>
              No authors match "{searchQuery}". Try searching for another name or clearing the filter.
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              <Text variant="caption" weight="700" color="#0F172A">
                Reset Filters
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
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
    paddingBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
  },
  screenTitle: {
    color: colors.textPrimary,
  },
  screenSub: {
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 2,
  },
  categoryScrollContainer: {
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  categoryScrollContent: {
    paddingHorizontal: spacing.lg,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  filterPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  hairlineDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 104,
    backgroundColor: '#FFFFFF',
  },

  // Flat Continuous Body Item (Zero Card Divs)
  writerRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nameContainer: {
    flex: 1,
    marginRight: 8,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  writerName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  transliteration: {
    fontSize: 12,
    marginTop: 1,
  },
  originalScript: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 4,
  },
  roleSummary: {
    fontSize: 13,
    lineHeight: 19,
    marginVertical: 4,
    color: colors.textSecondary,
  },
  booksWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 6,
  },
  keyVerseBox: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.sm,
    marginVertical: 6,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  keyVerseText: {
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 17,
    color: colors.textPrimary,
  },
  keyVerseRef: {
    marginTop: 4,
    textAlign: 'right',
  },
  rowFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
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
