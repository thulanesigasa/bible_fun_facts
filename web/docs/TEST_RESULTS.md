# Coming Soon validation — 13 October 2026

| Check | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run build` | PASS, Next.js 15.5.26, 27 generated pages |
| `npm run test:waitlist` | PASS, 12 tests, disposable PostgreSQL/PGlite |
| `npm run check:links` | PASS, 26 local landing-page link targets plus heading and metadata checks |
| `git diff --check` | PASS |
| Mobile app / app.json / old security migrations | Unchanged; runtimeVersion remains exactly 1.0.1 |
| Production identity | Verified read-only: ibwooiejzxhbzplnldcz / exégeomai / ACTIVE_HEALTHY |
| Production migration | NOT APPLIED; awaiting explicit approval |
| Production PostgREST smoke test | Pending approved migration and server configuration |
| Desktop/mobile screenshots and rendered layout tests | Blocked: required local-preview browser-control skill unavailable |
| Browser accessibility / measured performance / hover tests | Pending browser QA; not represented as passed |

The 12 waitlist tests verify validation and email normalisation; rejection of malformed JSON, wrong content type, oversized payload, cross-origin submission, absent consent and honeypot; fail-closed configuration and project pinning; database insertion and unchanged duplicate consent; persistent IP limits; database error/unknown response handling; anon/authenticated permission denials; SQL constraints; expired buckets; global limits; simultaneous duplicate submissions; and RLS hiding rows even when SELECT is temporarily granted in a rolled-back test transaction.

Tests use the actual migration, Supabase-like roles/default grants and a SQL-backed fetch adapter. They do not prove production transport configuration, the reverse proxy's trusted-IP behaviour, or the full existing migration history. The GitHub PR additionally runs the repository's existing disposable Supabase migration job. Website checks are reproducible with the commands above. No new workflow is included: the existing app release workflow treats changes under .github/workflows as an OTA trigger on merge, so this PR keeps the final diff limited to web/ and the new migration.

Home build budget: 3.78 kB route-specific code, 115 kB first-load JavaScript. Images use the existing logo through next/image; phone mockups use HTML/CSS. No animation package or external runtime font request was added (next/font bundles the existing fonts at build time).

The existing deletion API remains unchanged and uses an edge runtime; Next.js emits its existing static-generation warning. No type-check bypass is used for the build. Lint is not part of this validation; the retained configuration skips it.

GitHub validation on the initial implementation commit: website checks PASS and full disposable Supabase migration reset/security checks PASS. The mobile quality gate initially discovered the web Node test file through Jest’s broad .test.ts glob. The file is now named waitlist.check.ts and invoked explicitly by test:waitlist, separating the test runners without modifying native test configuration.
