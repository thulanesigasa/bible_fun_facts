# Offline startup and restarted study streak

## Causes found

- `AppNavigator` selected onboarding while `UserProvider` was still reading the persisted session. It had no hydration gate, so returning users could see Welcome before being moved into the app.
- The provider waited for `supabase.auth.getSession()` before opening and saving the local library. An expired token can require an online refresh; offline refresh delay/failure therefore blocked local content and persistence.
- Study/cache/queue keys contained `@` and `:`. Expo SecureStore accepts only alphanumeric characters, `.`, `-`, and `_`. The old test double accepted invalid native keys, hiding the persistence failure.
- Startup storage load, initial session handling, auth-change handling, and cloud restoration ran concurrently. They could stamp today's date onto a default count before actual progress was loaded. Auth updates also started another restoration/sync cycle.
- Streak reconciliation combined the largest count with the latest date even when those came from different snapshots. This could resurrect an old broken streak after its restart. A historical launch-date repair also remained active indefinitely.

## Result

Local navigation waits for encrypted hydration, not internet. A previously persisted session identity opens only that account's native encrypted content, including when its token has expired. Cloud access still requires Supabase Auth/RLS; local identity is never a replacement server credential. First-time account creation/sign-in requires internet. Signed-out users do not regain access through a plaintext profile. Unreadable local data produces a retry screen and is not overwritten.

Logical keys are encoded injectively into valid native keys. Existing valid native auth keys retain their original spelling, including the explicit Supabase storage key. Existing native v1 chunks remain readable. No tokens are imported from AsyncStorage.

Local cache hydration precedes cloud reconciliation. Same-account token/profile updates do not reset the library or rerun onboarding. Account-switch generations reject stale restore results. Local saving and queue appends do not wait for token refresh; network delivery does not hold the local queue storage lock. Offline privacy decisions use an encrypted account-scoped snapshot of confirmed settings and default conservatively when unavailable.

Streak counts stay attached to their activity dates. A missed calendar day resets the consecutive streak to 1; returning the next day advances to 2 and then 3. Repeated launches on one day do not increment it. The launch-date heuristic is restricted to its historical October 2–5 repair window rather than manufacturing ongoing activity. Previously earned achievement IDs remain intact.

## Validation

Provider tests use React rendering and a native-key-validating storage double: expired-session offline launch, delayed hydration, cold-start progression, next-day foreground, same-account auth updates, no plaintext impersonation, sign-out/account switching, stale scheduled callbacks, remote recovery on a fresh device, and corrupt-cache preservation. Service tests cover real SecureStore adapter key encoding/chunking, dated streak reconciliation, privacy defaults, and queue append during stalled cloud refresh.

Production account data was not modified. This source change must reach the installed mobile application through its normal compatible OTA/rebuild release process. A website deployment does not deliver this fix. Android export verifies bundling, not behavior on a physical handset. Test airplane-mode force-close/reopen and a next-calendar-day return on the installed release before declaring device verification complete. Do not clear app data or reinstall as a workaround: that can remove unsynced local work.

References: https://docs.expo.dev/versions/latest/sdk/securestore/ and https://supabase.com/docs/reference/javascript/auth-onauthstatechange
