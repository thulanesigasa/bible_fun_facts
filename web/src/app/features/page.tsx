import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeaturesSection } from '@/components/FeaturesSection';

export const metadata: Metadata = {
  title: 'Core Features',
  description:
    'Explore all exégeomai features — 365 exegetical devotionals, 14,298 Strong\'s entries, 32 offline translations, biometric security, and more.',
};

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main>
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
