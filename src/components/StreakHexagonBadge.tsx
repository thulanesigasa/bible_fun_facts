import React from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Path,
  G,
  Text as SvgText,
  Polygon,
} from 'react-native-svg';

export interface StreakHexagonBadgeProps {
  days: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'diamond' | 'celestial';
  size?: number;
  badgeImage?: any;
  style?: StyleProp<ViewStyle>;
}

// Color palettes for vector metallic rendering fallback
const TIER_PALETTES = {
  bronze: {
    borderLight: '#F59E0B',
    borderMid: '#B45309',
    borderDark: '#78350F',
    faceGradStart: '#FDE68A',
    faceGradEnd: '#B45309',
    surfaceGradStart: '#78350F',
    surfaceGradEnd: '#451A03',
    flameGradStart: '#FDE68A',
    flameGradEnd: '#D97706',
    flameCore: '#FEF3C7',
    textFront: '#FEF3C7',
    textShadow: '#451A03',
  },
  silver: {
    borderLight: '#F8FAFC',
    borderMid: '#CBD5E1',
    borderDark: '#64748B',
    faceGradStart: '#FFFFFF',
    faceGradEnd: '#94A3B8',
    surfaceGradStart: '#475569',
    surfaceGradEnd: '#1E293B',
    flameGradStart: '#FFFFFF',
    flameGradEnd: '#94A3B8',
    flameCore: '#F8FAFC',
    textFront: '#FFFFFF',
    textShadow: '#1E293B',
  },
  gold: {
    borderLight: '#FEF08A',
    borderMid: '#FACC15',
    borderDark: '#854D0E',
    faceGradStart: '#FEF9C3',
    faceGradEnd: '#CA8A04',
    surfaceGradStart: '#713F12',
    surfaceGradEnd: '#422006',
    flameGradStart: '#FEF08A',
    flameGradEnd: '#EAB308',
    flameCore: '#FEFCE8',
    textFront: '#FEFCE8',
    textShadow: '#422006',
  },
  diamond: {
    borderLight: '#E0F2FE',
    borderMid: '#38BDF8',
    borderDark: '#0369A1',
    faceGradStart: '#F0F9FF',
    faceGradEnd: '#0284C7',
    surfaceGradStart: '#075985',
    surfaceGradEnd: '#082F49',
    flameGradStart: '#BAE6FD',
    flameGradEnd: '#0284C7',
    flameCore: '#FFFFFF',
    textFront: '#FFFFFF',
    textShadow: '#082F49',
  },
  celestial: {
    borderLight: '#FEF08A',
    borderMid: '#F59E0B',
    borderDark: '#B45309',
    faceGradStart: '#FFFBEB',
    faceGradEnd: '#D97706',
    surfaceGradStart: '#78350F',
    surfaceGradEnd: '#331302',
    flameGradStart: '#FEF08A',
    flameGradEnd: '#F59E0B',
    flameCore: '#FFFFFF',
    textFront: '#FFFBEB',
    textShadow: '#331302',
  },
};

export const StreakHexagonBadge: React.FC<StreakHexagonBadgeProps> = ({
  days,
  tier = 'bronze',
  size = 220,
  badgeImage,
  style,
}) => {
  // If a pre-rendered high-res 3D badge asset exists, render it with crisp fidelity
  if (badgeImage) {
    return (
      <View style={[styles.imageContainer, { width: size, height: size }, style]}>
        <Image
          source={badgeImage}
          style={{ width: size, height: size, borderRadius: size * 0.18 }}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Otherwise, render a procedural 3D metallic hexagonal shield using react-native-svg
  const palette = TIER_PALETTES[tier] || TIER_PALETTES.bronze;
  const viewBoxWidth = 240;
  const viewBoxHeight = 280;

  // Hexagon point-top coordinates:
  // Center is (120, 168), radius approx 82
  const outerHexPoints = '120,72 202,118 202,212 120,258 38,212 38,118';
  const innerHexPoints = '120,78 196,121 196,209 120,252 44,209 44,121';
  const surfaceHexPoints = '120,84 190,124 190,206 120,246 50,206 50,124';

  const gradId = `badge_${tier}_${days}`;

  return (
    <View style={[styles.container, { width: size, height: (size * viewBoxHeight) / viewBoxWidth }, style]}>
      <Svg
        width={size}
        height={(size * viewBoxHeight) / viewBoxWidth}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      >
        <Defs>
          {/* Beveled Rim Metallic Gradient */}
          <LinearGradient id={`${gradId}_rim`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={palette.borderLight} stopOpacity="1" />
            <Stop offset="0.3" stopColor={palette.borderMid} stopOpacity="1" />
            <Stop offset="0.7" stopColor={palette.borderDark} stopOpacity="1" />
            <Stop offset="1" stopColor={palette.borderLight} stopOpacity="1" />
          </LinearGradient>

          {/* Recessed Shield Surface Gradient */}
          <LinearGradient id={`${gradId}_surface`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={palette.surfaceGradStart} stopOpacity="1" />
            <Stop offset="0.5" stopColor={palette.surfaceGradStart} stopOpacity="0.9" />
            <Stop offset="1" stopColor={palette.surfaceGradEnd} stopOpacity="1" />
          </LinearGradient>

          {/* Flame Gradient */}
          <LinearGradient id={`${gradId}_flame`} x1="0" y1="1" x2="0" y2="0">
            <Stop offset="0" stopColor={palette.flameGradEnd} stopOpacity="1" />
            <Stop offset="0.6" stopColor={palette.flameGradStart} stopOpacity="1" />
            <Stop offset="1" stopColor={palette.flameCore} stopOpacity="1" />
          </LinearGradient>

          {/* 3D Extruded Text Face Gradient */}
          <LinearGradient id={`${gradId}_text`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={palette.faceGradStart} stopOpacity="1" />
            <Stop offset="0.7" stopColor={palette.faceGradEnd} stopOpacity="1" />
            <Stop offset="1" stopColor={palette.faceGradStart} stopOpacity="0.9" />
          </LinearGradient>

          {/* Specular Diagonal Highlight */}
          <LinearGradient id={`${gradId}_sheen`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.4" />
            <Stop offset="0.4" stopColor="#FFFFFF" stopOpacity="0.05" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* 1. Sculpted Top Flame */}
        <G>
          {/* Flame Drop Shadow */}
          <Path
            d="M120 18 C110 38 88 62 92 90 C96 112 112 122 120 122 C128 122 144 112 148 90 C152 62 130 38 120 18 Z"
            fill={palette.textShadow}
            opacity="0.35"
            transform="translate(0, 3)"
          />
          {/* Outer Flame Body */}
          <Path
            d="M120 18 C110 38 88 62 92 90 C96 112 112 122 120 122 C128 122 144 112 148 90 C152 62 130 38 120 18 Z"
            fill={`url(#${gradId}_flame)`}
          />
          {/* Inner Flame Tongue Core */}
          <Path
            d="M120 42 C116 54 104 68 106 84 C108 96 115 104 120 104 C125 104 132 96 134 84 C136 68 124 54 120 42 Z"
            fill={palette.flameCore}
            opacity="0.85"
          />
        </G>

        {/* 2. Outer Beveled Rim */}
        <Polygon points={outerHexPoints} fill={`url(#${gradId}_rim)`} />

        {/* 3. Mid Bevel Chamfer */}
        <Polygon points={innerHexPoints} fill={palette.borderDark} opacity="0.6" />

        {/* 4. Recessed Inner Surface */}
        <Polygon points={surfaceHexPoints} fill={`url(#${gradId}_surface)`} />

        {/* 5. Diagonal Glossy Sheen Overlay */}
        <Polygon points={surfaceHexPoints} fill={`url(#${gradId}_sheen)`} />

        {/* 6. 3D Extruded Streak Number */}
        <G>
          {/* Extrusion Bottom Depth Shadow */}
          <SvgText
            x="120"
            y="172"
            fill={palette.textShadow}
            fontSize="64"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="System"
          >
            {days}
          </SvgText>

          {/* Extrusion Mid Shadow */}
          <SvgText
            x="120"
            y="170"
            fill={palette.borderDark}
            fontSize="64"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="System"
          >
            {days}
          </SvgText>

          {/* Front Face Text */}
          <SvgText
            x="120"
            y="167"
            fill={`url(#${gradId}_text)`}
            fontSize="64"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="System"
          >
            {days}
          </SvgText>
        </G>

        {/* 7. 3D Extruded "STREAK" Label */}
        <G>
          {/* Extrusion Shadow */}
          <SvgText
            x="120"
            y="204"
            fill={palette.textShadow}
            fontSize="20"
            fontWeight="900"
            letterSpacing="2"
            textAnchor="middle"
            fontFamily="System"
          >
            STREAK
          </SvgText>

          {/* Front Face */}
          <SvgText
            x="120"
            y="201"
            fill={`url(#${gradId}_text)`}
            fontSize="20"
            fontWeight="900"
            letterSpacing="2"
            textAnchor="middle"
            fontFamily="System"
          >
            STREAK
          </SvgText>
        </G>

        {/* 8. Small in-shield brand emblem at bottom */}
        <G transform="translate(112, 222)">
          <Path
            d="M8 2 C7 3.6 5 6 5 9.5 C5 12 7 14 8 14 C9 14 11 12 11 9.5 C11 6 9 3.6 8 2 Z"
            fill={palette.flameCore}
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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
