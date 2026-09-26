import { SecureStoreAdapter } from './secureStorage';

export const PRIVATE_STUDY_KEY = '@exegeomai_private_study_mode_v1';
export const DISCOVERABLE_IN_SEARCH_KEY = '@exegeomai_discoverable_in_search_v1';
export const SHOW_STREAKS_PUBLICLY_KEY = '@exegeomai_show_streaks_publicly_v1';
export const PRIVATE_STUDY_NOTES_KEY = '@exegeomai_private_study_notes_v1';

export interface ScholarPrivacyPreferences {
  isPrivateStudyMode: boolean;
  isDiscoverableInSearch: boolean;
  showStreaksPublicly: boolean;
  privateStudyNotes: boolean;
}

export const PrivacyService = {
  /**
   * Fetches all scholar privacy settings at once.
   */
  getPreferences: async (): Promise<ScholarPrivacyPreferences> => {
    try {
      const [privateStudy, discoverable, showStreaks, privateNotes] = await Promise.all([
        SecureStoreAdapter.getItem(PRIVATE_STUDY_KEY),
        SecureStoreAdapter.getItem(DISCOVERABLE_IN_SEARCH_KEY),
        SecureStoreAdapter.getItem(SHOW_STREAKS_PUBLICLY_KEY),
        SecureStoreAdapter.getItem(PRIVATE_STUDY_NOTES_KEY),
      ]);

      return {
        isPrivateStudyMode: privateStudy === 'true',
        isDiscoverableInSearch: discoverable === null ? true : discoverable === 'true', // default true
        showStreaksPublicly: showStreaks === null ? true : showStreaks === 'true',     // default true
        privateStudyNotes: privateNotes === 'true',                                    // default false
      };
    } catch (e) {
      console.warn('[PrivacyService] getPreferences error:', e);
      return {
        isPrivateStudyMode: false,
        isDiscoverableInSearch: true,
        showStreaksPublicly: true,
        privateStudyNotes: false,
      };
    }
  },

  /**
   * Toggles Private Study Mode (Incognito Study).
   */
  setPrivateStudyMode: async (enabled: boolean): Promise<boolean> => {
    try {
      await SecureStoreAdapter.setItem(PRIVATE_STUDY_KEY, enabled ? 'true' : 'false');
      return true;
    } catch (e) {
      console.warn('[PrivacyService] setPrivateStudyMode error:', e);
      return false;
    }
  },

  /**
   * Toggles whether the scholar appears in community search results.
   */
  setDiscoverableInSearch: async (enabled: boolean): Promise<boolean> => {
    try {
      await SecureStoreAdapter.setItem(DISCOVERABLE_IN_SEARCH_KEY, enabled ? 'true' : 'false');
      return true;
    } catch (e) {
      console.warn('[PrivacyService] setDiscoverableInSearch error:', e);
      return false;
    }
  },

  /**
   * Toggles whether active daily study streaks and milestone badges are displayed to peer scholars.
   */
  setShowStreaksPublicly: async (enabled: boolean): Promise<boolean> => {
    try {
      await SecureStoreAdapter.setItem(SHOW_STREAKS_PUBLICLY_KEY, enabled ? 'true' : 'false');
      return true;
    } catch (e) {
      console.warn('[PrivacyService] setShowStreaksPublicly error:', e);
      return false;
    }
  },

  /**
   * Toggles whether study notes and bookmarks are strictly local and hidden.
   */
  setPrivateStudyNotes: async (enabled: boolean): Promise<boolean> => {
    try {
      await SecureStoreAdapter.setItem(PRIVATE_STUDY_NOTES_KEY, enabled ? 'true' : 'false');
      return true;
    } catch (e) {
      console.warn('[PrivacyService] setPrivateStudyNotes error:', e);
      return false;
    }
  },
};

export default PrivacyService;
