import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { facts, Fact } from '../data/mockDatabase';
import { useUser } from '../context/UserContext';
import {
  DiscoverSvg,
  FlameSvg,
  RefreshSvg,
  FavoritesSvg,
  LandmarkSvg,
  UsersSvg,
  QuoteSvg,
  StrongsIconSvg,
  ChevronRightSvg,
} from '../components/SvgIcons';

interface DiscoverScreenProps {
  navigation: any;
}

export default function DiscoverScreen({ navigation }: DiscoverScreenProps) {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const { streak, factsViewedCount, incrementFactsViewed, userProfile, toggleFavoriteFact, isFactFavorited } = useUser();

  const currentFact: Fact = facts[currentFactIndex];

  const discoverAnother = useCallback(() => {
    const nextIndex = (currentFactIndex + 1) % facts.length;
    setCurrentFactIndex(nextIndex);
    incrementFactsViewed();
  }, [currentFactIndex, incrementFactsViewed]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      discoverAnother();
      setRefreshing(false);
    }, 400);
  }, [discoverAnother]);

  const isFavorited = isFactFavorited(currentFact.id);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconRow}>
            <DiscoverSvg size={28} color={colors.accent} fill={colors.accentSoft} />
            <Text variant="h1" style={styles.headerTitle}>
              Did You Know{userProfile?.name ? `, ${userProfile.name}` : ''}?
            </Text>
          </View>
          <Text variant="body" color={colors.textSecondary} style={styles.headerSub}>
            Discover hidden treasures in Scripture
          </Text>
        </View>

        {/* Compact Streak & Stats Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakInnerRow}>
            <View style={styles.statItem}>
              <View style={styles.streakIconCircle}>
                <FlameSvg size={20} color={colors.accent} fill={colors.accent} />
              </View>
              <View>
                <Text variant="label" color={colors.textSecondary}>Streak</Text>
                <Text variant="h3" style={{ color: colors.textPrimary }}>
                  {streak} day{streak !== 1 ? 's' : ''}
                </Text>
              </View>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={styles.streakIconCircle}>
                <DiscoverSvg size={20} color={colors.accent} />
              </View>
              <View>
                <Text variant="label" color={colors.textSecondary}>Viewed</Text>
                <Text variant="h3" style={{ color: colors.textPrimary }}>
                  {factsViewedCount}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Main Fact Card */}
        <TouchableOpacity
          style={styles.factCard}
          onPress={() => navigation.navigate('FactDetails', { fact: currentFact })}
          activeOpacity={0.88}
        >
          {/* Category + Bookmark */}
          <View style={styles.factTopRow}>
            <View style={styles.badge}>
              <Text variant="label" color={colors.accent} weight="800">
                {currentFact.category.toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleFavoriteFact(currentFact)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              activeOpacity={0.7}
            >
              <FavoritesSvg
                size={22}
                color={colors.accent}
                fill={isFavorited ? colors.accent : 'none'}
              />
            </TouchableOpacity>
          </View>

          {/* Scripture Reference & Verse */}
          <View style={styles.scriptureRow}>
            <View style={styles.verseHeader}>
              <QuoteSvg size={16} color={colors.accent} />
              <Text variant="body" weight="700" color={colors.accent} style={styles.scriptureRef}>
                {currentFact.scripture_ref}
              </Text>
            </View>
            <Text variant="body" style={styles.verseText}>
              "{currentFact.verse_text}"
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Fact Title */}
          <Text variant="h2" style={styles.factTitle}>
            {currentFact.fact_title}
          </Text>

          {/* Historical Context Section */}
          <View style={styles.sectionHeader}>
            <LandmarkSvg size={18} color={colors.accent} />
            <Text variant="h3" style={styles.sectionLabel}>Historical Context</Text>
          </View>
          <Text variant="body" style={styles.bodyText}>
            {currentFact.historical_context}
          </Text>

          {/* Cultural Practice Section */}
          <View style={styles.sectionHeader}>
            <UsersSvg size={18} color={colors.accent} />
            <Text variant="h3" style={styles.sectionLabel}>Cultural Practice</Text>
          </View>
          <Text variant="body" style={styles.bodyText}>
            {currentFact.cultural_practice}
          </Text>

          {/* Strong's Section Preview */}
          <View style={styles.strongsCard}>
            <View style={styles.strongsTop}>
              <View style={styles.strongsLeft}>
                <StrongsIconSvg size={18} color={colors.accent} />
                <Text variant="caption" weight="800" style={styles.strongsCaption}>
                  STRONG'S DEEP DIVE
                </Text>
              </View>
              <ChevronRightSvg size={18} color={colors.accent} />
            </View>
            <View style={styles.strongsBody}>
              <View style={styles.strongsInlineWord}>
                <Text variant="h2" style={styles.strongsWord}>{currentFact.strongs_word}</Text>
                <Text variant="caption" style={styles.strongsTrans}>({currentFact.strongs_transliteration})</Text>
              </View>
              <Text variant="body" color={colors.textSecondary} numberOfLines={2} style={{ marginTop: spacing.sm }}>
                {currentFact.strongs_definition}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Discover Another Button */}
        <TouchableOpacity
          style={styles.discoverBtn}
          onPress={discoverAnother}
          activeOpacity={0.85}
        >
          <RefreshSvg size={20} color={colors.background} />
          <Text variant="h3" style={styles.discoverBtnText}>Discover Another Fact</Text>
        </TouchableOpacity>
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
    padding: spacing.md, // 16px margins & gutters per Rule 15
    paddingBottom: spacing.xxl, // 48px
  },
  header: {
    marginBottom: spacing.lg, // 24px
    alignItems: 'flex-start',
  },
  headerIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  headerTitle: {
    fontSize: 28,
    color: colors.textPrimary,
  },
  headerSub: {
    marginTop: spacing.sm, // 8px
    fontSize: 16,
  },
  streakCard: {
    paddingVertical: spacing.md, // 16px
    paddingHorizontal: spacing.md, // 16px
    marginBottom: spacing.lg, // 24px
    borderRadius: radius.lg, // 24px
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  streakInnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  statDivider: {
    width: 1,
    height: 32, // Multiple of 8
    backgroundColor: colors.border,
  },
  streakIconCircle: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  factCard: {
    padding: spacing.lg, // 24px
    borderRadius: radius.xl, // 32px
    backgroundColor: colors.surface,
    marginBottom: spacing.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
  },
  factTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md, // 16px
  },
  badge: {
    paddingHorizontal: spacing.md, // 16px
    paddingVertical: spacing.sm, // 8px
    borderRadius: radius.full,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  scriptureRow: {
    marginBottom: spacing.md, // 16px
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginBottom: spacing.sm, // 8px
  },
  scriptureRef: {
    fontSize: 16,
    color: colors.accent,
  },
  verseText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md, // 16px
  },
  factTitle: {
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: spacing.md, // 16px
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginBottom: spacing.sm, // 8px
  },
  sectionLabel: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.md, // 16px
    color: colors.textPrimary,
  },
  strongsCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg, // 24px
    padding: spacing.md, // 16px
    marginTop: spacing.sm, // 8px
    borderWidth: 1,
    borderColor: colors.border,
  },
  strongsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm, // 8px
  },
  strongsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  strongsCaption: {
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  strongsBody: {},
  strongsInlineWord: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm, // 8px
  },
  strongsWord: {
    color: colors.textPrimary,
    fontSize: 24,
  },
  strongsTrans: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    fontSize: 16,
  },
  discoverBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md, // 16px
    backgroundColor: colors.accent,
    paddingVertical: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    marginBottom: spacing.md, // 16px
  },
  discoverBtnText: {
    fontSize: 16,
    color: colors.background,
    fontWeight: '700',
  },
});
