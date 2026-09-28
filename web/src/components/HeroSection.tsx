import React from 'react';
import Link from 'next/link';
import { DownloadSvg, GithubSvg } from './SvgIcons';

export function HeroSection() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-inner">
          {/* ── Left column — headline + CTAs + stats ── */}
          <div>
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

            <div className="hero-actions">
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts/releases/latest"
                className="btn btn-accent"
                id="heroDownloadBtn"
              >
                <DownloadSvg size={16} />
                Download APK — v1.0.4
              </a>
              <a
                href="https://github.com/thulanesigasa/bible_fun_facts"
                className="btn btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
                id="heroGithubBtn"
              >
                <GithubSvg size={16} />
                View on GitHub
              </a>
            </div>

            <dl className="stat-bar">
              <div>
                <dt>14,298</dt>
                <dd>Strong&apos;s Entries</dd>
              </div>
              <div>
                <dt>365</dt>
                <dd>Devotionals</dd>
              </div>
              <div>
                <dt>32</dt>
                <dd>Translations</dd>
              </div>
              <div>
                <dt>AES-256</dt>
                <dd>Encryption</dd>
              </div>
            </dl>
          </div>

          {/* ── Right column — page navigation links ── */}
          <nav className="hero-nav" aria-label="App sections">
            <Link href="/features" className="hero-nav-item">
              <strong>Core Features</strong>
              <span>Devotionals, lexicon, translations, biometric security</span>
            </Link>
            <Link href="/strongs" className="hero-nav-item">
              <strong>Strong&apos;s Lexicon</strong>
              <span>14,298 Greek &amp; Hebrew entries, instant FTS5 search</span>
            </Link>
            <Link href="/security" className="hero-nav-item">
              <strong>Security &amp; Privacy</strong>
              <span>AES-256-CBC, PBKDF2, hardware keystore, zero cloud</span>
            </Link>
            <Link href="/faq" className="hero-nav-item">
              <strong>FAQ</strong>
              <span>Offline use, data deletion, platform support</span>
            </Link>
            <Link href="/deletion" className="hero-nav-item">
              <strong>Account Deletion</strong>
              <span>GDPR-compliant data purge portal</span>
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
