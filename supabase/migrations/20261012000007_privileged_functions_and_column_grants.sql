-- Privileged RPCs must not be discoverable/callable by anonymous REST clients.
-- Trigger functions remain usable by their database triggers after EXECUTE revoke.
REVOKE ALL ON FUNCTION public.delete_user_account() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_user_account() TO authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.increment_ministry_count(uuid, text)
  FROM PUBLIC, anon, authenticated;

-- Keep the existing trigger behavior; only lock the function resolution path.
ALTER FUNCTION public.handle_new_user() SET search_path = '';
ALTER FUNCTION public.set_updated_at() SET search_path = '';

-- Prevent direct client-side changes to calculated ministry counts while
-- retaining update rights for profile/detail fields of owned rows.
REVOKE UPDATE (branches_count, homecells_count, created_by, is_preadded)
 ON TABLE public.ministries FROM authenticated;
REVOKE UPDATE (created_by, is_preadded)
 ON TABLE public.branches FROM authenticated;
