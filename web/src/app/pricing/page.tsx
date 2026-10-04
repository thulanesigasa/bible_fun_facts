import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing — 100% Free & Open Source',
  description:
    'exégeomai is 100% Free and Open Source under the MIT License. Zero paywalls, zero subscriptions, zero ads.',
};

export default function PricingPage() {
  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Software Freedom</span>
            <h1>100% Free &amp; Open Source</h1>
            <p>
              The Word of God is sacred and must never be trapped behind commercial subscriptions,
              paywalled study notes, or targeted advertising trackers.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="pricing-grid" style={{ marginBottom: 64 }}>
              {/* Standalone Community Tier */}
              <div className="pricing-card featured">
                <span className="pricing-badge">Free Forever · MIT License</span>
                <div className="pricing-header">
                  <h3>exégeomai Standalone</h3>
                  <p>Unrestricted access for individual believers, scholars, and pastors.</p>
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
                    <span>Zero Ads, Zero Trackers, Zero Data Harvesting</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Full Offline SQLite Database Included</span>
                  </li>
                </ul>
                <a href="/#download" className="btn-primary" style={{ justifyContent: 'center' }}>
                  <span>Download APK (Free)</span>
                </a>
              </div>

              {/* Open Source Contributor */}
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3>Open Source Contributor</h3>
                  <p>For biblical linguists, developers, and theological editors.</p>
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
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Peer-Reviewed Lexical Corrections</span>
                  </li>
                </ul>
                <a
                  href="https://github.com/thulanesigasa/bible_fun_facts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ justifyContent: 'center', borderColor: 'var(--border-strong)', color: 'var(--ink)' }}
                >
                  <span>Contribute on GitHub</span>
                </a>
              </div>
            </div>

            <div className="prose-card">
              <h2>Why We Will Never Charge for exégeomai</h2>
              <p>
                Commercial Bible applications often start free and slowly introduce paywalls: charging for
                commentaries, Strong&apos;s concordances, or advanced search tools. Worse, many commercial apps
                embed third-party marketing SDKs that harvest your reading time, bookmarked verses, and location data.
              </p>
              <p>
                We reject this model entirely. <strong>Matthew 10:8</strong> records the Lord&apos;s command:
                <em> &quot;Freely you have received; freely give.&quot;</em>
              </p>
              <p>
                Every feature, from the complete 14,298 Strong&apos;s lexicon entries to all 32 offline canons,
                is and will always remain completely free and open-source under the MIT license.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
