import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useThemedAlert } from '../context/AlertContext';
import {
  DevicesSvg,
  ShieldCheckSvg,
  ShieldLockSvg,
  ClockSvg,
} from '../components/SvgIcons';
import {
  SessionSecurityService,
  DeviceSessionInfo,
  SecurityAuditEvent,
} from '../services/sessionSecurityService';

export default function DeviceSessionsScreen() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceSessionInfo | null>(null);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState(false);
  const { showAlert } = useThemedAlert();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [info, logs] = await Promise.all([
      SessionSecurityService.getCurrentDeviceInfo(),
      SessionSecurityService.getAuditLogs(),
    ]);
    setDeviceInfo(info);
    setAuditLogs(logs);
    setLoading(false);
  };

  const handleClearLogs = async () => {
    showAlert({
      title: 'Clear Audit History',
      message: 'This will remove all security event logs from this local device. This action cannot be undone.',
      icon: 'trash',
      isDestructive: true,
      buttons: [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Logs',
          style: 'destructive',
          onPress: async () => {
            await SessionSecurityService.clearAuditLogs();
            setAuditLogs([]);
          },
        },
      ],
    });
  };

  const handleRevokeSessions = () => {
    showAlert({
      title: 'Revoke All Sessions',
      message: 'This will sign you out of all active web and mobile sessions across all devices. You will need to sign in again.\n\nDo you wish to proceed?',
      icon: 'devices',
      isDestructive: true,
      buttons: [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Revoke & Sign Out',
          style: 'destructive',
          onPress: async () => {
            setRevoking(true);
            const res = await SessionSecurityService.revokeAllSessions();
            setRevoking(false);
            if (res.success) {
              showAlert({
                title: 'Sessions Revoked',
                message: 'All sessions have been terminated.',
                icon: 'success',
              });
              loadData();
            } else {
              showAlert({
                title: 'Notice',
                message: res.error || 'Failed to revoke sessions.',
                icon: 'warning',
              });
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
      >
        {/* Rule 15/19 Logo Container: 50x50 icon inside 68x68 rounded container */}
        <View style={styles.logoRow}>
          <View style={[styles.logoContainer, shadow.sm]}>
            <DevicesSvg size={36} color="#0F172A" />
          </View>
        </View>

        {/* Intro Header */}
        <View style={styles.introHeader}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.mainTitle}>
            Device Sessions & Security Audit
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.leadParagraph}>
            Monitor active device hardware connections, hardware security status, and inspect local security audit events.
          </Text>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={colors.accent} />
          </View>
        ) : (
          <>
            {/* Current Active Device Section */}
            <View style={styles.bodySection}>
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                CURRENT ACTIVE DEVICE
              </Text>

              <View style={[styles.deviceCard, shadow.sm]}>
                <View style={styles.deviceCardHeader}>
                  <View style={styles.deviceTitleBox}>
                    <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.deviceName}>
                      {deviceInfo?.appName || 'Exegeomai Bible'}
                    </Text>
                    <Text variant="caption" color={colors.textSecondary} style={styles.deviceMeta}>
                      {deviceInfo?.platform === 'ios' ? 'iOS' : deviceInfo?.platform === 'android' ? 'Android' : 'Device'} {deviceInfo?.osVersion} • {deviceInfo?.appName}
                    </Text>
                  </View>
                  <View style={styles.activePill}>
                    <View style={styles.activeDot} />
                    <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.activePillText}>
                      This Device
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.specsGrid}>
                  <View style={styles.specItem}>
                    <Text variant="caption" color={colors.textTertiary} style={styles.specLabel}>
                      App Release
                    </Text>
                    <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specValue}>
                      v{deviceInfo?.appVersion || '1.0.4'}
                    </Text>
                  </View>

                  <View style={styles.specItem}>
                    <Text variant="caption" color={colors.textTertiary} style={styles.specLabel}>
                      Security Enclave
                    </Text>
                    <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specValue}>
                      {Platform.OS === 'android' ? 'Android Keystore' : 'Apple Keychain'}
                    </Text>
                  </View>

                  <View style={styles.specItem}>
                    <Text variant="caption" color={colors.textTertiary} style={styles.specLabel}>
                      Hardware ID
                    </Text>
                    <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specValue}>
                      {deviceInfo?.deviceId ? deviceInfo.deviceId.substring(0, 14) + '...' : 'Protected ID'}
                    </Text>
                  </View>

                  <View style={styles.specItem}>
                    <Text variant="caption" color={colors.textTertiary} style={styles.specLabel}>
                      Session State
                    </Text>
                    <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specValue}>
                      Authenticated
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Global Session Revocation Section */}
            <View style={styles.bodySection}>
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                SESSION REVOCATION
              </Text>

              <View style={[styles.revokeCard, shadow.sm]}>
                <View style={styles.revokeTextBox}>
                  <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.revokeTitle}>
                    Terminate All Sessions
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={styles.revokeDesc}>
                    If you suspect unauthorized access or lost a secondary device, instantly revoke all active tokens.
                  </Text>
                </View>

                <TouchableOpacity
                  style={[styles.revokeBtn, shadow.sm]}
                  onPress={handleRevokeSessions}
                  activeOpacity={0.8}
                  disabled={revoking}
                  accessibilityRole="button"
                  accessibilityLabel="Revoke all active sessions"
                >
                  {revoking ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text variant="caption" weight="700" color="#FFFFFF" style={styles.revokeBtnText}>
                      Revoke All Sessions
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Security Audit Trail Section */}
            <View style={[styles.bodySection, { borderBottomWidth: 0 }]}>
              <View style={styles.sectionHeaderRow}>
                <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                  SECURITY AUDIT TRAIL ({auditLogs.length})
                </Text>
                {auditLogs.length > 0 && (
                  <TouchableOpacity
                    onPress={handleClearLogs}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel="Clear local audit trail"
                  >
                    <Text variant="caption" weight="700" color={colors.textSecondary}>
                      Clear Trail ›
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {auditLogs.length === 0 ? (
                <View style={[styles.emptyCard, shadow.sm]}>
                  <ShieldCheckSvg size={24} color="#0F172A" />
                  <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.emptyTitle}>
                    Zero Security Violations
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={styles.emptySubtitle}>
                    All biometric validations, PIN verifications, and sessions are in perfect order.
                  </Text>
                </View>
              ) : (
                auditLogs.map((log) => (
                  <View key={log.id} style={[styles.logCard, shadow.sm]}>
                    <View style={styles.logHeader}>
                      <View style={styles.logIconBox}>
                        <ShieldLockSvg size={16} color="#0F172A" />
                      </View>
                      <View style={styles.logTitleBox}>
                        <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.logAction}>
                          {log.title}
                        </Text>
                        <Text variant="caption" color={colors.textTertiary} style={styles.logTimestamp}>
                          {new Date(log.timestamp).toLocaleString()}
                        </Text>
                      </View>
                    </View>
                    <Text variant="caption" color={colors.textSecondary} style={styles.logDetails}>
                      {log.detail}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}
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
  loaderContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  bodySection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  deviceCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  deviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceTitleBox: {
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
  },
  deviceMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  activePillText: {
    fontSize: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: spacing.md,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  specItem: {
    width: '47%',
  },
  specLabel: {
    fontSize: 10.5,
  },
  specValue: {
    fontSize: 12,
    marginTop: 2,
  },
  revokeCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  revokeTextBox: {
    marginBottom: spacing.md,
  },
  revokeTitle: {
    fontSize: 14,
  },
  revokeDesc: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  revokeBtn: {
    backgroundColor: '#0F172A',
    paddingVertical: 11,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  revokeBtnText: {
    fontSize: 12,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 14,
    marginTop: spacing.sm,
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  logCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: 4,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  logTitleBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logAction: {
    fontSize: 12,
  },
  logTimestamp: {
    fontSize: 10,
  },
  logDetails: {
    fontSize: 11.5,
    lineHeight: 16,
    marginLeft: 34,
  },
});
