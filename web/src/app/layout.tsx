import type { Metadata, Viewport } from "next";
import { Outfit, Space_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const BASE_URL = "https://exegeomai.app";

export const viewport: Viewport = {
  themeColor: "#FDD223",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "exégeomai", template: "%s | exégeomai" },
  description:
    "Scripture has depths. Discover the exégeomai Bible study experience and join the waiting list for launch notifications.",
  applicationName: "exégeomai",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "exégeomai",
    title: "exégeomai",
    description:
      "Scripture has depths. Get ready to discover them. Join the waiting list.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "exégeomai — Scripture has depths.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "exégeomai",
    description: "Scripture has depths. Get ready to discover them.",
    images: ["/opengraph-image"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/icon.png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "exégeomai",
      description:
        "The upcoming exégeomai Bible study app. Unfold Holy Scripture, Strong's Greek & Hebrew concordance, and ancient biblical context.",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "exégeomai",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-transparent.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://exegeomai.app",
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "exégeomai",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Android, iOS",
      description:
        "365 calendar-synchronized exegetical devotionals, 14,298 Strong's concordance definitions, and 32 offline Bible translations.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceMono.variable} ${poppins.variable}`}
    >
      <head>
        <meta name="google-site-verification" content="exegeomai-gsc-verification-token" />
        <link rel="canonical" href={BASE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
