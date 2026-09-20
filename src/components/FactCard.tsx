import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from './Typography';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import type { Fact } from '../data/mockDatabase';
import {
  LandmarkSvg,
  UsersSvg,
  ScripturesSvg,
  QuoteSvg,
  ChevronRightSvg,
  StrongsIconSvg,
} from './SvgIcons';

interface FactCardProps {
  fact: Fact;
  onPress?: () => void;
  compact?: boolean;
  hideRefresh?: boolean;
}

export const FactCard: React.FC<FactCardProps> = ({ fact, onPress, compact }) => {
  return (
    <View style={styles.card}>
      {/* Category Label & Scripture Icon Row */}
      <View style={styles.headerRow}>
        <Text variant="caption" weight="700" color={colors.accent} style={styles.catLabel}>
          {fact.category.toUpperCase()}
        </Text>
        <ScripturesSvg size={20} color={colors.accent} fill={colors.accentSoft} />
      </View>

      {/* Verse Quote Section */}
      <View style={styles.verseSection}>
        <View style={styles.verseHeader}>
          <QuoteSvg size={16} color={colors.accent} />
          <Text variant="body" weight="700" style={styles.reference}>
            {fact.scripture_ref}
          </Text>
        </View>
        <Text variant="body" style={styles.verseText}>
          "{fact.verse_text}"
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Main Fact Title */}
      <Text variant="h2" style={styles.factTitle}>{fact.fact_title}</Text>

      {/* Historical Context */}
      <View style={styles.contextSection}>
        <View style={styles.sectionHeading}>
          <LandmarkSvg size={18} color={colors.accent} />
          <Text variant="h3" style={styles.sectionLabel}>Historical Context</Text>
        </View>
        <Text variant="body" style={styles.bodyText}>
          {fact.historical_context}
        </Text>
      </View>

      {/* Cultural Practice */}
      <View style={styles.contextSection}>
        <View style={styles.sectionHeading}>
          <UsersSvg size={18} color={colors.accent} />
          <Text variant="h3" style={styles.sectionLabel}>Cultural Practice</Text>
        </View>
        <Text variant="body" style={styles.bodyText}>
          {fact.cultural_practice}
        </Text>
      </View>

      {/* Strong's Deep Dive Panel */}
      <View style={styles.strongsCard}>
        <View style={styles.strongsHeader}>
          <View style={styles.strongsTitleRow}>
            <StrongsIconSvg size={18} color={colors.accent} />
            <Text variant="h3" style={styles.strongsTitle}>Strong's Deep Dive</Text>
          </View>
          <ChevronRightSvg size={18} color={colors.textSecondary} />
        </View>
        
        <View style={styles.strongsContent}>
          <View style={styles.wordRow}>
            <Text variant="h2" style={styles.strongsWord}>{fact.strongs_word}</Text>
            <Text variant="body" style={styles.strongsTrans}>{fact.strongs_transliteration}</Text>
          </View>
          <Text variant="body" style={styles.strongsDef}>{fact.strongs_definition}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl, // 32px
    padding: spacing.lg, // 24px
    marginBottom: spacing.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md, // 16px
  },
  catLabel: {
    letterSpacing: 1,
  },
  verseSection: {
    marginBottom: spacing.md, // 16px
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginBottom: spacing.sm, // 8px
  },
  reference: {
    color: colors.accent,
    fontSize: 16,
  },
  verseText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md, // 16px
  },
  factTitle: {
    fontSize: 24,
    marginBottom: spacing.md, // 16px
    color: colors.textPrimary,
  },
  contextSection: {
    marginBottom: spacing.md, // 16px
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginBottom: spacing.sm, // 8px
  },
  sectionLabel: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  strongsCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg, // 24px
    padding: spacing.md, // 16px
    marginTop: spacing.sm, // 8px
    borderWidth: 1,
    borderColor: colors.border,
  },
  strongsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm, // 8px
  },
  strongsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  strongsTitle: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  strongsContent: {},
  wordRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.md, // 16px
    marginBottom: spacing.sm, // 8px
  },
  strongsWord: {
    color: colors.textPrimary,
    fontSize: 24,
  },
  strongsTrans: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    fontSize: 16,
  },
  strongsDef: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});
