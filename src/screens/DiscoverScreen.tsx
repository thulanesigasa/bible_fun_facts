import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { facts, Fact, scriptures, Scripture } from '../data/mockDatabase';
import { MOCK_COMMUNITY_USERS, CommunityUser } from '../data/mockUsers';
import { useUser } from '../context/UserContext';
import {
  DiscoverSvg,
  FlameSvg,
  FavoritesSvg,
  LandmarkSvg,
  UsersSvg,
  QuoteSvg,
  StrongsIconSvg,
  ChevronRightSvg,
  BookOpenSvg,
  ShareSvg,
} from '../components/SvgIcons';

interface DiscoverScreenProps {
  navigation: any;
}

type FeedFilter = 'All' | 'Archaeology' | 'Language' | 'Customs' | 'Scholars';

const FEED_FILTERS: FeedFilter[] = ['All', 'Archaeology', 'Language', 'Customs', 'Scholars'];

export default function DiscoverScreen({ navigation }: DiscoverScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('All');
  const [feedSeed, setFeedSeed] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const {
    streak,
    factsViewedCount,
    incrementFactsViewed,
    userProfile,
    toggleFavoriteFact,
    isFactFavorited,
    lastReadBible,
    followedUserIds,
  } = useUser();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setFeedSeed((prev) => prev + 1);
      incrementFactsViewed();
      setRefreshing(false);
    }, 400);
  }, [incrementFactsViewed]);

  // Featured Spotlight Fact (Shuffles with seed)
  const spotlightFact: Fact = useMemo(() => {
    const languageFacts = facts.filter((f) => f.category === 'Language');
    const index = (feedSeed + 2) % languageFacts.length;
    return languageFacts[index] || facts[0];
  }, [feedSeed]);

  // Curated Feed Stream
  const feedStream = useMemo(() => {
    // 1. Facts
    const factItems = facts.slice((feedSeed * 4) % 40, ((feedSeed * 4) % 40) + 12).map((fact) => ({
      type: 'fact' as const,
      id: `feed_fact_${fact.id}`,
      data: fact,
      category: fact.category,
    }));

    // 2. Scholar Insights
    const scholarItems = MOCK_COMMUNITY_USERS.map((user) => ({
      type: 'scholar' as const,
      id: `feed_scholar_${user.id}`,
      data: user,
      category: 'Scholars',
    }));

    // Interleave
    const combined: Array<{
      type: 'fact' | 'scholar';
      id: string;
      data: Fact | CommunityUser;
      category: string;
    }> = [];

    const maxLen = Math.max(factItems.length, scholarItems.length);
    for (let i = 0; i < maxLen; i++) {
      if (factItems[i]) combined.push(factItems[i]);
      if (i % 2 === 0 && scholarItems[i / 2]) combined.push(scholarItems[i / 2]);
    }

    return combined.filter((item) => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Archaeology') return item.type === 'fact' && (item.category === 'History' || item.category === 'Prophecy');
      if (activeFilter === 'Language') return item.type === 'fact' && item.category === 'Language';
      if (activeFilter === 'Customs') return item.type === 'fact' && item.category === 'Customs';
      if (activeFilter === 'Scholars') return item.type === 'scholar';
      return true;
    });
  }, [feedSeed, activeFilter]);

  const onShareFact = async (fact: Fact) => {
    try {
      const message = `"${fact.fact_title}"\n${fact.verse_text} (${fact.scripture_ref})\n\nHistorical Context:\n${fact.historical_context}\n\nCultural Practice:\n${fact.cultural_practice}`;
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  const onShareScholar = async (user: CommunityUser) => {
    try {
      const message = `Scripture Reflection by ${user.name} (@${user.username}):\n"${user.favoriteVerse.text}" - ${user.favoriteVerse.reference}\n\nNote: ${user.favoriteVerse.note}`;
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
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      >
        {/* Screen Top Header Greeting */}
        <View style={styles.header}>
          <View style={styles.headerIconRow}>
            <DiscoverSvg size={24} color={colors.accent} fill={colors.accentSoft} />
            <Text variant="h2" style={styles.headerTitle}>
              {userProfile?.name ? `Shalom, ${userProfile.name}` : 'Exegetical Feed'}
            </Text>
          </View>
          <Text variant="body" color={colors.textSecondary} style={styles.headerSub}>
            Daily archaeological insights, lexical roots & scholar reflections
          </Text>
        </View>

        {/* Milestone & Streak Ribbon */}
        <View style={[styles.statsRibbon, shadow.sm]}>
          <View style={styles.statItem}>
            <View style={styles.streakIconCircle}>
              <FlameSvg size={16} color={colors.accent} fill={colors.accent} />
            </View>
            <View>
              <Text variant="caption" color={colors.textTertiary}>Streak</Text>
              <Text variant="h3" style={{ color: colors.textPrimary }}>
                {streak} day{streak !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={styles.streakIconCircle}>
              <DiscoverSvg size={16} color={colors.accent} />
            </View>
            <View>
              <Text variant="caption" color={colors.textTertiary}>Discovered</Text>
              <Text variant="h3" style={{ color: colors.textPrimary }}>
                {factsViewedCount} items
              </Text>
            </View>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={styles.streakIconCircle}>
              <UsersSvg size={16} color={colors.accent} />
            </View>
            <View>
              <Text variant="caption" color={colors.textTertiary}>Following</Text>
              <Text variant="h3" style={{ color: colors.textPrimary }}>
                {followedUserIds.length} scholars
              </Text>
            </View>
          </View>
        </View>

        {/* FEATURED 1: Continue Reading Bible Card */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => navigation.navigate('WOTD')}
          style={[styles.continueReadingCard, shadow.sm]}
        >
          <View style={styles.continueLeft}>
            <View style={styles.continueIconCircle}>
              <BookOpenSvg size={20} color={colors.accent} />
            </View>
            <View style={styles.continueTextWrap}>
              <Text variant="caption" color={colors.accent} weight="700" style={styles.continueMiniBadge}>
                CONTINUE STUDY
              </Text>
              <Text variant="h3" style={styles.continueBookTitle}>
                {lastReadBible.book} Chapter {lastReadBible.chapter}
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Translation: {lastReadBible.translation.toUpperCase()} • Tap to open reader
              </Text>
            </View>
          </View>
          <ChevronRightSvg size={18} color={colors.accent} />
        </TouchableOpacity>

        {/* FEATURED 2: Hero Exegetical Spotlight Card */}
        <Card style={styles.spotlightCard}>
          <View style={styles.spotlightBadgeRow}>
            <View style={styles.spotlightPill}>
              <StrongsIconSvg size={13} color={colors.accent} />
              <Text variant="caption" weight="700" color={colors.accent} style={{ letterSpacing: 0.8 }}>
                EXEGETICAL SPOTLIGHT
              </Text>
            </View>
            <Text variant="caption" color={colors.textTertiary}>
              {spotlightFact.scripture_ref}
            </Text>
          </View>

          <Text variant="h2" style={styles.spotlightTitle}>
            {spotlightFact.fact_title}
          </Text>

          {/* Lexicon box */}
          <View style={styles.lexiconBox}>
            <View style={styles.lexiconHeader}>
              <Text variant="h3" color={colors.accent}>
                {spotlightFact.strongs_word}
              </Text>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Strong's {spotlightFact.strongs_number}
              </Text>
            </View>
            <Text variant="caption" color={colors.textTertiary} style={styles.lexiconTranslit}>
              Transliteration: <Text variant="caption" weight="600" color={colors.textPrimary}>{spotlightFact.strongs_transliteration}</Text>
            </Text>
            <Text variant="body" color={colors.textPrimary} style={styles.lexiconDef}>
              "{spotlightFact.strongs_definition}"
            </Text>
          </View>

          <Text variant="body" color={colors.textSecondary} style={styles.spotlightContext} numberOfLines={3}>
            {spotlightFact.historical_context}
          </Text>

          <View style={styles.spotlightFooter}>
            <TouchableOpacity
              style={styles.spotlightReadBtn}
              onPress={() => navigation.navigate('FactDetails', { fact: spotlightFact })}
              activeOpacity={0.8}
            >
              <Text variant="caption" weight="700" color="#FFFFFF">
                Full Exegesis & Context ›
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.spotlightShareBtn}
              onPress={() => onShareFact(spotlightFact)}
              activeOpacity={0.8}
            >
              <ShareSvg size={16} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Category Feed Filter Chips */}
        <View style={styles.filterSection}>
          <Text variant="label" color={colors.textTertiary} style={styles.feedHeading}>
            DISCOVER STREAM
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterPillsContainer}
          >
            {FEED_FILTERS.map((f) => {
              const isActive = activeFilter === f;
              return (
                <TouchableOpacity
                  key={f}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  onPress={() => setActiveFilter(f)}
                  activeOpacity={0.8}
                >
                  <Text
                    variant="caption"
                    weight={isActive ? '700' : '500'}
                    style={[styles.filterPillText, isActive && styles.filterPillTextActive]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Feed Stream Cards */}
        <View style={styles.feedList}>
          {feedStream.map((item) => {
            if (item.type === 'fact') {
              const fact = item.data as Fact;
              const isFavorited = isFactFavorited(fact.id);

              return (
                <View key={item.id} style={[styles.feedFactCard, shadow.sm]}>
                  {/* Top Bar */}
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.categoryBadge}>
                      {fact.category === 'Language' ? (
                        <StrongsIconSvg size={12} color={colors.accent} />
                      ) : (
                        <LandmarkSvg size={12} color={colors.accent} />
                      )}
                      <Text variant="caption" weight="700" color={colors.accent} style={styles.categoryBadgeText}>
                        {fact.category.toUpperCase()}
                      </Text>
                    </View>
                    <Text variant="caption" color={colors.textTertiary}>
                      {fact.scripture_ref}
                    </Text>
                  </View>

                  {/* Fact Title */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('FactDetails', { fact })}
                  >
                    <Text variant="h3" style={styles.factCardTitle}>
                      {fact.fact_title}
                    </Text>
                  </TouchableOpacity>

                  {/* Quote */}
                  <View style={styles.verseQuoteBox}>
                    <Text variant="body" style={styles.verseQuoteText} numberOfLines={2}>
                      "{fact.verse_text}"
                    </Text>
                  </View>

                  {/* Context preview */}
                  <Text variant="body" color={colors.textSecondary} numberOfLines={3} style={styles.factContextText}>
                    {fact.historical_context}
                  </Text>

                  {/* Card Action Row */}
                  <View style={styles.cardBottomRow}>
                    <TouchableOpacity
                      style={styles.readMoreLink}
                      onPress={() => navigation.navigate('FactDetails', { fact })}
                      activeOpacity={0.7}
                    >
                      <Text variant="caption" weight="700" color={colors.accent}>
                        Explore Discovery
                      </Text>
                      <ChevronRightSvg size={12} color={colors.accent} />
                    </TouchableOpacity>

                    <View style={styles.cardActionIcons}>
                      <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => toggleFavoriteFact(fact)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <FavoritesSvg
                          size={16}
                          color={colors.accent}
                          fill={isFavorited ? colors.accent : 'none'}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => onShareFact(fact)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <ShareSvg size={16} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            } else {
              // Community Scholar Card
              const scholar = item.data as CommunityUser;

              return (
                <View key={item.id} style={[styles.feedScholarCard, shadow.sm]}>
                  {/* Top Bar */}
                  <View style={styles.scholarHeaderRow}>
                    <View style={styles.scholarAvatarCircle}>
                      <Text variant="caption" weight="700" color={colors.accent}>
                        {scholar.name.replace(/^(Dr\.|Prof\.|Pastor)\s+/i, '').slice(0, 2).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.scholarInfoWrap}>
                      <Text variant="h3" style={styles.scholarName} numberOfLines={1}>
                        {scholar.name}
                      </Text>
                      <Text variant="caption" color={colors.textTertiary}>
                        @{scholar.username} • {scholar.role}
                      </Text>
                    </View>
                    <View style={styles.scholarBadge}>
                      <UsersSvg size={12} color={colors.accent} />
                    </View>
                  </View>

                  {/* Scholar Reflection Quote */}
                  <View style={styles.scholarQuoteCard}>
                    <View style={styles.scholarQuoteHeader}>
                      <QuoteSvg size={14} color={colors.accent} />
                      <Text variant="caption" weight="700" color={colors.accent}>
                        {scholar.favoriteVerse.reference}
                      </Text>
                    </View>
                    <Text variant="body" style={styles.scholarVerseText}>
                      "{scholar.favoriteVerse.text}"
                    </Text>
                    <Text variant="caption" color={colors.textSecondary} style={styles.scholarNoteText}>
                      {scholar.favoriteVerse.note}
                    </Text>
                  </View>

                  {/* Scholar Card Footer */}
                  <View style={styles.scholarFooterRow}>
                    <TouchableOpacity
                      style={styles.viewScholarBtn}
                      onPress={() => navigation.navigate('Search')}
                      activeOpacity={0.7}
                    >
                      <Text variant="caption" weight="600" color={colors.accent}>
                        View Profile in Search ›
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => onShareScholar(scholar)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <ShareSvg size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 110,
  },
  header: {
    marginBottom: spacing.md,
  },
  headerIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: 13,
    marginTop: 2,
  },
  statsRibbon: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakIconCircle: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
  },

  // Continue Reading Card
  continueReadingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    marginBottom: spacing.md,
  },
  continueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  continueIconCircle: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueTextWrap: {
    flex: 1,
  },
  continueMiniBadge: {
    letterSpacing: 0.8,
  },
  continueBookTitle: {
    fontSize: 15,
    marginTop: 1,
  },

  // Hero Spotlight Card
  spotlightCard: {
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.25)',
  },
  spotlightBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  spotlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  spotlightTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  lexiconBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  lexiconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lexiconTranslit: {
    marginTop: 2,
  },
  lexiconDef: {
    fontStyle: 'italic',
    marginTop: 4,
    fontSize: 13,
  },
  spotlightContext: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  spotlightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.05)',
  },
  spotlightReadBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  spotlightShareBtn: {
    padding: 7,
    borderRadius: radius.full,
    backgroundColor: colors.accentSoft,
  },

  // Filters
  filterSection: {
    marginBottom: spacing.sm,
  },
  feedHeading: {
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  filterPillsContainer: {
    gap: 6,
    paddingVertical: 4,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  filterPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterPillText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },

  // Feed Cards
  feedList: {
    gap: 12,
  },
  feedFactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  categoryBadgeText: {
    fontSize: 10,
  },
  factCardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 6,
  },
  verseQuoteBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.02)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    marginBottom: 6,
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
  },
  verseQuoteText: {
    fontStyle: 'italic',
    fontSize: 12,
    color: colors.textPrimary,
  },
  factContextText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.04)',
  },
  readMoreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardActionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    padding: 2,
  },

  // Scholar Card
  feedScholarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  scholarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  scholarAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scholarInfoWrap: {
    flex: 1,
  },
  scholarName: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  scholarBadge: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scholarQuoteCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: 8,
  },
  scholarQuoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  scholarVerseText: {
    fontStyle: 'italic',
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 17,
  },
  scholarNoteText: {
    fontSize: 11,
    marginTop: 4,
    lineHeight: 15,
  },
  scholarFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  viewScholarBtn: {
    paddingVertical: 2,
  },
});
