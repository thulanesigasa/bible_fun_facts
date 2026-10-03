/**
 * Interactive Real Street Branch Map (Open-Source Street Tiles & Markers)
 *
 * Dedicated real street map plotting churches, branches, and homecells
 * using high-resolution OpenStreetMap / CartoDB Voyager street tiles
 * with real roads, highways, districts, and interactive SVG branch markers.
 *
 * 100% zero-binary dependency, zero proprietary Google billing keys,
 * zero external API keys required, 100% compliant with React Native standards.
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
  Image,
} from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from './Typography';
import { Branch, getBranchTypeLabel } from '../services/ministryService';

interface BranchRadarMapProps {
  branches: Branch[];
  selectedBranchId?: string;
  onSelectBranch?: (branch: Branch) => void;
  height?: number;
  showFooter?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Convert Latitude and Longitude to Web Mercator continuous tile coordinates
function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = Math.pow(2, zoom);
  const x = ((lng + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return { x, y };
}

export const BranchMapView: React.FC<BranchRadarMapProps> = ({
  branches,
  selectedBranchId,
  onSelectBranch,
  height = 360,
  showFooter = true,
}) => {
  const mapWidth = SCREEN_WIDTH - spacing.xl * 2;
  const mapHeight = height;

  const [zoom, setZoom] = useState<number>(13);
  const [activeBranchId, setActiveBranchId] = useState<string | null>(
    selectedBranchId || (branches.length > 0 ? branches[0].id : null)
  );

  const activeBranch = useMemo(() => {
    return branches.find((b) => b.id === activeBranchId) || branches[0] || null;
  }, [branches, activeBranchId]);

  // Map center coordinates: active branch or centroid
  const centerCoord = useMemo(() => {
    if (activeBranch) {
      return activeBranch.coordinates;
    }
    if (branches.length > 0) {
      const avgLat =
        branches.reduce((acc, b) => acc + b.coordinates.latitude, 0) /
        branches.length;
      const avgLng =
        branches.reduce((acc, b) => acc + b.coordinates.longitude, 0) /
        branches.length;
      return { latitude: avgLat, longitude: avgLng };
    }
    return { latitude: -26.2041, longitude: 28.0473 }; // Default Johannesburg
  }, [activeBranch, branches]);

  // Real Map Mercator tile projection
  const { tileGrid, projectRealCoordinate } = useMemo(() => {
    const cTile = latLngToTile(centerCoord.latitude, centerCoord.longitude, zoom);
    const centerTileX = Math.floor(cTile.x);
    const centerTileY = Math.floor(cTile.y);

    const halfW = mapWidth / 2;
    const halfH = (mapHeight - 110) / 2;

    const centerTileOriginX = halfW - (cTile.x - centerTileX) * 256;
    const centerTileOriginY = halfH - (cTile.y - centerTileY) * 256;

    const grid: { x: number; y: number; left: number; top: number; url: string }[] = [];

    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        const tx = centerTileX + dx;
        const ty = centerTileY + dy;
        const left = centerTileOriginX + dx * 256;
        const top = centerTileOriginY + dy * 256;

        if (left + 256 >= 0 && left <= mapWidth && top + 256 >= 0 && top <= mapHeight - 110) {
          grid.push({
            x: tx,
            y: ty,
            left,
            top,
            url: `https://a.basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${tx}/${ty}.png`,
          });
        }
      }
    }

    const projectReal = (lat: number, lng: number) => {
      const pTile = latLngToTile(lat, lng, zoom);
      const pixelX = halfW + (pTile.x - cTile.x) * 256;
      const pixelY = halfH + (pTile.y - cTile.y) * 256;
      return { x: pixelX, y: pixelY };
    };

    return { tileGrid: grid, projectRealCoordinate: projectReal };
  }, [centerCoord, zoom, mapWidth, mapHeight]);

  const handleBranchTap = (branch: Branch) => {
    setActiveBranchId(branch.id);
    if (onSelectBranch) {
      onSelectBranch(branch);
    }
  };

  const handleOpenNavigation = (branch: Branch) => {
    const { latitude, longitude } = branch.coordinates;
    const label = encodeURIComponent(`${branch.name} (${branch.town})`);

    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${latitude},${longitude}&q=${label}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
          );
        }
      })
      .catch(() => {
        Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
        );
      });
  };

  const mapCanvasHeight = mapHeight - 110;

  return (
    <View style={[styles.container, { height: mapHeight }]}>
      {/* Map Header & Zoom Controls (Dedicated Real Street Map) */}
      <View style={styles.topControlBar}>
        <View style={styles.topBarTitleRow}>
          <View style={styles.topBarDot} />
          <Text style={styles.topBarTitle}>CAMPUS STREET MAP</Text>
        </View>

        <View style={styles.zoomControls}>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() => setZoom((z) => Math.min(z + 1, 18))}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Zoom In"
          >
            <Text style={styles.zoomText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() => setZoom((z) => Math.max(z - 1, 4))}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Zoom Out"
          >
            <Text style={styles.zoomText}>−</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Street Map Viewport */}
      <View style={[styles.viewport, { height: mapCanvasHeight }]}>
        <View style={[styles.tileContainer, { width: mapWidth, height: mapCanvasHeight }]}>
          {tileGrid.map((tile) => (
            <Image
              key={`${tile.x}_${tile.y}_${zoom}`}
              source={{ uri: tile.url }}
              style={{
                position: 'absolute',
                left: tile.left,
                top: tile.top,
                width: 256,
                height: 256,
              }}
              resizeMode="cover"
            />
          ))}

          {/* SVG Marker Pins on Real Map */}
          <Svg width={mapWidth} height={mapCanvasHeight} style={StyleSheet.absoluteFill}>
            {branches.map((b) => {
              const { x, y } = projectRealCoordinate(
                b.coordinates.latitude,
                b.coordinates.longitude
              );
              const isSelected = b.id === activeBranchId;

              // Only render pins inside the viewport bounds
              if (x < -20 || x > mapWidth + 20 || y < -20 || y > mapCanvasHeight + 20) {
                return null;
              }

              return (
                <G key={b.id} onPress={() => handleBranchTap(b)}>
                  {isSelected && (
                    <Circle
                      cx={x}
                      cy={y - 8}
                      r={18}
                      fill="rgba(253, 210, 35, 0.35)"
                      stroke="#FDD223"
                      strokeWidth={1.5}
                    />
                  )}
                  {/* Map Marker Pin Path */}
                  <Path
                    d={`M ${x} ${y} C ${x - 8} ${y - 12}, ${x - 10} ${y - 18}, ${x} ${y - 24} C ${x + 10} ${y - 18}, ${x + 8} ${y - 12}, ${x} ${y} Z`}
                    fill={isSelected ? '#FDD223' : '#0F172A'}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                  />
                  <Circle
                    cx={x}
                    cy={y - 17}
                    r={3.5}
                    fill={isSelected ? '#0F172A' : '#FDD223'}
                  />
                </G>
              );
            })}
          </Svg>

          <View style={styles.osmAttribution}>
            <Text style={styles.osmText}>© OpenStreetMap © CARTO • Zero API Keys</Text>
          </View>
        </View>
      </View>

      {/* Selected Branch Footer Card */}
      {showFooter && (
        activeBranch ? (
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1, marginRight: spacing.sm }}>
                <View style={styles.tagRow}>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeBadgeText}>
                      {getBranchTypeLabel(activeBranch.type)}
                    </Text>
                  </View>
                  <Text style={styles.locationText} numberOfLines={1}>
                    {activeBranch.town}, {activeBranch.province}
                  </Text>
                </View>
                <Text style={styles.branchName} numberOfLines={1}>
                  {activeBranch.name}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleOpenNavigation(activeBranch)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Get directions to ${activeBranch.name}`}
              >
                <Text style={styles.navButtonText}>Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyCardText}>No branch selected</Text>
          </View>
        )
      )}
    </View>
  );
};

// Export alias for backward compatibility across existing screens
export const BranchRadarMap = BranchMapView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  topControlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  topBarTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  topBarDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  topBarTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  zoomControls: {
    flexDirection: 'row',
    gap: 4,
  },
  zoomButton: {
    width: 26,
    height: 26,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 18,
  },
  viewport: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  tileContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  osmAttribution: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  osmText: {
    fontSize: 8,
    color: '#64748B',
    fontWeight: '500',
  },
  cardContainer: {
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 2,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.xs,
    backgroundColor: 'rgba(253, 210, 35, 0.2)',
  },
  typeBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.accent,
    textTransform: 'uppercase',
  },
  locationText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  branchName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  navButton: {
    backgroundColor: '#FDD223',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
  },
  navButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  emptyCard: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCardText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
