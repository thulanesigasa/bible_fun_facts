import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  useWindowDimensions,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text as RNText,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { ChevronRightSvg } from '../components/SvgIcons';

interface OnboardingSlide {
  id: string;
  title: string;
  lemma?: string;
  strongs?: string;
  description: string;
  image: any;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: 'welcome',
    title: 'Welcome to exégeomai',
    description:
      'We hope this sacred companion illuminates God’s Word in your heart. Explore the timeless treasures of Scripture with rich historical, linguistic, and ancient cultural clarity.',
    image: require('../../assets/onboarding/2.png'),
  },
  {
    id: 'meaning',
    title: 'What Does exégeomai Mean?',
    lemma: 'ἐξηγέομαι',
    strongs: "Strong's Greek 1834",
    description:
      "From ἐκ (out) and ἡγέομαι (to lead) — 'to lead out, unfold, declare, and draw out the true meaning.' Just as Christ declared the Father, exégeomai unfolds the profound depth and original intent of Sacred Scripture.",
    image: require('../../assets/onboarding/1.png'),
  },
  {
    id: 'purpose',
    title: 'Our Sacred Purpose',
    description:
      'This application was created to help you better understand the scriptures, deepen your knowledge in the glory of the Lord, and strengthen your everyday walk of faith through sound biblical exegesis.',
    image: require('../../assets/onboarding/3.png'),
  },
];

/**
 * Interactive Swipe-to-Start Button with PanResponder, focus-reset, text fade-out,
 * and animated flowing progress fill.
 */
function SwipeToStartButton({
  onComplete,
  resetTrigger,
}: {
  onComplete: () => void;
  resetTrigger?: number;
}) {
  const panX = useRef(new Animated.Value(0)).current;
  const trackWidth = 210;
  const thumbSize = 44;
  const maxDrag = trackWidth - thumbSize - 8; // ~158px travel

  // Automatically reset arrow to the left whenever screen gains focus
  useEffect(() => {
    panX.setValue(0);
  }, [resetTrigger, panX]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          const clamped = Math.min(gestureState.dx, maxDrag);
          panX.setValue(clamped);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > maxDrag * 0.55) {
          // Swipe completed successfully
          Animated.timing(panX, {
            toValue: maxDrag,
            duration: 120,
            useNativeDriver: false,
          }).start(() => {
            onComplete();
            // Reset position for when user navigates back
            setTimeout(() => panX.setValue(0), 400);
          });
        } else {
          // Snap back with gentle spring
          Animated.spring(panX, {
            toValue: 0,
            useNativeDriver: false,
            bounciness: 8,
          }).start();
        }
      },
    })
  ).current;

  // Text fades out smoothly as the arrow button slides right
  const textOpacity = panX.interpolate({
    inputRange: [0, maxDrag * 0.45],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Flowing soft amber progress fill behind the sliding thumb
  const fillWidth = panX.interpolate({
    inputRange: [0, maxDrag],
    outputRange: [thumbSize + 8, trackWidth],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.swipeTrack, shadow.sm]}>
      {/* Animated soft fill flowing behind the thumb */}
      <Animated.View
        style={[
          styles.swipeProgressFill,
          { width: fillWidth },
        ]}
      />

      {/* Swipe text that fades out cleanly during slide */}
      <Animated.View style={{ opacity: textOpacity }}>
        <Text
          variant="caption"
          weight="700"
          color={colors.textSecondary}
          style={styles.swipeTrackText}
        >
          Swipe to start  ››
        </Text>
      </Animated.View>

      {/* Draggable Arrow Thumb */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.swipeThumb,
          shadow.md,
          {
            transform: [{ translateX: panX }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            onComplete();
            panX.setValue(0);
          }}
          style={styles.swipeThumbTouchable}
        >
          <ChevronRightSvg size={20} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default function WelcomeScreen({ navigation }: { navigation: any }) {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [resetTrigger, setResetTrigger] = useState(0);

  // Reset the swipe thumb whenever WelcomeScreen comes into view
  useFocusEffect(
    useCallback(() => {
      setResetTrigger(prev => prev + 1);
    }, [])
  );

  const artSize = Math.min(width * 0.66, 260);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    if (index !== currentIndex && index >= 0 && index < SLIDES.length) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigateToAuth('signup');
    }
  };

  const navigateToAuth = (initialMode: 'login' | 'signup') => {
    navigation.navigate('Auth', { initialMode });
  };

  // Sliding tab locator interpolation across 3 stationary slots
  const pillTranslateX = scrollX.interpolate({
    inputRange: [0, width, 2 * width],
    outputRange: [0, 16, 32],
    extrapolate: 'clamp',
  });

  const pillWidth = scrollX.interpolate({
    inputRange: [0, width * 0.5, width, width * 1.5, 2 * width],
    outputRange: [22, 28, 22, 28, 22],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.brandRow}>
          <Image
            source={require('../../assets/logo-transparent.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>exégeomai</Text>
        </View>

        {currentIndex < SLIDES.length - 1 ? (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigateToAuth('signup')}
            activeOpacity={0.7}
          >
            <Text variant="label" color={colors.textSecondary} weight="700">
              Skip
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.skipPlaceholder} />
        )}
      </View>

      {/* Main Slide Content Area */}
      <View style={styles.mainContent}>
        {/* Requirement: Pure Merge / Crossfade Shared Canvas (Zero scale pop) */}
        <View style={[styles.sharedArtContainer, { height: artSize }]}>
          {SLIDES.map((slide, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={slide.id}
                pointerEvents="none"
                style={[
                  styles.sharedArtSlide,
                  { opacity },
                ]}
              >
                <Image
                  source={slide.image}
                  style={{ width: artSize, height: artSize }}
                  resizeMode="contain"
                />
              </Animated.View>
            );
          })}
        </View>

        {/* Paging Text Content */}
        <Animated.FlatList
          ref={flatListRef}
          data={SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
              listener: handleScroll,
            }
          )}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={[styles.slideTextContainer, { width }]}>
              <View style={styles.textWrapper}>
                {item.lemma && item.strongs && (
                  <View style={styles.lemmaContainer}>
                    <Text variant="h3" color={colors.accent} weight="700" style={styles.lemmaText}>
                      {item.lemma}
                    </Text>
                    <Text variant="label" color={colors.textSecondary} style={styles.strongsText}>
                      • {item.strongs}
                    </Text>
                  </View>
                )}

                <Text variant="h1" align="center" style={styles.slideTitle}>
                  {item.title}
                </Text>

                <Text
                  variant="body"
                  align="center"
                  color={colors.textSecondary}
                  style={styles.slideDescription}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Persistent Bottom Controls Area */}
      <View style={styles.bottomArea}>
        <View style={styles.controlsRow}>
          {/* Sliding Tab Locator */}
          <View style={styles.indicatorContainer}>
            {/* 3 Stationary dot slots */}
            <View style={styles.trackDotSlots}>
              {SLIDES.map((_, i) => (
                <View key={i} style={styles.indicatorTrackDot} />
              ))}
            </View>

            {/* Dynamic sliding liquid pill */}
            <Animated.View
              style={[
                styles.slidingPill,
                {
                  transform: [{ translateX: pillTranslateX }],
                  width: pillWidth,
                },
              ]}
            />
          </View>

          {/* Action button on the right */}
          {currentIndex < SLIDES.length - 1 ? (
            <TouchableOpacity
              style={[styles.nextCircleBtn, shadow.md]}
              onPress={handleNext}
              activeOpacity={0.85}
              accessibilityLabel="Next slide"
            >
              <ChevronRightSvg size={22} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          ) : (
            <SwipeToStartButton
              onComplete={() => navigateToAuth('signup')}
              resetTrigger={resetTrigger}
            />
          )}
        </View>

        {/* Secondary Link: Sign In */}
        <TouchableOpacity
          style={styles.signInLink}
          onPress={() => navigateToAuth('login')}
          activeOpacity={0.7}
        >
          <Text variant="body" color={colors.textSecondary} align="center">
            Already have an account?{' '}
            <Text variant="body" color={colors.accent} weight="700">
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>

        {/* Terms of Service & Privacy Policy Disclaimer: Uniform styling (no underline, no color change, no font change) */}
        <View style={styles.disclaimerContainer}>
          <RNText style={styles.disclaimerText}>
            By continuing, you agree to our{' '}
            <RNText
              style={styles.disclaimerText}
              onPress={() => navigation.navigate('TermsOfService')}
            >
              Terms of Service
            </RNText>{' '}
            and{' '}
            <RNText
              style={styles.disclaimerText}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              Privacy Policy
            </RNText>.
          </RNText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // 60% slate canvas (#F8FAFC)
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg, // 24px
    paddingTop: spacing.sm, // 8px
    paddingBottom: spacing.sm, // 8px
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 24,
    height: 24,
    marginRight: spacing.sm, // 8px
  },
  brandTitle: {
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: spacing.sm, // 8px
  },
  skipPlaceholder: {
    width: 48,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sharedArtContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sharedArtSlide: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideTextContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.xl, // 32px
  },
  textWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  lemmaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: spacing.sm, // 8px
  },
  lemmaText: {
    fontSize: 17,
  },
  strongsText: {
    fontSize: 12,
  },
  slideTitle: {
    fontSize: 24,
    lineHeight: 32,
    color: colors.textPrimary,
    marginBottom: spacing.sm, // 8px
  },
  slideDescription: {
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: spacing.sm, // 8px
  },
  bottomArea: {
    paddingHorizontal: spacing.lg, // 24px
    paddingBottom: spacing.lg, // 24px
    minHeight: 128,
    justifyContent: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    marginBottom: spacing.sm,
  },
  indicatorContainer: {
    width: 56,
    height: 16,
    justifyContent: 'center',
    position: 'relative',
  },
  trackDotSlots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  indicatorTrackDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(15, 23, 42, 0.16)',
  },
  slidingPill: {
    position: 'absolute',
    left: 0,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent, // 10% amber gold (#D97706)
  },
  nextCircleBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeTrack: {
    width: 210,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface, // 30% panel surface
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
  swipeProgressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(217, 119, 6, 0.12)',
    borderRadius: 26,
  },
  swipeTrackText: {
    fontSize: 12,
    letterSpacing: 0.5,
    marginLeft: 32,
  },
  swipeThumb: {
    position: 'absolute',
    left: 4,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent, // 10% amber gold
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeThumbTouchable: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInLink: {
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimerContainer: {
    marginTop: 4,
    paddingHorizontal: spacing.sm, // 8px
    alignItems: 'center',
  },
  disclaimerText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
    textDecorationLine: 'none',
  },
});
