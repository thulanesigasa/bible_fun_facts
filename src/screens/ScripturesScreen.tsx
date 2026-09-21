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
import { scriptures, Scripture, Testament, Category } from '../data/mockDatabase';
import { useUser } from '../context/UserContext';
import {
  SearchSvg,
  ScripturesSvg,
  FavoritesSvg,
  ShareSvg,
  ChevronRightSvg,
  StrongsIconSvg,
} from '../components/SvgIcons';

const TOPIC_CATEGORIES: (Category | 'All')[] = ['All', 'People', 'Prophecy', 'Customs', 'History', 'Language'];
const TESTAMENTS: ('All' | Testament)[] = ['All', 'Old Testament', 'New Testament'];

export default function ScripturesScreen({ navigation }: { navigation: any }) {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [activeTestament, setActiveTestament] = useState<'All' | Testament>('All');

  const { isScriptureFavorited, toggleFavoriteScripture } = useUser();

  const filteredScriptures = useMemo(() => {
    return scriptures.filter((s) => {
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

      const matchTestament = activeTestament === 'All' || s.testament === activeTestament;

      let matchCategory = true;
      if (activeCategory !== 'All') {
        switch (activeCategory) {
          case 'Prophecy':
            matchCategory =
              s.genre === 'Prophecy' ||
              s.genre === 'Apocalyptic' ||
              (s.tags ? s.tags.some((t) => t.toLowerCase().includes('prophecy') || t.toLowerCase().includes('messiah')) : false);
            break;
          case 'History':
            matchCategory =
              s.genre === 'History' ||
              s.genre === 'Law' ||
              s.historical_context.length > 0;
            break;
          case 'Language':
            matchCategory = !!s.strongs_word || !!s.strongs_number;
            break;
          case 'Customs':
            matchCategory =
              (s.cultural_practice && s.cultural_practice.length > 0) ||
              (s.tags ? s.tags.some((t) => ['altar', 'vow', 'feast', 'law'].includes(t.toLowerCase())) : false);
            break;
          case 'People':
            matchCategory =
              s.genre === 'Gospel' ||
              (s.tags ? s.tags.some((t) => ['jesus', 'abraham', 'david', 'paul', 'peter', 'mary'].includes(t.toLowerCase())) : false);
            break;
        }
      }

      return matchSearch && matchTestament && matchCategory;
    });
  }, [searchText, activeTestament, activeCategory]);

  const onShareScripture = async (scripture: Scripture) => {
    try {
      const message = `"${scripture.text}"\n- ${scripture.reference} (${scripture.testament})\n\nRoot: ${scripture.strongs_transliteration} (${scripture.strongs_number}) - "${scripture.strongs_definition}"`;
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.headerIconWrap}>
            <ScripturesSvg size={22} color={colors.accent} fill={colors.accentSoft} />
          </View>
          <View style={styles.headerTextWrap}>
            <Text variant="h2" style={styles.title}>Scripture Library</Text>
            <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
              Key verses paired with Strong's lexical roots
            </Text>
          </View>
        </View>

        {/* Compact Search Bar */}
        <View style={[styles.searchContainer, shadow.sm]}>
          <SearchSvg size={16} color={colors.accent} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reference, text, Greek, Hebrew roots..."
            placeholderTextColor={colors.textTertiary}
            value={searchText}
            onChangeText={setSearchText}
            clearButtonMode="while-editing"
          />
        </View>

        {/* Combined Category Pills (from previous search section) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsScroll}
          style={styles.categoryScroll}
        >
          {TOPIC_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.8}
              >
                <Text
                  variant="caption"
                  weight={isActive ? '700' : '500'}
                  style={[styles.categoryPillText, isActive && styles.categoryPillTextActive]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Testament Sub-Filter Segment */}
        <View style={styles.testamentSegmentRow}>
          {TESTAMENTS.map((t) => {
            const isActive = activeTestament === t;
            const label = t === 'All' ? 'All Canons' : t === 'Old Testament' ? 'Old Testament' : 'New Testament';
            return (
              <TouchableOpacity
                key={t}
                style={[styles.testamentSegment, isActive && styles.testamentSegmentActive]}
                onPress={() => setActiveTestament(t)}
                activeOpacity={0.8}
              >
                <Text
                  variant="caption"
                  weight={isActive ? '700' : '500'}
                  style={[styles.testamentSegmentText, isActive && styles.testamentSegmentTextActive]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Results Counter */}
        <View style={styles.countRow}>
          <Text variant="caption" color={colors.textTertiary}>
            {filteredScriptures.length} verse{filteredScriptures.length !== 1 ? 's' : ''} available
          </Text>
        </View>

        {/* Compact Scripture Cards List */}
        <View style={styles.scripturesList}>
          {filteredScriptures.map((scripture) => {
            const isFavorited = isScriptureFavorited(scripture.id);

            return (
              <TouchableOpacity
                key={scripture.id}
                activeOpacity={0.88}
                onPress={() => navigation.navigate('ScriptureDetails', { scripture })}
              >
                <View style={[styles.compactCard, shadow.sm]}>
                  {/* Card Header Row: Reference + Genre Badge + Favorite */}
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.referenceBadgeWrap}>
                      <Text variant="h3" color={colors.accent} style={styles.cardReference}>
                        {scripture.reference}
                      </Text>
                      <View style={styles.genrePill}>
                        <Text variant="caption" color={colors.textSecondary} style={styles.genrePillText}>
                          {scripture.genre}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.cardActionsRow}>
                      <TouchableOpacity
                        onPress={() => toggleFavoriteScripture(scripture)}
                        style={styles.iconActionBtn}
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
                        style={styles.iconActionBtn}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <ShareSvg size={16} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* 2-Line Verse Snippet (No vertical bloat) */}
                  <Text
                    variant="body"
                    color={colors.textPrimary}
                    numberOfLines={2}
                    style={styles.verseExcerpt}
                  >
                    "{scripture.text}"
                  </Text>

                  {/* Bottom Metadata: Strong's Concordance Word */}
                  <View style={styles.cardFooterRow}>
                    <View style={styles.strongsPill}>
                      <StrongsIconSvg size={12} color={colors.accent} />
                      <Text variant="caption" color={colors.accent} weight="600" style={styles.strongsWordText}>
                        {scripture.strongs_transliteration} ({scripture.strongs_number})
                      </Text>
                      <Text variant="caption" color={colors.textTertiary} numberOfLines={1} style={styles.strongsDefText}>
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
    paddingBottom: 110,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: 12,
  },
  headerIconWrap: {
    width: 44,
    height: 44,
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
    fontSize: 13,
    marginTop: 2,
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
  categoryScroll: {
    marginBottom: 4,
  },
  filterPillsScroll: {
    gap: 6,
    paddingVertical: 4,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  categoryPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryPillText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  testamentSegmentRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    borderRadius: radius.sm,
    padding: 2,
    marginTop: 4,
    marginBottom: 4,
    gap: 4,
  },
  testamentSegment: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: radius.sm - 2,
  },
  testamentSegmentActive: {
    backgroundColor: '#FFFFFF',
    ...shadow.sm,
  },
  testamentSegmentText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  testamentSegmentTextActive: {
    color: colors.accent,
  },
  countRow: {
    marginVertical: 4,
  },
  scripturesList: {
    gap: 10,
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
    marginBottom: 6,
  },
  referenceBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  cardReference: {
    fontSize: 15,
  },
  genrePill: {
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  genrePillText: {
    fontSize: 10,
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconActionBtn: {
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
});
