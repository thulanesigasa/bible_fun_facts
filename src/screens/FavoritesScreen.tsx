import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import {
  CheckSvg,
  FavoritesSvg,
  ChevronRightSvg,
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
        <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
          Persisted for offline reflection & deeper study
        </Text>

        {/* 3-Way Tab Selector */}
        <View style={styles.toggleContainer}>
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

        {/* List Content (Continuous Flat Rows - Zero Card Divs) */}
        {hasFavorites ? (
          <View style={styles.list}>
            {tab === 'Facts' && (currentList as any[]).map((f, idx) => (
              <TouchableOpacity
                key={f.id}
                onPress={() => navigation.navigate('FactDetails', { fact: f })}
                style={[styles.itemRow, idx < currentList.length - 1 && styles.rowDivider]}
                activeOpacity={0.75}
              >
                <View style={styles.itemMain}>
                  <Text variant="label" color={colors.accent} weight="800" style={{ marginBottom: 4, letterSpacing: 0.5 }}>
                    {f.category.toUpperCase()}
                  </Text>
                  <Text variant="h3" style={{ color: colors.textPrimary }}>{f.fact_title}</Text>
                  <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 4 }}>
                    {f.scripture_ref}
                  </Text>
                </View>
                <ChevronRightSvg size={16} color="#94A3B8" />
              </TouchableOpacity>
            ))}
            {tab === 'Scriptures' && (currentList as any[]).map((s, idx) => (
              <TouchableOpacity
                key={s.id}
                onPress={() => navigation.navigate('ScriptureDetails', { scripture: s })}
                style={[styles.itemRow, idx < currentList.length - 1 && styles.rowDivider]}
                activeOpacity={0.75}
              >
                <View style={styles.itemMain}>
                  <Text variant="label" color={colors.accent} weight="800" style={{ marginBottom: 4, letterSpacing: 0.5 }}>
                    {s.book.toUpperCase()}
                  </Text>
                  <Text variant="h3" style={{ color: colors.textPrimary }}>{s.reference}</Text>
                  <Text variant="body" color={colors.textSecondary} numberOfLines={2} style={{ marginTop: 4 }}>
                    {s.text}
                  </Text>
                </View>
                <ChevronRightSvg size={16} color="#94A3B8" />
              </TouchableOpacity>
            ))}
            {tab === 'WOTD' && (currentList as any[]).map((w, idx) => (
              <TouchableOpacity
                key={w.id}
                onPress={() => navigation.navigate('WOTDDetails', { wotd: w })}
                style={[styles.itemRow, idx < currentList.length - 1 && styles.rowDivider]}
                activeOpacity={0.75}
              >
                <View style={styles.itemMain}>
                  <View style={styles.completedHeader}>
                    <CheckSvg size={13} color={colors.accent} />
                    <Text variant="label" color={colors.accent} weight="800" style={{ letterSpacing: 0.5 }}>COMPLETED</Text>
                  </View>
                  <Text variant="h3" style={{ color: colors.textPrimary }}>{w.reference}</Text>
                  <Text variant="body" color={colors.textSecondary} numberOfLines={2} style={{ marginTop: 4 }}>
                    {w.verse}
                  </Text>
                </View>
                <ChevronRightSvg size={16} color="#94A3B8" />
              </TouchableOpacity>
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
              style={styles.discoverBtn}
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
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 96,
    backgroundColor: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: spacing.md,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    padding: 3,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: spacing.md,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.sm,
  },
  toggleBtnActive: {
    backgroundColor: colors.accent,
  },
  toggleText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  toggleTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  list: {
    backgroundColor: '#FFFFFF',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  itemMain: {
    flex: 1,
    marginRight: 12,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  completedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(253, 210, 35, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: colors.textPrimary,
    marginBottom: 4,
  },
  emptySub: {
    paddingHorizontal: spacing.xl,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  discoverBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.full,
  },
  discoverBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
});
