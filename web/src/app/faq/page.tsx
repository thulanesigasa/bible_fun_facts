import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/FaqSection';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about exégeomai — offline use, privacy, data deletion, platform support, and contributing.',
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
