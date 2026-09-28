import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── Section 1: Hero Section with Full-Bleed Gold Sacred Exegesis Poster (Zero Divs) ── */}
        <section className="notus-hero-section">
          <header className="hero-text-wrap">
            <h1>exégeomai — Sacred Biblical Exegesis &amp; Original Language Concordance.</h1>
            <p>
              exégeomai is Free and Open Source. 365 calendar-synchronized daily
              devotionals, 14,298 Strong&apos;s Greek and Hebrew concordance entries
              with sub-10ms FTS5 search, and 32 offline Bible translations secured by
              AES-256 hardware encryption.
            </p>
            <nav className="hero-buttons-row" aria-label="Hero action links">
              <a href="#explore" className="btn-get-started">
                Explore Features
              </a>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
                className="btn-github-star"
              >
                Download APK v1.0.4
              </a>
            </nav>
          </header>

          <img
            src="/assets/hero_exegesis_pattern.png"
            alt="Sacred Exegesis Geometric Poster"
            className="hero-pattern-img"
          />
        </section>

        {/* ── Section 2: Angled Slate Section & 4 Feature Pillars (Zero Divs) ── */}
        <section className="notus-angled-section" id="explore">
          <span className="angled-cut-top" aria-hidden="true" />

          <section className="angled-layout-row">
            {/* Elevated Featured Card (Left) with Authentic Study Desk Photo */}
            <article className="notus-featured-card">
              <img
                src="/assets/study_scripture_desk.jpg"
                alt="Antique Bible manuscript with Greek and Hebrew scholarly notes"
                className="featured-card-photo"
              />
              <section className="featured-card-content">
                <h4>Engineered for Scholarly Depth</h4>
                <p>
                  Putting together an exegetical study has never been easier than connecting
                  original Greek and Hebrew lemmas directly with canonical Scripture. From
                  daily devotionals to deep theological research, explore historical,
                  cultural, and linguistic contexts with zero cloud telemetry.
                </p>
              </section>
            </article>

            {/* 2x2 Feature Pillars (Right) */}
            <section className="pillars-grid-2x2">
              <article className="pillar-cell">
                <span className="notus-emblem-circle">365</span>
                <h6>365 Devotionals</h6>
                <p>Calendar-synchronized daily readings anchored in history, culture, and theology.</p>
              </article>

              <article className="pillar-cell">
                <span className="notus-emblem-circle">14K</span>
                <h6>Strong&apos;s Lexicon</h6>
                <p>14,298 Greek &amp; Hebrew words with millisecond FTS5 SQLite substring search.</p>
              </article>

              <article className="pillar-cell">
                <span className="notus-emblem-circle">32</span>
                <h6>32 Translations</h6>
                <p>Complete Bible versions embedded offline, including South African and Zimbabwean canons.</p>
              </article>

              <article className="pillar-cell">
                <span className="notus-emblem-circle">256</span>
                <h6>Hardware Security</h6>
                <p>AES-256-CBC hardware encryption via Android Keystore &amp; iOS Secure Enclave.</p>
              </article>
            </section>
          </section>
        </section>

        {/* ── Section 3: Exegetical Study Tools with Floating Semantic App Cards (Zero Divs) ── */}
        <section className="notus-components-section">
          <section className="components-text-col">
            <span className="notus-emblem-lg">LEX</span>
            <h3>Exegetical Study Tools</h3>
            <p>
              Every tool that you need in sacred biblical research comes built in as an
              offline module. All concordance entries, lexical lemmas, and translation
              canons fit together harmoniously to illuminate scripture.
            </p>
            <nav className="notus-pills-row" aria-label="Lexicon tool tags">
              <span className="notus-pill-tag">Greek G1–G5624</span>
              <span className="notus-pill-tag">Hebrew H1–H8674</span>
              <span className="notus-pill-tag">FTS5 Search</span>
              <span className="notus-pill-tag">Morphology</span>
              <span className="notus-pill-tag">Etymology</span>
              <span className="notus-pill-tag">Cross-References</span>
              <span className="notus-pill-tag">Daily Calendar</span>
              <span className="notus-pill-tag">Offline SQLite</span>
            </nav>
            <Link href="/strongs" className="notus-view-all">
              Explore Strong&apos;s Lexicon &gt;&gt;
            </Link>
          </section>

          {/* Genuine exégeomai App Component Layered Stage (Zero Divs) */}
          <aside className="layered-components-stage" aria-label="Interactive app component previews">
            {/* Layer 1: Strong's Lexicon Lemma Card */}
            <article className="floating-layer-card layer-lexicon-card">
              <header className="layer-card-header">
                <span className="layer-card-tag">Strong&apos;s Greek</span>
                <span className="layer-card-badge">VERB</span>
              </header>
              <h5 className="layer-lemma-title">G1834 · ἐξηγέομαι</h5>
              <p className="layer-lemma-translit">exēgéomai (ex-ay-geh&apos;-om-ahee)</p>
              <p className="layer-lemma-def">
                To lead out, declare, unfold the deep sacred meaning of divine truth.
              </p>
              <footer className="layer-lemma-meta">
                <span>Root: ἐκ (1537) + ἡγέομαι (2233)</span>
                <span className="layer-meta-count">6 Occurrences</span>
              </footer>
            </article>

            {/* Layer 2: 3-Lens Devotional Reading Card */}
            <article className="floating-layer-card layer-devotional-card">
              <header className="layer-card-header">
                <span className="layer-card-tag" style={{ color: '#FDD223' }}>Daily Exegesis</span>
                <span className="layer-card-badge" style={{ background: '#FDD223', color: '#0F172A' }}>John 1:18</span>
              </header>
              <p className="layer-scripture-quote">
                &ldquo;No man hath seen God at any time; the only begotten Son... he hath declared [ἐξηγήσατο] him.&rdquo;
              </p>
              <nav className="layer-lens-tabs" aria-label="Exegesis lenses">
                <span className="lens-pill lens-active">Historical</span>
                <span className="lens-pill">Customs</span>
                <span className="lens-pill">Theology</span>
              </nav>
            </article>

            {/* Layer 3: Translation Canons Card */}
            <article className="floating-layer-card layer-canons-card">
              <header className="layer-card-header">
                <span className="layer-card-tag">Offline Canons</span>
                <span className="layer-card-badge">32 Built-in</span>
              </header>
              <ul className="layer-canons-list" role="list">
                <li><strong>KJV</strong> · King James Version (1611)</li>
                <li><strong>ASV</strong> · American Standard (1901)</li>
                <li><strong>ZUL</strong> · IBHAYIBHELI ELINGCWELE</li>
                <li><strong>SNA</strong> · Bhaibheri Dzvene (1949)</li>
              </ul>
            </article>

            {/* Layer 4: Hardware Keystore Pill */}
            <article className="floating-layer-card layer-security-pill">
              <span>🔒 AES-256 Hardware Keystore · Zero Telemetry</span>
            </article>

            {/* Layer 5: SQLite FTS5 Search Bar */}
            <article className="floating-layer-card layer-search-bar">
              <header className="layer-search-row">
                <span className="search-prompt-symbol">🔍</span>
                <span className="search-prompt-text">Search 14,298 Strong&apos;s words...</span>
                <span className="search-speed-badge">1.8ms</span>
              </header>
            </article>
          </aside>
        </section>

        {/* ── Section 4: 6 Core Linguistic Canons (60-30-10 Staggered Offset Grid) ── */}
        <section className="notus-colored-cards-section">
          <section className="staggered-cards-col">
            {/* Column 1 (Left) */}
            <section className="cards-subcol-left">
              <article className="framework-card card-gold">
                <span className="card-canon-emblem">G</span>
                <h5>Greek Lexicon</h5>
                <p>5,624 New Testament Greek lemmas with Textus Receptus &amp; LXX Septuagint definitions.</p>
              </article>

              <article className="framework-card card-dark-slate">
                <span className="card-canon-emblem">H</span>
                <h5>Hebrew Roots</h5>
                <p>8,674 Old Testament Biblical Hebrew roots with Masoretic theological etymologies.</p>
              </article>

              <article className="framework-card card-charcoal">
                <span className="card-canon-emblem">365</span>
                <h5>365 Devotionals</h5>
                <p>Synchronized daily feeds opening Historical, Cultural, and Theological exegesis.</p>
              </article>
            </section>

            {/* Column 2 (Right - Staggered 48px Offset) */}
            <section className="cards-subcol-right">
              <article className="framework-card card-white-surface">
                <span className="card-canon-emblem">32</span>
                <h5>32 Translations</h5>
                <p>Complete offline Bible canons including King James, ASV, Darby, and Young&apos;s Literal.</p>
              </article>

              <article className="framework-card card-gold-deep">
                <span className="card-canon-emblem">11</span>
                <h5>African Canons</h5>
                <p>Native canons in isiZulu, isiXhosa, Sepedi, Sesotho, Setswana, Shona, and Xitsonga.</p>
              </article>

              <article className="framework-card card-slate-accent">
                <span className="card-canon-emblem">256</span>
                <h5>AES-256 Vault</h5>
                <p>Hardware-backed keystore encryption, private study mode, and zero cloud telemetry.</p>
              </article>
            </section>
          </section>

          <section className="components-text-col">
            <span className="notus-emblem-lg">CAN</span>
            <h3>Original Language Canons</h3>
            <p>
              To experience authentic biblical exegesis, scripture must be studied in its native
              linguistic frameworks. exégeomai brings ancient Greek, classical Biblical Hebrew,
              and contemporary African translations into one unified offline interface.
            </p>
            <p style={{ marginTop: '-12px', marginBottom: '24px' }}>
              Engineered from the ground up to operate 100% offline without mandatory accounts,
              trackers, or cloud dependencies.
            </p>
            <nav className="notus-pills-row" aria-label="Canon tags">
              <span className="notus-pill-tag">Textus Receptus</span>
              <span className="notus-pill-tag">Masoretic Text</span>
              <span className="notus-pill-tag">LXX Septuagint</span>
              <span className="notus-pill-tag">Morphology</span>
              <span className="notus-pill-tag">Lemma Roots</span>
              <span className="notus-pill-tag">FTS5 SQLite</span>
              <span className="notus-pill-tag">Interlinear</span>
              <span className="notus-pill-tag">100% Offline</span>
            </nav>
            <Link href="/features" className="notus-view-all">
              View All Core Features &gt;&gt;
            </Link>
          </section>
        </section>

        {/* ── Section 5: Scholarly Technical Architecture (3D Perspective Code Window) ── */}
        <section className="notus-doc-section">
          <section className="components-text-col">
            <span className="notus-emblem-lg">DOC</span>
            <h3>Scholarly Technical Architecture</h3>
            <p>
              exégeomai provides complete transparency into lexical sources, cryptographic
              implementation, and database architecture. Inspect exact SQLite schemas,
              offline indexing algorithms, and cryptographic proofs.
            </p>
            <ul className="doc-checklist" role="list">
              <li className="doc-check-row">
                <span className="doc-check-icon">✓</span>
                <span>14,298 Strong&apos;s Greek &amp; Hebrew Definitions Embedded Offline</span>
              </li>
              <li className="doc-check-row">
                <span className="doc-check-icon">✓</span>
                <span>FTS5 SQLite Full-Text Substring Search with Sub-10ms Latency</span>
              </li>
              <li className="doc-check-row">
                <span className="doc-check-icon">✓</span>
                <span>Hardware-Backed AES-256-CBC Encryption &amp; Zero Cloud Telemetry</span>
              </li>
            </ul>
          </section>

          {/* Genuine exégeomai SQLite & Crypto Code Window in 3D Perspective (Zero Divs) */}
          <aside style={{ display: 'flex', justifyContent: 'center' }}>
            <article className="doc-code-window">
              <header className="code-window-header">
                <span className="code-window-dots">
                  <span className="code-dot dot-red" />
                  <span className="code-dot dot-yellow" />
                  <span className="code-dot dot-green" />
                </span>
                <span className="code-window-title">schema_strongs_fts5.sql</span>
                <span className="code-window-tag">SQLITE WAL</span>
              </header>
              <pre className="code-window-body">
                <code>{`-- 14,298 Lemma SQLite FTS5 Full-Text Search
CREATE VIRTUAL TABLE strongs_words_fts USING fts5(
  strongs_id UNINDEXED,
  lemma,
  transliteration,
  pronunciation,
  definition,
  kjv_definition,
  prefix='2 3 4',
  tokenize='unicode61 remove_diacritics 2'
);

-- Fast Substring Query (<8ms on Android/iOS)
SELECT strongs_id, lemma, definition,
       highlight(strongs_words_fts, 1, '<mark>', '</mark>')
FROM strongs_words_fts
WHERE strongs_words_fts MATCH 'exēgeomai*'
ORDER BY rank LIMIT 25;

-- AES-256-CBC Hardware Keystore Protection
CIPHER: AES/CBC/PKCS7Padding
KEYSTORE: AndroidKeyStore / iOS Secure Enclave`}</code>
              </pre>
            </article>
          </aside>
        </section>

        {/* ── Section 6: Dedicated Study Portals (Authentic App UI Cards Trio) ── */}
        <section className="notus-pages-section">
          <header className="pages-section-header">
            <h2>Dedicated Study Portals</h2>
            <p>
              Each domain in exégeomai is structured into a dedicated, focused web portal
              engineered with pure semantic HTML5 for rapid access and zero clutter.
            </p>
          </header>

          <section className="pages-cards-trio">
            {/* Portal Card 1: Core Features */}
            <Link href="/features" className="portal-preview-card">
              <header className="portal-card-topbar">
                <h5>Core Features Portal</h5>
                <span className="portal-topbar-tag">365 DEVOTIONALS</span>
              </header>
              <section className="portal-card-body">
                <span className="portal-mockup-badge">DAILY READING · DAY 271</span>
                <h6 className="portal-mockup-title">John 1:18 — The Only Begotten Son</h6>
                <p className="portal-mockup-desc">
                  3-Lens Scholarly Exegesis: 1st Century Roman administration, Second Temple customs, and Christological theology.
                </p>
                <dl className="portal-stats-row">
                  <dt>365</dt><dd>Readings</dd>
                  <dt>32</dt><dd>Translations</dd>
                  <dt>100%</dt><dd>Offline</dd>
                </dl>
              </section>
              <footer className="portal-card-footer">
                <span>Explore Core Features</span>
                <span>→</span>
              </footer>
            </Link>

            {/* Portal Card 2: Strong's Lexicon */}
            <Link href="/strongs" className="portal-preview-card">
              <header className="portal-card-topbar">
                <h5>Strong&apos;s Lexicon Engine</h5>
                <span className="portal-topbar-tag">14,298 WORDS</span>
              </header>
              <section className="portal-card-body">
                <span className="portal-mockup-badge">FTS5 SUBSTRING SEARCH</span>
                <h6 className="portal-mockup-title">G1834 · ἐξηγέομαι (exēgeomai)</h6>
                <p className="portal-mockup-desc">
                  Exhaustive Greek &amp; Hebrew concordance with pronunciation, HELPS word-studies, and root lemma etymologies.
                </p>
                <dl className="portal-stats-row">
                  <dt>5,624</dt><dd>Greek</dd>
                  <dt>8,674</dt><dd>Hebrew</dd>
                  <dt>&lt;8ms</dt><dd>Latency</dd>
                </dl>
              </section>
              <footer className="portal-card-footer">
                <span>Launch Lexicon Search</span>
                <span>→</span>
              </footer>
            </Link>

            {/* Portal Card 3: Security & Privacy */}
            <Link href="/security" className="portal-preview-card">
              <header className="portal-card-topbar">
                <h5>Security &amp; Privacy Vault</h5>
                <span className="portal-topbar-tag">AES-256-CBC</span>
              </header>
              <section className="portal-card-body">
                <span className="portal-mockup-badge">ZERO CLOUD TELEMETRY</span>
                <h6 className="portal-mockup-title">Hardware Keystore Vault</h6>
                <p className="portal-mockup-desc">
                  Biometric Face ID / Fingerprint lock, private study incognito mode, and GDPR Article 17 permanent deletion portal.
                </p>
                <dl className="portal-stats-row">
                  <dt>256-Bit</dt><dd>AES Key</dd>
                  <dt>PBKDF2</dt><dd>Key Derivation</dd>
                  <dt>0</dt><dd>Trackers</dd>
                </dl>
              </section>
              <footer className="portal-card-footer">
                <span>Inspect Security Specs</span>
                <span>→</span>
              </footer>
            </Link>
          </section>
        </section>

        {/* ── Section 7: Free & Open Source Callout with Watermark ── */}
        <section className="notus-open-source-section">
          <section className="open-source-inner">
            <section className="open-source-text">
              <span className="notus-emblem-circle" style={{ marginBottom: '24px' }}>
                MIT
              </span>
              <h3>Free &amp; Open Source</h3>
              <p>
                exégeomai is distributed under the MIT License on GitHub. We believe sacred
                biblical exegesis and original language tools should be freely available to
                every scholar, pastor, student, and believer worldwide.
              </p>
              <p>
                Get it free on GitHub, verify the cryptographic privacy guarantees, and help
                us spread the Word with a Star!
              </p>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-github-star-lg"
              >
                Star on GitHub
              </a>
            </section>

            <aside className="open-source-watermark" aria-hidden="true">
              <span className="octocat-watermark-symbol">ἐξ</span>
            </aside>
          </section>
        </section>

        {/* ── Section 8: Floating CTA Card & Comprehensive Footer ── */}
        <section className="notus-cta-section">
          <article className="notus-floating-cta-box">
            <span className="cta-sacred-emblem">ἐξ</span>
            <h3>Unfold the Sacred Depth of Scripture Today</h3>
            <p>
              Download the standalone native Android APK v1.0.4 directly from GitHub
              Releases, or inspect the open-source codebase to contribute to sacred research.
            </p>
            <nav className="cta-actions-group" aria-label="CTA buttons">
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
                className="btn-get-started"
              >
                Download APK — v1.0.4
              </a>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-github-star"
              >
                Help With a Star
              </a>
            </nav>
          </article>

          <footer className="notus-site-footer">
            <section className="footer-top-columns">
              <section className="footer-brand-col">
                <h4>Let&apos;s keep in touch!</h4>
                <h5>Find us on GitHub or connect with our open-source scholarly team.</h5>
                <nav className="footer-icons-row" aria-label="Social platforms">
                  <a
                    href="https://github.com/thulanesigasa/bible_fun_facts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-circle-btn"
                    aria-label="GitHub"
                  >
                    GH
                  </a>
                  <a
                    href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-circle-btn"
                    aria-label="Releases"
                  >
                    REL
                  </a>
                  <a
                    href="mailto:support@exegeomai.app"
                    className="footer-circle-btn"
                    aria-label="Email"
                  >
                    @
                  </a>
                  <Link
                    href="/faq"
                    className="footer-circle-btn"
                    aria-label="FAQ"
                  >
                    FAQ
                  </Link>
                </nav>
              </section>

              <section className="footer-links-columns">
                <nav className="footer-col-nav" aria-label="Useful links">
                  <span>Useful Links</span>
                  <ul>
                    <li><Link href="/features">Core Features</Link></li>
                    <li><Link href="/strongs">Strong&apos;s Lexicon</Link></li>
                    <li><Link href="/security">Security Specs</Link></li>
                    <li><Link href="/faq">Technical FAQ</Link></li>
                  </ul>
                </nav>

                <nav className="footer-col-nav" aria-label="Other resources">
                  <span>Other Resources</span>
                  <ul>
                    <li>
                      <a
                        href="https://github.com/thulanesigasa/bible_fun_facts/blob/main/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MIT License
                      </a>
                    </li>
                    <li><Link href="/terms">Terms &amp; Conditions</Link></li>
                    <li><Link href="/privacy">Privacy Policy</Link></li>
                    <li><Link href="/deletion">Data Deletion</Link></li>
                  </ul>
                </nav>
              </section>
            </section>

            <p className="footer-bottom-bar">
              Copyright &copy; 2026 exégeomai · ἐξηγέομαι · Unfold the Word. Open-source sacred scripture research.
            </p>
          </footer>
        </section>
      </main>
    </>
  );
}
