/**
 * Interactive Branch Radar Vector Map
 *
 * Renders an interactive SVG geographic coordinate map with plotted branch pins,
 * distance indicators, branch selection, and seamless external navigation to
 * Google Maps / Apple Maps.
 *
 * 100% vector SVG, zero external binary dependency, zero API key risk.
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import Svg, {
  Rect,
  Circle,
  Line,
  G,
  Text as SvgText,
  Path,
} from 'react-native-svg';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from './Typography';
import { Branch, getBranchTypeLabel } from '../services/ministryService';

interface BranchRadarMapProps {
  branches: Branch[];
  selectedBranchId?: string;
  onSelectBranch?: (branch: Branch) => void;
  height?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const BranchRadarMap: React.FC<BranchRadarMapProps> = ({
  branches,
  selectedBranchId,
  onSelectBranch,
  height = 320,
}) => {
  const mapWidth = SCREEN_WIDTH - spacing.xl * 2;
  const mapHeight = height;

  const [activeBranchId, setActiveBranchId] = useState<string | null>(
    selectedBranchId || (branches.length > 0 ? branches[0].id : null)
  );

  // Compute bounding box coordinates for responsive projection
  const bounds = useMemo(() => {
    if (branches.length === 0) {
      return { minLat: -35, maxLat: -20, minLng: 15, maxLng: 35 };
    }

    let minLat = 90;
    let maxLat = -90;
    let minLng = 180;
    let maxLng = -180;

    branches.forEach((b) => {
      const { latitude, longitude } = b.coordinates;
      if (latitude < minLat) minLat = latitude;
      if (latitude > maxLat) maxLat = latitude;
      if (longitude < minLng) minLng = longitude;
      if (longitude > maxLng) maxLng = longitude;
    });

    // Add safe margin padding around outermost coordinates
    const latSpan = Math.max(maxLat - minLat, 4);
    const lngSpan = Math.max(maxLng - minLng, 4);

    return {
      minLat: minLat - latSpan * 0.15,
      maxLat: maxLat + latSpan * 0.15,
      minLng: minLng - lngSpan * 0.15,
      maxLng: maxLng + lngSpan * 0.15,
    };
  }, [branches]);

  // Project geographic latitude and longitude to canvas X, Y pixel space
  const projectCoordinate = (lat: number, lng: number) => {
    const padding = 36;
    const availableWidth = mapWidth - padding * 2;
    const availableHeight = mapHeight - padding * 2;

    const xRatio = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng || 1);
    const yRatio = (bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat || 1);

    const x = padding + Math.max(0, Math.min(availableWidth, xRatio * availableWidth));
    const y = padding + Math.max(0, Math.min(availableHeight, yRatio * availableHeight));

    return { x, y };
  };

  const activeBranch = useMemo(() => {
    return branches.find((b) => b.id === activeBranchId) || branches[0] || null;
  }, [branches, activeBranchId]);

  const handleOpenNativeMaps = () => {
    if (!activeBranch) return;

    const query = encodeURIComponent(
      `${activeBranch.name}, ${activeBranch.address}, ${activeBranch.town}, ${activeBranch.country}`
    );

    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
    }) || `https://www.google.com/maps/search/?api=1&query=${query}`;

    Linking.openURL(url).catch((err) => {
      console.warn('Failed to open native maps:', err);
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
    });
  };

  return (
    <View style={styles.container}>
      {/* SVG Radar Map Canvas */}
      <View style={[styles.canvasWrapper, { height: mapHeight }]}>
        <Svg width={mapWidth} height={mapHeight} viewBox={`0 0 ${mapWidth} ${mapHeight}`}>
          {/* 1. Map Surface Background */}
          <Rect
            x="0"
            y="0"
            width={mapWidth}
            height={mapHeight}
            fill="#0F172A"
            rx="16"
          />

          {/* 2. Concentric Radar Grid Rings */}
          <Circle
            cx={mapWidth / 2}
            cy={mapHeight / 2}
            r={mapHeight * 0.22}
            stroke="#1E293B"
            strokeWidth="1"
            fill="none"
          />
          <Circle
            cx={mapWidth / 2}
            cy={mapHeight / 2}
            r={mapHeight * 0.42}
            stroke="#1E293B"
            strokeWidth="1"
            fill="none"
          />

          {/* 3. Coordinate Crosshairs */}
          <Line
            x1="16"
            y1={mapHeight / 2}
            x2={mapWidth - 16}
            y2={mapHeight / 2}
            stroke="#1E293B"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <Line
            x1={mapWidth / 2}
            y1="16"
            x2={mapWidth / 2}
            y2={mapHeight - 16}
            stroke="#1E293B"
            strokeWidth="1"
            strokeDasharray="4,4"
          />

          {/* 4. Compass Cardinal Indicators */}
          <SvgText x={mapWidth / 2} y="22" fill="#64748B" fontSize="10" fontWeight="bold" textAnchor="middle">
            N
          </SvgText>
          <SvgText x={mapWidth - 14} y={mapHeight / 2 + 4} fill="#64748B" fontSize="10" fontWeight="bold" textAnchor="middle">
            E
          </SvgText>
          <SvgText x={mapWidth / 2} y={mapHeight - 10} fill="#64748B" fontSize="10" fontWeight="bold" textAnchor="middle">
            S
          </SvgText>
          <SvgText x="14" y={mapHeight / 2 + 4} fill="#64748B" fontSize="10" fontWeight="bold" textAnchor="middle">
            W
          </SvgText>

          {/* 5. Plotted Branch Pins & Interactive Markers */}
          {branches.map((b) => {
            const { x, y } = projectCoordinate(b.coordinates.latitude, b.coordinates.longitude);
            const isSelected = b.id === activeBranchId;
            const isHomecell = b.type === 'homecell';

            const pinColor = isSelected
              ? '#FDD223' // Biblical Gold Accent
              : isHomecell
              ? '#38BDF8' // Sky Blue for Homecells
              : '#E2E8F0'; // Slate White for Main Branches

            return (
              <G key={b.id}>
                {/* Active Selection Pulse Ring */}
                {isSelected && (
                  <Circle
                    cx={x}
                    cy={y}
                    r="14"
                    fill="rgba(253, 210, 35, 0.25)"
                    stroke="#FDD223"
                    strokeWidth="1"
                  />
                )}

                {/* Base Outer Marker */}
                <Circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 7 : 5}
                  fill={pinColor}
                  stroke="#0F172A"
                  strokeWidth="2"
                />

                {/* Inner Center Dot */}
                <Circle
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#0F172A"
                />

                {/* Town Label Chip */}
                <SvgText
                  x={x}
                  y={y - 10}
                  fill={isSelected ? '#FDD223' : '#94A3B8'}
                  fontSize={isSelected ? '10' : '9'}
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {b.town}
                </SvgText>
              </G>
            );
          })}
        </Svg>

        {/* Transparent Touchable Overlays for Accurate Native Tap Targets */}
        {branches.map((b) => {
          const { x, y } = projectCoordinate(b.coordinates.latitude, b.coordinates.longitude);
          return (
            <TouchableOpacity
              key={`touch-${b.id}`}
              style={[styles.touchTarget, { left: x - 20, top: y - 20 }]}
              onPress={() => {
                setActiveBranchId(b.id);
                if (onSelectBranch) onSelectBranch(b);
              }}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Select ${b.name} in ${b.town}`}
            />
          );
        })}
      </View>

      {/* Selected Branch Detail Bottom Tray */}
      {activeBranch && (
        <View style={styles.detailCard}>
          <View style={styles.cardHeader}>
            <View style={styles.badgeWrapper}>
              <View
                style={[
                  styles.typeBadge,
                  activeBranch.type === 'homecell' && styles.homecellBadge,
                ]}
              >
                <Text variant="caption" weight="700" style={styles.typeBadgeText}>
                  {getBranchTypeLabel(activeBranch.type).toUpperCase()}
                </Text>
              </View>
              <Text variant="caption" color={colors.textSecondary}>
                {activeBranch.town}, {activeBranch.province}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.directionsBtn}
              onPress={handleOpenNativeMaps}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Open in Maps"
            >
              <Text variant="caption" weight="700" style={styles.directionsBtnText}>
                GET DIRECTIONS
              </Text>
            </TouchableOpacity>
          </View>

          <Text variant="h3" color={colors.textPrimary} style={styles.branchTitle}>
            {activeBranch.name}
          </Text>

          <Text variant="caption" color={colors.textSecondary} style={styles.metaRow}>
            Leader: <Text variant="caption" weight="700" color={colors.textPrimary}>{activeBranch.leaderName}</Text> • Tel: <Text variant="caption" weight="700" color={colors.textPrimary}>{activeBranch.contactNumber}</Text>
          </Text>

          <Text variant="caption" color={colors.textSecondary} style={styles.metaRow}>
            Schedule: {activeBranch.meetingTimes}
          </Text>

          <Text variant="caption" color={colors.textTertiary} style={styles.addressRow}>
            {activeBranch.address} ({activeBranch.postalCode}, {activeBranch.country})
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  canvasWrapper: {
    position: 'relative',
    width: '100%',
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
  },
  touchTarget: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 10,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    ...shadow.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  typeBadge: {
    backgroundColor: 'rgba(180, 83, 9, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  homecellBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  typeBadgeText: {
    fontSize: 10,
    color: '#B45309',
  },
  directionsBtn: {
    backgroundColor: '#FDD223',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  directionsBtnText: {
    fontSize: 10,
    color: '#0F172A',
  },
  branchTitle: {
    fontSize: 15,
    marginVertical: 2,
  },
  metaRow: {
    fontSize: 12,
    marginTop: 2,
  },
  addressRow: {
    fontSize: 11,
    marginTop: 4,
    fontStyle: 'italic',
  },
});
