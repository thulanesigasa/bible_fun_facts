import React from 'react';
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
import { useUser } from '../context/UserContext';
import {
  ClockSvg,
  CheckCircleSvg,
  ShieldLockSvg,
} from '../components/SvgIcons';
import { LOCK_TIMEOUT_OPTIONS } from '../services/biometricService';

export default function InactivityLockScreen() {
  const { lockTimeoutSeconds, setLockTimeoutSeconds } = useUser();

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Informational Header Card */}
        <View style={[styles.infoCard, shadow.sm]}>
          <View style={styles.infoIconContainer}>
            <ClockSvg size={24} color="#0F172A" />
          </View>
          <View style={styles.infoContent}>
            <Text variant="h3" style={styles.infoTitle}>
              Inactivity Auto-Lock
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.infoDescription}>
              Select how quickly exégeomai locks after being minimized or left unattended. Once locked, biometric authentication or your 4-digit PIN is required to resume study.
            </Text>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.sectionHeaderBox}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            LOCK TIMEOUT DURATION
          </Text>
        </View>

        <View style={styles.optionsList}>
          {LOCK_TIMEOUT_OPTIONS.map((option, index) => {
            const isSelected = lockTimeoutSeconds === option.seconds;
            return (
              <React.Fragment key={option.seconds}>
                {index > 0 && <View style={styles.divider} />}
                <TouchableOpacity
                  style={[
                    styles.optionRow,
                    isSelected && styles.optionRowActive,
                  ]}
                  onPress={() => setLockTimeoutSeconds(option.seconds)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel={`${option.label}. ${option.description}. ${isSelected ? 'Selected' : 'Tap to select'}`}
                >
                  <View style={styles.optionContent}>
                    <Text
                      variant="h3"
                      style={[
                        styles.optionTitle,
                        isSelected && styles.optionTitleActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text variant="caption" color={colors.textSecondary} style={styles.optionDescription}>
                      {option.description}
                    </Text>
                  </View>
                  <View style={styles.indicatorContainer}>
                    {isSelected ? (
                      <CheckCircleSvg size={22} color="#0F172A" strokeWidth={2.5} />
                    ) : (
                      <View style={styles.unselectedRadio} />
                    )}
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>

        {/* Security Note */}
        <View style={styles.securityFooterNote}>
          <ShieldLockSvg size={16} color={colors.textTertiary} />
          <Text variant="caption" color={colors.textTertiary} style={styles.securityFooterText}>
            Protected by hardware-level AES-256 Android Keystore & iOS Keychain
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
    paddingTop: spacing.md,        // 16px
    paddingBottom: 48,
  },
  infoCard: {
    backgroundColor: colors.surface, // 30% Panel #FFFFFF
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg, // 24px
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    color: colors.textPrimary,
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  sectionHeaderBox: {
    marginBottom: spacing.sm,
    paddingHorizontal: 4,
  },
  sectionHeader: {
    letterSpacing: 1.2,
  },
  optionsList: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  optionRowActive: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)', // subtle brand tint
  },
  optionContent: {
    flex: 1,
    paddingRight: spacing.md,
  },
  optionTitle: {
    color: colors.textPrimary,
    marginBottom: 2,
  },
  optionTitleActive: {
    color: colors.accent,
    fontWeight: '700',
  },
  optionDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  indicatorContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselectedRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  securityFooterNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing.xl, // 32px
    paddingHorizontal: spacing.sm,
  },
  securityFooterText: {
    fontSize: 11,
    textAlign: 'center',
  },
});
