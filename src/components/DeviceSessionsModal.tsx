import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from './Typography';
import {
  XCloseSvg,
  DevicesSvg,
  ShieldCheckSvg,
  ShieldLockSvg,
  ClockSvg,
} from './SvgIcons';
import {
  SessionSecurityService,
  DeviceSessionInfo,
  SecurityAuditEvent,
} from '../services/sessionSecurityService';

interface DeviceSessionsModalProps {
  visible: boolean;
  onClose: () => void;
  onSessionsRevoked?: () => void;
}

export const DeviceSessionsModal: React.FC<DeviceSessionsModalProps> = ({
  visible,
  onClose,
  onSessionsRevoked,
}) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceSessionInfo | null>(null);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState(false);

  useEffect(() => {
    if (visible) {
      loadData();
    }
  }, [visible]);

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
    Alert.alert(
      'Clear Audit History',
      'This will remove all security event logs from this local device. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Logs',
          style: 'destructive',
          onPress: async () => {
            await SessionSecurityService.clearAuditLogs();
            setAuditLogs([]);
          },
        },
      ]
    );
  };

  const handleRevokeSessions = () => {
    Alert.alert(
      'Revoke All Sessions',
      'This will sign you out of all active web and mobile sessions across all devices. You will need to sign in again.\n\nDo you wish to proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Revoke & Sign Out',
          style: 'destructive',
          onPress: async () => {
            setRevoking(true);
            const res = await SessionSecurityService.revokeAllSessions();
            setRevoking(false);
            if (res.success) {
              Alert.alert('Sessions Revoked', 'All sessions have been terminated.');
              onClose();
              if (onSessionsRevoked) {
                onSessionsRevoked();
              }
            } else {
              Alert.alert('Notice', res.error || 'Failed to revoke sessions.');
            }
          },
        },
      ]
    );
  };

  const formatTimestamp = (iso: string) => {
    try {
      const d = new Date(iso);
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      return iso;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalCard, shadow.lg]}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <DevicesSvg size={20} color="#0F172A" />
              </View>
              <View>
                <Text variant="h3" style={styles.titleText}>
                  Device & Security Audit
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Hardware inspection & event log
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Close Device Sessions modal"
            >
              <XCloseSvg size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0F172A" />
              <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 12 }}>
                Inspecting hardware security status...
              </Text>
            </View>
          ) : (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Current Device Card */}
              {deviceInfo && (
                <View style={styles.deviceCard}>
                  <View style={styles.deviceCardHeader}>
                    <ShieldCheckSvg size={18} color="#0F172A" />
                    <Text variant="caption" weight="800" color="#0F172A" style={{ letterSpacing: 1 }}>
                      THIS DEVICE (AUTHENTICATED)
                    </Text>
                  </View>

                  <View style={styles.deviceDetailRow}>
                    <Text variant="caption" color={colors.textSecondary}>
                      Platform & OS:
                    </Text>
                    <Text variant="caption" weight="700" color="#0F172A">
                      {deviceInfo.platform.toUpperCase()} (v{deviceInfo.osVersion})
                    </Text>
                  </View>

                  <View style={styles.deviceDetailRow}>
                    <Text variant="caption" color={colors.textSecondary}>
                      App Binary:
                    </Text>
                    <Text variant="caption" weight="700" color="#0F172A">
                      exégeomai v{deviceInfo.appVersion}
                    </Text>
                  </View>

                  <View style={styles.deviceDetailRow}>
                    <Text variant="caption" color={colors.textSecondary}>
                      Device Identifier:
                    </Text>
                    <Text variant="caption" weight="600" color={colors.textSecondary} style={styles.deviceUuid}>
                      {deviceInfo.deviceId}
                    </Text>
                  </View>

                  <View style={styles.keystoreNotice}>
                    <ShieldLockSvg size={14} color="#0F172A" />
                    <Text variant="caption" color="#0F172A" style={{ fontSize: 11, flex: 1 }}>
                      Protected by Hardware Keystore / iOS Keychain encryption.
                    </Text>
                  </View>
                </View>
              )}

              {/* Security Audit History Header */}
              <View style={styles.sectionHeaderRow}>
                <Text variant="caption" weight="800" color={colors.textSecondary} style={styles.sectionLabel}>
                  RECENT SECURITY AUDIT TRAIL
                </Text>
                {auditLogs.length > 0 && (
                  <TouchableOpacity onPress={handleClearLogs} activeOpacity={0.7}>
                    <Text variant="caption" weight="700" color="#64748B">
                      Clear
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {auditLogs.length === 0 ? (
                <View style={styles.emptyLogsCard}>
                  <ClockSvg size={24} color={colors.textSecondary} />
                  <Text variant="caption" color={colors.textSecondary} align="center" style={{ marginTop: 8 }}>
                    No security audit events recorded yet. Authentication and encryption operations will appear here.
                  </Text>
                </View>
              ) : (
                auditLogs.map((log) => (
                  <View key={log.id} style={styles.logItem}>
                    <View style={styles.logItemTop}>
                      <Text variant="caption" weight="700" color="#0F172A">
                        {log.title}
                      </Text>
                      <Text variant="caption" color={colors.textSecondary} style={{ fontSize: 10 }}>
                        {formatTimestamp(log.timestamp)}
                      </Text>
                    </View>
                    <Text variant="caption" color={colors.textSecondary} style={{ fontSize: 11, marginTop: 2 }}>
                      {log.detail}
                    </Text>
                  </View>
                ))
              )}

              {/* Revoke All Sessions Action */}
              <TouchableOpacity
                style={styles.revokeBtn}
                onPress={handleRevokeSessions}
                disabled={revoking}
                activeOpacity={0.8}
              >
                <Text variant="body" weight="700" color="#0F172A">
                  {revoking ? 'Revoking...' : 'Revoke All Active Sessions'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)', // 60-30-10 dark backdrop
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: '#FFFFFF', // 30% Panel Surface
    borderRadius: radius.xl,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.08)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    maxHeight: 460,
  },
  scrollContent: {
    paddingVertical: spacing.md,
  },
  deviceCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  deviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  deviceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  deviceUuid: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  keystoreNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: radius.sm,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
  },
  emptyLogsCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  logItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  revokeBtn: {
    marginTop: spacing.md,
    backgroundColor: '#F8FAFC',
    borderRadius: radius.md,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
});
