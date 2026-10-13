import type { Metadata, Viewport } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

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
  title: { default: "exégeomai — Coming Soon", template: "%s | exégeomai" },
  description:
    "Scripture has depths. Discover the upcoming exégeomai Bible study app and join the waiting list for launch notifications.",
  applicationName: "exégeomai",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "exégeomai",
    title: "exégeomai — Coming Soon",
    description:
      "Scripture has depths. Get ready to discover them. Join the waiting list.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "exégeomai — Scripture has depths. Coming soon.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "exégeomai — Coming Soon",
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
  "@type": "WebSite",
  name: "exégeomai",
  url: BASE_URL,
  description:
    "The upcoming exégeomai Bible study app. Join the waiting list for launch news.",
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
