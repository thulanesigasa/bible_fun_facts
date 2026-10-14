# Website content, navigation and SEO review

Reviewed 14 October 2026. Changes target the Next.js website in `web/`.

## Legal content

The Privacy Policy contains approximately 15,400 words across 66 sections. Terms contain approximately 2,970 words across 25 sections. Data Safety contains approximately 3,350 words across 25 sections plus a feature data-flow matrix. The JSON content is authoritative for these website pages. Summaries, contents, related policies, contact routes and print styles help readers navigate the length.

The review used account and storage paths in `src/context/UserContext.tsx`, `src/services/supabase.ts`, `secureStorage.ts`, `privacyService.ts`, `offlineStudyQueue.ts`, `sentryService.ts`, `encryptionService.ts`, `biometricService.ts`, `notifications.ts`, `updates.ts`, `geoService.ts`, `bibleService.ts`, `offlineBibleService.ts`, `ministryService.ts`, and the pin-map component, together with website waitlist, email and deletion-request code.

Removed blanket zero-collection/zero-telemetry statements from the current website privacy, safety and FAQ pages. Explained accounts, cloud study records, conditional diagnostics, public avatar URLs, map/address providers, downloads, updates, launch email, local reminders, exports and deletion boundaries. Removed unsupported licence, compliance-certification, geography, encryption and automatic deletion promises where encountered in the edited pages. Live provider settings, deployed database rules, operational retention and mailbox handling were not independently certified. The policy does not present a source review as proof of those settings.

The website deletion-request endpoint records a request in logs; it does not authenticate and delete an account or send a confirmation email. Its response and UI now accurately say that, and direct users to authenticated in-app deletion or the privacy contact. No account-deletion backend or database migration was changed.

## Requested SEO work

| Request | Implementation |
| --- | --- |
| Sitemap | Generated `/sitemap.xml` from the canonical page registry, 19 unique page URLs, no fragment entries |
| Robots | Generated `/robots.txt`; public pages allowed, API paths excluded |
| Noindex | Explicit index/follow for public pages; verified no public noindex directive; framework error-page handling retained |
| Canonicals | One page-specific canonical per public page; removed duplicate hardcoded homepage canonical |
| Titles | Unique titles for all public pages, including client-rendered pages |
| Descriptions | Unique descriptive metadata for every public page |
| Heading order | One h1, no skipped heading levels; phone-preview labels are styled text rather than document headings |
| Alt text | Meaningful image alt attributes; decorative blank-alt images sit inside aria-hidden elements |
| Schema | Website/Organisation plus per-page WebPage and BreadcrumbList JSON-LD; removed unverified SoftwareApplication offer claims |
| Internal links | Policy summaries, related-document navigation, contents and existing footer links |
| Broken links | Fixed nonexistent download anchors, favicon path and duplicate-route links; checked all 164 local links/anchors |
| Image compression | Main 1024px PNG logo replaced in rendered content by 600px WebP, 236,842 bytes to 33,928 bytes; Next image optimisation retained |
| Core Web Vitals | Prioritised the above-fold LCP image; no observed layout shift; Lighthouse lab measurement recorded below |
| Mobile layout | Verified 320px and 390px layouts; scrollable policy matrix, contained contents and compact dropdown |
| HTTPS | Domain-restricted HTTPS/non-www 308 redirects and HSTS; local and preview access preserved |
| URL slugs | Stable readable slugs, duplicate aliases redirect, legacy .html links preserved through redirects |
| Social image | Working 1200×630 OG image with per-page Open Graph and Twitter metadata |
| LLM file | `/llms.txt` content index and identical `/llm.txt` alias |

## Navigation

The custom SVG hamburger remains. The menu is a content-height dropdown, with plain text rows and single-line separators. The page stays visible and scrollable. The menu becomes independently scrollable on short screens. Outside tap, Escape, a link action, route change or desktop resizing closes it. Closed links are inert.

## Validation

- Production build and TypeScript validation passed.
- Site browser checks passed across 19 pages and 164 internal links/anchors, metadata, headings, schema, alt attributes, endpoints, redirects and small-phone layouts.
- Compact-menu production browser checks passed for taps, open/close state, animation, outside dismissal, navigation, Escape, short-screen scrolling and desktop resizing.
- All 13 waitlist checks passed; existing landing-page checks passed.
- Mobile Lighthouse against the local production server: Performance 98, Accessibility 100, Best Practices 100, SEO 100. Simulated LCP approximately 2.5 seconds, CLS 0, total blocking time approximately 50ms.

These are local lab measurements, not field Core Web Vitals. Production DNS, certificates, host-added robots headers, live crawling/indexing and real-user INP are hosting/traffic observations and require monitoring after deployment. No Search Console verification token was invented or submitted.
