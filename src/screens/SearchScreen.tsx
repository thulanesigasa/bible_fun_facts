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
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { facts, scriptures, Category, Fact, Scripture } from '../data/mockDatabase';
import {
  SearchSvg,
  UsersSvg,
  LandmarkSvg,
  ScripturesSvg,
  StrongsIconSvg,
  ChevronRightSvg,
  QuoteSvg,
} from '../components/SvgIcons';

const CATEGORIES: Category[] = ['People', 'Prophecy', 'Customs', 'History', 'Language'];

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
      weight={active ? '700' : '600'}
      style={[styles.pillText, active && styles.pillTextActive]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default function SearchScreen({ navigation }: { navigation: any }) {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All' | 'Scriptures'>('All');

  const filteredFacts = useMemo(() => {
    if (activeCategory === 'Scriptures') return [];
    return facts.filter((f) => {
      const q = searchText.toLowerCase();
      const matchSearch =
        q === '' ||
        f.fact_title.toLowerCase().includes(q) ||
        f.scripture_ref.toLowerCase().includes(q) ||
        f.verse_text.toLowerCase().includes(q);
      const matchCat = activeCategory === 'All' || f.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [searchText, activeCategory]);

  const filteredScriptures = useMemo(() => {
    if (activeCategory !== 'All' && activeCategory !== 'Scriptures') return [];
    return scriptures.filter((s) => {
      const q = searchText.toLowerCase();
      return (
        q === '' ||
        s.reference.toLowerCase().includes(q) ||
        s.text.toLowerCase().includes(q) ||
        s.book.toLowerCase().includes(q)
      );
    });
  }, [searchText, activeCategory]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text variant="h1" style={styles.mainTitle}>Find Facts</Text>

        <View style={styles.headerSubtitleRow}>
          <View style={styles.searchIconCircle}>
            <SearchSvg size={20} color={colors.accent} />
          </View>
          <View>
            <Text variant="h2" style={styles.subTitle}>Discover More</Text>
            <Text variant="body" color={colors.textSecondary}>Search facts and scriptures</Text>
          </View>
        </View>

        {/* Search Input Box */}
        <View style={styles.searchContainer}>
          <SearchSvg size={18} color={colors.accent} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search keywords, topics, or verses..."
            placeholderTextColor={colors.textTertiary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Category Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterRowContent}>
          <FilterPill
            label="All Facts"
            active={activeCategory === 'All'}
            onPress={() => setActiveCategory('All')}
          />
          <FilterPill
            label="Scriptures Only"
            active={activeCategory === 'Scriptures'}
            onPress={() => setActiveCategory('Scriptures')}
          />
          {CATEGORIES.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onPress={() => setActiveCategory(cat)}
            />
          ))}
        </ScrollView>

        {/* Fact Results */}
        {filteredFacts.length > 0 && (
          <View style={styles.sectionBlock}>
            <Text variant="label" color={colors.accent} style={styles.sectionTitle}>
              FACTS ({filteredFacts.length})
            </Text>
            {filteredFacts.map((fact) => (
              <TouchableOpacity
                key={fact.id}
                activeOpacity={0.88}
                onPress={() => navigation.navigate('FactDetails', { fact })}
              >
                <Card style={styles.resultCard}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.badge}>
                      <Text variant="label" color={colors.accent}>{fact.category.toUpperCase()}</Text>
                    </View>
                    <ChevronRightSvg size={16} color={colors.textSecondary} />
                  </View>
                  <Text variant="h3" style={styles.cardTitle}>{fact.fact_title}</Text>
                  <Text variant="caption" color={colors.accent} style={styles.cardRef}>
                    {fact.scripture_ref}
                  </Text>
                  <Text variant="body" color={colors.textSecondary} numberOfLines={2} style={styles.cardSnippet}>
                    {fact.historical_context}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Scripture Results */}
        {filteredScriptures.length > 0 && (
          <View style={styles.sectionBlock}>
            <Text variant="label" color={colors.accent} style={styles.sectionTitle}>
              SCRIPTURES ({filteredScriptures.length})
            </Text>
            {filteredScriptures.map((scripture) => (
              <TouchableOpacity
                key={scripture.id}
                activeOpacity={0.88}
                onPress={() => navigation.navigate('ScriptureDetails', { scripture })}
              >
                <Card style={styles.resultCard}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.scriptureBadge}>
                      <Text variant="label" color={colors.accent}>{scripture.testament.toUpperCase()}</Text>
                    </View>
                    <ChevronRightSvg size={16} color={colors.textSecondary} />
                  </View>
                  <Text variant="h3" style={styles.cardTitle}>{scripture.reference}</Text>
                  <Text variant="body" color={colors.textSecondary} numberOfLines={2} style={styles.cardSnippet}>
                    "{scripture.text}"
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {filteredFacts.length === 0 && filteredScriptures.length === 0 && (
          <View style={styles.emptyState}>
            <Text variant="body" color={colors.textSecondary} align="center">
              No matching facts or scriptures found for "{searchText}".
            </Text>
          </View>
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
    padding: spacing.md, // 16px margins & gutters
    paddingBottom: spacing.xxl, // 48px
  },
  mainTitle: {
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: spacing.md, // 16px
  },
  headerSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md, // 16px
    marginBottom: spacing.lg, // 24px
  },
  searchIconCircle: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 18,
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
    fontSize: 16,
    paddingVertical: spacing.sm, // 8px
  },
  filterRow: {
    marginBottom: spacing.lg, // 24px
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
  sectionBlock: {
    marginBottom: spacing.lg, // 24px
  },
  sectionTitle: {
    letterSpacing: 1,
    marginBottom: spacing.sm, // 8px
  },
  resultCard: {
    backgroundColor: colors.surface,
    padding: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm, // 8px
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm, // 8px
  },
  badge: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  scriptureBadge: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardRef: {
    marginBottom: spacing.sm, // 8px
  },
  cardSnippet: {
    lineHeight: 20,
  },
  emptyState: {
    paddingVertical: spacing.xxl, // 48px
    alignItems: 'center',
  },
});
