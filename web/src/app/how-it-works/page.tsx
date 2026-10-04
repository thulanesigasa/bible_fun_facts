import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'How It Works — Step-by-Step Exegesis Walkthrough',
  description:
    'Learn how exégeomai operates: from downloading the standalone APK to exploring Greek and Hebrew lexicons and offline canons.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Install the Standalone Application',
      desc: 'Download the lightweight Android APK directly from our verified GitHub Releases. No account creation, phone number, or login credentials are required. Simply open the APK and tap Install.',
      details: 'Compatible with Android 8.0 through Android 15. Standalone APK size is under 45 MB with zero bloatware.',
    },
    {
      num: '02',
      title: 'Select Primary Canons & Vernaculars',
      desc: 'On first launch, choose your default reading translations. You can toggle between King James Version, American Standard, Darby, Young’s Literal Translation, Latin Vulgate, or African mother tongues (isiZulu, Sepedi, Afrikaans).',
      details: 'All translations are stored in an embedded SQLite database with FTS5 full-text search.',
    },
    {
      num: '03',
      title: 'Tap Any Word for Root Exegesis',
      desc: 'While reading any passage, tap a word or phrase to immediately open the Strong’s Concordance bottom sheet. Inspect the original Greek or Hebrew lemma, phonetic pronunciation, root etymology, and all cross-references across Scripture.',
      details: 'Complete concordance contains 14,298 entries (8,674 Hebrew, 5,624 Greek) with original grammatical parsing.',
    },
    {
      num: '04',
      title: 'Inspect Author Timelines & Historical Context',
      desc: 'Before reading an epistle or prophetic book, switch to the Author Timeline view. Understand the author’s historical epoch, royal reigns, governing covenants, and archaeological geography.',
      details: 'Anchored in historical-grammatical hermeneutics, avoiding anachronisms and western cultural projections.',
    },
    {
      num: '05',
      title: 'Locate Sound Local Church Ministries',
      desc: 'Use the Church Directory tab to find verified, Christ-centered, confessional assemblies in your region. View Sunday service times, pastoral leadership, and precise GPS navigation coordinates.',
      details: 'Community-verified listings with strict theological adherence to sound biblical orthodoxy.',
    },
    {
      num: '06',
      title: 'Lock Your Study Notes with Hardware AES-256',
      desc: 'Optionally set a 4-digit PIN or biometric fingerprint lock. All personal reflections, highlights, and prayers are encrypted via the device’s Hardware Keystore with zero cloud leakage.',
      details: 'FLAG_SECURE ensures that background task switchers cannot photograph your private spiritual notes.',
    },
  ];

  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Walkthrough</span>
            <h1>How exégeomai Works</h1>
            <p>
              A seamless, zero-friction path from installation to scholarly original-language exegesis.
              No cloud accounts. No subscriptions. 100% private.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 860, margin: '0 auto 64px' }}>
              {steps.map((s, idx) => (
                <div key={idx} className="feature-card" style={{ padding: '36px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    <div className="step-num" style={{ margin: 0 }}>{s.num}</div>
                    <h3 style={{ margin: 0, fontSize: 22 }}>{s.title}</h3>
                  </div>
                  <p style={{ fontSize: 15, marginBottom: 12 }}>{s.desc}</p>
                  <div style={{ background: 'var(--surface-alt)', padding: '10px 16px', borderRadius: 'var(--r-sm)', fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
                    {s.details}
                  </div>
                </div>
              ))}
            </div>

            <div className="prose-card" style={{ textAlign: 'center' }}>
              <h2>Ready to Experience Deep Exegesis?</h2>
              <p style={{ marginBottom: 24 }}>
                Download the verified APK directly to your Android device and begin studying today.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                <a href="/#download" className="btn-primary">
                  <span>Download Android APK</span>
                </a>
                <Link href="/features" className="btn-outline" style={{ borderColor: 'var(--border-strong)', color: 'var(--ink)' }}>
                  <span>View Full Features</span>
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
