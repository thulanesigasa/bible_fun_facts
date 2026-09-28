import React, { useRef } from 'react';
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
import {
  AwardSvg,
  BookOpenSvg,
  CheckDoubleSvg,
  CloseSvg,
  TrashSvg,
} from '../components/SvgIcons';
import { InAppNotificationItem } from '../types/inAppNotifications';
import { parseScriptureCoordinates } from '../services/inAppNotifications';

interface NotificationsScreenProps {
  navigation: any;
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
        // Only claim gesture if horizontal intent is decisive
        return (
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5
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
          // Snap back with gentle spring
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

  return (
    <View style={styles.swipeContainer}>
      {/* Background Action Shelf revealing during swipe */}
      <View style={styles.swipeBackgroundShelf}>
        <View style={styles.swipeShelfActionLeft}>
          <TrashSvg size={16} color="#DC2626" />
          <Text variant="caption" weight="700" color="#DC2626" style={styles.swipeShelfText}>
            Dismiss
          </Text>
        </View>
        <View style={styles.swipeShelfActionRight}>
          <Text variant="caption" weight="700" color="#DC2626" style={styles.swipeShelfText}>
            Dismiss
          </Text>
          <TrashSvg size={16} color="#DC2626" />
        </View>
      </View>

      {/* Foreground Swipeable Notification Content */}
      <Animated.View
        style={[
          styles.notificationRow,
          !isLast && styles.rowDivider,
          {
            transform: [{ translateX }],
            opacity: rowOpacity,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => onPress(item)}
          accessibilityRole="button"
          accessibilityLabel={`${item.title}. Tap to open or swipe to dismiss.`}
        >
          {/* Row Header: Reference/Title & Remove Button */}
          <View style={styles.rowHeader}>
            <View style={styles.headerLeftWrap}>
              {!item.isRead && <View style={styles.unreadDot} />}
              <Text variant="h3" style={styles.itemTitle}>
                {isAchievement ? item.title : item.scriptureRef || item.title}
              </Text>
              {item.deliveredAtLabel ? (
                <Text
                  variant="caption"
                  color={colors.textTertiary}
                  style={styles.deliveredAtText}
                >
                  {` • ${item.deliveredAtLabel}`}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={(e) => {
                e.stopPropagation();
                triggerDismissAnimation('right');
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
              accessibilityLabel={`Dismiss ${item.title}`}
            >
              <CloseSvg size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Achievement Description or Devotion Body Text */}
          {isAchievement ? (
            <>
              <Text style={styles.achievementDescText}>{item.body}</Text>
              {item.verseQuote && (
                <Text style={styles.verseBodyText}>
                  {`"${item.verseQuote.trim()}" — ${
                    item.scriptureRef || 'Sacred Scripture'
                  }`}
                </Text>
              )}
            </>
          ) : (
            <>
              {/* Verse Body Text with Sacred Dotted Underline */}
              <Text style={styles.verseBodyText}>
                {item.verseQuote
                  ? `"${item.verseQuote.trim()}"`
                  : `"${item.body.replace(/^"|"$/g, '').trim()}"`}
              </Text>

              {/* Context Note (if verseQuote is distinct from reflection prompt) */}
              {item.verseQuote &&
                item.body &&
                item.body.trim() !== item.verseQuote.trim() && (
                  <Text
                    variant="caption"
                    color={colors.textSecondary}
                    style={styles.contextNoteText}
                  >
                    {item.body.replace(/^"|"$/g, '').trim()}
                  </Text>
                )}
            </>
          )}

          {/* Action Cue */}
          <View style={styles.actionFooter}>
            <View style={styles.openInReaderRow}>
              {isAchievement ? (
                <AwardSvg size={12} color={colors.accent} />
              ) : (
                <BookOpenSvg size={12} color={colors.accent} />
              )}
              <Text
                variant="caption"
                weight="700"
                color={colors.accent}
                style={styles.openInReaderText}
              >
                {isAchievement
                  ? 'View in Achievements ›'
                  : 'Open in Word Reader ›'}
              </Text>
            </View>
            <Text variant="caption" color={colors.textTertiary}>
              {isAchievement
                ? `${(
                    item.achievementCategory || 'milestone'
                  ).toUpperCase()} MILESTONE`
                : item.scriptureRef || 'Sacred Scripture'}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default function NotificationsScreen({
  navigation,
}: NotificationsScreenProps) {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
    clearAllReadNotifications,
  } = useUser();

  const handleOpenNotification = (item: InAppNotificationItem) => {
    markNotificationAsRead(item.id);

    // Smoothly remove item from active notification tray when read
    deleteNotification(item.id);

    if (item.type === 'achievement') {
      navigation.navigate('Achievements', {
        category: item.achievementCategory || 'bookmark',
        milestoneId: item.achievementId,
      });
      return;
    }

    // Canonical Scripture Reader Deep-Linking
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
  };

  const handleClearAllConfirm = () => {
    if (notifications.length === 0) return;
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications from your tray?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => clearAllNotifications(),
        },
      ]
    );
  };

  const renderHeader = () => {
    if (notifications.length === 0) return null;

    return (
      <View style={styles.headerSection}>
        <View style={styles.headerActionsRow}>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={markAllNotificationsAsRead}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Mark all notifications as read and clear tray"
          >
            <CheckDoubleSvg size={14} color={colors.accent} />
            <Text variant="caption" weight="700" color={colors.accent}>
              Mark all as read
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.headerActionBtn, styles.clearAllBtn]}
            onPress={handleClearAllConfirm}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Clear all notifications"
          >
            <TrashSvg size={13} color="#94A3B8" />
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
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="h3" style={styles.emptyTitle}>
              Notification Tray Clear
            </Text>
            <Text
              variant="body"
              color={colors.textSecondary}
              style={styles.emptyMessage}
            >
              Your notifications bar is clean. Daily devotions and sacred milestones
              dispatched to your device will appear here.
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
    backgroundColor: '#FFFFFF', // Continuous flat 30% panel body surface
  },
  listContent: {
    paddingBottom: 96,
  },

  // Subtle header actions bar
  headerSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    backgroundColor: '#FFFFFF',
  },
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    flexWrap: 'wrap',
  },
  headerActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  clearAllBtn: {
    marginLeft: 'auto',
  },

  // Swipeable container and background action shelf
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
    gap: 6,
  },
  swipeShelfActionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  swipeShelfText: {
    fontSize: 12,
  },

  // Continuous body row styling (matching BookmarksScreen)
  notificationRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  headerLeftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  deliveredAtText: {
    fontSize: 11,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Achievement description text
  achievementDescText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    marginTop: 2,
    marginBottom: 4,
  },

  // Verse quotation with sacred dotted underline
  verseBodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textPrimary,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    textDecorationColor: colors.accent,
    marginVertical: 4,
  },
  contextNoteText: {
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 2,
    marginBottom: 4,
  },

  // Action Footer
  actionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  openInReaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  openInReaderText: {
    fontSize: 12,
  },

  // Empty State - Pure flat body typography, zero icon, zero card divs
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 100,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 280,
  },
});
