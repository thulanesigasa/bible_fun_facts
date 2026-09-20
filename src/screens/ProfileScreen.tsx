import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { useUser } from '../context/UserContext';
import {
  ProfileSvg,
  BookmarkSvg,
  SettingsSvg,
  FlameSvg,
  StrongsIconSvg,
  BellSvg,
  GlobeSvg,
  ChevronRightSvg,
  LogOutSvg,
  CheckSvg,
} from '../components/SvgIcons';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const {
    userProfile,
    streak,
    factsViewedCount,
    logout,
    updateProfile,
    favoritesFacts,
    favoritesScriptures,
    completedWOTDs,
  } = useUser();

  const [notifications, setNotifications] = useState<boolean>(
    userProfile?.notificationsEnabled ?? true
  );

  const translations = ['ESV', 'KJV', 'NASB', 'NIV'];
  const currentTranslation = userProfile?.preferredTranslation || 'ESV';

  const totalSaved =
    favoritesFacts.length + favoritesScriptures.length + completedWOTDs.length;

  const handleToggleNotifications = (val: boolean) => {
    setNotifications(val);
    updateProfile({ notificationsEnabled: val });
  };

  const handleSelectTranslation = (trans: string) => {
    updateProfile({ preferredTranslation: trans });
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your exégeomai account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const displayName = userProfile?.name || 'Believer';
  const displayEmail = userProfile?.email || 'user@exegeomai.org';
  const displayJoined = userProfile?.joinedDate || 'September 2026';

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* User Identity Card */}
        <Card style={styles.userCard}>
          <View style={styles.userRow}>
            <View style={styles.avatarContainer}>
              <ProfileSvg size={32} color={colors.accent} strokeWidth={2} />
            </View>
            <View style={styles.userInfo}>
              <Text variant="h2" style={styles.userName}>
                {displayName}
              </Text>
              <Text variant="body" color={colors.textSecondary} style={styles.userEmail}>
                {displayEmail}
              </Text>
              <Text variant="caption" color={colors.textTertiary} style={styles.userJoined}>
                Member since {displayJoined}
              </Text>
            </View>
          </View>
        </Card>

        {/* Study Journey Metrics */}
        <View style={styles.metricsRow}>
          <Card style={[styles.metricCard, { marginRight: spacing.sm }]}>
            <View style={styles.metricIconBox}>
              <FlameSvg size={20} color={colors.accent} fill={colors.accent} />
            </View>
            <Text variant="h2" style={styles.metricValue}>
              {streak} Days
            </Text>
            <Text variant="caption" color={colors.textSecondary}>
              Study Streak
            </Text>
          </Card>

          <Card style={[styles.metricCard, { marginLeft: spacing.sm }]}>
            <View style={styles.metricIconBox}>
              <StrongsIconSvg size={20} color={colors.accent} strokeWidth={2} />
            </View>
            <Text variant="h2" style={styles.metricValue}>
              {factsViewedCount}
            </Text>
            <Text variant="caption" color={colors.textSecondary}>
              Facts Unfolded
            </Text>
          </Card>
        </View>

        {/* Saved Collection Section */}
        <View style={styles.section}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            SAVED CONTENT
          </Text>
          <TouchableOpacity
            style={[styles.actionCard, shadow.sm]}
            onPress={() => navigation.navigate('Favorites')}
            activeOpacity={0.8}
          >
            <View style={styles.actionCardLeft}>
              <View style={styles.iconCircle}>
                <BookmarkSvg size={20} color={colors.accent} fill={colors.accent} />
              </View>
              <View>
                <Text variant="h3" style={{ color: colors.textPrimary }}>
                  Saved Collection
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  {totalSaved} items persisted offline
                </Text>
              </View>
            </View>
            <ChevronRightSvg size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Study Preferences Section */}
        <View style={styles.section}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            STUDY PREFERENCES
          </Text>

          {/* Notifications Toggle */}
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelBox}>
                <View style={styles.iconCircle}>
                  <BellSvg size={20} color={colors.accent} />
                </View>
                <View>
                  <Text variant="h3" style={{ color: colors.textPrimary }}>
                    Daily Devotional Reminder
                  </Text>
                  <Text variant="caption" color={colors.textSecondary}>
                    Morning inspiration at 08:00 AM
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: '#CBD5E1', true: colors.accent }}
                thumbColor="#FFFFFF"
              />
            </View>
          </Card>

          {/* Translation Selection */}
          <Card style={[styles.settingCard, { marginTop: spacing.md }]}>
            <View style={styles.translationHeader}>
              <View style={styles.iconCircle}>
                <GlobeSvg size={20} color={colors.accent} />
              </View>
              <View>
                <Text variant="h3" style={{ color: colors.textPrimary }}>
                  Default Scripture Translation
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Select your primary study version
                </Text>
              </View>
            </View>

            <View style={styles.translationChips}>
              {translations.map(t => {
                const isSelected = currentTranslation === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.translationChip,
                      isSelected && styles.translationChipActive,
                    ]}
                    onPress={() => handleSelectTranslation(t)}
                    activeOpacity={0.8}
                  >
                    <Text
                      variant="caption"
                      weight={isSelected ? '700' : '500'}
                      style={[
                        styles.translationChipText,
                        isSelected && styles.translationChipTextActive,
                      ]}
                    >
                      {t}
                    </Text>
                    {isSelected && (
                      <CheckSvg size={14} color="#FFFFFF" strokeWidth={3} style={{ marginLeft: 4 }} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>
        </View>

        {/* Application Information */}
        <View style={styles.section}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            APPLICATION
          </Text>
          <Card style={styles.aboutCard}>
            <View style={styles.aboutRow}>
              <Text variant="body" color={colors.textSecondary}>
                Runtime Version
              </Text>
              <Text variant="h3" style={{ color: colors.textPrimary }}>
                v1.0.1
              </Text>
            </View>
            <View style={[styles.aboutRow, { marginTop: spacing.sm }]}>
              <Text variant="body" color={colors.textSecondary}>
                Architecture
              </Text>
              <Text variant="caption" color={colors.textTertiary}>
                React Native & Expo OTA (Rule 21)
              </Text>
            </View>
          </Card>
        </View>

        {/* Sign Out Action */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.signOutBtn, shadow.sm]}
            onPress={handleSignOut}
            activeOpacity={0.8}
          >
            <LogOutSvg size={20} color="#EF4444" strokeWidth={2} />
            <Text variant="h3" style={styles.signOutText}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: spacing.md, // 16px
    paddingTop: spacing.lg,        // 24px
    paddingBottom: 96,             // Bottom content clearance for 50px pill tab bar
  },
  userCard: {
    marginBottom: spacing.md,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: colors.textPrimary,
  },
  userEmail: {
    fontSize: 14,
    marginTop: 2,
  },
  userJoined: {
    fontSize: 12,
    marginTop: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  metricIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  metricValue: {
    color: colors.textPrimary,
    marginBottom: 2,
  },
  section: {
    marginTop: spacing.md,
  },
  sectionHeader: {
    marginBottom: 4,
    marginLeft: 4,
  },
  actionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(217, 119, 6, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingCard: {
    padding: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  translationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  translationChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  translationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  translationChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  translationChipText: {
    color: colors.textSecondary,
  },
  translationChipTextActive: {
    color: '#FFFFFF',
  },
  aboutCard: {
    padding: spacing.md,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signOutBtn: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    marginTop: spacing.sm,
  },
  signOutText: {
    color: '#EF4444',
    marginLeft: spacing.sm,
  },
});
