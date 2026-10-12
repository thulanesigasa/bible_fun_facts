import { supabase } from './supabase';
import { SecureStoreAdapter } from './secureStorage';

export const PRIVATE_STUDY_KEY = '@exegeomai_private_study_mode_v1';
const PRIVATE_STUDY_ACCOUNT_KEY = (userId: string) =>
  `@exegeomai_private_study_mode_v2:${userId}`;
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
   * A public privacy toggle only takes effect after the server confirms it.
   * Offline writes are not silently represented as successful public changes.
   */
  updateServerPreference: async (field: 'is_discoverable' | 'show_streaks_publicly' | 'private_study_notes', enabled: boolean): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return false;
      const { error } = await supabase.rpc('set_my_privacy_preference', {
        p_field: field,
        p_enabled: enabled,
      });
      return !error;
    } catch {
      return false;
    }
  },

  /**
   * Fetches all scholar privacy settings at once.
   */
  getPreferences: async (): Promise<ScholarPrivacyPreferences> => {
    try {
      // Server state is authoritative for public visibility; private-study
      // mode is local but scoped to the immutable authenticated account ID.
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        return {
          isPrivateStudyMode: false,
          isDiscoverableInSearch: true,
          showStreaksPublicly: true,
          privateStudyNotes: false,
        };
      }
      const accountPrivate = await SecureStoreAdapter.getItem(
        PRIVATE_STUDY_ACCOUNT_KEY(session.user.id)
      );
      // A prior device-wide TRUE must be retained conservatively until the
      // account explicitly toggles. Never migrate a device-wide FALSE.
      const legacyPrivate = accountPrivate === null
        ? await SecureStoreAdapter.getItem(PRIVATE_STUDY_KEY)
        : null;
      const privateStudy = accountPrivate ?? (legacyPrivate === 'true' ? 'true' : 'false');
      const { data, error } = await supabase
        .from('user_privacy_settings')
        .select('is_discoverable, show_streaks_publicly, private_study_notes')
        .eq('user_id', session.user.id)
        .maybeSingle();
      if (error || !data) {
        return {
          isPrivateStudyMode: privateStudy === 'true',
          isDiscoverableInSearch: false,
          showStreaksPublicly: false,
          privateStudyNotes: true,
        };
      }
      return {
        isPrivateStudyMode: privateStudy === 'true',
        isDiscoverableInSearch: data.is_discoverable === true,
        showStreaksPublicly: data.show_streaks_publicly === true,
        privateStudyNotes: data.private_study_notes !== false,
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
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user?.id) return false;
      await SecureStoreAdapter.setItem(
        PRIVATE_STUDY_ACCOUNT_KEY(session.user.id), enabled ? 'true' : 'false'
      );
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
      const confirmed = await PrivacyService.updateServerPreference('is_discoverable', enabled);
      if (!confirmed) return false;
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
      const confirmed = await PrivacyService.updateServerPreference('show_streaks_publicly', enabled);
      if (!confirmed) return false;
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
      const confirmed = await PrivacyService.updateServerPreference('private_study_notes', enabled);
      if (!confirmed) return false;
      await SecureStoreAdapter.setItem(PRIVATE_STUDY_NOTES_KEY, enabled ? 'true' : 'false');
      return true;
    } catch (e) {
      console.warn('[PrivacyService] setPrivateStudyNotes error:', e);
      return false;
    }
  },
};

export default PrivacyService;
