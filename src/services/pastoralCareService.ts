/**
 * PastoralCareService - Spiritual Distress & Crisis Safety Net
 *
 * Provides compassionate, immediate pastoral care and professional crisis intervention
 * resources whenever scholars search for themes of grief, despair, loneliness, or self-harm.
 * Follows strict 60-30-10 principles, zero emojis, and pure canonical Scripture promises.
 */

export interface CrisisContact {
  id: string;
  name: string;
  region: string;
  phone?: string;
  sms?: string;
  description: string;
  is24x7: boolean;
}

export interface ComfortingScripture {
  reference: string;
  text: string;
  theme: string;
}

export interface DistressAnalysis {
  isTriggered: boolean;
  category?: 'crisis' | 'despair' | 'grief' | 'loneliness';
  matchedKeyword?: string;
}

const DISTRESS_PATTERNS: { category: DistressAnalysis['category']; keywords: string[] }[] = [
  {
    category: 'crisis',
    keywords: [
      'suicide',
      'kill myself',
      'end my life',
      'want to die',
      'cant live',
      "can't live",
      'tired of living',
      'no reason to live',
      'harm myself',
      'self harm',
      'take my life',
    ],
  },
  {
    category: 'despair',
    keywords: [
      'hopeless',
      'no hope',
      'depression',
      'depressed',
      'despair',
      'overwhelmed',
      'worthless',
      'give up',
      'cant go on',
      "can't go on",
      'darkness',
    ],
  },
  {
    category: 'grief',
    keywords: [
      'brokenhearted',
      'broken heart',
      'grief',
      'grieving',
      'lost my',
      'mourning',
      'bereaved',
      'bereavement',
      'sorrow',
      'crying',
    ],
  },
  {
    category: 'loneliness',
    keywords: [
      'alone',
      'lonely',
      'loneliness',
      'nobody cares',
      'abandoned',
      'forsaken',
      'isolated',
      'rejected',
    ],
  },
];

const CRISIS_CONTACTS: CrisisContact[] = [
  {
    id: 'us-988',
    name: '988 Suicide & Crisis Lifeline',
    region: 'United States & Canada',
    phone: '988',
    sms: '988',
    description: 'Free, confidential support available 24/7 by phone or text.',
    is24x7: true,
  },
  {
    id: 'za-sadag',
    name: 'SADAG Suicide Crisis Line',
    region: 'South Africa',
    phone: '0800567567',
    sms: '31393',
    description: 'South African Depression and Anxiety Group 24-hour crisis toll-free helpline.',
    is24x7: true,
  },
  {
    id: 'za-mental',
    name: 'SADAG Mental Health Line',
    region: 'South Africa',
    phone: '0800456789',
    description: 'Confidential counseling and immediate mental health support.',
    is24x7: true,
  },
  {
    id: 'uk-samaritans',
    name: 'Samaritans Crisis Line',
    region: 'United Kingdom & Ireland',
    phone: '116123',
    description: 'Free listening ear round-the-clock for anyone in distress.',
    is24x7: true,
  },
];

const COMFORTING_SCRIPTURES: ComfortingScripture[] = [
  {
    reference: 'Psalm 34:18',
    text: 'The Lord is near to the brokenhearted and saves the crushed in spirit.',
    theme: 'Divine Nearness in Brokenness',
  },
  {
    reference: 'Matthew 11:28',
    text: 'Come to me, all who labor and are heavy laden, and I will give you rest.',
    theme: 'Christ’s Invitation to the Weary',
  },
  {
    reference: 'Romans 8:38-39',
    text: 'For I am sure that neither death nor life, nor angels nor rulers... nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.',
    theme: 'Inseparable Eternal Love',
  },
  {
    reference: 'Jeremiah 29:11',
    text: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.',
    theme: 'Unchanging Promise of Hope',
  },
  {
    reference: 'Psalm 42:11',
    text: 'Why are you cast down, O my soul, and why are you in turmoil within me? Hope in God; for I shall again praise him, my salvation and my God.',
    theme: 'Anchor in Spiritual Despair',
  },
];

export const PastoralCareService = {
  /**
   * Evaluates whether a search query contains indications of crisis, despair, or grief.
   */
  checkQueryForDistress: (query: string): DistressAnalysis => {
    if (!query) return { isTriggered: false };
    const normalized = query.toLowerCase().trim();

    for (const group of DISTRESS_PATTERNS) {
      for (const kw of group.keywords) {
        // Word boundary match or direct phrase containment
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(normalized) || normalized.includes(kw)) {
          return {
            isTriggered: true,
            category: group.category,
            matchedKeyword: kw,
          };
        }
      }
    }

    return { isTriggered: false };
  },

  /**
   * Returns list of professional crisis lifelines and pastoral helplines.
   */
  getCrisisContacts: (): CrisisContact[] => {
    return CRISIS_CONTACTS;
  },

  /**
   * Returns curated list of comforting canonical scriptures.
   */
  getComfortingScriptures: (): ComfortingScripture[] => {
    return COMFORTING_SCRIPTURES;
  },
};

export default PastoralCareService;
