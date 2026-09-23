export interface StreakMilestone {
  days: number;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'celestial';
  title: string;
  subtitle: string;
  verseRef?: string;
  verseQuote?: string;
  themeColor: string;
  bgGradientStart: string;
  description: string;
}

export const STREAK_MILESTONES: StreakMilestone[] = [
  // 1. Day 1 to 6 — Light Amber
  {
    days: 1,
    tier: 'bronze',
    title: 'First Step',
    subtitle: 'The journey of 365 days begins with a single scripture.',
    verseRef: 'Philippians 1:6',
    verseQuote: 'He who began a good work in you will carry it on to completion.',
    themeColor: '#FDD223',
    bgGradientStart: 'rgba(253, 210, 35, 0.30)',
    description: 'Began the sacred walk of daily exegesis.',
  },
  {
    days: 3,
    tier: 'bronze',
    title: 'Rookie',
    subtitle: 'Is this just fleeting motivation or real dedication?',
    verseRef: 'Galatians 6:9',
    verseQuote: 'Let us not become weary in doing good, for at the proper time we will reap a harvest.',
    themeColor: '#FDD223',
    bgGradientStart: 'rgba(253, 210, 35, 0.35)',
    description: '3 days of unbroken daily scripture study.',
  },

  // 2. Day 7 to 30 — Warm Yellow
  {
    days: 7,
    tier: 'silver',
    title: 'Faithful Scribe',
    subtitle: "One full week of sacred consistency in God's Word.",
    verseRef: 'Genesis 2:2',
    verseQuote: 'By the seventh day God had finished the work he had been doing.',
    themeColor: '#EAB308',
    bgGradientStart: 'rgba(234, 179, 8, 0.35)',
    description: '7 days walking in theological truth.',
  },
  {
    days: 10,
    tier: 'silver',
    title: 'Getting Serious',
    subtitle: "Still here? It's getting real.",
    verseRef: 'Revelation 2:10',
    verseQuote: "Be faithful, even to the point of death, and I will give you life as your victor's crown.",
    themeColor: '#EAB308',
    bgGradientStart: 'rgba(234, 179, 8, 0.40)',
    description: 'Double-digit devotion milestone.',
  },

  // 3. Day 30 to Month 6 — Rich Gold
  {
    days: 30,
    tier: 'gold',
    title: 'Devoted Scholar',
    subtitle: 'A full month immersed in biblical wisdom and exegesis.',
    verseRef: 'Psalm 119:105',
    verseQuote: 'Your word is a lamp for my feet, a light on my path.',
    themeColor: '#FACC15',
    bgGradientStart: 'rgba(250, 204, 21, 0.40)',
    description: '30 days walking faithfully with the Lord.',
  },
  {
    days: 50,
    tier: 'gold',
    title: 'Pillar of Truth',
    subtitle: 'Consistency that deepens roots and moves mountains.',
    verseRef: '1 Corinthians 15:58',
    verseQuote: 'Stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord.',
    themeColor: '#FACC15',
    bgGradientStart: 'rgba(250, 204, 21, 0.45)',
    description: 'Half a hundred unbroken days of study.',
  },
  {
    days: 100,
    tier: 'gold',
    title: 'Triple Threat',
    subtitle: "If consistency were a crime, you'd be doing life.",
    verseRef: '2 Timothy 4:7',
    verseQuote: 'I have fought the good fight, I have finished the race, I have kept the faith.',
    themeColor: '#FACC15',
    bgGradientStart: 'rgba(250, 204, 21, 0.50)',
    description: '100 days of profound scriptural insight.',
  },

  // 4. Month 6 to 1 Year — Deep Amber Gold
  {
    days: 180,
    tier: 'diamond',
    title: 'Half-Year Covenant',
    subtitle: "Six unbroken months anchored in God's sacred truth.",
    verseRef: 'Hebrews 6:19',
    verseQuote: 'We have this hope as an anchor for the soul, firm and secure.',
    themeColor: '#D97706',
    bgGradientStart: 'rgba(217, 119, 6, 0.40)',
    description: '6 full months of steadfast exegesis.',
  },
  {
    days: 365,
    tier: 'diamond',
    title: 'Canon Completer',
    subtitle: "A complete year walking through every sacred exegesis and covenant.",
    verseRef: 'Psalm 103:17',
    verseQuote: "From everlasting to everlasting the Lord's love is with those who fear him.",
    themeColor: '#D97706',
    bgGradientStart: 'rgba(217, 119, 6, 0.45)',
    description: 'Full calendar year of unbroken devotion.',
  },
];

export interface StreakTierInfo {
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  name: string;
  rangeLabel: string;
  badgeLabel: string;
  color: string;
  bgGradient: string;
}

/**
 * 4 Distinct Yellow/Amber Color Tiers:
 * 1. Day 1 to 6:   bronze  — Light Amber    #FDD223
 * 2. Day 7 to 30:  silver  — Warm Yellow    #EAB308
 * 3. Day 30–179:   gold    — Rich Gold      #FACC15
 * 4. Day 180–365+: diamond — Deep Amber     #D97706
 */
export function getTierForDays(days: number): 'bronze' | 'silver' | 'gold' | 'diamond' | 'celestial' {
  if (days >= 180) return 'diamond';
  if (days >= 30) return 'gold';
  if (days >= 7) return 'silver';
  return 'bronze';
}

export function getTierInfoForDays(days: number): StreakTierInfo {
  if (days >= 180) {
    return {
      tier: 'diamond',
      name: 'Deep Amber',
      rangeLabel: 'Month 6 to 1 Year',
      badgeLabel: 'DEEP AMBER SHIELD • MONTH 6+',
      color: '#D97706',
      bgGradient: 'rgba(217, 119, 6, 0.40)',
    };
  }
  if (days >= 30) {
    return {
      tier: 'gold',
      name: 'Gold',
      rangeLabel: 'Day 30 to Month 6',
      badgeLabel: 'GOLD SHIELD • DAY 30 TO MONTH 6',
      color: '#CA8A04',
      bgGradient: 'rgba(250, 204, 21, 0.40)',
    };
  }
  if (days >= 7) {
    return {
      tier: 'silver',
      name: 'Warm Yellow',
      rangeLabel: 'Day 7 to 30',
      badgeLabel: 'YELLOW SHIELD • DAY 7 TO 30',
      color: '#A16207',
      bgGradient: 'rgba(234, 179, 8, 0.35)',
    };
  }
  return {
    tier: 'bronze',
    name: 'Amber',
    rangeLabel: 'Day 1 to 6',
    badgeLabel: 'AMBER SHIELD • DAY 1 TO 6',
    color: '#B45309',
    bgGradient: 'rgba(253, 210, 35, 0.30)',
  };
}

export function getMilestoneForStreak(streak: number): StreakMilestone {
  const sorted = [...STREAK_MILESTONES].sort((a, b) => b.days - a.days);
  for (const m of sorted) {
    if (streak >= m.days) {
      return m;
    }
  }
  return STREAK_MILESTONES[0];
}

export function getNextMilestone(streak: number): StreakMilestone | null {
  const sorted = [...STREAK_MILESTONES].sort((a, b) => a.days - b.days);
  for (const m of sorted) {
    if (m.days > streak) {
      return m;
    }
  }
  return null;
}
