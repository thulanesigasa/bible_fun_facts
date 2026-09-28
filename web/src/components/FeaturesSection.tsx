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
    body: "Reading history, bookmarks, highlights, and user data never leave your device by default. Optional Supabase sync with row-level security — your data, your choice.",
  },
];

export function FeaturesSection() {
  return (
    <section className="page-section" id="features">
      <div className="wrap">
        <div className="split">
          <header className="split-lead">
            <h2>Everything a Serious Bible Student Needs</h2>
            <p>
              Built for depth, not engagement metrics. Every feature serves the goal of
              understanding Scripture in its original linguistic and cultural context.
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
        </div>
      </div>
    </section>
  );
}
