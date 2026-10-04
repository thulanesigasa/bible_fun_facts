import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Help Centre — exégeomai Documentation',
  description:
    'Comprehensive user manuals, APK sideloading tutorials, and Strong\'s concordance user guides for exégeomai.',
};

export default function HelpPage() {
  const guides = [
    {
      title: 'How to Sideload & Install the Android APK',
      category: 'INSTALLATION',
      content:
        'Download the APK file from GitHub Releases. When prompted by Android with "File might be harmful", tap "Download anyway". Open the downloaded APK in your Downloads folder and tap "Install". If prompted to "Allow from this source", enable the toggle in Android Settings.',
    },
    {
      title: 'Navigating Strong’s Hebrew & Greek Lexicons',
      category: 'EXEGESIS',
      content:
        'In the Scripture reader, words with linked concordance numbers are subtly highlighted. Tap any word to expand the Strong’s modal showing lexical definition, transliteration, pronunciation audio, and KJV translation counts.',
    },
    {
      title: 'Switching Between the 32 Offline Canons',
      category: 'CANON SELECTOR',
      content:
        'Tap the translation code pill in the top app bar (e.g. "KJV") to open the canon drawer. Select from historical English translations, original language texts (Textus Receptus, Septuagint, Vulgate), or African vernaculars (isiZulu, Sepedi). All texts render instantly offline.',
    },
    {
      title: 'Setting Up Biometric & PIN Security',
      category: 'PRIVACY',
      content:
        'Navigate to the Vault tab → Security Settings. Enable "Master PIN" and choose a 4-digit code. If your device supports fingerprint or face biometric sensors, toggle "Enable Biometrics" for instant, hardware-isolated unlock.',
    },
    {
      title: 'Locating & Filtering Sound Church Ministries',
      category: 'CHURCH DIRECTORY',
      content:
        'Switch to the Churches tab. The app uses your coarse GPS coordinates locally on your device to calculate distance to sound Christ-centered assemblies. Tap any church card to view full meeting times and pastoral leadership.',
    },
    {
      title: 'Executing a Full Local Nuclear Data Wipe',
      category: 'DATA MANAGEMENT',
      content:
        'If you wish to decommission your device or remove all personal reading notes, go to Settings → Security → Nuclear Data Wipe. Confirm the prompt to permanently purge all local SQLite tables and Android Keystore encryption keys.',
    },
  ];

  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">User Manual &amp; Guides</span>
            <h1>Help Centre</h1>
            <p>
              Step-by-step instructions to help you navigate translations, install standalone APKs,
              and unlock deep original language exegesis.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 64 }}>
              {guides.map((g, idx) => (
                <div key={idx} className="feature-card">
                  <span className="pm-badge" style={{ alignSelf: 'flex-start' }}>{g.category}</span>
                  <h3 style={{ fontSize: 18, marginTop: 4 }}>{g.title}</h3>
                  <p style={{ fontSize: 14 }}>{g.content}</p>
                </div>
              ))}
            </div>

            <div className="prose-card" style={{ textAlign: 'center' }}>
              <h2>Need Further Assistance?</h2>
              <p>Our support team and open source maintainers are available to assist you.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-primary">
                  <span>Contact Support</span>
                </Link>
                <Link href="/faq" className="btn-outline" style={{ borderColor: 'var(--border-strong)', color: 'var(--ink)' }}>
                  <span>Read FAQ</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
