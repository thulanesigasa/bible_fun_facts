export type AchievementCategory = 'streak' | 'bookmark' | 'highlight' | 'share';
export type AchievementShape = 'hexagon' | 'ribbon' | 'diamond' | 'star';
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'celestial';

export interface AchievementMilestone {
  id: string;
  category: AchievementCategory;
  target: number;
  tier: AchievementTier;
  shape: AchievementShape;
  title: string;
  subtitle: string;
  verseRef: string;
  verseQuote: string;
  badgeLabel: string;
}

// 1. Streak Achievements — 12 Milestones (Shape: Hexagon Shield)
export const STREAK_ACHIEVEMENTS: AchievementMilestone[] = [
  {
    id: 'streak_1',
    category: 'streak',
    target: 1,
    tier: 'bronze',
    shape: 'hexagon',
    title: 'First Step',
    subtitle: 'The journey of 365 days begins with a single scripture.',
    verseRef: 'Philippians 1:6',
    verseQuote: 'He who began a good work in you will carry it on to completion.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_3',
    category: 'streak',
    target: 3,
    tier: 'bronze',
    shape: 'hexagon',
    title: 'Rookie',
    subtitle: 'Is this just fleeting motivation or real dedication?',
    verseRef: 'Galatians 6:9',
    verseQuote: 'Let us not become weary in doing good, for at the proper time we will reap a harvest.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_7',
    category: 'streak',
    target: 7,
    tier: 'silver',
    shape: 'hexagon',
    title: 'Faithful Scribe',
    subtitle: "One full week of sacred consistency in God's Word.",
    verseRef: 'Genesis 2:2',
    verseQuote: 'By the seventh day God had finished the work he had been doing.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_10',
    category: 'streak',
    target: 10,
    tier: 'silver',
    shape: 'hexagon',
    title: 'Getting Serious',
    subtitle: "Still here? It's getting real.",
    verseRef: 'Revelation 2:10',
    verseQuote: "Be faithful, even to the point of death, and I will give you life as your victor's crown.",
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_14',
    category: 'streak',
    target: 14,
    tier: 'silver',
    shape: 'hexagon',
    title: 'Fortnight of Grace',
    subtitle: 'Two continuous weeks abiding in divine truth.',
    verseRef: 'Psalm 90:12',
    verseQuote: 'Teach us to number our days, that we may gain a heart of wisdom.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_21',
    category: 'streak',
    target: 21,
    tier: 'silver',
    shape: 'hexagon',
    title: 'Habit of Truth',
    subtitle: '21 unbroken days forging an unshakeable spiritual rhythm.',
    verseRef: 'Daniel 10:12',
    verseQuote: 'Since the first day that you set your mind to gain understanding, your words were heard.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_30',
    category: 'streak',
    target: 30,
    tier: 'gold',
    shape: 'hexagon',
    title: 'Devoted Scholar',
    subtitle: 'A full month immersed in biblical wisdom and exegesis.',
    verseRef: 'Psalm 119:105',
    verseQuote: 'Your word is a lamp for my feet, a light on my path.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_50',
    category: 'streak',
    target: 50,
    tier: 'gold',
    shape: 'hexagon',
    title: 'Pillar of Truth',
    subtitle: 'Consistency that deepens roots and moves mountains.',
    verseRef: '1 Corinthians 15:58',
    verseQuote: 'Stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_75',
    category: 'streak',
    target: 75,
    tier: 'gold',
    shape: 'hexagon',
    title: 'Unwavering Light',
    subtitle: 'Steadfast perseverance that renews spiritual strength.',
    verseRef: 'Isaiah 40:31',
    verseQuote: 'Those who hope in the Lord will renew their strength. They will soar on wings like eagles.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_100',
    category: 'streak',
    target: 100,
    tier: 'gold',
    shape: 'hexagon',
    title: 'Triple Threat',
    subtitle: "If consistency were a crime, you'd be doing life.",
    verseRef: '2 Timothy 4:7',
    verseQuote: 'I have fought the good fight, I have finished the race, I have kept the faith.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_180',
    category: 'streak',
    target: 180,
    tier: 'diamond',
    shape: 'hexagon',
    title: 'Half-Year Covenant',
    subtitle: "Six unbroken months anchored in God's sacred truth.",
    verseRef: 'Hebrews 6:19',
    verseQuote: 'We have this hope as an anchor for the soul, firm and secure.',
    badgeLabel: 'STREAK',
  },
  {
    id: 'streak_365',
    category: 'streak',
    target: 365,
    tier: 'diamond',
    shape: 'hexagon',
    title: 'Canon Completer',
    subtitle: 'A complete year walking through every sacred exegesis and covenant.',
    verseRef: 'Psalm 103:17',
    verseQuote: "From everlasting to everlasting the Lord's love is with those who fear him.",
    badgeLabel: 'STREAK',
  },
];

// 2. Bookmark Achievements — 12 Milestones (Shape: Ribbon Pennant)
export const BOOKMARK_ACHIEVEMENTS: AchievementMilestone[] = [
  {
    id: 'bookmark_1',
    category: 'bookmark',
    target: 1,
    tier: 'bronze',
    shape: 'ribbon',
    title: 'First Scribe',
    subtitle: 'Saved your first sacred verse into eternal offline remembrance.',
    verseRef: 'Proverbs 3:3',
    verseQuote: 'Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_3',
    category: 'bookmark',
    target: 3,
    tier: 'bronze',
    shape: 'ribbon',
    title: 'Sacred Scroll',
    subtitle: 'Three anchors of divine wisdom preserved in your heart.',
    verseRef: 'Deuteronomy 6:6',
    verseQuote: 'These commandments that I give you today are to be on your hearts.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_5',
    category: 'bookmark',
    target: 5,
    tier: 'bronze',
    shape: 'ribbon',
    title: 'Canon Keeper',
    subtitle: 'Preserved 5 foundational anchors of divine truth.',
    verseRef: 'Psalm 119:11',
    verseQuote: 'I have hidden your word in my heart that I might not sin against you.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_7',
    category: 'bookmark',
    target: 7,
    tier: 'silver',
    shape: 'ribbon',
    title: 'Ark of Wisdom',
    subtitle: 'Seven sacred scriptures gathered for spiritual refuge.',
    verseRef: 'Proverbs 4:4',
    verseQuote: 'Take hold of my words with all your heart; keep my commands, and you will live.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_10',
    category: 'bookmark',
    target: 10,
    tier: 'silver',
    shape: 'ribbon',
    title: 'Wisdom Collector',
    subtitle: 'Compiled a sacred decology of scriptural wisdom.',
    verseRef: 'Proverbs 6:21',
    verseQuote: 'Bind them continually upon your heart; tie them around your neck.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_15',
    category: 'bookmark',
    target: 15,
    tier: 'silver',
    shape: 'ribbon',
    title: 'Living Tablet',
    subtitle: '15 living passages inscribed within your soul.',
    verseRef: '2 Corinthians 3:3',
    verseQuote: 'Written not with ink but with the Spirit of the living God, not on tablets of stone but on tablets of human hearts.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_20',
    category: 'bookmark',
    target: 20,
    tier: 'gold',
    shape: 'ribbon',
    title: 'Theological Vault',
    subtitle: 'A fortress of 20 scriptures guiding your steps.',
    verseRef: 'Psalm 37:31',
    verseQuote: 'The law of their God is in their hearts; their feet do not slip.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_25',
    category: 'bookmark',
    target: 25,
    tier: 'gold',
    shape: 'ribbon',
    title: 'Scripture Custodian',
    subtitle: 'Built a sanctuary of 25 living biblical passages.',
    verseRef: 'Colossians 3:16',
    verseQuote: 'Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_35',
    category: 'bookmark',
    target: 35,
    tier: 'gold',
    shape: 'ribbon',
    title: 'Guardian of Truth',
    subtitle: 'Safeguarding 35 divine revelations in your study treasury.',
    verseRef: '1 Timothy 6:20',
    verseQuote: 'Guard what has been entrusted to your care.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_50',
    category: 'bookmark',
    target: 50,
    tier: 'diamond',
    shape: 'ribbon',
    title: 'Treasury of Truth',
    subtitle: 'A monumental library of 50 preserved theological revelations.',
    verseRef: 'Matthew 13:52',
    verseQuote: 'Every teacher of the law instructed about the kingdom of heaven brings out of his storeroom new treasures as well as old.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_75',
    category: 'bookmark',
    target: 75,
    tier: 'diamond',
    shape: 'ribbon',
    title: 'Monument of Faith',
    subtitle: '75 stones of remembrance built upon biblical promises.',
    verseRef: 'Joshua 4:7',
    verseQuote: 'These stones are to be a memorial to the people of Israel forever.',
    badgeLabel: 'BOOKMARK',
  },
  {
    id: 'bookmark_100',
    category: 'bookmark',
    target: 100,
    tier: 'diamond',
    shape: 'ribbon',
    title: 'Grand Anthology',
    subtitle: 'A master collection of 100 preserved biblical verses.',
    verseRef: 'Psalm 119:162',
    verseQuote: 'I rejoice in your promise like one who finds great spoil.',
    badgeLabel: 'BOOKMARK',
  },
];

// 3. Highlight Achievements — 12 Milestones (Shape: Radiant Diamond)
export const HIGHLIGHT_ACHIEVEMENTS: AchievementMilestone[] = [
  {
    id: 'highlight_1',
    category: 'highlight',
    target: 1,
    tier: 'bronze',
    shape: 'diamond',
    title: 'Golden Quill',
    subtitle: 'Illuminated your first passage with contemplative study.',
    verseRef: 'Psalm 119:18',
    verseQuote: 'Open my eyes that I may see wonderful things in your law.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_3',
    category: 'highlight',
    target: 3,
    tier: 'bronze',
    shape: 'diamond',
    title: 'First Ray',
    subtitle: 'Three verses enlightened with deep scriptural radiance.',
    verseRef: 'Psalm 19:8',
    verseQuote: 'The commands of the Lord are radiant, giving light to the eyes.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_5',
    category: 'highlight',
    target: 5,
    tier: 'bronze',
    shape: 'diamond',
    title: 'Illuminator',
    subtitle: 'Brought doctrinal clarity to 5 verses through faithful exegesis.',
    verseRef: 'Psalm 119:105',
    verseQuote: 'Your word is a lamp for my feet, a light on my path.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_7',
    category: 'highlight',
    target: 7,
    tier: 'silver',
    shape: 'diamond',
    title: 'Lamp of the Lord',
    subtitle: 'Seven verses illuminated by the Holy Spirit.',
    verseRef: 'Proverbs 20:27',
    verseQuote: 'The human spirit is the lamp of the Lord that sheds light on one’s inmost being.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_10',
    category: 'highlight',
    target: 10,
    tier: 'silver',
    shape: 'diamond',
    title: 'Truth Seeker',
    subtitle: 'Studied and marked 10 profound theological pillars.',
    verseRef: '2 Timothy 2:15',
    verseQuote: 'Do your best to present yourself to God as one approved, a worker who correctly handles the word of truth.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_15',
    category: 'highlight',
    target: 15,
    tier: 'silver',
    shape: 'diamond',
    title: 'Berean Mind',
    subtitle: 'Examines the Scriptures daily with noble discernment.',
    verseRef: 'Acts 17:11',
    verseQuote: 'They received the message with great eagerness and examined the Scriptures every day.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_20',
    category: 'highlight',
    target: 20,
    tier: 'gold',
    shape: 'diamond',
    title: 'Unfolding Light',
    subtitle: '20 highlighted revelations imparting sacred understanding.',
    verseRef: 'Psalm 119:130',
    verseQuote: 'The unfolding of your words gives light; it imparts understanding to the simple.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_25',
    category: 'highlight',
    target: 25,
    tier: 'gold',
    shape: 'diamond',
    title: "Theologian's Mind",
    subtitle: '25 illuminated gems of sacred insight and doctrinal reflection.',
    verseRef: 'Romans 15:4',
    verseQuote: 'Everything that was written in the past was written to teach us, so that through the endurance taught in the Scriptures and the encouragement they provide we might have hope.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_35',
    category: 'highlight',
    target: 35,
    tier: 'gold',
    shape: 'diamond',
    title: 'Sound Doctrine',
    subtitle: '35 verses marked with exegetical rigor and reverence.',
    verseRef: 'Titus 2:1',
    verseQuote: 'You, however, must teach what is appropriate to sound doctrine.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_50',
    category: 'highlight',
    target: 50,
    tier: 'diamond',
    shape: 'diamond',
    title: 'Living Epigram',
    subtitle: 'A golden Bible rich with 50 illuminated revelations.',
    verseRef: 'Hebrews 4:12',
    verseQuote: 'For the word of God is alive and active. Sharper than any double-edged sword.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_75',
    category: 'highlight',
    target: 75,
    tier: 'diamond',
    shape: 'diamond',
    title: 'Prophetic Word',
    subtitle: '75 passages shining as a light in a dark place.',
    verseRef: '2 Peter 1:19',
    verseQuote: 'We also have the prophetic message as something completely reliable, and you will do well to pay attention to it, as to a light shining in a dark place.',
    badgeLabel: 'HIGHLIGHT',
  },
  {
    id: 'highlight_100',
    category: 'highlight',
    target: 100,
    tier: 'diamond',
    shape: 'diamond',
    title: 'Radiant Scripture',
    subtitle: 'A centurion masterwork of 100 highlighted biblical truths.',
    verseRef: 'John 8:12',
    verseQuote: 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.',
    badgeLabel: 'HIGHLIGHT',
  },
];

// 4. Share Achievements — 12 Milestones (Shape: Compass Star / Heraldic Seal)
export const SHARE_ACHIEVEMENTS: AchievementMilestone[] = [
  {
    id: 'share_1',
    category: 'share',
    target: 1,
    tier: 'bronze',
    shape: 'star',
    title: 'Herald of Truth',
    subtitle: 'Shared your first biblical insight or milestone with the world.',
    verseRef: 'Mark 16:15',
    verseQuote: 'Go into all the world and preach the gospel to all creation.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_3',
    category: 'share',
    target: 3,
    tier: 'bronze',
    shape: 'star',
    title: 'Good Tidings',
    subtitle: 'Carried the joy of the gospel to three seeking souls.',
    verseRef: 'Luke 2:10',
    verseQuote: 'I bring you good news that will cause great joy for all the people.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_5',
    category: 'share',
    target: 5,
    tier: 'bronze',
    shape: 'star',
    title: 'Evangelist',
    subtitle: "Carried the light of God's Word across 5 digital transmissions.",
    verseRef: 'Isaiah 52:7',
    verseQuote: 'How beautiful on the mountains are the feet of those who bring good news, who proclaim peace.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_7',
    category: 'share',
    target: 7,
    tier: 'silver',
    shape: 'star',
    title: 'City on a Hill',
    subtitle: 'Seven shares shining truth that cannot be hidden.',
    verseRef: 'Matthew 5:14',
    verseQuote: 'You are the light of the world. A town built on a hill cannot be hidden.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_10',
    category: 'share',
    target: 10,
    tier: 'silver',
    shape: 'star',
    title: 'Voice of Hope',
    subtitle: '10 shares sowing the seeds of truth and encouragement.',
    verseRef: 'Matthew 5:16',
    verseQuote: 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_15',
    category: 'share',
    target: 15,
    tier: 'silver',
    shape: 'star',
    title: 'Ambassador',
    subtitle: "Representing Christ's kingdom through 15 shared messages.",
    verseRef: '2 Corinthians 5:20',
    verseQuote: 'We are therefore Christ’s ambassadors, as though God were making his appeal through us.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_20',
    category: 'share',
    target: 20,
    tier: 'gold',
    shape: 'star',
    title: 'Sower of Seeds',
    subtitle: '20 shares scattering the incorruptible seed of God’s Word.',
    verseRef: 'Matthew 13:23',
    verseQuote: 'The seed falling on good soil refers to someone who hears the word and understands it. This is the one who produces a crop.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_25',
    category: 'share',
    target: 25,
    tier: 'gold',
    shape: 'star',
    title: 'Beacon of Light',
    subtitle: 'Proclaimed 25 sacred messages to uplift and instruct seekers.',
    verseRef: 'Daniel 12:3',
    verseQuote: 'Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness, like the stars for ever.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_35',
    category: 'share',
    target: 35,
    tier: 'gold',
    shape: 'star',
    title: 'Trumpet of Zion',
    subtitle: 'Sounding the glorious alarm of biblical hope across 35 shares.',
    verseRef: 'Joel 2:1',
    verseQuote: 'Blow the trumpet in Zion; sound the alarm on my holy hill.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_50',
    category: 'share',
    target: 50,
    tier: 'diamond',
    shape: 'star',
    title: 'Apostolic Reach',
    subtitle: '50 shares extending biblical exegesis to the ends of the digital world.',
    verseRef: 'Romans 10:18',
    verseQuote: 'Their voice has gone out into all the earth, their words to the ends of the world.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_75',
    category: 'share',
    target: 75,
    tier: 'diamond',
    shape: 'star',
    title: 'Great Commission',
    subtitle: '75 acts of evangelistic faithfulness making disciples of truth.',
    verseRef: 'Matthew 28:19',
    verseQuote: 'Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
    badgeLabel: 'SHARE',
  },
  {
    id: 'share_100',
    category: 'share',
    target: 100,
    tier: 'diamond',
    shape: 'star',
    title: 'Voice in Wilderness',
    subtitle: '100 digital proclamations preparing the way of the Lord.',
    verseRef: 'Isaiah 40:3',
    verseQuote: 'A voice of one calling: "In the wilderness prepare the way for the Lord; make straight in the desert a highway for our God."',
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

export function getCategorySubtitle(category: AchievementCategory): string {
  switch (category) {
    case 'streak':
      return 'Daily unbroken consistency walking in biblical truth.';
    case 'bookmark':
      return 'Foundational verses gathered in your offline heart.';
    case 'highlight':
      return 'Illuminated insights studied with theological care.';
    case 'share':
      return 'Sacred proclamations spreading truth across the world.';
  }
}

export function getCategoryUnit(category: AchievementCategory, count: number): string {
  switch (category) {
    case 'streak':
      return count === 1 ? 'day' : 'days';
    case 'bookmark':
      return count === 1 ? 'saved' : 'saved';
    case 'highlight':
      return count === 1 ? 'mark' : 'marks';
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

export function getTotalAchievementsProgress(userStats: {
  streak: number;
  bookmarksCount: number;
  highlightsCount: number;
  sharesCount: number;
}) {
  const streakProgress = getCategoryProgress('streak', userStats.streak);
  const bookmarkProgress = getCategoryProgress('bookmark', userStats.bookmarksCount);
  const highlightProgress = getCategoryProgress('highlight', userStats.highlightsCount);
  const shareProgress = getCategoryProgress('share', userStats.sharesCount);

  const totalUnlocked =
    streakProgress.unlockedCount +
    bookmarkProgress.unlockedCount +
    highlightProgress.unlockedCount +
    shareProgress.unlockedCount;

  const totalAvailable = 48; // 12 * 4

  return {
    totalUnlocked,
    totalAvailable,
    percent: Math.min(100, Math.round((totalUnlocked / totalAvailable) * 100)),
  };
}
