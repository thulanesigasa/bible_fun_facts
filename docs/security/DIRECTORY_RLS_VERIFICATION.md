# Master Prompt 2 — Directory Ownership RLS Validation

This change is a narrow, forward-only Supabase migration. It has not been applied to the deployed database by committing it to GitHub.

## Required verification in staging

Run `supabase db reset` in a disposable local Supabase environment, or apply the migration to staging, then test with two real test accounts, A and B, using their JWTs.

1. Anonymous clients can still read the public ministry and branch directory.
2. Anonymous clients cannot insert or update entries.
3. Account A can insert a ministry and branch with `created_by` omitted; `created_by` must equal A's immutable auth user ID.
4. Account B cannot update A's ministry or branch, including fields such as name and meeting times.
5. Account A can update its own noncanonical ministry and branch.
6. Account A cannot set `is_preadded=true` or alter `created_by` to account B, either on insert or update.
7. Neither account can edit canonical (`is_preadded=true`) records.
8. Service-role access for legitimate administrative changes remains functional.
9. Legacy records with NULL `created_by` must be uneditable by ordinary users; administrators may attribute ownership only with trusted evidence.
10. Test creation via existing app screens, not just direct SQL calls.

## Remaining security blockers outside this PR

The existing `resolve_email_by_username` RPC exposes private email addresses and requires a redesign of username sign-in before public execution is revoked to avoid silently breaking the login UX.

The existing `increment_ministry_count` SECURITY DEFINER function needs authorization checks or a server-side trigger redesign; this PR does not assert that it is safe.

This migration does not implement the offline-authentication/session/queue model, encrypted offline data isolation, storage policies, account deletion, or telemetry hardening specified in the full Master Prompt 2.

## Release constraint

Do not change `expo.runtimeVersion`; it must remain exactly `1.0.1`.
