import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SecuritySection } from '@/components/SecuritySection';

export const metadata: Metadata = {
  title: 'Security & Privacy',
  description:
    'Learn how exégeomai protects your data with AES-256-CBC hardware encryption, PBKDF2 PIN hashing, and a zero-cloud-collection architecture.',
};

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main>
        <SecuritySection />
      </main>
      <Footer />
    </>
  );
}
