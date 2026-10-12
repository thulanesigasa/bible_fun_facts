-- Atomic privacy preference updates, scoped to authenticated user.
-- Existing direct table RLS remains in force; this function does not elevate privileges.
CREATE OR REPLACE FUNCTION public.set_my_privacy_preference(
  p_field TEXT, p_enabled BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE v_user_id UUID := (SELECT auth.uid());
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '28000';
  END IF;
  IF p_field NOT IN ('is_discoverable', 'show_streaks_publicly', 'private_study_notes') THEN
    RAISE EXCEPTION 'Invalid privacy preference';
  END IF;
  INSERT INTO public.user_privacy_settings (user_id)
  VALUES (v_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Do not overwrite unrelated columns/defaults on repeated edits.
  UPDATE public.user_privacy_settings
  SET
    is_discoverable = CASE WHEN p_field = 'is_discoverable'
      THEN p_enabled ELSE is_discoverable END,
    show_streaks_publicly = CASE WHEN p_field = 'show_streaks_publicly'
      THEN p_enabled ELSE show_streaks_publicly END,
    private_study_notes = CASE WHEN p_field = 'private_study_notes'
      THEN p_enabled ELSE private_study_notes END,
    updated_at = now()
  WHERE user_id = v_user_id;
END;
$$;
REVOKE ALL ON FUNCTION public.set_my_privacy_preference(TEXT, BOOLEAN) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_my_privacy_preference(TEXT, BOOLEAN) TO authenticated;
