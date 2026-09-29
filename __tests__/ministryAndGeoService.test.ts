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

import {
  searchTowns,
  searchTownsOnline,
  resolveTownDetails,
  resolveTownDetailsAsync,
  getAllCountries,
  getProvincesByCountry,
  GEO_DATABASE,
} from '../src/services/geoService';
import {
  getAllMinistries,
  getMinistryById,
  registerMinistry,
  getAllBranches,
  getBranchesByMinistry,
  registerBranch,
  getBranchTypeLabel,
  PRE_ADDED_MINISTRIES,
  PRE_ADDED_BRANCHES,
} from '../src/services/ministryService';

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

describe('Ministry & Church Directory Service (ministryService)', () => {
  it('contains all 4 pre-added canonical ministries', async () => {
    const ministries = await getAllMinistries();
    const ids = ministries.map((m) => m.id);

    expect(ids).toContain('god-embassy');
    expect(ids).toContain('christ-embassy');
    expect(ids).toContain('spirit-embassy');
    expect(ids).toContain('ecg-jesus-nation');

    const godEmbassy = await getMinistryById('god-embassy');
    expect(godEmbassy?.name).toBe('God Embassy');
    expect(godEmbassy?.founder).toContain('Sunday Adelaja');

    const christEmbassy = await getMinistryById('christ-embassy');
    expect(christEmbassy?.name).toBe('Christ Embassy');
    expect(christEmbassy?.founder).toContain('Chris Oyakhilome');

    const spiritEmbassy = await getMinistryById('spirit-embassy');
    expect(spiritEmbassy?.name).toBe('Spirit Embassy');
    expect(spiritEmbassy?.founder).toContain('Uebert Angel');

    const ecg = await getMinistryById('ecg-jesus-nation');
    expect(ecg?.name).toBe('ECG The Jesus Nation Church');
    expect(ecg?.founder).toContain('Shepherd Bushiri');
  });

  it('retrieves pre-seeded branches and homecells', async () => {
    const branches = await getAllBranches();
    expect(branches.length).toBeGreaterThanOrEqual(12);

    const seBranches = await getBranchesByMinistry('spirit-embassy');
    expect(seBranches.length).toBeGreaterThan(0);
    expect(seBranches.some((b) => b.type === 'homecell')).toBe(true);
  });

  it('registers a new custom ministry', async () => {
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

    const all = await getAllMinistries();
    expect(all.some((m) => m.id === custom.id)).toBe(true);
  });

  it('registers a new custom branch with automatic geocoding cascade', async () => {
    const branch = await registerBranch({
      ministryId: 'god-embassy',
      ministryName: 'God Embassy',
      name: 'Centurion Kingdom Center',
      type: 'branch',
      leaderName: 'Pastor Eric Sithole',
      contactNumber: '+27 12 660 0000',
      town: 'Centurion',
      address: 'John Vorster Drive, Centurion',
      meetingTimes: 'Sundays: 09:00 AM',
    });

    expect(branch.id).toBeDefined();
    expect(branch.town).toBe('Centurion');
    // Auto-resolved cascade
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
