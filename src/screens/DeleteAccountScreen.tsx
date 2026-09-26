import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import {
  TrashSvg,
  CheckSvg,
  ShieldLockSvg,
} from '../components/SvgIcons';
import { useUser } from '../context/UserContext';

export default function DeleteAccountScreen({ navigation }: { navigation?: any }) {
  const { deleteAccountAndPurgeData, userProfile } = useUser();
  const [confirmedCheck, setConfirmedCheck] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [isPurging, setIsPurging] = useState(false);

  const isConfirmed = confirmedCheck && confirmInput.trim().toUpperCase() === 'DELETE';

  const handleExecuteDelete = () => {
    if (!isConfirmed) {
      Alert.alert('Confirmation Required', 'Please check the acknowledgement and type DELETE to confirm.');
      return;
    }

    Alert.alert(
      'Final Confirmation',
      'This will immediately and permanently erase your account, study journal, streak records, and personal data from our servers and this device.\n\nProceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Forever',
          style: 'destructive',
          onPress: async () => {
            setIsPurging(true);
            try {
              const success = await deleteAccountAndPurgeData();
              if (success) {
                Alert.alert('Account Purged', 'Your account and personal study records have been completely erased.');
              }
            } catch (e: any) {
              Alert.alert('Notice', e?.message || 'Failed to complete data purge.');
            } finally {
              setIsPurging(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Rule 15/19 Logo Container: 50x50 icon inside 68x68 rounded container */}
        <View style={styles.logoRow}>
          <View style={[styles.logoContainer, shadow.sm]}>
            <TrashSvg size={36} color="#0F172A" />
          </View>
        </View>

        {/* Intro Header */}
        <View style={styles.introHeader}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.mainTitle}>
            Delete Account & Purge Data
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.leadParagraph}>
            In compliance with GDPR (Article 17: Right to Erasure) and POPIA, you may permanently purge your account and all associated study data at any time.
          </Text>
        </View>

        {/* What Will Be Deleted Section */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            WHAT WILL BE PERMANENTLY ERASED
          </Text>

          <View style={[styles.warningCard, shadow.sm]}>
            <View style={styles.warningRow}>
              <View style={styles.dotIndicator} />
              <Text variant="caption" color={colors.textPrimary} style={styles.warningText}>
                Your cloud profile (@{userProfile?.username || 'scholar'}), email, and credentials
              </Text>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.warningRow}>
              <View style={styles.dotIndicator} />
              <Text variant="caption" color={colors.textPrimary} style={styles.warningText}>
                All saved bookmarks, study reflections, and verse highlights
              </Text>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.warningRow}>
              <View style={styles.dotIndicator} />
              <Text variant="caption" color={colors.textPrimary} style={styles.warningText}>
                Your daily exegesis study streak and unlocked achievements
              </Text>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.warningRow}>
              <View style={styles.dotIndicator} />
              <Text variant="caption" color={colors.textPrimary} style={styles.warningText}>
                All active device sessions and hardware Keystore keys
              </Text>
            </View>
          </View>
        </View>

        {/* Dual Safeguard Confirmation Section */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            CONFIRMATION SAFEGUARDS
          </Text>

          {/* Checkbox Acknowledgment */}
          <TouchableOpacity
            style={[styles.checkboxRow, shadow.sm]}
            onPress={() => setConfirmedCheck(!confirmedCheck)}
            activeOpacity={0.8}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: confirmedCheck }}
            accessibilityLabel="I acknowledge that account deletion is permanent and cannot be undone."
          >
            <View style={[styles.checkBoxSquare, confirmedCheck && styles.checkBoxSquareChecked]}>
              {confirmedCheck && <CheckSvg size={12} color="#FFFFFF" strokeWidth={3} />}
            </View>
            <Text variant="caption" color={colors.textPrimary} style={styles.checkboxLabel}>
              I understand that this action is permanent, immediate, and cannot be reversed.
            </Text>
          </TouchableOpacity>

          {/* Type DELETE Input */}
          <View style={[styles.inputCard, shadow.sm]}>
            <Text variant="caption" weight="700" color={colors.textTertiary} style={styles.inputPrompt}>
              Type <Text weight="800" color={colors.textPrimary}>DELETE</Text> to verify your intention:
            </Text>
            <TextInput
              style={styles.textInput}
              value={confirmInput}
              onChangeText={setConfirmInput}
              placeholder="Type DELETE"
              placeholderTextColor="#94A3B8"
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Action Buttons Section */}
        <View style={[styles.bodySection, { borderBottomWidth: 0 }]}>
          <TouchableOpacity
            style={[
              styles.purgeBtn,
              shadow.sm,
              !isConfirmed && styles.purgeBtnDisabled,
            ]}
            onPress={handleExecuteDelete}
            activeOpacity={0.8}
            disabled={!isConfirmed || isPurging}
            accessibilityRole="button"
            accessibilityLabel="Permanently Delete Account & Purge Data"
          >
            {isPurging ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text variant="caption" weight="800" color="#FFFFFF" style={styles.purgeBtnText}>
                Permanently Delete Account & Purge Data
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              if (navigation?.goBack) navigation.goBack();
            }}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Cancel and keep account safe"
          >
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.cancelBtnText}>
              Keep My Account Safe
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
    backgroundColor: colors.background, // 60% Dominant Canvas #F8FAFC
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 48,
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: colors.surface, // 30% Panel #FFFFFF
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  mainTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 4,
  },
  leadParagraph: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  bodySection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  warningCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
    marginRight: spacing.sm,
  },
  warningText: {
    fontSize: 12,
    flex: 1,
    lineHeight: 17,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
  },
  checkboxRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  checkBoxSquare: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 23, 42, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  checkBoxSquareChecked: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  checkboxLabel: {
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  inputCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  inputPrompt: {
    fontSize: 11,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 9,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  purgeBtn: {
    backgroundColor: '#0F172A',
    paddingVertical: 13,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  purgeBtnDisabled: {
    opacity: 0.45,
  },
  purgeBtnText: {
    fontSize: 12.5,
    letterSpacing: 0.3,
  },
  cancelBtn: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 12,
  },
});
