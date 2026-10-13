/**
 * Ministry & Church Directory Service — Unit Tests
 *
 * Tests use a Supabase mock so no real network calls are made.
 * The canonical seed data (God Embassy, Christ Embassy, Spirit Embassy,
 * ECG The Jesus Nation Church) is reflected in the mock responses.
 *
 * NOTE: @react-native-async-storage/async-storage is mocked here because
 * geoService.ts imports it for online search result caching. Without this
 * mock Jest fails with "Must use import to load ES Module" since the package
 * ships as ESM and ts-jest runs in CommonJS mode.
 */

// ---------------------------------------------------------------------------
// Mock AsyncStorage (required by geoService.ts online caching path)
// ---------------------------------------------------------------------------
let mockStorage: Record<string, string> = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async (key: string) => mockStorage[key] || null),
  setItem: jest.fn(async (key: string, value: string) => {
    mockStorage[key] = value;
  }),
  removeItem: jest.fn(async (key: string) => {
    delete mockStorage[key];
  }),
  clear: jest.fn(async () => {
    mockStorage = {};
  }),
}));

// ---------------------------------------------------------------------------
// Mock React Native (required in ts-jest Node CommonJS mode)
// ---------------------------------------------------------------------------
jest.mock('react-native', () => ({
  Platform: {
    OS: 'android',
    select: jest.fn((obj: any) => obj.android ?? obj.default),
  },
  Linking: {
    openURL: jest.fn(async () => true),
  },
  StyleSheet: {
    create: jest.fn((styles: any) => styles),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
  },
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  TextInput: 'TextInput',
  ScrollView: 'ScrollView',
  KeyboardAvoidingView: 'KeyboardAvoidingView',
  Modal: 'Modal',
  Image: 'Image',
  ActivityIndicator: 'ActivityIndicator',
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: 'SafeAreaView',
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const mockMinistries = [

  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'God Embassy',
    founder: 'Pastor Sunday Adelaja',
    headquarters: 'Kyiv',
    headquarters_country: 'Ukraine',
    description: 'Embassy of the Blessed Kingdom of God for All Nations.',
    category: 'Apostolic & Kingdom Reformation',
    branches_count: 18,
    homecells_count: 64,
    website: 'https://godembassy.org',
    contact_email: 'contact@godembassy.org',
    contact_phone: '+380 44 501 0101',
    is_preadded: true,
    created_at: '1994-02-06T00:00:00Z',
    updated_at: '1994-02-06T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Christ Embassy',
    founder: 'Rev. Dr. Chris Oyakhilome',
    headquarters: 'Lagos',
    headquarters_country: 'Nigeria',
    description: 'Believers LoveWorld Inc.',
    category: 'Word of Faith & Evangelism',
    branches_count: 145,
    homecells_count: 420,
    website: 'https://christembassy.org',
    contact_email: 'info@loveworld360.com',
    contact_phone: '+234 1 888 8888',
    is_preadded: true,
    created_at: '1987-05-10T00:00:00Z',
    updated_at: '1987-05-10T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Spirit Embassy',
    founder: 'Prophet Uebert Angel',
    headquarters: 'London',
    headquarters_country: 'United Kingdom',
    description: 'The GoodNews Church.',
    category: 'Prophetic & Grace Revelation',
    branches_count: 52,
    homecells_count: 180,
    website: 'https://spiritembassy.org',
    contact_email: 'info@spiritembassy.com',
    contact_phone: '+44 207 123 4567',
    is_preadded: true,
    created_at: '2007-03-15T00:00:00Z',
    updated_at: '2007-03-15T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'ECG The Jesus Nation Church',
    founder: 'Prophet Shepherd Bushiri',
    headquarters: 'Lilongwe',
    headquarters_country: 'Malawi',
    description: 'Enlightened Christian Gathering.',
    category: 'Prophetic & Apostolic Community',
    branches_count: 96,
    homecells_count: 310,
    website: 'https://jesusnation.org',
    contact_email: 'info@ecgchurch.org',
    contact_phone: '+265 1 777 999',
    is_preadded: true,
    created_at: '2010-09-24T00:00:00Z',
    updated_at: '2010-09-24T00:00:00Z',
  },
];

const mockBranches = [
  {
    id: 'b-001',
    ministry_id: '00000000-0000-0000-0000-000000000001',
    ministry_name: 'God Embassy',
    name: 'God Embassy Johannesburg Central',
    type: 'branch',
    leader_name: 'Pastor David Ndlovu',
    contact_number: '+27 11 402 1100',
    contact_email: null,
    town: 'Johannesburg',
    province: 'Gauteng',
    country: 'South Africa',
    postal_code: '2000',
    address: '88 Marshall Street, Johannesburg',
    meeting_times: 'Sundays: 09:30 AM',
    latitude: -26.2041,
    longitude: 28.0473,
    is_preadded: true,
    created_at: '2023-01-15T00:00:00Z',
    updated_at: '2023-01-15T00:00:00Z',
  },
  {
    id: 'b-002',
    ministry_id: '00000000-0000-0000-0000-000000000001',
    ministry_name: 'God Embassy',
    name: 'Sandton Kingdom Cell #1',
    type: 'homecell',
    leader_name: 'Deacon Mark Sibanda',
    contact_number: '+27 82 555 1234',
    contact_email: null,
    town: 'Sandton',
    province: 'Gauteng',
    country: 'South Africa',
    postal_code: '2196',
    address: '14 Grayston Drive, Sandton',
    meeting_times: 'Tuesdays: 19:00 PM',
    latitude: -26.1076,
    longitude: 28.0567,
    is_preadded: true,
    created_at: '2023-03-20T00:00:00Z',
    updated_at: '2023-03-20T00:00:00Z',
  },
  {
    id: 'b-003',
    ministry_id: '00000000-0000-0000-0000-000000000003',
    ministry_name: 'Spirit Embassy',
    name: 'Spirit Embassy Johannesburg',
    type: 'branch',
    leader_name: 'Pastor Felix Angel',
    contact_number: '+27 11 784 9000',
    contact_email: null,
    town: 'Sandton',
    province: 'Gauteng',
    country: 'South Africa',
    postal_code: '2196',
    address: 'Rivonia Road & 5th Street, Sandton CBD',
    meeting_times: 'Sundays: 10:00 AM',
    latitude: -26.1076,
    longitude: 28.0567,
    is_preadded: true,
    created_at: '2021-08-01T00:00:00Z',
    updated_at: '2021-08-01T00:00:00Z',
  },
];




const newMinistryRow = {
  id: 'new-uuid-001',
  name: 'Grace Apostolic Fellowship',
  founder: 'Pastor Joshua Mthembu',
  headquarters: 'Sandton',
  headquarters_country: 'South Africa',
  description: 'Kingdom apostolic discipleship community.',
  category: 'Apostolic & Kingdom Reformation',
  branches_count: 0,
  homecells_count: 0,
  website: null,
  contact_email: null,
  contact_phone: null,
  is_preadded: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const newBranchRow = {
  id: 'new-branch-001',
  ministry_id: '00000000-0000-0000-0000-000000000001',
  ministry_name: 'God Embassy',
  name: 'Centurion Kingdom Center',
  type: 'branch',
  leader_name: 'Pastor Eric Sithole',
  contact_number: '+27 12 660 0000',
  contact_email: null,
  town: 'Centurion',
  province: 'Gauteng',
  country: 'South Africa',
  postal_code: '0157',
  address: 'John Vorster Drive, Centurion',
  meeting_times: 'Sundays: 09:00 AM',
  latitude: -25.8603,
  longitude: 28.1894,
  is_preadded: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// ---------------------------------------------------------------------------
// Chainable Supabase query mock factory
// Supports: .select().eq().order().order() and .select().order().order()
// and .select().eq().single() and .insert().select().single()
// ---------------------------------------------------------------------------
function makeChain(
  data: unknown[],
  singleData: unknown | null = null
): any {
  const chain: any = {
    order: jest.fn(() => chain),
    eq: jest.fn(() => chain),
    single: jest.fn(async () => ({ data: singleData ?? data[0] ?? null, error: null })),
    // Make the chain itself thenable so `await query` resolves
    then: (resolve: (v: unknown) => void) =>
      Promise.resolve({ data, error: null }).then(resolve),
  };
  return chain;
}

jest.mock('../src/services/supabase', () => ({
  supabase: {
    from: jest.fn((table: string) => {
      const isMinistries = table === 'ministries';
      return {
        select: jest.fn(() =>
          makeChain(
            isMinistries ? mockMinistries : mockBranches,
            isMinistries ? mockMinistries[0] : mockBranches[0]
          )
        ),
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(async () => ({
              data: isMinistries ? newMinistryRow : newBranchRow,
              error: null,
            })),
          })),
        })),
      };
    }),
    rpc: jest.fn(async () => ({ error: null })),
  },
}));


import {
  getAllMinistries,
  getMinistryById,
  registerMinistry,
  getAllBranches,
  getBranchesByMinistry,
  registerBranch,
  getBranchTypeLabel,
  formatBranchName,
} from '../src/services/ministryService';

import {
  searchTowns,
  searchTownsOnline,
  searchAddressesOnline,
  reverseGeocodeOnline,
  resolveTownDetails,
  resolveTownDetailsAsync,
  getAllCountries,
  getProvincesByCountry,
  GEO_DATABASE,
} from '../src/services/geoService';
import { openDirections, buildDirectionUrls } from '../src/utils/directions';
import { Linking, Platform } from 'react-native';



// ---------------------------------------------------------------------------
// GEO SERVICE TESTS (unchanged — all offline, no supabase dependency)
// ---------------------------------------------------------------------------
describe('Geographic Geocoding Service (geoService)', () => {
  it('contains expanded database of 60+ cities and townships across SA and global hubs', () => {
    expect(GEO_DATABASE.length).toBeGreaterThan(60);
    const towns = GEO_DATABASE.map((g) => g.town);
    expect(towns).toContain('Tembisa');
    expect(towns).toContain('Khayelitsha');
    expect(towns).toContain('Umlazi');
    expect(towns).toContain('Harare');
    expect(towns).toContain('Lilongwe');
  });

  it('searches towns by partial query', () => {
    const jhbResults = searchTowns('johan');
    expect(jhbResults.length).toBeGreaterThan(0);
    expect(jhbResults[0].town).toBe('Johannesburg');
    expect(jhbResults[0].province).toBe('Gauteng');
    expect(jhbResults[0].country).toBe('South Africa');
    expect(jhbResults[0].postalCode).toBe('2000');
  });

  it('automatically resolves cascade when a town is selected', () => {
    const durban = resolveTownDetails('Durban');
    expect(durban).toBeDefined();
    expect(durban?.province).toBe('KwaZulu-Natal');
    expect(durban?.country).toBe('South Africa');
    expect(durban?.postalCode).toMatch(/^400[01]$/);
    expect(durban?.coordinates.latitude).toBeCloseTo(-29.8587, 2);

    const london = resolveTownDetails('London');
    expect(london).toBeDefined();
    expect(london?.country).toBe('United Kingdom');
    expect(london?.province).toBe('Greater London');

    const harare = resolveTownDetails('Harare');
    expect(harare).toBeDefined();
    expect(harare?.country).toBe('Zimbabwe');

    const lilongwe = resolveTownDetails('Lilongwe');
    expect(lilongwe).toBeDefined();
    expect(lilongwe?.country).toBe('Malawi');
  });

  it('queries live OpenStreetMap Nominatim and caches result', async () => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockImplementation(async (url: string) => {
      if (url.includes('nominatim.openstreetmap.org')) {
        return {
          ok: true,
          json: async () => [
            {
              name: 'Diepsloot',
              lat: '-25.9307',
              lon: '28.0123',
              address: {
                suburb: 'Diepsloot',
                state: 'Gauteng',
                country: 'South Africa',
                postcode: '2069',
              },
            },
          ],
        };
      }
      return { ok: false };
    }) as any;

    try {
      const results = await searchTownsOnline('dieps');
      expect(results.length).toBeGreaterThan(0);
      const diepsloot = results.find((r) => r.town.toLowerCase().includes('diepsloot'));
      expect(diepsloot).toBeDefined();
      expect(diepsloot?.province).toBe('Gauteng');
      expect(diepsloot?.country).toBe('South Africa');
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('resolves town details asynchronously with fallback', async () => {
    const resolved = await resolveTownDetailsAsync('Soweto');
    expect(resolved).toBeDefined();
    expect(resolved?.province).toBe('Gauteng');
    expect(resolved?.country).toBe('South Africa');
  });

  it('returns distinct countries and provinces correctly', () => {
    const countries = getAllCountries();
    expect(countries).toContain('South Africa');
    expect(countries).toContain('United Kingdom');
    expect(countries).toContain('Zimbabwe');
    expect(countries).toContain('Malawi');

    const saProvinces = getProvincesByCountry('South Africa');
    expect(saProvinces).toContain('Gauteng');
    expect(saProvinces).toContain('Western Cape');
    expect(saProvinces).toContain('KwaZulu-Natal');
  });
});

// ---------------------------------------------------------------------------
// MINISTRY SERVICE TESTS (Supabase-backed via mock)
// ---------------------------------------------------------------------------
describe('Ministry & Church Directory Service (ministryService)', () => {
  it('getAllMinistries returns all canonical ministries from Supabase', async () => {
    const ministries = await getAllMinistries();
    expect(ministries.length).toBeGreaterThanOrEqual(4);

    const names = ministries.map((m) => m.name);
    expect(names).toContain('God Embassy');
    expect(names).toContain('Christ Embassy');
    expect(names).toContain('Spirit Embassy');
    expect(names).toContain('ECG The Jesus Nation Church');
  });

  it('getMinistryById returns correct ministry row', async () => {
    const godEmbassy = await getMinistryById('00000000-0000-0000-0000-000000000001');
    expect(godEmbassy).toBeDefined();
    expect(godEmbassy?.name).toBe('God Embassy');
    expect(godEmbassy?.founder).toContain('Sunday Adelaja');
  });

  it('getAllBranches returns pre-seeded branches', async () => {
    const branches = await getAllBranches();
    expect(branches.length).toBeGreaterThanOrEqual(3);
  });

  it('getBranchesByMinistry filters branches correctly', async () => {
    const seBranches = await getBranchesByMinistry('00000000-0000-0000-0000-000000000003');
    expect(Array.isArray(seBranches)).toBe(true);
  });

  it('registerMinistry persists a new ministry to Supabase', async () => {
    const custom = await registerMinistry({
      name: 'Grace Apostolic Fellowship',
      founder: 'Pastor Joshua Mthembu',
      headquarters: 'Sandton',
      headquartersCountry: 'South Africa',
      description: 'Kingdom apostolic discipleship community.',
      category: 'Apostolic & Kingdom Reformation',
    });

    expect(custom.id).toBeDefined();
    expect(custom.name).toBe('Grace Apostolic Fellowship');
    expect(custom.isPreadded).toBe(false);
  });

  it('registerBranch persists to Supabase and calls increment RPC', async () => {
    const branch = await registerBranch({
      ministryId: '00000000-0000-0000-0000-000000000001',
      ministryName: 'God Embassy',
      name: 'Centurion Kingdom Center',
      type: 'branch',
      leaderName: 'Pastor Eric Sithole',
      contactNumber: '+27 12 660 0000',
      town: 'Centurion',
      province: 'Gauteng',
      country: 'South Africa',
      postalCode: '0157',
      address: 'John Vorster Drive, Centurion',
      meetingTimes: 'Sundays: 09:00 AM',
    });

    expect(branch.id).toBeDefined();
    expect(branch.town).toBe('Centurion');
    expect(branch.province).toBe('Gauteng');
    expect(branch.country).toBe('South Africa');
    expect(branch.postalCode).toBe('0157');
  });

  it('generates accurate human-readable labels for branch types', () => {
    expect(getBranchTypeLabel('branch')).toBe('Branch');
    expect(getBranchTypeLabel('homecell')).toBe('Homecell Fellowship');
    expect(getBranchTypeLabel('cell_branch')).toBe('Cell Branch');
    expect(getBranchTypeLabel('sub_cluster')).toBe('Sub-Cluster');
    expect(getBranchTypeLabel('cluster')).toBe('Cluster Center');
  });

  // ---------------------------------------------------------------------------
  // AUTOMATED PRE-FILLED NAMING FORMULA & GEO ACCURACY TESTS
  // ---------------------------------------------------------------------------
  it('includes Standerton in Mpumalanga in GEO_DATABASE with accurate GPS coordinates', () => {
    const standerton = GEO_DATABASE.find((g) => g.town.toLowerCase() === 'standerton');
    expect(standerton).toBeDefined();
    expect(standerton?.province).toBe('Mpumalanga');
    expect(standerton?.country).toBe('South Africa');
    expect(standerton?.postalCode).toBe('2430');
    expect(standerton?.coordinates.latitude).toBeCloseTo(-26.9333, 2);
    expect(standerton?.coordinates.longitude).toBeCloseTo(29.2417, 2);
  });

  it('formats branch and fellowship names with standard formula: {Church Name} - {Town} {Branch Type Suffix}', () => {
    // Exact user requirement example: ECG The Jesus Nation Church - Standerton Homecell
    const ecgHomecell = formatBranchName(
      'ECG The Jesus Nation Church',
      'Standerton',
      'homecell'
    );
    expect(ecgHomecell).toBe('ECG The Jesus Nation Church - Standerton Homecell');

    // Branch formula (user requirement: ECG The Jesus Nation Church - Kempton Park Branch)
    const ecgBranch = formatBranchName(
      'ECG The Jesus Nation Church',
      'Kempton Park',
      'branch'
    );
    expect(ecgBranch).toBe('ECG The Jesus Nation Church - Kempton Park Branch');

    // Cell Branch formula
    const ceCell = formatBranchName(
      'Christ Embassy',
      'Johannesburg',
      'cell_branch'
    );
    expect(ceCell).toBe('Christ Embassy - Johannesburg Cell Branch');

    // Cluster formula
    const seCluster = formatBranchName(
      'Spirit Embassy',
      'Harare',
      'cluster'
    );
    expect(seCluster).toBe('Spirit Embassy - Harare Cluster');

    // Sub-Cluster formula
    const geSubCluster = formatBranchName(
      'God Embassy',
      'Kyiv',
      'sub_cluster'
    );
    expect(geSubCluster).toBe('God Embassy - Kyiv Sub-Cluster');

    // Handles empty town gracefully: church name + gathering prefilled
    const noTown = formatBranchName('ECG The Jesus Nation Church', '', 'homecell');
    expect(noTown).toBe('ECG The Jesus Nation Church - Homecell');

    const noTownBranch = formatBranchName('ECG The Jesus Nation Church', '', 'branch');
    expect(noTownBranch).toBe('ECG The Jesus Nation Church - Branch');
  });

  it('searchAddressesOnline returns address suggestions with coordinates', async () => {
    const originalFetch = global.fetch;
    const mockNominatimAddressResponse = [
      {
        display_name: '14 Willow Street, Standerton, Lekwa, Mpumalanga, 2430, South Africa',
        lat: '-26.93821',
        lon: '29.24312',
        address: {
          house_number: '14',
          road: 'Willow Street',
          town: 'Standerton',
          state: 'Mpumalanga',
          country: 'South Africa',
          postcode: '2430',
        },
      },
    ];

    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes('nominatim.openstreetmap.org/search')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockNominatimAddressResponse,
        });
      }
      return Promise.resolve({ ok: false, json: async () => [] });
    }) as any;

    try {
      const results = await searchAddressesOnline('14 Willow St', 'Standerton', 'South Africa');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].streetAddress).toContain('14 Willow Street');
      expect(results[0].town).toBe('Standerton');
      expect(results[0].province).toBe('Mpumalanga');
      expect(results[0].coordinates.latitude).toBeCloseTo(-26.93821, 3);
      expect(results[0].coordinates.longitude).toBeCloseTo(29.24312, 3);
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('searchAddressesOnline preserves house number when OSM only returns road way without house_number', async () => {
    const originalFetch = global.fetch;
    const mockJubileeResponse = [
      {
        display_name: 'Jubilee Street, Rhodesfield, Kempton Park, Gauteng, 1627, South Africa',
        lat: '-26.10954',
        lon: '28.23174',
        address: {
          road: 'Jubilee Street',
          suburb: 'Rhodesfield',
          town: 'Kempton Park',
          state: 'Gauteng',
          country: 'South Africa',
          postcode: '1627',
        },
      },
    ];

    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes('nominatim.openstreetmap.org/search')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockJubileeResponse,
        });
      }
      return Promise.resolve({ ok: false, json: async () => [] });
    }) as any;

    try {
      const results = await searchAddressesOnline('6 jubilee street', 'Kempton Park', 'South Africa');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].streetAddress).toBe('6 Jubilee Street');
      expect(results[0].town).toBe('Kempton Park');
      expect(results[0].suburb).toBe('Rhodesfield');
      expect(results[0].province).toBe('Gauteng');
      expect(results[0].coordinates.latitude).toBeCloseTo(-26.10954, 4);
      expect(results[0].coordinates.longitude).toBeCloseTo(28.23174, 4);
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('reverseGeocodeOnline resolves GPS coordinates to exact street address and town', async () => {
    const originalFetch = global.fetch;
    const mockReverseResponse = {
      display_name: '25 Vry Street, Standerton, Lekwa, Mpumalanga, 2430, South Africa',
      address: {
        house_number: '25',
        road: 'Vry Street',
        town: 'Standerton',
        state: 'Mpumalanga',
        country: 'South Africa',
        postcode: '2430',
      },
    };

    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes('nominatim.openstreetmap.org/reverse')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockReverseResponse,
        });
      }
      return Promise.resolve({ ok: false, json: async () => ({}) });
    }) as any;

    try {
      const resolved = await reverseGeocodeOnline(-26.935, 29.245);
      expect(resolved).toBeDefined();
      expect(resolved?.streetAddress).toContain('25 Vry Street');
      expect(resolved?.town).toBe('Standerton');
      expect(resolved?.province).toBe('Mpumalanga');
      expect(resolved?.coordinates.latitude).toBe(-26.935);
      expect(resolved?.coordinates.longitude).toBe(29.245);
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('openDirections targets exact GPS coordinates to prevent fuzzy destination drift', () => {
    const openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(true as any);

    // Coordinate target
    openDirections({
      latitude: -26.9333,
      longitude: 29.2417,
      name: 'ECG Standerton Homecell',
      address: '14 Willow St',
      town: 'Standerton',
      country: 'South Africa',
    });

    expect(openURLSpy).toHaveBeenCalled();
    const calledUrl = openURLSpy.mock.calls[0][0];
    expect(calledUrl).toContain('-26.9333');
    expect(calledUrl).toContain('29.2417');

    openURLSpy.mockRestore();
  });
});

