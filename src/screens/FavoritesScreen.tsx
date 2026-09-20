import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { useUser } from '../context/UserContext';
import {
  FavoritesSvg,
  CheckSvg,
} from '../components/SvgIcons';

type FavTab = 'Facts' | 'Scriptures' | 'WOTD';

export default function FavoritesScreen({ navigation }: { navigation: any }) {
  const [tab, setTab] = useState<FavTab>('Facts');
  const { favoritesFacts, favoritesScriptures, completedWOTDs } = useUser();

  const currentList = tab === 'Facts' ? favoritesFacts : tab === 'Scriptures' ? favoritesScriptures : completedWOTDs;
  const hasFavorites = currentList.length > 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.headerRow}>
          <FavoritesSvg size={24} color={colors.accent} fill={colors.accent} />
          <View>
            <Text variant="h2" style={styles.title}>Saved Collection</Text>
            <Text variant="body" color={colors.textSecondary} style={{ fontSize: 14 }}>
              Persisted for offline reflection & deeper study
            </Text>
          </View>
        </View>

        {/* 3-Way Tab Selector */}
        <View style={[styles.toggleContainer, shadow.sm]}>
          {(['Facts', 'Scriptures', 'WOTD'] as FavTab[]).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.toggleBtn, tab === t && styles.toggleBtnActive]}
              onPress={() => setTab(t)}
              activeOpacity={0.8}
            >
              <Text
                variant="caption"
                weight="700"
                style={[styles.toggleText, tab === t && styles.toggleTextActive]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List Content */}
        {hasFavorites ? (
          <View style={styles.list}>
            {tab === 'Facts' && (currentList as any[]).map(f => (
              <Card
                key={f.id}
                onPress={() => navigation.navigate('FactDetails', { fact: f })}
                showChevron
                style={styles.itemCard}
              >
                <Text variant="label" color={colors.accent} weight="800" style={{ marginBottom: 4 }}>
                  {f.category.toUpperCase()}
                </Text>
                <Text variant="h3" style={{ color: colors.textPrimary }}>{f.fact_title}</Text>
                <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 4 }}>
                  {f.scripture_ref}
                </Text>
              </Card>
            ))}
            {tab === 'Scriptures' && (currentList as any[]).map(s => (
              <Card
                key={s.id}
                onPress={() => navigation.navigate('ScriptureDetails', { scripture: s })}
                showChevron
                style={styles.itemCard}
              >
                <Text variant="label" color={colors.accent} weight="800" style={{ marginBottom: 4 }}>
                  {s.book.toUpperCase()}
                </Text>
                <Text variant="h3" style={{ color: colors.textPrimary }}>{s.reference}</Text>
                <Text variant="body" color={colors.textSecondary} numberOfLines={2} style={{ marginTop: 4 }}>
                  {s.text}
                </Text>
              </Card>
            ))}
            {tab === 'WOTD' && (currentList as any[]).map(w => (
              <Card
                key={w.id}
                onPress={() => navigation.navigate('WOTDDetails', { wotd: w })}
                showChevron
                style={styles.itemCard}
              >
                <View style={styles.completedHeader}>
                  <CheckSvg size={14} color={colors.accent} />
                  <Text variant="label" color={colors.accent} weight="800">COMPLETED</Text>
                </View>
                <Text variant="h3" style={{ color: colors.textPrimary }}>{w.reference}</Text>
                <Text variant="body" color={colors.textSecondary} numberOfLines={2} style={{ marginTop: 4 }}>
                  {w.verse}
                </Text>
              </Card>
            ))}
          </View>
        ) : (
          /* Empty State */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyCircle}>
              <FavoritesSvg size={36} color={colors.accent} fill={colors.accentSoft} />
            </View>
            <Text variant="h2" style={styles.emptyTitle}>Nothing Saved Yet</Text>
            <Text variant="body" color={colors.textSecondary} align="center" style={styles.emptySub}>
              Tap the bookmark on facts or complete your daily Word of the Day to build your collection.
            </Text>

            <TouchableOpacity
              style={[styles.discoverBtn, shadow.sm]}
              onPress={() => navigation.navigate('Discover')}
              activeOpacity={0.85}
            >
              <Text variant="h3" style={styles.discoverBtnText}>Explore Scriptures</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 96, // 96px padding clears floating pill tab bar
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginTop: spacing.sm, // 8px
    marginBottom: spacing.md, // 16px
  },
  title: {
    fontSize: 22,
    color: colors.textPrimary,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 4,
    borderRadius: radius.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg, // 24px
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: spacing.sm, // 8px
    alignItems: 'center',
    borderRadius: radius.sm, // 8px
  },
  toggleBtnActive: {
    backgroundColor: colors.accent,
  },
  toggleText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  list: {
    gap: spacing.sm, // 8px
  },
  itemCard: {
    backgroundColor: colors.surface,
    padding: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm, // 8px
  },
  completedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl, // 48px
  },
  emptyCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md, // 16px
  },
  emptyTitle: {
    fontSize: 19,
    color: colors.textPrimary,
    marginBottom: spacing.sm, // 8px
  },
  emptySub: {
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: spacing.lg, // 24px
    marginBottom: spacing.lg, // 24px
  },
  discoverBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg, // 24px
    paddingVertical: spacing.md, // 16px
    borderRadius: radius.md, // 16px
  },
  discoverBtnText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
