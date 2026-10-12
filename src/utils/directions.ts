/**
 * Native Direction Routing Utility
 *
 * Ensures branch and homecell "Directions" navigate directly to exact GPS coordinates
 * or detailed street addresses via Apple Maps (iOS), Google Maps (Android),
 * and web Google Maps fallback. Avoids fuzzy search misdirection.
 */

import { Linking, Platform } from 'react-native';

export interface DirectionTarget {
  latitude?: number;
  longitude?: number;
  name: string;
  address?: string;
  town?: string;
  country?: string;
}

export function buildDirectionUrls(target: DirectionTarget): {
  primaryUrl: string;
  fallbackUrl: string;
} {
  const { latitude, longitude, name, address, town, country } = target;
  const hasCoords =
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    (latitude !== 0 || longitude !== 0) &&
    !isNaN(latitude) &&
    !isNaN(longitude);

  const cleanName = encodeURIComponent(name);
  const fullAddressQuery = encodeURIComponent(
    [address, town, country].filter(Boolean).join(', ') || name
  );

  let url: string;
  let fallbackUrl: string;

  if (hasCoords) {
    if (Platform.OS === 'ios') {
      // Apple Maps navigation with exact coordinates as destination
      url = `http://maps.apple.com/?daddr=${latitude},${longitude}&q=${cleanName}`;
    } else if (Platform.OS === 'android') {
      // Android Google Maps turn-by-turn navigation / geo URI
      url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${cleanName})`;
    } else {
      url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    }
    fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  } else {
    if (Platform.OS === 'ios') {
      url = `http://maps.apple.com/?daddr=${fullAddressQuery}`;
    } else if (Platform.OS === 'android') {
      url = `geo:0,0?q=${fullAddressQuery}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${fullAddressQuery}`;
    }
    fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${fullAddressQuery}`;
  }

  return { primaryUrl: url, fallbackUrl };
}

export function openDirections(target: DirectionTarget): void {
  const { primaryUrl, fallbackUrl } = buildDirectionUrls(target);
  Linking.openURL(primaryUrl).catch(() => {
    Linking.openURL(fallbackUrl);
  });
}

