import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
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
import {
  ProfileSvg,
  CameraSvg,
  FlameSvg,
  StrongsIconSvg,
  ChevronRightSvg,
} from '../components/SvgIcons';

// ============================================================================
// UIVERSE-INSPIRED ANIMATED SLIDING PILL SWITCH (BY NAMECHO)
// ============================================================================
interface UiverseSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
}

const UiverseSwitch: React.FC<UiverseSwitchProps> = ({ value, onValueChange }) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const toggle = () => {
    onValueChange(!value);
  };

  // Button width: 52px, Height: 30px, Toggle diameter: 24px, Offset: 3px
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 25],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CBD5E1', colors.accent],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={toggle}
      style={styles.switchWrapper}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      <Animated.View style={[styles.uiverseTrack, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.uiverseThumb,
            shadow.sm,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

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
    factsViewedCount,
    logout,
    updateProfile,
    uploadAvatar,
    favoritesFacts,
    favoritesScriptures,
    completedWOTDs,
    followedUserIds,
  } = useUser();

  const [isUploading, setIsUploading] = useState(false);
  const [notifications, setNotifications] = useState<boolean>(
    userProfile?.notificationsEnabled ?? true
  );

  // Reader Settings State: 1px to 24px
  const currentFontSize = userProfile?.fontSize ?? 16;
  const currentFontType = userProfile?.fontType || 'serif';
  const [fontSizeInputText, setFontSizeInputText] = useState(currentFontSize.toString());
  const [isEditingFontSize, setIsEditingFontSize] = useState(false);
  const fontSizeInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!isEditingFontSize) {
      setFontSizeInputText(currentFontSize.toString());
    }
  }, [currentFontSize, isEditingFontSize]);

  const totalSaved =
    favoritesFacts.length + favoritesScriptures.length + completedWOTDs.length;

  const handleToggleNotifications = (val: boolean) => {
    setNotifications(val);
    updateProfile({ notificationsEnabled: val });
  };

  const handleSelectFontSize = (size: number) => {
    const clamped = Math.max(1, Math.min(24, Math.round(size)));
    updateProfile({ fontSize: clamped });
    setFontSizeInputText(clamped.toString());
  };

  const handleFontSizeInputChange = (text: string) => {
    const digits = text.replace(/[^\d]/g, '');
    setFontSizeInputText(digits);
    if (digits.length > 0) {
      const num = parseInt(digits, 10);
      if (!isNaN(num)) {
        const clamped = Math.max(1, Math.min(24, num));
        updateProfile({ fontSize: clamped });
      }
    }
  };

  const handleFontSizeInputCommit = () => {
    const num = parseInt(fontSizeInputText, 10);
    if (isNaN(num) || num < 1) {
      handleSelectFontSize(1);
    } else if (num > 24) {
      handleSelectFontSize(24);
    } else {
      handleSelectFontSize(num);
    }
  };

  // Continuous Left-to-Right Pan/Touch Scroller (1px to 24px)
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const sliderWidthRef = useRef(240);
  const [sliderWidth, setSliderWidth] = useState(240);
  const startXRef = useRef(0);

  const updateFontSizeFromX = (x: number) => {
    const width = sliderWidthRef.current;
    if (width <= 0) return;
    const ratio = Math.max(0, Math.min(1, x / width));
    const size = Math.round(1 + ratio * 23); // 1px to 24px
    handleSelectFontSize(size);
  };

  const sliderPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        setScrollEnabled(false);
        startXRef.current = evt.nativeEvent.locationX;
        updateFontSizeFromX(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt, gestureState) => {
        const currentX = startXRef.current + gestureState.dx;
        updateFontSizeFromX(currentX);
      },
      onPanResponderRelease: () => {
        setScrollEnabled(true);
      },
      onPanResponderTerminate: () => {
        setScrollEnabled(true);
      },
    })
  ).current;

  const handleSelectFontType = (type: 'serif' | 'sans' | 'system' | 'mono') => {
    updateProfile({ fontType: type });
  };

  // Avatar Photo Picker
  const handlePickAvatar = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Photo Permission Needed',
          'Please allow photo library access to select a profile picture.'
        );
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
          Alert.alert(
            'Profile Photo Updated',
            'Your profile image has been compressed and updated.'
          );
        } else {
          Alert.alert('Upload Notice', uploadRes.error || 'Failed to update avatar image.');
        }
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Could not pick image.');
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
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your exégeomai account?',
      [
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
      ]
    );
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

  // Selected Font Family helper
  const selectedFamily = FONT_TYPE_OPTIONS.find(o => o.key === currentFontType)?.fontFamily;

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        scrollEnabled={scrollEnabled}
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

            <View style={styles.statColumn}>
              <View style={styles.statIconRow}>
                <FlameSvg size={14} color={colors.accent} fill={colors.accent} />
                <Text variant="h3" style={[styles.statValue, { marginLeft: 4 }]}>
                  {streak}
                </Text>
              </View>
              <Text variant="caption" color={colors.textSecondary} style={styles.statLabel}>
                Streak
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statColumn}>
              <View style={styles.statIconRow}>
                <StrongsIconSvg size={14} color={colors.accent} strokeWidth={2} />
                <Text variant="h3" style={[styles.statValue, { marginLeft: 4 }]}>
                  {factsViewedCount}
                </Text>
              </View>
              <Text variant="caption" color={colors.textSecondary} style={styles.statLabel}>
                Unfolded
              </Text>
            </View>
          </View>
        </View>

        {/* ================================================================ */}
        {/* ALL SETTINGS DIRECTLY IN THE SCREEN BODY (ZERO ENCLOSING DIVS)    */}
        {/* ================================================================ */}

        {/* 1. READING & TYPOGRAPHY SETTINGS (ZERO ICONS IN SETTINGS) */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            READING & TYPOGRAPHY
          </Text>

          {/* Font Size Row: Left-to-Right 1px-24px Scroller + Text Input Format */}
          <View style={styles.settingRowBlock}>
            <View style={styles.rowHeader}>
              <View style={styles.rowTitleBox}>
                <Text variant="h3" style={styles.rowTitle}>
                  Reading Font Size
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Scroll 1px–24px or enter number
                </Text>
              </View>

              {/* Text Input Format for Font Size */}
              <View
                style={[
                  styles.fontSizeInputContainer,
                  isEditingFontSize && styles.fontSizeInputContainerFocused,
                ]}
              >
                <TextInput
                  ref={fontSizeInputRef}
                  style={styles.fontSizeInputField}
                  value={fontSizeInputText}
                  onChangeText={handleFontSizeInputChange}
                  onFocus={() => setIsEditingFontSize(true)}
                  onBlur={() => {
                    setIsEditingFontSize(false);
                    handleFontSizeInputCommit();
                  }}
                  onSubmitEditing={() => {
                    setIsEditingFontSize(false);
                    handleFontSizeInputCommit();
                  }}
                  keyboardType="number-pad"
                  maxLength={2}
                  selectTextOnFocus
                  returnKeyType="done"
                  selectionColor={colors.accent}
                  placeholder="16"
                  placeholderTextColor={colors.textTertiary}
                />
                <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.pxUnitLabel}>
                  px
                </Text>
              </View>
            </View>

            {/* Smooth Left-to-Right Horizontal Scroller Track (1px to 24px) */}
            <View style={styles.sliderRow}>
              <Text variant="caption" weight="700" color={colors.textTertiary} style={styles.sliderBoundLabel}>
                1px
              </Text>
              <View
                style={styles.sliderTrack}
                onLayout={(e) => {
                  const w = e.nativeEvent.layout.width;
                  sliderWidthRef.current = w;
                  setSliderWidth(w);
                }}
                {...sliderPanResponder.panHandlers}
              >
                {/* Visual Track Rail, Fill, and Thumb with pointerEvents="none" */}
                <View pointerEvents="none" style={styles.sliderInnerTrack}>
                  <View style={styles.sliderRail} />
                  <View
                    style={[
                      styles.sliderFill,
                      {
                        width: `${Math.max(0, Math.min(100, ((currentFontSize - 1) / 23) * 100))}%`,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.sliderThumb,
                      shadow.sm,
                      {
                        left: `${Math.max(0, Math.min(100, ((currentFontSize - 1) / 23) * 100))}%`,
                      },
                    ]}
                  />
                </View>
              </View>
              <Text variant="caption" weight="800" color={colors.textPrimary} style={styles.sliderBoundLabel}>
                24px
              </Text>
            </View>

            {/* Real-time Scripture Preview Box */}
            <View style={styles.previewBox}>
              <Text
                style={[
                  styles.previewText,
                  {
                    fontSize: currentFontSize,
                    lineHeight: Math.max(14, currentFontSize * 1.5),
                    fontFamily: selectedFamily,
                  },
                ]}
              >
                “For God so loved the world, that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.”
              </Text>
              <Text variant="caption" color={colors.accent} weight="700" style={styles.previewCite}>
                John 3:16 • {currentFontSize}px {FONT_TYPE_OPTIONS.find(o => o.key === currentFontType)?.label}
              </Text>
            </View>
          </View>

          <View style={styles.rowDivider} />

          {/* Typography Style Row (Zero Icons) */}
          <View style={styles.settingRowBlock}>
            <View style={styles.rowHeader}>
              <View style={styles.rowTitleBox}>
                <Text variant="h3" style={styles.rowTitle}>
                  Typography Style
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Choose primary reader typeface
                </Text>
              </View>
            </View>

            <View style={styles.fontTypePillsRow}>
              {FONT_TYPE_OPTIONS.map((opt) => {
                const isSelected = currentFontType === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[
                      styles.fontTypePill,
                      isSelected && styles.fontTypePillActive,
                    ]}
                    onPress={() => handleSelectFontType(opt.key)}
                    activeOpacity={0.8}
                  >
                    <Text
                      variant="caption"
                      weight={isSelected ? '700' : '500'}
                      style={[
                        styles.fontTypePillText,
                        isSelected && styles.fontTypePillTextActive,
                        opt.fontFamily ? { fontFamily: opt.fontFamily } : undefined,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* 2. NOTIFICATIONS (ZERO ICONS) */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            NOTIFICATIONS
          </Text>

          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Daily Devotional Reminder
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Morning inspiration at 08:00 AM
              </Text>
            </View>
            <UiverseSwitch
              value={notifications}
              onValueChange={handleToggleNotifications}
            />
          </View>
        </View>

        {/* 3. SAVED CONTENT (ZERO ICONS) */}
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
        </View>

        {/* 4. LEGAL & POLICIES (ZERO ICONS) */}
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

  // Uiverse-inspired Switch (by namecho)
  switchWrapper: {
    paddingVertical: 2,
  },
  uiverseTrack: {
    width: 52,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
  },
  uiverseThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
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
