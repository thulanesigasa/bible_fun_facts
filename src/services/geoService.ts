/**
 * Geographic Geocoding & Cascade Resolution Service
 *
 * Provides persistent database and automated cascade resolution for towns,
 * provinces/states, countries, postal codes, and coordinates.
 *
 * When a user selects or types a town/city, the province, country, postal code,
 * and geographic coordinates are automatically resolved and populated.
 */

export interface GeoLocation {
  town: string;
  province: string;
  country: string;
  postalCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const GEO_DATABASE: GeoLocation[] = [
  // ==========================================================================
  // SOUTH AFRICA — GAUTENG
  // ==========================================================================
  {
    town: 'Johannesburg',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2000',
    coordinates: { latitude: -26.2041, longitude: 28.0473 },
  },
  {
    town: 'Sandton',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2196',
    coordinates: { latitude: -26.1076, longitude: 28.0567 },
  },
  {
    town: 'Pretoria',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0001',
    coordinates: { latitude: -25.7479, longitude: 28.2293 },
  },
  {
    town: 'Centurion',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0157',
    coordinates: { latitude: -25.8603, longitude: 28.1894 },
  },
  {
    town: 'Midrand',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1685',
    coordinates: { latitude: -25.9992, longitude: 28.1263 },
  },
  {
    town: 'Soweto',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1804',
    coordinates: { latitude: -26.2708, longitude: 27.8585 },
  },
  {
    town: 'Randburg',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2194',
    coordinates: { latitude: -26.0936, longitude: 27.9947 },
  },
  {
    town: 'Roodepoort',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1724',
    coordinates: { latitude: -26.1625, longitude: 27.8725 },
  },
  {
    town: 'Kempton Park',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1619',
    coordinates: { latitude: -26.1017, longitude: 28.2323 },
  },
  {
    town: 'Benoni',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1501',
    coordinates: { latitude: -26.1883, longitude: 28.3206 },
  },
  {
    town: 'Boksburg',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1459',
    coordinates: { latitude: -26.2127, longitude: 28.2568 },
  },
  {
    town: 'Germiston',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1401',
    coordinates: { latitude: -26.2249, longitude: 28.1678 },
  },
  {
    town: 'Vereeniging',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1930',
    coordinates: { latitude: -26.6736, longitude: 27.9261 },
  },
  {
    town: 'Krugersdorp',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1739',
    coordinates: { latitude: -26.0858, longitude: 27.7752 },
  },

  // ==========================================================================
  // SOUTH AFRICA — WESTERN CAPE
  // ==========================================================================
  {
    town: 'Cape Town',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '8000',
    coordinates: { latitude: -33.9249, longitude: 18.4241 },
  },
  {
    town: 'Bellville',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '7530',
    coordinates: { latitude: -33.8986, longitude: 18.6294 },
  },
  {
    town: 'Stellenbosch',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '7600',
    coordinates: { latitude: -33.9321, longitude: 18.8602 },
  },
  {
    town: 'Paarl',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '7646',
    coordinates: { latitude: -33.7265, longitude: 18.9647 },
  },
  {
    town: 'George',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '6529',
    coordinates: { latitude: -33.9631, longitude: 22.4617 },
  },
  {
    town: 'Somerset West',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '7130',
    coordinates: { latitude: -34.0757, longitude: 18.8433 },
  },

  // ==========================================================================
  // SOUTH AFRICA — KWAZULU-NATAL
  // ==========================================================================
  {
    town: 'Durban',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '4000',
    coordinates: { latitude: -29.8587, longitude: 31.0218 },
  },
  {
    town: 'Umhlanga',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '4320',
    coordinates: { latitude: -29.7278, longitude: 31.0847 },
  },
  {
    town: 'Pietermaritzburg',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '3201',
    coordinates: { latitude: -29.6168, longitude: 30.3928 },
  },
  {
    town: 'Pinetown',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '3610',
    coordinates: { latitude: -29.8143, longitude: 30.8544 },
  },
  {
    town: 'Ballito',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '4399',
    coordinates: { latitude: -29.5392, longitude: 31.2144 },
  },
  {
    town: 'Richards Bay',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '3900',
    coordinates: { latitude: -28.7807, longitude: 32.0383 },
  },

  // ==========================================================================
  // SOUTH AFRICA — EASTERN CAPE
  // ==========================================================================
  {
    town: 'Gqeberha (Port Elizabeth)',
    province: 'Eastern Cape',
    country: 'South Africa',
    postalCode: '6001',
    coordinates: { latitude: -33.9608, longitude: 25.6022 },
  },
  {
    town: 'East London',
    province: 'Eastern Cape',
    country: 'South Africa',
    postalCode: '5201',
    coordinates: { latitude: -33.0153, longitude: 27.8999 },
  },
  {
    town: 'Mthatha',
    province: 'Eastern Cape',
    country: 'South Africa',
    postalCode: '5099',
    coordinates: { latitude: -31.5889, longitude: 28.7844 },
  },

  // ==========================================================================
  // SOUTH AFRICA — FREE STATE
  // ==========================================================================
  {
    town: 'Bloemfontein',
    province: 'Free State',
    country: 'South Africa',
    postalCode: '9301',
    coordinates: { latitude: -29.0852, longitude: 26.1596 },
  },
  {
    town: 'Welkom',
    province: 'Free State',
    country: 'South Africa',
    postalCode: '9459',
    coordinates: { latitude: -27.9774, longitude: 26.7347 },
  },

  // ==========================================================================
  // SOUTH AFRICA — LIMPOPO
  // ==========================================================================
  {
    town: 'Polokwane',
    province: 'Limpopo',
    country: 'South Africa',
    postalCode: '0700',
    coordinates: { latitude: -23.9045, longitude: 29.4688 },
  },
  {
    town: 'Thohoyandou',
    province: 'Limpopo',
    country: 'South Africa',
    postalCode: '0950',
    coordinates: { latitude: -22.9456, longitude: 30.4850 },
  },

  // ==========================================================================
  // SOUTH AFRICA — MPUMALANGA
  // ==========================================================================
  {
    town: 'Mbombela (Nelspruit)',
    province: 'Mpumalanga',
    country: 'South Africa',
    postalCode: '1200',
    coordinates: { latitude: -25.4753, longitude: 30.9694 },
  },
  {
    town: 'eMalahleni (Witbank)',
    province: 'Mpumalanga',
    country: 'South Africa',
    postalCode: '1035',
    coordinates: { latitude: -25.8741, longitude: 29.2332 },
  },

  // ==========================================================================
  // SOUTH AFRICA — NORTH WEST
  // ==========================================================================
  {
    town: 'Rustenburg',
    province: 'North West',
    country: 'South Africa',
    postalCode: '0299',
    coordinates: { latitude: -25.6676, longitude: 27.2421 },
  },
  {
    town: 'Potchefstroom',
    province: 'North West',
    country: 'South Africa',
    postalCode: '2531',
    coordinates: { latitude: -26.7145, longitude: 27.0970 },
  },

  // ==========================================================================
  // SOUTH AFRICA — NORTHERN CAPE
  // ==========================================================================
  {
    town: 'Kimberley',
    province: 'Northern Cape',
    country: 'South Africa',
    postalCode: '8301',
    coordinates: { latitude: -28.7282, longitude: 24.7499 },
  },

  // ==========================================================================
  // ZIMBABWE
  // ==========================================================================
  {
    town: 'Harare',
    province: 'Harare Province',
    country: 'Zimbabwe',
    postalCode: '00263',
    coordinates: { latitude: -17.8252, longitude: 31.0335 },
  },
  {
    town: 'Bulawayo',
    province: 'Bulawayo Province',
    country: 'Zimbabwe',
    postalCode: '00263',
    coordinates: { latitude: -20.1500, longitude: 28.5833 },
  },
  {
    town: 'Chitungwiza',
    province: 'Harare Province',
    country: 'Zimbabwe',
    postalCode: '00263',
    coordinates: { latitude: -18.0127, longitude: 31.0756 },
  },
  {
    town: 'Mutare',
    province: 'Manicaland',
    country: 'Zimbabwe',
    postalCode: '00263',
    coordinates: { latitude: -18.9728, longitude: 32.6695 },
  },

  // ==========================================================================
  // MALAWI
  // ==========================================================================
  {
    town: 'Lilongwe',
    province: 'Central Region',
    country: 'Malawi',
    postalCode: '00265',
    coordinates: { latitude: -13.9626, longitude: 33.7741 },
  },
  {
    town: 'Blantyre',
    province: 'Southern Region',
    country: 'Malawi',
    postalCode: '00265',
    coordinates: { latitude: -15.7861, longitude: 35.0058 },
  },
  {
    town: 'Mzuzu',
    province: 'Northern Region',
    country: 'Malawi',
    postalCode: '00265',
    coordinates: { latitude: -11.4581, longitude: 34.0151 },
  },

  // ==========================================================================
  // NIGERIA
  // ==========================================================================
  {
    town: 'Lagos',
    province: 'Lagos State',
    country: 'Nigeria',
    postalCode: '100001',
    coordinates: { latitude: 6.5244, longitude: 3.3792 },
  },
  {
    town: 'Ikeja',
    province: 'Lagos State',
    country: 'Nigeria',
    postalCode: '100271',
    coordinates: { latitude: 6.5965, longitude: 3.3421 },
  },
  {
    town: 'Abuja',
    province: 'Federal Capital Territory',
    country: 'Nigeria',
    postalCode: '900001',
    coordinates: { latitude: 9.0765, longitude: 7.3986 },
  },
  {
    town: 'Port Harcourt',
    province: 'Rivers State',
    country: 'Nigeria',
    postalCode: '500001',
    coordinates: { latitude: 4.8156, longitude: 7.0498 },
  },
  {
    town: 'Ibadan',
    province: 'Oyo State',
    country: 'Nigeria',
    postalCode: '200001',
    coordinates: { latitude: 7.3775, longitude: 3.9470 },
  },

  // ==========================================================================
  // UNITED KINGDOM
  // ==========================================================================
  {
    town: 'London',
    province: 'Greater London',
    country: 'United Kingdom',
    postalCode: 'EC1A 1BB',
    coordinates: { latitude: 51.5074, longitude: -0.1278 },
  },
  {
    town: 'Birmingham',
    province: 'West Midlands',
    country: 'United Kingdom',
    postalCode: 'B1 1AA',
    coordinates: { latitude: 52.4862, longitude: -1.8904 },
  },
  {
    town: 'Manchester',
    province: 'Greater Manchester',
    country: 'United Kingdom',
    postalCode: 'M1 1AE',
    coordinates: { latitude: 53.4808, longitude: -2.2426 },
  },

  // ==========================================================================
  // UNITED STATES
  // ==========================================================================
  {
    town: 'Dallas',
    province: 'Texas',
    country: 'United States',
    postalCode: '75201',
    coordinates: { latitude: 32.7767, longitude: -96.7970 },
  },
  {
    town: 'Houston',
    province: 'Texas',
    country: 'United States',
    postalCode: '77001',
    coordinates: { latitude: 29.7604, longitude: -95.3698 },
  },
  {
    town: 'Atlanta',
    province: 'Georgia',
    country: 'United States',
    postalCode: '30301',
    coordinates: { latitude: 33.7490, longitude: -84.3880 },
  },
  {
    town: 'New York',
    province: 'New York',
    country: 'United States',
    postalCode: '10001',
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
  },

  // ==========================================================================
  // KENYA & GHANA & UKRAINE
  // ==========================================================================
  {
    town: 'Nairobi',
    province: 'Nairobi County',
    country: 'Kenya',
    postalCode: '00100',
    coordinates: { latitude: -1.2921, longitude: 36.8219 },
  },
  {
    town: 'Accra',
    province: 'Greater Accra',
    country: 'Ghana',
    postalCode: 'GA-001',
    coordinates: { latitude: 5.6037, longitude: -0.1870 },
  },
  {
    town: 'Kyiv',
    province: 'Kyiv Oblast',
    country: 'Ukraine',
    postalCode: '01001',
    coordinates: { latitude: 50.4501, longitude: 30.5234 },
  },
];

/**
 * Searches the geocoding database for towns matching a partial name query.
 */
export function searchTowns(query: string): GeoLocation[] {
  const q = query.trim().toLowerCase();
  if (!q) return GEO_DATABASE.slice(0, 15);
  return GEO_DATABASE.filter(
    (item) =>
      item.town.toLowerCase().includes(q) ||
      item.province.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      item.postalCode.includes(q)
  );
}

/**
 * Automatically resolves the full geographic cascade for a town name.
 * Returns the exact GeoLocation or creates a safe fallback structure.
 */
export function resolveTownDetails(townName: string): GeoLocation | null {
  const normalized = townName.trim().toLowerCase();
  const match = GEO_DATABASE.find(
    (item) =>
      item.town.toLowerCase() === normalized ||
      item.town.toLowerCase().startsWith(normalized)
  );
  return match || null;
}

/**
 * Returns a list of all distinct countries in the database.
 */
export function getAllCountries(): string[] {
  const countries = new Set<string>();
  GEO_DATABASE.forEach((item) => countries.add(item.country));
  return Array.from(countries).sort();
}

/**
 * Returns all distinct provinces for a given country.
 */
export function getProvincesByCountry(country: string): string[] {
  const provinces = new Set<string>();
  GEO_DATABASE.filter((item) => item.country.toLowerCase() === country.toLowerCase())
    .forEach((item) => provinces.add(item.province));
  return Array.from(provinces).sort();
}
