import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { CategoryBadge } from '../components/CategoryBadge';
import { StreakMilestoneModal } from '../components/StreakMilestoneModal';
import {
  AchievementCategory,
  AchievementMilestone,
  getCategoryProgress,
  getCategoryTitle,
  getCategorySubtitle,
  getCategoryUnit,
  getTotalAchievementsProgress,
} from '../data/achievements';

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

  // Responsive 3-per-row grid calculation (horizontal padding 16px, gap 8px)
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
        {/* Global Summary Header (Direct Body Layout, Zero Floating Cards / Divs) */}
        <View style={styles.headerSection}>
          <View style={styles.headerTopRow}>
            <View>
              <Text variant="caption" weight="800" color={colors.accent} style={styles.preTitle}>
                HONOR & DEVOTION
              </Text>
              <Text variant="h2" style={styles.title}>
                Study Achievements
              </Text>
            </View>
            <View style={styles.progressCounterPill}>
              <Text variant="caption" weight="800" color="#0F172A">
                {`${totalProgress.totalUnlocked} of 48 UNLOCKED`}
              </Text>
            </View>
          </View>
          <Text variant="caption" color={colors.textSecondary} style={styles.subtitle}>
            Grow in sacred wisdom by meditating on scripture, preserving verses, and sharing biblical truth.
          </Text>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${totalProgress.percent}%` }]} />
          </View>
        </View>

        {/* Category Selector Tabs (Direct Body, Zero Divs) */}
        <View style={styles.categorySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.categorySectionLabel}>
            SELECT CATEGORY
          </Text>
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

        {/* Active Category Overview (Direct Body Layout, Zero Divs) */}
        <View style={styles.activeCategorySection}>
          <View style={styles.activeCategoryInfo}>
            <Text variant="h3" style={styles.activeCategoryTitle}>
              {getCategoryTitle(activeCategory)}
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.activeCategorySubtitle}>
              {getCategorySubtitle(activeCategory)}
            </Text>
          </View>

          <View style={styles.categoryMetricsRow}>
            <Text variant="caption" weight="700" color={colors.textPrimary}>
              {`Your record: ${currentCategoryCount} ${getCategoryUnit(activeCategory, currentCategoryCount)}`}
            </Text>
            <Text variant="caption" weight="700" color={colors.accentDark}>
              {`${categoryProgress.unlockedCount} of 12 Unlocked`}
            </Text>
          </View>

          <View style={styles.categoryProgressBarTrack}>
            <View style={[styles.categoryProgressBarFill, { width: `${categoryProgress.progressPercent}%` }]} />
          </View>
        </View>

        {/* 3-Per-Row Grid of 12 Achievements (Flat Blocks, Zero Divs, Zero Icons) */}
        <View style={styles.gridContainer}>
          {categoryProgress.milestones.map((m) => {
            const isEarned = currentCategoryCount >= m.target;
            return (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.achievementCell,
                  { width: cardWidth },
                  isEarned ? styles.achievementCellEarned : styles.achievementCellLocked,
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
                  style={styles.cellTitle}
                >
                  {m.title}
                </Text>

                {/* Status Indicator (Clean Typography - Zero Icons) */}
                <View style={styles.statusIndicatorRow}>
                  {isEarned ? (
                    <View style={styles.statusEarnedTag}>
                      <Text variant="caption" weight="800" color="#0F172A" style={styles.statusEarnedText}>
                        EARNED
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.statusLockedTag}>
                      <Text variant="caption" weight="700" color="#94A3B8" style={styles.statusLockedText}>
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
    backgroundColor: '#FFFFFF', // Continuous flat 30% panel body surface
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 48,
  },

  // Flat Direct Body Header Section (Zero Divs / Floating Cards)
  headerSection: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: 14,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  preTitle: {
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  progressCounterPill: {
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  progressBarTrack: {
    height: 4,
    width: '100%',
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },

  // Category Selector Section (Direct Body Layout)
  categorySection: {
    marginBottom: 14,
  },
  categorySectionLabel: {
    fontSize: 10.5,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  categoryPillsScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  categoryTabPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
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

  // Active Category Overview (Direct Body Layout, Zero Floating Divs)
  activeCategorySection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: 14,
  },
  activeCategoryInfo: {
    marginBottom: 8,
  },
  activeCategoryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  activeCategorySubtitle: {
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
    height: 4,
    width: '100%',
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  categoryProgressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },

  // 3-Per-Row Grid (Direct Flat Cells, Zero Divs, Zero Shadows)
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
  },
  achievementCell: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: 2,
    minHeight: 150,
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
  },
  achievementCellEarned: {
    borderColor: colors.accent,
    backgroundColor: '#FEFCE8',
  },
  achievementCellLocked: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(15, 23, 42, 0.06)',
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
    borderRadius: 6,
    marginBottom: 4,
  },
  targetPillEarned: {
    backgroundColor: '#FEF9C3',
  },
  targetLabelText: {
    fontSize: 9.5,
    textAlign: 'center',
  },
  cellTitle: {
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
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusEarnedText: {
    fontSize: 8.5,
    letterSpacing: 0.5,
  },
  statusLockedTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  statusLockedText: {
    fontSize: 8.5,
    letterSpacing: 0.5,
  },
});
