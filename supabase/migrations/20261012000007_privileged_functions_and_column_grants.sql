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

-- Prevent direct client-side updates to canonical flags, ownership and
-- server-derived counters. Column REVOKE alone cannot override a table UPDATE
-- grant, so remove table-level UPDATE before granting only editable fields.
REVOKE UPDATE ON public.ministries FROM authenticated;
REVOKE UPDATE ON public.branches FROM authenticated;
GRANT UPDATE (
  name, founder, headquarters, headquarters_country, description, category,
  website, contact_email, contact_phone
) ON public.ministries TO authenticated;
GRANT UPDATE (
  ministry_id, ministry_name, name, type, leader_name, contact_number,
  contact_email, town, province, country, postal_code, address,
  meeting_times, latitude, longitude
) ON public.branches TO authenticated;
