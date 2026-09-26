import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useThemedAlert } from '../context/AlertContext';
import { CheckSvg } from '../components/SvgIcons';
import { useUser } from '../context/UserContext';

export default function DeleteAccountScreen({ navigation }: { navigation?: any }) {
  const { deleteAccountAndPurgeData, userProfile } = useUser();
  const [confirmedCheck, setConfirmedCheck] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [isPurging, setIsPurging] = useState(false);
  const { showAlert } = useThemedAlert();

  const isConfirmed = confirmedCheck && confirmInput.trim().toUpperCase() === 'DELETE';

  const handleExecuteDelete = () => {
    if (!isConfirmed) {
      showAlert({
        title: 'Confirmation Required',
        message: 'Please check the acknowledgement and type DELETE to confirm.',
        icon: 'warning',
      });
      return;
    }

    showAlert({
      title: 'Final Confirmation',
      message: 'This will immediately and permanently erase your account, study journal, streak records, and personal data from our servers and this device.\n\nProceed?',
      icon: 'trash',
      isDestructive: true,
      buttons: [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Forever',
          style: 'destructive',
          onPress: async () => {
            setIsPurging(true);
            try {
              const success = await deleteAccountAndPurgeData();
              if (success) {
                showAlert({
                  title: 'Account Purged',
                  message: 'Your account and personal study records have been completely erased.',
                  icon: 'trash',
                  isDestructive: true,
                });
              }
            } catch (e: any) {
              showAlert({
                title: 'Notice',
                message: e?.message || 'Failed to complete data purge.',
                icon: 'warning',
              });
            } finally {
              setIsPurging(false);
            }
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Intro Header - Clean Body Canvas (Zero Icons, Zero Outer Divs) */}
        <View style={styles.introHeader}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.mainTitle}>
            Delete Account & Purge Data
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.leadParagraph}>
            In compliance with GDPR (Article 17: Right to Erasure) and POPIA, you may permanently purge your account and all associated study data at any time.
          </Text>
        </View>

        {/* What Will Be Permanently Erased - Part of the Body (No Container Divs) */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            WHAT WILL BE PERMANENTLY ERASED
          </Text>

          <View style={styles.eraseItem}>
            <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.eraseTitle}>
              Cloud Profile & Credentials
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.eraseDescription}>
              Your cloud profile (@{userProfile?.username || 'scholar'}), registered email, and hardware Keystore credentials
            </Text>
          </View>

          <View style={styles.itemDivider} />

          <View style={styles.eraseItem}>
            <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.eraseTitle}>
              Study Journal & Reflections
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.eraseDescription}>
              All saved bookmarks, study reflections, and verse highlights
            </Text>
          </View>

          <View style={styles.itemDivider} />

          <View style={styles.eraseItem}>
            <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.eraseTitle}>
              Streak & Unlocked Milestones
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.eraseDescription}>
              Your daily exegesis study streak and unlocked achievements
            </Text>
          </View>

          <View style={styles.itemDivider} />

          <View style={styles.eraseItem}>
            <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.eraseTitle}>
              Active Device Sessions
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.eraseDescription}>
              All active hardware sessions and cryptographic keys
            </Text>
          </View>
        </View>

        {/* Confirmation Safeguards - Part of the Body */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            CONFIRMATION SAFEGUARDS
          </Text>

          {/* Checkbox Acknowledgment */}
          <TouchableOpacity
            style={styles.checkboxRow}
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
          <View style={styles.inputBlock}>
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
    paddingHorizontal: spacing.md, // 16px
    paddingTop: spacing.lg,        // 24px
    paddingBottom: 48,
  },
  introHeader: {
    marginBottom: spacing.lg,
  },
  mainTitle: {
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 6,
  },
  leadParagraph: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  bodySection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  eraseItem: {
    paddingVertical: 8,
  },
  eraseTitle: {
    fontSize: 13,
    marginBottom: 2,
  },
  eraseDescription: {
    fontSize: 12,
    lineHeight: 17,
  },
  itemDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
    marginVertical: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
    backgroundColor: '#FFFFFF',
  },
  checkBoxSquareChecked: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  checkboxLabel: {
    fontSize: 12,
    flex: 1,
    lineHeight: 17,
  },
  inputBlock: {
    marginTop: 4,
  },
  inputPrompt: {
    fontSize: 11,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  purgeBtn: {
    backgroundColor: '#0F172A', // 10% Accent
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
