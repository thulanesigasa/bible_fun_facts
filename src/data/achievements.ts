import { STREAK_MILESTONES, StreakMilestone } from './streakMilestones';

export type AchievementCategory = 'streak' | 'bookmark' | 'highlight' | 'share';
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface AchievementMilestone {
  id: string;
  category: AchievementCategory;
  target: number;
  tier: AchievementTier;
  title: string;
  subtitle: string;
  verseRef: string;
  verseQuote: string;
  badgeLabel: string;
}

// Convert StreakMilestones into unified AchievementMilestones
export const STREAK_ACHIEVEMENTS: AchievementMilestone[] = STREAK_MILESTONES.map((m) => ({
  id: `streak_${m.days}`,
  category: 'streak',
  target: m.days,
  tier: (m.tier === 'celestial' ? 'diamond' : m.tier) as AchievementTier,
  title: m.title,
  subtitle: m.subtitle,
  verseRef: m.verseRef || 'Philippians 1:6',
  verseQuote: m.verseQuote || 'He who began a good work in you will carry it on to completion.',
  badgeLabel: 'STREAK',
}));

// Bookmark achievements (Saved scriptures)
export const BOOKMARK_ACHIEVEMENTS: AchievementMilestone[] = [
  {
    id: 'bookmark_1',
    category: 'bookmark',
    target: 1,
    tier: 'bronze',
    title: 'First Scribe',
    subtitle: 'Saved your first sacred verse into eternal offline remembrance.',
    verseRef: 'Proverbs 3:3',
    verseQuote: 'Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_5',
    category: 'bookmark',
    target: 5,
    tier: 'bronze',
    title: 'Canon Keeper',
    subtitle: 'Preserved 5 foundational anchors of divine truth.',
    verseRef: 'Psalm 119:11',
    verseQuote: 'I have hidden your word in my heart that I might not sin against you.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_10',
    category: 'bookmark',
    target: 10,
    tier: 'silver',
    title: 'Wisdom Collector',
    subtitle: 'Compiled a sacred decology of scriptural wisdom.',
    verseRef: 'Proverbs 6:21',
    verseQuote: 'Bind them continually upon your heart; tie them around your neck.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_25',
    category: 'bookmark',
    target: 25,
    tier: 'gold',
    title: 'Scripture Custodian',
    subtitle: 'Built a sanctuary of 25 living biblical passages.',
    verseRef: 'Psalm 37:31',
    verseQuote: 'The law of their God is in their hearts; their feet do not slip.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_50',
    category: 'bookmark',
    target: 50,
    tier: 'diamond',
    title: 'Treasury of Truth',
    subtitle: 'A monumental library of 50 preserved theological revelations.',
    verseRef: 'Matthew 13:52',
    verseQuote: 'Every teacher of the law instructed about the kingdom of heaven brings out of his storeroom new treasures as well as old.',
    badgeLabel: 'BOOKMARK',
  },
];

// Highlight achievements (Highlighted verses in reader)
export const HIGHLIGHT_ACHIEVEMENTS: AchievementMilestone[] = [
  {
    id: 'highlight_1',
    category: 'highlight',
    target: 1,
    tier: 'bronze',
    title: 'Golden Quill',
    subtitle: 'Illuminated your first passage with contemplative study.',
    verseRef: 'Psalm 119:18',
    verseQuote: 'Open my eyes that I may see wonderful things in your law.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_5',
    category: 'highlight',
    target: 5,
    tier: 'bronze',
    title: 'Illuminator',
    subtitle: 'Brought doctrinal clarity to 5 verses through faithful exegesis.',
    verseRef: 'Psalm 119:105',
    verseQuote: 'Your word is a lamp for my feet, a light on my path.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_10',
    category: 'highlight',
    target: 10,
    tier: 'silver',
    title: 'Truth Seeker',
    subtitle: 'Studied and marked 10 profound theological pillars.',
    verseRef: '2 Timothy 2:15',
    verseQuote: 'Do your best to present yourself to God as one approved, a worker who correctly handles the word of truth.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_25',
    category: 'highlight',
    target: 25,
    tier: 'gold',
    title: "Theologian's Mind",
    subtitle: '25 illuminated gems of sacred insight and doctrinal reflection.',
    verseRef: 'Psalm 119:130',
    verseQuote: 'The unfolding of your words gives light; it imparts understanding to the simple.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_50',
    category: 'highlight',
    target: 50,
    tier: 'diamond',
    title: 'Living Epigram',
    subtitle: 'A golden Bible rich with 50 illuminated revelations.',
    verseRef: 'Colossians 3:16',
    verseQuote: 'Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom.',
    badgeLabel: 'HIGHLIGHT',
  },
];

// Share achievements (Facts, Scriptures, WOTD, or Milestones shared)
export const SHARE_ACHIEVEMENTS: AchievementMilestone[] = [
  {
    id: 'share_1',
    category: 'share',
    target: 1,
    tier: 'bronze',
    title: 'Herald of Truth',
    subtitle: 'Shared your first biblical insight or milestone with the world.',
    verseRef: 'Mark 16:15',
    verseQuote: 'Go into all the world and preach the gospel to all creation.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_5',
    category: 'share',
    target: 5,
    tier: 'bronze',
    title: 'Evangelist',
    subtitle: "Carried the light of God's Word across 5 digital transmissions.",
    verseRef: 'Isaiah 52:7',
    verseQuote: 'How beautiful on the mountains are the feet of those who bring good news, who proclaim peace.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_10',
    category: 'share',
    target: 10,
    tier: 'silver',
    title: 'Voice of Hope',
    subtitle: '10 shares sowing the seeds of truth and encouragement.',
    verseRef: 'Matthew 5:16',
    verseQuote: 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_25',
    category: 'share',
    target: 25,
    tier: 'gold',
    title: 'Beacon of Light',
    subtitle: 'Proclaimed 25 sacred messages to uplift and instruct seekers.',
    verseRef: 'Daniel 12:3',
    verseQuote: 'Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness, like the stars for ever.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_50',
    category: 'share',
    target: 50,
    tier: 'diamond',
    title: 'Apostolic Reach',
    subtitle: '50 shares extending biblical exegesis to the ends of the digital world.',
    verseRef: 'Romans 10:18',
    verseQuote: 'Their voice has gone out into all the earth, their words to the ends of the world.',
    badgeLabel: 'SHARE',
  },
];

export const ALL_ACHIEVEMENTS: Record<AchievementCategory, AchievementMilestone[]> = {
  streak: STREAK_ACHIEVEMENTS,
  bookmark: BOOKMARK_ACHIEVEMENTS,
  highlight: HIGHLIGHT_ACHIEVEMENTS,
  share: SHARE_ACHIEVEMENTS,
};

export function getAchievementsForCategory(category: AchievementCategory): AchievementMilestone[] {
  return ALL_ACHIEVEMENTS[category] || STREAK_ACHIEVEMENTS;
}

export function getCategoryTitle(category: AchievementCategory): string {
  switch (category) {
    case 'streak':
      return 'Daily Streak';
    case 'bookmark':
      return 'Bookmarks';
    case 'highlight':
      return 'Highlights';
    case 'share':
      return 'Shares';
  }
}

export function getCategoryUnit(category: AchievementCategory, count: number): string {
  switch (category) {
    case 'streak':
      return count === 1 ? 'day' : 'days';
    case 'bookmark':
      return count === 1 ? 'bookmark' : 'bookmarks';
    case 'highlight':
      return count === 1 ? 'highlight' : 'highlights';
    case 'share':
      return count === 1 ? 'share' : 'shares';
  }
}

export function getCategoryProgress(category: AchievementCategory, userCount: number) {
  const milestones = getAchievementsForCategory(category);
  const unlocked = milestones.filter((m) => userCount >= m.target);
  const next = milestones.find((m) => m.target > userCount) || null;
  const current = unlocked.length > 0 ? unlocked[unlocked.length - 1] : milestones[0];

  const total = milestones.length;
  const unlockedCount = unlocked.length;
  const progressPercent = total > 0 ? Math.min(100, Math.round((unlockedCount / total) * 100)) : 0;

  return {
    milestones,
    currentMilestone: current,
    nextMilestone: next,
    unlockedCount,
    totalCount: total,
    progressPercent,
  };
}
