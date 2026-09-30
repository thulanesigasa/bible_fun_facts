import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  PanResponder,
  useWindowDimensions,
  Alert,
  Modal,
  Platform,
  SectionList,
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
  HeartSvg,
  UsersSvg,
  MoonSvg,
  SparklesSvg,
  ChevronLeftSvg,
  TuneSvg,
  QuoteSvg,
  CheckSvg,
  WotdSvg,
} from '../components/SvgIcons';
import { InAppNotificationItem } from '../types/inAppNotifications';
import { parseScriptureCoordinates } from '../services/inAppNotifications';

interface NotificationsScreenProps {
  navigation: any;
}

type TabKey = 'all' | 'devotions' | 'milestones' | 'unread';

interface NotificationVisualConfig {
  authorName: string;
  actionText: string;
  metaText: string;
  quoteSnippet?: string;
  avatarBg: string;
  badgeType: 'heart' | 'book' | 'award' | 'quote' | 'sparkles' | 'user';
  thumbnailBg: string;
  thumbnailIcon: 'heart' | 'book' | 'award' | 'quote' | 'sparkles';
  actionButtonLabel?: string;
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

function getSectionCategory(isoString?: string): 'Today' | 'This Week' | 'Earlier' {
  if (!isoString) return 'Today';
  try {
    const now = new Date();
    const d = new Date(isoString);

    const isToday =
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate();

    if (isToday) return 'Today';

    const diffMs = now.getTime() - d.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays <= 7) return 'This Week';
    return 'Earlier';
  } catch {
    return 'Today';
  }
}

function getNotificationVisuals(item: InAppNotificationItem): NotificationVisualConfig {
  const isAchievement = item.type === 'achievement';
  const relativeTime = getRelativeTime(item.createdAt);

  if (isAchievement) {
    const milestoneTitle = item.title.replace(/^Milestone Unlocked:\s*/, '');
    return {
      authorName: milestoneTitle,
      actionText: 'Unlocked a sacred milestone',
      metaText: `Achievement · ${relativeTime}`,
      quoteSnippet: item.body || item.verseQuote,
      avatarBg: '#FEF9C3',
      badgeType: 'award',
      thumbnailBg: '#FEF9C3',
      thumbnailIcon: 'award',
      actionButtonLabel: 'View in Achievements ›',
    };
  }

  if (item.type === 'midday_affirmation') {
    const titleSnippet = item.title.replace(/^God's Love:\s*/, '');
    return {
      authorName: 'Divine Love',
      actionText: titleSnippet ? `Affirmation: ${titleSnippet}` : 'Affirmation of Divine Grace',
      metaText: `${item.scriptureRef || 'Sacred Truth'} · ${relativeTime}`,
      quoteSnippet: item.body?.replace(/^"|"$/g, '').trim(),
      avatarBg: '#FFF1F2',
      badgeType: 'heart',
      thumbnailBg: '#FEE2E2',
      thumbnailIcon: 'heart',
      actionButtonLabel: 'Open in Reader ›',
    };
  }

  if (item.type === 'morning_word') {
    const titleSnippet = item.title.replace(/^Morning Word:\s*/, '');
    return {
      authorName: 'Morning Word',
      actionText: titleSnippet ? `Devotion: ${titleSnippet}` : 'Morning Scripture Devotion',
      metaText: `${item.scriptureRef || 'Sacred Scripture'} · ${relativeTime}`,
      quoteSnippet: item.verseQuote || item.body?.replace(/^"|"$/g, '').trim(),
      avatarBg: '#FEF3C7',
      badgeType: 'book',
      thumbnailBg: '#FEF9C3',
      thumbnailIcon: 'book',
      actionButtonLabel: 'Open in Reader ›',
    };
  }

  if (item.type === 'evening_fellowship') {
    const titleSnippet = item.title.replace(/^Fellowship with Christ:\s*/, '');
    return {
      authorName: 'Evening Fellowship',
      actionText: titleSnippet ? `Reflection: ${titleSnippet}` : 'Devotional Reflection',
      metaText: `${item.scriptureRef || 'Fellowship'} · ${relativeTime}`,
      quoteSnippet: item.body?.replace(/^"|"$/g, '').trim(),
      avatarBg: '#EDE9FE',
      badgeType: 'quote',
      thumbnailBg: '#EDE9FE',
      thumbnailIcon: 'quote',
      actionButtonLabel: 'Open in Reader ›',
    };
  }

  if (item.type === 'nightly_peace') {
    const titleSnippet = item.title.replace(/^Nightly Peace:\s*/, '');
    return {
      authorName: 'Nightly Peace',
      actionText: titleSnippet ? `Rest: ${titleSnippet}` : 'Nightly Sacred Scripture',
      metaText: `${item.scriptureRef || 'Peace'} · ${relativeTime}`,
      quoteSnippet: item.verseQuote || item.body?.replace(/^"|"$/g, '').trim(),
      avatarBg: '#E0F2FE',
      badgeType: 'book',
      thumbnailBg: '#E0F2FE',
      thumbnailIcon: 'book',
      actionButtonLabel: 'Open in Reader ›',
    };
  }

  return {
    authorName: item.title,
    actionText: 'Daily Scripture Insight',
    metaText: `${item.scriptureRef || 'Daily Word'} · ${relativeTime}`,
    quoteSnippet: item.verseQuote || item.body?.replace(/^"|"$/g, '').trim(),
    avatarBg: '#F1F5F9',
    badgeType: 'sparkles',
    thumbnailBg: '#F1F5F9',
    thumbnailIcon: 'sparkles',
    actionButtonLabel: 'Open in Reader ›',
  };
}

interface SwipeableNotificationRowProps {
  item: InAppNotificationItem;
  onPress: (item: InAppNotificationItem) => void;
  onDismiss: (id: string) => void;
}

function SwipeableNotificationRow({
  item,
  onPress,
  onDismiss,
}: SwipeableNotificationRowProps) {
  const { width: screenWidth } = useWindowDimensions();
  const translateX = useRef(new Animated.Value(0)).current;
  const rowOpacity = useRef(new Animated.Value(1)).current;
  const visuals = useMemo(() => getNotificationVisuals(item), [item]);

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

  const renderBadgeIcon = (type: NotificationVisualConfig['badgeType']) => {
    switch (type) {
      case 'heart':
        return <HeartSvg size={10} color="#E11D48" fill="#E11D48" />;
      case 'award':
        return <AwardSvg size={10} color="#D97706" />;
      case 'quote':
        return <QuoteSvg size={10} color="#7C3AED" />;
      case 'user':
        return <UsersSvg size={10} color="#2563EB" />;
      case 'book':
      default:
        return <BookOpenSvg size={10} color="#2563EB" />;
    }
  };

  const renderAvatarIcon = (type: NotificationVisualConfig['badgeType']) => {
    switch (type) {
      case 'heart':
        return <HeartSvg size={20} color="#E11D48" fill="#FFE4E6" />;
      case 'award':
        return <AwardSvg size={22} color="#D97706" />;
      case 'quote':
        return <QuoteSvg size={19} color="#7C3AED" />;
      case 'user':
        return <UsersSvg size={20} color="#2563EB" />;
      case 'book':
      default:
        return <BookOpenSvg size={20} color="#2563EB" />;
    }
  };

  const renderThumbnailIcon = (type: NotificationVisualConfig['thumbnailIcon']) => {
    switch (type) {
      case 'heart':
        return <HeartSvg size={18} color="#E11D48" fill="#E11D48" />;
      case 'award':
        return <AwardSvg size={18} color="#D97706" />;
      case 'quote':
        return <QuoteSvg size={16} color="#7C3AED" />;
      case 'sparkles':
        return <SparklesSvg size={18} color="#2563EB" />;
      case 'book':
      default:
        return <BookOpenSvg size={18} color="#2563EB" />;
    }
  };

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
          styles.rowContainer,
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
          accessibilityLabel={`${visuals.authorName} ${visuals.actionText}. ${visuals.metaText}`}
        >
          {/* Left Unread Indicator Dot (Image 1 style) */}
          <View style={styles.unreadDotCol}>
            {!item.isRead ? <View style={styles.unreadDot} /> : <View style={styles.unreadDotPlaceholder} />}
          </View>

          {/* Avatar with Overlay Action Badge (Image 1 style) */}
          <View style={styles.avatarWrapper}>
            <View style={[styles.avatarCircle, { backgroundColor: visuals.avatarBg }]}>
              {renderAvatarIcon(visuals.badgeType)}
            </View>
            <View style={styles.avatarBadgeCircle}>
              {renderBadgeIcon(visuals.badgeType)}
            </View>
          </View>

          {/* Main Text Content Column */}
          <View style={styles.contentCol}>
            {/* Title & Action Line */}
            <View style={styles.titleLine}>
              <Text style={styles.titleText} numberOfLines={2}>
                <Text style={styles.authorBold}>{visuals.authorName} </Text>
                <Text style={styles.actionNormal}>{visuals.actionText}</Text>
              </Text>
            </View>

            {/* Subtitle / Timestamp */}
            <Text variant="caption" color={colors.textSecondary} style={styles.metaText}>
              {visuals.metaText}
            </Text>

            {/* Inset Quote / Comment Bubble (Image 2 style) */}
            {visuals.quoteSnippet ? (
              <View style={styles.insetCard}>
                <Text style={styles.insetText} numberOfLines={3}>
                  "{visuals.quoteSnippet}"
                </Text>
              </View>
            ) : null}

            {/* Action Buttons Row (Image 2 style) */}
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
                accessibilityLabel={visuals.actionButtonLabel || 'Accept'}
              >
                <Text variant="caption" weight="700" color="#FFFFFF" style={styles.primaryBtnLabel}>
                  {visuals.actionButtonLabel ? visuals.actionButtonLabel.replace(/\s*›\s*$/, '') : 'Accept'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right Thumbnail Preview Card (Image 1 style) */}
          <View style={[styles.thumbnailCard, { backgroundColor: visuals.thumbnailBg }]}>
            {renderThumbnailIcon(visuals.thumbnailIcon)}
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
    clearAllReadNotifications,
  } = useUser();

  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: notifications.length,
      devotions: notifications.filter((n) => n.type !== 'achievement').length,
      milestones: notifications.filter((n) => n.type === 'achievement').length,
      unread: notifications.filter((n) => !n.isRead).length,
    };
  }, [notifications]);

  // Filtered items based on active tab
  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case 'devotions':
        return notifications.filter((n) => n.type !== 'achievement');
      case 'milestones':
        return notifications.filter((n) => n.type === 'achievement');
      case 'unread':
        return notifications.filter((n) => !n.isRead);
      case 'all':
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  // Group notifications into temporal sections (Image 1 style: Today, This Week, Earlier)
  const groupedSections = useMemo(() => {
    const todayItems: InAppNotificationItem[] = [];
    const thisWeekItems: InAppNotificationItem[] = [];
    const earlierItems: InAppNotificationItem[] = [];

    filteredNotifications.forEach((item) => {
      const category = getSectionCategory(item.createdAt);
      if (category === 'Today') {
        todayItems.push(item);
      } else if (category === 'This Week') {
        thisWeekItems.push(item);
      } else {
        earlierItems.push(item);
      }
    });

    const sections: { title: string; data: InAppNotificationItem[] }[] = [];
    if (todayItems.length > 0) sections.push({ title: 'Today', data: todayItems });
    if (thisWeekItems.length > 0) sections.push({ title: 'This Week', data: thisWeekItems });
    if (earlierItems.length > 0) sections.push({ title: 'Earlier', data: earlierItems });

    return sections;
  }, [filteredNotifications]);

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
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications from your tray?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearAllNotifications();
            setShowFilterModal(false);
          },
        },
      ]
    );
  };

  const handleClearReadConfirm = () => {
    clearAllReadNotifications();
    setShowFilterModal(false);
  };

  const canGoBack = navigation?.canGoBack ? navigation.canGoBack() : false;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar (Fused Image 1 & Image 2) */}
      <View style={styles.headerContainer}>
        <View style={styles.topBarRow}>
          <View style={styles.topBarLeft}>
            {canGoBack && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <ChevronLeftSvg size={20} color="#0F172A" />
              </TouchableOpacity>
            )}
            <Text variant="h1" style={styles.screenTitle}>
              Notifications
            </Text>
          </View>

          <View style={styles.topBarRight}>
            {counts.unread > 0 && (
              <TouchableOpacity
                onPress={markAllNotificationsAsRead}
                style={styles.markAllReadBtn}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Mark all as read"
              >
                <CheckDoubleSvg size={14} color="#2563EB" />
                <Text variant="caption" weight="700" color="#2563EB" style={styles.markAllReadText}>
                  Mark all as read
                </Text>
              </TouchableOpacity>
            )}

            {/* Filter / Tune circular button (Image 1) */}
            <TouchableOpacity
              onPress={() => setShowFilterModal(true)}
              style={styles.tuneCircleBtn}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel="Filter notifications"
            >
              <TuneSvg size={18} color="#2563EB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Subtitle with dynamic unread count (Image 1) */}
        <Text style={styles.screenSubtitle}>
          {counts.unread > 0 ? (
            <>
              You have{' '}
              <Text weight="800" color="#2563EB" style={styles.unreadCountHighlight}>
                {counts.unread} {counts.unread === 1 ? 'Notification' : 'Notifications'}
              </Text>{' '}
              today.
            </>
          ) : (
            "You're all caught up today."
          )}
        </Text>

        {/* Filter Tabs Bar (Image 2) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
          style={styles.tabsScrollView}
        >
          <TouchableOpacity
            style={[styles.tabPill, activeTab === 'all' && styles.tabPillActive]}
            onPress={() => setActiveTab('all')}
            activeOpacity={0.75}
          >
            <Text style={[styles.tabPillText, activeTab === 'all' && styles.tabPillTextActive]}>
              View all
            </Text>
            <View style={[styles.tabBadge, activeTab === 'all' && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === 'all' && styles.tabBadgeTextActive]}>
                {counts.all}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabPill, activeTab === 'devotions' && styles.tabPillActive]}
            onPress={() => setActiveTab('devotions')}
            activeOpacity={0.75}
          >
            <Text style={[styles.tabPillText, activeTab === 'devotions' && styles.tabPillTextActive]}>
              Devotions
            </Text>
            <View style={[styles.tabBadge, activeTab === 'devotions' && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === 'devotions' && styles.tabBadgeTextActive]}>
                {counts.devotions}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabPill, activeTab === 'milestones' && styles.tabPillActive]}
            onPress={() => setActiveTab('milestones')}
            activeOpacity={0.75}
          >
            <Text style={[styles.tabPillText, activeTab === 'milestones' && styles.tabPillTextActive]}>
              Milestones
            </Text>
            <View style={[styles.tabBadge, activeTab === 'milestones' && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === 'milestones' && styles.tabBadgeTextActive]}>
                {counts.milestones}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabPill, activeTab === 'unread' && styles.tabPillActive]}
            onPress={() => setActiveTab('unread')}
            activeOpacity={0.75}
          >
            <Text style={[styles.tabPillText, activeTab === 'unread' && styles.tabPillTextActive]}>
              Unread
            </Text>
            <View style={[styles.tabBadge, activeTab === 'unread' && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === 'unread' && styles.tabBadgeTextActive]}>
                {counts.unread}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Main SectionList with Grouped Sections (Image 1 style) */}
      <SectionList
        sections={groupedSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SwipeableNotificationRow
            item={item}
            onPress={handleOpenNotification}
            onDismiss={deleteNotification}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderWrap}>
            <Text style={styles.sectionHeaderTitle}>{title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <SparklesSvg size={36} color="#94A3B8" />
            <Text variant="h3" style={styles.emptyTitle}>
              {activeTab === 'unread'
                ? 'All Caught Up'
                : activeTab === 'milestones'
                ? 'No Milestones Yet'
                : 'Notification Tray Clear'}
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.emptyMessage}>
              {activeTab === 'unread'
                ? 'You have read all scheduled devotions and unlocked milestones.'
                : 'Sacred daily devotions and study achievements will appear here.'}
            </Text>
            {activeTab !== 'all' && (
              <TouchableOpacity
                style={styles.viewAllResetBtn}
                onPress={() => setActiveTab('all')}
                activeOpacity={0.8}
              >
                <Text variant="caption" weight="700" color="#2563EB">
                  View All Notifications
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* Quick Settings / Filter Modal triggered by Tune button */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text variant="h3" style={styles.modalTitle}>
                Notification Options
              </Text>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setShowFilterModal(false)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <CloseSvg size={16} color="#64748B" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalOptionRow}
              onPress={() => {
                markAllNotificationsAsRead();
                setShowFilterModal(false);
              }}
              activeOpacity={0.7}
            >
              <CheckDoubleSvg size={18} color="#2563EB" />
              <View style={styles.modalOptionTextWrap}>
                <Text style={styles.modalOptionTitle}>Mark all as read</Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Clear all unread notification badges
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOptionRow}
              onPress={handleClearReadConfirm}
              activeOpacity={0.7}
            >
              <CheckSvg size={18} color="#16A34A" />
              <View style={styles.modalOptionTextWrap}>
                <Text style={styles.modalOptionTitle}>Clear read items</Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Remove all already-read notifications from tray
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOptionRow, styles.modalOptionRowDestructive]}
              onPress={handleClearAllConfirm}
              activeOpacity={0.7}
            >
              <TrashSvg size={18} color="#DC2626" />
              <View style={styles.modalOptionTextWrap}>
                <Text style={[styles.modalOptionTitle, { color: '#DC2626' }]}>
                  Clear entire tray
                </Text>
                <Text variant="caption" color="#EF4444">
                  Dismiss all notifications
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Top Header Area
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 14 : 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  topBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.6,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  markAllReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(37, 99, 235, 0.07)',
  },
  markAllReadText: {
    fontSize: 12,
  },
  tuneCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.12)',
  },
  screenSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 12,
  },
  unreadCountHighlight: {
    color: '#2563EB',
  },

  // Filter Tabs Pill Bar (Image 2)
  tabsScrollView: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  tabsScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 4,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabPillActive: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(15, 23, 42, 0.08)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  tabPillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  tabPillTextActive: {
    fontWeight: '700',
    color: '#0F172A',
  },
  tabBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  tabBadgeActive: {
    backgroundColor: '#F1F5F9',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  tabBadgeTextActive: {
    color: '#0F172A',
  },

  // Main List & Section Headers
  listContent: {
    paddingBottom: 110,
  },
  sectionHeaderWrap: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
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

  // Foreground Notification Row
  rowContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  rowTouchArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  // Unread Dot Column (Image 1 style)
  unreadDotCol: {
    width: 14,
    alignItems: 'flex-start',
    paddingTop: 16,
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

  // Avatar + Corner Badge (Image 1 style)
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  avatarBadgeCircle: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Content Column
  contentCol: {
    flex: 1,
    marginRight: 10,
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  titleText: {
    fontSize: 13.5,
    lineHeight: 18,
  },
  authorBold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  actionNormal: {
    fontWeight: '400',
    color: '#475569',
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  // Inset Quote Bubble (Image 2 style)
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

  // Action Buttons Row (Image 2 style)
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

  // Right Side Thumbnail Preview Card (Image 1 style)
  thumbnailCard: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.05)',
  },

  // Empty State
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
  viewAllResetBtn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
  },

  // Filter / Options Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
    gap: 12,
  },
  modalOptionRowDestructive: {
    borderBottomWidth: 0,
    marginTop: 4,
  },
  modalOptionTextWrap: {
    flex: 1,
  },
  modalOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
});
