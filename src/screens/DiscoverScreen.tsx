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
import { useUser } from '../context/UserContext';
import { supabase } from '../services/supabase';
import { getDailyMessage, getDayOfYear, DailyMessage } from '../data/dailyMessages';
import {
  FlameSvg,
  FavoritesSvg,
  LandmarkSvg,
  StrongsIconSvg,
  BookOpenSvg,
  ShareSvg,
  ScrollSvg,
} from '../components/SvgIcons';

interface DiscoverScreenProps {
  navigation: any;
}

export default function DiscoverScreen({ navigation }: DiscoverScreenProps) {
  const [refreshing, setRefreshing] = useState(false);

  const {
    streak,
    incrementFactsViewed,
    userProfile,
    toggleFavoriteFact,
    isFactFavorited,
    lastReadBible,
  } = useUser();

  const dayOfYear = useMemo(() => getDayOfYear(), []);
  const todayMessage: DailyMessage = useMemo(() => getDailyMessage(), []);

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
      await Share.share({ message: shareText });
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
        {/* Header Greeting & Day Progress + Compact Streak Pill */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Text variant="h2" style={styles.headerTitle}>
              {userProfile?.name ? `Shalom, ${userProfile.name}` : 'Daily Exegesis'}
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.headerSub}>
              Day {dayOfYear} of 365 • {todayMessage.calendarDate}
            </Text>
          </View>

          <View style={styles.streakPill}>
            <FlameSvg size={14} color={colors.accent} fill={colors.accent} />
            <Text variant="caption" weight="700" color={colors.accent}>
              {streak}d streak
            </Text>
          </View>
        </View>

        {/* 1. Quick Jump: Continue Scripture Card */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => navigation.navigate('WOTD')}
          style={[styles.continueCard, shadow.sm]}
        >
          <View style={styles.continueLeft}>
            <View style={styles.continueIconWrap}>
              <BookOpenSvg size={18} color={colors.accent} />
            </View>
            <View style={styles.continueTextWrap}>
              <Text variant="caption" color={colors.accent} weight="700">
                Resume Reading
              </Text>
              <Text variant="h3" style={styles.continueTitle}>
                {lastReadBible.book} Chapter {lastReadBible.chapter}
              </Text>
            </View>
          </View>
          <View style={styles.continueActionBtn}>
            <Text variant="caption" weight="700" color="#0F172A">
              Open ›
            </Text>
          </View>
        </TouchableOpacity>

        {/* 2. Today's Singular Daily Message (Locked to 1 per day) */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => navigation.navigate('FactDetails', { fact: todayMessage })}
          accessibilityRole="button"
          accessibilityLabel={`Today's Message: ${todayMessage.fact_title}`}
        >
          <Card style={styles.dailyCard}>
            {/* Header row with badge and calendar reference */}
            <View style={styles.cardSectionHeader}>
              <View style={styles.cardHeaderTitleRow}>
                <ScrollSvg size={15} color={colors.accent} />
                <Text variant="h3" color={colors.accent} style={styles.sectionHeaderTitle}>
                  Today's Message
                </Text>
              </View>
              <View style={styles.dayBadge}>
                <Text variant="caption" weight="700" color={colors.accent}>
                  Day {todayMessage.dayOfYear}
                </Text>
              </View>
            </View>

            {/* Scripture Reference & Title */}
            <View style={styles.metaRow}>
              <Text variant="caption" weight="700" color={colors.accent} style={{ letterSpacing: 0.5 }}>
                {todayMessage.category.toUpperCase()}
              </Text>
              <Text variant="caption" color={colors.textTertiary}>
                • {todayMessage.scripture_ref}
              </Text>
            </View>

            <Text variant="h2" style={styles.messageTitle}>
              {todayMessage.fact_title}
            </Text>

            {/* Scripture Quote Box */}
            <View style={styles.verseBox}>
              <Text variant="body" style={styles.verseText}>
                "{todayMessage.verse_text}"
              </Text>
              <Text variant="caption" weight="600" color={colors.textSecondary} style={styles.verseRef}>
                — {todayMessage.scripture_ref}
              </Text>
            </View>

            {/* Historical Context Narrative */}
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
              <View style={styles.readMorePrompt}>
                <Text variant="caption" weight="700" color={colors.accent}>
                  Read Whole Message ›
                </Text>
              </View>

              <View style={styles.actionIconsRight}>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => toggleFavoriteFact(todayMessage)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
                >
                  <ShareSvg size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 96,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
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
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.2)',
  },

  // Continue Reading Card
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
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
  continueIconWrap: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueTextWrap: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 15,
    marginTop: 1,
  },
  continueActionBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },

  // Daily Message Card
  dailyCard: {
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  cardSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  dayBadge: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.25)',
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
    marginBottom: 10,
  },
  verseBox: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radius.sm,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  verseText: {
    fontStyle: 'italic',
    fontSize: 13,
    lineHeight: 19,
    color: colors.textPrimary,
  },
  verseRef: {
    marginTop: 4,
    textAlign: 'right',
  },
  contextText: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  rootWordPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
    borderRadius: radius.sm,
    padding: 10,
    marginBottom: 10,
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
    marginBottom: 12,
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
  },
  cardActionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.05)',
  },
  readMorePrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionIconsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 2,
  },
});
