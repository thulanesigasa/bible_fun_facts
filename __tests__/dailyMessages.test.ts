import { DAILY_MESSAGES } from '../src/data/dailyMessages';

describe('DailyMessages Dataset Integrity - 365 Days 3-Lens Scholarly Devotionals', () => {
  it('contains exactly 365 daily messages (one for every day of the calendar year)', () => {
    expect(DAILY_MESSAGES).toBeInstanceOf(Array);
    expect(DAILY_MESSAGES.length).toBe(365);
  });

  it('guarantees unique and contiguous calendar days from 1 to 365', () => {
    const daysSeen = new Set<number>();
    for (let i = 0; i < DAILY_MESSAGES.length; i++) {
      const msg = DAILY_MESSAGES[i];
      expect(msg.dayOfYear).toBe(i + 1);
      expect(daysSeen.has(msg.dayOfYear)).toBe(false);
      daysSeen.add(msg.dayOfYear);
    }
    expect(daysSeen.size).toBe(365);
  });

  it('verifies non-empty core fields across all 365 entries', () => {
    for (const msg of DAILY_MESSAGES) {
      expect(msg.id).toBeTruthy();
      expect(msg.fact_title).toBeTruthy();
      expect(msg.scripture_ref).toBeTruthy();
      expect(msg.verse_text).toBeTruthy();
      expect(msg.category).toBeTruthy();
    }
  });

  it('verifies 3-lens scholarly exegesis depth (historical, cultural, theological)', () => {
    for (const msg of DAILY_MESSAGES) {
      // Historical Context
      expect(typeof msg.historical_context).toBe('string');
      expect(msg.historical_context.trim().length).toBeGreaterThan(30);

      // Cultural Practice
      expect(typeof msg.cultural_practice).toBe('string');
      expect(msg.cultural_practice.trim().length).toBeGreaterThan(30);

      // Theological Truth
      expect(typeof msg.theological_truth).toBe('string');
      expect(msg.theological_truth!.trim().length).toBeGreaterThan(30);

      // Verify Practical Application (life_application) is removed per scholarly design
      expect((msg as any).life_application).toBeUndefined();
    }
  });
});
