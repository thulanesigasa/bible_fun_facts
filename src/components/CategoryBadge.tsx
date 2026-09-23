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
import {
  AchievementCategory,
  AchievementShape,
  AchievementTier,
} from '../data/achievements';
import { getTierForDays } from '../data/streakMilestones';

export interface CategoryBadgeProps {
  category?: AchievementCategory;
  shape?: AchievementShape;
  days?: number; // Target count or days
  tier?: AchievementTier;
  size?: number;
  style?: StyleProp<ViewStyle>;
  showText?: boolean;
  label?: string;
}

// 4 Distinct Yellow/Amber Tonal Palettes strictly respecting Rule 1 (60-30-10 & yellow primary):
const PALETTES_BY_CATEGORY = {
  // 1. Streak: Deep Amber / Biblical Gold
  streak: {
    borderLight: '#FEF9C3',
    borderMid: '#FDD223',
    borderDark: '#B45309',
    faceGradStart: '#FFFBEB',
    faceGradEnd: '#FDD223',
    surfaceGradStart: '#78350F',
    surfaceGradEnd: '#331201',
    accentGlaze: '#FEF3C7',
    textFront: '#FFFBEB',
    textShadow: '#1C0A00',
    insignia: '#FDD223',
  },
  // 2. Bookmark: Warm Bronze / Cinnamon Amber Gold
  bookmark: {
    borderLight: '#FEF08A',
    borderMid: '#EAB308',
    borderDark: '#92400E',
    faceGradStart: '#FEFCE8',
    faceGradEnd: '#EAB308',
    surfaceGradStart: '#713F12',
    surfaceGradEnd: '#291400',
    accentGlaze: '#FEF9C3',
    textFront: '#FEFCE8',
    textShadow: '#1A0C00',
    insignia: '#EAB308',
  },
  // 3. Highlight: Radiant Sunlight Yellow / Lemon Gold
  highlight: {
    borderLight: '#FEFCE8',
    borderMid: '#FACC15',
    borderDark: '#854D0E',
    faceGradStart: '#FEFCE8',
    faceGradEnd: '#CA8A04',
    surfaceGradStart: '#68370B',
    surfaceGradEnd: '#2B1400',
    accentGlaze: '#FEF9C3',
    textFront: '#FEFCE8',
    textShadow: '#1A0C00',
    insignia: '#FACC15',
  },
  // 4. Share: Sunset Golden Ochre / Wheat Amber
  share: {
    borderLight: '#FEF3C7',
    borderMid: '#D97706',
    borderDark: '#78350F',
    faceGradStart: '#FEF3C7',
    faceGradEnd: '#B45309',
    surfaceGradStart: '#502004',
    surfaceGradEnd: '#1C0A00',
    accentGlaze: '#FDE68A',
    textFront: '#FEF3C7',
    textShadow: '#0D0500',
    insignia: '#D97706',
  },
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category = 'streak',
  shape,
  days = 1,
  tier,
  size = 64,
  style,
  showText = true,
  label,
}) => {
  const activeShape: AchievementShape =
    shape ||
    (category === 'bookmark'
      ? 'ribbon'
      : category === 'highlight'
      ? 'diamond'
      : category === 'share'
      ? 'star'
      : 'hexagon');

  const palette = PALETTES_BY_CATEGORY[category] || PALETTES_BY_CATEGORY.streak;

  const viewBoxWidth = 240;
  const viewBoxHeight = 260;

  const gradId = `badge_${category}_${activeShape}_${days}_${Math.round(size)}`;
  const isCompact = size < 70;

  // Dynamic font sizing
  const numberFontSize = isCompact
    ? (days >= 100 ? 68 : days >= 10 ? 78 : 90)
    : (days >= 1000 ? 44 : days >= 100 ? 54 : 68);
  const numberY = isCompact
    ? (days >= 100 ? 152 : 158)
    : (days >= 100 ? 142 : 148);

  const displayLabel = label || category.toUpperCase();

  // Geometric coordinates for each category shape
  const renderGeometry = () => {
    switch (activeShape) {
      case 'ribbon': {
        // Bookmark Ribbon / Pennant with notched V bottom
        const outerRibbon = '40,24 200,24 200,232 120,192 40,232';
        const innerRibbon = '48,32 192,32 192,220 120,184 48,220';
        const surfaceRibbon = '56,40 184,40 184,210 120,178 56,210';
        return (
          <>
            <Polygon points={outerRibbon} fill={`url(#${gradId}_rim)`} />
            <Polygon points={innerRibbon} fill={palette.borderDark} opacity="0.65" />
            <Polygon points={surfaceRibbon} fill={`url(#${gradId}_surface)`} />
            <Polygon points={surfaceRibbon} fill={`url(#${gradId}_sheen)`} />
            {/* Ribbon header bar */}
            <G transform="translate(120, 52)">
              <Path
                d="M-30 0 H30"
                stroke={palette.insignia}
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </G>
          </>
        );
      }

      case 'diamond': {
        // Faceted Octagonal Gem / Diamond
        const outerGem = '76,20 164,20 220,76 220,164 164,220 76,220 20,164 20,76';
        const innerGem = '82,28 158,28 212,82 212,158 158,212 82,212 28,158 28,82';
        const surfaceGem = '90,38 150,38 202,90 202,150 150,202 90,202 38,150 38,90';
        return (
          <>
            <Polygon points={outerGem} fill={`url(#${gradId}_rim)`} />
            <Polygon points={innerGem} fill={palette.borderDark} opacity="0.65" />
            <Polygon points={surfaceGem} fill={`url(#${gradId}_surface)`} />
            <Polygon points={surfaceGem} fill={`url(#${gradId}_sheen)`} />
            {/* Diamond facet emblem */}
            <G transform="translate(120, 50)">
              <Path
                d="M-12 -6 L0 6 L12 -6 M0 -8 V8"
                stroke={palette.insignia}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </G>
          </>
        );
      }

      case 'star': {
        // 8-Point Compass Star / Heraldic Seal
        const outerStar =
          '120,16 142,66 196,40 174,94 228,116 174,138 196,192 142,166 120,216 98,166 44,192 66,138 12,116 66,94 44,40 98,66';
        const innerStar =
          '120,28 138,72 184,50 166,98 212,116 166,134 184,182 138,160 120,204 102,160 56,182 74,134 28,116 74,98 56,50 102,72';
        const surfaceStar =
          '120,40 134,78 172,60 158,102 196,116 158,130 172,172 134,154 120,192 106,154 68,172 82,130 44,116 82,102 68,60 106,78';
        return (
          <>
            <Polygon points={outerStar} fill={`url(#${gradId}_rim)`} />
            <Polygon points={innerStar} fill={palette.borderDark} opacity="0.65" />
            <Polygon points={surfaceStar} fill={`url(#${gradId}_surface)`} />
            <Polygon points={surfaceStar} fill={`url(#${gradId}_sheen)`} />
            {/* Central Compass point */}
            <G transform="translate(120, 52)">
              <Path
                d="M0 -6 L2 0 L6 2 L2 4 L0 10 L-2 4 L-6 2 L-2 0 Z"
                fill={palette.insignia}
                opacity="0.85"
              />
            </G>
          </>
        );
      }

      case 'hexagon':
      default: {
        // 3D Point-top Hexagon Shield (for Streak)
        const outerHex = '120,24 208,76 208,184 120,236 32,184 32,76';
        const innerHex = '120,32 200,80 200,180 120,228 40,180 40,80';
        const surfaceHex = '120,40 192,84 192,176 120,220 48,176 48,84';
        return (
          <>
            <Polygon points={outerHex} fill={`url(#${gradId}_rim)`} />
            <Polygon points={innerHex} fill={palette.borderDark} opacity="0.65" />
            <Polygon points={surfaceHex} fill={`url(#${gradId}_surface)`} />
            <Polygon points={surfaceHex} fill={`url(#${gradId}_sheen)`} />
            {/* Top crown insignia */}
            <G transform="translate(120, 52)">
              <Path
                d="M0 -6 V6 M-5 -2 H5"
                stroke={palette.insignia}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
            </G>
          </>
        );
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        { width: size, height: (size * viewBoxHeight) / viewBoxWidth },
        style,
      ]}
    >
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

        {/* 1. Category Geometric Background */}
        {renderGeometry()}

        {/* 2. Extruded 3D Category Label Header (on large badges) */}
        {showText && !isCompact && (
          <G>
            <SvgText
              x="120"
              y="82"
              fill={palette.textShadow}
              fontSize="13"
              fontWeight="900"
              letterSpacing="2.5"
              textAnchor="middle"
              fontFamily="System"
            >
              {displayLabel}
            </SvgText>
            <SvgText
              x="120"
              y="80"
              fill={`url(#${gradId}_text)`}
              fontSize="13"
              fontWeight="900"
              letterSpacing="2.5"
              textAnchor="middle"
              fontFamily="System"
            >
              {displayLabel}
            </SvgText>
          </G>
        )}

        {/* 3. Dynamic Extruded 3D Target Number */}
        {showText && (
          <G>
            {/* Deepest drop shadow */}
            <SvgText
              x="120"
              y={isCompact ? numberY + 3 : numberY + 20}
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
              y={isCompact ? numberY + 1 : numberY + 18}
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
              y={isCompact ? numberY : numberY + 16}
              fill={`url(#${gradId}_text)`}
              fontSize={numberFontSize}
              fontWeight="900"
              textAnchor="middle"
              fontFamily="System"
            >
              {days}
            </SvgText>
          </G>
        )}

        {/* 4. Bottom Wordmark Emblem Line */}
        <G transform="translate(120, 196)">
          <Path
            d="M-14 0 H14"
            stroke={palette.insignia}
            strokeWidth="1.5"
            opacity="0.4"
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
