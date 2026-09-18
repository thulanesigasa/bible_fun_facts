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
          <View style={styles.dateBadge}>
            <CalendarSvg size={14} color={colors.accent} />
            <Text variant="label" color={colors.accent} style={{ fontSize: 10 }}>SAVED ENTRY</Text>
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
                {getLensIcon(tab.key as LensKey, iconColor)}
                <Text
                  variant="caption"
                  weight="700"
                  style={[styles.lensBtnText, active && styles.lensBtnTextActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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
  lensBtnText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  lensBtnTextActive: {
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
