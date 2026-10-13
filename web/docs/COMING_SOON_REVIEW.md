# exégeomai Coming Soon — design and release review

## Design reference analysis

Inspected https://plugu.co.za/index.html in the Cloud Browser on 13 October 2026 at a 1363 × 936 CSS viewport.

- **Hero:** centred two-line heading, short introduction, filled primary and outlined secondary actions; a raised centre phone flanked by rotated, overlapping phones. Fine grid lines and restrained geometric decoration create depth.
- **Navigation:** transparent over the hero, fixed to the top, becoming translucent white over light sections. Desktop links stay compact; a separate mobile menu exists in the rendered accessibility tree.
- **Typography:** browser-computed Poppins; 86px hero and approximately 49–64px section headings at the observed desktop size. Letter spacing and strong size contrast provide hierarchy.
- **Sections:** generous whitespace, alternating white and faint tinted surfaces, left/right screen-and-copy compositions. Rounded backing shapes frame the app rather than compete with it.
- **Components:** rounded CTA buttons, small uppercase eyebrow labels, compact supporting badges, restrained borders and shadows. Numbered steps, native-style FAQ disclosure and an interactive screen chooser punctuate the longer page.
- **Motion:** changes between successive hero observations show subtle phone/decorative motion; navigation changes on scroll. Hover states and a true mobile viewport were not fully verified in this environment.
- **Footer:** a dark surface, brand statement and multiple columns for product, company, safety, support and legal links. The final CTA provides a visual transition into it.

No Plugu code, wording, images or branding was imported.

## exégeomai design

Midnight #0B1120 and dark slate #0F172A frame the hero and waiting list. Gold #FDD223 marks the primary actions and key words. White and #F8FAFC give the middle sections breathing room. Uses the existing repository logo and Outfit/Space Mono fonts already loaded by the site (fixes the previous unused-font-variable/Poppins mismatch).

The page progresses through the supplied hero, introduction, reason to study, interactive preview, four feature stories, three steps, privacy, waiting list and FAQs. No invented launch date, store availability, subscriber count or testimonials. The HTML/CSS phone previews are original illustrative screens grounded in the app's Discover, Scripture and Strong's features; they are not captured screenshots of a running native build and are labelled accordingly.

The mobile implementation stacks the editorial columns, keeps a scaled three-phone composition, changes features to two columns and steps to one column. Navigation becomes a disclosure menu, removed from the tab order when closed, closes on selection/Escape, and returns focus on Escape. Buttons have visible focus states; inputs have labels, consent is explicit, updates are announced, FAQ uses native details/summary. Motion is limited to entry/hover transitions and disabled with reduced-motion preferences.

## Implementation and verification

- Existing legal, privacy, account-deletion and support page content preserved.
- Shared navigation/footer now direct visitors to the waiting list. Legacy secondary page copy is outside this landing-page refresh and should receive a separate factual/content review before a wider site relaunch.
- Existing app, app.json, Expo runtime 1.0.1 and all prior security migrations untouched.
- Landing page is pre-rendered; only navigation, preview selection and form submission need client interaction. No animation library, analytics or third-party images added.
- Next.js build reports home at ~3.78 kB route code and 115 kB first-load JS; this is a build metric, not a measured Core Web Vitals score.
- TypeScript and Next.js production build pass with actual type checking enabled.
- Disposable PostgreSQL (PGlite) tests apply the exact migration with Supabase-like roles/default grants, exercise successful insert, unchanged case-insensitive duplicate, permission denials, validation, rate limits, expired buckets, errors and database-confirmed responses. HTTP transport is an adapter to the disposable DB; the production PostgREST endpoint is not yet exercised.
- Production Supabase identity verified read-only: ibwooiejzxhbzplnldcz, exégeomai, active, EU west/Ireland. New waitlist tables absent before changes. No production migration or test subscription created.

### Outstanding visual verification

Desktop/mobile browser QA, screenshots, hover/focus visual checks and measured accessibility/performance remain pending. This managed environment has no available `control-browser` skill. The Sites skill explicitly requires skipping local browser QA rather than starting a preview server or installing another browser in that condition. No screenshots are fabricated or substituted with design renders.

Before approval, run `npm run dev` from web/ in an environment with browser preview support. Review at 1440×1000, 768×1024, 390×844 and 320×740. Check horizontal overflow, sticky header, menu keyboard behaviour, all three preview selectors, FAQ disclosures, reduced motion, 200% zoom and the form's loading/error/success states. Capture full-page desktop/mobile PNGs for the PR. Run an accessibility scan and Lighthouse against the production build; do not claim those passed based on compilation.

## Release gate

This PR is for review only. Do not merge, deploy or apply the migration until the user reviews the design and authorises the remaining operations. See WAITLIST_DEPLOYMENT.md for concrete configuration and smoke tests. No launch emails or paid infrastructure were created.
