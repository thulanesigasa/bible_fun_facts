/**
 * Sentry Crash Logging & Telemetry Service
 *
 * Provides real-time native & JavaScript exception capturing, unhandled promise
 * rejection tracking, performance tracing, and breadcrumb tracking.
 * Safe fallback: gracefully operates if DSN is not configured or in offline mode.
 */

import * as Sentry from '@sentry/react-native';

const SENTRY_DSN =
  process.env.EXPO_PUBLIC_SENTRY_DSN ||
  ''; // Configured via environment or release pipeline

let isSentryInitialized = false;

/**
 * Initializes Sentry native SDK with production crash logging configuration.
 */
export function initSentry(): void {
  if (isSentryInitialized) return;

  try {
    if (!SENTRY_DSN) {
      if (__DEV__) {
        console.log('[Sentry] No DSN provided in EXPO_PUBLIC_SENTRY_DSN. Crash telemetry operating in local diagnostic mode.');
      }
      isSentryInitialized = true;
      return;
    }

    Sentry.init({
      dsn: SENTRY_DSN,
      debug: __DEV__,
      enableAutoSessionTracking: true,
      sessionTrackingIntervalMillis: 30000,
      tracesSampleRate: __DEV__ ? 1.0 : 0.2, // Sample 20% of transactions in production
      _experiments: {
        profilesSampleRate: __DEV__ ? 1.0 : 0.1,
      },
      beforeSend(event) {
        // Sanitize sensitive auth headers and personal info if any
        if (event.request?.headers) {
          delete event.request.headers['Authorization'];
        }
        return event;
      },
    });

    isSentryInitialized = true;
    if (__DEV__) {
      console.log('[Sentry] Successfully initialized telemetry.');
    }
  } catch (error) {
    console.warn('[Sentry] Initialization error handled gracefully:', error);
  }
}

/**
 * Capture an unhandled exception or caught error with contextual tags
 */
export function captureException(
  error: unknown,
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, any>;
    level?: Sentry.SeverityLevel;
  }
): void {
  try {
    if (!isSentryInitialized) {
      initSentry();
    }

    if (__DEV__) {
      console.error('[Sentry captureException]:', error, context);
    }

    if (SENTRY_DSN) {
      Sentry.captureException(error, {
        tags: context?.tags,
        extra: context?.extra,
        level: context?.level || 'error',
      });
    }
  } catch (err) {
    console.warn('[Sentry] Error capturing exception:', err);
  }
}

/**
 * Capture a diagnostic or warning message
 */
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = 'info'
): void {
  try {
    if (!isSentryInitialized) {
      initSentry();
    }

    if (__DEV__) {
      console.log(`[Sentry captureMessage ${level}]:`, message);
    }

    if (SENTRY_DSN) {
      Sentry.captureMessage(message, level);
    }
  } catch (err) {
    console.warn('[Sentry] Error capturing message:', err);
  }
}

/**
 * Record a user navigation or interaction breadcrumb
 */
export function addBreadcrumb(
  category: string,
  message: string,
  data?: Record<string, any>
): void {
  try {
    if (SENTRY_DSN) {
      Sentry.addBreadcrumb({
        category,
        message,
        data,
        level: 'info',
      });
    }
  } catch {
    // Non-blocking
  }
}

/**
 * Associate active session with authenticated user profile
 */
export function setSentryUser(user: { id: string; email?: string; username?: string } | null): void {
  try {
    if (SENTRY_DSN) {
      if (user) {
        Sentry.setUser({
          id: user.id,
          email: user.email,
          username: user.username,
        });
      } else {
        Sentry.setUser(null);
      }
    }
  } catch {
    // Non-blocking
  }
}

export default {
  initSentry,
  captureException,
  captureMessage,
  addBreadcrumb,
  setSentryUser,
};
