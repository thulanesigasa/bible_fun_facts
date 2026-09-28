import React from 'react';
import Link from 'next/link';
import { DownloadSvg, GithubSvg } from './SvgIcons';

export function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title">
          Unfold the Sacred Depth of <span>Scripture</span>
        </h1>

        <p className="hero-subtitle">
          Named after Strong&apos;s Greek 1834 (<em>ἐξηγέομαι</em> — to lead out, declare, and interpret).
          Explore 365 calendar-synchronized daily devotionals through historical, cultural, and
          theological lenses, alongside 14,298 Strong&apos;s concordance entries and 32 offline Bible translations.
        </p>

        <div className="hero-ctas">
          <a
            href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
            className="btn btn-accent btn-lg"
            id="heroDownloadBtn"
          >
            <DownloadSvg size={18} />
            <span>Download APK (v1.0.4)</span>
          </a>
          <a
            href="https://github.com/thulanesigasa/bible_fun_facts"
            className="btn btn-outline btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            id="heroGithubBtn"
          >
            <GithubSvg size={18} />
            <span>GitHub Repository</span>
          </a>
        </div>

        <div className="meta-stats">
          <div className="stat-item">
            <span className="stat-num">14,298</span>
            <span className="stat-label">Strong&apos;s Entries</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">365</span>
            <span className="stat-label">Exegetical Devotionals</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">32</span>
            <span className="stat-label">Offline Translations</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">AES-256</span>
            <span className="stat-label">Hardware Keystore</span>
          </div>
        </div>

        <div className="hero-page-links">
          <Link href="/features" className="page-link-card">
            <span className="page-link-title">Core Features</span>
            <span className="page-link-desc">Devotionals, lexicon, translations, privacy</span>
          </Link>
          <Link href="/strongs" className="page-link-card">
            <span className="page-link-title">Strong&apos;s Lexicon</span>
            <span className="page-link-desc">14,298 Greek &amp; Hebrew entries, FTS5 search</span>
          </Link>
          <Link href="/security" className="page-link-card">
            <span className="page-link-title">Security &amp; Privacy</span>
            <span className="page-link-desc">AES-256, PBKDF2, hardware keystore</span>
          </Link>
          <Link href="/faq" className="page-link-card">
            <span className="page-link-title">FAQ</span>
            <span className="page-link-desc">Common questions about the app</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
