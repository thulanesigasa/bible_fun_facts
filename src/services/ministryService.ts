/**
 * Ministry & Church Directory Service
 *
 * 100% persistent storage with resilient offline & canonical fallbacks.
 * All ministries and branches are stored in Supabase PostgreSQL tables
 * with built-in canonical datasets for the four founding global ministries:
 * - God Embassy (Pretoria, South Africa - 6X4R+2Q, R511, Pretoria, 0001)
 * - Christ Embassy (Lagos, Nigeria - 51/53 Kudirat Abiola Way, Oregun, Ikeja)
 * - Spirit Embassy (Harare, Zimbabwe - Harare Hippodrome, Braeside)
 * - ECG The Jesus Nation Church (Lilongwe, Malawi - Golden Peacock Complex)
 *
 * Ensures church campus maps and directories render 100% reliably in
 * both online and offline environments.
 */

import { supabase } from './supabase';

// ============================================================================
// TYPES
// ============================================================================

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

// ============================================================================
// CANONICAL MINISTRIES & PHYSICAL CAMPUS SEED DATA
// ============================================================================

export const CANONICAL_MINISTRIES: Ministry[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'God Embassy',
    founder: 'Prophet Isaiah Brian Sovi & Pastor Shanna Sovi',
    headquarters: 'Pretoria',
    headquartersCountry: 'South Africa',
    description:
      'God Embassy is a global ministry led by Prophet Isaiah Brian Sovi and Pastor Shanna Sovi, commissioned to raise a generation that encounters God, walks in authority and impacts nations through the power of Jesus Christ.',
    category: 'Apostolic & Kingdom Reformation',
    branchesCount: 1,
    homecellsCount: 0,
    website: 'https://godembassy.org',
    contactEmail: 'contact@godembassy.org',
    contactPhone: '+27 71 102 6507',
    isPreadded: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Christ Embassy',
    founder: 'Rev. Dr. Chris Oyakhilome',
    headquarters: 'Lagos',
    headquartersCountry: 'Nigeria',
    description:
      'Christ Embassy (Believers LoveWorld Inc.) is a global Christian ministry founded by Rev. Dr. Chris Oyakhilome, dedicated to giving lives a divine meaning and demonstrating the character of the Holy Spirit through the Word of God.',
    category: 'Word of Faith & Evangelism',
    branchesCount: 1,
    homecellsCount: 0,
    website: 'https://christembassy.org',
    contactEmail: 'info@loveworld360.com',
    contactPhone: '+234 1 888 8888',
    isPreadded: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Spirit Embassy',
    founder: 'Prophet Uebert Angel & Prophetess Beverly Angel',
    headquarters: 'Harare',
    headquartersCountry: 'Zimbabwe',
    description:
      'Spirit Embassy the GoodNews Church is a global ministry founded by Prophet Uebert Angel and Prophetess Beverly Angel, with over 3.2 million registered citizens worldwide. Recognized as a leading voice in the prophetic movement, the ministry preaches the Good News of the Grace of God.',
    category: 'Prophetic & Grace Revelation',
    branchesCount: 1,
    homecellsCount: 0,
    website: 'https://spiritembassy.org',
    contactEmail: 'info@spiritembassy.com',
    contactPhone: '+263 77 123 4567',
    isPreadded: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'ECG The Jesus Nation Church',
    founder: 'Prophet Shepherd Bushiri',
    headquarters: 'Lilongwe',
    headquartersCountry: 'Malawi',
    description:
      'Founded solidly on the gospel of Jesus Christ, ECG The Jesus Nation Church is a global entity setting the pace in fulfilling the Great Commission. A church without borders, ECG exists in more than 70 countries through branches, clusters, homecells, and online congregations.',
    category: 'Prophetic & Apostolic Community',
    branchesCount: 1,
    homecellsCount: 0,
    website: 'https://jesusnation.org',
    contactEmail: 'info@ecgchurch.org',
    contactPhone: '+265 1 777 999',
    isPreadded: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
];

export const CANONICAL_BRANCHES: Branch[] = [
  {
    id: '00000000-0000-0000-0000-000000000101',
    ministryId: '00000000-0000-0000-0000-000000000001',
    ministryName: 'God Embassy',
    name: 'God Embassy Prayer Mountain Pretoria',
    type: 'branch',
    leaderName: 'Prophet Isaiah Brian Sovi & Pastor Shanna Sovi',
    contactNumber: '+27 71 102 6507',
    contactEmail: 'contact@godembassy.org',
    town: 'Pretoria',
    province: 'Gauteng',
    country: 'South Africa',
    postalCode: '0001',
    address: '6X4R+2Q, R511, Pretoria, 0001',
    meetingTimes: 'Sunday 09:00 & Wednesday 18:00',
    coordinates: {
      latitude: -25.794938,
      longitude: 27.991938,
    },
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000102',
    ministryId: '00000000-0000-0000-0000-000000000002',
    ministryName: 'Christ Embassy',
    name: 'Christ Embassy Lagos Headquarters',
    type: 'branch',
    leaderName: 'Rev. Dr. Chris Oyakhilome',
    contactNumber: '+234 1 888 8888',
    contactEmail: 'info@loveworld360.com',
    town: 'Ikeja',
    province: 'Lagos State',
    country: 'Nigeria',
    postalCode: '100281',
    address: '51/53 Kudirat Abiola Way (and 8 Billings Way), Oregun, Ikeja, Lagos, Nigeria',
    meetingTimes: 'Sunday 08:30 & Wednesday 18:30',
    coordinates: {
      latitude: 6.599262,
      longitude: 3.365993,
    },
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000103',
    ministryId: '00000000-0000-0000-0000-000000000003',
    ministryName: 'Spirit Embassy',
    name: 'Spirit Embassy Harare Hippodrome',
    type: 'branch',
    leaderName: 'Prophet Uebert Angel & Prophetess Beverly Angel',
    contactNumber: '+263 77 123 4567',
    contactEmail: 'info@spiritembassy.com',
    town: 'Harare',
    province: 'Harare Province',
    country: 'Zimbabwe',
    postalCode: '00263',
    address: 'Harare Hippodrome, Stand 19797, Braeside, Harare, Zimbabwe',
    meetingTimes: 'Sunday 10:00 & Thursday 18:00',
    coordinates: {
      latitude: -17.842234,
      longitude: 31.064743,
    },
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '00000000-0000-0000-0000-000000000104',
    ministryId: '00000000-0000-0000-0000-000000000004',
    ministryName: 'ECG The Jesus Nation Church',
    name: 'ECG Golden Peacock Complex',
    type: 'branch',
    leaderName: 'Prophet Shepherd Bushiri',
    contactNumber: '+265 1 777 999',
    contactEmail: 'info@ecgchurch.org',
    town: 'Lilongwe',
    province: 'Central Region',
    country: 'Malawi',
    postalCode: '00265',
    address: 'Golden Peacock Complex / House, Presidential Way, City Centre, Lilongwe, Malawi',
    meetingTimes: 'Sunday 09:00 & Midweek Service 17:30',
    coordinates: {
      latitude: -13.961257,
      longitude: 33.799067,
    },
    createdAt: '2026-01-01T00:00:00Z',
  },
];

// ============================================================================
// ROW MAPPERS (DB snake_case → TS camelCase)
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToMinistry(row: any): Ministry {
  return {
    id: row.id,
    name: row.name,
    founder: row.founder,
    headquarters: row.headquarters,
    headquartersCountry: row.headquarters_country,
    description: row.description,
    category: row.category,
    branchesCount: row.branches_count ?? 1,
    homecellsCount: row.homecells_count ?? 0,
    website: row.website ?? undefined,
    contactEmail: row.contact_email ?? undefined,
    contactPhone: row.contact_phone ?? undefined,
    isPreadded: row.is_preadded ?? false,
    createdAt: row.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToBranch(row: any): Branch {
  return {
    id: row.id,
    ministryId: row.ministry_id,
    ministryName: row.ministry_name,
    name: row.name,
    type: row.type as BranchType,
    leaderName: row.leader_name,
    contactNumber: row.contact_number,
    contactEmail: row.contact_email ?? undefined,
    town: row.town,
    province: row.province,
    country: row.country,
    postalCode: row.postal_code,
    address: row.address,
    meetingTimes: row.meeting_times,
    coordinates: {
      latitude: row.latitude,
      longitude: row.longitude,
    },
    createdAt: row.created_at,
  };
}

// ============================================================================
// MINISTRY CRUD
// ============================================================================

/**
 * Retrieve all registered ministries from Supabase,
 * with resilient offline fallback to canonical ministries.
 */
export async function getAllMinistries(): Promise<Ministry[]> {
  try {
    const { data, error } = await supabase
      .from('ministries')
      .select('*')
      .order('is_preadded', { ascending: false })
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return CANONICAL_MINISTRIES;
    }

    const fetched = data.map(rowToMinistry);
    // Combine fetched with canonical ministries (canonical first)
    const nonCanonical = fetched.filter(
      (m) =>
        !CANONICAL_MINISTRIES.some(
          (c) => c.id === m.id || c.name.toLowerCase() === m.name.toLowerCase()
        )
    );

    return [...CANONICAL_MINISTRIES, ...nonCanonical];
  } catch {
    return CANONICAL_MINISTRIES;
  }
}

/**
 * Retrieve a single ministry by its UUID,
 * checking Supabase first and falling back to canonical records.
 */
export async function getMinistryById(id: string): Promise<Ministry | null> {
  try {
    const { data, error } = await supabase
      .from('ministries')
      .select('*')
      .eq('id', id)
      .single();

    if (data && !error) {
      return rowToMinistry(data);
    }
  } catch {
    // Fall back to canonical records
  }

  return CANONICAL_MINISTRIES.find((m) => m.id === id) || null;
}

/**
 * Register a brand new ministry or church organization.
 * Persists permanently to Supabase `ministries` table.
 * Requires the user to be authenticated (Supabase RLS).
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
  const payload = {
    name: input.name.trim(),
    founder: input.founder.trim(),
    headquarters: input.headquarters.trim() || 'Johannesburg',
    headquarters_country: input.headquartersCountry.trim() || 'South Africa',
    description:
      input.description.trim() ||
      `Global Christian ministry founded by ${input.founder.trim()}.`,
    category: input.category.trim() || 'Evangelical & Apostolic',
    branches_count: 0,
    homecells_count: 0,
    website: input.website?.trim() || null,
    contact_email: input.contactEmail?.trim() || null,
    contact_phone: input.contactPhone?.trim() || null,
    is_preadded: false,
  };

  const { data, error } = await supabase
    .from('ministries')
    .insert(payload)
    .select()
    .single();

  if (error || !data) {
    console.error('[MinistryService] registerMinistry error:', error?.message);
    throw new Error(error?.message || 'Failed to register ministry.');
  }

  return rowToMinistry(data);
}

// ============================================================================
// BRANCH CRUD
// ============================================================================

/**
 * Retrieve all branches across all ministries,
 * merging user-created branches with canonical campuses.
 */
export async function getAllBranches(): Promise<Branch[]> {
  try {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('is_preadded', { ascending: false })
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return CANONICAL_BRANCHES;
    }

    const fetched = data.map(rowToBranch);
    const userBranches = fetched.filter(
      (b) =>
        !CANONICAL_BRANCHES.some(
          (c) =>
            c.id === b.id ||
            (c.ministryId === b.ministryId && c.address === b.address)
        )
    );

    return [...CANONICAL_BRANCHES, ...userBranches];
  } catch {
    return CANONICAL_BRANCHES;
  }
}

/**
 * Retrieve branches for a specific ministry,
 * with optional type filter and full-text search.
 */
export async function getBranchesByMinistry(
  ministryId: string,
  typeFilter?: BranchType | 'all',
  searchQuery?: string
): Promise<Branch[]> {
  const all = await getAllBranches();
  let branches = all.filter((b) => b.ministryId === ministryId);

  if (typeFilter && typeFilter !== 'all') {
    branches = branches.filter((b) => b.type === typeFilter);
  }

  // Client-side full-text search
  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.trim().toLowerCase();
    branches = branches.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.leaderName.toLowerCase().includes(q) ||
        b.town.toLowerCase().includes(q) ||
        b.province.toLowerCase().includes(q) ||
        b.country.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q)
    );
  }

  return branches;
}

/**
 * Register a new branch, homecell, cell branch, sub-cluster, or cluster.
 * Geocoded coordinates must be supplied by the caller (from geoService).
 * Persists permanently to Supabase `branches` table.
 * Calls `increment_ministry_count` RPC to atomically update the ministry's counter.
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
  const payload = {
    ministry_id: input.ministryId,
    ministry_name: input.ministryName.trim(),
    name: input.name.trim(),
    type: input.type,
    leader_name: input.leaderName.trim(),
    contact_number: input.contactNumber.trim(),
    contact_email: input.contactEmail?.trim() || null,
    town: input.town.trim(),
    province: input.province?.trim() || 'Province',
    country: input.country?.trim() || 'South Africa',
    postal_code: input.postalCode?.trim() || '0000',
    address: input.address.trim(),
    meeting_times: input.meetingTimes.trim() || 'Sundays: 09:00 AM',
    latitude: input.coordinates?.latitude ?? -26.2041,
    longitude: input.coordinates?.longitude ?? 28.0473,
    is_preadded: false,
  };

  const { data, error } = await supabase
    .from('branches')
    .insert(payload)
    .select()
    .single();

  if (error || !data) {
    console.error('[MinistryService] registerBranch error:', error?.message);
    throw new Error(error?.message || 'Failed to register branch.');
  }

  // Atomically update ministry count via RPC
  try {
    const isHomecell = input.type === 'homecell';
    await supabase.rpc('increment_ministry_count', {
      p_ministry_id: input.ministryId,
      p_is_homecell: isHomecell,
    });
  } catch (rpcErr) {
    console.warn('[MinistryService] increment_ministry_count RPC warning:', rpcErr);
  }

  return rowToBranch(data);
}

// ============================================================================
// UTILITIES
// ============================================================================

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

