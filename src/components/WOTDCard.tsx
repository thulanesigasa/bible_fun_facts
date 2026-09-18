import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text } from './Typography';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import type { WOTDEntry, LensTab } from '../data/mockDatabase';
import { LENS_TABS } from '../data/mockDatabase';
import {
  OriginalIntentSvg,
  TheologicalTruthSvg,
  ModernWalkSvg,
  PrayerFocusSvg,
} from './SvgIcons';

interface WOTDCardProps {
  entry: WOTDEntry;
}

const getLensSvg = (key: LensTab['key'], color: string) => {
  switch (key) {
    case 'original_intent':
      return <OriginalIntentSvg size={16} color={color} />;
    case 'theological_truth':
      return <TheologicalTruthSvg size={16} color={color} />;
    case 'modern_walk':
      return <ModernWalkSvg size={16} color={color} />;
    case 'prayer_focus':
      return <PrayerFocusSvg size={16} color={color} />;
    default:
      return <OriginalIntentSvg size={16} color={color} />;
  }
};

export const WOTDCard: React.FC<WOTDCardProps> = ({ entry }) => {
  const [activeTab, setActiveTab] = useState<LensTab['key']>('original_intent');

  const getActiveContent = () => {
    switch (activeTab) {
      case 'original_intent': return entry.original_intent;
      case 'theological_truth': return entry.theological_truth;
      case 'modern_walk': return entry.modern_walk;
      case 'prayer_focus': return entry.prayer_focus;
      default: return '';
    }
  };

  return (
    <View style={[styles.card, shadow.md]}>
      {/* Header Badge */}
      <View style={styles.headerRow}>
        <View style={styles.wotdBadge}>
          <Text variant="label" style={styles.wotdBadgeText}>
            WORD OF THE DAY
          </Text>
        </View>
        <Text variant="caption" color={colors.textSecondary}>
          {entry.reference}
        </Text>
      </View>

      {/* Verse */}
      <View style={styles.verseContainer}>
        <Text variant="h2" color={colors.textPrimary} align="center" style={styles.verseText}>
          "{entry.verse}"
        </Text>
        <Text variant="caption" color={colors.accent} align="center" weight="600">
          {entry.reference}
        </Text>
      </View>

      {/* Lens Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {LENS_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const tabColor = isActive ? colors.accent : colors.textSecondary;
          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab.key)}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              {getLensSvg(tab.key, tabColor)}
              <Text
                variant="caption"
                color={tabColor}
                weight={isActive ? '700' : 'normal'}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Active Content */}
      <View style={styles.contentBox}>
        <Text variant="body" color={colors.textPrimary} style={styles.contentText}>
          {getActiveContent()}
        </Text>
      </View>

      {/* Memory Verse Footer */}
      <View style={styles.memoryBox}>
        <Text variant="label" color={colors.accent} style={{ marginBottom: spacing.sm }}>
          Memory Verse
        </Text>
        <Text variant="caption" color={colors.textSecondary} style={{ fontStyle: 'italic' }}>
          {entry.memory_verse}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl, // 32px
    padding: spacing.lg, // 24px
    marginBottom: spacing.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md, // 16px
  },
  wotdBadge: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  wotdBadgeText: {
    fontSize: 10,
    color: colors.accent,
    letterSpacing: 1,
    fontWeight: '800',
  },
  verseContainer: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md, // 16px
    padding: spacing.md, // 16px
    marginBottom: spacing.md, // 16px
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  verseText: {
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.sm, // 8px
  },
  tabsContainer: {
    gap: spacing.sm, // 8px
    paddingBottom: spacing.sm, // 8px
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    paddingHorizontal: spacing.md, // 16px
    paddingVertical: spacing.sm, // 8px
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    borderColor: colors.accentBorder,
    backgroundColor: colors.accentSoft,
  },
  contentBox: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md, // 16px
    padding: spacing.md, // 16px
    marginTop: spacing.sm, // 8px
    marginBottom: spacing.md, // 16px
    minHeight: 96, // Multiple of 8
    borderWidth: 1,
    borderColor: colors.border,
  },
  contentText: {
    lineHeight: 24,
  },
  memoryBox: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md, // 16px
  },
});
