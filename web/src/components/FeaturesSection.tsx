import React from 'react';
import {
  BookSvg,
  SearchSvg,
  LockSvg,
  GlobeSvg,
  SparklesSvg,
  KeySvg,
} from './SvgIcons';

const features = [
  {
    icon: <BookSvg size={22} />,
    title: '365 Exegetical Devotionals',
    body: 'Calendar-synchronized daily readings anchored in history, culture, and theology — not generic inspiration. Each devotional opens a layer of the original text unavailable in translation.',
  },
  {
    icon: <SearchSvg size={22} />,
    title: '14,298 Strong\'s Entries',
    body: 'Full-text search across the entire Greek and Hebrew lexicon via FTS5 SQLite. Tap any concordance number to see the original word, root, and every verse it appears in.',
  },
  {
    icon: <GlobeSvg size={22} />,
    title: '32 Offline Translations',
    body: 'KJV, ESV, NIV, NASB, NLT, MSG, ASV, WEB, and 24 more — all embedded locally. No data plan required after install. Switch translations with a single tap.',
  },
  {
    icon: <SparklesSvg size={22} />,
    title: 'Verse of the Day',
    body: 'Intelligently curated daily verse with full cross-reference chain, Strong\'s mapping, and contextual commentary — delivered via background notification at your chosen time.',
  },
  {
    icon: <LockSvg size={22} />,
    title: 'PIN & Biometric Lock',
    body: 'Hardware-backed AES-256-CBC encryption via Android Keystore and iOS Secure Enclave. Biometric unlock (fingerprint / Face ID) with automatic screen shield in the app switcher.',
  },
  {
    icon: <KeySvg size={22} />,
    title: 'Zero-Cloud Architecture',
    body: 'Reading history, bookmarks, highlights, and user data never leave your device by default. Optional Supabase sync with row-level security — your data, your choice.',
  },
];

export function FeaturesSection() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Core Features</span>
          <h2 className="section-title">Everything a Serious Bible Student Needs</h2>
          <p className="section-desc">
            Built for depth, not engagement metrics. Every feature serves the goal of
            understanding Scripture in its original linguistic and cultural context.
          </p>
        </div>

        <div className="grid-3">
          {features.map((f) => (
            <div className="card" key={f.title}>
              <div className="card-icon">{f.icon}</div>
              <h3 className="card-title">{f.title}</h3>
              <p className="card-body">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
