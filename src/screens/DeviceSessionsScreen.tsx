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
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useThemedAlert } from '../context/AlertContext';
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
        {/* Intro Header - Seamless Body Canvas */}
        <View style={styles.headerBlock}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.title}>
            Device Sessions & Security Audit
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
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
            <View style={styles.sectionBlock}>
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                CURRENT ACTIVE DEVICE
              </Text>

              <View style={styles.deviceRow}>
                <View style={styles.deviceInfo}>
                  <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.deviceName}>
                    {deviceInfo?.appName || 'Exegeomai Bible'}
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={styles.deviceMeta}>
                    {deviceInfo?.platform === 'ios' ? 'iOS' : deviceInfo?.platform === 'android' ? 'Android' : 'Device'} {deviceInfo?.osVersion} • Primary Hardware
                  </Text>
                </View>
                <Text variant="caption" weight="800" color={colors.accent} style={styles.statusPill}>
                  THIS DEVICE
                </Text>
              </View>

              <View style={styles.rowDivider} />

              <View style={styles.specRow}>
                <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specLabel}>
                  App Release
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.specValue}>
                  v{deviceInfo?.appVersion || '1.0.4'}
                </Text>
              </View>

              <View style={styles.specRow}>
                <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specLabel}>
                  Security Enclave
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.specValue}>
                  {Platform.OS === 'android' ? 'Android Keystore' : 'Apple Keychain'}
                </Text>
              </View>

              <View style={styles.specRow}>
                <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specLabel}>
                  Hardware ID
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.specValue}>
                  {deviceInfo?.deviceId ? deviceInfo.deviceId.substring(0, 14) + '...' : 'Protected ID'}
                </Text>
              </View>

              <View style={styles.specRow}>
                <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specLabel}>
                  Session State
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.specValue}>
                  Hardware Authenticated
                </Text>
              </View>
            </View>

            {/* Global Session Revocation Section */}
            <View style={styles.sectionBlock}>
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                SESSION REVOCATION
              </Text>

              <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.revokeTitle}>
                Terminate All Sessions
              </Text>
              <Text variant="body" color={colors.textSecondary} style={styles.revokeDesc}>
                If you suspect unauthorized access or lost a secondary device, instantly revoke all active cryptographic session tokens.
              </Text>

              <TouchableOpacity
                style={styles.revokeBtn}
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

            {/* Security Audit Trail Section */}
            <View style={[styles.sectionBlock, { borderBottomWidth: 0 }]}>
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
                <View style={styles.emptyTrailBox}>
                  <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.emptyTitle}>
                    Zero Security Violations
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={styles.emptySubtitle}>
                    All biometric validations, PIN verifications, and sessions are in perfect order.
                  </Text>
                </View>
              ) : (
                auditLogs.map((log, index) => (
                  <View key={log.id}>
                    <View style={styles.logRow}>
                      <View style={styles.logHeaderLine}>
                        <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.logAction}>
                          {log.title}
                        </Text>
                        <Text variant="caption" color={colors.textTertiary} style={styles.logTimestamp}>
                          {new Date(log.timestamp).toLocaleString()}
                        </Text>
                      </View>
                      <Text variant="caption" color={colors.textSecondary} style={styles.logDetails}>
                        {log.detail}
                      </Text>
                    </View>
                    {index < auditLogs.length - 1 && <View style={styles.rowDivider} />}
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
  loaderContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  sectionBlock: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionHeader: {
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  deviceInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  deviceName: {
    marginBottom: 2,
  },
  deviceMeta: {
    fontSize: 12,
  },
  statusPill: {
    fontSize: 11,
    letterSpacing: 0.8,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
  },
  specLabel: {
    fontSize: 12,
  },
  specValue: {
    fontSize: 12,
  },
  revokeTitle: {
    marginBottom: 4,
  },
  revokeDesc: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  revokeBtn: {
    backgroundColor: '#DC2626',
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  revokeBtnText: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
  emptyTrailBox: {
    paddingVertical: 16,
  },
  emptyTitle: {
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    lineHeight: 17,
  },
  logRow: {
    paddingVertical: 12,
  },
  logHeaderLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  logAction: {
    fontSize: 13,
  },
  logTimestamp: {
    fontSize: 11,
  },
  logDetails: {
    fontSize: 12,
    lineHeight: 17,
  },
});
