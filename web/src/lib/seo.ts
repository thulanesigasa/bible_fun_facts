import type { Metadata } from 'next';
export const SITE_URL = 'https://exegeomai.app';
export const SITE_UPDATED = '2026-10-14';
export const pages: Record<string, { title: string; description: string }> = {
  '/': { title: 'exégeomai | Bible Study App Coming Soon', description: 'Explore Scripture, Greek and Hebrew words, daily discoveries, and thoughtful Bible study. Join the exégeomai waiting list for launch news.' },
  '/about': { title: 'About exégeomai', description: 'Learn the vision behind exégeomai and its approach to Scripture, original languages, historical context, and thoughtful personal study.' },
  '/features': { title: 'Bible Study Features', description: 'Explore exégeomai study tools: Scripture resources, Greek and Hebrew lexicons, daily devotionals, notes, progress, and a ministry directory.' },
  '/how-it-works': { title: 'How exégeomai Works', description: 'See how to explore Scripture, study original words, save reflections, use available offline resources, and manage your privacy choices.' },
  '/strongs': { title: "Strong’s Greek and Hebrew Lexicon", description: 'Preview original-language Bible study with Greek and Hebrew terms, transliterations, definitions, and Strong’s concordance references.' },
  '/pricing': { title: 'Pricing and Availability', description: 'Learn about exégeomai access, current availability, and contributions. Join the waiting list for official launch updates.' },
  '/safety': { title: 'Safety and Privacy Controls', description: 'Understand exégeomai account security, local app lock, secure storage, cloud boundaries, diagnostics, and privacy controls.' },
  '/security': { title: 'Account and Study Security', description: 'Explore exégeomai security controls and their boundaries, including secure storage, local access protection, exports, and account deletion.' },
  '/support': { title: 'Support Centre', description: 'Find exégeomai help, contact routes, privacy information, account-deletion guidance, and ways to report content or technical problems.' },
  '/help': { title: 'Help Centre', description: 'Get guidance on reading, language-study tools, available offline resources, account privacy, local security, and support.' },
  '/contact': { title: 'Contact exégeomai', description: 'Contact the exégeomai team about support, privacy requests, directory corrections, study content, or launch notifications.' },
  '/report-a-problem': { title: 'Report a Problem', description: 'Report a technical issue, incorrect study content, directory problem, or security concern to the exégeomai team.' },
  '/faq': { title: 'Frequently Asked Questions', description: 'Find answers about exégeomai, offline study, accounts, cloud synchronisation, privacy settings, and launch availability.' },
  '/community-guidelines': { title: 'Community Guidelines', description: 'Read the standards for respectful fellowship, authorised directory contributions, personal privacy, and responsible use of exégeomai.' },
  '/privacy': { title: 'Privacy Policy', description: 'Read the detailed exégeomai Privacy Policy covering accounts, study sync, public avatars, maps, diagnostics, retention, deletion, and your choices.' },
  '/terms': { title: 'Terms of Service', description: 'Read exégeomai terms covering accounts, study resources, directory contributions, content rights, service limitations, and statutory protections.' },
  '/data-safety': { title: 'Data Safety Declaration', description: 'See what exégeomai data stays local, what can leave your device, which providers receive it, and how permissions and privacy controls work.' },
  '/waitlist-privacy': { title: 'Waiting List Privacy', description: 'Learn how exégeomai uses your email and consent for launch notifications, protects signup records, and handles unsubscribe requests.' },
  '/account-deletion': { title: 'Account and Data Deletion', description: 'Learn how to request deletion of an exégeomai account, what server confirmation means, and how to manage local records and independent copies.' },
};
export function pageMetadata(path: string): Metadata {
  const page = pages[path];
  if (!page) throw new Error(`Missing page metadata: ${path}`);
  const title = path === '/' ? page.title : `${page.title} | exégeomai`;
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  return {
    title: { absolute: title }, description: page.description,
    alternates: { canonical: url }, robots: { index: true, follow: true },
    openGraph: { type: 'website', locale: 'en_ZA', siteName: 'exégeomai', title, description: page.description, url,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'exégeomai — Scripture has depths. Bible study app coming soon.' }] },
    twitter: { card: 'summary_large_image', title, description: page.description, images: [`${SITE_URL}/opengraph-image`] },
  };
}
