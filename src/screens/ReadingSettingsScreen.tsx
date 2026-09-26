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
import { TypefaceSvg } from '../components/SvgIcons';
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
        {/* Header Hero Card */}
        <View style={[styles.heroCard, shadow.sm]}>
          <View style={styles.heroIconContainer}>
            <TypefaceSvg size={28} color="#0F172A" />
          </View>
          <View style={styles.heroContent}>
            <Text variant="h3" style={styles.heroTitle}>
              Reading & Typography
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.heroDescription}>
              Customize Scripture readability, typography scales, and Christological emphasis.
            </Text>
          </View>
        </View>

        {/* 1. FONT SIZE SECTION */}
        <View style={styles.sectionHeaderBox}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            FONT SCALE & SLIDER
          </Text>
        </View>

        <View style={styles.settingCard}>
          <View style={styles.rowHeader}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Reading Font Size
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Scroll 1px–24px or enter number
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

          {/* Scripture Real-Time Live Preview Box */}
          <View style={styles.previewBox}>
            <Text
              style={[
                styles.previewText,
                {
                  fontSize: currentFontSize,
                  lineHeight: Math.max(14, currentFontSize * 1.5),
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
        <View style={[styles.sectionHeaderBox, { marginTop: spacing.lg }]}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            PRIMARY READER TYPEFACE
          </Text>
        </View>

        <View style={styles.settingCard}>
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
        <View style={[styles.sectionHeaderBox, { marginTop: spacing.lg }]}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            DEVOTIONAL HIGHLIGHTS
          </Text>
        </View>

        <View style={styles.settingCard}>
          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Words of Jesus in Red
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Highlight the spoken words of Christ in red throughout Scripture
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 48,
  },
  heroCard: {
    backgroundColor: colors.surface, // 30% Panel #FFFFFF
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  heroIconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    color: colors.textPrimary,
    marginBottom: 4,
  },
  heroDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  sectionHeaderBox: {
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  sectionHeader: {
    letterSpacing: 1.2,
  },
  settingCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  rowTitleBox: {
    flex: 1,
    paddingRight: spacing.md,
  },
  rowTitle: {
    color: colors.textPrimary,
    marginBottom: 2,
  },
  fontSizeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 8,
    height: 38,
    minWidth: 58,
    justifyContent: 'center',
  },
  fontSizeInputContainerFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.surface,
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
    marginVertical: 4,
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
    backgroundColor: colors.border,
    borderRadius: 3,
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    top: -9,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 2.5,
    borderColor: colors.accent,
    marginLeft: -12,
  },
  previewBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
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
    paddingHorizontal: 12,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fontTypePillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  fontTypePillText: {
    color: colors.textPrimary,
  },
  fontTypePillTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
