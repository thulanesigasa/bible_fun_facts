import React from 'react';

const features = [
  {
    title: '365 Exegetical Devotionals',
    body: 'Calendar-synchronized daily readings anchored in history, culture, and theology — not generic inspiration. Each devotional opens a layer of the original text unavailable in translation.',
  },
  {
    title: "14,298 Strong's Entries",
    body: 'Full-text search across the entire Greek and Hebrew lexicon via FTS5 SQLite. Tap any concordance number to see the original word, root, and every verse it appears in.',
  },
  {
    title: '32 Offline Translations',
    body: 'KJV, ESV, NIV, NASB, NLT, MSG, ASV, WEB, and 24 more — all embedded locally. No data plan required after install. Switch translations with a single tap.',
  },
  {
    title: 'Verse of the Day',
    body: "Intelligently curated daily verse with full cross-reference chain, Strong's mapping, and contextual commentary — delivered via background notification at your chosen time.",
  },
  {
    title: 'PIN & Biometric Lock',
    body: 'Hardware-backed AES-256-CBC encryption via Android Keystore and iOS Secure Enclave. Biometric unlock (fingerprint / Face ID) with automatic screen shield in the app switcher.',
  },
  {
    title: 'Zero-Cloud Architecture',
    body: 'Reading history, bookmarks, highlights, and user data never leave your device by default. Optional Supabase sync with row-level security — your data, your choice.',
  },
];

const comparisons = [
  {
    feature: 'Offline Storage',
    exegeomai: '100% Embedded FTS5 SQLite (Zero data required)',
    others: 'Cloud streaming (Fails without internet connection)',
  },
  {
    feature: 'Original Language Depth',
    exegeomai: '14,298 Strong’s Greek & Hebrew Concordance linked',
    others: 'English text only or paid study expansion packs',
  },
  {
    feature: 'Privacy & Telemetry',
    exegeomai: 'Zero trackers, zero ads, zero data harvesting',
    others: 'Embedded Facebook/Google ad SDKs & behavioral profiling',
  },
  {
    feature: 'Cryptographic Security',
    exegeomai: 'Hardware Keystore AES-256-CBC + PBKDF2 PIN hash',
    others: 'Plaintext app preferences / unencrypted SQLite',
  },
  {
    feature: 'Software Freedom',
    exegeomai: '100% Open Source under permissive MIT License',
    others: 'Proprietary closed-source lock-in',
  },
];

export function FeaturesSection() {
  return (
    <>
      <section className="split-section" id="features">
        <header className="split-lead">
          <h2>Everything a Serious Bible Student Needs</h2>
          <p>
            Built for depth, not engagement metrics. Every feature serves the goal of
            understanding Scripture in its original linguistic, cultural, and theological context.
          </p>
          <p>
            From Greek and Hebrew lexical roots to hardware-encrypted journal reflections,
            exégeomai provides the tools of biblical scholarship directly to your pocket.
          </p>
        </header>

        <ul className="feature-list" role="list">
          {features.map((f) => (
            <li className="feature-item" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Architecture Comparison Table ── */}
      <section className="page-section section-alt">
        <header className="section-intro">
          <h2>Engineered Differently</h2>
          <p>
            Compare exégeomai&apos;s scholarly, privacy-first architecture against
            conventional commercial Bible applications.
          </p>
        </header>

        <table className="specs-table">
          <thead>
            <tr>
              <th scope="col">Dimension</th>
              <th scope="col">exégeomai</th>
              <th scope="col">Conventional Apps</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row) => (
              <tr key={row.feature}>
                <td>{row.feature}</td>
                <td>{row.exegeomai}</td>
                <td style={{ color: 'var(--text-muted)' }}>{row.others}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
