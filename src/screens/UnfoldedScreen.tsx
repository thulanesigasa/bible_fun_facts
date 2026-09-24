import React, { useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { DAILY_MESSAGES, DailyMessage, getDayOfYear } from '../data/dailyMessages';
import { BookOpenSvg, ScrollSvg, StrongsIconSvg } from '../components/SvgIcons';

interface UnfoldedScreenProps {
  navigation: any;
}

export default function UnfoldedScreen({ navigation }: UnfoldedScreenProps) {
  useUser(); // keeps context subscription alive for realtime streak sync
  const dayOfYear = useMemo(() => getDayOfYear(), []);

  // Today's day-of-year is the authoritative ceiling — every day from Day 1
  // up to and including today has been "unfolded". factsViewedCount from
  // Supabase is a stale engagement counter, NOT the calendar window.
  const unlockedCount = useMemo(() => {
    return Math.max(1, Math.min(365, dayOfYear));
  }, [dayOfYear]);

  // Slice DAILY_MESSAGES[0..unlockedCount-1] (Day 1 → today), then reverse
  // so today's entry appears at the top of the list.
  const unfoldedFacts: DailyMessage[] = useMemo(() => {
    return DAILY_MESSAGES.slice(0, unlockedCount).reverse();
  }, [unlockedCount]);

  const handleOpenFact = (fact: DailyMessage) => {
    navigation.navigate('FactDetails', { fact });
  };

  const renderUnfoldedRow = ({ item, index }: { item: DailyMessage; index: number }) => {
    const isLast = index === unfoldedFacts.length - 1;

    return (
      <TouchableOpacity
        style={[styles.unfoldedRow, !isLast && styles.rowDivider]}
        activeOpacity={0.75}
        onPress={() => handleOpenFact(item)}
        accessibilityRole="button"
        accessibilityLabel={`View unfolded exegesis for Day ${item.dayOfYear}: ${item.fact_title}`}
      >
        {/* Top Header: Day Badge & Calendar Date */}
        <View style={styles.rowHeader}>
          <View style={styles.dayBadgeWrap}>
            <View style={styles.dayDot} />
            <Text variant="caption" weight="800" color="#0F172A" style={styles.dayBadgeText}>
              Day {item.dayOfYear}
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.dateText}>
              • {item.calendarDate}
            </Text>
          </View>
        </View>

        {/* Fact Title */}
        <Text variant="h3" style={styles.factTitle}>
          {item.fact_title}
        </Text>

        {/* Scripture Reference */}
        <Text variant="caption" weight="700" color={colors.accentDark} style={styles.scriptureRef}>
          {item.scripture_ref}
        </Text>

        {/* Exegesis Verse Quote */}
        {item.verse_text ? (
          <Text style={styles.verseQuoteText} numberOfLines={3}>
            "{item.verse_text.trim()}"
          </Text>
        ) : null}

        {/* Strong's Linguistic Highlight Chip (if available) */}
        {item.strongs_word ? (
          <View style={styles.strongsChip}>
            <StrongsIconSvg size={13} color={colors.accentDark} />
            <Text variant="caption" color="#475569" style={styles.strongsChipText} numberOfLines={1}>
              <Text weight="700" color="#0F172A">{item.strongs_transliteration || item.strongs_word}</Text>
              {item.strongs_number ? ` (${item.strongs_number})` : ''}: {item.strongs_definition}
            </Text>
          </View>
        ) : null}

        {/* Action Footer */}
        <View style={styles.actionFooter}>
          <View style={styles.actionPrompt}>
            <BookOpenSvg size={13} color={colors.accentDark} />
            <Text variant="caption" weight="700" color={colors.accentDark} style={styles.actionText}>
              Read Full Exegesis ›
            </Text>
          </View>
          <Text variant="caption" color={colors.textTertiary}>
            Tap to open
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={unfoldedFacts}
        keyExtractor={(item) => item.id}
        renderItem={renderUnfoldedRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrap}>
              <ScrollSvg size={36} color={colors.accent} strokeWidth={1.5} />
            </View>
            <Text variant="h3" style={styles.emptyTitle}>
              No Exegeses Unfolded Yet
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.emptyMessage}>
              Each day of your scripture journey unlocks a deep historical and cultural exegesis.
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('DiscoverMain')}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Explore daily exegesis"
            >
              <Text variant="caption" weight="700" color="#0F172A">
                Explore Daily Exegesis
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Continuous flat 30% panel body surface
  },
  listContent: {
    paddingBottom: 96,
  },

  // Continuous flat body row styling (no card divs)
  unfoldedRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },

  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dayBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  dayBadgeText: {
    fontSize: 12,
    letterSpacing: 0.3,
  },
  dateText: {
    fontSize: 12,
  },


  factTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginTop: 2,
  },
  scriptureRef: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 6,
  },
  verseQuoteText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#475569',
    fontStyle: 'italic',
    marginBottom: 8,
  },

  strongsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  strongsChipText: {
    fontSize: 11,
    flex: 1,
  },

  actionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  actionPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    fontSize: 12,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 80,
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(253, 210, 35, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  exploreBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.accent,
    borderRadius: 12,
  },
});
