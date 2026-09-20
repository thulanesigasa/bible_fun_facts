import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { WOTDEntry, LENS_TABS } from '../data/mockDatabase';
import {
  OriginalIntentSvg,
  TheologicalTruthSvg,
  ModernWalkSvg,
  PrayerFocusSvg,
  ShareSvg,
  CalendarSvg,
  QuoteSvg,
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

export default function WOTDDetailsScreen({ navigation, route }: { navigation: any; route: any }) {
  const { wotd } = route.params as { wotd: WOTDEntry };
  const [activeLens, setActiveLens] = useState<LensKey>('original_intent');

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
    <View style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Text variant="h3" style={styles.doneText}>Done</Text>
        </TouchableOpacity>
        <Text variant="h3" style={styles.headerTitle}>Scripture Deep Dive</Text>
        <TouchableOpacity onPress={onShare} activeOpacity={0.8}>
          <ShareSvg size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Verse Card */}
        <Card style={styles.verseCard}>
          <View style={styles.metaRow}>
            <CalendarSvg size={14} color={colors.accent} />
            <Text variant="label" color={colors.accent} style={styles.metaLabel}>SAVED ENTRY</Text>
          </View>

          <View style={styles.quoteWrapper}>
            <QuoteSvg size={24} color={colors.accent} style={{ marginBottom: spacing.md }} />
            <Text variant="h2" style={styles.verseText}>
              "{wotd.verse}"
            </Text>
            <Text variant="h3" style={styles.verseRef}>{wotd.reference}</Text>
          </View>
        </Card>

        {/* Lens Selection */}
        <Text variant="h3" style={styles.sectionTitle}>Understand the Depth</Text>
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
                  weight={active ? '700' : '500'}
                  style={[styles.lensTabLabel, active && styles.lensTabLabelActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Dynamic Lens Content */}
        <Card style={styles.contentCard}>
          <View style={styles.contentHeader}>
            {getLensIcon(activeLens, colors.accent)}
            <Text variant="h2" style={styles.contentTitle}>
              {LENS_TABS.find(t => t.key === activeLens)?.label}
            </Text>
          </View>
          <Text variant="body" color={colors.textPrimary} style={styles.bodyText}>
            {getLensContent()}
          </Text>
        </Card>

        {/* Memory Verse Card */}
        <View style={styles.memoryContainer}>
          <Text variant="label" color={colors.accent} style={{ marginBottom: spacing.sm, letterSpacing: 1 }}>
            MEMORY VERSE
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.memoryText}>
            {wotd.memory_verse}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md, // 16px
    paddingVertical: spacing.md, // 16px
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  doneText: {
    color: colors.accent,
  },
  headerTitle: {
    color: colors.textPrimary,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md, // 16px margins & gutters
    paddingBottom: spacing.xxl, // 48px
  },
  verseCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl, // 32px
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
    marginBottom: spacing.sm, // 8px
  },
  verseText: {
    fontSize: 20,
    fontStyle: 'italic',
    lineHeight: 28,
    color: colors.textPrimary,
    marginBottom: spacing.md, // 16px
  },
  verseRef: {
    color: colors.accent,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
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
    color: colors.textSecondary,
    fontSize: 13,
  },
  lensTabLabelActive: {
    color: colors.accent,
  },
  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg, // 24px
    padding: spacing.lg, // 24px
    marginBottom: spacing.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginBottom: spacing.md, // 16px
  },
  contentTitle: {
    fontSize: 18,
    color: colors.accent,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  memoryContainer: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md, // 16px
    padding: spacing.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
  },
  memoryText: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
