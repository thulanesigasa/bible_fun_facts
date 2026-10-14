-- Aggregate-only waitlist monitoring and persistent admin login throttling.
-- Requires 20261013061117_launch_waitlist.sql. No auth/profile/study rows are changed.
begin;
create index launch_waitlist_consented_at_idx on public.launch_waitlist(consented_at);
create table public.admin_login_limits (
  bucket_key text primary key,
  window_start timestamptz not null,
  attempts integer not null check (attempts between 1 and 1001)
);
alter table public.admin_login_limits enable row level security;
revoke all on public.admin_login_limits from public, anon, authenticated, service_role;
grant select, insert, update, delete on public.admin_login_limits to service_role;
create index admin_login_limits_window_idx on public.admin_login_limits(window_start);
comment on table public.admin_login_limits is 'Short-lived keyed-hash admin login rate buckets. No passwords, emails, tokens or raw IPs. Server-only access.';

create function public.consume_admin_login_attempt(p_ip_hash text, p_email_hash text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare
  window_time timestamptz := pg_catalog.date_bin(interval '15 minutes', now(), timestamptz '2000-01-01 00:00:00+00');
  key_value text;
  max_attempts integer;
  current_attempts integer;
  permitted boolean := true;
begin
  if p_ip_hash is null or p_email_hash is null or p_ip_hash !~ '^[a-f0-9]{64}$' or p_email_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid login rate key' using errcode='22023';
  end if;
  -- A consistent order also serialises concurrent requests against the global bucket.
  for key_value, max_attempts in select * from (values ('global',1000), ('ip:'||p_ip_hash,10), ('email:'||p_email_hash,5)) as limits(key_name,maximum)
  loop
    insert into public.admin_login_limits(bucket_key,window_start,attempts) values(key_value,window_time,1)
    on conflict(bucket_key) do update set
      attempts = case when admin_login_limits.window_start < window_time then 1 else least(admin_login_limits.attempts+1,1001) end,
      window_start = window_time
    returning attempts into current_attempts;
    if current_attempts > max_attempts then permitted := false; end if;
  end loop;
  delete from public.admin_login_limits where window_start < now()-interval '1 day';
  return permitted;
end;
$$;
revoke all on function public.consume_admin_login_attempt(text,text) from public,anon,authenticated,service_role;
grant execute on function public.consume_admin_login_attempt(text,text) to service_role;

create function public.get_launch_waitlist_stats()
returns jsonb language sql stable security invoker set search_path = '' as $$
  with boundaries as (
    select (now() at time zone 'Africa/Johannesburg')::date as today
  ), counts as (
    select count(*) as total,
      count(*) filter(where consented_at >= (b.today::timestamp at time zone 'Africa/Johannesburg')) as today,
      count(*) filter(where consented_at >= ((b.today-6)::timestamp at time zone 'Africa/Johannesburg')) as last_7,
      count(*) filter(where consented_at >= ((b.today-29)::timestamp at time zone 'Africa/Johannesburg')) as last_30,
      max(consented_at) as latest
    from public.launch_waitlist cross join boundaries b
  ), days as (
    select b.today-offset_day as day from boundaries b cross join pg_catalog.generate_series(0,29) as offset_day
  ), daily as (
    select (w.consented_at at time zone 'Africa/Johannesburg')::date as day, count(*) as amount
    from public.launch_waitlist w cross join boundaries b
    where w.consented_at >= ((b.today-29)::timestamp at time zone 'Africa/Johannesburg')
    group by 1
  )
  select pg_catalog.jsonb_build_object(
    'total',c.total,'today',c.today,'last7Days',c.last_7,'last30Days',c.last_30,
    'latestSignup',c.latest,'updatedAt',now(),'timezone','Africa/Johannesburg',
    'daily',(select pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object('date',d.day,'count',coalesce(a.amount,0)) order by d.day) from days d left join daily a on a.day=d.day)
  ) from counts c;
$$;
revoke all on function public.get_launch_waitlist_stats() from public,anon,authenticated,service_role;
grant execute on function public.get_launch_waitlist_stats() to service_role;
comment on function public.get_launch_waitlist_stats() is 'Server-only aggregate counts; no subscriber email addresses or identifiers returned. Website must verify authorised admin before invocation.';
commit;
