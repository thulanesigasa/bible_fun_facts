import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
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
} from '../components/SvgIcons';
import { InAppNotificationItem } from '../types/inAppNotifications';
import { parseScriptureCoordinates } from '../services/inAppNotifications';

interface NotificationsScreenProps {
  navigation: any;
}

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
  } = useUser();

  const handleOpenNotification = (item: InAppNotificationItem) => {
    markNotificationAsRead(item.id);

    if (item.type === 'achievement') {
      navigation.navigate('Achievements');
      return;
    }

    // Canonical Scripture Reader Deep-Linking
    const coords = (item.book && item.chapter)
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

  const renderNotificationRow = ({ item, index }: { item: InAppNotificationItem; index: number }) => {
    const isAchievement = item.type === 'achievement';

    return (
      <TouchableOpacity
        style={[
          styles.notificationRow,
          index < notifications.length - 1 && styles.rowDivider,
        ]}
        activeOpacity={0.75}
        onPress={() => handleOpenNotification(item)}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}. Tap to open.`}
      >
        {/* Row Header: Reference/Title & Remove Button (matching BookmarksScreen) */}
        <View style={styles.rowHeader}>
          <View style={styles.headerLeftWrap}>
            {!item.isRead && <View style={styles.unreadDot} />}
            <Text variant="h3" style={styles.itemTitle}>
              {item.scriptureRef || item.title}
            </Text>
            {item.deliveredAtLabel ? (
              <Text variant="caption" color={colors.textTertiary} style={styles.deliveredAtText}>
                {` • ${item.deliveredAtLabel}`}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={(e) => {
              e.stopPropagation();
              deleteNotification(item.id);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel={`Dismiss ${item.title}`}
          >
            <CloseSvg size={14} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Verse Body Text with Sacred Dotted Underline (matching BookmarksScreen) */}
        <Text style={styles.verseBodyText}>
          {item.verseQuote ? `"${item.verseQuote.trim()}"` : `"${item.body.replace(/^"|"$/g, '').trim()}"`}
        </Text>

        {/* Context Note (if verseQuote is distinct from reflection prompt) */}
        {item.verseQuote && item.body && item.body.trim() !== item.verseQuote.trim() && (
          <Text variant="caption" color={colors.textSecondary} style={styles.contextNoteText}>
            {item.body.replace(/^"|"$/g, '').trim()}
          </Text>
        )}

        {/* Action Cue (matching BookmarksScreen) */}
        <View style={styles.actionFooter}>
          <View style={styles.openInReaderRow}>
            {isAchievement ? (
              <AwardSvg size={12} color={colors.accent} />
            ) : (
              <BookOpenSvg size={12} color={colors.accent} />
            )}
            <Text variant="caption" weight="700" color={colors.accent} style={styles.openInReaderText}>
              {isAchievement ? 'View in Achievements ›' : 'Open in Word Reader ›'}
            </Text>
          </View>
          <Text variant="caption" color={colors.textTertiary}>
            {isAchievement ? 'Milestone' : (item.scriptureRef || 'Sacred Scripture')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    if (unreadNotificationsCount <= 0) return null;
    return (
      <View style={styles.headerSection}>
        <TouchableOpacity
          style={styles.markAllReadRow}
          onPress={markAllNotificationsAsRead}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Mark all notifications as read"
        >
          <CheckDoubleSvg size={15} color={colors.accent} />
          <Text variant="caption" weight="700" color={colors.accent}>
            Mark all notifications as read
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationRow}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="h3" style={styles.emptyTitle}>
              No notifications to display
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.emptyMessage}>
              Sacred devotions and study milestones dispatched to your device will appear here.
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

  // Subtle header action for marking all read
  headerSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  markAllReadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },

  // Continuous body row styling (matching BookmarksScreen - no card divs)
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

  // Verse quotation with sacred dotted underline (matching BookmarksScreen)
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

  // Action Footer (matching BookmarksScreen)
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
