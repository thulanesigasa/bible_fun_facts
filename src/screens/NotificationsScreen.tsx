import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import {
  BellSvg,
  AwardSvg,
  BookOpenSvg,
  CheckDoubleSvg,
  SparklesSvg,
  TrashSvg,
} from '../components/SvgIcons';
import { InAppNotificationItem } from '../types/inAppNotifications';

type FilterTab = 'all' | 'achievements' | 'scriptures';

export default function NotificationsScreen({ navigation }: any) {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
  } = useUser();

  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case 'achievements':
        return notifications.filter((n) => n.type === 'achievement');
      case 'scriptures':
        return notifications.filter((n) => n.type !== 'achievement');
      case 'all':
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  const handleItemPress = (item: InAppNotificationItem) => {
    markNotificationAsRead(item.id);

    if (item.type === 'achievement') {
      navigation.navigate('Achievements');
    } else if (item.actionRoute) {
      navigation.navigate(item.actionRoute, item.actionParams);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header Summary Banner */}
        <View style={styles.headerSection}>
          <View style={styles.headerTopRow}>
            <View>
              <Text variant="caption" weight="800" color={colors.accent} style={styles.preTitle}>
                COMMUNION & PROGRESS
              </Text>
              <Text variant="h2" style={styles.title}>
                Notifications
              </Text>
            </View>

            <View style={styles.unreadCounterBadge}>
              <Text variant="caption" weight="800" color="#0F172A">
                {unreadNotificationsCount > 0 ? `${unreadNotificationsCount} UNREAD` : 'ALL READ'}
              </Text>
            </View>
          </View>

          <Text variant="caption" color={colors.textSecondary} style={styles.subtitle}>
            Daily devotions dispatched to your device and biblical study achievements unlocked in exégeomai.
          </Text>

          {/* Mark All Read Action */}
          {unreadNotificationsCount > 0 && (
            <TouchableOpacity
              style={styles.markAllReadRow}
              onPress={markAllNotificationsAsRead}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Mark all notifications as read"
            >
              <CheckDoubleSvg size={16} color={colors.accent} />
              <Text variant="caption" weight="700" color={colors.accent}>
                Mark all notifications as read
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabsRow}>
          <TouchableOpacity
            style={[styles.tabPill, activeTab === 'all' && styles.tabPillActive]}
            onPress={() => setActiveTab('all')}
            activeOpacity={0.8}
          >
            <Text
              variant="caption"
              weight={activeTab === 'all' ? '800' : '600'}
              color={activeTab === 'all' ? '#0F172A' : '#64748B'}
            >
              {`All (${notifications.length})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabPill, activeTab === 'achievements' && styles.tabPillActive]}
            onPress={() => setActiveTab('achievements')}
            activeOpacity={0.8}
          >
            <Text
              variant="caption"
              weight={activeTab === 'achievements' ? '800' : '600'}
              color={activeTab === 'achievements' ? '#0F172A' : '#64748B'}
            >
              {`Achievements (${notifications.filter((n) => n.type === 'achievement').length})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabPill, activeTab === 'scriptures' && styles.tabPillActive]}
            onPress={() => setActiveTab('scriptures')}
            activeOpacity={0.8}
          >
            <Text
              variant="caption"
              weight={activeTab === 'scriptures' ? '800' : '600'}
              color={activeTab === 'scriptures' ? '#0F172A' : '#64748B'}
            >
              {`Devotions (${notifications.filter((n) => n.type !== 'achievement').length})`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <SparklesSvg size={40} color="#94A3B8" />
            <Text variant="h3" style={styles.emptyTitle}>
              No notifications to display
            </Text>
            <Text variant="body" color={colors.textSecondary} align="center" style={styles.emptySub}>
              As daily devotions are sent and you unlock study achievements, they will be preserved here.
            </Text>
          </View>
        ) : (
          filteredNotifications.map((item) => {
            const isAchievement = item.type === 'achievement';
            return (
              <View
                key={item.id}
                style={[
                  styles.notificationItemCard,
                  !item.isRead && styles.notificationItemUnread,
                  shadow.sm,
                ]}
              >
                {/* Card Header */}
                <View style={styles.cardTopRow}>
                  <View style={styles.iconAndHeaderWrap}>
                    <View
                      style={[
                        styles.iconCircle,
                        isAchievement ? styles.achievementIconCircle : styles.scriptureIconCircle,
                      ]}
                    >
                      {isAchievement ? (
                        <AwardSvg size={18} color={colors.accent} />
                      ) : (
                        <BookOpenSvg size={16} color={colors.accent} />
                      )}
                    </View>

                    <View style={styles.headerTitleWrap}>
                      <View style={styles.badgeAndDotRow}>
                        <Text
                          variant="caption"
                          weight="800"
                          color={isAchievement ? colors.accent : colors.textTertiary}
                          style={styles.typeBadgeText}
                        >
                          {isAchievement ? 'ACHIEVEMENT' : 'DISPATCHED DEVOTION'}
                        </Text>
                        {!item.isRead && <View style={styles.unreadDot} />}
                      </View>
                      <Text variant="h3" style={[styles.itemTitle, !item.isRead && styles.itemTitleBold]}>
                        {item.title}
                      </Text>
                      {item.subtitle && (
                        <Text variant="caption" color={colors.textSecondary} style={styles.itemSubtitle}>
                          {item.subtitle}
                        </Text>
                      )}
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => deleteNotification(item.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    accessibilityRole="button"
                    accessibilityLabel="Dismiss notification"
                  >
                    <TrashSvg size={15} color="#94A3B8" />
                  </TouchableOpacity>
                </View>

                {/* Card Body */}
                <Text variant="body" color={colors.textPrimary} style={styles.itemBodyText}>
                  {item.body}
                </Text>

                {/* Scripture / Quote Reference */}
                {item.scriptureRef && (
                  <View style={styles.scriptureQuoteBox}>
                    <Text variant="caption" weight="700" color={colors.accent}>
                      {item.scriptureRef}
                    </Text>
                    {item.verseQuote && item.verseQuote !== item.body && (
                      <Text variant="caption" color={colors.textSecondary} style={styles.verseQuoteText}>
                        "{item.verseQuote}"
                      </Text>
                    )}
                  </View>
                )}

                {/* Card Action Footer */}
                <View style={styles.cardActionRow}>
                  <TouchableOpacity
                    style={styles.openDetailsBtn}
                    activeOpacity={0.8}
                    onPress={() => handleItemPress(item)}
                    accessibilityRole="button"
                    accessibilityLabel={isAchievement ? 'View achievement' : 'Open scripture'}
                  >
                    <Text variant="caption" weight="800" color="#0F172A">
                      {isAchievement ? 'View in Achievements ›' : 'Open Scripture Devotion ›'}
                    </Text>
                  </TouchableOpacity>

                  {!item.isRead && (
                    <TouchableOpacity
                      style={styles.inlineMarkReadBtn}
                      onPress={() => markNotificationAsRead(item.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      accessibilityRole="button"
                      accessibilityLabel="Mark this notification as read"
                    >
                      <Text variant="caption" weight="600" color={colors.accent}>
                        Mark read
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 96,
  },
  headerSection: {
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    marginBottom: spacing.md,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  preTitle: {
    letterSpacing: 0.8,
    marginBottom: 2,
    fontSize: 10,
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 4,
    lineHeight: 18,
  },
  unreadCounterBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  markAllReadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 4,
  },
  filterTabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  tabPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabPillActive: {
    backgroundColor: 'rgba(253, 210, 35, 0.18)',
    borderColor: colors.accent,
  },
  notificationItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  notificationItemUnread: {
    backgroundColor: 'rgba(253, 210, 35, 0.04)',
    borderColor: 'rgba(253, 210, 35, 0.28)',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconAndHeaderWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  achievementIconCircle: {
    backgroundColor: 'rgba(253, 210, 35, 0.15)',
  },
  scriptureIconCircle: {
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
  },
  headerTitleWrap: {
    flex: 1,
  },
  badgeAndDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  typeBadgeText: {
    letterSpacing: 0.5,
    fontSize: 9.5,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  itemTitle: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  itemTitleBold: {
    fontWeight: '800',
  },
  itemSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  deleteBtn: {
    padding: 4,
  },
  itemBodyText: {
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 8,
  },
  scriptureQuoteBox: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)',
    borderRadius: radius.sm,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    marginBottom: 12,
  },
  verseQuoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 17,
    marginTop: 4,
  },
  cardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.05)',
  },
  openDetailsBtn: {
    paddingVertical: 4,
  },
  inlineMarkReadBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 56,
    gap: 12,
  },
  emptyTitle: {
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 280,
  },
});
