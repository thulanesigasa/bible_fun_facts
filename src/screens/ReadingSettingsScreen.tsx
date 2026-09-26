import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  PanResponder,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { UiverseSwitch } from '../components/UiverseSwitch';

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

export default function ReadingSettingsScreen() {
  const { userProfile, updateProfile } = useUser();

  const currentFontSize = userProfile?.fontSize || 16;
  const currentFontType = userProfile?.fontType || 'system';
  const redLetter = userProfile?.redLetterEnabled ?? true;

  const [fontSizeInputText, setFontSizeInputText] = useState(currentFontSize.toString());
  const [isEditingFontSize, setIsEditingFontSize] = useState(false);
  const fontSizeInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!isEditingFontSize) {
      setFontSizeInputText(currentFontSize.toString());
    }
  }, [currentFontSize, isEditingFontSize]);

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

  const sliderWidthRef = useRef(240);
  const [, setSliderWidth] = useState(240);
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
        startXRef.current = evt.nativeEvent.locationX;
        updateFontSizeFromX(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt, gestureState) => {
        const currentX = startXRef.current + gestureState.dx;
        updateFontSizeFromX(currentX);
      },
    })
  ).current;

  const handleSelectFontType = (type: 'serif' | 'sans' | 'system' | 'mono') => {
    updateProfile({ fontType: type });
  };

  const handleToggleRedLetter = (val: boolean) => {
    updateProfile({ redLetterEnabled: val });
  };

  const selectedFamily = FONT_TYPE_OPTIONS.find((o) => o.key === currentFontType)?.fontFamily;

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Typography - Part of the Seamless Body Canvas (Zero Icons, Zero Divs) */}
        <View style={styles.headerBlock}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.title}>
            Reading & Typography
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Customize Scripture readability, typography scales, and Christological emphasis across all canon chapters.
          </Text>
        </View>

        {/* 1. FONT SCALE & SLIDER */}
        <View style={styles.sectionBlock}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            FONT SCALE & SLIDER
          </Text>

          <View style={styles.rowHeader}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Reading Font Size
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Slide 1px–24px or tap to enter exact value
              </Text>
            </View>

            {/* Numeric Input */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => fontSizeInputRef.current?.focus()}
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
              <Text
                variant="caption"
                weight="700"
                color={colors.textSecondary}
                style={styles.pxUnitLabel}
                pointerEvents="none"
              >
                px
              </Text>
            </TouchableOpacity>
          </View>

          {/* Continuous Left-to-Right Scroller Track */}
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

          {/* Scripture Real-Time Live Preview */}
          <View style={styles.previewBox}>
            <Text
              style={[
                styles.previewText,
                {
                  fontSize: currentFontSize,
                  lineHeight: Math.max(16, currentFontSize * 1.55),
                  fontFamily: selectedFamily,
                  color: redLetter ? '#DC2626' : colors.textPrimary,
                },
              ]}
            >
              “For God so loved the world, that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.”
            </Text>
            <Text variant="caption" color={colors.accent} weight="700" style={styles.previewCite}>
              John 3:16 • {currentFontSize}px {FONT_TYPE_OPTIONS.find((o) => o.key === currentFontType)?.label}
            </Text>
          </View>
        </View>

        {/* 2. TYPOGRAPHY PRESETS */}
        <View style={styles.sectionBlock}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            PRIMARY READER TYPEFACE
          </Text>

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

        {/* 3. CHRISTOLOGICAL RED-LETTER EMPHASIS */}
        <View style={[styles.sectionBlock, { borderBottomWidth: 0 }]}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            DEVOTIONAL HIGHLIGHTS
          </Text>

          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Words of Jesus in Red
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                Highlight the spoken words of Christ in red throughout all Scripture
              </Text>
            </View>
            <UiverseSwitch
              value={redLetter}
              onValueChange={handleToggleRedLetter}
              accessibilityLabel="Words of Jesus in Red switch"
            />
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
    paddingTop: spacing.lg,        // 24px
    paddingBottom: 48,
  },
  headerBlock: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionBlock: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  rowTitleBox: {
    flex: 1,
    paddingRight: spacing.md,
  },
  rowTitle: {
    color: colors.textPrimary,
    marginBottom: 3,
  },
  rowDescription: {
    fontSize: 12,
    lineHeight: 17,
  },
  fontSizeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    height: 38,
    minWidth: 58,
    justifyContent: 'center',
  },
  fontSizeInputContainerFocused: {
    borderColor: '#0F172A',
  },
  fontSizeInputField: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    paddingVertical: 0,
    minWidth: 22,
  },
  pxUnitLabel: {
    fontSize: 12,
    marginLeft: 2,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  sliderBoundLabel: {
    minWidth: 32,
    textAlign: 'center',
    fontSize: 12,
  },
  sliderTrack: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  sliderInnerTrack: {
    height: 6,
    borderRadius: 3,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderRail: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.1)',
    borderRadius: 3,
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#0F172A',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    top: -9,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: '#0F172A',
    marginLeft: -12,
  },
  previewBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  previewText: {
    marginBottom: spacing.sm,
  },
  previewCite: {
    marginTop: 4,
  },
  fontTypePillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fontTypePill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.sm,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  fontTypePillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  fontTypePillText: {
    color: colors.textPrimary,
  },
  fontTypePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
});
