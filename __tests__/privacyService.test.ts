import { PrivacyService } from '../src/services/privacyService';
import { supabase } from '../src/services/supabase';
import { SecureStoreAdapter } from '../src/services/secureStorage';

jest.mock('../src/services/supabase', () => ({
  supabase: { auth: { getSession: jest.fn() }, rpc: jest.fn(), from: jest.fn() },
}));
jest.mock('../src/services/secureStorage', () => ({
  SecureStoreAdapter: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() },
}));

const session = { user: { id: 'user-alpha' } };
const getSession = supabase.auth.getSession as jest.Mock;
const rpc = supabase.rpc as jest.Mock;
const getSecure = SecureStoreAdapter.getItem as jest.Mock;
const setSecure = SecureStoreAdapter.setItem as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  getSession.mockResolvedValue({ data: { session }, error: null });
  getSecure.mockResolvedValue(null);
  setSecure.mockResolvedValue(undefined);
  rpc.mockResolvedValue({ data: null, error: null });
});

describe('Server-enforced privacy settings', () => {
  it('changes a single privacy field through an atomic authenticated RPC', async () => {
    expect(await PrivacyService.setDiscoverableInSearch(true)).toBe(true);
    expect(rpc).toHaveBeenCalledWith('set_my_privacy_preference', {
      p_field: 'is_discoverable', p_enabled: true,
    });
    expect(setSecure).toHaveBeenCalledWith(
      '@exegeomai_discoverable_in_search_v1', 'true',
    );
  });

  it('does not claim success or write public flags when the server rejects the update', async () => {
    rpc.mockResolvedValue({ data: null, error: new Error('forbidden') });
    expect(await PrivacyService.setShowStreaksPublicly(true)).toBe(false);
    expect(setSecure).not.toHaveBeenCalled();
  });

  it('never makes a public preference change without a session', async () => {
    getSession.mockResolvedValue({ data: { session: null }, error: null });
    expect(await PrivacyService.setDiscoverableInSearch(true)).toBe(false);
    expect(rpc).not.toHaveBeenCalled();
  });

  it('fails private when server reads fail even if stale local public flags exist', async () => {
    getSecure.mockResolvedValue('true');
    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({ eq: () => ({
        maybeSingle: async () => ({ data: null, error: new Error('offline') }),
      }) }),
    });
    const preferences = await PrivacyService.getPreferences();
    expect(preferences.isDiscoverableInSearch).toBe(false);
    expect(preferences.showStreaksPublicly).toBe(false);
    expect(preferences.privateStudyNotes).toBe(true);
  });

  it('reads server visibility flags rather than trusting the local device', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({ eq: () => ({
        maybeSingle: async () => ({
          data: {
            is_discoverable: true,
            show_streaks_publicly: false,
            private_study_notes: true,
          },
          error: null,
        }),
      }) }),
    });
    const preferences = await PrivacyService.getPreferences();
    expect(preferences.isDiscoverableInSearch).toBe(true);
    expect(preferences.showStreaksPublicly).toBe(false);
    expect(preferences.privateStudyNotes).toBe(true);
  });
});
