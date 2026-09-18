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
import { spacing, radius } from '../theme';
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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <WotdSvg size={28} color={colors.accent} fill={colors.accentSoft} />
            <Text variant="h1" style={styles.titleText}>Word of the Day</Text>
          </View>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Deepen your understanding with 4 distinct analytical lenses
          </Text>
        </View>

        {/* Verse Highlight Card */}
        <Card style={styles.verseCard}>
          <View style={styles.dateBadge}>
            <CalendarSvg size={14} color={colors.accent} />
            <Text variant="label" color={colors.accent} style={{ fontSize: 10 }}>DAILY DEVOTION</Text>
          </View>

          <View style={styles.quoteWrapper}>
            <Text variant="h2" style={styles.verseText}>
              "{wotd.verse}"
            </Text>
          </View>

          <Text variant="h3" style={styles.verseRef}>{wotd.reference}</Text>
        </Card>

        {/* Lens Selection Grid */}
        <Text variant="h3" style={styles.sectionTitle}>Choose Your Analytical Lens</Text>

        <View style={styles.lensGrid}>
          {LENS_TABS.map((tab) => {
            const active = activeLens === tab.key;
            const iconColor = active ? colors.accent : colors.textSecondary;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.lensBtn, active && styles.lensBtnActive]}
                onPress={() => setActiveLens(tab.key as LensKey)}
                activeOpacity={0.8}
              >
                <View style={[styles.lensIconBox, active && styles.lensIconBoxActive]}>
                  {getLensIcon(tab.key as LensKey, iconColor)}
                </View>
                <Text
                  variant="label"
                  style={[styles.lensLabel, active && styles.lensLabelActive]}
                  weight={active ? '800' : '600'}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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
          <Text variant="label" color={colors.accent} style={{ letterSpacing: 1, marginBottom: spacing.sm }}>
            MEMORY VERSE
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.memoryText}>
            {wotd.memory_verse}
          </Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.completeBtn, completed && styles.completeBtnActive]}
            onPress={() => markWOTDComplete(wotd)}
            activeOpacity={0.85}
          >
            <CheckSvg size={18} color={completed ? colors.background : colors.accent} />
            <Text
              variant="label"
              weight="800"
              style={[styles.completeText, completed && styles.completeTextActive]}
            >
              {completed ? 'COMPLETED TODAY' : 'MARK AS READ'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareBtn}
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
    paddingBottom: spacing.xxl, // 48px
  },
  header: {
    marginBottom: spacing.lg, // 24px
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  titleText: {
    fontSize: 28,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm, // 8px
    fontSize: 16,
  },
  verseCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl, // 32px
    padding: spacing.lg, // 24px
    marginBottom: spacing.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    alignSelf: 'flex-start',
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: 4,
    borderRadius: radius.full,
    marginBottom: spacing.md, // 16px
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  quoteWrapper: {
    marginBottom: spacing.md, // 16px
  },
  verseText: {
    fontSize: 20,
    fontStyle: 'italic',
    lineHeight: 28,
    color: colors.textPrimary,
  },
  verseRef: {
    color: colors.accent,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: spacing.md, // 16px
  },
  lensGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm, // 8px
    marginBottom: spacing.lg, // 24px
  },
  lensBtn: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    padding: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lensBtnActive: {
    borderColor: colors.accentBorder,
    backgroundColor: colors.accentSoft,
  },
  lensIconBox: {
    width: 32,
    height: 32,
    borderRadius: radius.sm, // 8px
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lensIconBoxActive: {
    backgroundColor: colors.surface,
  },
  lensLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  lensLabelActive: {
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
    fontSize: 18,
    color: colors.accent,
  },
  insightBody: {
    fontSize: 16,
    lineHeight: 24,
  },
  memoryContainer: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md, // 16px
    padding: spacing.md, // 16px
    marginBottom: spacing.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
  },
  memoryText: {
    fontStyle: 'italic',
    lineHeight: 22,
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
    letterSpacing: 1,
  },
  completeTextActive: {
    color: colors.background,
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
