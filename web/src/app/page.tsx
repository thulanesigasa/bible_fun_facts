import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { StrongsSection } from '@/components/StrongsSection';
import { SecuritySection } from '@/components/SecuritySection';
import { FaqSection } from '@/components/FaqSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StrongsSection />
        <SecuritySection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
