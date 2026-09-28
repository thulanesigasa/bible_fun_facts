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

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — Hero, Features, Strong's, Security, FAQ |
| `/deletion` | GDPR account & data deletion request portal |
| `/privacy` | Privacy Policy (GDPR Art. 17, CCPA, Google Play compliant) |
| `/terms` | Terms of Service (MIT license, South African law) |
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
