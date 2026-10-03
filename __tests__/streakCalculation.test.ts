import {
  getDaysDifference,
  getLocalDateString,
  normalizeDateStringToLocalYMD,
  getLatestDateString,
  evaluateDailyStreak,
  reconcileOfflineOnlineStreak,
  healHistoricalDay7Clamp,
} from '../src/services/streakEngine';

describe('Study Streak Engine & Offline-Online Reconciliation', () => {
  describe('getDaysDifference calculation', () => {
    it('returns 0 for the exact same calendar date', () => {
      expect(getDaysDifference('2026-10-03', '2026-10-03')).toBe(0);
    });

    it('returns exactly 1 for consecutive calendar days', () => {
      expect(getDaysDifference('2026-10-02', '2026-10-03')).toBe(1);
    });

    it('returns 2 when one calendar day is skipped', () => {
      expect(getDaysDifference('2026-10-01', '2026-10-03')).toBe(2);
    });

    it('correctly calculates difference across month boundaries (Sep 30 -> Oct 1)', () => {
      expect(getDaysDifference('2026-09-30', '2026-10-01')).toBe(1);
      expect(getDaysDifference('2026-09-30', '2026-10-03')).toBe(3);
    });

    it('correctly calculates difference across year boundaries (Dec 31 -> Jan 1)', () => {
      expect(getDaysDifference('2025-12-31', '2026-01-01')).toBe(1);
    });

    it('returns negative difference for clock drift / future timestamps', () => {
      expect(getDaysDifference('2026-10-04', '2026-10-03')).toBe(-1);
    });
  });

  describe('normalizeDateStringToLocalYMD', () => {
    it('returns YYYY-MM-DD unchanged if already formatted', () => {
      expect(normalizeDateStringToLocalYMD('2026-10-03')).toBe('2026-10-03');
    });

    it('parses valid ISO timestamps into YYYY-MM-DD', () => {
      const parsed = normalizeDateStringToLocalYMD('2026-10-03T12:00:00.000Z');
      expect(parsed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('returns null for null, undefined, or invalid date strings', () => {
      expect(normalizeDateStringToLocalYMD(null)).toBeNull();
      expect(normalizeDateStringToLocalYMD(undefined)).toBeNull();
      expect(normalizeDateStringToLocalYMD('invalid-date')).toBeNull();
    });
  });

  describe('getLatestDateString', () => {
    it('picks the chronologically latest date regardless of parameter order', () => {
      expect(getLatestDateString('2026-10-01', '2026-10-02')).toBe('2026-10-02');
      expect(getLatestDateString('2026-10-02', '2026-10-01')).toBe('2026-10-02');
    });

    it('handles null or undefined on either side seamlessly', () => {
      expect(getLatestDateString(null, '2026-10-02')).toBe('2026-10-02');
      expect(getLatestDateString('2026-10-02', undefined)).toBe('2026-10-02');
      expect(getLatestDateString(null, null)).toBeNull();
    });

    it('preserves offline activity date (yesterday) over stale remote date (2 days ago)', () => {
      const offlineLocalLastLogin = '2026-10-02';
      const staleRemoteLastLogin = '2026-10-01';
      expect(getLatestDateString(offlineLocalLastLogin, staleRemoteLastLogin)).toBe('2026-10-02');
    });
  });

  describe('evaluateDailyStreak progression and boundaries', () => {
    it('increments streak by 1 on consecutive calendar days', () => {
      const result = evaluateDailyStreak('2026-10-02', 4, '2026-10-03');
      expect(result.newStreak).toBe(5);
      expect(result.shouldUpdate).toBe(true);
      expect(result.todayStr).toBe('2026-10-03');
    });

    it('preserves streak without increment when user returns on the same day', () => {
      const result = evaluateDailyStreak('2026-10-03', 5, '2026-10-03');
      expect(result.newStreak).toBe(5);
      expect(result.shouldUpdate).toBe(false);
      expect(result.todayStr).toBe('2026-10-03');
    });

    it('resets streak to 1 when user misses 2 or more days', () => {
      const result = evaluateDailyStreak('2026-10-01', 5, '2026-10-03');
      expect(result.newStreak).toBe(1);
      expect(result.shouldUpdate).toBe(true);
      expect(result.todayStr).toBe('2026-10-03');
    });

    it('preserves streak without increment if future clock drift occurs', () => {
      const result = evaluateDailyStreak('2026-10-04', 5, '2026-10-03');
      expect(result.newStreak).toBe(5);
      expect(result.shouldUpdate).toBe(false);
    });

    it('allows progression past Day 7, Day 8, Day 9 without any artificial clamping', () => {
      // Day 6 -> Day 7
      const day7 = evaluateDailyStreak('2026-10-01', 6, '2026-10-02');
      expect(day7.newStreak).toBe(7);

      // Day 7 -> Day 8
      const day8 = evaluateDailyStreak('2026-10-02', 7, '2026-10-03');
      expect(day8.newStreak).toBe(8);

      // Day 8 -> Day 9
      const day9 = evaluateDailyStreak('2026-10-02', 8, '2026-10-03');
      expect(day9.newStreak).toBe(9);

      // Day 10 -> Day 11 (historically clamped, now smoothly progresses)
      const day11 = evaluateDailyStreak('2026-10-02', 10, '2026-10-03');
      expect(day11.newStreak).toBe(11);
    });
  });

  describe('Offline-to-Online Transition & Stale Remote Reconciliation', () => {
    it('prevents stale remote login date from resetting streak to 1', () => {
      // Scenario:
      // Oct 2: User opened app in offline mode. Local state recorded streak = 8, lastLogin = 2026-10-02.
      // Remote Supabase stayed at streak = 7, lastLogin = 2026-10-01 because device was offline.
      // Oct 3: User opens app in online mode.
      const localLastLogin = '2026-10-02';
      const localStreak = 8;
      const remoteLastLogin = '2026-10-01';
      const remoteStreak = 7;
      const today = '2026-10-03';

      // Reconcile dates: latest active date is 2026-10-02
      const latestLastLogin = getLatestDateString(localLastLogin, remoteLastLogin);
      expect(latestLastLogin).toBe('2026-10-02');

      // Reconcile streak candidate: max of local and remote is 8
      const baseStreak = Math.max(localStreak, remoteStreak);
      expect(baseStreak).toBe(8);

      // Evaluate progression on Oct 3:
      const evalResult = evaluateDailyStreak(latestLastLogin, baseStreak, today);
      expect(evalResult.newStreak).toBe(9);
      expect(evalResult.shouldUpdate).toBe(true);
      expect(evalResult.todayStr).toBe('2026-10-03');
    });

    it('reconcileOfflineOnlineStreak helper produces deterministic Day 9 transition', () => {
      const result = reconcileOfflineOnlineStreak({
        localStreak: 8,
        localLastLogin: '2026-10-02',
        remoteStreak: 7,
        remoteLastLogin: '2026-10-01',
        todayStr: '2026-10-03',
        hasEvaluatedToday: false,
      });

      expect(result.finalStreak).toBe(9);
      expect(result.finalLastLogin).toBe('2026-10-03');
      expect(result.evaluatedToday).toBe(true);
      expect(result.shouldSync).toBe(true);
    });

    it('heals historical Day 7 clamp victim (Day 5/6 to Day 8/9 on Oct 2-3, 2026)', () => {
      // User was victim of historical clamp:
      // Day 5 on Oct 2 -> healed to 8
      const healOct2 = healHistoricalDay7Clamp(5, '2026-10-02');
      expect(healOct2.wasHealed).toBe(true);
      expect(healOct2.healedStreak).toBe(8);

      // Day 6 on Oct 3 -> healed to 9
      const healOct3 = healHistoricalDay7Clamp(6, '2026-10-03');
      expect(healOct3.wasHealed).toBe(true);
      expect(healOct3.healedStreak).toBe(9);

      // Non-victims are unaffected
      const normalUser = healHistoricalDay7Clamp(15, '2026-10-03');
      expect(normalUser.wasHealed).toBe(false);
      expect(normalUser.healedStreak).toBe(15);
    });
  });
});
