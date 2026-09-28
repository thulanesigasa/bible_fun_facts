import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── Screenshot 1: Notus Hero Section (Zero Divs) ── */}
        <section className="notus-hero-section">
          <header className="hero-text-wrap">
            <h1>exégeomai - A beautiful sacred engine for biblical exegesis.</h1>
            <p>
              exégeomai is Free and Open Source. It does not change any of the canonical
              Scripture manuscripts. It features multiple original language lexicons and it
              comes with dynamic study components for Greek, Hebrew, and African languages.
            </p>
            <nav className="hero-buttons-row" aria-label="Hero action links">
              <a href="#explore" className="btn-get-started">
                Get started
              </a>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-github-star"
              >
                Github Star
              </a>
            </nav>
          </header>

          <img
            src="/assets/pattern_nextjs.png"
            alt="Hero pattern graphic"
            className="hero-pattern-img"
          />
        </section>

        {/* ── Screenshot 2: Angled Slate Section & 4 Feature Pillars (Zero Divs) ── */}
        <section className="notus-angled-section" id="explore">
          <span className="angled-cut-top" aria-hidden="true" />

          <section className="angled-layout-row">
            {/* Elevated Featured Card (Screenshot 2 Left) */}
            <article className="notus-featured-card">
              <img
                src="/assets/desk.jpg"
                alt="Sacred study workspace"
                className="featured-card-photo"
              />
              <section className="featured-card-content">
                <h4>Great for your sacred study</h4>
                <p>
                  Putting together an exegetical study has never been easier than matching
                  together original Greek and Hebrew lemmas with canonical Scripture. From
                  daily devotionals to deep theological research, you can easily explore and
                  deepen your understanding.
                </p>
              </section>
            </article>

            {/* 2x2 Feature Pillars (Screenshot 2 Right) */}
            <section className="pillars-grid-2x2">
              <article className="pillar-cell">
                <span className="notus-emblem-circle">365</span>
                <h6>365 Devotionals</h6>
                <p>Calendar-synchronized daily readings anchored in history, culture, and theology.</p>
              </article>

              <article className="pillar-cell">
                <span className="notus-emblem-circle">G</span>
                <h6>Strong&apos;s Words</h6>
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

        {/* ── Screenshot 3: CSS Components / Strong's Lexicon with Floating Layered Cards ── */}
        <section className="notus-components-section">
          <section className="components-text-col">
            <span className="notus-emblem-lg">CSS</span>
            <h3>CSS Components</h3>
            <p>
              Every element that you need in a study Bible comes built in as a component.
              All concordance tools and lexicon lemmas fit perfectly with each other and can
              have different translations.
            </p>
            <nav className="notus-pills-row" aria-label="Component tags">
              <span className="notus-pill-tag">Buttons</span>
              <span className="notus-pill-tag">Inputs</span>
              <span className="notus-pill-tag">Labels</span>
              <span className="notus-pill-tag">Menus</span>
              <span className="notus-pill-tag">Navbars</span>
              <span className="notus-pill-tag">Pagination</span>
              <span className="notus-pill-tag">Progressbars</span>
              <span className="notus-pill-tag">Typography</span>
            </nav>
            <Link href="/strongs" className="notus-view-all">
              View All &gt;&gt;
            </Link>
          </section>

          <aside className="layered-components-stage" aria-label="Interactive component previews">
            <img
              src="/assets/component-info-card.png"
              alt=""
              className="floating-layer-img layer-info-card"
            />
            <img
              src="/assets/component-profile-card.png"
              alt=""
              className="floating-layer-img layer-profile-card"
            />
            <img
              src="/assets/component-info-2.png"
              alt=""
              className="floating-layer-img layer-info-2"
            />
            <img
              src="/assets/component-btn-pink.png"
              alt=""
              className="floating-layer-img layer-btn-pink"
            />
            <img
              src="/assets/component-menu.png"
              alt=""
              className="floating-layer-img layer-menu"
            />
          </aside>
        </section>

        {/* ── Screenshot 4: 6 Colored Cards & Translations (Offset Stagger Grid) ── */}
        <section className="notus-colored-cards-section">
          <section className="staggered-cards-col">
            {/* Column 1 (Left) */}
            <section className="cards-subcol-left">
              <article className="framework-card card-red">
                <img
                  src="/assets/svelte.jpg"
                  alt="Svelte"
                  className="framework-card-logo"
                />
                <p>Svelte</p>
              </article>

              <article className="framework-card card-blue">
                <img
                  src="/assets/react.jpg"
                  alt="ReactJS"
                  className="framework-card-logo"
                />
                <p>ReactJS</p>
              </article>

              <article className="framework-card card-dark">
                <img
                  src="/assets/nextjs.jpg"
                  alt="NextJS"
                  className="framework-card-logo"
                />
                <p>NextJS</p>
              </article>
            </section>

            {/* Column 2 (Right - Staggered Offset) */}
            <section className="cards-subcol-right">
              <article className="framework-card card-yellow">
                <img
                  src="/assets/js.png"
                  alt="JavaScript"
                  className="framework-card-logo"
                />
                <p>JavaScript</p>
              </article>

              <article className="framework-card card-crimson">
                <img
                  src="/assets/angular.jpg"
                  alt="Angular"
                  className="framework-card-logo"
                />
                <p>Angular</p>
              </article>

              <article className="framework-card card-green">
                <img
                  src="/assets/vue.jpg"
                  alt="Vue.js"
                  className="framework-card-logo"
                />
                <p>Vue.js</p>
              </article>
            </section>
          </section>

          <section className="components-text-col">
            <span className="notus-emblem-lg">JS</span>
            <h3>Javascript Components</h3>
            <p>
              In order to create a great User Experience some components require JavaScript.
              In this way you can manipulate the elements on the page and give more options
              to your users.
            </p>
            <p style={{ marginTop: '-12px', marginBottom: '24px' }}>
              We created a set of Components that are dynamic and come to help you.
            </p>
            <nav className="notus-pills-row" aria-label="Dynamic components tags">
              <span className="notus-pill-tag">Alerts</span>
              <span className="notus-pill-tag">Dropdowns</span>
              <span className="notus-pill-tag">Menus</span>
              <span className="notus-pill-tag">Modals</span>
              <span className="notus-pill-tag">Navbars</span>
              <span className="notus-pill-tag">Popovers</span>
              <span className="notus-pill-tag">Tabs</span>
              <span className="notus-pill-tag">Tooltips</span>
            </nav>
            <Link href="/features" className="notus-view-all">
              View all &gt;&gt;
            </Link>
          </section>
        </section>

        {/* ── Screenshot 5: Documentation & Rotated Code Card ── */}
        <section className="notus-doc-section">
          <section className="components-text-col">
            <span className="notus-emblem-lg">DOC</span>
            <h3>Complex Documentation</h3>
            <p>
              This extension comes with a lot of fully coded examples that help you get
              started faster. You can adjust the colors and also the programming language.
              You can change the text and images and you&apos;re good to go.
            </p>
            <ul className="doc-checklist" role="list">
              <li className="doc-check-row">
                <span className="doc-check-icon">✓</span>
                <span>Built by Developers for Developers</span>
              </li>
              <li className="doc-check-row">
                <span className="doc-check-icon">✓</span>
                <span>Carefully crafted code for Components</span>
              </li>
              <li className="doc-check-row">
                <span className="doc-check-icon">✓</span>
                <span>Dynamic Javascript Components</span>
              </li>
            </ul>
          </section>

          <aside style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/assets/documentation.png"
              alt="Complex documentation preview"
              className="doc-preview-img"
            />
          </aside>
        </section>

        {/* ── Screenshot 6: Beautiful Example Pages Trio ── */}
        <section className="notus-pages-section">
          <header className="pages-section-header">
            <h2>Beautiful Example Pages</h2>
            <p>
              Notus NextJS is a completely new product built using our past experience in
              web templates. Take the examples we made for you and start playing with them.
            </p>
          </header>

          <section className="pages-cards-trio">
            <Link href="/deletion" className="page-preview-card">
              <h5>Login Page</h5>
              <img
                src="/assets/login.jpg"
                alt="Login page preview"
                className="page-preview-thumbnail"
              />
            </Link>

            <Link href="/features" className="page-preview-card">
              <h5>Profile Page</h5>
              <img
                src="/assets/profile.jpg"
                alt="Profile page preview"
                className="page-preview-thumbnail"
              />
            </Link>

            <Link href="/strongs" className="page-preview-card">
              <h5>Landing Page</h5>
              <img
                src="/assets/landing.jpg"
                alt="Landing page preview"
                className="page-preview-thumbnail"
              />
            </Link>
          </section>
        </section>

        {/* ── Screenshot 7: Open Source Callout ── */}
        <section className="notus-open-source-section">
          <section className="open-source-inner">
            <section className="open-source-text">
              <span className="notus-emblem-circle" style={{ marginBottom: '24px' }}>
                MIT
              </span>
              <h3>Open Source</h3>
              <p>
                Since Tailwind CSS is an open source project we wanted to continue this
                movement too. You can give this version a try to feel the design and also
                test the quality of the code!
              </p>
              <p>Get it free on Github and please help us spread the news with a Star!</p>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-github-star-lg"
              >
                Github Star
              </a>
            </section>

            <aside className="open-source-watermark" aria-hidden="true">
              <span className="octocat-watermark-symbol">GitHub</span>
            </aside>
          </section>
        </section>

        {/* ── Screenshot 8: Floating CTA Box & Footer ── */}
        <section className="notus-cta-section">
          <article className="notus-floating-cta-box">
            <p className="cta-love-symbol">😍</p>
            <h3>Do you love this Starter Kit?</h3>
            <p>
              Cause if you do, it can be yours now. Hit the buttons below to navigate to get
              the Free version for your next project. Build a new web app or give an old
              project a new look!
            </p>
            <nav className="cta-actions-group" aria-label="CTA buttons">
              <a href="#explore" className="btn-get-started">
                Get started
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
                <h5>Find us on any of these platforms, we respond 1-2 business days.</h5>
                <nav className="footer-icons-row" aria-label="Social platforms">
                  <a
                    href="https://github.com/thulanesigasa/bible_fun_facts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-circle-btn"
                    aria-label="Twitter"
                  >
                    TW
                  </a>
                  <a
                    href="https://github.com/thulanesigasa/bible_fun_facts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-circle-btn"
                    aria-label="Facebook"
                  >
                    FB
                  </a>
                  <a
                    href="https://github.com/thulanesigasa/bible_fun_facts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-circle-btn"
                    aria-label="Dribbble"
                  >
                    DR
                  </a>
                  <a
                    href="https://github.com/thulanesigasa/bible_fun_facts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-circle-btn"
                    aria-label="GitHub"
                  >
                    GH
                  </a>
                </nav>
              </section>

              <section className="footer-links-columns">
                <nav className="footer-col-nav" aria-label="Useful links">
                  <span>Useful Links</span>
                  <ul>
                    <li><Link href="/features">About Us</Link></li>
                    <li><Link href="/strongs">Blog</Link></li>
                    <li>
                      <a
                        href="https://github.com/thulanesigasa/bible_fun_facts"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Github
                      </a>
                    </li>
                    <li><Link href="/features">Free Products</Link></li>
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
                    <li><Link href="/deletion">Contact Us</Link></li>
                  </ul>
                </nav>
              </section>
            </section>

            <p className="footer-bottom-bar">
              Copyright &copy; 2026 Notus NextJS by exégeomai.
            </p>
          </footer>
        </section>
      </main>
    </>
  );
}
