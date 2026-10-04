'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroPhoneMockups } from '@/components/HeroPhoneMockups';

const FAQS = [
  {
    q: 'What does "exégeomai" mean?',
    a: 'exégeomai (ἐξηγέομαι, Strong\'s G1834) is the classical Greek verb meaning "to lead out, draw forth in narrative, declare, or unfold divine mysteries". It is the biblical root from which we derive "exegesis" — letting Scripture speak for itself in its original historical, grammatical, and theological context.',
  },
  {
    q: 'Does exégeomai work completely offline without internet?',
    a: 'Yes! All 14,298 Strong\'s Greek and Hebrew definitions, 365 daily devotionals, and 32 full canonical Bible translations are stored in an optimized local SQLite database on your device. Once installed, zero internet access is required.',
  },
  {
    q: 'Is the app really 100% free with no ads or paywalls?',
    a: 'Absolutely. exégeomai is released under the permissive MIT Open Source license. There are no subscriptions, no locked features, no in-app purchases, and no third-party advertisements. As Matthew 10:8 teaches: "Freely you have received; freely give."',
  },
  {
    q: 'How does the app protect my privacy and study notes?',
    a: 'The application contains zero telemetry, zero analytics tracking, and zero advertising SDKs. All reading progress, private notes, and bookmarks are encrypted using Android Keystore AES-256 hardware encryption. Furthermore, FLAG_SECURE protects against background screen scrapers.',
  },
  {
    q: 'How do I install the Android APK directly on my phone?',
    a: 'Download the compiled APK directly from our GitHub Releases link below. Open the APK file on your Android device and tap "Install" (allowing installation from unknown sources if prompted). The app runs standalone on Android 8.0 through Android 15.',
  },
  {
    q: 'Can I suggest a verified local church or submit a correction?',
    a: 'Yes! You can submit sound, Christ-centered church assemblies or report lexical errata through our Contact portal or directly via GitHub Issues on our open repository.',
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Header />

      <main id="main">
        {/* HERO SECTION */}
        <header className="hero" id="hero">
          {/* Subtle Background Grid Lines */}
          <div className="grid-lines" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Decorative Floating Geometry */}
          <div className="deco-ring" aria-hidden="true"></div>
          <div className="deco-morph" aria-hidden="true"></div>
          <div className="deco-square" aria-hidden="true"></div>
          <div className="deco-circle" aria-hidden="true"></div>

          <div className="hero-inner">
            <div className="pill-badge">
              <span className="pill-dot"></span>
              <span>Scholarly Scripture Exegesis</span>
            </div>

            <h1>
              Every Root.<br />
              <span className="text-accent">Every Sacred Truth.</span>
            </h1>

            <p className="hero-sub">
              Unfold 14,298 Strong&apos;s Hebrew &amp; Greek lexical entries, 32 verified offline canons,
              author chronologies, and sound church ministries — 100% private with zero cloud telemetry.
            </p>

            <div className="hero-actions">
              <a href="#download" className="btn-primary">
                <span>Download Android APK</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v12" />
                  <path d="m7 11 5 5 5-5" />
                  <path d="M4 20h16" />
                </svg>
              </a>
              <Link href="/features" className="btn-outline">
                <span>Explore Features</span>
              </Link>
            </div>
          </div>

          {/* Triple High-Fidelity Mobile App Screens */}
          <HeroPhoneMockups />
        </header>

        {/* SECTION 2: PROBLEM & SOLUTION (About Section) */}
        <section className="section" id="about-preview">
          <div className="wrap">
            <div className="split-grid">
              <div className="split-copy">
                <span className="section-kicker">Deep Biblical Scholarship</span>
                <h3>Beyond Surface-Level Translations</h3>
                <p>
                  Modern English translations are invaluable, but Greek verb tenses, Hebrew wordplays,
                  and cultural idioms often fade in translation. To grasp the fullness of apostolic doctrine,
                  believers need direct access to original lemmas without seminary tuition.
                </p>
                <p>
                  exégeomai bridges the gap between devotional warmth and rigorous scholarship. Every scripture
                  is paired with interlinear roots, historical author context, and pronunciation guides.
                </p>
                <Link href="/about" className="cta-btn" style={{ display: 'inline-flex' }}>
                  <span>Read Our Theological Vision</span>
                </Link>
              </div>

              <div className="comparison-box">
                <div className="comparison-row">
                  <div className="comparison-icon check">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="comparison-text">
                    <h4>14,298 Strong&apos;s Greek &amp; Hebrew Entries</h4>
                    <p>Instant lexical definitions, pronunciations, morphology, and KJV concordance occurrences.</p>
                  </div>
                </div>

                <div className="comparison-row">
                  <div className="comparison-icon check">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="comparison-text">
                    <h4>32 Complete Bibles in Local SQLite</h4>
                    <p>KJV, ASV, Darby, Young&apos;s Literal, Vulgate, plus African vernaculars like isiZulu and Sepedi.</p>
                  </div>
                </div>

                <div className="comparison-row">
                  <div className="comparison-icon check">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="comparison-text">
                    <h4>Hardware Keystore AES-256 Encryption</h4>
                    <p>FLAG_SECURE screen protection and zero telemetry — no trackers, analytics, or surveillance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURES GRID */}
        <section className="section alt" id="features">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Engineered for Disciples</span>
              <h2>Everything for Rigorous Study in One App</h2>
              <p>
                From devotional reading at dawn to deep midnight theological cross-referencing,
                exégeomai provides the complete exegetical toolkit.
              </p>
            </div>

            <div className="cards-grid">
              {/* Feature 1 */}
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10" />
                    <path d="M6 10h10" />
                  </svg>
                </div>
                <h3>Strong&apos;s Concordance</h3>
                <p>
                  Access 8,674 Hebrew and 5,624 Greek lemmas with phonetic pronunciations,
                  root derivations, and complete biblical occurrences.
                </p>
                <Link href="/features" className="feature-tag">
                  <span>Learn more</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.93 4.93 4.24 4.24" />
                    <path d="m14.83 9.17 4.24-4.24" />
                    <path d="m14.83 14.83 4.24 4.24" />
                    <path d="m9.17 14.83-4.24 4.24" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <h3>32 Offline Canons</h3>
                <p>
                  Switch seamlessly between historical translations, Greek New Testament,
                  Latin Vulgate, and South African mother-tongue bibles.
                </p>
                <Link href="/features" className="feature-tag">
                  <span>View Canons</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
              </div>

              {/* Feature 3 */}
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                </div>
                <h3>365 Daily Exegesis</h3>
                <p>
                  A full year of daily exegetical devotionals analyzing key verses through
                  their original root concepts, historical settings, and practical reflections.
                </p>
                <Link href="/features" className="feature-tag">
                  <span>Explore Devotionals</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
              </div>

              {/* Feature 4 */}
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3>Historical Author Timelines</h3>
                <p>
                  Understand the human author, royal chronology, historical setting,
                  and covenants governing each biblical testament.
                </p>
                <Link href="/features" className="feature-tag">
                  <span>See Timelines</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
              </div>

              {/* Feature 5 */}
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3>Sound Church Directory</h3>
                <p>
                  Locate verified Christ-centered, biblical church ministries with precise GPS coordinates,
                  service times, and pastoral leadership information.
                </p>
                <Link href="/features" className="feature-tag">
                  <span>View Assemblies</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
              </div>

              {/* Feature 6 */}
              <div className="feature-card">
                <div className="feature-icon-box">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3>Hardware Keystore Security</h3>
                <p>
                  All personal reflections and reading progress are encrypted on device via
                  AES-256 GCM. FLAG_SECURE prevents unauthorized screenshots.
                </p>
                <Link href="/safety" className="feature-tag">
                  <span>Security Details</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: STEP-BY-STEP HOW IT WORKS */}
        <section className="section" id="how-it-works">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Simple Onboarding</span>
              <h2>From Installation to Original Greek in 3 Steps</h2>
              <p>No account registration required. Zero subscriptions. Instant local offline access.</p>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num">01</div>
                <h3>Download APK</h3>
                <p>
                  Get the standalone binary directly from GitHub Releases or Google Play.
                  Lightweight, clean, and installs in seconds.
                </p>
              </div>

              <div className="step-card">
                <div className="step-num">02</div>
                <h3>Select Your Canons</h3>
                <p>
                  Pick your default translation (KJV, ASV, Greek NT, Vulgate) and regional languages.
                  Everything caches immediately into SQLite.
                </p>
              </div>

              <div className="step-card">
                <div className="step-num">03</div>
                <h3>Tap Any Word for Root Exegesis</h3>
                <p>
                  Touch any word in the reader to open the Strong&apos;s lexicon card with Greek/Hebrew lemma,
                  morphology, pronunciation, and cross-references.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: SAFETY & TRUST (Cool Dark Banner) */}
        <section className="section cool" id="safety-preview">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Safety, Trust &amp; Zero Telemetry</span>
              <h2>Your Spiritual Life Stays on Your Device</h2>
              <p>
                We believe scripture reading and prayer are sacred. We refuse to sell data,
                inject advertising tracking, or leak your reading habits to cloud servers.
              </p>
            </div>

            <div className="security-grid">
              <div className="sec-card">
                <div className="sec-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3>Hardware Keystore</h3>
                <p>Notes and progress are secured with AES-256 GCM backed by the Android Hardware Keystore.</p>
              </div>

              <div className="sec-card">
                <div className="sec-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                </div>
                <h3>FLAG_SECURE</h3>
                <p>Operating system screen protection prevents background applications from capturing screenshots.</p>
              </div>

              <div className="sec-card">
                <div className="sec-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                  </svg>
                </div>
                <h3>100% Offline SQLite</h3>
                <p>All data operations execute against local embedded databases with zero external network polling.</p>
              </div>

              <div className="sec-card">
                <div className="sec-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </div>
                <h3>One-Tap Data Wipe</h3>
                <p>Full nuclear wipe capability allows you to instantly purge all stored keys, bookmarks, and notes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: PRICING & FREEDOM */}
        <section className="section alt" id="pricing">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Christ-Centered Stewardship</span>
              <h2>100% Free &amp; Open Source</h2>
              <p>
                No premium tier. No subscriptions. No paywalled chapters.
                The word of God is not for sale.
              </p>
            </div>

            <div className="pricing-grid">
              {/* Standalone Community Tier */}
              <div className="pricing-card featured">
                <span className="pricing-badge">Free Forever · MIT License</span>
                <div className="pricing-header">
                  <h3>exégeomai Standalone</h3>
                  <p>Full access for believers, pastors, and scholars worldwide.</p>
                </div>
                <div className="pricing-price">
                  <span className="pricing-amount">$0</span>
                  <span className="pricing-period">/ forever</span>
                </div>
                <ul className="pricing-features">
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>365 Daily Exegetical Devotionals</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>14,298 Strong&apos;s Greek &amp; Hebrew Lexicon</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>32 Complete Offline Bible Translations</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Hardware Keystore AES-256 Encryption</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Zero Ads, Zero Analytics, Zero Trackers</span>
                  </li>
                </ul>
                <a href="#download" className="btn-primary" style={{ justifyContent: 'center' }}>
                  <span>Download APK (Free)</span>
                </a>
              </div>

              {/* Open Source Contributor */}
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3>Community Contributor</h3>
                  <p>For developers, linguists, and biblical translators.</p>
                </div>
                <div className="pricing-price">
                  <span className="pricing-amount">Open</span>
                  <span className="pricing-period">/ GitHub</span>
                </div>
                <ul className="pricing-features">
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Full Source Code on GitHub</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Submit New Offline Vernacular Bibles</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Verify &amp; Add Orthodox Local Assemblies</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Direct Native Compilation Toolchains</span>
                  </li>
                </ul>
                <a
                  href="https://github.com/thulanesigasa/bible_fun_facts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ justifyContent: 'center', borderColor: '#CBD5E1', color: '#0F172A' }}
                >
                  <span>View GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Got Questions?</span>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know about the offline architecture, translations, and privacy.</p>
            </div>

            <div className="faq-wrap">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className={`faq-item ${openFaq === idx ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: DOWNLOAD CALLOUT BANNER */}
        <section className="section alt download-section" id="download">
          <div className="wrap">
            <div className="download-card">
              <h2>Begin Your Exegetical Journey Today</h2>
              <p>
                Experience the living depth of original biblical Hebrew and Greek.
                Install the Android APK directly, completely offline and 100% free.
              </p>

              <div className="download-actions">
                <a
                  href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 4v12" />
                    <path d="m7 11 5 5 5-5" />
                    <path d="M4 20h16" />
                  </svg>
                  <span>Download APK (v1.0.4)</span>
                </a>
                <a
                  href="https://github.com/thulanesigasa/bible_fun_facts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              </div>

              <div className="download-meta">
                <span>Android 8.0+ Compatible</span>
                <span>•</span>
                <span>SHA-256 Verified Binary</span>
                <span>•</span>
                <span>MIT License Open Source</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
