import React, { useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  PanResponder,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { CategoryBadge } from '../components/CategoryBadge';
import { InAppNotificationItem } from '../types/inAppNotifications';
import { parseScriptureCoordinates } from '../services/inAppNotifications';
import { useThemedAlert } from '../context/AlertContext';

interface NotificationsScreenProps {
  navigation: any;
}

function getRelativeTime(isoString?: string): string {
  if (!isoString) return 'Recently';
  try {
    const now = Date.now();
    const past = new Date(isoString).getTime();
    const diffSec = Math.max(0, Math.floor((now - past) / 1000));

    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;
    const diffDays = Math.floor(diffHour / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    const d = new Date(isoString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]}`;
  } catch {
    return 'Recently';
  }
}

interface SwipeableNotificationRowProps {
  item: InAppNotificationItem;
  isLast: boolean;
  onPress: (item: InAppNotificationItem) => void;
  onDismiss: (id: string) => void;
}

function SwipeableNotificationRow({
  item,
  isLast,
  onPress,
  onDismiss,
}: SwipeableNotificationRowProps) {
  const { width: screenWidth } = useWindowDimensions();
  const translateX = useRef(new Animated.Value(0)).current;
  const rowOpacity = useRef(new Animated.Value(1)).current;
  const isAchievement = item.type === 'achievement';
  const relativeTime = getRelativeTime(item.createdAt);

  const DISMISS_THRESHOLD = screenWidth * 0.28;

  const triggerDismissAnimation = (direction: 'left' | 'right') => {
    const targetX = direction === 'right' ? screenWidth * 1.25 : -screenWidth * 1.25;
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: targetX,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(rowOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(item.id);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          Math.abs(gestureState.dx) > 12 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.6
        );
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > DISMISS_THRESHOLD) {
          triggerDismissAnimation('right');
        } else if (gestureState.dx < -DISMISS_THRESHOLD) {
          triggerDismissAnimation('left');
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            bounciness: 4,
            speed: 14,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          bounciness: 4,
          speed: 14,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const quoteSnippet =
    item.verseQuote ||
    (item.body && item.body.trim() !== item.title.trim()
      ? item.body.replace(/^"|"$/g, '').trim()
      : undefined);

  const actionLabel = isAchievement
    ? 'View in Achievements'
    : 'Open in Reader';

  const metaString = item.scriptureRef
    ? `${item.scriptureRef} • ${relativeTime}`
    : relativeTime;

  return (
    <View style={styles.swipeContainer}>
      {/* Background Action Shelf revealing during swipe - Pure text, zero SVGs */}
      <View style={styles.swipeBackgroundShelf}>
        <View style={styles.swipeShelfActionLeft}>
          <Text variant="caption" weight="800" color="#DC2626" style={styles.swipeShelfText}>
            DISMISS
          </Text>
        </View>
        <View style={styles.swipeShelfActionRight}>
          <Text variant="caption" weight="800" color="#DC2626" style={styles.swipeShelfText}>
            DISMISS
          </Text>
        </View>
      </View>

      {/* Foreground Swipeable Notification Content */}
      <Animated.View
        style={[
          styles.rowContainer,
          !isLast && styles.rowDivider,
          {
            transform: [{ translateX }],
            opacity: rowOpacity,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onPress(item)}
          style={styles.rowTouchArea}
          accessibilityRole="button"
          accessibilityLabel={`${item.title}. ${metaString}`}
        >
          {/* Left Unread Indicator Dot */}
          <View style={styles.unreadDotCol}>
            {!item.isRead ? <View style={styles.unreadDot} /> : <View style={styles.unreadDotPlaceholder} />}
          </View>

          {/* Left Side: CategoryBadge ONLY for achievements. No pills or badges for devotions! */}
          {isAchievement && (
            <View style={styles.achievementBadgeWrapper}>
              <CategoryBadge
                category={item.achievementCategory || 'streak'}
                days={item.achievementTarget || 1}
                size={44}
                showText={true}
              />
            </View>
          )}

          {/* Main Text Content Column - Direct text layout, zero pills/badges on right or left */}
          <View style={styles.contentCol}>
            {/* Title Line */}
            <View style={styles.titleLine}>
              <Text style={styles.titleText} numberOfLines={2}>
                <Text style={styles.authorBold}>{item.title}</Text>
              </Text>
            </View>

            {/* Subtitle / Timestamp */}
            <Text variant="caption" color={colors.textSecondary} style={styles.metaText}>
              {metaString}
            </Text>

            {/* Inset Quote / Reflection Bubble */}
            {quoteSnippet ? (
              <View style={styles.insetCard}>
                <Text style={styles.insetText} numberOfLines={3}>
                  "{quoteSnippet}"
                </Text>
              </View>
            ) : null}

            {/* Action Buttons Row - Pure Text */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={styles.dismissActionBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  triggerDismissAnimation('right');
                }}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Dismiss notification"
              >
                <Text variant="caption" weight="600" color={colors.textSecondary} style={styles.actionBtnLabel}>
                  Decline
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryActionBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  onPress(item);
                }}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={actionLabel}
              >
                <Text variant="caption" weight="700" color="#FFFFFF" style={styles.primaryBtnLabel}>
                  {actionLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useUser();
  const { showAlert } = useThemedAlert();

  const handleOpenNotification = useCallback(
    (item: InAppNotificationItem) => {
      markNotificationAsRead(item.id);

      if (item.type === 'achievement') {
        navigation.navigate('Achievements', {
          category: item.achievementCategory || 'bookmark',
          milestoneId: item.achievementId,
        });
        return;
      }

      const coords =
        item.book && item.chapter
          ? { book: item.book, chapter: item.chapter, verse: item.verse || 1 }
          : parseScriptureCoordinates(item.scriptureRef);

      if (coords) {
        navigation.navigate('WOTD', {
          book: coords.book,
          chapter: coords.chapter,
          verse: coords.verse,
        });
        return;
      }

      if (item.actionRoute) {
        navigation.navigate(item.actionRoute, item.actionParams);
      }
    },
    [markNotificationAsRead, navigation]
  );

  const handleClearAllConfirm = () => {
    if (notifications.length === 0) return;
    showAlert({
      title: 'Clear All Notifications',
      message: 'Are you sure you want to clear all notifications from your tray?',
      buttons: [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => clearAllNotifications(),
        },
      ],
    });
  };

  const renderListHeader = () => {
    if (notifications.length === 0) return null;

    return (
      <View style={styles.headerSection}>
        <View style={styles.headerActionsRow}>
          {unreadNotificationsCount > 0 && (
            <TouchableOpacity
              onPress={markAllNotificationsAsRead}
              style={styles.markAllReadBtn}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Mark all as read"
            >
              <Text variant="caption" weight="700" color="#0F172A">
                Mark all as read
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleClearAllConfirm}
            style={styles.clearAllBtn}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Clear all notifications"
          >
            <Text variant="caption" weight="600" color="#94A3B8">
              Clear all
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SwipeableNotificationRow
            item={item}
            isLast={index === notifications.length - 1}
            onPress={handleOpenNotification}
            onDismiss={deleteNotification}
          />
        )}
        ListHeaderComponent={renderListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="h3" style={styles.emptyTitle}>
              Notification Tray Clear
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.emptyMessage}>
              Your notifications bar is clean. Daily devotions and sacred milestones dispatched to your device will appear here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Sub-Header Area directly below standard navigation stack header
  headerSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  markAllReadBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
  },
  clearAllBtn: {
    marginLeft: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  clearAllText: {
    fontSize: 11.5,
  },

  // List content
  listContent: {
    paddingBottom: 110,
  },

  // Swipeable container and action shelf
  swipeContainer: {
    position: 'relative',
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  swipeBackgroundShelf: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#FEE2E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  swipeShelfActionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeShelfActionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeShelfText: {
    fontSize: 12,
  },

  // Foreground Notification Row
  rowContainer: {
    backgroundColor: '#FFFFFF',
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  rowTouchArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  // Unread Dot Column
  unreadDotCol: {
    width: 14,
    alignItems: 'flex-start',
    paddingTop: 6,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#F43F5E',
  },
  unreadDotPlaceholder: {
    width: 7,
    height: 7,
  },

  // Achievement Badge Wrapper (Only for achievements on the left side)
  achievementBadgeWrapper: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },

  // Content Column - Direct text layout, zero pills/badges on right or left
  contentCol: {
    flex: 1,
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 19,
  },
  authorBold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  // Inset Quote Bubble
  insetCard: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  insetText: {
    fontSize: 12.5,
    lineHeight: 17,
    color: '#334155',
    fontStyle: 'italic',
  },

  // Action Buttons Row - Pure Text
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  dismissActionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  actionBtnLabel: {
    fontSize: 12,
  },
  primaryActionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#0F172A',
  },
  primaryBtnLabel: {
    fontSize: 12,
  },

  // Empty State - Pure Typography
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 90,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 6,
  },
  emptyMessage: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 280,
  },
});
