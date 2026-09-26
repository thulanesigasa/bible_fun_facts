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
import { useThemedAlert } from '../context/AlertContext';
import { UiverseSwitch } from '../components/UiverseSwitch';
import { LOCK_TIMEOUT_OPTIONS } from '../services/biometricService';

export default function SecurityScreen({ navigation }: { navigation: any }) {
  const {
    isBiometricSupported,
    biometricType,
    isBiometricLockEnabled,
    setBiometricLockEnabled,
    lockTimeoutSeconds,
    isPrivacyShieldEnabled,
    setPrivacyShieldEnabled,
    isPinSet,
  } = useUser();
  const { showAlert } = useThemedAlert();

  const currentTimeoutOption =
    LOCK_TIMEOUT_OPTIONS.find((o) => o.seconds === lockTimeoutSeconds) ||
    LOCK_TIMEOUT_OPTIONS[0];

  const handleToggleBiometricLock = async (val: boolean) => {
    const res = await setBiometricLockEnabled(val);
    if (!res.success && res.error) {
      showAlert({
        title: 'Biometric Verification',
        message: res.error,
        icon: 'warning',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Typography - Part of the Seamless Body Canvas */}
        <View style={styles.headerBlock}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.title}>
            Safety & Security
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Configure hardware biometric protection, fallback 4-digit security PIN, and automatic inactivity locking.
          </Text>
        </View>

        {/* 1. SAFETY & SECURITY CONTROLS */}
        <View style={styles.sectionBlock}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            ACCESS CONTROLS
          </Text>

          {/* 1. Inactivity Lock */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('InactivityLock')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={`Inactivity Auto-Lock. Currently set to ${currentTimeoutOption.label}. Tap to change.`}
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Inactivity Lock
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                {`Locks automatically after ${currentTimeoutOption.label.toLowerCase()} • Tap to change`}
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* 2. 4-Digit Security PIN (Dedicated Screen) */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('SecurityPin')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={`4-Digit Security PIN. ${isPinSet ? 'Active.' : 'Not configured.'} Tap to manage.`}
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                4-Digit Security PIN
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                {isPinSet
                  ? 'PIN active • Tap to change, remove, or inspect enclave specs'
                  : 'Passcode backup for opening exégeomai without biometrics'}
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* 3. Biometrics */}
          {isBiometricSupported ? (
            <>
              <View style={styles.actionRow}>
                <View style={styles.rowTitleBox}>
                  <Text variant="h3" style={styles.rowTitle}>
                    Biometrics
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                    {`Require ${biometricType || 'Fingerprint'} verification whenever exégeomai opens`}
                  </Text>
                </View>
                <UiverseSwitch
                  value={isBiometricLockEnabled}
                  onValueChange={handleToggleBiometricLock}
                  accessibilityLabel="Toggle biometric app lock"
                />
              </View>
              <View style={styles.rowDivider} />
            </>
          ) : null}

          {/* 4. Multitasking Privacy Shield */}
          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                App Switcher Privacy Shield
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                Obfuscates screen when multitasking to protect notes & reflections
              </Text>
            </View>
            <UiverseSwitch
              value={isPrivacyShieldEnabled}
              onValueChange={setPrivacyShieldEnabled}
              accessibilityLabel="Toggle app switcher privacy shield"
            />
          </View>
        </View>

        {/* Zero Telemetry Footer Note */}
        <View style={styles.footerNote}>
          <Text variant="caption" color={colors.textTertiary} style={styles.footerText}>
            Zero telemetry. Salted SHA-256 PIN hashes and biometric keys remain strictly in hardware security enclaves.
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
