import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Animated,
  PanResponder,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { useThemedAlert } from '../context/AlertContext';
import {
  ProfileSvg,
  CameraSvg,
  ChevronRightSvg,
  DownloadSvg,
  TrashSvg,
} from '../components/SvgIcons';
import {
  getDownloadedTranslations,
  deleteDownloadedTranslation,
  subscribeOfflineUpdates,
  DownloadedTranslationMeta,
  formatBytes,
} from '../services/bibleService';
import { UiverseSwitch } from '../components/UiverseSwitch';
import { StreakMilestoneModal } from '../components/StreakMilestoneModal';
import {
  AchievementMilestone,
  getTotalAchievementsProgress,
} from '../data/achievements';

// ============================================================================
// TYPOGRAPHY PRESETS
// ============================================================================
interface FontTypeOption {
  key: 'serif' | 'sans' | 'system' | 'mono';
  label: string;
  subtitle: string;
  fontFamily?: string;
}

const FONT_TYPE_OPTIONS: FontTypeOption[] = [
  { key: 'serif', label: 'Classical Serif', subtitle: 'Biblical Exegesis', fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' },
  { key: 'sans', label: 'Modern Sans', subtitle: 'Clean & Neutral', fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif' },
  { key: 'system', label: 'System Default', subtitle: 'Native UI Type', fontFamily: undefined },
  { key: 'mono', label: 'Monospace', subtitle: 'Concordance & Lexicon', fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace' },
];

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const {
    userProfile,
    streak,
    readFactIds,
    sharesCount,
    bibleHighlights,
    logout,
    updateProfile,
    uploadAvatar,
    favoritesFacts,
    favoritesScriptures,
    completedWOTDs,
    followedUserIds,
    toggleFavoriteScripture,
    unreadNotificationsCount,
  } = useUser();
  const { showAlert } = useThemedAlert();

  const [isUploading, setIsUploading] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState<boolean>(false);
  const [inspectedAchievement, setInspectedAchievement] =
    useState<AchievementMilestone | null>(null);

  const bookmarksCount = favoritesScriptures?.length || 0;
  const highlightsCount = Object.keys(bibleHighlights || {}).length;
  const currentSharesCount = sharesCount || 0;

  const totalProgress = getTotalAchievementsProgress({
    streak: streak || 1,
    bookmarksCount,
    highlightsCount,
    sharesCount: currentSharesCount,
  });
  const [notifications, setNotifications] = useState<boolean>(
    userProfile?.notificationsEnabled ?? true
  );

  // Offline Downloaded Bibles State
  const [downloadedTranslations, setDownloadedTranslations] = useState<DownloadedTranslationMeta[]>([]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const list = await getDownloadedTranslations();
        if (isMounted) setDownloadedTranslations(list);
      } catch (e) {
        console.warn('Failed to load downloaded bibles in profile:', e);
      }
    };
    load();
    const unsub = subscribeOfflineUpdates(() => {
      load();
    });
    return () => {
      isMounted = false;
      unsub();
    };
  }, []);

  const handleDeleteOfflineTranslation = (id: string, name: string) => {
    showAlert({
      title: 'Remove Downloaded Bible',
      message: `Are you sure you want to remove ${name} from offline storage? You can re-download it at any time.`,
      icon: 'trash',
      isDestructive: true,
      buttons: [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDownloadedTranslation(id);
              setDownloadedTranslations((prev) => prev.filter((item) => item.id !== id));
            } catch (err) {
              console.warn('Failed to remove downloaded translation:', err);
            }
          },
        },
      ],
    });
  };

  const totalSaved =
    favoritesFacts.length + favoritesScriptures.length + completedWOTDs.length;

  const handleToggleNotifications = (val: boolean) => {
    setNotifications(val);
    updateProfile({ notificationsEnabled: val });
  };

  // Avatar Photo Picker
  const handlePickAvatar = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        showAlert({
          title: 'Photo Permission Needed',
          message: 'Please allow photo library access to select a profile picture.',
          icon: 'info',
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setIsUploading(true);
        const originalUri = result.assets[0].uri;

        const manipResult = await ImageManipulator.manipulateAsync(
          originalUri,
          [{ resize: { width: 360, height: 360 } }],
          { compress: 0.75, format: ImageManipulator.SaveFormat.WEBP }
        );

        const uploadRes = await uploadAvatar(manipResult.uri);
        if (uploadRes.success) {
          showAlert({
            title: 'Profile Photo Updated',
            message: 'Your profile image has been compressed and updated.',
            icon: 'success',
          });
        } else {
          showAlert({
            title: 'Upload Notice',
            message: uploadRes.error || 'Failed to update avatar image.',
            icon: 'warning',
          });
        }
      }
    } catch (e: any) {
      showAlert({
        title: 'Error',
        message: e?.message || 'Could not pick image.',
        icon: 'warning',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // ============================================================================
  // SWIPE TO SIGN OUT GESTURE CONTROLLER
  // ============================================================================
  const swipeTrackWidth = 280;
  const thumbDiameter = 44;
  const maxDrag = swipeTrackWidth - thumbDiameter - 8; // 228px runway
  const panX = useRef(new Animated.Value(0)).current;
  const isTriggered = useRef(false);

  const resetSwipe = useCallback(() => {
    isTriggered.current = false;
    Animated.spring(panX, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [panX]);

  useFocusEffect(
    useCallback(() => {
      resetSwipe();
    }, [resetSwipe])
  );

  const triggerSignOut = () => {
    showAlert({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out of your exégeomai account? Your saved study notes, highlights, and bookmarks will remain safely stored.',
      icon: 'logout',
      isDestructive: true,
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: resetSwipe,
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (isTriggered.current) return;
        const clamped = Math.max(0, Math.min(maxDrag, gestureState.dx));
        panX.setValue(clamped);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isTriggered.current) return;
        if (gestureState.dx >= maxDrag * 0.65) {
          isTriggered.current = true;
          Animated.timing(panX, {
            toValue: maxDrag,
            duration: 150,
            useNativeDriver: true,
          }).start(() => {
            triggerSignOut();
          });
        } else {
          resetSwipe();
        }
      },
    })
  ).current;

  // Sign out text opacity fades out as thumb is dragged
  const signOutTextOpacity = panX.interpolate({
    inputRange: [0, maxDrag * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const displayName = userProfile?.name || 'Believer';
  const displayEmail = userProfile?.email || 'user@exegeomai.org';
  const displayJoined = userProfile?.joinedDate || 'September 2026';
  const followersCount = userProfile?.followersCount ?? 0;
  const followingCount = userProfile?.followingCount ?? (followedUserIds?.length || 0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* ================================================================ */}
        {/* PROFILE IDENTITY SECTION (PRESERVED HEADER - ONLY ENCLOSED CARD)   */}
        {/* ================================================================ */}
        <View style={styles.profileHeader}>
          <View style={styles.userRow}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={handlePickAvatar}
                activeOpacity={0.8}
                disabled={isUploading}
              >
                {userProfile?.avatarUrl ? (
                  <Image source={{ uri: userProfile.avatarUrl }} style={styles.avatarImage} />
                ) : (
                  <ProfileSvg size={34} color={colors.accent} strokeWidth={2} />
                )}
                {isUploading && (
                  <View style={styles.avatarLoadingOverlay}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cameraBadge, shadow.sm]}
                onPress={handlePickAvatar}
                activeOpacity={0.85}
                disabled={isUploading}
              >
                <CameraSvg size={14} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
              <Text variant="h2" style={styles.userName}>
                {displayName}
              </Text>
              {userProfile?.username ? (
                <Text variant="caption" weight="700" color={colors.accent} style={styles.userHandle}>
                  @{userProfile.username}
                </Text>
              ) : null}
              <Text variant="body" color={colors.textSecondary} style={styles.userEmail}>
                {displayEmail}
              </Text>
              <Text variant="caption" color={colors.textTertiary} style={styles.userJoined}>
                Member since {displayJoined}
              </Text>
            </View>
          </View>

          {/* Social Stats & Study Metrics Bar */}
          <View style={styles.socialStatsBar}>
            <View style={styles.statColumn}>
              <Text variant="h3" style={styles.statValue}>
                {followersCount}
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.statLabel}>
                Followers
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statColumn}>
              <Text variant="h3" style={styles.statValue}>
                {followingCount}
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.statLabel}>
                Following
              </Text>
            </View>

            <View style={styles.statDivider} />

            <TouchableOpacity
              style={styles.statColumn}
              onPress={() => {
                setInspectedAchievement(null);
                setShowStreakModal(true);
              }}
              activeOpacity={0.7}
            >
              <Text variant="h3" style={styles.statValue}>
                {streak || 1}
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.statLabel}>
                Streak
              </Text>
            </TouchableOpacity>

            <View style={styles.statDivider} />

            <TouchableOpacity
              style={styles.statColumn}
              onPress={() => navigation.navigate('Unfolded')}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`${readFactIds.length} Unfolded exegeses. Tap to view your unfolded insights.`}
            >
              <Text variant="h3" style={styles.statValue}>
                {readFactIds.length}
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.statLabel}>
                Unfolded
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================================================================ */}
        {/* STUDY ACHIEVEMENTS (DIRECT BODY ROW, ZERO ICONS, ZERO DIVS)      */}
        {/* ================================================================ */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            STUDY ACHIEVEMENTS
          </Text>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('Achievements')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={`Study Achievements. ${totalProgress.totalUnlocked} of ${totalProgress.totalAvailable} unlocked. Tap to view all categories.`}
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Study Achievements
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {`${totalProgress.totalUnlocked} of ${totalProgress.totalAvailable} milestones unlocked`}
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          {/* Daily Study Streak Row (Direct Body Row, Zero Icons, Zero Divs) */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => {
              setInspectedAchievement(null);
              setShowStreakModal(true);
            }}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={`Daily Study Streak. ${streak || 1} day streak. Tap to inspect streak milestone.`}
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Daily Study Streak
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {`${streak || 1} day active streak • Inspect milestone`}
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ================================================================ */}
        {/* ALL SETTINGS DIRECTLY IN THE SCREEN BODY (ZERO ENCLOSING DIVS)    */}
        {/* ================================================================ */}

        {/* 1. READING & TYPOGRAPHY SETTINGS */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            READING & TYPOGRAPHY
          </Text>

          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('ReadingSettings')}
            accessibilityRole="button"
            accessibilityLabel="Reading and typography settings"
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Reading & Typography
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {userProfile?.fontSize ?? 16}px • {FONT_TYPE_OPTIONS.find((o) => o.key === (userProfile?.fontType || 'serif'))?.label || 'Classic Serif'}
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 2. NOTIFICATIONS (ZERO ICONS) */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            NOTIFICATIONS
          </Text>

          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Daily Word & Devotional Reminders
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Morning Word (08:00 AM), Midday Affirmations & Evening Fellowship with Christ
              </Text>
            </View>
            <UiverseSwitch
              value={notifications}
              onValueChange={handleToggleNotifications}
            />
          </View>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Open Notification Center"
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Notification Center
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {unreadNotificationsCount > 0
                  ? `${unreadNotificationsCount} unread • Review past sent devotions`
                  : 'Review past sent devotions and unlocked achievements'}
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 3. SAVED CONTENT (ZERO ICONS, CONTINUOUS BODY) */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            SAVED CONTENT
          </Text>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('Favorites')}
            activeOpacity={0.75}
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Saved Collection
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {totalSaved} items persisted offline
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('Bookmarks')}
            activeOpacity={0.75}
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Bookmarked Verses
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {favoritesScriptures.length} {favoritesScriptures.length === 1 ? 'verse' : 'verses'} bookmarked
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 4. OFFLINE BIBLES & TRANSLATIONS */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            OFFLINE BIBLES & TRANSLATIONS
          </Text>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('DownloadedVerses')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="View downloaded Bible translations"
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Downloaded Translations
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {downloadedTranslations.length > 0
                  ? `${downloadedTranslations.length} ${downloadedTranslations.length === 1 ? 'version' : 'versions'} ready offline`
                  : 'No versions downloaded yet'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 5. PRIVACY & SAFETY */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            PRIVACY & SAFETY
          </Text>

          {/* Privacy */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('Privacy')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Privacy settings. Private study mode, scholar directory, streak visibility, and private notes."
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Privacy
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Private study mode, scholar directory, streaks & private notes
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Safety & Security */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('Security')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Safety and security settings. Inactivity lock, 4-digit PIN, and biometrics."
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Safety & Security
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Inactivity lock, 4-digit PIN & biometrics
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Pastoral Care & Crisis Lifelines */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('PastoralCare')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Pastoral Care & 24/7 Crisis Lifelines. Tap to view support lines and comforting scriptures."
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Pastoral Care & Lifelines
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                24/7 confidential helplines, SADAG, and comforting scriptures
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 6. DATA & ACCOUNT */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            DATA & ACCOUNT
          </Text>

          {/* Export Study Journal */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('ExportJournal')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Export study journal to JSON or AES-256 encrypted file"
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Export Study Journal
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Encrypted AES-256 backup or standard JSON format
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Quiet Hours */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('QuietHours')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Quiet Hours. Tap to configure sacred rest windows."
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Quiet Hours
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Automate sacred rest windows and quiet hour silence
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Device Sessions & Security Audit */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('DeviceSessions')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Device Sessions and Security Audit Log. Tap to view active devices."
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Device Sessions & Security Audit
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Active hardware sessions and security event trail
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Delete Account & Purge Data */}
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('DeleteAccount')}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Delete account and purge all data"
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={[styles.rowTitle, { color: '#0F172A' }]}>
                Delete Account & Purge Data
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Permanently erase your account, preferences, and all local study data
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 6. LEGAL & POLICIES (ZERO ICONS) */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            LEGAL & POLICIES
          </Text>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('PrivacyPolicy')}
            activeOpacity={0.75}
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Privacy Policy
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Zero ad-trackers & encrypted persistence
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('TermsOfService')}
            activeOpacity={0.75}
          >
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Terms of Service
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Theological integrity & terms of usage
              </Text>
            </View>
            <Text style={styles.rowDisclosureArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 5. ACCOUNT (SWIPE TO SIGN OUT - SAME COLOR AS SWIPE TO SIGN IN, NO RED) */}
        <View style={[styles.bodySection, { borderBottomWidth: 0 }]}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            ACCOUNT
          </Text>

          <View style={styles.swipeSignOutContainer}>
            <View style={[styles.swipeTrack, shadow.sm]}>
              {/* Flowing Soft Amber Drag Trail Fill */}
              <Animated.View
                style={[
                  styles.swipeProgressFill,
                  {
                    width: panX.interpolate({
                      inputRange: [0, maxDrag],
                      outputRange: [thumbDiameter + 8, swipeTrackWidth],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              />

              {/* Centered Track Label */}
              <Animated.View
                style={[
                  styles.swipeTextWrapper,
                  {
                    opacity: signOutTextOpacity,
                  },
                ]}
              >
                <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.swipeSignOutText}>
                  {'Swipe to Sign Out  ››'}
                </Text>
              </Animated.View>

              {/* Draggable Amber Thumb Button (Matching WelcomeScreen Swipe to Start) */}
              <Animated.View
                style={[
                  styles.swipeThumb,
                  shadow.sm,
                  {
                    transform: [{ translateX: panX }],
                  },
                ]}
                {...panResponder.panHandlers}
              >
                <ChevronRightSvg size={20} color="#FFFFFF" strokeWidth={2.5} />
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Streak Milestone Modal */}
      <StreakMilestoneModal
        visible={showStreakModal}
        streak={streak || 1}
        achievement={inspectedAchievement}
        onClose={() => {
          setShowStreakModal(false);
          setInspectedAchievement(null);
        }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // 60% Dominant Canvas #F8FAFC
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.md, // 16px
    paddingTop: spacing.md,        // 16px
    paddingBottom: 96,             // Clearance for 50px pill bottom tab bar
  },

  // Profile Identity Header (Only enclosed top section, per user spec)
  profileHeader: {
    backgroundColor: colors.surface, // 30% Panel #FFFFFF
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    width: 64,
    height: 64,
    marginRight: spacing.md,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(253, 210, 35, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: colors.textPrimary,
  },
  userHandle: {
    fontSize: 13,
    marginTop: 1,
  },
  userEmail: {
    fontSize: 13,
    marginTop: 2,
  },
  userJoined: {
    fontSize: 11,
    marginTop: 3,
  },

  // Integrated Social Stats Bar
  socialStatsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: 4,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    marginTop: 1,
  },
  statIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },

  // Direct Body Sections (Zero enclosing divs/cards)
  bodySection: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.08)',
  },
  sectionHeader: {
    fontSize: 10.5,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  sectionSubHeader: {
    fontSize: 11,
    marginBottom: 12,
    marginTop: -4,
  },

  // Settings Rows (Clean Minimalist Typography - Zero Icons)
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  rowTitleBox: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  rowDisclosureArrow: {
    fontSize: 22,
    fontWeight: '300',
    color: colors.textTertiary,
    marginLeft: spacing.sm,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: 6,
  },
  offlineTranslationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  deleteTranslationBtn: {
    padding: 8,
    borderRadius: 8,
  },
  settingRowBlock: {
    paddingVertical: 4,
  },

  // Font Size Scroller & Text Input Format Field
  fontSizeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface, // Pure white 30% surface
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 23, 42, 0.16)', // Clear native input border
    paddingHorizontal: 10,
    height: 38,
    minWidth: 64,
  },
  fontSizeInputContainerFocused: {
    borderColor: colors.accent, // Amber focus ring
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  fontSizeInputField: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    padding: 0,
    minWidth: 22,
    textAlign: 'center',
    marginRight: 2,
  },
  pxUnitLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: 2,
  },
  sliderBoundLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    width: 32,
    textAlign: 'center',
  },
  sliderTrack: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    position: 'relative',
    marginHorizontal: 4,
  },
  sliderInnerTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  sliderRail: {
    height: 6,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    height: 6,
    top: 15,
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.surface,
    marginLeft: -11,
    top: 7,
  },

  // Live Scripture Preview
  previewBox: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  previewText: {
    color: colors.textPrimary,
  },
  previewCite: {
    marginTop: 4,
  },

  // Typography Style Pills
  fontTypePillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: spacing.sm,
  },
  fontTypePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fontTypePillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  fontTypePillText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  fontTypePillTextActive: {
    color: '#FFFFFF',
  },

  // Swipe to Sign Out (Identical styling to WelcomeScreen Swipe to Start, Zero Red)
  swipeSignOutContainer: {
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  swipeTrack: {
    width: 280,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface, // 30% panel surface #FFFFFF
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  swipeProgressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(253, 210, 35, 0.12)', // Soft amber progress fill
    borderRadius: 26,
  },
  swipeTextWrapper: {
    position: 'absolute',
    left: 48,
    right: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeSignOutText: {
    fontSize: 12.5,
    letterSpacing: 0.5,
  },
  swipeThumb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent, // Biblical brand logo yellow (#FDD223)
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
});
