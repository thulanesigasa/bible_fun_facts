# Waiting-list admin dashboard

## What is included

`/admin` shows unique waiting-list subscriptions, signups today, the last 7 and 30 South African calendar days, the latest signup time, and a daily chart with an accessible count table. The data refreshes every 30 seconds and can be refreshed manually. Counts come from `public.launch_waitlist`; no subscriber email list is exposed.

Sign in at `/admin/login` with an existing, verified Supabase email/password account whose immutable user UUID is explicitly listed in `ADMIN_USER_IDS`. Public signup and client-editable metadata do not grant admin access. Every protected page/data request validates the token against Supabase Auth and checks the server allowlist again. The API key for privileged database access remains server-side.

The browser receives only an HttpOnly, SameSite=Strict, Secure production cookie, with a maximum one-hour lifetime. No refresh token is persisted, and no authentication token is stored in browser local/session storage. Sign in again after expiry. Sign-out clears the dashboard cookie; this does not promise immediate invalidation of a copied Supabase access token before its expiry. Changing the allowlist or deleting/disabling the account prevents subsequent authorised dashboard checks.

Persistent 15-minute IP/email login limits run before password authentication. Requests need an exact configured origin and a single IP from a trusted ingress-overwritten header. Hashes use a separate server-side salt. Do not use a header an arbitrary browser can supply unchanged. Failed limiter/configuration requests fail closed.

## Production prerequisites

Both migrations were deployed to production project `ibwooiejzxhbzplnldcz` on 14 October 2026 at the owner's explicit request, in this order:

1. `supabase/migrations/20261013061117_launch_waitlist.sql`, recorded remotely as `20261014152305_launch_waitlist`.
2. `supabase/migrations/20261014135350_waitlist_admin_dashboard.sql`, recorded remotely as `20261014152348_waitlist_admin_dashboard`.

The connector assigned the remote timestamps; use the recorded versions when reconciling CLI migration history rather than applying these files again. Live verification returned zero retained subscriptions and 30 zero-filled daily buckets. All three tables have RLS enabled, with no anonymous or ordinary authenticated SELECT access. All three RPCs deny those roles and allow service_role execution. No auth, profile, study or directory records were changed.

The dashboard still requires hosting environment configuration and an explicitly approved admin account before live use. Production advisors report informational RLS-without-policy notices for these three intentionally server-only tables; do not add browser policies to silence them. Guidance: https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy

All three tables use RLS without public browser access. Only the trusted `service_role` can invoke the admin RPCs. The website must first validate admin authorisation before making those privileged calls. The statistics function returns counts and times, never subscriber identities. Do not grant `anon` or `authenticated` read/execute access to make the dashboard work.

## Hosting configuration

Set these as **server-side environment variables**, not `NEXT_PUBLIC_*` values:

```dotenv
SUPABASE_URL=https://ibwooiejzxhbzplnldcz.supabase.co
SUPABASE_PUBLISHABLE_KEY=<project publishable key, or SUPABASE_ANON_KEY>
SUPABASE_SERVICE_ROLE_KEY=<server-only privileged key>
ADMIN_USER_IDS=<approved verified account UUID, comma-separated for additional admins>
ADMIN_SITE_URL=https://exegeomai.app
ADMIN_RATE_LIMIT_SALT=<separate random secret, at least 32 characters>
ADMIN_TRUSTED_IP_HEADER=<header the hosting ingress overwrites with a single trusted IP>
```

The existing `WAITLIST_SITE_URL` and `WAITLIST_TRUSTED_IP_HEADER` are fallback values for the corresponding admin settings. Keep the public waiting-list environment configuration documented in `WAITLIST_DEPLOYMENT.md` as well. Never commit real values, print them in logs, or place them in a client component. The allowlist is based on account UUID, not a guessed owner name or the address of a waitlist subscriber. Obtain the site owner's intended admin account before populating it.

If the owner has no existing account, create one through a trusted Supabase account flow and verify its email before explicitly granting dashboard access. This implementation does not send invitations, create accounts, or promote an assumed identity.

## Search and cache boundaries

Admin pages/API responses use private/no-store caching and noindex/nofollow. `/admin` and `/api/` are excluded by robots.txt, and admin URLs are absent from the public sitemap. These directives complement authentication; they are not the security boundary. Protected page/data access is enforced server-side.

## Validation

```bash
cd web
npm run test:admin
npm run build
npx playwright install chromium
npm run test:admin:browser
npm run test:waitlist
npm run test:site
```

`test:admin` checks real SQL aggregates and permissions using PGlite, SAST calendar counts, rate buckets, ordinary-role denial, forged/ordinary/unverified account denial, origin/input checks, secure cookie properties, and failure states. `test:admin:browser` uses test-only mocked Supabase responses to exercise login, dashboard rendering, refresh, stale-data errors, zero counts, narrow layouts and logout. It does not use or invent a production admin account.

Pre-change production advisors reported existing warnings for `increment_ministry_count` search_path, intentionally exposed security-definer account deletion/public scholar search, and leaked-password protection being disabled. They were not modified in this dashboard task. Relevant official guidance:

- https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable
- https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable
- https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

## Verified implementation results

- Production build and TypeScript checks passed.
- All 12 admin/auth/SQL checks passed.
- Browser flow passed with mocked providers: wrong-password handling, sign-in, secure HttpOnly cookie, count/chart rendering, refresh, stale-data and empty states, 320px/390px layouts, sign-out, and protected-page/API denial after clearing the session.
- All 13 existing waitlist checks passed.
- Public-site checks still passed across 19 pages and 164 internal links/anchors.
- No admin allowlist, service-role environment name, or admin rate-limit salt environment name was found in the generated client chunks.

Totals represent unique subscriptions currently retained in the waiting-list table. Removing an unsubscribed record removes it from these counts; this dashboard does not invent a separate historical audience size or deduplicate different email addresses belonging to the same person.
