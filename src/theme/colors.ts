/**
 * 60-30-10 Design System Color Tokens
 * Rule 1, Rule 15, and Rule 20 Specification:
 * - 60% Dominant Background: Clean Slate (#F8FAFC)
 * - 30% Panel / Surface: Pure White (#FFFFFF) & Hairline Border (rgba(15, 23, 42, 0.08))
 * - 10% Accent: Brand Logo Yellow (#FDD223) & Soft Gold Tint (rgba(253, 210, 35, 0.16))
 */

export const colors = {
  // 60% Dominant Background
  background: '#F8FAFC',
  backgroundSecondary: '#F1F5F9',

  // 30% Panel & Surface
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  surfaceElevated: '#F8FAFC',
  border: 'rgba(15, 23, 42, 0.08)',
  borderMuted: 'rgba(15, 23, 42, 0.04)',

  // 10% Accent - Exact Brand Logo Yellow
  accent: '#FDD223',
  accentDark: '#C99A00',
  accentHover: '#E5BD14',
  accentSoft: 'rgba(253, 210, 35, 0.16)',
  accentBorder: 'rgba(253, 210, 35, 0.35)',

  // Neutral Typography (Monochromatic within surfaces)
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',

  // Aliases for compatibility
  white: '#FFFFFF',
  yellow: '#FDD223',
  orange: '#FDD223',
  softOrange: 'rgba(253, 210, 35, 0.16)',
  lightOrange: 'rgba(253, 210, 35, 0.35)',
  lightGray: '#F1F5F9',
  softGray: '#F8FAFC',
  darkSlate: '#0F172A',
  text: '#0F172A',
  secondaryText: '#64748B',
};
