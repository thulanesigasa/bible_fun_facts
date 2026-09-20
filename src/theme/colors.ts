/**
 * 60-30-10 Design System Color Tokens
 * Rule 1, Rule 15, and Rule 20 Specification:
 * - 60% Dominant Background: Clean Slate (#F8FAFC)
 * - 30% Panel / Surface: Pure White (#FFFFFF) & Hairline Border (rgba(15, 23, 42, 0.08))
 * - 10% Accent: Biblical Amber Gold (#D97706) & Soft Amber Tint (rgba(217, 119, 6, 0.12))
 */

export const colors = {
  // 60% Dominant Background
  background: '#F8FAFC',
  backgroundSecondary: '#F1F5F9',

  // 30% Panel & Surface
  surface: '#FFFFFF',
  surfaceElevated: '#F8FAFC',
  border: 'rgba(15, 23, 42, 0.08)',
  borderMuted: 'rgba(15, 23, 42, 0.04)',

  // 10% Accent
  accent: '#D97706',
  accentHover: '#B45309',
  accentSoft: 'rgba(217, 119, 6, 0.12)',
  accentBorder: 'rgba(217, 119, 6, 0.24)',

  // Neutral Typography (Monochromatic within surfaces)
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',

  // Aliases for compatibility
  white: '#FFFFFF',
  orange: '#D97706',
  softOrange: 'rgba(217, 119, 6, 0.12)',
  lightOrange: 'rgba(217, 119, 6, 0.24)',
  lightGray: '#F1F5F9',
  softGray: '#F8FAFC',
  darkSlate: '#0F172A',
  text: '#0F172A',
  secondaryText: '#64748B',
};
