export type InAppNotificationType =
  | 'achievement'
  | 'morning_word'
  | 'midday_affirmation'
  | 'afternoon_strength'
  | 'evening_fellowship'
  | 'nightly_peace'
  | 'system';

export interface InAppNotificationItem {
  id: string;
  type: InAppNotificationType;
  title: string;
  subtitle?: string;
  body: string;
  scriptureRef?: string;
  verseQuote?: string;
  book?: string;
  chapter?: number;
  verse?: number;
  deliveredAtLabel?: string;
  achievementId?: string;
  achievementCategory?: 'streak' | 'bookmark' | 'highlight' | 'share';
  achievementTarget?: number;
  createdAt: string; // ISO format
  isRead: boolean;
  actionRoute?: string;
  actionParams?: Record<string, any>;
}
