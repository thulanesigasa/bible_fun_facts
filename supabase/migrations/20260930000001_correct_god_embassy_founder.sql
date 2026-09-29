-- =============================================================================
-- Migration: 20260930000001_correct_god_embassy_founder.sql
--
-- Corrects the founder name for God Embassy from 'Pastor Sunday Adelaja'
-- to 'Prophet Isaiah Sovi' as per verified ministry records.
-- =============================================================================

UPDATE public.ministries
SET
  founder    = 'Prophet Isaiah Sovi',
  updated_at = NOW()
WHERE id = '00000000-0000-0000-0000-000000000001'
  AND name   = 'God Embassy';
