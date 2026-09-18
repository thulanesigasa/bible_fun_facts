/**
 * 60-30-10 Design System Color Tokens
 * Rule 1 & Rule 15:
 * - 60% Dominant Background: Deep Obsidian Midnight (#0B0F19)
 * - 30% Panel / Surface: Slate Navy (#131B2E) & Border (#1C263D)
 * - 10% Accent: Amber Gold (#F59E0B) & Soft Amber Tint (rgba(245, 158, 11, 0.14))
 */

export const colors = {
  // 60% Dominant Background
  background: '#0B0F19',
  backgroundSecondary: '#0E1422',

  // 30% Panel & Surface
  surface: '#131B2E',
  surfaceElevated: '#18223A',
  border: '#1C263D',
  borderMuted: '#162035',

  // 10% Accent
  accent: '#F59E0B',
  accentHover: '#D97706',
  accentSoft: 'rgba(245, 158, 11, 0.14)',
  accentBorder: 'rgba(245, 158, 11, 0.28)',

  // Neutral Typography (Monochromatic within surfaces)
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',

  // Aliases for compatibility
  white: '#FFFFFF',
  orange: '#F59E0B',
  softOrange: 'rgba(245, 158, 11, 0.14)',
  lightOrange: 'rgba(245, 158, 11, 0.28)',
  lightGray: '#131B2E',
  softGray: '#0E1422',
  darkSlate: '#94A3B8',
  text: '#FFFFFF',
  secondaryText: '#94A3B8',
};
