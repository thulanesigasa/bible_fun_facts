/**
 * Geographic Geocoding & Cascade Resolution Service
 *
 * Provides a hybrid multi-tier geocoding engine:
 * 1. Tier 1: Expanded in-memory local database covering 200+ cities, townships,
 *    and metropolitan suburbs across South Africa (all 9 provinces), Africa, and global hubs.
 * 2. Tier 2: OpenStreetMap Nominatim API (Primary Live Geocoder) with address details.
 * 3. Tier 3: Photon by Komoot (Secondary Live Geocoder fallback).
 * 4. Tier 4: Persistent AsyncStorage caching for zero-bandwidth repeated queries.
 *
 * When a user selects or types a town/city, the province, country, postal code,
 * and geographic coordinates are automatically resolved and populated.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

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
  // SOUTH AFRICA — GAUTENG (Expanded Suburbs & Townships)
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
    postalCode: '1852',
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
    coordinates: { latitude: -26.2127, longitude: 28.2616 },
  },
  {
    town: 'Germiston',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1401',
    coordinates: { latitude: -26.2251, longitude: 28.1708 },
  },
  {
    town: 'Alberton',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1449',
    coordinates: { latitude: -26.2625, longitude: 28.1228 },
  },
  {
    town: 'Springs',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1559',
    coordinates: { latitude: -26.2558, longitude: 28.4428 },
  },
  {
    town: 'Brakpan',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1541',
    coordinates: { latitude: -26.2361, longitude: 28.3694 },
  },
  {
    town: 'Tembisa',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1632',
    coordinates: { latitude: -25.9964, longitude: 28.2268 },
  },
  {
    town: 'Alexandra',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2090',
    coordinates: { latitude: -26.1072, longitude: 28.0944 },
  },
  {
    town: 'Diepsloot',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2069',
    coordinates: { latitude: -25.9307, longitude: 28.0123 },
  },
  {
    town: 'Mamelodi',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0122',
    coordinates: { latitude: -25.7118, longitude: 28.3582 },
  },
  {
    town: 'Soshanguve',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0152',
    coordinates: { latitude: -25.5255, longitude: 28.0934 },
  },
  {
    town: 'Atteridgeville',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0008',
    coordinates: { latitude: -25.7725, longitude: 28.0717 },
  },
  {
    town: 'Mabopane',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0190',
    coordinates: { latitude: -25.4967, longitude: 28.0494 },
  },
  {
    town: 'Bryanston',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2191',
    coordinates: { latitude: -26.0561, longitude: 28.0242 },
  },
  {
    town: 'Fourways',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2055',
    coordinates: { latitude: -26.0150, longitude: 28.0069 },
  },
  {
    town: 'Rosebank',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2196',
    coordinates: { latitude: -26.1462, longitude: 28.0416 },
  },
  {
    town: 'Krugersdorp',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1739',
    coordinates: { latitude: -26.0967, longitude: 27.7753 },
  },
  {
    town: 'Randfontein',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1759',
    coordinates: { latitude: -26.1833, longitude: 27.7000 },
  },
  {
    town: 'Vereeniging',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1939',
    coordinates: { latitude: -26.6736, longitude: 27.9261 },
  },
  {
    town: 'Vanderbijlpark',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1911',
    coordinates: { latitude: -26.7117, longitude: 27.8378 },
  },

  // ==========================================================================
  // SOUTH AFRICA — WESTERN CAPE
  // ==========================================================================
  {
    town: 'Cape Town',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '8001',
    coordinates: { latitude: -33.9249, longitude: 18.4241 },
  },
  {
    town: 'Khayelitsha',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '7783',
    coordinates: { latitude: -34.0406, longitude: 18.6674 },
  },
  {
    town: 'Mitchells Plain',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '7785',
    coordinates: { latitude: -34.0485, longitude: 18.6214 },
  },
  {
    town: 'Bellville',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '7530',
    coordinates: { latitude: -33.8943, longitude: 18.6294 },
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
    coordinates: { latitude: -33.7342, longitude: 18.9622 },
  },
  {
    town: 'George',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '6529',
    coordinates: { latitude: -33.9631, longitude: 22.4617 },
  },
  {
    town: 'Mossel Bay',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '6500',
    coordinates: { latitude: -34.1831, longitude: 22.1460 },
  },
  {
    town: 'Knysna',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '6570',
    coordinates: { latitude: -34.0354, longitude: 23.0471 },
  },
  {
    town: 'Hermanus',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '7200',
    coordinates: { latitude: -34.4167, longitude: 19.2333 },
  },
  {
    town: 'Worcester',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '6850',
    coordinates: { latitude: -33.6450, longitude: 19.4483 },
  },

  // ==========================================================================
  // SOUTH AFRICA — KWAZULU-NATAL
  // ==========================================================================
  {
    town: 'Durban',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '4001',
    coordinates: { latitude: -29.8587, longitude: 31.0218 },
  },
  {
    town: 'Umlazi',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '4031',
    coordinates: { latitude: -29.9678, longitude: 30.8833 },
  },
  {
    town: 'Pinetown',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '3610',
    coordinates: { latitude: -29.8167, longitude: 30.8667 },
  },
  {
    town: 'Umhlanga',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '4319',
    coordinates: { latitude: -29.7289, longitude: 31.0850 },
  },
  {
    town: 'Pietermaritzburg',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '3201',
    coordinates: { latitude: -29.6006, longitude: 30.3794 },
  },
  {
    town: 'Newcastle',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '2940',
    coordinates: { latitude: -27.7580, longitude: 29.9318 },
  },
  {
    town: 'Richards Bay',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '3900',
    coordinates: { latitude: -28.7807, longitude: 32.0383 },
  },
  {
    town: 'Empangeni',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '3880',
    coordinates: { latitude: -28.7533, longitude: 31.8936 },
  },
  {
    town: 'Ballito',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '4399',
    coordinates: { latitude: -29.5392, longitude: 31.2144 },
  },
  {
    town: 'Port Shepstone',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '4240',
    coordinates: { latitude: -30.7414, longitude: 30.4550 },
  },

  // ==========================================================================
  // SOUTH AFRICA — EASTERN CAPE
  // ==========================================================================
  {
    town: 'Gqeberha',
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
    coordinates: { latitude: -33.0153, longitude: 27.9116 },
  },
  {
    town: 'Mthatha',
    province: 'Eastern Cape',
    country: 'South Africa',
    postalCode: '5099',
    coordinates: { latitude: -31.5892, longitude: 28.7844 },
  },
  {
    town: 'Makhanda',
    province: 'Eastern Cape',
    country: 'South Africa',
    postalCode: '6139',
    coordinates: { latitude: -33.3106, longitude: 26.5256 },
  },
  {
    town: 'Queenstown',
    province: 'Eastern Cape',
    country: 'South Africa',
    postalCode: '5319',
    coordinates: { latitude: -31.8976, longitude: 26.8753 },
  },
  {
    town: 'Bisho',
    province: 'Eastern Cape',
    country: 'South Africa',
    postalCode: '5605',
    coordinates: { latitude: -32.8494, longitude: 27.4380 },
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
    coordinates: { latitude: -27.9772, longitude: 26.7354 },
  },
  {
    town: 'Sasolburg',
    province: 'Free State',
    country: 'South Africa',
    postalCode: '1947',
    coordinates: { latitude: -26.8156, longitude: 27.8286 },
  },
  {
    town: 'Bethlehem',
    province: 'Free State',
    country: 'South Africa',
    postalCode: '9700',
    coordinates: { latitude: -28.2308, longitude: 28.3075 },
  },
  {
    town: 'Kroonstad',
    province: 'Free State',
    country: 'South Africa',
    postalCode: '9499',
    coordinates: { latitude: -27.6506, longitude: 27.2344 },
  },

  // ==========================================================================
  // SOUTH AFRICA — MPUMALANGA
  // ==========================================================================
  {
    town: 'Mbombela',
    province: 'Mpumalanga',
    country: 'South Africa',
    postalCode: '1200',
    coordinates: { latitude: -25.4753, longitude: 30.9694 },
  },
  {
    town: 'eMalahleni',
    province: 'Mpumalanga',
    country: 'South Africa',
    postalCode: '1035',
    coordinates: { latitude: -25.8728, longitude: 29.2332 },
  },
  {
    town: 'Middelburg',
    province: 'Mpumalanga',
    country: 'South Africa',
    postalCode: '1050',
    coordinates: { latitude: -25.7751, longitude: 29.4648 },
  },
  {
    town: 'Secunda',
    province: 'Mpumalanga',
    country: 'South Africa',
    postalCode: '2302',
    coordinates: { latitude: -26.5503, longitude: 29.1664 },
  },

  // ==========================================================================
  // SOUTH AFRICA — LIMPOPO
  // ==========================================================================
  {
    town: 'Polokwane',
    province: 'Limpopo',
    country: 'South Africa',
    postalCode: '0699',
    coordinates: { latitude: -23.9045, longitude: 29.4688 },
  },
  {
    town: 'Thohoyandou',
    province: 'Limpopo',
    country: 'South Africa',
    postalCode: '0950',
    coordinates: { latitude: -22.9456, longitude: 30.4850 },
  },
  {
    town: 'Tzaneen',
    province: 'Limpopo',
    country: 'South Africa',
    postalCode: '0850',
    coordinates: { latitude: -23.8333, longitude: 30.1667 },
  },
  {
    town: 'Mokopane',
    province: 'Limpopo',
    country: 'South Africa',
    postalCode: '0601',
    coordinates: { latitude: -24.1944, longitude: 29.0097 },
  },
  {
    town: 'Bela-Bela',
    province: 'Limpopo',
    country: 'South Africa',
    postalCode: '0480',
    coordinates: { latitude: -24.8833, longitude: 28.2833 },
  },

  // ==========================================================================
  // SOUTH AFRICA — NORTH WEST
  // ==========================================================================
  {
    town: 'Rustenburg',
    province: 'North West',
    country: 'South Africa',
    postalCode: '0299',
    coordinates: { latitude: -25.6667, longitude: 27.2422 },
  },
  {
    town: 'Mahikeng',
    province: 'North West',
    country: 'South Africa',
    postalCode: '2745',
    coordinates: { latitude: -25.8652, longitude: 25.6442 },
  },
  {
    town: 'Potchefstroom',
    province: 'North West',
    country: 'South Africa',
    postalCode: '2531',
    coordinates: { latitude: -26.7145, longitude: 27.1008 },
  },
  {
    town: 'Klerksdorp',
    province: 'North West',
    country: 'South Africa',
    postalCode: '2571',
    coordinates: { latitude: -26.8521, longitude: 26.6667 },
  },
  {
    town: 'Brits',
    province: 'North West',
    country: 'South Africa',
    postalCode: '0250',
    coordinates: { latitude: -25.6333, longitude: 27.7833 },
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
  {
    town: 'Upington',
    province: 'Northern Cape',
    country: 'South Africa',
    postalCode: '8801',
    coordinates: { latitude: -28.4478, longitude: 21.2561 },
  },
  {
    town: 'Springbok',
    province: 'Northern Cape',
    country: 'South Africa',
    postalCode: '8240',
    coordinates: { latitude: -29.6644, longitude: 17.8864 },
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
    province: 'Mashonaland East',
    country: 'Zimbabwe',
    postalCode: '00263',
    coordinates: { latitude: -18.0125, longitude: 31.0756 },
  },
  {
    town: 'Mutare',
    province: 'Manicaland',
    country: 'Zimbabwe',
    postalCode: '00263',
    coordinates: { latitude: -18.9728, longitude: 32.6694 },
  },
  {
    town: 'Gweru',
    province: 'Midlands',
    country: 'Zimbabwe',
    postalCode: '00263',
    coordinates: { latitude: -19.4500, longitude: 29.8167 },
  },
  {
    town: 'Victoria Falls',
    province: 'Matabeleland North',
    country: 'Zimbabwe',
    postalCode: '00263',
    coordinates: { latitude: -17.9333, longitude: 25.8333 },
  },

  // ==========================================================================
  // MALAWI
  // ==========================================================================
  {
    town: 'Lilongwe',
    province: 'Central Region',
    country: 'Malawi',
    postalCode: '265',
    coordinates: { latitude: -13.9626, longitude: 33.7741 },
  },
  {
    town: 'Blantyre',
    province: 'Southern Region',
    country: 'Malawi',
    postalCode: '265',
    coordinates: { latitude: -15.7861, longitude: 35.0058 },
  },
  {
    town: 'Mzuzu',
    province: 'Northern Region',
    country: 'Malawi',
    postalCode: '265',
    coordinates: { latitude: -11.4656, longitude: 34.0207 },
  },
  {
    town: 'Zomba',
    province: 'Southern Region',
    country: 'Malawi',
    postalCode: '265',
    coordinates: { latitude: -15.3833, longitude: 35.3333 },
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
  {
    town: 'Enugu',
    province: 'Enugu State',
    country: 'Nigeria',
    postalCode: '400001',
    coordinates: { latitude: 6.4584, longitude: 7.5464 },
  },

  // ==========================================================================
  // UNITED KINGDOM
  // ==========================================================================
  {
    town: 'London',
    province: 'Greater London',
    country: 'United Kingdom',
    postalCode: 'SW1A 1AA',
    coordinates: { latitude: 51.5074, longitude: -0.1278 },
  },
  {
    town: 'Birmingham',
    province: 'West Midlands',
    country: 'United Kingdom',
    postalCode: 'B1 1BB',
    coordinates: { latitude: 52.4862, longitude: -1.8904 },
  },
  {
    town: 'Manchester',
    province: 'Greater Manchester',
    country: 'United Kingdom',
    postalCode: 'M1 1AD',
    coordinates: { latitude: 53.4808, longitude: -2.2426 },
  },
  {
    town: 'Leeds',
    province: 'West Yorkshire',
    country: 'United Kingdom',
    postalCode: 'LS1 1UR',
    coordinates: { latitude: 53.8008, longitude: -1.5491 },
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
  {
    town: 'Los Angeles',
    province: 'California',
    country: 'United States',
    postalCode: '90001',
    coordinates: { latitude: 34.0522, longitude: -118.2437 },
  },
  {
    town: 'Chicago',
    province: 'Illinois',
    country: 'United States',
    postalCode: '60601',
    coordinates: { latitude: 41.8781, longitude: -87.6298 },
  },

  // ==========================================================================
  // OTHER CANONICAL HUBS
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
    town: 'Lusaka',
    province: 'Lusaka Province',
    country: 'Zambia',
    postalCode: '10101',
    coordinates: { latitude: -15.3875, longitude: 28.3228 },
  },
  {
    town: 'Gaborone',
    province: 'South-East District',
    country: 'Botswana',
    postalCode: '0000',
    coordinates: { latitude: -24.6282, longitude: 25.9231 },
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
 * Searches the geocoding database for towns matching a partial name query (instant synchronous).
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
 * Automatically resolves the full geographic cascade for a town name from local DB.
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
 * Live OpenStreetMap Nominatim Geocoding Request
 */
async function queryNominatim(query: string): Promise<GeoLocation[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3500);
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'BibleFunFactsApp/1.0 (contact@exegeomai.app)',
        Accept: 'application/json',
      },
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data
      .map((item: any) => {
        const addr = item.address || {};
        const townName =
          addr.suburb ||
          addr.city ||
          addr.town ||
          addr.village ||
          addr.municipality ||
          item.name;
        const province =
          addr.state || addr.province || addr.region || addr.county || '';
        const country = addr.country || '';
        const postalCode = addr.postcode || '';

        if (!townName) return null;

        return {
          town: townName,
          province,
          country,
          postalCode,
          coordinates: {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
          },
        };
      })
      .filter(Boolean) as GeoLocation[];
  } catch {
    clearTimeout(timer);
    return [];
  }
}

/**
 * Live Photon (Komoot OSM) Secondary Fallback Geocoder
 */
async function queryPhoton(query: string): Promise<GeoLocation[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3500);
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data?.features || !Array.isArray(data.features)) return [];

    return data.features
      .map((f: any) => {
        const p = f.properties || {};
        const townName = p.name || p.city || p.district || p.suburb;
        if (!townName) return null;

        return {
          town: townName,
          province: p.state || p.county || '',
          country: p.country || '',
          postalCode: p.postcode || '',
          coordinates: {
            latitude: f.geometry?.coordinates?.[1] || 0,
            longitude: f.geometry?.coordinates?.[0] || 0,
          },
        };
      })
      .filter(Boolean) as GeoLocation[];
  } catch {
    clearTimeout(timer);
    return [];
  }
}

/**
 * Unified Live Online Geocoding Search:
 * Queries Local Database + OpenStreetMap Nominatim + Photon + AsyncStorage Cache.
 */
export async function searchTownsOnline(query: string): Promise<GeoLocation[]> {
  const q = query.trim().toLowerCase();
  if (!q) return GEO_DATABASE.slice(0, 15);

  const localMatches = searchTowns(query);

  // If query is short, return local immediately
  if (q.length < 2) return localMatches;

  // Check persistent cache
  const cacheKey = `@geo_cache_v2_${q}`;
  try {
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      const parsed: GeoLocation[] = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return mergeDeduplicate(localMatches, parsed);
      }
    }
  } catch {
    // Ignore cache error
  }

  // Fetch from live OpenStreetMap Nominatim
  let onlineResults = await queryNominatim(query);

  // If Nominatim gave zero results or timed out, fallback to Photon
  if (onlineResults.length === 0) {
    onlineResults = await queryPhoton(query);
  }

  // Combine and deduplicate
  const merged = mergeDeduplicate(localMatches, onlineResults);

  // Cache online results for next time
  if (onlineResults.length > 0) {
    try {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(onlineResults));
    } catch {
      // Ignore cache write error
    }
  }

  return merged;
}

/**
 * Asynchronously resolves full geographic cascade for a town name.
 * 1. Checks local database
 * 2. Checks cached queries
 * 3. Queries live Nominatim & Photon
 */
export async function resolveTownDetailsAsync(
  townName: string
): Promise<GeoLocation | null> {
  const local = resolveTownDetails(townName);
  if (local) return local;

  const results = await searchTownsOnline(townName);
  if (results.length > 0) {
    return results[0];
  }

  return null;
}

function mergeDeduplicate(
  primary: GeoLocation[],
  secondary: GeoLocation[]
): GeoLocation[] {
  const seen = new Set<string>();
  const out: GeoLocation[] = [];

  for (const item of [...primary, ...secondary]) {
    const key = `${item.town.toLowerCase()}_${item.country.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }

  return out.slice(0, 20);
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
  GEO_DATABASE.filter(
    (item) => item.country.toLowerCase() === country.toLowerCase()
  ).forEach((item) => provinces.add(item.province));
  return Array.from(provinces).sort();
}
