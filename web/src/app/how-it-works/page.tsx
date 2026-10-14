import Link from 'next/link';
import { Footer } from '@/components/Footer';


export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Install the Standalone Application',
      desc: 'Follow official launch announcements for installation instructions. Account features use registration and sign-in; supported local resources have their own offline availability.',
      details: 'Platform compatibility and package size depend on the published release.',
    },
    {
      num: '02',
      title: 'Select Primary Canons & Vernaculars',
      desc: 'On first launch, choose your default reading translations. You can toggle between King James Version, American Standard, Darby, Young’s Literal Translation, Latin Vulgate, or African mother tongues (isiZulu, Sepedi, Afrikaans).',
      details: 'Available translations can be bundled, downloaded, or retrieved online, depending on the resource.',
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
      desc: 'Use the Church Directory tab to find listed ministries in your region. View Sunday service times, pastoral leadership, and precise GPS navigation coordinates.',
      details: 'Community-verified listings with strict theological adherence to sound biblical orthodoxy.',
    },
    {
      num: '06',
      title: 'Lock Your Study Notes with Hardware AES-256',
      desc: 'Optionally set a 4-digit PIN or biometric fingerprint lock. Local access protection, secure storage, encrypted exports, and cloud synchronisation have different boundaries.',
      details: 'Screenshot protections depend on the platform and do not prevent a photograph taken with another device.',
    },
  ];

  return (
    <>
      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Walkthrough</span>
            <h1>How exégeomai Works</h1>
            <p>
              A seamless, zero-friction path from installation to scholarly original-language exegesis.
              Account features, local resources, and online tools offer different choices. See the Privacy Policy for their data flows.
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
                    <h2 style={{ margin: 0, fontSize: 22 }}>{s.title}</h2>
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
                <a href="/#waitlist" className="btn-primary">
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
