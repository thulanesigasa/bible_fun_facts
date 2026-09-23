import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { CategoryBadge } from '../components/CategoryBadge';
import { StreakMilestoneModal } from '../components/StreakMilestoneModal';
import {
  AchievementCategory,
  AchievementMilestone,
  getAchievementsForCategory,
  getCategoryProgress,
  getCategoryTitle,
  getCategorySubtitle,
  getCategoryUnit,
  getTotalAchievementsProgress,
} from '../data/achievements';
import { LockSvg, CheckSvg } from '../components/SvgIcons';

const CATEGORIES: { key: AchievementCategory; label: string }[] = [
  { key: 'streak', label: 'Streaks' },
  { key: 'bookmark', label: 'Bookmarks' },
  { key: 'highlight', label: 'Highlights' },
  { key: 'share', label: 'Shares' },
];

export default function AchievementsScreen() {
  const { width } = useWindowDimensions();
  const {
    streak,
    setStreak,
    favoritesScriptures,
    bibleHighlights,
    sharesCount,
  } = useUser();

  const [activeCategory, setActiveCategory] = useState<AchievementCategory>('streak');
  const [selectedMilestone, setSelectedMilestone] = useState<AchievementMilestone | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Compute live user stats
  const bookmarksCount = favoritesScriptures?.length || 0;
  const highlightsCount = Object.keys(bibleHighlights || {}).length;
  const currentSharesCount = sharesCount || 0;
  const currentStreak = streak || 1;

  const userStats = useMemo(() => ({
    streak: currentStreak,
    bookmarksCount,
    highlightsCount,
    sharesCount: currentSharesCount,
  }), [currentStreak, bookmarksCount, highlightsCount, currentSharesCount]);

  const totalProgress = useMemo(() => getTotalAchievementsProgress(userStats), [userStats]);

  const currentCategoryCount = useMemo(() => {
    switch (activeCategory) {
      case 'streak': return currentStreak;
      case 'bookmark': return bookmarksCount;
      case 'highlight': return highlightsCount;
      case 'share': return currentSharesCount;
    }
  }, [activeCategory, currentStreak, bookmarksCount, highlightsCount, currentSharesCount]);

  const categoryProgress = useMemo(
    () => getCategoryProgress(activeCategory, currentCategoryCount),
    [activeCategory, currentCategoryCount]
  );

  // Responsive 3-per-row grid calculation
  const horizontalPadding = 16;
  const gridGap = 8;
  const cardWidth = (width - (horizontalPadding * 2) - (gridGap * 2)) / 3;

  const handleCardPress = (milestone: AchievementMilestone) => {
    setSelectedMilestone(milestone);
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Global Summary Banner */}
        <View style={[styles.globalBanner, shadow.sm]}>
          <View style={styles.globalBannerTop}>
            <View>
              <Text variant="caption" weight="800" color={colors.accent} style={styles.globalPreTitle}>
                HONOR & DEVOTION
              </Text>
              <Text variant="h2" style={styles.globalTitle}>
                Study Achievements
              </Text>
            </View>
            <View style={styles.globalBadgePill}>
              <Text variant="caption" weight="800" color="#0F172A">
                {`${totalProgress.totalUnlocked}/48 UNLOCKED`}
              </Text>
            </View>
          </View>
          <Text variant="caption" color={colors.textSecondary} style={styles.globalSubtitle}>
            Grow in sacred wisdom by meditating on scripture, preserving verses, and sharing biblical truth.
          </Text>
          <View style={styles.globalProgressBarTrack}>
            <View style={[styles.globalProgressBarFill, { width: `${totalProgress.percent}%` }]} />
          </View>
        </View>

        {/* Category Selector Tabs */}
        <View style={styles.categoryPillsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryPillsScroll}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.key;
              const count = (() => {
                switch (cat.key) {
                  case 'streak': return currentStreak;
                  case 'bookmark': return bookmarksCount;
                  case 'highlight': return highlightsCount;
                  case 'share': return currentSharesCount;
                }
              })();
              const prog = getCategoryProgress(cat.key, count);

              return (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryTabPill,
                    isSelected && styles.categoryTabPillActive,
                  ]}
                  onPress={() => setActiveCategory(cat.key)}
                  activeOpacity={0.8}
                >
                  <Text
                    variant="caption"
                    weight={isSelected ? '700' : '600'}
                    style={[
                      styles.categoryTabPillText,
                      isSelected && styles.categoryTabPillTextActive,
                    ]}
                  >
                    {`${cat.label} (${prog.unlockedCount}/12)`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Active Category Header Card */}
        <View style={styles.categoryHeaderCard}>
          <View style={styles.categoryHeaderInfo}>
            <Text variant="h3" style={styles.categoryTitle}>
              {getCategoryTitle(activeCategory)}
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.categorySubtitle}>
              {getCategorySubtitle(activeCategory)}
            </Text>
          </View>

          <View style={styles.categoryMetricsRow}>
            <Text variant="caption" weight="700" color={colors.textPrimary}>
              {`Your record: ${currentCategoryCount} ${getCategoryUnit(activeCategory, currentCategoryCount)}`}
            </Text>
            <Text variant="caption" weight="700" color={colors.accent}>
              {`${categoryProgress.unlockedCount} of 12 Unlocked`}
            </Text>
          </View>

          <View style={styles.categoryProgressBarTrack}>
            <View style={[styles.categoryProgressBarFill, { width: `${categoryProgress.progressPercent}%` }]} />
          </View>
        </View>

        {/* 3-Per-Row Grid of 12 Achievements */}
        <View style={styles.gridContainer}>
          {categoryProgress.milestones.map((m) => {
            const isEarned = currentCategoryCount >= m.target;
            return (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.achievementCard,
                  { width: cardWidth },
                  isEarned ? styles.achievementCardEarned : styles.achievementCardLocked,
                  shadow.sm,
                ]}
                onPress={() => handleCardPress(m)}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={`${m.title}, target ${m.target}, ${isEarned ? 'Unlocked' : 'Locked'}`}
              >
                {/* Category Vector Badge with Distinct Shape */}
                <View style={[styles.badgeContainer, !isEarned && styles.badgeLocked]}>
                  <CategoryBadge
                    category={m.category}
                    shape={m.shape}
                    days={m.target}
                    tier={m.tier}
                    size={48}
                    label={m.badgeLabel}
                  />
                </View>

                {/* Target Count Label */}
                <View style={[styles.targetPill, isEarned && styles.targetPillEarned]}>
                  <Text
                    variant="caption"
                    weight="800"
                    color={isEarned ? '#0F172A' : '#64748B'}
                    style={styles.targetLabelText}
                  >
                    {activeCategory === 'streak'
                      ? `Day ${m.target}`
                      : `${m.target} ${getCategoryUnit(m.category, m.target)}`}
                  </Text>
                </View>

                {/* Milestone Title */}
                <Text
                  variant="caption"
                  weight="700"
                  color={isEarned ? '#0F172A' : '#94A3B8'}
                  numberOfLines={2}
                  style={styles.cardTitle}
                >
                  {m.title}
                </Text>

                {/* Status Indicator (Checkmark if earned, Lock if locked) */}
                <View style={styles.statusIndicatorRow}>
                  {isEarned ? (
                    <View style={styles.statusEarnedTag}>
                      <CheckSvg size={10} color="#0F172A" strokeWidth={3} />
                      <Text variant="caption" weight="800" color="#0F172A" style={styles.statusEarnedText}>
                        EARNED
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.statusLockedTag}>
                      <LockSvg size={10} color="#94A3B8" />
                      <Text variant="caption" weight="600" color="#94A3B8" style={styles.statusLockedText}>
                        LOCKED
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Achievement & Streak Inspection Modal with Image Share */}
      <StreakMilestoneModal
        visible={isModalVisible}
        streak={currentStreak}
        achievement={selectedMilestone}
        onUpdateStreak={setStreak}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedMilestone(null);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // 60% Dominant Canvas #F8FAFC
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },

  // Global Summary Banner
  globalBanner: {
    backgroundColor: '#FFFFFF', // 30% Panel
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: 16,
  },
  globalBannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  globalPreTitle: {
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  globalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  globalBadgePill: {
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  globalSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  globalProgressBarTrack: {
    height: 6,
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  globalProgressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },

  // Category Selector Tabs
  categoryPillsWrapper: {
    marginBottom: 12,
  },
  categoryPillsScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  categoryTabPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  categoryTabPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryTabPillText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoryTabPillTextActive: {
    color: '#0F172A',
    fontWeight: '800',
  },

  // Category Header Card
  categoryHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: 16,
  },
  categoryHeaderInfo: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  categoryMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryProgressBarTrack: {
    height: 5,
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  categoryProgressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2.5,
  },

  // 3-Per-Row Grid Layout
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: 2,
    minHeight: 154,
    justifyContent: 'space-between',
  },
  achievementCardEarned: {
    borderColor: colors.accent,
    borderWidth: 1.5,
    backgroundColor: '#FEFCE8',
  },
  achievementCardLocked: {
    backgroundColor: '#FFFFFF',
    opacity: 0.88,
  },
  badgeContainer: {
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLocked: {
    opacity: 0.45,
  },
  targetPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  targetPillEarned: {
    backgroundColor: '#FEF9C3',
  },
  targetLabelText: {
    fontSize: 9.5,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 10.5,
    textAlign: 'center',
    lineHeight: 13,
    minHeight: 26,
    paddingHorizontal: 2,
  },
  statusIndicatorRow: {
    marginTop: 4,
  },
  statusEarnedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusEarnedText: {
    fontSize: 8,
    letterSpacing: 0.5,
  },
  statusLockedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  statusLockedText: {
    fontSize: 8,
    letterSpacing: 0.5,
  },
});
