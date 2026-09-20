import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { wotd, LENS_TABS } from '../data/mockDatabase';
import { useUser } from '../context/UserContext';
import {
  OriginalIntentSvg,
  TheologicalTruthSvg,
  ModernWalkSvg,
  PrayerFocusSvg,
  CheckSvg,
  ShareSvg,
  WotdSvg,
  CalendarSvg,
} from '../components/SvgIcons';

type LensKey = 'original_intent' | 'theological_truth' | 'modern_walk' | 'prayer_focus';

const getLensIcon = (key: LensKey, color: string) => {
  const size = 18;
  switch (key) {
    case 'original_intent':
      return <OriginalIntentSvg size={size} color={color} />;
    case 'theological_truth':
      return <TheologicalTruthSvg size={size} color={color} />;
    case 'modern_walk':
      return <ModernWalkSvg size={size} color={color} />;
    case 'prayer_focus':
      return <PrayerFocusSvg size={size} color={color} />;
  }
};

export default function WOTDScreen() {
  const [activeLens, setActiveLens] = useState<LensKey>('original_intent');
  const { markWOTDComplete, isWOTDCompleted } = useUser();
  const completed = isWOTDCompleted(wotd.id);

  const onShare = async () => {
    try {
      const message = `${wotd.verse}\n- ${wotd.reference}\n\nOriginal Intent:\n${wotd.original_intent}\n\nTheological Truth:\n${wotd.theological_truth}\n\nModern Walk:\n${wotd.modern_walk}\n\nPrayer Focus:\n${wotd.prayer_focus}`;
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  const getLensContent = () => {
    switch (activeLens) {
      case 'original_intent': return wotd.original_intent;
      case 'theological_truth': return wotd.theological_truth;
      case 'modern_walk': return wotd.modern_walk;
      case 'prayer_focus': return wotd.prayer_focus;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <WotdSvg size={24} color={colors.accent} fill={colors.accentSoft} />
            <Text variant="h2" style={styles.titleText}>Daily Word & Exegesis</Text>
          </View>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Deepen your understanding across 4 distinct analytical perspectives
          </Text>
        </View>

        {/* Verse Highlight Card */}
        <Card style={styles.verseCard}>
          <View style={styles.metaRow}>
            <CalendarSvg size={14} color={colors.accent} />
            <Text variant="label" color={colors.accent} style={styles.metaLabel}>DAILY SCRIPTURE</Text>
          </View>

          <View style={styles.quoteWrapper}>
            <Text variant="h2" style={styles.verseText}>
              "{wotd.verse}"
            </Text>
          </View>

          <Text variant="h3" style={styles.verseRef}>{wotd.reference}</Text>
        </Card>

        {/* Lens Selection Tabs */}
        <Text variant="h3" style={styles.sectionTitle}>Choose Analytical Lens</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lensTabsContainer}
          style={styles.lensTabsScroll}
        >
          {LENS_TABS.map((tab) => {
            const active = activeLens === tab.key;
            const iconColor = active ? colors.accent : colors.textSecondary;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.lensTab, active && styles.lensTabActive]}
                onPress={() => setActiveLens(tab.key as LensKey)}
                activeOpacity={0.7}
              >
                {getLensIcon(tab.key as LensKey, iconColor)}
                <Text
                  variant="label"
                  style={[styles.lensTabLabel, active && styles.lensTabLabelActive]}
                  weight={active ? '700' : '500'}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Selected Lens Explanation Card */}
        <Card style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <View style={styles.insightHeaderLeft}>
              {getLensIcon(activeLens, colors.accent)}
              <Text variant="h3" style={styles.insightTitle}>
                {LENS_TABS.find(t => t.key === activeLens)?.label}
              </Text>
            </View>
          </View>

          <Text variant="body" color={colors.textPrimary} style={styles.insightBody}>
            {getLensContent()}
          </Text>
        </Card>

        {/* Reflection & Memory Verse Box */}
        <View style={styles.memoryContainer}>
          <Text variant="label" color={colors.accent} style={{ letterSpacing: 0.5, marginBottom: spacing.sm }}>
            MEMORY VERSE
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.memoryText}>
            {wotd.memory_verse}
          </Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.completeBtn, completed && styles.completeBtnActive, shadow.sm]}
            onPress={() => markWOTDComplete(wotd)}
            activeOpacity={0.85}
          >
            <CheckSvg size={18} color={completed ? '#FFFFFF' : colors.accent} />
            <Text
              variant="label"
              weight="800"
              style={[styles.completeText, completed && styles.completeTextActive]}
            >
              {completed ? 'COMPLETED TODAY' : 'MARK AS READ'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.shareBtn, shadow.sm]}
            onPress={onShare}
            activeOpacity={0.8}
          >
            <ShareSvg size={20} color={colors.textPrimary} />
          </TouchableOpacity>
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
    padding: spacing.md, // 16px margins & gutters
    paddingBottom: 96, // 96px ensures content clears floating pill tab bar
  },
  header: {
    marginTop: spacing.sm, // 8px
    marginBottom: spacing.md, // 16px
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  titleText: {
    fontSize: 22,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
  },
  verseCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg, // 24px
    padding: spacing.lg, // 24px
    marginBottom: spacing.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm, // 8px
  },
  metaLabel: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  quoteWrapper: {
    marginBottom: spacing.md, // 16px
  },
  verseText: {
    fontSize: 19,
    fontStyle: 'italic',
    lineHeight: 27,
    color: colors.textPrimary,
  },
  verseRef: {
    color: colors.accent,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 17,
    color: colors.textPrimary,
    marginBottom: spacing.sm, // 8px
  },
  lensTabsScroll: {
    marginBottom: spacing.lg, // 24px
  },
  lensTabsContainer: {
    flexDirection: 'row',
    gap: spacing.md, // 16px
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 2,
  },
  lensTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.sm, // 8px
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  lensTabActive: {
    borderBottomColor: colors.accent,
  },
  lensTabLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  lensTabLabelActive: {
    color: colors.accent,
  },
  insightCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg, // 24px
    padding: spacing.lg, // 24px
    marginBottom: spacing.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md, // 16px
  },
  insightHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  insightTitle: {
    fontSize: 17,
    color: colors.accent,
  },
  insightBody: {
    fontSize: 15,
    lineHeight: 23,
  },
  memoryContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.md, // 16px
    padding: spacing.md, // 16px
    marginBottom: spacing.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
  },
  memoryText: {
    fontStyle: 'italic',
    lineHeight: 22,
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md, // 16px
    marginBottom: spacing.md, // 16px
  },
  completeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm, // 8px
    paddingVertical: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  completeBtnActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  completeText: {
    color: colors.accent,
    letterSpacing: 0.5,
  },
  completeTextActive: {
    color: '#FFFFFF',
  },
  shareBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.md, // 16px
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
