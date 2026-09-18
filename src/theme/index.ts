export { colors } from './colors';

/**
 * Rule 15 Spacing Specification:
 * All spacing MUST use multiples of 8px (8, 16, 24, 32, 48, 56, 64).
 */
export const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  nav: 56,
  huge: 64,
};

/**
 * Mobile Platform Dimension Constants per Rule 15:
 * - Android: status bar 24px, app bar 56px, nav bar 56px+48px, screen 360×640dp base, 4-column grid, 16px margin, 16px gutter
 * - iOS: status bar 54px, navigation bar 96px, tab bar 56px, home indicator 34px, screen 393×852pt base, 4-column grid, 16px margin, 16px gutter
 */
export const platformSpecs = {
  grid: {
    columns: 4,
    margin: 16,
    gutter: 16,
  },
  android: {
    statusBar: 24,
    appBar: 56,
    navBar: 56,
    gestureBar: 48,
    totalBottomBar: 104, // 56 + 48
    baseWidth: 360,
    baseHeight: 640,
  },
  ios: {
    statusBar: 54,
    navBar: 96,
    tabBar: 56,
    homeIndicator: 34,
    totalBottomBar: 90, // 56 + 34
    baseWidth: 393,
    baseHeight: 852,
  },
};

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 999,
};

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
};
