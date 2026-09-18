import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Text } from './Typography';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import type { Category } from '../data/mockDatabase';
import { SearchSvg, CloseSvg } from './SvgIcons';

const ALL_CATEGORIES: Category[] = ['History', 'Language', 'People', 'Prophecy', 'Customs'];

interface SearchBarProps {
  query: string;
  onChangeQuery: (q: string) => void;
  selectedCategory: Category | null;
  onSelectCategory: (cat: Category | null) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChangeQuery,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={[styles.inputWrapper, shadow.sm]}>
        <SearchSvg size={18} color={colors.accent} />
        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          placeholder="Search scripture, topic, or keyword..."
          placeholderTextColor={colors.textTertiary}
          style={styles.input}
          returnKeyType="search"
          clearButtonMode="never"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => onChangeQuery('')} style={styles.clearBtn} activeOpacity={0.7}>
            <CloseSvg size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        <TouchableOpacity
          onPress={() => onSelectCategory(null)}
          style={[styles.chip, !selectedCategory && styles.chipActive]}
          activeOpacity={0.8}
        >
          <Text
            variant="caption"
            color={!selectedCategory ? colors.accent : colors.textSecondary}
            weight={!selectedCategory ? '700' : 'normal'}
          >
            All
          </Text>
        </TouchableOpacity>
        {ALL_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onSelectCategory(isActive ? null : cat)}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.8}
            >
              <Text
                variant="caption"
                color={isActive ? colors.accent : colors.textSecondary}
                weight={isActive ? '700' : 'normal'}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm, // 8px
    marginBottom: spacing.md, // 16px
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md, // 16px
    paddingHorizontal: spacing.md, // 16px
    paddingVertical: spacing.sm, // 8px
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm, // 8px
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: spacing.sm, // 8px
  },
  clearBtn: {
    padding: spacing.sm, // 8px
  },
  categories: {
    gap: spacing.sm, // 8px
    paddingBottom: spacing.sm, // 8px
  },
  chip: {
    paddingHorizontal: spacing.md, // 16px
    paddingVertical: spacing.sm, // 8px
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    borderColor: colors.accentBorder,
    backgroundColor: colors.accentSoft,
  },
});
