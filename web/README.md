# exégeomai — Web Portal

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Vanilla CSS](https://img.shields.io/badge/Styling-Vanilla%20CSS-1572B6?style=flat-square&logo=css3)
![Build](https://img.shields.io/badge/Build-Passing-22c55e?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-FDD223?style=flat-square)

The official companion web portal for the **exégeomai** Bible study mobile application.
Built with **Next.js 15 App Router**, TypeScript, and Vanilla CSS following a strict **60-30-10 design system**.

---

## Architecture

```
web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — fonts, SEO metadata, JSON-LD
│   │   ├── page.tsx                # Landing page composition
│   │   ├── globals.css             # Design system (60-30-10 tokens + all component styles)
│   │   ├── deletion/
│   │   │   └── page.tsx           # GDPR account deletion portal
│   │   ├── privacy/
│   │   │   └── page.tsx           # Privacy Policy (GDPR/CCPA compliant)
│   │   ├── terms/
│   │   │   └── page.tsx           # Terms of Service
│   │   └── api/
│   │       └── deletion-request/
│   │           └── route.ts       # Edge API — POST deletion requests
│   └── components/
│       ├── Header.tsx             # Sticky nav with mobile drawer
│       ├── Footer.tsx             # 4-column footer grid
│       ├── HeroSection.tsx        # Hero + stats bar
│       ├── FeaturesSection.tsx    # 6-card features grid
│       ├── StrongsSection.tsx     # Lexicon showcase + FTS5 search demo
│       ├── SecuritySection.tsx    # Cryptographic pillars + data practices
│       ├── FaqSection.tsx         # 7-entry animated accordion
│       ├── DeletionForm.tsx       # Client form — validation, POST, success state
│       └── SvgIcons.tsx           # All SVG icon components (svgrepo.com)
├── public/
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/                   # Favicon, OG image, app icon
├── next.config.ts                 # Security headers (CSP, HSTS, X-Frame-Options)
└── tsconfig.json
```

---

## Design System

| Role | Color | Usage |
|---|---|---|
| **60% Background** | `#F8FAFC` (Slate) | Page background, section backgrounds |
| **30% Surface** | `#FFFFFF` (Pure White) | Cards, panels, header, footer |
| **10% Accent** | `#FDD223` (Amber Gold) | CTAs, active states, highlights |

**Typography:** Outfit (body) + Space Mono (brand/code)

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Flagship landing page — Hero with 3 mobile devices, Features, Walkthrough, Safety, Pricing, FAQ, Download |
| `/features` | Full feature catalog (365 Devotionals, 14,298 Strong's, 32 Canons, Keystore) & comparison matrix |
| `/how-it-works` | 6-step visual walkthrough from APK installation to Strong's root interlinear study |
| `/pricing` | 100% Free & Open Source MIT tier (zero ads, zero subscriptions) vs Contributor tier |
| `/safety` | Cryptographic privacy architecture (Keystore AES-256 GCM, FLAG_SECURE, zero telemetry) |
| `/safety-and-trust` | Trust guarantees, data sovereignty, and security pillars |
| `/about` | Theological vision of *ἐξηγέομαι* (John 1:18), historical-grammatical exegesis, open source |
| `/support` | Central support hub linking to help guides, FAQ, contact channels, and problem reporting |
| `/contact` | Inquiry form for general support, lexicon errata, church additions, and security disclosures |
| `/faq` | 8-item categorized interactive accordion covering offline storage, canons, and security |
| `/community-guidelines` | Christian fellowship standards grounded in Ephesians 4:29 and Colossians 4:6 |
| `/report-a-problem` | Technical bug report and vulnerability disclosure form |
| `/help` | User manual for APK sideloading, translation switching, and biometric locking |
| `/deletion` | GDPR Article 17 and Google Play policy self-service data eradication portal |
| `/account-deletion` | Direct alias to account & data eradication portal |
| `/privacy` | 6-section privacy policy detailing offline SQLite and zero tracking |
| `/terms` | 6-section terms of service covering MIT open source licensing and public domain texts |
| `/data-safety` | Official Google Play Store Data Safety matrix confirming 0 bytes collected or shared |
| `/api/deletion-request` | Edge API — accepts POST with email + reason |

---

## Security Headers

Configured via `next.config.ts` and applied to all routes:

- `Content-Security-Policy` — restricts scripts, styles, fonts, images
- `Strict-Transport-Security` — HSTS with 2-year max-age + preload
- `X-Frame-Options: SAMEORIGIN` — clickjacking protection
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — disables camera, microphone, geolocation

---

## SEO

- Full `<title>` template with `%s | exégeomai`
- Open Graph tags (title, description, image 1200x630)
- Twitter card `summary_large_image`
- JSON-LD structured data (`SoftwareApplication` schema)
- `sitemap.xml` and `robots.txt`
- Canonical URLs via `metadataBase`

---

## Development

```bash
cd web
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build check
```

---

## Deployment

Deploy to [Vercel](https://vercel.com) (recommended) or any Node.js host. Set the domain in `layout.tsx` under `BASE_URL`.

For the deletion API to store requests persistently, configure a Supabase project and add the `SUPABASE_URL` + `SUPABASE_ANON_KEY` environment variables. See `api/deletion-request/route.ts` for the integration hook.
