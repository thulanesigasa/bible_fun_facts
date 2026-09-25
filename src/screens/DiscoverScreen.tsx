import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { supabase } from '../services/supabase';
import { getDailyMessage, getDayOfYear, DailyMessage } from '../data/dailyMessages';
import {
  FavoritesSvg,
  LandmarkSvg,
  StrongsIconSvg,
  BookOpenSvg,
  ShareSvg,
  ScrollSvg,
  ShieldCheckSvg,
  BellSvg,
} from '../components/SvgIcons';
import { StreakMilestoneModal } from '../components/StreakMilestoneModal';
import { StreakHexagonBadge } from '../components/StreakHexagonBadge';
import { NotificationQuickSheet } from '../components/NotificationQuickSheet';
import { InAppNotificationBanner } from '../components/InAppNotificationBanner';
import { getTierInfoForDays } from '../data/streakMilestones';
import { registerAllAutomatedNotifications } from '../services/notifications';

interface DiscoverScreenProps {
  navigation: any;
}

export default function DiscoverScreen({ navigation }: DiscoverScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showNotificationsSheet, setShowNotificationsSheet] = useState(false);

  const {
    streak,
    incrementFactsViewed,
    incrementSharesCount,
    userProfile,
    toggleFavoriteFact,
    isFactFavorited,
    lastReadBible,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    activeAchievementAlert,
    dismissAchievementAlert,
  } = useUser();

  const dayOfYear = useMemo(() => getDayOfYear(), []);
  const todayMessage: DailyMessage = useMemo(() => getDailyMessage(), []);
  const streakInfo = useMemo(() => getTierInfoForDays(streak || 1), [streak]);

  useEffect(() => {
    if (userProfile?.notificationsEnabled ?? true) {
      registerAllAutomatedNotifications().catch(() => {});
    }
  }, [userProfile?.notificationsEnabled]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await supabase
        .from('facts')
        .select('*')
        .limit(1);
    } catch (err) {
      console.warn('Sync notice:', err);
    }
    incrementFactsViewed();
    setRefreshing(false);
  }, [incrementFactsViewed]);

  const onShareMessage = async (message: DailyMessage) => {
    try {
      const shareText = `"${message.fact_title}" (${message.scripture_ref})\n\n"${message.verse_text}"\n\nContext:\n${message.historical_context}\n\nShared from exégeomai • Day ${message.dayOfYear} of 365`;
      const res = await Share.share({ message: shareText });
      if (res.action === Share.sharedAction) {
        incrementSharesCount();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isFavorited = isFactFavorited(todayMessage.id);

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
        {/* Top Header Row: Bell on Top-Left, Streak on Top-Right */}
        <View style={styles.topBarRow}>
          <TouchableOpacity
            style={styles.feedBellBtn}
            onPress={() => setShowNotificationsSheet(true)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Notifications. ${unreadNotificationsCount} unread. Tap to view.`}
          >
            <View style={styles.bellIconBox}>
              <BellSvg size={20} color={colors.textPrimary} />
              {unreadNotificationsCount > 0 && (
                <View style={styles.bellBadgeBubble}>
                  <Text style={styles.bellBadgeText}>
                    {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                  </Text>
                </View>
              )}
            </View>
            {unreadNotificationsCount > 0 && (
              <View style={styles.alertPill}>
                <Text variant="caption" weight="800" color="#0F172A" style={styles.alertPillText}>
                  {`${unreadNotificationsCount} NEW`}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerStreakBadgeOnlyBtn}
            onPress={() => setShowStreakModal(true)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Streak ${streak || 1}. Tap to open streak badge.`}
          >
            <StreakHexagonBadge days={streak || 1} size={44} />
          </TouchableOpacity>
        </View>

        {/* Header Greeting & Day Progress */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Text variant="h2" style={styles.headerTitle}>
              {userProfile?.name ? `Shalom, ${userProfile.name}` : 'Daily Exegesis'}
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.headerSub}>
              Day {dayOfYear} of 365 • {todayMessage.calendarDate}
            </Text>
          </View>
        </View>

        <View style={styles.hairlineDivider} />

        {/* 1. Resume Reading Row (Flat Body Row - Zero Card Divs) */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.navigate('WOTD')}
          style={styles.resumeReadingRow}
          accessibilityRole="button"
          accessibilityLabel={`Resume reading ${lastReadBible.book} Chapter ${lastReadBible.chapter}`}
        >
          <View style={styles.resumeLeft}>
            <View style={styles.resumeIconWrap}>
              <BookOpenSvg size={16} color={colors.accent} />
            </View>
            <View style={styles.resumeTextWrap}>
              <Text variant="caption" color={colors.textTertiary} weight="700" style={styles.resumeLabel}>
                RESUME READING
              </Text>
              <Text variant="h3" style={styles.resumeBookTitle}>
                {lastReadBible.book} Chapter {lastReadBible.chapter}
              </Text>
            </View>
          </View>

          <View style={styles.resumeActionCue}>
            <Text variant="caption" weight="700" color={colors.accent}>
              Open ›
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.hairlineDivider} />

        {/* 2. Today's Singular Daily Message (Flat Body Section - Zero Card Divs) */}
        <View style={styles.dailySection}>
          {/* Section Sub-Header Row */}
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <ScrollSvg size={15} color={colors.accent} />
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeaderLabel}>
                TODAY'S MESSAGE
              </Text>
            </View>
          </View>

          {/* Category & Scripture Meta */}
          <View style={styles.metaRow}>
            <Text variant="caption" weight="700" color={colors.accent} style={{ letterSpacing: 0.5 }}>
              {todayMessage.category.toUpperCase()}
            </Text>
            <Text variant="caption" color={colors.textTertiary}>
              • {todayMessage.scripture_ref}
            </Text>
          </View>

          {/* Prominent Message Title */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => navigation.navigate('FactDetails', { fact: todayMessage })}
          >
            <Text variant="h2" style={styles.messageTitle}>
              {todayMessage.fact_title}
            </Text>
          </TouchableOpacity>

          {/* Scripture Quote Box (Flat Quote Block with Accent Left-Border) */}
          <View style={styles.verseBox}>
            <Text variant="body" style={styles.verseText}>
              "{todayMessage.verse_text}"
            </Text>
            <Text variant="caption" weight="600" color={colors.textSecondary} style={styles.verseRef}>
              — {todayMessage.scripture_ref}
            </Text>
          </View>

          {/* Historical Context Narrative Directly in Body */}
          <Text variant="body" color={colors.textSecondary} style={styles.contextText}>
            {todayMessage.historical_context}
          </Text>

          {/* Root Word Pill if available */}
          {todayMessage.strongs_word && (
            <View style={styles.rootWordPill}>
              <View style={styles.rootIconWrap}>
                <StrongsIconSvg size={14} color={colors.accent} />
              </View>
              <View style={styles.rootTextWrap}>
                <Text variant="caption" color={colors.textPrimary} weight="700">
                  {todayMessage.strongs_word} ({todayMessage.strongs_transliteration})
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Strong's {todayMessage.strongs_number}: "{todayMessage.strongs_definition}"
                </Text>
              </View>
            </View>
          )}

          {/* Cultural Practice Context if available */}
          {todayMessage.cultural_practice && (
            <View style={styles.culturalBox}>
              <View style={styles.culturalHeader}>
                <LandmarkSvg size={13} color={colors.accent} />
                <Text variant="caption" weight="700" color={colors.accent}>
                  Biblical Custom
                </Text>
              </View>
              <Text variant="caption" color={colors.textSecondary} style={styles.culturalText}>
                {todayMessage.cultural_practice}
              </Text>
            </View>
          )}

          {/* Interactive Card Action Bar: Read Whole Message + Save + Share */}
          <View style={styles.cardActionsBar}>
            <TouchableOpacity
              style={styles.readMorePrompt}
              onPress={() => navigation.navigate('FactDetails', { fact: todayMessage })}
              activeOpacity={0.7}
            >
              <Text variant="caption" weight="700" color={colors.accent}>
                Read Whole Message ›
              </Text>
            </TouchableOpacity>

            <View style={styles.actionIconsRight}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => toggleFavoriteFact(todayMessage)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel="Bookmark today's message"
              >
                <FavoritesSvg
                  size={18}
                  color={colors.accent}
                  fill={isFavorited ? colors.accent : 'none'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => onShareMessage(todayMessage)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel="Share today's message"
              >
                <ShareSvg size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Real-time In-App Achievement Alert Banner */}
      <InAppNotificationBanner
        alert={activeAchievementAlert}
        onPress={() => {
          dismissAchievementAlert();
          setShowNotificationsSheet(true);
        }}
        onDismiss={dismissAchievementAlert}
      />

      {/* 3D Cal AI Style Streak Milestone Modal */}
      <StreakMilestoneModal
        visible={showStreakModal}
        streak={streak}
        onClose={() => setShowStreakModal(false)}
      />

      {/* Notification & Achievement Quick Sheet */}
      <NotificationQuickSheet
        visible={showNotificationsSheet}
        onClose={() => setShowNotificationsSheet(false)}
        notifications={notifications}
        unreadCount={unreadNotificationsCount}
        onMarkAllRead={markAllNotificationsAsRead}
        onNotificationPress={(item) => {
          setShowNotificationsSheet(false);
          markNotificationAsRead(item.id);
          if (item.type === 'achievement') {
            navigation.navigate('Achievements');
          } else if (item.actionRoute) {
            navigation.navigate(item.actionRoute, item.actionParams);
          }
        }}
        onOpenNotificationsScreen={() => {
          setShowNotificationsSheet(false);
          navigation.navigate('Notifications');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 96,
    backgroundColor: '#FFFFFF',
  },
  topBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  feedBellBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  bellIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    position: 'relative',
  },
  bellBadgeBubble: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  bellBadgeText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  alertPill: {
    backgroundColor: 'rgba(253, 210, 35, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  alertPillText: {
    fontSize: 9.5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  headerTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  headerTitle: {
    color: colors.textPrimary,
  },
  headerSub: {
    marginTop: 2,
  },
  headerStreakBadgeOnlyBtn: {
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Subtle Hairline Divider (like Settings / ProfileScreen)
  hairlineDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: spacing.md,
  },

  // Resume Reading Row (Flat Body Row)
  resumeReadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  resumeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  resumeIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeTextWrap: {
    flex: 1,
  },
  resumeLabel: {
    letterSpacing: 0.5,
    fontSize: 10,
  },
  resumeBookTitle: {
    fontSize: 15,
    marginTop: 1,
    color: colors.textPrimary,
  },
  resumeActionCue: {
    paddingLeft: 8,
  },

  // Daily Message Body Section (Flat - Zero Card Divs)
  dailySection: {
    paddingTop: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionHeaderLabel: {
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  verseBox: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: radius.sm,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  verseText: {
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  verseRef: {
    marginTop: 6,
    textAlign: 'right',
  },
  contextText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  rootWordPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
    borderRadius: radius.sm,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  rootIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootTextWrap: {
    flex: 1,
  },
  culturalBox: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)',
    borderRadius: radius.sm,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.2)',
  },
  culturalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  culturalText: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  cardActionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
  },
  readMorePrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionIconsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    padding: 2,
  },
});
