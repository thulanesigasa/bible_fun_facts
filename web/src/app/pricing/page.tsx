import Link from 'next/link';
import { Footer } from '@/components/Footer';


export default function PricingPage() {
  return (
    <>
      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Software Freedom</span>
            <h1>Pricing and Availability</h1>
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
                <span className="pricing-badge">Coming Soon</span>
                <div className="pricing-header">
                  <h2>exégeomai Standalone</h2>
                  <p>Unrestricted access for individual believers, scholars, and pastors.</p>
                </div>
                <div className="pricing-price">
                  <span className="pricing-amount">$0</span>
                  <span className="pricing-period">/ current planned access</span>
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
                    <span>Translation resources vary by release</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Local security and privacy choices</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>No integrated advertising network</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0F172A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Supported offline resources</span>
                  </li>
                </ul>
                <a href="/#waitlist" className="btn-primary" style={{ justifyContent: 'center' }}>
                  <span>Join Waiting List</span>
                </a>
              </div>

              {/* Open Source Contributor */}
              <div className="pricing-card">
                <div className="pricing-header">
                  <h2>Open Source Contributor</h2>
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
                <Link
                  href="/contact"
                  className="btn-outline"
                  style={{ justifyContent: 'center', borderColor: 'var(--border-strong)', color: 'var(--ink)' }}
                >
                  <span>Connect With Our Team</span>
                </Link>
              </div>
            </div>

            <div className="prose-card">
              <h2>Our approach to access</h2>
              <p>Our aim is to make thoughtful Scripture study accessible. This site announces the upcoming launch; the official release will describe available features and access arrangements.</p>
              <p>Account processing, cloud study features, maps, and configured diagnostics are described in our <Link href="/privacy">Privacy Policy</Link>. Content and source-code rights depend on the licence actually published for each resource.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
