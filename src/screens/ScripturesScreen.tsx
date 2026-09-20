import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { scriptures, Scripture, Testament, Genre } from '../data/mockDatabase';
import {
  SearchSvg,
  ChevronRightSvg,
  ScripturesSvg,
  getGenreSvg,
} from '../components/SvgIcons';

const TESTAMENTS: Testament[] = ['Old Testament', 'New Testament'];
const GENRES: Genre[] = ['Law', 'History', 'Wisdom', 'Prophecy', 'Gospel', 'Epistle', 'Apocalyptic'];

interface FilterPillProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const FilterPill: React.FC<FilterPillProps> = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.pill, active && styles.pillActive]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text
      variant="caption"
      weight={active ? '700' : '500'}
      style={[styles.pillText, active && styles.pillTextActive]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default function ScripturesScreen({ navigation }: { navigation: any }) {
  const [searchText, setSearchText] = useState('');
  const [activeTestament, setActiveTestament] = useState<Testament | 'All'>('All');
  const [activeGenre, setActiveGenre] = useState<Genre | 'All'>('All');

  const filtered = useMemo(() => {
    return scriptures.filter((s) => {
      const q = searchText.toLowerCase();
      const matchSearch =
        q === '' ||
        s.reference.toLowerCase().includes(q) ||
        s.text.toLowerCase().includes(q) ||
        s.book.toLowerCase().includes(q);
      const matchTestament = activeTestament === 'All' || s.testament === activeTestament;
      const matchGenre = activeGenre === 'All' || s.genre === activeGenre;
      return matchSearch && matchTestament && matchGenre;
    });
  }, [searchText, activeTestament, activeGenre]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.headerRow}>
          <ScripturesSvg size={24} color={colors.accent} fill={colors.accentSoft} />
          <View>
            <Text variant="h2" style={styles.title}>Find Scriptures</Text>
            <Text variant="body" color={colors.textSecondary} style={{ fontSize: 14 }}>
              Search and explore Bible verses with original root words
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, shadow.sm]}>
          <SearchSvg size={18} color={colors.accent} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search scriptures, books, themes..."
            placeholderTextColor={colors.textTertiary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Testament Filter */}
        <Text variant="h3" style={styles.filterLabel}>Testament</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterRowContent}
        >
          <FilterPill label="All" active={activeTestament === 'All'} onPress={() => setActiveTestament('All')} />
          {TESTAMENTS.map((t) => (
            <FilterPill key={t} label={t} active={activeTestament === t} onPress={() => setActiveTestament(t)} />
          ))}
        </ScrollView>

        {/* Genre Filter */}
        <Text variant="h3" style={styles.filterLabel}>Genre</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterRowContent}
        >
          <FilterPill label="All" active={activeGenre === 'All'} onPress={() => setActiveGenre('All')} />
          {GENRES.map((g) => (
            <FilterPill key={g} label={g} active={activeGenre === g} onPress={() => setActiveGenre(g)} />
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.countRow}>
          <Text variant="label" color={colors.textSecondary}>
            {filtered.length} SCRIPTURE{filtered.length !== 1 ? 'S' : ''} FOUND
          </Text>
        </View>

        {/* Scripture List */}
        {filtered.map((scripture) => (
          <TouchableOpacity
            key={scripture.id}
            activeOpacity={0.88}
            onPress={() => navigation.navigate('ScriptureDetails', { scripture })}
          >
            <Card style={styles.scriptureCard}>
              <View style={styles.scriptureHeader}>
                <View style={styles.genreIconRow}>
                  {getGenreSvg(scripture.genre, 16, colors.accent)}
                  <View style={styles.badge}>
                    <Text variant="label" color={colors.accent} weight="700">
                      {scripture.testament}
                    </Text>
                  </View>
                  <View style={styles.genreBadge}>
                    <Text variant="label" color={colors.textSecondary}>
                      {scripture.genre}
                    </Text>
                  </View>
                </View>
                <ChevronRightSvg size={18} color={colors.accent} />
              </View>

              <Text variant="h2" style={styles.referenceText}>{scripture.reference}</Text>
              <Text variant="body" color={colors.textSecondary} numberOfLines={3} style={styles.versePreview}>
                "{scripture.text}"
              </Text>

              {scripture.tags && (
                <View style={styles.tagsContainer}>
                  {scripture.tags.slice(0, 3).map((tag) => (
                    <View key={tag} style={styles.tagBadge}>
                      <Text variant="caption" color={colors.textSecondary}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))}
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
    padding: spacing.md, // 16px margins & gutters
    paddingBottom: 96, // 96px bottom padding clears floating pill tab bar
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginTop: spacing.sm, // 8px
    marginBottom: spacing.md, // 16px
  },
  title: {
    fontSize: 22,
    color: colors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md, // 16px
    paddingVertical: spacing.sm, // 8px
    borderRadius: radius.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md, // 16px
    gap: spacing.sm, // 8px
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    paddingVertical: spacing.sm, // 8px
  },
  filterLabel: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: spacing.sm, // 8px
  },
  filterRow: {
    marginBottom: spacing.md, // 16px
  },
  filterRowContent: {
    gap: spacing.sm, // 8px
  },
  pill: {
    paddingHorizontal: spacing.md, // 16px
    paddingVertical: spacing.sm, // 8px
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentBorder,
  },
  pillText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  pillTextActive: {
    color: colors.accent,
  },
  countRow: {
    marginVertical: spacing.sm, // 8px
  },
  scriptureCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg, // 24px
    borderRadius: radius.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md, // 16px
  },
  scriptureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm, // 8px
  },
  genreIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  badge: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  genreBadge: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  referenceText: {
    fontSize: 19,
    color: colors.textPrimary,
    marginBottom: spacing.sm, // 8px
  },
  versePreview: {
    fontStyle: 'italic',
    lineHeight: 22,
    fontSize: 14,
    marginBottom: spacing.md, // 16px
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm, // 8px
  },
  tagBadge: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
