/**
 * Exégeomai Daily Study Streak & Date Reconciliation Engine
 *
 * Provides deterministic calendar-day calculation, chronologically latest date
 * reconciliation between local (offline) and remote (Supabase) sessions, and
 * self-healing logic for historical clamp anomalies.
 */

/**
 * Format local calendar date string as YYYY-MM-DD
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Normalizes any date string (ISO timestamp, toDateString, or YYYY-MM-DD) into YYYY-MM-DD
 */
export function normalizeDateStringToLocalYMD(dateStr: string | null | undefined): string | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  const parsed = new Date(trimmed);
  if (isNaN(parsed.getTime())) return null;
  return getLocalDateString(parsed);
}

/**
 * Returns exact integer difference in calendar days between two YYYY-MM-DD date strings
 */
export function getDaysDifference(fromYmd: string, toYmd: string): number {
  const fromParts = fromYmd.split('-').map(Number);
  const toParts = toYmd.split('-').map(Number);
  const fromUtc = Date.UTC(fromParts[0], fromParts[1] - 1, fromParts[2]);
  const toUtc = Date.UTC(toParts[0], toParts[1] - 1, toParts[2]);
  return Math.round((toUtc - fromUtc) / (1000 * 60 * 60 * 24));
}

/**
 * Returns the chronologically latest (most recent) valid YYYY-MM-DD date string.
 * This guarantees that offline activity (e.g. yesterday) is never overwritten or
 * masked by older remote database timestamps.
 */
export function getLatestDateString(
  dateA: string | null | undefined,
  dateB: string | null | undefined
): string | null {
  const ymdA = normalizeDateStringToLocalYMD(dateA);
  const ymdB = normalizeDateStringToLocalYMD(dateB);
  if (!ymdA && !ymdB) return null;
  if (!ymdA) return ymdB;
  if (!ymdB) return ymdA;
  return ymdA >= ymdB ? ymdA : ymdB;
}

export interface StreakEvaluationResult {
  newStreak: number;
  shouldUpdate: boolean;
  todayStr: string;
}

/**
 * Computes study streak progression based on calendar days elapsed.
 *
 * Rules:
 * 1. Same calendar day (diffDays === 0): User already engaged today. Streak remains intact.
 * 2. Consecutive calendar day (diffDays === 1): User studied yesterday and returned today. Streak increases by exactly +1.
 * 3. Missed one or more days (diffDays >= 2): Streak resets to Day 1.
 * 4. Clock drift or future timestamp (diffDays < 0): Streak remains intact.
 */
export function evaluateDailyStreak(
  lastLoginRaw: string | null | undefined,
  currentStreak: number,
  referenceDateStr?: string
): StreakEvaluationResult {
  const todayStr = referenceDateStr || getLocalDateString();
  const safeStreak = Math.max(1, currentStreak || 1);

  if (!lastLoginRaw) {
    return { newStreak: safeStreak, shouldUpdate: true, todayStr };
  }

  const lastLoginYmd = normalizeDateStringToLocalYMD(lastLoginRaw);
  if (!lastLoginYmd) {
    return { newStreak: safeStreak, shouldUpdate: true, todayStr };
  }

  const diffDays = getDaysDifference(lastLoginYmd, todayStr);

  if (diffDays === 0) {
    // Already engaged today - preserve streak without incrementing
    return { newStreak: safeStreak, shouldUpdate: false, todayStr };
  } else if (diffDays === 1) {
    // Consecutive calendar day (+1 day): increment by exactly 1
    return { newStreak: safeStreak + 1, shouldUpdate: true, todayStr };
  } else if (diffDays < 0) {
    // Clock drift or future timestamp; keep safe
    return { newStreak: safeStreak, shouldUpdate: false, todayStr };
  } else {
    // Missed one or more days (diffDays >= 2) - reset to Day 1
    return { newStreak: 1, shouldUpdate: true, todayStr };
  }
}

/**
 * Reconciles local (offline/cached) and remote (Supabase/cloud) streak data.
 * Always selects the latest calendar date and the maximum verified streak count.
 */
export function reconcileOfflineOnlineStreak(params: {
  localStreak: number;
  localLastLogin: string | null | undefined;
  remoteStreak?: number | null;
  remoteLastLogin?: string | null;
  todayStr?: string;
  hasEvaluatedToday?: boolean;
}): {
  finalStreak: number;
  finalLastLogin: string;
  evaluatedToday: boolean;
  shouldSync: boolean;
} {
  const todayStr = params.todayStr || getLocalDateString();
  const localStreak = Math.max(1, params.localStreak || 1);
  const remoteStreak = typeof params.remoteStreak === 'number' && params.remoteStreak > 0 ? params.remoteStreak : 0;
  const baseStreak = Math.max(localStreak, remoteStreak, 1);

  const latestLastLogin = getLatestDateString(params.localLastLogin, params.remoteLastLogin);
  const normalizedLocalLogin = normalizeDateStringToLocalYMD(params.localLastLogin);

  if (params.hasEvaluatedToday || normalizedLocalLogin === todayStr) {
    return {
      finalStreak: baseStreak,
      finalLastLogin: todayStr,
      evaluatedToday: true,
      shouldSync: remoteStreak !== baseStreak || normalizeDateStringToLocalYMD(params.remoteLastLogin) !== todayStr,
    };
  }

  const evaluation = evaluateDailyStreak(latestLastLogin, baseStreak, todayStr);
  return {
    finalStreak: evaluation.newStreak,
    finalLastLogin: evaluation.todayStr,
    evaluatedToday: true,
    shouldSync: true,
  };
}

/**
 * One-time historical repair for users whose streaks were clamped by historical
 * Day 7 -> Day 4 clamp logic.
 *
 * For users reaching Day 7 around Oct 1, 2026, the clamp reset them to Day 4,
 * putting them at Day 5 on Oct 2 and Day 6 on Oct 3 instead of Day 8 and Day 9.
 * Restores the +3 lost days.
 */
export function healHistoricalDay7Clamp(
  candidateStreak: number,
  todayStr: string = getLocalDateString()
): { healedStreak: number; wasHealed: boolean } {
  if (todayStr >= '2026-10-02' && (candidateStreak === 5 || candidateStreak === 6)) {
    return { healedStreak: candidateStreak + 3, wasHealed: true };
  }
  return { healedStreak: candidateStreak, wasHealed: false };
}
