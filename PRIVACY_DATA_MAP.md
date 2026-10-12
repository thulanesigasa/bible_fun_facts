# Privacy Data Map — Work in Progress

| Data | Current storage | Intended visibility | Current hardening |
| --- | --- | --- | --- |
| Supabase session / refresh tokens | Native SecureStore via adapter | Account owner/device only | Plaintext AsyncStorage fallback removed |
| Account profile including email | Supabase auth and public.profiles | Owner only for private fields | Public `profiles` SELECT removed and username-to-email RPC revoked in pending migration |
| Public community profile fields | Existing `profiles` table/UI | Explicitly opted-in fields only | Public search redesign required; intentionally not re-enabled until allowlisted backend is built |
| Study favorites/completions | Local user context; Supabase favorites/progress; secure pending queue | Owner only | Queue per immutable user ID, owner RLS and unique DB constraints |
| Study notes/highlights | Local storage, user metadata and/or study_notes | Owner only | Full local encryption and conflict-safe sync not complete |
| Streaks / awards | Local backups and Supabase profile/metadata | Private by default | Opt-in flags added; server-side preferences table pending database deployment |
| Avatar images | Supabase public avatars bucket | Public image URL | Pending SQL requires authenticated owner-prefixed object path, MIME allowlist and 2MB bucket limit |
| Crash telemetry | Sentry when DSN configured | Restricted service diagnostic access | Removed user email/username and request/extra payloads; final disclosure/opt-out review needed |
| Authentication deletion | Supabase auth + owned records | User right to erasure | Client requires RPC to confirm true; staging server cascade tests outstanding |

**Important:** Committed Supabase migrations do not affect a deployed database until applied. Privacy guarantees depending on those policies therefore require migration deployment and adversarial validation.
