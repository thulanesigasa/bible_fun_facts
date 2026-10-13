# Waiting list setup — approval required before production changes

## Target and migration

Existing Supabase project: **ibwooiejzxhbzplnldcz (exégeomai)**.
Migration: `supabase/migrations/20261013061117_launch_waitlist.sql` at the repository root.

The migration is generated with the Supabase CLI and reviewed/tested locally. It creates only `launch_waitlist`, `launch_waitlist_limits`, an expiry index and `register_launch_waitlist`. It does not alter existing app tables, auth, security migrations or Expo settings. It is **not applied to production**.

Both tables have RLS enabled and no public policies. All anonymous/authenticated/PUBLIC grants are explicitly revoked, including inherited default grants. The security-invoker RPC is callable only by service_role. Case-normalised email is the unique primary key. Duplicate submissions do not change the original consent record. API responses do not disclose whether an email was already present.

Rate limits are atomic PostgreSQL upserts, shared across server processes: five valid attempts per IP per fixed 15-minute window and 500 attempts globally per window. Old IP hashes are removed on later successful requests after a day. The global counter bounds storage growth. These limits do not replace hosting-level request/body/connection limits; use the existing host's available protections. Do not add paid services without approval.

## Hosting

Keep the existing Next.js hosting platform and domain; configure the project root as `web/`. A Node-capable Next.js host is required: a static export cannot serve the waitlist endpoint. Install with `npm ci`, validate with `npm run typecheck && npm run test:waitlist`, build with `npm run build`. Route runtime is Node.js; the waitlist API has a 15-second hosting duration hint and an 8-second upstream timeout.

Configure **server-only** environment variables in the host's secret manager (never prefix them with NEXT_PUBLIC_ and never commit real values):

| Variable | Value / requirement |
| --- | --- |
| SUPABASE_URL | `https://ibwooiejzxhbzplnldcz.supabase.co` (optional; rejects any different value) |
| SUPABASE_SERVICE_ROLE_KEY | Existing project's server-side service role JWT; obtain securely from the project settings |
| WAITLIST_SITE_URL | `https://exegeomai.app`; use the exact preview origin in a separately configured preview environment |
| WAITLIST_RATE_LIMIT_SALT | Cryptographically random secret, at least 32 characters; stable across instances |
| WAITLIST_TRUSTED_IP_HEADER | A single-IP header that the hosting ingress **overwrites** and cannot be supplied/spoofed by clients |
| RESEND_API_KEY | API key generated from Resend account dashboard (free tier 3,000 emails/month) |
| RESEND_FROM_EMAIL | `exégeomai <noreply@xn--exgeomai-c1a.co.za>` or configured domain in Resend |
| RESEND_ADMIN_EMAIL | `joinus@xn--exgeomai-c1a.co.za` (receives team notifications upon each sign-up) |

Do not guess the IP header. Confirm your hosting provider's ingress contract and verify an incoming spoofed header is overwritten before enabling the form. A raw client-supplied `x-forwarded-for` is unsuitable. Missing/multi-valued/invalid IP headers fail closed with 503. A matching Origin is required. The handler is locked to the requested Supabase project. Missing settings or missing migration also fail closed: it never falls back to an in-memory list or fake success.

### Resend Email Integration Setup
1. Create a free account at [Resend](https://resend.com) (free tier allows 3,000 emails/month, 100 emails/day, zero cost).
2. In the Resend Dashboard under **Domains**, add `xn--exgeomai-c1a.co.za` (the DNS Punycode equivalent of `exégeomai.co.za`).
3. Add the DNS records provided by Resend (DKIM, SPF, MX) to your DNS host (Cloudflare, registrar, or hosting DNS).
4. Generate an API Key under **API Keys** and add it to hosting environment variables as `RESEND_API_KEY`.
5. Upon user submission on the waitlist:
   - A branded welcome & confirmation email is immediately dispatched to the user from `noreply@exégeomai.co.za` (`noreply@xn--exgeomai-c1a.co.za`).
   - A sign-up notification is sent to the team at `joinus@exégeomai.co.za` (`joinus@xn--exgeomai-c1a.co.za`).

No production credentials were read or copied into this checkout. No mail provider, CAPTCHA service or paid resource is provisioned. Preview signup testing should use a disposable/local database transport; do not silently point previews at production for tests.

## Approval and production smoke test

1. Finish desktop/mobile visual review and screenshots, then obtain design approval. Do not merge yet.
2. Obtain explicit approval to apply **this migration** to **ibwooiejzxhbzplnldcz** **before merging**. The repository has a Supabase GitHub integration, which can apply migrations on merge; verify its current production settings. Applying is a separate gate from PR creation. Use the project's normal reviewed migration workflow; do not blindly push unrelated migrations.
3. Apply the approved migration, inspect grants/RLS/function EXECUTE permissions, and run Supabase security advisors. Confirm no anon/authenticated access to either table or RPC. Do not expose a public SELECT policy to make signup work.
4. Configure server secrets and verify the trusted ingress header. Smoke-test one owner-controlled address, confirm one row in the private table, repeat with mixed case/whitespace and confirm the same row and unchanged consent timestamp. Confirm malformed email, absent consent, cross-origin requests and repeated attempts are rejected. Verify an upstream failure is shown as an error, not success.
5. Obtain approval before removing any production smoke-test record unless it was explicitly designated disposable. Verify unsubscribe handling with the monitored support mailbox before opening the list publicly.
6. Publish only after approval and passing tests. No automated sending is part of this implementation.

## Unsubscribe and retention operations

The page and notice explain the manual unsubscribe channel: `support@exegeomai.app`, subject “Unsubscribe from waitlist”, sent from the subscribed address. The owner must monitor this inbox and process removals before sending any notifications. Use a parameterised administrator operation:

```sql
-- $1 is the verified requesting email, passed as a bound parameter.
delete from public.launch_waitlist where email = lower(btrim($1));
```

A removed address can rejoin only through a new explicit submission. Keep a notification provider's suppression list if/when a sending service is approved. Do not export the waitlist into public logs, client responses or GitHub issues. When sending is later authorised, every message must include an unsubscribe mechanism; do not infer permission for unrelated marketing.

No automatic retention job is introduced. Assign an owner to purge the list within 90 days after the final launch notification, or on cancellation, in accordance with the notice. Supabase backups follow the project's existing retention. The existing app account-deletion flow is separate and preserved; it is not used for waitlist unsubscription.

## Rollback

Disable the form endpoint via deployment configuration if a problem is found (it returns 503 without valid settings); revert the website commit if needed. Do not drop the table after collecting real signups without an approved export/retention decision. Do not undo existing mobile-app security migrations.
