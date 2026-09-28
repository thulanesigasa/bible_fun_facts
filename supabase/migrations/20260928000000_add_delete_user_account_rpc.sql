-- ==============================================================================
-- Migration: 20260928000000_add_delete_user_account_rpc.sql
-- Description: Complete GDPR/CCPA/POPIA self-service account deletion RPC
-- Cascades user erasure across public tables, storage objects, and auth.users
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, storage
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- 1. Identify currently authenticated user
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- 2. Delete user favorites & study progress
  DELETE FROM public.user_favorites_facts WHERE user_id = v_user_id;
  DELETE FROM public.user_favorites_scriptures WHERE user_id = v_user_id;
  DELETE FROM public.user_study_progress WHERE user_id = v_user_id;
  DELETE FROM public.study_notes WHERE user_id = v_user_id;

  -- 3. Delete avatar assets from storage bucket
  DELETE FROM storage.objects WHERE bucket_id = 'avatars' AND owner = v_user_id;

  -- 4. Delete profile entry
  DELETE FROM public.profiles WHERE id = v_user_id;

  -- 5. Delete authentication record from auth.users
  DELETE FROM auth.users WHERE id = v_user_id;

  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Account deletion failed: %', SQLERRM;
    RETURN FALSE;
END;
$$;

-- Grant execution to authenticated users
REVOKE ALL ON FUNCTION public.delete_user_account() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_user_account() TO authenticated;