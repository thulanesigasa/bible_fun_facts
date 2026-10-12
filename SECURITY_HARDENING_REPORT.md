# Security Hardening Report — Master Prompt 2

## Status: SECURITY NO-GO for public release

This report tracks implementation on `security/master-prompt-2-rls-ownership`. A passing TypeScript/Jest/Expo CI gate does not replace database adversarial testing, mobile-device tests or a vetted cryptographic implementation.

### Implemented in this branch
- Removed fabricated/local first-time login and fake offline account signup from both authentication contexts.
- Restored authentication identity from a securely stored Supabase session, not an arbitrary plaintext local profile.
- Scoped local study data to immutable auth user IDs and added owner boundaries for legacy streak keys.
- Changed secure token/secret storage to fail closed, without falling back to plaintext AsyncStorage.
- Added a durable, per-account offline mutation queue for fact and scripture favorites and devotional completion. Retries are serialized; server writes use unique-key upserts or idempotent deletes.
- Confirmed account deletion RPC must return `true`; a network error or `false` cannot be described as completed deletion.
- Added forward-only owner-only RLS policies for ministry/branch modifications and private profile select.
- Revoked public username-email resolver, closed avatar upload path ownership hole, and removed public execution of privileged ministry counter RPC.
- Added an owner-only server privacy-settings table with private-by-default values.
- Removed universal fallback encryption key and insecure random key/IV generation; encryption now requires CSPRNG availability.
- Replaced PIN salt Math.random with CSPRNG and removed early-exit hash comparison.
- Reduced Sentry identity, request and contextual payload exposure.
- Added automated secure-storage and offline-queue tests.

### Blocking work before any SECURITY GO
1. Validate the new WebCrypto AES-256-GCM journal exports on actual Android/iOS builds and provision a vetted platform crypto provider where absent. Legacy v1 CBC is still supported for reading older exports; test and document migration without discarding user data.
2. Strengthen low-entropy PIN verification with an appropriate slow KDF / native unlock API and verify rate limiting against app restart/clock changes.
3. Build complete offline synchronization for personal notes, highlights, read progress, achievements and preferences; resolve conflicts, protect in-flight data, and test interruption/reconnect/expiry/reinstall.
4. Finish proper authenticated-offline authorization state machine, including expiry/revocation policy; session presence alone is insufficient as an offline entitlement model.
5. Verify privacy rules end to end; public people search must use a carefully allowlisted privacy-aware server endpoint (old broad `profiles` reads were intentionally disabled).
6. Implement secure server-side username authentication if username login is to be restored; currently login requires email.
7. Validate migrations in disposable Supabase and staging, including adversarial account A/account B and anonymous cases; do not apply untested security SQL directly to production.
8. Audit all remaining RLS and `SECURITY DEFINER` functions, storage ownership and privacy-sensitive social functionality.
9. Confirm account deletion server cascade through auth, storage and user-data tables with real test accounts; verify deletion errors and false returns.
10. Real-device offline, network transition, session expiry, privacy, biometrics, exports and release smoke tests.

### Verification
- GitHub CI has run TypeScript, Jest, Expo Doctor, Android export and scoped dependency audit on branch commits.
- SQL migration staging execution and two-account RLS attack tests: **not executed** in this environment.
- Real-device security/offline tests: **not executed**.

### Release constraint
`app.json` Expo `runtimeVersion` must remain exactly `"1.0.1"`. This branch does not change it.

### Merge policy
Keep PR draft and DO NOT MERGE for production until all deployment-affecting behavior is tested and outstanding blockers are resolved.

### Follow-up changes
- Added atomic `set_my_privacy_preference` SECURITY INVOKER RPC so changing one server-side privacy preference cannot reset unrelated flags; privacy reads now consult the server and fail private if unavailable.
- Changed the secondary `UserDataContext` to use a per-account secure cache rather than globally shared plaintext preference and study keys.
- Added privacy regression tests for atomic writes, missing sessions and offline server reads.

### Additional validation needed
- Real-device data migration/recovery is essential: the new secondary secure storage intentionally does not import globally shared legacy data without verified ownership. Identify safe migration paths and regression-test upgrade from the last production build.

### October 12 follow-up: atomic SecureStore and authenticated archives
- SecureStoreAdapter now writes encrypted secrets with a two-bank versioned manifest. Interrupted writes must leave the previous committed secret readable. Existing v1 native-chunk secrets remain readable for migration; the adapter never reads from plaintext AsyncStorage.
- New journal exports use WebCrypto AES-256-GCM with an authenticated tag, version 2. Legacy v1 CBC archives are readable only for compatibility; new exports never emit version 1.
- Added regression tests for interrupted secure-storage writes, legacy native chunk reads, modified ciphertext, and unavailable WebCrypto.
- **Mobile runtime limitation:** Expo/Hermes environments must be tested for WebCrypto AES-GCM availability. Without an implementation the journal export fails closed. This is not yet proof of operational encrypted journal exports on real devices.
