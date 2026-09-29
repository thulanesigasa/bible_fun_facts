-- =============================================================================
-- Migration: 20260930000002_remove_all_canonical_branches.sql
--
-- Removes all pre-seeded (is_preadded = TRUE) branch records from the
-- branches table for all four canonical ministries.
--
-- Christ Embassy:  1 cluster, 1 homecell, 2 branches
-- God Embassy:     2 branches, 1 homecell, 1 sub_cluster
-- Spirit Embassy:  3 branches, 1 homecell
-- ECG (The Jesus Nation Church): 2 branches, 1 homecell, 1 cluster
--
-- The ministry organizations themselves (ministries table) are retained.
-- Only their branch/homecell/cluster directory entries are cleared.
-- Branch and homecell counters on parent ministries are also reset to 0.
-- =============================================================================

-- Delete all pre-seeded branches
DELETE FROM public.branches
WHERE is_preadded = TRUE;

-- Reset branch/homecell counters on all canonical ministries
UPDATE public.ministries
SET
  branches_count  = 0,
  homecells_count = 0,
  updated_at      = NOW()
WHERE is_preadded = TRUE;
