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
  PanResponder,
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
  LayersSvg,
  SatelliteSvg,
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
  initialStreetAddress?: string;
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
  initialStreetAddress,
  onClose,
  onConfirm,
}: PinDropModalProps) {
  // Target GPS coordinates (the locked pin location)
  const [pinLat, setPinLat] = useState<number>(initialLatitude || -26.2041);
  const [pinLng, setPinLng] = useState<number>(initialLongitude || 28.0473);

  // Map viewport center (can be panned without moving the pin)
  const [lat, setLat] = useState<number>(initialLatitude || -26.2041);
  const [lng, setLng] = useState<number>(initialLongitude || 28.0473);
  const [zoom, setZoom] = useState<number>(16);
  const [mapLayer, setMapLayer] = useState<'satellite' | 'streets'>('satellite');
  const [resolvedAddress, setResolvedAddress] = useState<AddressSuggestion | null>(null);
  const [isResolving, setIsResolving] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      const validLat = typeof initialLatitude === 'number' && !isNaN(initialLatitude) && initialLatitude !== 0 ? initialLatitude : -26.2041;
      const validLng = typeof initialLongitude === 'number' && !isNaN(initialLongitude) && initialLongitude !== 0 ? initialLongitude : 28.0473;
      setPinLat(validLat);
      setPinLng(validLng);
      setLat(validLat);
      setLng(validLng);
      setZoom(16);
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
        if (res && initialStreetAddress) {
          const numberMatch = initialStreetAddress.trim().match(/^(\d+[A-Za-z]?|\d+[-\/]\d+)\s+/i);
          if (numberMatch && !res.streetAddress.match(/^\d+/)) {
            res.streetAddress = `${numberMatch[1]} ${res.streetAddress}`;
            res.displayName = `${numberMatch[1]} ${res.displayName}`;
          }
        }
        setResolvedAddress(res);
      } catch {
        setResolvedAddress(null);
      } finally {
        setIsResolving(false);
      }
    }, 400);
  };

  // Convert map center into tile coordinates
  const centerExactTileX = lon2tile(lng, zoom);
  const centerExactTileY = lat2tile(lat, zoom);

  const baseTileX = Math.floor(centerExactTileX);
  const baseTileY = Math.floor(centerExactTileY);

  // Fractional pixel shift from base tile to exact center
  const fracOffsetX = (centerExactTileX - baseTileX) * TILE_SIZE;
  const fracOffsetY = (centerExactTileY - baseTileY) * TILE_SIZE;

  // Grid coordinates relative to map center
  const originX = HALF_MAP - fracOffsetX;
  const originY = HALF_MAP - fracOffsetY;

  // Compute exact pixel position of the locked pin on the map viewport
  const pinExactTileX = lon2tile(pinLng, zoom);
  const pinExactTileY = lat2tile(pinLat, zoom);
  const pinPixelX = HALF_MAP + (pinExactTileX - centerExactTileX) * TILE_SIZE;
  const pinPixelY = HALF_MAP + (pinExactTileY - centerExactTileY) * TILE_SIZE;

  // Generate 3x3 surrounding tiles: -1, 0, 1
  const tileIndices = [-1, 0, 1];
  const maxTile = Math.pow(2, zoom);

  // Refs for tracking active gestures without React state lag
  const panStartCoordsRef = useRef<{ lat: number; lng: number }>({ lat, lng });
  const initialPinchDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(zoom);
  const lastZoomUpdateDistRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const currentZoomRef = useRef<number>(zoom);
  currentZoomRef.current = zoom;
  const currentCenterCoordsRef = useRef<{ lat: number; lng: number }>({ lat, lng });
  currentCenterCoordsRef.current = { lat, lng };

  // Calculate Euclidean distance between two touches
  const getPinchDistance = (touch0: any, touch1: any): number => {
    const dx = touch0.pageX - touch1.pageX;
    const dy = touch0.pageY - touch1.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2;
      },
      onPanResponderGrant: (evt) => {
        panStartCoordsRef.current = { ...currentCenterCoordsRef.current };
        isDraggingRef.current = false;
        const touches = evt.nativeEvent.touches;
        if (touches && touches.length === 2) {
          const dist = getPinchDistance(touches[0], touches[1]);
          initialPinchDistRef.current = dist;
          lastZoomUpdateDistRef.current = dist;
          pinchStartZoomRef.current = currentZoomRef.current;
        } else {
          initialPinchDistRef.current = null;
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;

        // Two-finger pinch to zoom in / out with real-time responsiveness
        if (touches && touches.length === 2) {
          isDraggingRef.current = true;
          const currentDist = getPinchDistance(touches[0], touches[1]);
          if (initialPinchDistRef.current && initialPinchDistRef.current > 0) {
            // Instant sensitivity: dynamically adjust zoom when pinch distance delta changes by 25px
            const distDelta = currentDist - lastZoomUpdateDistRef.current;
            if (Math.abs(distDelta) > 25) {
              const zoomStep = distDelta > 0 ? 1 : -1;
              const targetZoom = Math.min(19, Math.max(10, currentZoomRef.current + zoomStep));
              if (targetZoom !== currentZoomRef.current) {
                currentZoomRef.current = targetZoom;
                setZoom(targetZoom);
                lastZoomUpdateDistRef.current = currentDist;
              }
            }
          }
          return;
        }

        // One-finger pan (left, right, up, down) smoothly across viewport
        if (Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2) {
          isDraggingRef.current = true;
          const startExactTileX = lon2tile(panStartCoordsRef.current.lng, currentZoomRef.current);
          const startExactTileY = lat2tile(panStartCoordsRef.current.lat, currentZoomRef.current);

          const deltaTileX = -gestureState.dx / TILE_SIZE;
          const deltaTileY = -gestureState.dy / TILE_SIZE;

          const newLng = tile2lon(startExactTileX + deltaTileX, currentZoomRef.current);
          const newLat = tile2lat(startExactTileY + deltaTileY, currentZoomRef.current);

          setLat(newLat);
          setLng(newLng);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // If it was a quick tap (not drag or pinch), reposition pin to tapped point
        if (!isDraggingRef.current && Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5) {
          const { locationX, locationY } = evt.nativeEvent;
          const deltaPixelX = locationX - HALF_MAP;
          const deltaPixelY = locationY - HALF_MAP;

          const exactTileX = lon2tile(currentCenterCoordsRef.current.lng, currentZoomRef.current);
          const exactTileY = lat2tile(currentCenterCoordsRef.current.lat, currentZoomRef.current);

          const newExactTileX = exactTileX + deltaPixelX / TILE_SIZE;
          const newExactTileY = exactTileY + deltaPixelY / TILE_SIZE;

          const newLng = tile2lon(newExactTileX, currentZoomRef.current);
          const newLat = tile2lat(newExactTileY, currentZoomRef.current);

          // Update locked pin position and center viewport
          setPinLat(newLat);
          setPinLng(newLng);
          setLat(newLat);
          setLng(newLng);
          triggerReverseGeocode(newLat, newLng);
        }
        initialPinchDistRef.current = null;
        isDraggingRef.current = false;
      },
    })
  ).current;

  const handleResetToInitial = () => {
    const validLat = initialLatitude || -26.2041;
    const validLng = initialLongitude || 28.0473;
    setPinLat(validLat);
    setPinLng(validLng);
    setLat(validLat);
    setLng(validLng);
    setZoom(16);
    triggerReverseGeocode(validLat, validLng);
  };

  const handleConfirm = () => {
    const numberMatch = initialStreetAddress?.trim().match(/^(\d+[A-Za-z]?|\d+[-\/]\d+)\s+/i);
    let finalStreet = resolvedAddress?.streetAddress || initialStreetAddress;
    if (numberMatch && finalStreet && !finalStreet.match(/^\d+/)) {
      finalStreet = `${numberMatch[1]} ${finalStreet}`;
    }

    onConfirm({
      latitude: pinLat,
      longitude: pinLng,
      streetAddress: finalStreet,
      suburb: resolvedAddress?.suburb,
      town: resolvedAddress?.town || townName,
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
            <Text style={styles.headerSubtitle}>Drag or pinch to navigate · Tap to place pin</Text>
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
            <View
              {...panResponder.panHandlers}
              style={[styles.mapCanvas, { width: MAP_SIZE, height: MAP_SIZE }]}
            >
              {/* Tile Grid */}
              {tileIndices.map((dy) =>
                tileIndices.map((dx) => {
                  const tileX = (baseTileX + dx + maxTile) % maxTile;
                  const tileY = (baseTileY + dy + maxTile) % maxTile;
                  const left = originX + dx * TILE_SIZE;
                  const top = originY + dy * TILE_SIZE;

                  // High-resolution Esri World Imagery (Satellite aerial photos) or Esri World Street Map (100% free, keyless)
                  const tileUrl =
                    mapLayer === 'satellite'
                      ? `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${tileY}/${tileX}`
                      : `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${zoom}/${tileY}/${tileX}`;

                  return (
                    <Image
                      key={`${mapLayer}_${zoom}_${tileX}_${tileY}`}
                      source={{ uri: tileUrl }}
                      style={[
                        styles.mapTile,
                        {
                          left,
                          top,
                          width: TILE_SIZE,
                          height: TILE_SIZE,
                          backgroundColor: mapLayer === 'satellite' ? '#1E293B' : '#F1F5F9',
                        },
                      ]}
                      resizeMode="cover"
                    />
                  );
                })
              )}

              {/* Locked GPS Pin & Pulse Overlay */}
              <View style={[styles.centerCrosshair, { left: pinPixelX - 1, top: pinPixelY - 18 }]}>
                <View style={[styles.pulseRing, mapLayer === 'satellite' && styles.pulseRingSatellite]} />
                <MapPinSvg size={36} color="#FDD223" fill="#FDD223" strokeWidth={2.5} />
              </View>
            </View>

            {/* Map Layer Switcher Floating Pill (Satellite vs Streets) */}
            <View style={styles.layerSwitcherWrapper}>
              <TouchableOpacity
                style={[
                  styles.layerPillBtn,
                  mapLayer === 'satellite' && styles.layerPillBtnActive,
                ]}
                onPress={() => setMapLayer('satellite')}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Switch to Satellite aerial view"
              >
                <SatelliteSvg size={13} color={mapLayer === 'satellite' ? '#0F172A' : '#64748B'} />
                <Text
                  style={[
                    styles.layerPillText,
                    mapLayer === 'satellite' && styles.layerPillTextActive,
                  ]}
                >
                  Satellite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.layerPillBtn,
                  mapLayer === 'streets' && styles.layerPillBtnActive,
                ]}
                onPress={() => setMapLayer('streets')}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Switch to Street map view"
              >
                <LayersSvg size={13} color={mapLayer === 'streets' ? '#0F172A' : '#64748B'} />
                <Text
                  style={[
                    styles.layerPillText,
                    mapLayer === 'streets' && styles.layerPillTextActive,
                  ]}
                >
                  Streets
                </Text>
              </TouchableOpacity>
            </View>

            {/* Legal Basemap Attribution */}
            <View style={styles.attributionBadge} pointerEvents="none">
              <Text style={styles.attributionText}>
                {mapLayer === 'satellite' ? '© Esri · Maxar · Earthstar' : '© Esri · HERE · OpenStreetMap'}
              </Text>
            </View>
          </View>
        </View>

        {/* Selected Coordinates & Address Resolution Card */}
        <View style={styles.bottomCard}>
          <View style={styles.coordHeaderRow}>
            <View style={styles.coordBadge}>
              <Text style={styles.coordLabel}>GPS Coordinates</Text>
              <Text style={styles.coordValue}>
                {pinLat.toFixed(5)}, {pinLng.toFixed(5)}
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
  attributionBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 15,
  },
  attributionText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#64748B',
  },
  layerSwitcherWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 25,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    elevation: 4,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    gap: 3,
  },
  layerPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },
  layerPillBtnActive: {
    backgroundColor: '#FDD223', // 10% accent
  },
  layerPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  layerPillTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  pulseRingSatellite: {
    borderColor: '#FDD223',
    backgroundColor: 'rgba(253, 210, 35, 0.25)',
  },
});
