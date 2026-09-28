import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── Notus Hero ── */}
        <HeroSection />

        {/* ── Core Philosophy & Overview Split ── */}
        <section className="split-section section-alt">
          <header className="split-lead">
            <h2>Scholarly Exegesis Without Distraction</h2>
            <p>
              Conventional Bible apps focus on social gamification, streaks, and
              engagement metrics. exégeomai is engineered strictly for depth:
              unfolding the original linguistic, cultural, and historical context of
              every biblical passage.
            </p>
            <p>
              Every verse word links directly to James Strong&apos;s exhaustive
              concordance. Every daily devotional is historically grounded. Every
              translation is stored offline on your device with hardware encryption.
            </p>
            <Link href="/features" className="btn btn-ghost" style={{ marginTop: '16px' }}>
              Explore All Features
            </Link>
          </header>

          <ul className="feature-list" role="list">
            <li className="feature-item">
              <h3>365 Exegetical Devotionals</h3>
              <p>
                Calendar-synchronized daily readings anchored in historical, cultural,
                and theological exegesis — opening layers unavailable in plain translation.
              </p>
            </li>
            <li className="feature-item">
              <h3>14,298 Strong&apos;s Entries</h3>
              <p>
                Full Greek and Hebrew lexicon with FTS5 SQLite substring search across
                roots, transliterations, definitions, and verse cross-references.
              </p>
            </li>
            <li className="feature-item">
              <h3>32 Offline Translations</h3>
              <p>
                KJV, ESV, NIV, NASB, NLT, MSG, BBE, ASV, and 24 more translations embedded
                locally on-device. Zero data plan required after installation.
              </p>
            </li>
            <li className="feature-item">
              <h3>Hardware-Backed Security</h3>
              <p>
                Android Keystore and iOS Secure Enclave AES-256-CBC encryption with
                PBKDF2 PIN hashing and zero cloud collection by default.
              </p>
            </li>
          </ul>
        </section>

        {/* ── Notus-Style Subpage Showcase Grid ── */}
        <section className="page-section">
          <header className="section-intro section-intro-centered">
            <h2>Dedicated App Portals</h2>
            <p>
              Explore individual facets of the exégeomai platform through dedicated,
              full-page documentation and interactive tools.
            </p>
          </header>

          <section className="showcase-grid">
            <article className="showcase-card">
              <header>
                <span className="showcase-eyebrow">Capabilities</span>
                <h3>Core Features</h3>
                <p>
                  Comprehensive breakdown of devotionals, translation switching,
                  reading workflows, and linguistic study tools.
                </p>
              </header>
              <Link href="/features" className="showcase-link">
                View Features &rarr;
              </Link>
            </article>

            <article className="showcase-card">
              <header>
                <span className="showcase-eyebrow">Concordance</span>
                <h3>Strong&apos;s Lexicon</h3>
                <p>
                  Interactive Greek and Hebrew search engine with morphology,
                  lexical definitions, and biblical occurrence counts.
                </p>
              </header>
              <Link href="/strongs" className="showcase-link">
                Explore Lexicon &rarr;
              </Link>
            </article>

            <article className="showcase-card">
              <header>
                <span className="showcase-eyebrow">Confidentiality</span>
                <h3>Security &amp; Privacy</h3>
                <p>
                  Hardware encryption specifications, PBKDF2 parameters,
                  app switcher shielding, and zero-cloud architecture.
                </p>
              </header>
              <Link href="/security" className="showcase-link">
                Review Security &rarr;
              </Link>
            </article>

            <article className="showcase-card">
              <header>
                <span className="showcase-eyebrow">Knowledge Base</span>
                <h3>Technical FAQ</h3>
                <p>
                  Detailed answers regarding offline storage, multi-language support,
                  GDPR compliance, and open-source contributions.
                </p>
              </header>
              <Link href="/faq" className="showcase-link">
                Read FAQ &rarr;
              </Link>
            </article>

            <article className="showcase-card">
              <header>
                <span className="showcase-eyebrow">Compliance</span>
                <h3>Account Deletion</h3>
                <p>
                  GDPR Article 17 and Google Play policy compliant self-service data
                  eradication portal with verifiable tracking.
                </p>
              </header>
              <Link href="/deletion" className="showcase-link">
                Access Portal &rarr;
              </Link>
            </article>

            <article className="showcase-card">
              <header>
                <span className="showcase-eyebrow">Legal Trust</span>
                <h3>Privacy &amp; Terms</h3>
                <p>
                  Complete legal protections, zero tracking commitments, and
                  public domain attribution for Scripture manuscripts.
                </p>
              </header>
              <Link href="/privacy" className="showcase-link">
                Read Privacy &rarr;
              </Link>
            </article>
          </section>
        </section>

        {/* ── Open Source & Transparency Section ── */}
        <section className="split-section section-alt">
          <header className="split-lead">
            <h2>Open Source &amp; Theological Transparency</h2>
            <p>
              Because God&apos;s Word is freely given, exégeomai is distributed as
              free, open-source software under the permissive MIT license. All lexicon
              data and Bible translations utilize canonical public-domain manuscripts
              and verified open databases.
            </p>
            <p>
              No user data is ever sold, monetized, or subjected to ad-tracking analytics.
              The entire React Native and Next.js codebase is auditable by anyone on GitHub.
            </p>
            <a
              href="https://github.com/thulanesigasa/bible_fun_facts"
              className="btn btn-dark"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: '16px' }}
            >
              Star on GitHub
            </a>
          </header>

          <ul className="capability-list" role="list">
            <li className="capability-item">100% Free &amp; Ad-Free Forever</li>
            <li className="capability-item">Zero Third-Party Ad Trackers</li>
            <li className="capability-item">Permissive MIT Open Source License</li>
            <li className="capability-item">Canonical FTS5 SQLite Offline Database</li>
            <li className="capability-item">Biometric &amp; Keystore Isolation</li>
            <li className="capability-item">Full GDPR Article 17 Erasure</li>
          </ul>
        </section>

        {/* ── Notus Call-to-Action Banner ── */}
        <section className="banner-section">
          <h2>Ready to Deepen Your Study of Scripture?</h2>
          <p>
            Download the standalone native Android APK directly from GitHub Releases,
            or inspect the open-source codebase.
          </p>
          <nav className="banner-actions" aria-label="Call to action">
            <a
              href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
              className="btn btn-accent"
            >
              Download APK — v1.0.4
            </a>
            <a
              href="https://github.com/thulanesigasa/bible_fun_facts"
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </nav>
        </section>
      </main>
      <Footer />
    </>
  );
}
