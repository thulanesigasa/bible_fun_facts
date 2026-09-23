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
import { wotd, LENS_TABS } from '../data/mockDatabase';
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

export default function WOTDDetailsScreen({ navigation }: { navigation: any }) {
  const [activeLens, setActiveLens] = useState<LensKey>('original_intent');

  const getLensIcon = (key: LensKey, color: string) => {
    switch (key) {
      case 'original_intent':
        return <OriginalIntentSvg size={18} color={color} />;
      case 'theological_truth':
        return <TheologicalTruthSvg size={18} color={color} />;
      case 'modern_walk':
        return <ModernWalkSvg size={18} color={color} />;
      case 'prayer_focus':
        return <PrayerFocusSvg size={18} color={color} />;
      default:
        return null;
    }
  };

  const getLensContent = () => {
    switch (activeLens) {
      case 'original_intent':
        return wotd.original_intent;
      case 'theological_truth':
        return wotd.theological_truth;
      case 'modern_walk':
        return wotd.modern_walk;
      case 'prayer_focus':
        return wotd.prayer_focus;
      default:
        return '';
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `"${wotd.verse}"\n— ${wotd.reference}\n\nShared from exégeomai Scripture Deep Dive`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Done"
          style={styles.doneBtn}
        >
          <Text variant="h3" style={styles.doneText}>Done</Text>
        </TouchableOpacity>
        <Text variant="h3" style={styles.headerTitle}>Scripture Deep Dive</Text>
        <TouchableOpacity
          onPress={onShare}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Share scripture"
          style={styles.shareBtn}
        >
          <ShareSvg size={18} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Meta label */}
        <View style={styles.metaRow}>
          <CalendarSvg size={13} color={colors.accent} />
          <Text variant="label" color={colors.accent} style={styles.metaLabel}>SAVED SCRIPTURE ENTRY</Text>
        </View>

        {/* Flat Sacred Quote Block */}
        <View style={styles.quoteBox}>
          <QuoteSvg size={20} color={colors.accent} style={{ marginBottom: 4 }} />
          <Text variant="h2" style={styles.verseText}>
            "{wotd.verse}"
          </Text>
          <Text variant="h3" style={styles.verseRef}>— {wotd.reference}</Text>
        </View>

        <View style={styles.hairlineDivider} />

        {/* Lens Selection */}
        <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeaderLabel}>
          EXEGETICAL LENSES
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lensTabsContainer}
          style={styles.lensTabsScroll}
        >
          {LENS_TABS.map((tab) => {
            const active = activeLens === tab.key;
            const iconColor = active ? '#0F172A' : colors.textSecondary;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.lensTab, active && styles.lensTabActive]}
                onPress={() => setActiveLens(tab.key as LensKey)}
                activeOpacity={0.7}
              >
                {getLensIcon(tab.key as LensKey, iconColor)}
                <Text
                  variant="caption"
                  weight={active ? '700' : '500'}
                  style={[styles.lensTabLabel, active && styles.lensTabLabelActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Dynamic Lens Content (Continuous Body Section) */}
        <View style={styles.lensContentSection}>
          <View style={styles.contentHeader}>
            {getLensIcon(activeLens, colors.accent)}
            <Text variant="h3" style={styles.contentTitle}>
              {LENS_TABS.find(t => t.key === activeLens)?.label}
            </Text>
          </View>
          <Text variant="body" color={colors.textPrimary} style={styles.bodyText}>
            {getLensContent()}
          </Text>
        </View>

        <View style={styles.hairlineDivider} />

        {/* Memory Verse Section */}
        <View style={styles.memorySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={{ marginBottom: 4, letterSpacing: 0.8 }}>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    backgroundColor: '#FFFFFF',
  },
  doneBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  doneText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  shareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 48,
    backgroundColor: '#FFFFFF',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  metaLabel: {
    fontSize: 10,
    letterSpacing: 0.8,
    fontWeight: '700',
  },
  quoteBox: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginVertical: 4,
  },
  verseText: {
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 26,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  verseRef: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'right',
  },
  hairlineDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: spacing.md,
  },
  sectionHeaderLabel: {
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  lensTabsScroll: {
    marginBottom: spacing.sm,
  },
  lensTabsContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  lensTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  lensTabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  lensTabLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  lensTabLabelActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  lensContentSection: {
    paddingVertical: 4,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  memorySection: {
    paddingVertical: 4,
  },
  memoryText: {
    fontStyle: 'italic',
    lineHeight: 22,
    fontSize: 14,
  },
});
