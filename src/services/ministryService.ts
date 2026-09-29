/**
 * Ministry & Church Directory Service
 *
 * Provides typed data structures, pre-seeded historical ministries (God Embassy,
 * Christ Embassy, Spirit Embassy, ECG The Jesus Nation Church), and persistent
 * branch/homecell registration management.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GeoLocation, resolveTownDetails } from './geoService';

export type BranchType =
  | 'branch'
  | 'homecell'
  | 'cell_branch'
  | 'sub_cluster'
  | 'cluster';

export interface Ministry {
  id: string;
  name: string;
  founder: string;
  headquarters: string;
  headquartersCountry: string;
  description: string;
  category: string;
  branchesCount: number;
  homecellsCount: number;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  isPreadded: boolean;
  createdAt: string;
}

export interface Branch {
  id: string;
  ministryId: string;
  ministryName: string;
  name: string;
  type: BranchType;
  leaderName: string;
  contactNumber: string;
  contactEmail?: string;
  town: string;
  province: string;
  country: string;
  postalCode: string;
  address: string;
  meetingTimes: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
}

const STORAGE_KEY_CUSTOM_MINISTRIES = '@exegeomai_custom_ministries_v1';
const STORAGE_KEY_CUSTOM_BRANCHES = '@exegeomai_custom_branches_v1';

// ============================================================================
// 1. PRE-ADDED CANONICAL MINISTRIES
// ============================================================================
export const PRE_ADDED_MINISTRIES: Ministry[] = [
  {
    id: 'god-embassy',
    name: 'God Embassy',
    founder: 'Pastor Sunday Adelaja',
    headquarters: 'Kyiv, Ukraine',
    headquartersCountry: 'Ukraine',
    description:
      'Embassy of the Blessed Kingdom of God for All Nations. Founded in 1994, focusing on apostolic kingdom discipleship, spiritual reformation, and active societal transformation.',
    category: 'Apostolic & Kingdom Reformation',
    branchesCount: 18,
    homecellsCount: 64,
    website: 'https://godembassy.org',
    contactEmail: 'contact@godembassy.org',
    contactPhone: '+380 44 501 0101',
    isPreadded: true,
    createdAt: '1994-02-06T00:00:00Z',
  },
  {
    id: 'christ-embassy',
    name: 'Christ Embassy',
    founder: 'Rev. Dr. Chris Oyakhilome',
    headquarters: 'Lagos, Nigeria',
    headquartersCountry: 'Nigeria',
    description:
      'Believers’ LoveWorld Inc. Global Christian ministry dedicated to giving lives a divine meaning and demonstrating the character of the Holy Spirit through God’s Word.',
    category: 'Word of Faith & Global Evangelism',
    branchesCount: 145,
    homecellsCount: 420,
    website: 'https://christembassy.org',
    contactEmail: 'info@loveworld360.com',
    contactPhone: '+234 1 888 8888',
    isPreadded: true,
    createdAt: '1987-05-10T00:00:00Z',
  },
  {
    id: 'spirit-embassy',
    name: 'Spirit Embassy',
    founder: 'Prophet Uebert Angel',
    headquarters: 'London, United Kingdom',
    headquartersCountry: 'United Kingdom',
    description:
      'The GoodNews Church. A worldwide prophetic and teaching movement proclaiming the gospel of Jesus Christ, unmerited grace, and spiritual revelation across all continents.',
    category: 'Prophetic & Grace Revelation',
    branchesCount: 52,
    homecellsCount: 180,
    website: 'https://spiritembassy.org',
    contactEmail: 'info@spiritembassy.com',
    contactPhone: '+44 207 123 4567',
    isPreadded: true,
    createdAt: '2007-03-15T00:00:00Z',
  },
  {
    id: 'ecg-jesus-nation',
    name: 'ECG The Jesus Nation Church',
    founder: 'Prophet Shepherd Bushiri',
    headquarters: 'Lilongwe, Malawi',
    headquartersCountry: 'Malawi',
    description:
      'Enlightened Christian Gathering (The Jesus Nation Church). A global prophetic family operating in apostolic signs and wonders, kingdom wealth creation, and massive evangelism.',
    category: 'Prophetic & Apostolic Community',
    branchesCount: 96,
    homecellsCount: 310,
    website: 'https://jesusnation.org',
    contactEmail: 'info@ecgchurch.org',
    contactPhone: '+265 1 777 999',
    isPreadded: true,
    createdAt: '2010-09-24T00:00:00Z',
  },
];

// ============================================================================
// 2. PRE-SEEDED CANONICAL BRANCHES & HOMECELLS
// ============================================================================
export const PRE_ADDED_BRANCHES: Branch[] = [
  // --- GOD EMBASSY BRANCHES & CELLS ---
  {
    id: 'ge-jhb-central',
    ministryId: 'god-embassy',
    ministryName: 'God Embassy',
    name: 'God Embassy Johannesburg Central',
    type: 'branch',
    leaderName: 'Pastor David Ndlovu',
    contactNumber: '+27 11 402 1100',
    town: 'Johannesburg',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2000',
    address: '88 Marshall Street, Marshalltown, Johannesburg',
    meetingTimes: 'Sundays: 09:30 AM & 12:00 PM | Wednesdays: 18:30 PM',
    coordinates: { latitude: -26.2041, longitude: 28.0473 },
    createdAt: '2023-01-15T00:00:00Z',
  },
  {
    id: 'ge-sandton-cell-1',
    ministryId: 'god-embassy',
    ministryName: 'God Embassy',
    name: 'Sandton Kingdom Cell #1',
    type: 'homecell',
    leaderName: 'Deacon Mark Sibanda',
    contactNumber: '+27 82 555 1234',
    town: 'Sandton',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2196',
    address: '14 Grayston Drive, Sandhurst, Sandton',
    meetingTimes: 'Tuesdays: 19:00 PM',
    coordinates: { latitude: -26.1076, longitude: 28.0567 },
    createdAt: '2023-03-20T00:00:00Z',
  },
  {
    id: 'ge-cpt-branch',
    ministryId: 'god-embassy',
    ministryName: 'God Embassy',
    name: 'God Embassy Cape Town Campus',
    type: 'branch',
    leaderName: 'Pastor Sergei Kovalenko',
    contactNumber: '+27 21 424 5500',
    town: 'Cape Town',
    province: 'Western Cape',
    country: 'South Africa',
    postalCode: '8000',
    address: '120 Bree Street, Cape Town CBD',
    meetingTimes: 'Sundays: 10:00 AM | Fridays: 19:00 PM',
    coordinates: { latitude: -33.9249, longitude: 18.4241 },
    createdAt: '2023-05-10T00:00:00Z',
  },
  {
    id: 'ge-pretoria-subcluster',
    ministryId: 'god-embassy',
    ministryName: 'God Embassy',
    name: 'Tshwane Kingdom Sub-Cluster A',
    type: 'sub_cluster',
    leaderName: 'Elder Grace Van Zyl',
    contactNumber: '+27 12 342 9876',
    town: 'Pretoria',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0001',
    address: 'Hatfield Plaza Zone, Pretoria',
    meetingTimes: 'Thursdays: 18:00 PM',
    coordinates: { latitude: -25.7479, longitude: 28.2293 },
    createdAt: '2023-06-12T00:00:00Z',
  },

  // --- CHRIST EMBASSY BRANCHES & CELLS ---
  {
    id: 'ce-randburg-camp',
    ministryId: 'christ-embassy',
    ministryName: 'Christ Embassy',
    name: 'Christ Embassy Healing School & Randburg Church',
    type: 'branch',
    leaderName: 'Pastor Ose Oyakhilome',
    contactNumber: '+27 11 326 2460',
    town: 'Randburg',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2194',
    address: '303 Pretoria Avenue, Randburg',
    meetingTimes: 'Sundays: 08:30 AM & 10:30 AM | Wednesdays: 18:00 PM',
    coordinates: { latitude: -26.0936, longitude: 27.9947 },
    createdAt: '2018-01-01T00:00:00Z',
  },
  {
    id: 'ce-midrand-cell',
    ministryId: 'christ-embassy',
    ministryName: 'Christ Embassy',
    name: 'Midrand Kings Cell #4',
    type: 'homecell',
    leaderName: 'Brother Emmanuel Dube',
    contactNumber: '+27 71 888 4422',
    town: 'Midrand',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1685',
    address: 'Halfway Gardens, Midrand',
    meetingTimes: 'Wednesdays: 19:00 PM',
    coordinates: { latitude: -25.9992, longitude: 28.1263 },
    createdAt: '2022-04-18T00:00:00Z',
  },
  {
    id: 'ce-durban-central',
    ministryId: 'christ-embassy',
    ministryName: 'Christ Embassy',
    name: 'Christ Embassy Durban Central',
    type: 'branch',
    leaderName: 'Pastor Archie Aseme',
    contactNumber: '+27 31 305 7700',
    town: 'Durban',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    postalCode: '4000',
    address: '41 Anton Lembede Street, Durban Central',
    meetingTimes: 'Sundays: 09:00 AM | Thursdays: 18:00 PM',
    coordinates: { latitude: -29.8587, longitude: 31.0218 },
    createdAt: '2020-02-14T00:00:00Z',
  },
  {
    id: 'ce-lagos-cluster',
    ministryId: 'christ-embassy',
    ministryName: 'Christ Embassy',
    name: 'Lagos Zone 1 Megacell Cluster',
    type: 'cluster',
    leaderName: 'Pastor Lanre Alabi',
    contactNumber: '+234 1 888 1234',
    town: 'Lagos',
    province: 'Lagos State',
    country: 'Nigeria',
    postalCode: '100001',
    address: 'LoveWorld Convocation Arena, Oregun, Ikeja',
    meetingTimes: 'Saturdays: 16:00 PM',
    coordinates: { latitude: 6.5244, longitude: 3.3792 },
    createdAt: '2019-11-20T00:00:00Z',
  },

  // --- SPIRIT EMBASSY BRANCHES & CELLS ---
  {
    id: 'se-jhb-goodnews',
    ministryId: 'spirit-embassy',
    ministryName: 'Spirit Embassy',
    name: 'Spirit Embassy Johannesburg (The GoodNews Church)',
    type: 'branch',
    leaderName: 'Pastor Felix Angel',
    contactNumber: '+27 11 784 9000',
    town: 'Sandton',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '2196',
    address: 'Rivonia Road & 5th Street, Sandton CBD',
    meetingTimes: 'Sundays: 10:00 AM | Tuesdays: 19:00 PM',
    coordinates: { latitude: -26.1076, longitude: 28.0567 },
    createdAt: '2021-08-01T00:00:00Z',
  },
  {
    id: 'se-harare-central',
    ministryId: 'spirit-embassy',
    ministryName: 'Spirit Embassy',
    name: 'Spirit Embassy Harare City Church',
    type: 'branch',
    leaderName: 'Pastor Brian Chitando',
    contactNumber: '+263 24 270 0110',
    town: 'Harare',
    province: 'Harare Province',
    country: 'Zimbabwe',
    postalCode: '00263',
    address: 'Samora Machel Avenue, Harare CBD',
    meetingTimes: 'Sundays: 09:00 AM & 11:30 AM',
    coordinates: { latitude: -17.8252, longitude: 31.0335 },
    createdAt: '2015-04-10T00:00:00Z',
  },
  {
    id: 'se-london-hq',
    ministryId: 'spirit-embassy',
    ministryName: 'Spirit Embassy',
    name: 'Spirit Embassy London Global Campus',
    type: 'branch',
    leaderName: 'Prophet Uebert Angel',
    contactNumber: '+44 207 888 9900',
    town: 'London',
    province: 'Greater London',
    country: 'United Kingdom',
    postalCode: 'EC1A 1BB',
    address: 'Canary Wharf Conference Centre, London',
    meetingTimes: 'Sundays: 11:00 AM | Thursdays: 19:30 PM',
    coordinates: { latitude: 51.5074, longitude: -0.1278 },
    createdAt: '2012-01-10T00:00:00Z',
  },
  {
    id: 'se-centurion-cell',
    ministryId: 'spirit-embassy',
    ministryName: 'Spirit Embassy',
    name: 'Centurion Prophetic Cell Group',
    type: 'homecell',
    leaderName: 'Sister Tendai Moyo',
    contactNumber: '+27 73 999 1122',
    town: 'Centurion',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0157',
    address: 'Eldoraigne, Centurion',
    meetingTimes: 'Thursdays: 18:30 PM',
    coordinates: { latitude: -25.8603, longitude: 28.1894 },
    createdAt: '2023-09-01T00:00:00Z',
  },

  // --- ECG THE JESUS NATION CHURCH BRANCHES & CELLS ---
  {
    id: 'ecg-pta-showground',
    ministryId: 'ecg-jesus-nation',
    ministryName: 'ECG The Jesus Nation Church',
    name: 'ECG Pretoria Showgrounds Mega Branch',
    type: 'branch',
    leaderName: 'Pastor Charles Chirwa',
    contactNumber: '+27 12 327 4400',
    town: 'Pretoria',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0001',
    address: 'Pretoria Showgrounds, Soutter Street, Pretoria West',
    meetingTimes: 'Sundays: 08:00 AM & 12:00 PM | Fridays (Miracle Night): 19:00 PM',
    coordinates: { latitude: -25.7479, longitude: 28.2293 },
    createdAt: '2016-01-01T00:00:00Z',
  },
  {
    id: 'ecg-lilongwe-city',
    ministryId: 'ecg-jesus-nation',
    ministryName: 'ECG The Jesus Nation Church',
    name: 'ECG Lilongwe Jesus Nation Center',
    type: 'branch',
    leaderName: 'Prophet Shepherd Bushiri',
    contactNumber: '+265 1 777 222',
    town: 'Lilongwe',
    province: 'Central Region',
    country: 'Malawi',
    postalCode: '00265',
    address: 'Golden Peacock Complex, Area 13, Lilongwe',
    meetingTimes: 'Sundays: 09:00 AM & 02:00 PM | Wednesdays: 17:30 PM',
    coordinates: { latitude: -13.9626, longitude: 33.7741 },
    createdAt: '2020-11-15T00:00:00Z',
  },
  {
    id: 'ecg-soweto-cell',
    ministryId: 'ecg-jesus-nation',
    ministryName: 'ECG The Jesus Nation Church',
    name: 'Soweto Jesus Nation Cell #7',
    type: 'homecell',
    leaderName: 'Elder Thabo Mokoena',
    contactNumber: '+27 83 444 8811',
    town: 'Soweto',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '1804',
    address: 'Diepkloof Zone 4, Soweto',
    meetingTimes: 'Tuesdays: 18:30 PM',
    coordinates: { latitude: -26.2708, longitude: 27.8585 },
    createdAt: '2022-08-10T00:00:00Z',
  },
  {
    id: 'ecg-blantyre-cluster',
    ministryId: 'ecg-jesus-nation',
    ministryName: 'ECG The Jesus Nation Church',
    name: 'Blantyre Metro Cell Cluster',
    type: 'cluster',
    leaderName: 'Pastor Kelvin Phiri',
    contactNumber: '+265 1 820 440',
    town: 'Blantyre',
    province: 'Southern Region',
    country: 'Malawi',
    postalCode: '00265',
    address: 'Chichiri Convention Area, Blantyre',
    meetingTimes: 'Thursdays: 17:30 PM',
    coordinates: { latitude: -15.7861, longitude: 35.0058 },
    createdAt: '2021-03-05T00:00:00Z',
  },
];

// ============================================================================
// 3. STORAGE & CRUD OPERATIONS
// ============================================================================

/**
 * Retrieve all registered ministries (pre-added plus user-created).
 */
export async function getAllMinistries(): Promise<Ministry[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_MINISTRIES);
    const custom: Ministry[] = raw ? JSON.parse(raw) : [];
    return [...PRE_ADDED_MINISTRIES, ...custom];
  } catch (err) {
    console.warn('[MinistryService] Error reading ministries from storage:', err);
    return PRE_ADDED_MINISTRIES;
  }
}

/**
 * Retrieve a single ministry by its unique identifier.
 */
export async function getMinistryById(id: string): Promise<Ministry | null> {
  const all = await getAllMinistries();
  return all.find((m) => m.id === id) || null;
}

/**
 * Register a brand new ministry or church organization.
 */
export async function registerMinistry(input: {
  name: string;
  founder: string;
  headquarters: string;
  headquartersCountry: string;
  description: string;
  category: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
}): Promise<Ministry> {
  const newMinistry: Ministry = {
    id: `custom-ministry-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: input.name.trim(),
    founder: input.founder.trim(),
    headquarters: input.headquarters.trim(),
    headquartersCountry: input.headquartersCountry.trim(),
    description: input.description.trim(),
    category: input.category.trim() || 'Evangelical & Apostolic',
    branchesCount: 0,
    homecellsCount: 0,
    website: input.website?.trim(),
    contactEmail: input.contactEmail?.trim(),
    contactPhone: input.contactPhone?.trim(),
    isPreadded: false,
    createdAt: new Date().toISOString(),
  };

  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_MINISTRIES);
    const customList: Ministry[] = raw ? JSON.parse(raw) : [];
    customList.unshift(newMinistry);
    await AsyncStorage.setItem(STORAGE_KEY_CUSTOM_MINISTRIES, JSON.stringify(customList));
  } catch (err) {
    console.warn('[MinistryService] Error saving custom ministry:', err);
  }

  return newMinistry;
}

/**
 * Retrieve all branches across all ministries (pre-added plus user-created).
 */
export async function getAllBranches(): Promise<Branch[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_BRANCHES);
    const custom: Branch[] = raw ? JSON.parse(raw) : [];
    return [...PRE_ADDED_BRANCHES, ...custom];
  } catch (err) {
    console.warn('[MinistryService] Error reading branches from storage:', err);
    return PRE_ADDED_BRANCHES;
  }
}

/**
 * Retrieve branches filtered by ministry ID and optional structural type / search query.
 */
export async function getBranchesByMinistry(
  ministryId: string,
  typeFilter?: BranchType | 'all',
  searchQuery?: string
): Promise<Branch[]> {
  const allBranches = await getAllBranches();
  let list = allBranches.filter((b) => b.ministryId === ministryId);

  if (typeFilter && typeFilter !== 'all') {
    list = list.filter((b) => b.type === typeFilter);
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.leaderName.toLowerCase().includes(q) ||
        b.town.toLowerCase().includes(q) ||
        b.province.toLowerCase().includes(q) ||
        b.country.toLowerCase().includes(q)
    );
  }

  return list;
}

/**
 * Register a new branch, homecell, cell branch, sub-cluster, or cluster.
 * Automatically integrates geocoded cascade coordinates if not specified.
 */
export async function registerBranch(input: {
  ministryId: string;
  ministryName: string;
  name: string;
  type: BranchType;
  leaderName: string;
  contactNumber: string;
  contactEmail?: string;
  town: string;
  province?: string;
  country?: string;
  postalCode?: string;
  address: string;
  meetingTimes: string;
  coordinates?: { latitude: number; longitude: number };
}): Promise<Branch> {
  // Automatically resolve cascade if any geographical field is missing
  const geoResolved = resolveTownDetails(input.town);

  const province = input.province || geoResolved?.province || 'Gauteng';
  const country = input.country || geoResolved?.country || 'South Africa';
  const postalCode = input.postalCode || geoResolved?.postalCode || '0000';
  const coordinates = input.coordinates || geoResolved?.coordinates || {
    latitude: -26.2041,
    longitude: 28.0473,
  };

  const newBranch: Branch = {
    id: `custom-branch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ministryId: input.ministryId,
    ministryName: input.ministryName,
    name: input.name.trim(),
    type: input.type,
    leaderName: input.leaderName.trim(),
    contactNumber: input.contactNumber.trim(),
    contactEmail: input.contactEmail?.trim(),
    town: input.town.trim(),
    province,
    country,
    postalCode,
    address: input.address.trim(),
    meetingTimes: input.meetingTimes.trim() || 'Sundays: 09:30 AM',
    coordinates,
    createdAt: new Date().toISOString(),
  };

  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_BRANCHES);
    const customList: Branch[] = raw ? JSON.parse(raw) : [];
    customList.unshift(newBranch);
    await AsyncStorage.setItem(STORAGE_KEY_CUSTOM_BRANCHES, JSON.stringify(customList));

    // Update custom ministry count if it exists in custom ministries
    const minRaw = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_MINISTRIES);
    if (minRaw) {
      const minList: Ministry[] = JSON.parse(minRaw);
      const targetMin = minList.find((m) => m.id === input.ministryId);
      if (targetMin) {
        if (input.type === 'homecell') {
          targetMin.homecellsCount += 1;
        } else {
          targetMin.branchesCount += 1;
        }
        await AsyncStorage.setItem(STORAGE_KEY_CUSTOM_MINISTRIES, JSON.stringify(minList));
      }
    }
  } catch (err) {
    console.warn('[MinistryService] Error saving custom branch:', err);
  }

  return newBranch;
}

/**
 * Returns human-readable label for a BranchType.
 */
export function getBranchTypeLabel(type: BranchType): string {
  switch (type) {
    case 'branch':
      return 'Main Branch / Campus';
    case 'homecell':
      return 'Homecell Fellowship';
    case 'cell_branch':
      return 'Cell Branch';
    case 'sub_cluster':
      return 'Sub-Cluster';
    case 'cluster':
      return 'Cluster Center';
    default:
      return 'Branch';
  }
}
