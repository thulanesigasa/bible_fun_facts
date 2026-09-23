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
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
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

          <View style={styles.streakInline}>
            <FlameSvg size={14} color={colors.accent} fill={colors.accent} />
            <Text variant="caption" weight="700" color={colors.accent}>
              {streak}d
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
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
  streakInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
