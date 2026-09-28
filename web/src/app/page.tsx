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
            {/* Elevated Featured Card (Left) */}
            <article className="notus-featured-card">
              <img
                src="/assets/desk.jpg"
                alt="Sacred study workspace with Holy Scripture"
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

        {/* ── Section 3: Exegetical Study Tools with Floating Layered Cards (Zero Divs) ── */}
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

          <aside className="layered-components-stage" aria-label="Interactive component previews">
            <img
              src="/assets/component-info-card.png"
              alt="Lexical summary preview"
              className="floating-layer-img layer-info-card"
            />
            <img
              src="/assets/component-profile-card.png"
              alt="Strong's Greek lemma preview"
              className="floating-layer-img layer-profile-card"
            />
            <img
              src="/assets/component-info-2.png"
              alt="Devotional reading preview"
              className="floating-layer-img layer-info-2"
            />
            <img
              src="/assets/component-btn-pink.png"
              alt="Lemma action pill"
              className="floating-layer-img layer-btn-pink"
            />
            <img
              src="/assets/component-menu.png"
              alt="Translation selector preview"
              className="floating-layer-img layer-menu"
            />
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

        {/* ── Section 5: Scholarly Technical Architecture with 3D Card ── */}
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

          <aside style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/assets/documentation.png"
              alt="Scholarly technical architecture preview"
              className="doc-preview-img"
            />
          </aside>
        </section>

        {/* ── Section 6: Dedicated Study Portals (Example Pages Layout) ── */}
        <section className="notus-pages-section">
          <header className="pages-section-header">
            <h2>Dedicated Study Portals</h2>
            <p>
              Each domain in exégeomai is structured into a dedicated, focused web portal
              engineered with pure semantic HTML5 for rapid access and zero clutter.
            </p>
          </header>

          <section className="pages-cards-trio">
            <Link href="/features" className="page-preview-card">
              <h5>Core Features Portal</h5>
              <img
                src="/assets/login.jpg"
                alt="Core Features portal preview"
                className="page-preview-thumbnail"
              />
            </Link>

            <Link href="/strongs" className="page-preview-card">
              <h5>Strong&apos;s Lexicon Engine</h5>
              <img
                src="/assets/profile.jpg"
                alt="Strong's Lexicon engine preview"
                className="page-preview-thumbnail"
              />
            </Link>

            <Link href="/security" className="page-preview-card">
              <h5>Security &amp; Privacy Vault</h5>
              <img
                src="/assets/landing.jpg"
                alt="Security & Privacy vault preview"
                className="page-preview-thumbnail"
              />
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
