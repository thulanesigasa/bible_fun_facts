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
  {
    days: 1,
    tier: 'bronze',
    title: 'First Step',
    subtitle: 'The journey of 365 days begins with a single scripture.',
    verseRef: 'Philippians 1:6',
    verseQuote: 'He who began a good work in you will carry it on to completion.',
    themeColor: '#D97706',
    bgGradientStart: 'rgba(217, 119, 6, 0.35)',
    description: 'Began the sacred walk of daily exegesis.',
  },
  {
    days: 3,
    tier: 'bronze',
    title: 'Rookie',
    subtitle: 'Is this just fleeting motivation or real dedication?',
    verseRef: 'Galatians 6:9',
    verseQuote: 'Let us not become weary in doing good, for at the proper time we will reap a harvest.',
    themeColor: '#D97706',
    bgGradientStart: 'rgba(217, 119, 6, 0.45)',
    description: '3 days of unbroken daily scripture study.',
  },
  {
    days: 7,
    tier: 'silver',
    title: 'Faithful Scribe',
    subtitle: "One full week of sacred consistency in God's Word.",
    verseRef: 'Genesis 2:2',
    verseQuote: 'By the seventh day God had finished the work he had been doing.',
    themeColor: '#94A3B8',
    bgGradientStart: 'rgba(148, 163, 184, 0.40)',
    description: '7 days walking in theological truth.',
  },
  {
    days: 10,
    tier: 'silver',
    title: 'Getting Serious',
    subtitle: "Still here? It's getting real.",
    verseRef: 'Revelation 2:10',
    verseQuote: 'Be faithful, even to the point of death, and I will give you life as your victor’s crown.',
    themeColor: '#94A3B8',
    bgGradientStart: 'rgba(148, 163, 184, 0.45)',
    description: 'Double-digit devotion milestone.',
  },
  {
    days: 30,
    tier: 'gold',
    title: 'Devoted Scholar',
    subtitle: 'A full month immersed in biblical wisdom and exegesis.',
    verseRef: 'Psalm 119:105',
    verseQuote: 'Your word is a lamp for my feet, a light on my path.',
    themeColor: '#FDD223',
    bgGradientStart: 'rgba(253, 210, 35, 0.45)',
    description: '30 days walking faithfully with the Lord.',
  },
  {
    days: 50,
    tier: 'gold',
    title: 'Pillar of Truth',
    subtitle: 'Consistency that deepens roots and moves mountains.',
    verseRef: '1 Corinthians 15:58',
    verseQuote: 'Stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord.',
    themeColor: '#FDD223',
    bgGradientStart: 'rgba(253, 210, 35, 0.50)',
    description: 'Half a hundred unbroken days of study.',
  },
  {
    days: 100,
    tier: 'diamond',
    title: 'Triple Threat',
    subtitle: "If consistency were a crime, you'd be doing life.",
    verseRef: '2 Timothy 4:7',
    verseQuote: 'I have fought the good fight, I have finished the race, I have kept the faith.',
    themeColor: '#38BDF8',
    bgGradientStart: 'rgba(56, 189, 248, 0.45)',
    description: '100 days of profound scriptural insight.',
  },
  {
    days: 365,
    tier: 'celestial',
    title: 'Canon Completer',
    subtitle: 'A complete year walking through every sacred exegesis and covenant.',
    verseRef: 'Psalm 103:17',
    verseQuote: 'From everlasting to everlasting the Lord’s love is with those who fear him.',
    themeColor: '#FDD223',
    bgGradientStart: 'rgba(245, 158, 11, 0.50)',
    description: 'Full calendar year of unbroken devotion.',
  },
];

export function getTierForDays(days: number): 'bronze' | 'silver' | 'gold' | 'diamond' | 'celestial' {
  if (days >= 365) return 'celestial';
  if (days >= 100) return 'diamond';
  if (days >= 30) return 'gold';
  if (days >= 7) return 'silver';
  return 'bronze';
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
