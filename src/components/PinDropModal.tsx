/**
 * Interactive Pin-Drop Map Modal
 *
 * Lightweight, zero-native-SDK map coordinate picker:
 * - Uses OpenStreetMap / Carto CDN slippy tiles via standard React Native Image
 * - Tap anywhere on the map canvas to drop/reposition the pin
 * - Zoom in/out (+ / -) and directional precision pan controls
 * - Live latitude & longitude display
 * - Automatic live reverse-geocoding of dropped coordinates into street address
 * - Conforms strictly to 60-30-10 design rules (60% #F8FAFC, 30% #FFFFFF, 10% #FDD223 / #0F172A)
 * - Zero emojis, pure SVGs
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  GestureResponderEvent,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from './Typography';
import {
  CloseSvg,
  CheckSvg,
  MapPinSvg,
  CrosshairSvg,
  ZoomInSvg,
  ZoomOutSvg,
} from './SvgIcons';
import { reverseGeocodeOnline, AddressSuggestion } from '../services/geoService';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MAP_SIZE = Math.min(SCREEN_WIDTH - 32, 360);
const HALF_MAP = MAP_SIZE / 2;
const TILE_SIZE = 256;

// Mercator Projection Math
function lon2tile(lon: number, zoom: number): number {
  return ((lon + 180) / 360) * Math.pow(2, zoom);
}

function lat2tile(lat: number, zoom: number): number {
  return (
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
    Math.pow(2, zoom)
  );
}

function tile2lon(x: number, z: number): number {
  return (x / Math.pow(2, z)) * 360 - 180;
}

function tile2lat(y: number, z: number): number {
  const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

interface PinDropModalProps {
  visible: boolean;
  initialLatitude: number;
  initialLongitude: number;
  townName?: string;
  onClose: () => void;
  onConfirm: (location: {
    latitude: number;
    longitude: number;
    streetAddress?: string;
    suburb?: string;
    town?: string;
    province?: string;
    postalCode?: string;
  }) => void;
}

export default function PinDropModal({
  visible,
  initialLatitude,
  initialLongitude,
  townName,
  onClose,
  onConfirm,
}: PinDropModalProps) {
  const [lat, setLat] = useState<number>(initialLatitude || -26.2041);
  const [lng, setLng] = useState<number>(initialLongitude || 28.0473);
  const [zoom, setZoom] = useState<number>(15);
  const [resolvedAddress, setResolvedAddress] = useState<AddressSuggestion | null>(null);
  const [isResolving, setIsResolving] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      const validLat = typeof initialLatitude === 'number' && !isNaN(initialLatitude) && initialLatitude !== 0 ? initialLatitude : -26.2041;
      const validLng = typeof initialLongitude === 'number' && !isNaN(initialLongitude) && initialLongitude !== 0 ? initialLongitude : 28.0473;
      setLat(validLat);
      setLng(validLng);
      setZoom(15);
      triggerReverseGeocode(validLat, validLng);
    }
  }, [visible, initialLatitude, initialLongitude]);

  const triggerReverseGeocode = (targetLat: number, targetLng: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setIsResolving(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const res = await reverseGeocodeOnline(targetLat, targetLng);
        setResolvedAddress(res);
      } catch {
        setResolvedAddress(null);
      } finally {
        setIsResolving(false);
      }
    }, 400);
  };

  // Convert current lat, lng into tile coordinates
  const centerExactTileX = lon2tile(lng, zoom);
  const centerExactTileY = lat2tile(lat, zoom);

  const baseTileX = Math.floor(centerExactTileX);
  const baseTileY = Math.floor(centerExactTileY);

  // Fractional pixel shift from base tile to exact center
  const fracOffsetX = (centerExactTileX - baseTileX) * TILE_SIZE;
  const fracOffsetY = (centerExactTileY - baseTileY) * TILE_SIZE;

  // Grid coordinates relative to map center
  // Base tile top-left in container is HALF_MAP - fracOffsetX, HALF_MAP - fracOffsetY
  const originX = HALF_MAP - fracOffsetX;
  const originY = HALF_MAP - fracOffsetY;

  // Generate 3x3 surrounding tiles: -1, 0, 1
  const tileIndices = [-1, 0, 1];
  const maxTile = Math.pow(2, zoom);

  const handleMapPress = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    // Difference from container center (HALF_MAP, HALF_MAP)
    const deltaPixelX = locationX - HALF_MAP;
    const deltaPixelY = locationY - HALF_MAP;

    const deltaTileX = deltaPixelX / TILE_SIZE;
    const deltaTileY = deltaPixelY / TILE_SIZE;

    const newExactTileX = centerExactTileX + deltaTileX;
    const newExactTileY = centerExactTileY + deltaTileY;

    const newLng = tile2lon(newExactTileX, zoom);
    const newLat = tile2lat(newExactTileY, zoom);

    setLat(newLat);
    setLng(newLng);
    triggerReverseGeocode(newLat, newLng);
  };

  const handleNudge = (dxTile: number, dyTile: number) => {
    const newExactTileX = centerExactTileX + dxTile;
    const newExactTileY = centerExactTileY + dyTile;

    const newLng = tile2lon(newExactTileX, zoom);
    const newLat = tile2lat(newExactTileY, zoom);

    setLat(newLat);
    setLng(newLng);
    triggerReverseGeocode(newLat, newLng);
  };

  const handleZoomIn = () => {
    if (zoom < 18) setZoom((z) => z + 1);
  };

  const handleZoomOut = () => {
    if (zoom > 11) setZoom((z) => z - 1);
  };

  const handleResetToInitial = () => {
    setLat(initialLatitude || -26.2041);
    setLng(initialLongitude || 28.0473);
    setZoom(15);
    triggerReverseGeocode(initialLatitude || -26.2041, initialLongitude || 28.0473);
  };

  const handleConfirm = () => {
    onConfirm({
      latitude: lat,
      longitude: lng,
      streetAddress: resolvedAddress?.streetAddress,
      suburb: resolvedAddress?.suburb,
      town: resolvedAddress?.town,
      province: resolvedAddress?.province,
      postalCode: resolvedAddress?.postalCode,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.headerBtn}
            accessibilityRole="button"
            accessibilityLabel="Close pin drop modal"
          >
            <CloseSvg size={20} color="#0F172A" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Pin-Drop Location</Text>
            <Text style={styles.headerSubtitle}>Tap on the map to place exact GPS pin</Text>
          </View>
          <TouchableOpacity
            onPress={handleResetToInitial}
            style={styles.headerBtn}
            accessibilityRole="button"
            accessibilityLabel="Reset pin location"
          >
            <CrosshairSvg size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Map Canvas Container */}
        <View style={styles.mapOuterWrapper}>
          <View style={styles.mapContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleMapPress}
              style={[styles.mapCanvas, { width: MAP_SIZE, height: MAP_SIZE }]}
            >
              {/* Tile Grid */}
              {tileIndices.map((dy) =>
                tileIndices.map((dx) => {
                  const tileX = (baseTileX + dx + maxTile) % maxTile;
                  const tileY = (baseTileY + dy + maxTile) % maxTile;
                  const left = originX + dx * TILE_SIZE;
                  const top = originY + dy * TILE_SIZE;

                  // High-speed CartoDB Voyager raster tiles with OpenStreetMap data
                  const tileUrl = `https://a.basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${tileX}/${tileY}.png`;

                  return (
                    <Image
                      key={`${zoom}_${tileX}_${tileY}`}
                      source={{ uri: tileUrl }}
                      style={[
                        styles.mapTile,
                        {
                          left,
                          top,
                          width: TILE_SIZE,
                          height: TILE_SIZE,
                        },
                      ]}
                      resizeMode="cover"
                    />
                  );
                })
              )}

              {/* Grid Crosshair & Target Overlay */}
              <View style={[styles.centerCrosshair, { left: HALF_MAP - 1, top: HALF_MAP - 18 }]}>
                <View style={styles.pulseRing} />
                <MapPinSvg size={36} color="#FDD223" fill="#FDD223" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>

            {/* Map Floating Controls */}
            <View style={styles.floatingControls}>
              <TouchableOpacity
                style={styles.ctrlBtn}
                onPress={handleZoomIn}
                activeOpacity={0.8}
                accessibilityLabel="Zoom in"
              >
                <ZoomInSvg size={18} color="#0F172A" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ctrlBtn}
                onPress={handleZoomOut}
                activeOpacity={0.8}
                accessibilityLabel="Zoom out"
              >
                <ZoomOutSvg size={18} color="#0F172A" />
              </TouchableOpacity>
            </View>

            {/* Directional Precision Nudge Buttons */}
            <View style={styles.nudgeContainer}>
              <TouchableOpacity
                style={[styles.nudgeBtn, styles.nudgeNorth]}
                onPress={() => handleNudge(0, -0.35)}
                activeOpacity={0.7}
              >
                <Text style={styles.nudgeText}>▲</Text>
              </TouchableOpacity>
              <View style={styles.nudgeRow}>
                <TouchableOpacity
                  style={[styles.nudgeBtn, styles.nudgeSide]}
                  onPress={() => handleNudge(-0.35, 0)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.nudgeText}>◀</Text>
                </TouchableOpacity>
                <View style={styles.nudgeCenterDot} />
                <TouchableOpacity
                  style={[styles.nudgeBtn, styles.nudgeSide]}
                  onPress={() => handleNudge(0.35, 0)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.nudgeText}>▶</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.nudgeBtn, styles.nudgeSouth]}
                onPress={() => handleNudge(0, 0.35)}
                activeOpacity={0.7}
              >
                <Text style={styles.nudgeText}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Selected Coordinates & Address Resolution Card */}
        <View style={styles.bottomCard}>
          <View style={styles.coordHeaderRow}>
            <View style={styles.coordBadge}>
              <Text style={styles.coordLabel}>GPS Coordinates</Text>
              <Text style={styles.coordValue}>
                {lat.toFixed(5)}, {lng.toFixed(5)}
              </Text>
            </View>
            {isResolving && (
              <View style={styles.resolvingRow}>
                <ActivityIndicator size="small" color="#0F172A" />
                <Text style={styles.resolvingText}>Resolving address...</Text>
              </View>
            )}
          </View>

          {/* Reverse Geocoded Street Address */}
          <View style={styles.addressBox}>
            <Text style={styles.addressLabel}>Resolved Location</Text>
            <Text style={styles.addressText} numberOfLines={2}>
              {resolvedAddress?.displayName ||
                (townName ? `Near ${townName} centroid` : 'Tap anywhere to drop pin')}
            </Text>
          </View>

          {/* Instructions note */}
          <Text style={styles.helperNote}>
            Tapping the map updates both GPS coordinates and street address for 100% accurate turn-by-turn directions.
          </Text>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleConfirm}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Lock Pin Location"
          >
            <CheckSvg size={16} color="#0F172A" />
            <Text style={styles.confirmBtnText}>Lock This Pin Location</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC', // 60% dominant background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF', // 30% surface
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  mapOuterWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  mapContainer: {
    width: MAP_SIZE,
    height: MAP_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    position: 'relative',
  },
  mapCanvas: {
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  mapTile: {
    position: 'absolute',
  },
  centerCrosshair: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    pointerEvents: 'none',
    transform: [{ translateX: -18 }, { translateY: -32 }],
  },
  pulseRing: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FDD223',
    backgroundColor: 'rgba(253, 210, 35, 0.25)',
    top: 26,
  },
  floatingControls: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 20,
    gap: 8,
  },
  ctrlBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nudgeContainer: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    zIndex: 20,
    alignItems: 'center',
  },
  nudgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 2,
  },
  nudgeBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nudgeNorth: {},
  nudgeSouth: {},
  nudgeSide: {},
  nudgeCenterDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
  },
  nudgeText: {
    fontSize: 9,
    color: '#0F172A',
    fontWeight: '700',
  },
  bottomCard: {
    backgroundColor: '#FFFFFF', // 30% surface
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    padding: 16,
    gap: 12,
  },
  coordHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coordBadge: {
    flex: 1,
  },
  coordLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  coordValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
  resolvingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resolvingText: {
    fontSize: 11,
    color: '#64748B',
  },
  addressBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 10,
  },
  addressLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 13,
    color: '#0F172A',
    lineHeight: 18,
  },
  helperNote: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 15,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FDD223', // 10% accent
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2B812',
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
});
