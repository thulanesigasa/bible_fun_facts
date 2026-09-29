/**
 * Ministry & Church Directory Service
 *
 * 100% Supabase-backed persistent storage.
 * All ministries and branches are stored in the `public.ministries` and
 * `public.branches` Supabase PostgreSQL tables.
 *
 * The pre-seeded canonical ministries (God Embassy, Christ Embassy, Spirit Embassy,
 * ECG The Jesus Nation Church) and their canonical branches are inserted via SQL
 * migration (supabase/migrations/20260929153319_create_ministries_and_branches.sql).
 *
 * This service no longer uses AsyncStorage, in-memory mock data, or hard-coded
 * fallback arrays. Everything is live from Supabase.
 *
 * RLS Policy:
 *   - Read: public (anyone, unauthenticated)
 *   - Insert/Update: authenticated users only
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
    branchesCount: row.branches_count ?? 0,
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
 * Retrieve all registered ministries from Supabase.
 * Results are ordered: pre-added canonical first, then user-created by newest.
 */
export async function getAllMinistries(): Promise<Ministry[]> {
  const { data, error } = await supabase
    .from('ministries')
    .select('*')
    .order('is_preadded', { ascending: false })
    .order('created_at', { ascending: true });

  if (error) {
    console.warn('[MinistryService] getAllMinistries error:', error.message);
    return [];
  }

  return (data ?? []).map(rowToMinistry);
}

/**
 * Retrieve a single ministry by its UUID.
 */
export async function getMinistryById(id: string): Promise<Ministry | null> {
  const { data, error } = await supabase
    .from('ministries')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.warn('[MinistryService] getMinistryById error:', error?.message);
    return null;
  }

  return rowToMinistry(data);
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
 * Retrieve all branches across all ministries.
 * Ordered: pre-added first, then newest user-created.
 */
export async function getAllBranches(): Promise<Branch[]> {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .order('is_preadded', { ascending: false })
    .order('created_at', { ascending: true });

  if (error) {
    console.warn('[MinistryService] getAllBranches error:', error.message);
    return [];
  }

  return (data ?? []).map(rowToBranch);
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
  let query = supabase
    .from('branches')
    .select('*')
    .eq('ministry_id', ministryId)
    .order('is_preadded', { ascending: false })
    .order('created_at', { ascending: true });

  if (typeFilter && typeFilter !== 'all') {
    query = query.eq('type', typeFilter);
  }

  const { data, error } = await query;

  if (error) {
    console.warn('[MinistryService] getBranchesByMinistry error:', error.message);
    return [];
  }

  let branches = (data ?? []).map(rowToBranch);

  // Client-side full-text search (faster than ilike for small datasets)
  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.trim().toLowerCase();
    branches = branches.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.leaderName.toLowerCase().includes(q) ||
        b.town.toLowerCase().includes(q) ||
        b.province.toLowerCase().includes(q) ||
        b.country.toLowerCase().includes(q)
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
    province: input.province?.trim() || 'Gauteng',
    country: input.country?.trim() || 'South Africa',
    postal_code: input.postalCode?.trim() || '0000',
    address: input.address.trim(),
    meeting_times: input.meetingTimes.trim() || 'Sundays: 09:30 AM',
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

  // Atomically increment ministry branch/homecell count
  await supabase.rpc('increment_ministry_count', {
    p_ministry_id: input.ministryId,
    p_branch_type: input.type,
  });

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
