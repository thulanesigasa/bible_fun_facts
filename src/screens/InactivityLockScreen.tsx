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
import { CheckCircleSvg } from '../components/SvgIcons';
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
        {/* Intro Typography - Part of the Seamless Body Canvas (Zero Icons, Zero Divs) */}
        <View style={styles.headerBlock}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.title}>
            Inactivity Auto-Lock
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Select how quickly exégeomai locks after being minimized or left unattended. Once locked, biometric authentication or your 4-digit PIN is required to resume study.
          </Text>
        </View>

        {/* Options Section - Direct Body List */}
        <View style={styles.sectionBlock}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            LOCK TIMEOUT DURATION
          </Text>

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
                      <CheckCircleSvg size={20} color="#0F172A" strokeWidth={2.5} />
                    ) : (
                      <View style={styles.unselectedRadio} />
                    )}
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>

        {/* Security Note - Clean Body Text */}
        <View style={styles.footerNote}>
          <Text variant="caption" color={colors.textTertiary} style={styles.footerText}>
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
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  optionRowActive: {
    backgroundColor: 'rgba(253, 210, 35, 0.06)',
    borderRadius: 8,
  },
  optionContent: {
    flex: 1,
    paddingRight: spacing.md,
  },
  optionTitle: {
    color: colors.textPrimary,
    marginBottom: 3,
  },
  optionTitleActive: {
    color: colors.accent,
    fontWeight: '800',
  },
  optionDescription: {
    fontSize: 12,
    lineHeight: 17,
  },
  indicatorContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselectedRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 23, 42, 0.2)',
  },
  divider: {
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
