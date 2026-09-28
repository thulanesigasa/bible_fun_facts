import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── Screenshot 1: Notus Hero Section (Zero Divs) ── */}
        <section className="notus-hero">
          <header className="hero-lead-col">
            <h1>exégeomai - Sacred Biblical Exegesis &amp; Original Language Concordance.</h1>
            <p>
              exégeomai is Free and Open Source. 365 calendar-synchronized daily
              devotionals, 14,298 Strong&apos;s Greek and Hebrew concordance entries
              with FTS5 substring search, and 32 offline Bible translations.
            </p>
            <nav className="hero-cta-group" aria-label="Hero actions">
              <a href="#explore" className="btn btn-slate">
                Get Started
              </a>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
              >
                GitHub Star
              </a>
            </nav>
          </header>

          <aside className="hero-graphic-col" aria-hidden="true">
            <section className="geometric-art">
              <span className="geo-shape geo-1" />
              <span className="geo-shape geo-2" />
              <span className="geo-shape geo-3" />
              <span className="geo-shape geo-4" />
              <span className="geo-shape geo-5" />
              <span className="geo-shape geo-6" />
              <span className="geo-shape geo-7" />
              <span className="geo-shape geo-8" />
              <span className="geo-shape geo-9" />
            </section>
          </aside>
        </section>

        {/* ── Screenshot 2: Angled Section & 4 Feature Pillars (Zero Divs) ── */}
        <section className="angled-section" id="explore">
          <section className="angled-grid">
            {/* Elevated Featured Card (Left) */}
            <article className="featured-card">
              <header className="featured-card-media">
                <span className="featured-card-badge">Sacred Scripture</span>
                <h3>Great for your sacred study</h3>
                <p>Unfolding the sacred depth of Scripture through original languages</p>
              </header>
              <section className="featured-card-body">
                <blockquote>Unfold the Word in its original depth</blockquote>
                <p>
                  Putting together an exegetical study has never been easier than
                  connecting Greek and Hebrew roots directly with canonical Scripture.
                  From daily devotionals to deep linguistic analysis, you can easily
                  explore and deepen your understanding.
                </p>
              </section>
            </article>

            {/* 2x2 Feature Pillars (Right) */}
            <section className="pillar-2x2">
              <article className="pillar-unit">
                <span className="circular-emblem">365</span>
                <h4>Devotionals</h4>
                <p>Calendar-synchronized daily readings anchored in history, culture, and theology.</p>
              </article>

              <article className="pillar-unit">
                <span className="circular-emblem">FTS</span>
                <h4>Strong&apos;s Words</h4>
                <p>14,298 Greek &amp; Hebrew words with millisecond FTS5 SQLite substring lookup.</p>
              </article>

              <article className="pillar-unit">
                <span className="circular-emblem">32</span>
                <h4>Translations</h4>
                <p>Complete Bible versions embedded offline, including South African and Zimbabwean canons.</p>
              </article>

              <article className="pillar-unit">
                <span className="circular-emblem">256</span>
                <h4>Keystore Security</h4>
                <p>AES-256-CBC hardware encryption via Android Keystore &amp; iOS Secure Enclave.</p>
              </article>
            </section>
          </section>
        </section>

        {/* ── Screenshot 3: Strong's Lexical Components & Floating Layered Cards ── */}
        <section className="showcase-split-section">
          <section className="showcase-info-col">
            <span className="circular-emblem">G</span>
            <h3>Strong&apos;s Lexical Components</h3>
            <p>
              Every element you need in biblical scholarship comes indexed as a canonical
              component. All Greek and Hebrew lemmas link seamlessly with verse occurrences
              and unabridged semantic definitions.
            </p>
            <nav className="tags-row" aria-label="Concordance tags">
              <span className="tag-label">G1834</span>
              <span className="tag-label">G26</span>
              <span className="tag-label">H7225</span>
              <span className="tag-label">GREEK NT</span>
              <span className="tag-label">HEBREW OT</span>
              <span className="tag-label">LEMMA</span>
              <span className="tag-label">TRANSLITERATION</span>
              <span className="tag-label">FTS5</span>
            </nav>
            <Link href="/strongs" className="view-all-link">
              View All Lexicon &gt;&gt;
            </Link>
          </section>

          <aside className="floating-cards-stage">
            <article className="floating-card card-layer-1">
              <header>
                <span className="card-code">G1834 · GREEK NT</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>6x</span>
              </header>
              <h4 className="card-greek">ἐξηγέομαι</h4>
              <p className="card-translit">exēgeomai</p>
              <p className="card-def">To lead out, unfold, declare, and interpret divine mysteries.</p>
            </article>

            <article className="floating-card card-layer-2">
              <header>
                <span className="card-code" style={{ color: 'var(--accent)' }}>G26 · DIVINE LOVE</span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>116x</span>
              </header>
              <h4 className="card-greek">ἀγάπη</h4>
              <p className="card-translit" style={{ color: '#CBD5E1' }}>agapē</p>
              <p className="card-def">Self-sacrificial, unconditional divine love originating in God.</p>
            </article>

            <article className="floating-card card-layer-3">
              <header>
                <span className="card-code">H7225 · HEBREW OT</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>51x</span>
              </header>
              <h4 className="card-greek">רֵאשִׁית</h4>
              <p className="card-translit">rēʾšît</p>
              <p className="card-def">Beginning, firstfruits, origin. The opening word of Genesis 1:1.</p>
            </article>
          </aside>
        </section>

        {/* ── Screenshot 4: 6 Colored Cards & Offline Translations ── */}
        <section className="translations-section">
          <section className="six-cards-grid">
            <article className="colored-framework-card color-card-1">
              <span className="card-emblem-circle">KJV</span>
              <strong>King James</strong>
              <span>1611 Public Domain</span>
            </article>

            <article className="colored-framework-card color-card-2">
              <span className="card-emblem-circle">ESV</span>
              <strong>English Standard</strong>
              <span>Scholarly Cross-References</span>
            </article>

            <article className="colored-framework-card color-card-3">
              <span className="card-emblem-circle">WEB</span>
              <strong>World English</strong>
              <span>Modern Public Domain</span>
            </article>

            <article className="colored-framework-card color-card-4">
              <span className="card-emblem-circle">MSG</span>
              <strong>The Message</strong>
              <span>Contemporary Reading</span>
            </article>

            <article className="colored-framework-card color-card-5">
              <span className="card-emblem-circle">ZUL</span>
              <strong>isiZulu</strong>
              <span>1893/1959 Sacred Canon</span>
            </article>

            <article className="colored-framework-card color-card-6">
              <span className="card-emblem-circle">SNA</span>
              <strong>ChiShona</strong>
              <span>Bhaibheri Dzvene</span>
            </article>
          </section>

          <section className="showcase-info-col">
            <span className="circular-emblem">B</span>
            <h3>32 Offline Bible Translations</h3>
            <p>
              In order to provide accessible study across Africa and worldwide, all 32
              translations are embedded locally within the application bundle. You can switch
              translations with a single tap without any internet connectivity.
            </p>
            <nav className="tags-row" aria-label="Language tags">
              <span className="tag-label">ENGLISH</span>
              <span className="tag-label">ISIZULU</span>
              <span className="tag-label">ISIXHOSA</span>
              <span className="tag-label">SEPEDI</span>
              <span className="tag-label">SESOTHO</span>
              <span className="tag-label">SETSWANA</span>
              <span className="tag-label">CHISHONA</span>
            </nav>
            <Link href="/features" className="view-all-link">
              View All Translations &gt;&gt;
            </Link>
          </section>
        </section>

        {/* ── Screenshot 5: Complex Documentation & Code Card ── */}
        <section className="doc-section">
          <section className="showcase-info-col">
            <span className="circular-emblem">D</span>
            <h3>Cryptographic Architecture</h3>
            <p>
              exégeomai comes with banking-grade security specifications and open-source
              documentation that help you study with complete peace of mind. Hardware isolation
              ensures your personal notes and reading milestones never leave your device.
            </p>
            <ul className="doc-checklist" role="list">
              <li className="doc-check-item">Built by Scholars for Disciples</li>
              <li className="doc-check-item">Hardware Keystore AES-256-CBC Encryption</li>
              <li className="doc-check-item">310,000 PBKDF2 HMAC-SHA256 Iterations</li>
              <li className="doc-check-item">FLAG_SECURE App Switcher Privacy Shield</li>
            </ul>
          </section>

          <aside className="code-card-wrap">
            <article className="code-card">
              <header className="code-card-topbar">
                <span className="code-card-title">SQLite FTS5 &amp; Keystore Schema</span>
                <span className="code-card-dots">
                  <span className="code-dot dot-red" />
                  <span className="code-dot dot-yellow" />
                  <span className="code-dot dot-green" />
                </span>
              </header>
              <pre>
                <code>{`-- 14,298 Strong's FTS5 Full-Text Index
CREATE VIRTUAL TABLE strongs_fts USING fts5(
  strongs_id,
  lemma,
  transliteration,
  definition,
  prefix='2 3 4'
);

-- Hardware Keystore Derivation
const key = await SecureStore.getItemAsync('master_key');
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);`}</code>
              </pre>
            </article>
          </aside>
        </section>

        {/* ── Screenshot 6: Beautiful Example Pages Trio ── */}
        <section className="pages-showcase-section">
          <header className="pages-header">
            <h2>Beautiful Dedicated Pages</h2>
            <p>
              exégeomai provides dedicated, comprehensive subpages for every major
              feature, lexical tool, and security specification. Take the examples we
              made for you and explore them directly.
            </p>
          </header>

          <section className="trio-grid">
            <Link href="/features" className="trio-card">
              <h5>Core Features Page</h5>
              <section className="trio-card-preview">
                <header className="preview-bar">
                  <span className="preview-dot" />
                  <span className="preview-dot" />
                  <span className="preview-dot" />
                </header>
                <article className="preview-content">
                  <strong>365 Exegetical Devotionals</strong>
                  <p>Daily readings anchored in ancient history, customs, and theology.</p>
                  <strong>32 Offline Translations</strong>
                  <p>English, African indigenous languages, and canonical texts.</p>
                </article>
              </section>
            </Link>

            <Link href="/strongs" className="trio-card">
              <h5>Strong&apos;s Lexicon Page</h5>
              <section className="trio-card-preview">
                <header className="preview-bar">
                  <span className="preview-dot" />
                  <span className="preview-dot" />
                  <span className="preview-dot" />
                </header>
                <article className="preview-content">
                  <strong>Interactive Lexicon Engine</strong>
                  <p>Filter live across 14,298 Greek &amp; Hebrew concordance words.</p>
                  <strong>Instant FTS5 Substring Search</strong>
                  <p>Roots, transliterations, and biblical occurrence counts.</p>
                </article>
              </section>
            </Link>

            <Link href="/security" className="trio-card">
              <h5>Security &amp; Privacy Page</h5>
              <section className="trio-card-preview">
                <header className="preview-bar">
                  <span className="preview-dot" />
                  <span className="preview-dot" />
                  <span className="preview-dot" />
                </header>
                <article className="preview-content">
                  <strong>Hardware Keystore Protection</strong>
                  <p>AES-256-CBC encryption and PBKDF2 PIN hashing.</p>
                  <strong>GDPR Article 17 Erasure</strong>
                  <p>Self-service verified permanent personal data purge.</p>
                </article>
              </section>
            </Link>
          </section>
        </section>

        {/* ── Screenshot 7: Open Source Watermark Section ── */}
        <section className="open-source-section">
          <section className="open-source-grid">
            <section className="open-source-info">
              <span className="circular-emblem" style={{ background: '#FFFFFF', color: '#0F172A' }}>
                MIT
              </span>
              <h3>Open Source</h3>
              <p>
                Because God&apos;s Word is freely given, exégeomai is completely open-source
                under the permissive MIT license. You can inspect the code to feel the quality
                and verify our zero-telemetry architecture!
              </p>
              <p>Get it free on GitHub and please help us spread the Word with a Star!</p>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              >
                GitHub Star
              </a>
            </section>

            <aside className="watermark-graphic" aria-hidden="true">
              <span className="watermark-symbol">ἐξ</span>
            </aside>
          </section>
        </section>

        {/* ── Screenshot 8: Floating CTA Box & Footer ── */}
        <section className="cta-stage">
          <article className="floating-cta-box">
            <span className="cta-emblem-top">ἐξ</span>
            <h3>Ready to Deepen Your Study of Scripture?</h3>
            <p>
              Download the standalone native Android APK v1.0.4 directly from GitHub
              Releases, or inspect the open-source codebase to contribute.
            </p>
            <nav className="cta-btns" aria-label="Call to action buttons">
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
                className="btn btn-accent"
              >
                Download APK — v1.0.4
              </a>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
              >
                Help With a Star
              </a>
            </nav>
          </article>

          <footer className="notus-footer">
            <section className="footer-top-split">
              <section className="footer-touch-col">
                <h4>Let&apos;s keep in touch!</h4>
                <p>Find us on GitHub or reach out to our open-source team.</p>
                <nav className="footer-social-links" aria-label="Social links">
                  <a
                    href="https://github.com/thulanesigasa/bible_fun_facts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-circle-link"
                    aria-label="GitHub"
                  >
                    GH
                  </a>
                  <a
                    href="mailto:support@exegeomai.app"
                    className="social-circle-link"
                    aria-label="Email support"
                  >
                    @
                  </a>
                  <Link href="/faq" className="social-circle-link" aria-label="FAQ">
                    FAQ
                  </Link>
                </nav>
              </section>

              <section className="footer-links-grid">
                <nav className="footer-links-col" aria-label="Useful links">
                  <h5>Useful Links</h5>
                  <ul>
                    <li><Link href="/features">Core Features</Link></li>
                    <li><Link href="/strongs">Strong&apos;s Lexicon</Link></li>
                    <li><Link href="/security">Security Specs</Link></li>
                    <li><Link href="/faq">Technical FAQ</Link></li>
                  </ul>
                </nav>

                <nav className="footer-links-col" aria-label="Other resources">
                  <h5>Other Resources</h5>
                  <ul>
                    <li><Link href="/privacy">Privacy Policy</Link></li>
                    <li><Link href="/terms">Terms &amp; Conditions</Link></li>
                    <li><Link href="/deletion">Data Deletion</Link></li>
                    <li>
                      <a
                        href="https://github.com/thulanesigasa/bible_fun_facts/blob/main/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MIT License
                      </a>
                    </li>
                  </ul>
                </nav>
              </section>
            </section>

            <p className="footer-copyright">
              Copyright &copy; 2026 exégeomai. Scripture resources in the public domain.
            </p>
          </footer>
        </section>
      </main>
    </>
  );
}
