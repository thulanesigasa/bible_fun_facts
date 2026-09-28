import type { Metadata, Viewport } from 'next';
import { Outfit, Space_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const BASE_URL = 'https://exegeomai.app';

export const viewport: Viewport = {
  themeColor: '#FDD223',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'exégeomai — Unfold the Sacred Depth of Scripture',
    template: '%s | exégeomai',
  },
  description:
    'A scholarly Bible app offering 365 exegetical devotionals, 14,298 Strong\'s concordance entries, and 32 offline translations — all secured with AES-256 hardware encryption. Free & open source.',
  keywords: [
    'Bible app', 'exegesis', 'Strong\'s concordance', 'devotional', 'scripture',
    'Greek lexicon', 'Hebrew lexicon', 'offline Bible', 'Android Bible app',
    'Bible study', 'exégeomai', 'open source Bible',
  ],
  authors: [{ name: 'Thulane Sigasa', url: BASE_URL }],
  creator: 'Thulane Sigasa',
  publisher: 'exégeomai',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'exégeomai',
    title: 'exégeomai — Unfold the Sacred Depth of Scripture',
    description:
      'A free, open-source Bible app with 365 exegetical devotionals, 14,298 Strong\'s entries, and 32 offline translations. AES-256 hardware-encrypted.',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'exégeomai — Scholarly Bible Study App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'exégeomai — Unfold the Sacred Depth of Scripture',
    description:
      'Free, open-source Bible app. 365 devotionals, 14,298 Strong\'s entries, 32 offline translations. AES-256 encrypted.',
    images: ['/assets/og-image.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/assets/apple-touch-icon.png' }],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'exégeomai',
  operatingSystem: 'Android, iOS',
  applicationCategory: 'ReferenceApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'A scholarly Bible app offering 365 exegetical devotionals, 14,298 Strong\'s concordance entries, and 32 offline translations.',
  author: { '@type': 'Person', name: 'Thulane Sigasa' },
  url: BASE_URL,
  downloadUrl: 'https://github.com/thulanesigasa/bible_fun_facts/releases/latest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
