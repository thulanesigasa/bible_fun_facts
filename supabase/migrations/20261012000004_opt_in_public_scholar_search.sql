-- Minimal privacy-aware community discovery endpoint.
-- The underlying profiles table remains owner-only; this function exposes
-- only an explicit allowlist after the owner opts in on the server.
CREATE OR REPLACE FUNCTION public.search_public_scholars(
  p_query TEXT DEFAULT '',
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  public_streak INTEGER
)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT p.id,
         p.username,
         p.full_name,
         p.avatar_url,
         CASE WHEN v.show_streaks_publicly THEN p.streak ELSE NULL END
  FROM public.profiles AS p
  INNER JOIN public.user_privacy_settings AS v ON v.user_id = p.id
  WHERE auth.uid() IS NOT NULL
    AND v.is_discoverable IS TRUE
    AND (
      coalesce(trim(p_query), '') = ''
      OR p.username ILIKE '%' || replace(replace(left(trim(p_query), 60), '%', '\%'), '_', '\_') || '%' ESCAPE '\'
    )
  ORDER BY p.username ASC
  LIMIT LEAST(GREATEST(coalesce(p_limit, 20), 1), 50);
$$;
REVOKE ALL ON FUNCTION public.search_public_scholars(TEXT, INTEGER)
FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.search_public_scholars(TEXT, INTEGER)
TO authenticated;

COMMENT ON FUNCTION public.search_public_scholars(TEXT, INTEGER) IS
  'Opt-in community lookup; never exposes email, phone, private progress or undiscoverable profiles.';
