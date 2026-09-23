import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  G,
  Text as SvgText,
  Polygon,
} from 'react-native-svg';
import { getTierForDays } from '../data/streakMilestones';

export interface StreakHexagonBadgeProps {
  days: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'diamond' | 'celestial';
  size?: number;
  style?: StyleProp<ViewStyle>;
}

// 60-30-10 & metallic palettes for clean 3D hexagonal shields (strictly fire-free)
// 4 Distinct Color Tiers:
// 1. Day 1 to 6: Bronze (Warm Antique Copper / Terracotta)
// 2. Day 7 to 30: Silver (Radiant Steel Platinum)
// 3. Day 30 to Month 6: Gold (Biblical Radiant Gold)
// 4. Month 6 to 1 Year: Diamond (Radiant Sapphire Azure)
const TIER_PALETTES = {
  // 1. Day 1 to 6 (Color 1 - Copper Bronze)
  bronze: {
    borderLight: '#FB923C',
    borderMid: '#EA580C',
    borderDark: '#9A3412',
    faceGradStart: '#FFEDD5',
    faceGradEnd: '#EA580C',
    surfaceGradStart: '#7C2D12',
    surfaceGradEnd: '#371004',
    accentGlaze: '#FED7AA',
    textFront: '#FFEDD5',
    textShadow: '#220802',
    insignia: '#FB923C',
  },
  // 2. Day 7 to 30 (Color 2 - Platinum Silver)
  silver: {
    borderLight: '#FFFFFF',
    borderMid: '#CBD5E1',
    borderDark: '#64748B',
    faceGradStart: '#FFFFFF',
    faceGradEnd: '#94A3B8',
    surfaceGradStart: '#334155',
    surfaceGradEnd: '#0F172A',
    accentGlaze: '#F8FAFC',
    textFront: '#FFFFFF',
    textShadow: '#020617',
    insignia: '#E2E8F0',
  },
  // 3. Day 30 to Month 6 (Color 3 - Radiant Biblical Gold)
  gold: {
    borderLight: '#FEF08A',
    borderMid: '#FACC15',
    borderDark: '#A16207',
    faceGradStart: '#FEFCE8',
    faceGradEnd: '#CA8A04',
    surfaceGradStart: '#713F12',
    surfaceGradEnd: '#2E1500',
    accentGlaze: '#FEF9C3',
    textFront: '#FEFCE8',
    textShadow: '#1A0C00',
    insignia: '#FACC15',
  },
  // 4. Month 6 to 1 Year (Color 4 - Brilliant Sapphire Diamond)
  diamond: {
    borderLight: '#E0F2FE',
    borderMid: '#38BDF8',
    borderDark: '#0284C7',
    faceGradStart: '#F0F9FF',
    faceGradEnd: '#0284C7',
    surfaceGradStart: '#075985',
    surfaceGradEnd: '#082F49',
    accentGlaze: '#BAE6FD',
    textFront: '#FFFFFF',
    textShadow: '#02101C',
    insignia: '#38BDF8',
  },
  // Compatible alias for Month 6 to 1 Year / Full Year
  celestial: {
    borderLight: '#E0F2FE',
    borderMid: '#38BDF8',
    borderDark: '#0284C7',
    faceGradStart: '#F0F9FF',
    faceGradEnd: '#0284C7',
    surfaceGradStart: '#075985',
    surfaceGradEnd: '#082F49',
    accentGlaze: '#BAE6FD',
    textFront: '#FFFFFF',
    textShadow: '#02101C',
    insignia: '#38BDF8',
  },
};

export const StreakHexagonBadge: React.FC<StreakHexagonBadgeProps> = ({
  days,
  tier,
  size = 220,
  style,
}) => {
  // Determine tier dynamically from day count if not provided
  const activeTier = tier || getTierForDays(days);
  const palette = TIER_PALETTES[activeTier] || TIER_PALETTES.bronze;

  const viewBoxWidth = 240;
  const viewBoxHeight = 260;

  // Point-top hexagonal geometry (balanced width & height, no fire)
  const outerHex = '120,24 208,76 208,184 120,236 32,184 32,76';
  const innerHex = '120,32 200,80 200,180 120,228 40,180 40,80';
  const surfaceHex = '120,40 192,84 192,176 120,220 48,176 48,84';

  const gradId = `shield_${activeTier}_${days}_${Math.round(size)}`;

  // Compact mode for small badges (size < 60) e.g. feed header and shelf
  const isCompact = size < 60;

  // Dynamic font sizing based on digits and layout mode
  const numberFontSize = isCompact
    ? (days >= 1000 ? 56 : days >= 100 ? 68 : 82)
    : (days >= 1000 ? 44 : days >= 100 ? 54 : 66);
  const numberY = isCompact
    ? (days >= 1000 ? 150 : days >= 100 ? 154 : 158)
    : (days >= 1000 ? 134 : days >= 100 ? 135 : 138);

  return (
    <View style={[styles.container, { width: size, height: (size * viewBoxHeight) / viewBoxWidth }, style]}>
      <Svg
        width={size}
        height={(size * viewBoxHeight) / viewBoxWidth}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      >
        <Defs>
          {/* Metallic Rim Reflection Gradient */}
          <LinearGradient id={`${gradId}_rim`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={palette.borderLight} stopOpacity="1" />
            <Stop offset="0.25" stopColor={palette.borderMid} stopOpacity="1" />
            <Stop offset="0.55" stopColor={palette.borderDark} stopOpacity="1" />
            <Stop offset="0.8" stopColor={palette.borderMid} stopOpacity="1" />
            <Stop offset="1" stopColor={palette.borderLight} stopOpacity="1" />
          </LinearGradient>

          {/* Recessed Shield Surface Gradient */}
          <LinearGradient id={`${gradId}_surface`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={palette.surfaceGradStart} stopOpacity="1" />
            <Stop offset="0.6" stopColor={palette.surfaceGradStart} stopOpacity="0.95" />
            <Stop offset="1" stopColor={palette.surfaceGradEnd} stopOpacity="1" />
          </LinearGradient>

          {/* 3D Number Face Gradient */}
          <LinearGradient id={`${gradId}_text`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={palette.faceGradStart} stopOpacity="1" />
            <Stop offset="0.65" stopColor={palette.faceGradEnd} stopOpacity="1" />
            <Stop offset="1" stopColor={palette.faceGradStart} stopOpacity="0.85" />
          </LinearGradient>

          {/* Specular Diagonal Sheen */}
          <LinearGradient id={`${gradId}_sheen`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.38" />
            <Stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.04" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* 1. Outer Beveled Rim */}
        <Polygon points={outerHex} fill={`url(#${gradId}_rim)`} />

        {/* 2. Chamfer Depth Border */}
        <Polygon points={innerHex} fill={palette.borderDark} opacity="0.65" />

        {/* 3. Recessed Inner Metallic Surface */}
        <Polygon points={surfaceHex} fill={`url(#${gradId}_surface)`} />

        {/* 4. Diagonal Glossy Sheen Overlay */}
        <Polygon points={surfaceHex} fill={`url(#${gradId}_sheen)`} />

        {/* 5. Sacred Top Crown Insignia */}
        <G transform="translate(120, 52)">
          <Path
            d="M0 -6 V6 M-5 -2 H5"
            stroke={palette.insignia}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </G>

        {/* 6. Extruded 3D "STREAK" Label (Top Header on Full Badges) */}
        {!isCompact && (
          <G>
            <SvgText
              x="120"
              y="82"
              fill={palette.textShadow}
              fontSize="14"
              fontWeight="900"
              letterSpacing="3"
              textAnchor="middle"
              fontFamily="System"
            >
              STREAK
            </SvgText>
            <SvgText
              x="120"
              y="80"
              fill={`url(#${gradId}_text)`}
              fontSize="14"
              fontWeight="900"
              letterSpacing="3"
              textAnchor="middle"
              fontFamily="System"
            >
              STREAK
            </SvgText>
          </G>
        )}

        {/* 7. Dynamic Extruded 3D Streak Number */}
        <G>
          {/* Deepest drop shadow */}
          <SvgText
            x="120"
            y={isCompact ? numberY + 4 : numberY + 22}
            fill={palette.textShadow}
            fontSize={numberFontSize}
            fontWeight="900"
            textAnchor="middle"
            fontFamily="System"
          >
            {days}
          </SvgText>

          {/* Mid bevel shadow */}
          <SvgText
            x="120"
            y={isCompact ? numberY + 2 : numberY + 20}
            fill={palette.borderDark}
            fontSize={numberFontSize}
            fontWeight="900"
            textAnchor="middle"
            fontFamily="System"
          >
            {days}
          </SvgText>

          {/* Front metallic face */}
          <SvgText
            x="120"
            y={isCompact ? numberY : numberY + 18}
            fill={`url(#${gradId}_text)`}
            fontSize={numberFontSize}
            fontWeight="900"
            textAnchor="middle"
            fontFamily="System"
          >
            {days}
          </SvgText>
        </G>

        {/* 8. Bottom Seal / Sacred Exegesis Wordmark Emblem (Zero Fire) */}
        <G transform="translate(120, 198)">
          <Path
            d="M-14 0 H14"
            stroke={palette.insignia}
            strokeWidth="1.5"
            opacity="0.4"
            strokeLinecap="round"
          />
          <Path
            d="M0 -3 L2 0 L0 3 L-2 0 Z"
            fill={palette.insignia}
            opacity="0.8"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
