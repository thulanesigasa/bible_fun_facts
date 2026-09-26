import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { UiverseSwitch } from '../components/UiverseSwitch';

export default function PrivacyScreen({ navigation }: { navigation: any }) {
  const {
    isPrivateStudyMode,
    setPrivateStudyMode,
    isDiscoverableInSearch,
    setDiscoverableInSearch,
    showStreaksPublicly,
    setShowStreaksPublicly,
    privateStudyNotes,
    setPrivateStudyNotes,
    blockedUserIds,
  } = useUser();

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Typography - Seamless Body Canvas */}
        <View style={styles.headerBlock}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.title}>
            Privacy Settings
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Control your scholar presence, streak visibility, and study anonymity across the exégeomai fellowship.
          </Text>
        </View>

        {/* 1. STUDY & SCHOLAR PRIVACY */}
        <View style={styles.sectionBlock}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            STUDY & SCHOLAR PRIVACY
          </Text>

          {/* Private Study Mode (Incognito) */}
          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Private Study Mode
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                Pauses cloud streak sync & keeps current exegesis sessions strictly offline.
              </Text>
            </View>
            <UiverseSwitch
              value={isPrivateStudyMode}
              onValueChange={setPrivateStudyMode}
              accessibilityLabel="Toggle private study mode"
            />
          </View>

          <View style={styles.rowDivider} />

          {/* Public Scholar Directory */}
          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Public Scholar Directory
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                Allow fellow believers to discover your scholar profile in Search and explore shared insights.
              </Text>
            </View>
            <UiverseSwitch
              value={isDiscoverableInSearch}
              onValueChange={setDiscoverableInSearch}
              accessibilityLabel="Toggle public scholar directory"
            />
          </View>

          <View style={styles.rowDivider} />

          {/* Show Study Streak to Peers */}
          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Show Study Streak to Peers
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                Display active exegesis streak counters and milestone badges on your public profile.
              </Text>
            </View>
            <UiverseSwitch
              value={showStreaksPublicly}
              onValueChange={setShowStreaksPublicly}
              accessibilityLabel="Toggle study streak visibility"
            />
          </View>

          <View style={styles.rowDivider} />

          {/* Private Notes & Bookmarks */}
          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Private Notes & Bookmarks
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                Keep verse notes, journal reflections, and personal highlights strictly local and unindexed.
              </Text>
            </View>
            <UiverseSwitch
              value={privateStudyNotes}
              onValueChange={setPrivateStudyNotes}
              accessibilityLabel="Toggle private notes and bookmarks"
            />
          </View>
        </View>

        {/* 2. FELLOWSHIP & COMMUNITY GROUP */}
        <View style={styles.sectionBlock}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            COMMUNITY & FELLOWSHIP
          </Text>

          {/* Blocked Accounts (Grouped per user request) */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('BlockedUsers')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={`Blocked accounts. ${blockedUserIds.length} accounts blocked.`}
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Blocked Accounts
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                {blockedUserIds.length > 0
                  ? `${blockedUserIds.length} ${blockedUserIds.length === 1 ? 'account' : 'accounts'} restricted from interacting with your profile`
                  : 'Zero accounts blocked • Tap to review restrictions'}
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Note - Clean Body Text */}
        <View style={styles.footerNote}>
          <Text variant="caption" color={colors.textTertiary} style={styles.footerText}>
            Your personal reflections, private bookmarks, and prayer notes are never sold, indexed, or shared with third parties.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // 60% Dominant Canvas #F8FAFC
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.md, // 16px
    paddingTop: spacing.lg,        // 24px
    paddingBottom: 48,
  },
  headerBlock: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionBlock: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowTitleBox: {
    flex: 1,
    paddingRight: spacing.md,
  },
  rowTitle: {
    color: colors.textPrimary,
    marginBottom: 3,
  },
  rowDescription: {
    fontSize: 12,
    lineHeight: 17,
  },
  rowDisclosureArrow: {
    fontSize: 22,
    lineHeight: 24,
    color: colors.textTertiary,
    fontWeight: '300',
    paddingLeft: spacing.sm,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
  },
  footerNote: {
    marginTop: spacing.md,
    paddingHorizontal: 4,
  },
  footerText: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
});
