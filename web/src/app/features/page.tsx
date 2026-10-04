import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Features — Deep Biblical Scholarship',
  description:
    'Explore the complete feature suite of exégeomai: 365 daily devotionals, 14,298 Strong\'s Greek and Hebrew entries, 32 offline canons, and hardware security.',
};

export default function FeaturesPage() {
  const featureList = [
    {
      title: "14,298 Strong's Concordance Entries",
      category: 'LEXICAL SCHOLARSHIP',
      desc: 'Instant access to all 8,674 Hebrew and 5,624 Greek lemmas. Tap any word to view phonetic transliteration, lexical definition, morphology, and every biblical verse where the root occurs.',
    },
    {
      title: '32 Full Offline Canons',
      category: 'CANONICAL TEXTS',
      desc: 'Zero streaming required. Bundled KJV, ASV, Young’s Literal, Darby, Greek New Testament, Latin Vulgate, and South African vernaculars (isiZulu, Sepedi, Afrikaans) stored in embedded SQLite.',
    },
    {
      title: '365 Daily Exegetical Devotionals',
      category: 'DISCIPLESHIP',
      desc: 'Calendar-synchronized theological devotionals that analyze scripture through original linguistic roots, historical author intent, and practical Christian application.',
    },
    {
      title: 'Historical Author Chronologies',
      category: 'HISTORICAL CONTEXT',
      desc: 'Contextual timelines for every biblical writer, covering ancient Near-Eastern geography, royal reigns, governing covenants, and prophetic historical milestones.',
    },
    {
      title: 'Sound Church Ministry Directory',
      category: 'LOCAL FELLOWSHIP',
      desc: 'Discover verified orthodox, Christ-centered church assemblies with exact geo-coordinates, meeting times, and pastoral leadership information.',
    },
    {
      title: 'Hardware Keystore AES-256 Encryption',
      category: 'PRIVACY & SECURITY',
      desc: 'Your reading history, journal notes, and bookmarks are encrypted via hardware-backed AES-256 GCM. FLAG_SECURE protects against unauthorized screen recording.',
    },
  ];

  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Features Catalog</span>
            <h1>Everything a Serious Bible Student Needs</h1>
            <p>
              Built for depth, not commercial engagement metrics. Every tool serves the goal of
              unfolding Scripture in its original linguistic, cultural, and theological context.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="cards-grid" style={{ marginBottom: 64 }}>
              {featureList.map((f, i) => (
                <div key={i} className="feature-card">
                  <span className="pm-badge" style={{ alignSelf: 'flex-start' }}>{f.category}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Architecture Comparison Table */}
            <div className="prose-card" style={{ maxWidth: 1000 }}>
              <h2>Engineered Differently</h2>
              <p>Compare exégeomai&apos;s offline, privacy-first architecture against conventional commercial apps.</p>

              <div style={{ overflowX: 'auto', marginTop: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)', background: 'var(--surface-alt)' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Dimension</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)' }}>exégeomai</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--muted)' }}>Commercial Apps</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>Offline Storage</td>
                      <td style={{ padding: '14px 18px', color: 'var(--ink)', fontWeight: 600 }}>100% Embedded FTS5 SQLite (Zero data plan)</td>
                      <td style={{ padding: '14px 18px', color: 'var(--muted)' }}>Cloud streaming (Fails without internet)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>Original Language Depth</td>
                      <td style={{ padding: '14px 18px', color: 'var(--ink)', fontWeight: 600 }}>14,298 Strong’s Greek &amp; Hebrew Concordance linked</td>
                      <td style={{ padding: '14px 18px', color: 'var(--muted)' }}>English only or paid study expansion packs</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>Privacy &amp; Telemetry</td>
                      <td style={{ padding: '14px 18px', color: 'var(--ink)', fontWeight: 600 }}>Zero trackers, zero ads, zero data harvesting</td>
                      <td style={{ padding: '14px 18px', color: 'var(--muted)' }}>Ad SDKs &amp; behavioral analytics profiling</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>Cryptographic Security</td>
                      <td style={{ padding: '14px 18px', color: 'var(--ink)', fontWeight: 600 }}>Hardware Keystore AES-256 + FLAG_SECURE</td>
                      <td style={{ padding: '14px 18px', color: 'var(--muted)' }}>Unencrypted plaintext preferences</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>Software Freedom</td>
                      <td style={{ padding: '14px 18px', color: 'var(--ink)', fontWeight: 600 }}>100% Free &amp; Open Source (MIT License)</td>
                      <td style={{ padding: '14px 18px', color: 'var(--muted)' }}>Closed-source subscription paywalls</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: 40, textAlign: 'center' }}>
                <a href="/#download" className="btn-primary">
                  <span>Download APK Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
