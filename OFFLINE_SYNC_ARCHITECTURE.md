# Offline Sync Architecture — Work in Progress

## Invariants
- First-time authentication requires a genuine online Supabase auth interaction.
- Previously authenticated offline reading can use a securely persisted Supabase session and locally downloaded content. A local display name must never create a session.
- User data is bound to immutable `auth.users.id`, not email or username.
- Secret session material and offline pending operations are stored via secure device storage only. No plaintext downgrade.
- A network retry must never create duplicate favorites or devotional completions.

## Implemented operations
`src/services/offlineStudyQueue.ts` currently supports:
- `favorite_fact` add/remove: `user_favorites_facts`, unique `(user_id,fact_id)`
- `favorite_scripture` add/remove: `user_favorites_scriptures`, unique `(user_id,scripture_id)`
- `complete_wotd`: `user_study_progress`, unique `(user_id,wotd_id)`

Each queued operation carries a CSPRNG-generated ID, schema version, auth user ID, action, entity ID, desired state, timestamp and retry counter. Writes are serialized, persisted before network submission, and retried when the app enters the foreground. Server upsert/delete behavior is idempotent.

## Known limits
- The current app UI updates optimistically. If secure queue storage fails, the app logs a warning; it does not yet roll back the UI or show a durable error message.
- Offline notes, read activity, highlights, streak/reward reconciliation, all achievements and preferences are not yet fully queued.
- Reconnect retry currently triggers on foreground or immediate enqueue; there is no universal network-state event listener, exponential backoff or sync-status UI.
- Local data under the older global AsyncStorage formats needs a controlled per-account migration; unknown/unverified legacy data is not used to authorize access.
- Session presence is necessary but does not yet implement a complete revocation/expiry-aware authenticated-offline state machine.
- Private local data that remains in AsyncStorage requires encryption-at-rest classification and follow-up migration.

## Required test matrix
First online login, first offline login denied, cached-session offline behavior, duplicate add/remove across retries, account switching, missing SecureStore, token expiry, process kill mid-queue write, airplane-mode reconnect, time changes, multi-device collisions, notes conflict and server-authoritative achievements. Test both Android and iOS native devices.

## Secondary UserDataContext storage
The separate UserDataContext no longer loads shared plaintext AsyncStorage keys. It stores the account-scoped study state under a secure storage key derived from the authenticated Supabase user UUID and resets state on sign-out/user switch. It does **not** automatically import the old global keys; a verified per-account migration and on-device regression testing remain required to avoid losing existing users' old-only study history.
