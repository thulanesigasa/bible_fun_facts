import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Text } from './Typography';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import {
  BellSvg,
  AwardSvg,
  BookOpenSvg,
  CloseSvg,
  CheckDoubleSvg,
  SparklesSvg,
} from './SvgIcons';
import { InAppNotificationItem } from '../types/inAppNotifications';

interface NotificationQuickSheetProps {
  visible: boolean;
  onClose: () => void;
  notifications: InAppNotificationItem[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onNotificationPress: (notification: InAppNotificationItem) => void;
  onOpenNotificationsScreen: () => void;
}

export const NotificationQuickSheet: React.FC<NotificationQuickSheetProps> = ({
  visible,
  onClose,
  notifications,
  unreadCount,
  onMarkAllRead,
  onNotificationPress,
  onOpenNotificationsScreen,
}) => {
  const { height } = useWindowDimensions();
  const maxSheetHeight = Math.min(580, height * 0.75);

  const previewNotifications = notifications.slice(0, 6);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={[styles.sheetContainer, { maxHeight: maxSheetHeight }, shadow.lg]}>
          {/* Sheet Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.sheetHeaderLeft}>
              <View style={styles.bellIconCircle}>
                <BellSvg size={18} color="#0F172A" />
              </View>
              <View>
                <Text variant="h3" style={styles.headerTitle}>
                  Notifications
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.headerSubtitle}>
                  Sent devotions & unlocked achievements
                </Text>
              </View>
            </View>

            <View style={styles.headerRightActions}>
              {unreadCount > 0 ? (
                <View style={styles.unreadCounterPill}>
                  <Text variant="caption" weight="800" color="#0F172A" style={styles.unreadCounterText}>
                    {unreadCount} UNREAD
                  </Text>
                </View>
              ) : (
                <View style={styles.allReadPill}>
                  <Text variant="caption" weight="700" color="#64748B" style={styles.allReadText}>
                    ALL CAUGHT UP
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={onClose}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel="Close notifications preview"
              >
                <CloseSvg size={16} color="#64748B" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions Row */}
          <View style={styles.actionsBar}>
            <Text variant="caption" color={colors.textTertiary} weight="700" style={{ letterSpacing: 0.5 }}>
              RECENT ALERTS ({notifications.length})
            </Text>

            {unreadCount > 0 && (
              <TouchableOpacity
                style={styles.markReadBtn}
                onPress={onMarkAllRead}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Mark all notifications as read"
              >
                <CheckDoubleSvg size={14} color={colors.accent} />
                <Text variant="caption" weight="700" color={colors.accent}>
                  Mark all read
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Notifications Scroll List */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {previewNotifications.length === 0 ? (
              <View style={styles.emptyStateWrap}>
                <SparklesSvg size={32} color="#94A3B8" />
                <Text variant="body" color={colors.textSecondary} style={styles.emptyTitle}>
                  No notifications yet
                </Text>
                <Text variant="caption" color={colors.textTertiary} align="center" style={styles.emptySub}>
                  Scheduled morning, midday, and evening fellowship verses will appear here as they are sent.
                </Text>
              </View>
            ) : (
              previewNotifications.map((item) => {
                const isAchievement = item.type === 'achievement';
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.notificationCard,
                      !item.isRead && styles.notificationCardUnread,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => onNotificationPress(item)}
                  >
                    <View style={styles.cardHeaderRow}>
                      <View style={styles.cardTypeLeft}>
                        <View
                          style={[
                            styles.typeIconCircle,
                            isAchievement ? styles.achievementIconCircle : styles.scriptureIconCircle,
                          ]}
                        >
                          {isAchievement ? (
                            <AwardSvg size={15} color={colors.accent} />
                          ) : (
                            <BookOpenSvg size={14} color={colors.accent} />
                          )}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            variant="h3"
                            numberOfLines={1}
                            style={[styles.cardTitle, !item.isRead && styles.cardTitleBold]}
                          >
                            {item.title}
                          </Text>
                          {item.subtitle && (
                            <Text variant="caption" color={colors.textSecondary} numberOfLines={1} style={styles.cardSub}>
                              {item.subtitle}
                            </Text>
                          )}
                        </View>
                      </View>

                      {!item.isRead && <View style={styles.cardUnreadDot} />}
                    </View>

                    <Text variant="body" color={colors.textSecondary} numberOfLines={2} style={styles.cardBody}>
                      {item.body}
                    </Text>

                    {item.scriptureRef && (
                      <View style={styles.cardFooter}>
                        <Text variant="caption" weight="700" color={colors.accent}>
                          {item.scriptureRef}
                        </Text>
                        <Text variant="caption" color={colors.textTertiary}>
                          Tap to view ›
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>

          {/* Full Screen Entrypoint Footer Button */}
          <View style={styles.footerWrap}>
            <TouchableOpacity
              style={styles.viewAllBtn}
              activeOpacity={0.85}
              onPress={onOpenNotificationsScreen}
              accessibilityRole="button"
              accessibilityLabel="Go to full Notifications screen"
            >
              <Text variant="h3" style={styles.viewAllBtnText}>
                {`View All Notifications (${notifications.length}) ›`}
              </Text>
            </TouchableOpacity>
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
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    borderBottomWidth: 0,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  sheetHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  bellIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(253, 210, 35, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.3)',
  },
  headerTitle: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  unreadCounterPill: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  unreadCounterText: {
    fontSize: 10,
  },
  allReadPill: {
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  allReadText: {
    fontSize: 9.5,
  },
  closeBtn: {
    padding: 6,
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: 12,
    paddingBottom: 8,
  },
  markReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 8,
  },
  emptyStateWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 12,
    maxWidth: 260,
    lineHeight: 17,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.sm,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  notificationCardUnread: {
    backgroundColor: 'rgba(253, 210, 35, 0.04)',
    borderColor: 'rgba(253, 210, 35, 0.25)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  typeIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIconCircle: {
    backgroundColor: 'rgba(253, 210, 35, 0.15)',
  },
  scriptureIconCircle: {
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
  },
  cardTitle: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  cardTitleBold: {
    fontWeight: '800',
  },
  cardSub: {
    fontSize: 10.5,
    marginTop: 1,
  },
  cardUnreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: 4,
    marginLeft: 6,
  },
  cardBody: {
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.04)',
    paddingTop: 6,
    marginTop: 2,
  },
  footerWrap: {
    paddingHorizontal: spacing.md,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
  },
  viewAllBtn: {
    backgroundColor: '#0F172A',
    borderRadius: radius.sm,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
});
