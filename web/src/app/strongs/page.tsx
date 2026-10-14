import { Footer } from '@/components/Footer';
import { StrongsSection } from '@/components/StrongsSection';


export default function StrongsPage() {
  return (
    <>
      <main id="main">
        <header className="subpage-hero"><div className="wrap"><h1>Strong’s Greek and Hebrew Lexicon</h1><p>Explore a preview of original-language study tools.</p></div></header>
        <StrongsSection />
      </main>
      <Footer />
    </>
  );
}
