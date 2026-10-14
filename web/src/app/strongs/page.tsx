import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { StrongsSection } from '@/components/StrongsSection';

export const metadata: Metadata = {
  title: "Strong's Lexicon",
  description:
    "Browse all 14,298 Strong's concordance entries for Greek and Hebrew. Full-text search via FTS5 SQLite, offline, in the exégeomai app.",
};

export default function StrongsPage() {
  return (
    <>
      <main>
        <StrongsSection />
      </main>
      <Footer />
    </>
  );
}
