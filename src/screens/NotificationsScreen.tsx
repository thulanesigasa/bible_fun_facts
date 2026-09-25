import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import {
  BellSvg,
  AwardSvg,
  BookOpenSvg,
  CheckDoubleSvg,
  CloseSvg,
} from '../components/SvgIcons';
import { InAppNotificationItem } from '../types/inAppNotifications';
import { parseScriptureCoordinates } from '../services/inAppNotifications';

type FilterTab = 'all' | 'scriptures' | 'achievements';

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
          index < filteredNotifications.length - 1 && styles.rowDivider,
          !item.isRead && styles.unreadRowBackground,
        ]}
        activeOpacity={0.75}
        onPress={() => handleOpenNotification(item)}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}. ${item.subtitle || ''}. Tap to open.`}
      >
        {/* Row Header: Type Badge, Delivered Time & Dismiss Button */}
        <View style={styles.rowHeader}>
          <View style={styles.headerLeftWrap}>
            {!item.isRead && <View style={styles.unreadDot} />}
            <Text
              variant="caption"
              weight="800"
              color={isAchievement ? colors.accent : colors.textTertiary}
              style={styles.typeBadgeText}
            >
              {isAchievement
                ? 'ACHIEVEMENT'
                : item.type === 'morning_word'
                ? 'MORNING WORD'
                : item.type === 'midday_affirmation'
                ? "GOD'S LOVE"
                : item.type === 'afternoon_strength'
                ? 'STRENGTH'
                : item.type === 'evening_fellowship'
                ? 'FELLOWSHIP'
                : 'PEACE'}
            </Text>
            <Text style={styles.dotSeparator}>•</Text>
            <Text variant="caption" color={colors.textTertiary} style={styles.deliveredAtText}>
              {item.deliveredAtLabel || 'Dispatched Today'}
            </Text>
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

        {/* Title / Theme */}
        <Text variant="h3" style={[styles.itemTitle, !item.isRead && styles.itemTitleBold]}>
          {item.title}
        </Text>

        {/* Verse Body Text with Sacred Dotted Underline (matching BookmarksScreen) */}
        <Text style={styles.verseBodyText}>
          {item.verseQuote ? `"${item.verseQuote.trim()}"` : item.body}
        </Text>

        {/* Context or Reflection Prompt if distinct from verse text */}
        {item.verseQuote && item.body && item.body.trim() !== item.verseQuote.trim() && (
          <Text variant="caption" color={colors.textSecondary} style={styles.contextNoteText}>
            {item.body.replace(/^"|"$/g, '').trim()}
          </Text>
        )}

        {/* Action Cue Footer */}
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
          <Text variant="caption" color={colors.textTertiary} style={styles.referenceTag}>
            {item.scriptureRef || (isAchievement ? 'Milestone' : 'Sacred Scripture')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      {/* Title & Status Row */}
      <View style={styles.headerTopRow}>
        <View>
          <Text variant="caption" weight="800" color={colors.accent} style={styles.preTitle}>
            COMMUNION & NOTIFICATIONS
          </Text>
          <Text variant="h2" style={styles.title}>
            Notifications
          </Text>
        </View>

        {unreadNotificationsCount > 0 ? (
          <View style={styles.unreadCounterBadge}>
            <Text variant="caption" weight="800" color="#0F172A">
              {`${unreadNotificationsCount} UNREAD`}
            </Text>
          </View>
        ) : (
          <View style={styles.allCaughtUpBadge}>
            <Text variant="caption" weight="700" color="#64748B">
              ALL CAUGHT UP
            </Text>
          </View>
        )}
      </View>

      <Text variant="caption" color={colors.textSecondary} style={styles.subtitle}>
        Sacred devotions dispatched to your device and biblical study achievements unlocked in exégeomai.
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
          <CheckDoubleSvg size={15} color={colors.accent} />
          <Text variant="caption" weight="700" color={colors.accent}>
            Mark all notifications as read
          </Text>
        </TouchableOpacity>
      )}

      {/* Filter Tabs (Flat Continuous Flow) */}
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
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationRow}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrap}>
              <BellSvg size={36} color={colors.accent} />
            </View>
            <Text variant="h3" style={styles.emptyTitle}>
              No Notifications Yet
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.emptyMessage}>
              Sacred devotions and study milestones dispatched to your device will be preserved here in real time.
            </Text>
            <TouchableOpacity
              style={styles.openReaderBtn}
              onPress={() => navigation.navigate('WOTD')}
              activeOpacity={0.8}
            >
              <Text variant="caption" weight="700" color="#0F172A">
                Open Bible Reader
              </Text>
            </TouchableOpacity>
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

  // Flat Continuous Page Header
  headerSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
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
  allCaughtUpBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  markAllReadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 4,
    paddingVertical: 4,
  },

  // Filter Tabs (Flat Continuous Flow)
  filterTabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.md,
    marginBottom: 6,
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

  // Continuous body row styling (no card divs)
  notificationRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  unreadRowBackground: {
    backgroundColor: 'rgba(253, 210, 35, 0.03)',
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
  typeBadgeText: {
    letterSpacing: 0.6,
    fontSize: 9.5,
  },
  dotSeparator: {
    color: '#94A3B8',
    fontSize: 10,
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
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  itemTitleBold: {
    fontWeight: '800',
  },

  // Verse quotation with sacred dotted underline (matching BookmarksScreen)
  verseBodyText: {
    fontSize: 14,
    lineHeight: 22,
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
  referenceTag: {
    fontSize: 11.5,
  },

  // Empty State (matching BookmarksScreen)
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 80,
    gap: 12,
  },
  emptyIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyMessage: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    maxWidth: 280,
  },
  openReaderBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.md,
    marginTop: 8,
  },
});
