import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AppState,
  AppStateStatus,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from './Typography';
import { checkOTAUpdate, downloadOTAUpdate, reloadAppOTA } from '../services/updates';

const SNOOZE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

export const UpdateModal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);
  const snoozedUntilRef = useRef<number>(0);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const inspectUpdates = useCallback(async () => {
    // If user previously chose 'Remind Me Later' and snooze has not expired, skip
    if (Date.now() < snoozedUntilRef.current) {
      return;
    }

    const hasUpdate = await checkOTAUpdate();
    if (hasUpdate) {
      setModalVisible(true);
    }
  }, []);

  useEffect(() => {
    // Check on initial mount
    inspectUpdates();

    // Check automatically whenever app resumes to foreground
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        inspectUpdates();
      }
      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [inspectUpdates]);

  const handleApplyUpdate = async () => {
    if (updateReady) {
      await reloadAppOTA();
      return;
    }

    setDownloading(true);
    const success = await downloadOTAUpdate();
    setDownloading(false);

    if (success) {
      setUpdateReady(true);
      await reloadAppOTA();
    } else {
      setModalVisible(false);
    }
  };

  const handleRemindMeLater = () => {
    // Snooze for 30 minutes
    snoozedUntilRef.current = Date.now() + SNOOZE_DURATION_MS;
    setModalVisible(false);
  };

  if (!modalVisible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisible}
      onRequestClose={handleRemindMeLater}
    >
      <View style={styles.overlay}>
        <View style={[styles.dialogCard, shadow.lg]}>
          {/* Rule 15 & Rule 19: In-app update / modal logos: 50x50 inside a 68x68 rounded container (border radius 18px, image border radius 12px) */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text variant="h2" style={styles.title}>Update Available</Text>
          <Text variant="body" color={colors.textSecondary} align="center" style={styles.description}>
            A fresh update for exégeomai is ready with new biblical insights, cultural discoveries, and performance enhancements.
          </Text>

          <View style={styles.actions}>
            {/* Primary Action Button */}
            <TouchableOpacity
              style={[styles.applyButton, shadow.sm]}
              onPress={handleApplyUpdate}
              activeOpacity={0.85}
              disabled={downloading}
            >
              {downloading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <Text variant="h3" style={styles.applyButtonText}>
                    Downloading...
                  </Text>
                </View>
              ) : (
                <Text variant="h3" style={styles.applyButtonText}>
                  {updateReady ? 'Restart & Apply' : 'Update Now'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Remind Me Later Button */}
            {!downloading && (
              <TouchableOpacity
                style={styles.remindButton}
                onPress={handleRemindMeLater}
                activeOpacity={0.7}
              >
                <Text variant="caption" color={colors.textSecondary} style={styles.remindButtonText}>
                  Remind Me Later
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg, // 24px
  },
  dialogCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: radius.xl, // 32px
    padding: spacing.xl, // 32px
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  // Rule 15 & Rule 19 Specification:
  // In-app update / modal logos: 50x50 inside a 68x68 rounded container (border radius 18px, image border radius 12px)
  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: spacing.sm, // 8px
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.lg, // 24px
    paddingHorizontal: spacing.sm, // 8px
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  applyButton: {
    width: '100%',
    backgroundColor: colors.accent,
    paddingVertical: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  remindButton: {
    paddingVertical: spacing.sm, // 8px
    paddingHorizontal: spacing.md, // 16px
  },
  remindButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
