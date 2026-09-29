/**
 * Ministry & Church Directory Service — Unit Tests
 *
 * Tests use a Supabase mock so no real network calls are made.
 * The canonical seed data (God Embassy, Christ Embassy, Spirit Embassy,
 * ECG The Jesus Nation Church) is reflected in the mock responses.
 */

// ---------------------------------------------------------------------------
// Mock Supabase client
// ---------------------------------------------------------------------------
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

jest.mock('../src/services/supabase', () => ({
  supabase: {
    from: jest.fn((table: string) => {
      const isMinistries = table === 'ministries';
      const isInsert = false;
      return {
        select: jest.fn(() => ({
          order: jest.fn(() => ({
            order: jest.fn(async () => ({
              data: isMinistries ? mockMinistries : mockBranches,
              error: null,
            })),
            eq: jest.fn(async () => ({
              data: isMinistries
                ? mockMinistries.filter((m) => m.is_preadded)
                : mockBranches.filter((b) => b.ministry_id === '00000000-0000-0000-0000-000000000003'),
              error: null,
            })),
          })),
          eq: jest.fn(() => ({
            single: jest.fn(async () => ({
              data: isMinistries ? mockMinistries[0] : mockBranches[0],
              error: null,
            })),
          })),
        })),
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
} from '../src/services/ministryService';

import {
  searchTowns,
  searchTownsOnline,
  resolveTownDetails,
  resolveTownDetailsAsync,
  getAllCountries,
  getProvincesByCountry,
  GEO_DATABASE,
} from '../src/services/geoService';

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
    expect(getBranchTypeLabel('branch')).toBe('Main Branch / Campus');
    expect(getBranchTypeLabel('homecell')).toBe('Homecell Fellowship');
    expect(getBranchTypeLabel('cell_branch')).toBe('Cell Branch');
    expect(getBranchTypeLabel('sub_cluster')).toBe('Sub-Cluster');
    expect(getBranchTypeLabel('cluster')).toBe('Cluster Center');
  });
});
