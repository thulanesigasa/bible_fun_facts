import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  useWindowDimensions,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

export default function WelcomeScreen({ navigation }: { navigation: any }) {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const artSize = Math.min(width * 0.72, 280);

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

      {/* Paging Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.slideContainer, { width }]}>
            {/* Visual Art */}
            <View style={styles.artWrapper}>
              <Image
                source={item.image}
                style={{ width: artSize, height: artSize }}
                resizeMode="contain"
              />
            </View>

            {/* Content Area */}
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

      {/* Bottom Controls Area */}
      <View style={styles.bottomArea}>
        {currentIndex < SLIDES.length - 1 ? (
          <View style={styles.controlsRow}>
            {/* Step Progress Indicators */}
            <View style={styles.indicatorRow}>
              {SLIDES.map((_, index) => {
                const isActive = index === currentIndex;
                return (
                  <View
                    key={index}
                    style={[
                      styles.indicatorDot,
                      isActive ? styles.indicatorActive : styles.indicatorInactive,
                    ]}
                  />
                );
              })}
            </View>

            {/* Circular Forward Next Button */}
            <TouchableOpacity
              style={[styles.nextCircleBtn, shadow.md]}
              onPress={handleNext}
              activeOpacity={0.85}
            >
              <ChevronRightSvg size={22} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.finalActionsContainer}>
            {/* Step Progress Indicators */}
            <View style={[styles.indicatorRow, styles.centerIndicatorRow]}>
              {SLIDES.map((_, index) => {
                const isActive = index === currentIndex;
                return (
                  <View
                    key={index}
                    style={[
                      styles.indicatorDot,
                      isActive ? styles.indicatorActive : styles.indicatorInactive,
                    ]}
                  />
                );
              })}
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              style={[styles.getStartedBtn, shadow.md]}
              onPress={() => navigateToAuth('signup')}
              activeOpacity={0.85}
            >
              <Text variant="h3" color="#FFFFFF" weight="800" style={styles.btnText}>
                Get Started
              </Text>
              <ChevronRightSvg size={20} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>

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
          </View>
        )}
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
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl, // 32px
  },
  artWrapper: {
    marginBottom: spacing.xl, // 32px
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 26,
    lineHeight: 34,
    color: colors.textPrimary,
    marginBottom: spacing.md, // 16px
  },
  slideDescription: {
    fontSize: 15,
    lineHeight: 24,
    paddingHorizontal: spacing.sm, // 8px
  },
  bottomArea: {
    paddingHorizontal: spacing.lg, // 24px
    paddingBottom: spacing.lg, // 24px
    minHeight: 112, // Multiple of 8
    justifyContent: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  centerIndicatorRow: {
    justifyContent: 'center',
    marginBottom: spacing.md, // 16px
  },
  indicatorDot: {
    height: 6,
    borderRadius: 3,
  },
  indicatorActive: {
    width: 24,
    backgroundColor: colors.accent, // 10% amber gold (#D97706)
  },
  indicatorInactive: {
    width: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.16)',
  },
  nextCircleBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accent, // 10% accent
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalActionsContainer: {
    width: '100%',
  },
  getStartedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm, // 8px
    backgroundColor: colors.accent, // 10% accent (#D97706)
    paddingVertical: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    marginBottom: spacing.md, // 16px
  },
  btnText: {
    letterSpacing: 0.5,
  },
  signInLink: {
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
