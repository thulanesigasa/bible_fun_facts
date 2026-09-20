import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Typography';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import type { Scripture } from '../data/mockDatabase';
import { getGenreSvg } from './SvgIcons';

interface ScriptureCardProps {
  scripture: Scripture;
  onPress?: () => void;
  compact?: boolean;
}

export const ScriptureCard: React.FC<ScriptureCardProps> = ({ scripture, onPress, compact }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, shadow.sm]}
    >
      {/* Meta Row */}
      <View style={styles.metaRow}>
        <View style={styles.leftMeta}>
          <View style={styles.genreIconWrapper}>
            {getGenreSvg(scripture.genre, 16, colors.accent)}
          </View>
          <Text variant="caption" weight="600" color={colors.textSecondary}>
            {scripture.testament} • {scripture.genre}
          </Text>
        </View>
        <Text variant="caption" color={colors.textSecondary} weight="600">
          {scripture.reference}
        </Text>
      </View>

      {/* Book name */}
      <Text variant="h3" color={colors.textPrimary} style={styles.bookName}>
        {scripture.book} {scripture.chapter}:{scripture.verse_range}
      </Text>

      {/* Verse */}
      <View style={styles.verseBlock}>
        <Text variant="body" color={colors.textSecondary} style={styles.verseText}>
          "{scripture.text}"
        </Text>
      </View>

      {/* Summary */}
      {scripture.summary && !compact && (
        <Text variant="caption" color={colors.textTertiary} style={styles.summary}>
          {scripture.summary}
        </Text>
      )}

      {/* Tags */}
      {scripture.tags && scripture.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {scripture.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text variant="caption" color={colors.textSecondary}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg, // 24px
    padding: spacing.md, // 16px
    marginBottom: spacing.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm, // 8px
  },
  leftMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    flexWrap: 'wrap',
  },
  genreIconWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bookName: {
    marginBottom: spacing.sm, // 8px
    color: colors.textPrimary,
  },
  verseBlock: {
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    paddingLeft: spacing.sm, // 8px
    marginBottom: spacing.sm, // 8px
  },
  verseText: {
    fontStyle: 'italic',
    lineHeight: 24,
  },
  summary: {
    marginBottom: spacing.sm, // 8px
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm, // 8px
  },
  tag: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
