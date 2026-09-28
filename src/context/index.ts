/**
 * Unified Context Registry
 *
 * Provides access to granular, domain-specific state contexts:
 * - AuthContext: Authentication, profile, session persistence
 * - SecurityContext: Biometrics, PIN lock, auto-lock timeouts, app switcher shield
 * - ReaderSettingsContext: Typography, red-letter toggle, themes, highlights
 * - UserDataContext: Favorites, streaks, read metrics, completed studies
 * - AlertContext: 60-30-10 custom themed modal alerts
 * - UserContext: Backward-compatible unified facade
 */

export * from './AuthContext';
export * from './SecurityContext';
export * from './ReaderSettingsContext';
export * from './UserDataContext';
export * from './AlertContext';
export * from './UserContext';
