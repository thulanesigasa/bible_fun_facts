import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { FactCard } from '../components/FactCard';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { facts } from '../data/mockDatabase';
import { scheduleDidYouKnowNotifications } from '../services/notifications';
import { DiscoverSvg, FlameSvg, RefreshSvg } from '../components/SvgIcons';

const getRandomFact = () => facts[Math.floor(Math.random() * facts.length)];

export const HomeScreen: React.FC = ({ navigation }: any) => {
  const [currentFact, setCurrentFact] = useState(facts[0]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    scheduleDidYouKnowNotifications().catch(() => {});
  }, []);

  const rotateFact = () => {
    setCurrentFact(getRandomFact());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    rotateFact();
    setTimeout(() => setRefreshing(false), 400);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      >
        {/* Header Branding */}
        <View style={styles.header}>
          <DiscoverSvg size={24} color={colors.accent} fill={colors.accentSoft} />
          <Text variant="h1" style={styles.titleText}>Did You Know?</Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Discover hidden treasures in Scripture
          </Text>
        </View>

        {/* Daily Streak Card */}
        <Card style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <View style={styles.streakIconCircle}>
              <FlameSvg size={18} color={colors.accent} fill={colors.accent} />
            </View>
            <View>
              <Text variant="label" color={colors.textSecondary}>Daily Streak</Text>
              <Text variant="h2" style={{ fontSize: 22, color: colors.textPrimary }}>1 day</Text>
            </View>
          </View>
          <View style={styles.streakRight}>
            <Text variant="label" color={colors.textSecondary} align="right">Facts Viewed</Text>
            <Text variant="h2" color={colors.accent} align="right" style={{ fontSize: 22 }}>3</Text>
          </View>
        </Card>

        {/* Featured Fact Content */}
        <View>
          <FactCard fact={currentFact} hideRefresh={true} />
        </View>

        {/* Discover Another Fact Button */}
        <TouchableOpacity
          style={[styles.refreshBtn, shadow.sm]}
          onPress={rotateFact}
          activeOpacity={0.85}
        >
          <RefreshSvg size={20} color="#FFFFFF" />
          <Text variant="h3" style={styles.refreshBtnText}>Discover Another Fact</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: 96 },
  header: { marginBottom: spacing.lg, alignItems: 'flex-start' },
  titleText: { fontSize: 26, marginTop: spacing.sm, color: colors.textPrimary },
  subtitle: { marginTop: 4, fontSize: 15 },
  streakCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  streakLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  streakIconCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  streakRight: { justifyContent: 'center' },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  refreshBtnText: { fontSize: 16, color: '#FFFFFF', fontWeight: '700' },
});
