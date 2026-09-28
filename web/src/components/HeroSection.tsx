import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="hero">
      {/* ── Left column: editorial headline, lead, action buttons, stat-bar ── */}
      <header className="hero-content">
        <span className="hero-eyebrow">ἐξηγέομαι · Strong&apos;s Greek G1834</span>
        <h1>
          Unfold the Sacred<br />
          Depth of <em>Scripture</em>
        </h1>
        <p className="hero-lead">
          365 calendar-synchronized exegetical devotionals. 14,298 Strong&apos;s
          concordance entries with FTS5 search. 32 offline Bible translations.
          All secured by hardware-backed AES-256 encryption.
        </p>

        <nav className="hero-actions" aria-label="Action links">
          <a
            href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
            className="btn btn-accent"
            id="heroDownloadBtn"
          >
            Download APK — v1.0.4
          </a>
          <a
            href="https://github.com/thulanesigasa/bible_fun_facts"
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
            id="heroGithubBtn"
          >
            View on GitHub
          </a>
        </nav>

        <dl className="stat-bar">
          <dt>14,298</dt>
          <dd>Strong&apos;s Entries</dd>
          <dt>365</dt>
          <dd>Devotionals</dd>
          <dt>32</dt>
          <dd>Translations</dd>
          <dt>AES-256</dt>
          <dd>Hardware Keystore</dd>
        </dl>
      </header>

      {/* ── Right column: direct semantic navigation into dedicated pages ── */}
      <nav className="hero-nav" aria-label="Dedicated app pages">
        <span className="hero-nav-title">Dedicated App Sections</span>
        <Link href="/features" className="hero-nav-item">
          <strong>Core Features</strong>
          <span>365 exegetical devotionals, 32 offline translations, daily verse engine</span>
        </Link>
        <Link href="/strongs" className="hero-nav-item">
          <strong>Strong&apos;s Lexicon</strong>
          <span>14,298 Greek &amp; Hebrew concordance entries with instant FTS5 offline search</span>
        </Link>
        <Link href="/security" className="hero-nav-item">
          <strong>Security &amp; Privacy</strong>
          <span>AES-256-CBC, PBKDF2 hashing, hardware keystore, zero cloud telemetry</span>
        </Link>
        <Link href="/faq" className="hero-nav-item">
          <strong>Technical FAQ</strong>
          <span>Offline guarantees, privacy model, data deletion, and architecture</span>
        </Link>
        <Link href="/deletion" className="hero-nav-item">
          <strong>Account Deletion</strong>
          <span>GDPR Article 17 compliant permanent personal data purge portal</span>
        </Link>
      </nav>
    </section>
  );
}
