-- Review/approval required before applying to production project ibwooiejzxhbzplnldcz.
-- Isolated from profiles, auth.users, study data and existing security migrations.
begin;
create table public.launch_waitlist (
  email text primary key,
  consent_version text not null default 'launch-v1' check (consent_version = 'launch-v1'),
  consented_at timestamptz not null default now(),
  source text not null default 'website' check (source = 'website'),
  constraint launch_waitlist_email_valid check (
    email = lower(btrim(email)) and length(email) <= 254 and
    email ~ '^[a-z0-9!#$%&''*+/=?^_`{|}~.-]+@[a-z0-9.-]+\.[a-z]{2,63}$' and
    length(split_part(email, '@', 1)) <= 64 and
    email !~ '(^\.|\.\.|\.@|@\.|@-|\.-|-\.|-$)'
  )
);
create table public.launch_waitlist_limits (
  bucket_key text primary key,
  window_start timestamptz not null,
  attempts integer not null check (attempts >= 1 and attempts <= 501)
);
create index launch_waitlist_limits_window_idx on public.launch_waitlist_limits(window_start);
alter table public.launch_waitlist enable row level security;
alter table public.launch_waitlist_limits enable row level security;
-- No anonymous/authenticated policies: no browser reads or writes.
revoke all on table public.launch_waitlist, public.launch_waitlist_limits from public, anon, authenticated, service_role;
grant select, insert, delete on public.launch_waitlist to service_role;
grant select, insert, update, delete on public.launch_waitlist_limits to service_role;
comment on table public.launch_waitlist is 'Private launch notifications; no auth account is created. Remove on unsubscribe; purge within 90 days after final notification.';
comment on table public.launch_waitlist_limits is 'Short-lived HMAC IP rate-limit buckets; never raw IP addresses. Expired entries cleaned on submission.';

create function public.register_launch_waitlist(p_email text, p_consent boolean, p_ip_hash text)
returns text language plpgsql security invoker set search_path = '' as $$
declare
  normalized_email text := lower(btrim(p_email));
  bucket text;
  count_attempts integer;
  window_time timestamptz := to_timestamp(floor(extract(epoch from now()) / 900) * 900);
begin
  if p_consent is distinct from true or normalized_email is null or
     p_ip_hash is null or p_ip_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid waitlist request' using errcode = '22023';
  end if;
  -- A single global counter bounds total writes even if attackers rotate addresses/IPs.
  -- Fixed lock order (global then IP) avoids deadlocks. UPSERT locks serialize races.
  foreach bucket in array array['global', 'ip:' || p_ip_hash] loop
    insert into public.launch_waitlist_limits(bucket_key, window_start, attempts)
    values (bucket, window_time, 1)
    on conflict (bucket_key) do update set
      attempts = case when launch_waitlist_limits.window_start < window_time then 1
        else least(launch_waitlist_limits.attempts + 1, 501) end,
      window_start = window_time
    returning attempts into count_attempts;
    if (bucket = 'global' and count_attempts > 500) or (bucket <> 'global' and count_attempts > 5) then
      return 'rate_limited';
    end if;
  end loop;
  delete from public.launch_waitlist_limits where window_start < now() - interval '1 day';
  insert into public.launch_waitlist(email) values(normalized_email) on conflict (email) do nothing;
  -- Same answer for inserted and existing rows: prevents membership enumeration.
  -- A duplicate never changes the original consent timestamp or its scope.
  return 'accepted';
end;
$$;
revoke all on function public.register_launch_waitlist(text, boolean, text) from public, anon, authenticated, service_role;
grant execute on function public.register_launch_waitlist(text, boolean, text) to service_role;
commit;
