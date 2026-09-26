/**
 * ContentModerationService - Community Fellowship Harassment & Profanity Filter
 *
 * Implements client-side content moderation according to Ephesians 4:29
 * ("Let no unwholesome talk come out of your mouths, but only what is helpful for building others up")
 * and Philippians 4:8, screening community reflections, comments, and reports.
 */

// Normalized root keywords for harassment, profanity, slurs, and abuse
const RESTRICTED_TERMS = [
  'fuck',
  'shit',
  'asshole',
  'bitch',
  'bastard',
  'cunt',
  'dick',
  'nigger',
  'nigga',
  'faggot',
  'retard',
  'kill yourself',
  'kys',
  'die',
  'hate you',
  'idiot',
  'stupid moron',
  'scam',
  'whore',
  'slut',
  'piss',
];

export interface ModerationResult {
  isClean: boolean;
  detectedTerms: string[];
  reasons: string[];
  sanitizedText: string;
}

export const ContentModerationService = {
  /**
   * Screens content string for prohibited language, hate speech, or harassment.
   */
  screenText: (text: string): ModerationResult => {
    if (!text || !text.trim()) {
      return { isClean: true, detectedTerms: [], reasons: [], sanitizedText: text };
    }

    const lower = text.toLowerCase();
    const detected: string[] = [];
    let sanitized = text;

    for (const term of RESTRICTED_TERMS) {
      // Use boundary-aware regex where applicable to avoid false positives (e.g. "pass", "class")
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');

      if (regex.test(lower)) {
        detected.push(term);
        // Sanitize with asterisks
        sanitized = sanitized.replace(regex, (match) => '*'.repeat(match.length));
      }
    }

    const isClean = detected.length === 0;
    const reasons: string[] = [];
    if (!isClean) {
      reasons.push(
        'Fellowship guidelines require respectful, edifying language (Eph 4:29). Please revise unwholesome terms.'
      );
    }

    return {
      isClean,
      detectedTerms: detected,
      reasons,
      sanitizedText: sanitized,
    };
  },
};
