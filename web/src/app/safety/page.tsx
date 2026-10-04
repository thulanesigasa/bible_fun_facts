import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Safety & Trust — Cryptographic Architecture',
  description:
    'Discover how exégeomai protects your spiritual privacy with hardware Keystore AES-256 encryption, FLAG_SECURE, and zero cloud telemetry.',
};

export default function SafetyPage() {
  const securityPillars = [
    {
      title: 'Android Hardware Keystore (AES-256-GCM)',
      desc: 'All personal journal notes, bookmarks, and highlight collections are encrypted on-device. Encryption keys are generated inside the device’s hardware-isolated Secure Element or Trusted Execution Environment (TEE).',
      badge: 'CRYPTOGRAPHIC STANDARD',
    },
    {
      title: 'FLAG_SECURE Screen Capture Shield',
      desc: 'The application sets the operating system FLAG_SECURE window property. This prevents malicious background apps, malware, or the OS app switcher from taking screenshots of your private notes.',
      badge: 'OS LEVEL DEFENSE',
    },
    {
      title: 'Zero-Cloud Telemetry & Analytics',
      desc: 'No Facebook Pixel. No Google Analytics. No Mixpanel. No Firebase tracking. exégeomai makes zero background network calls when you read Scripture or open Strong’s entries.',
      badge: 'COMPLETE PRIVACY',
    },
    {
      title: 'Nuclear One-Tap Data Wipe',
      desc: 'If you ever need to clear your study records or decommission your device, a single tap triggers a cryptographic deletion that zeroes all local database keys and cached storage.',
      badge: 'USER AUTONOMY',
    },
    {
      title: 'Biometric & Master PIN Lock',
      desc: 'Protect physical access to your exégeomai study vault with fingerprint, Face ID, or a high-entropy 4-digit PIN hashed with PBKDF2 with 100,000 iterations.',
      badge: 'PHYSICAL ACCESS',
    },
    {
      title: '100% Embedded SQLite Vault',
      desc: 'All 32 canonical translations and 14,298 Strong’s definitions reside in local read-only tables. Zero remote queries are made to third-party CDNs or cloud servers.',
      badge: 'LOCAL INTEGRITY',
    },
  ];

  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Safety &amp; Trust</span>
            <h1>Cryptographic Privacy Architecture</h1>
            <p>
              Your spiritual reflections, prayer requests, and biblical notes are sacred.
              We build with military-grade local hardware encryption and zero cloud exposure.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="cards-grid" style={{ marginBottom: 64 }}>
              {securityPillars.map((p, idx) => (
                <div key={idx} className="feature-card">
                  <span className="pm-badge" style={{ alignSelf: 'flex-start' }}>{p.badge}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="prose-card">
              <h2>Our Trust Guarantees</h2>
              <p>
                Unlike mainstream tech platforms that treat users as behavioral data points to be monetized,
                exégeomai operates under strict covenant stewardship:
              </p>
              <ul>
                <li><strong>No Advertising:</strong> We do not run banners, popups, or programmatic ad auctions.</li>
                <li><strong>No User Profiling:</strong> We have no interest in your search queries, location history, or study times.</li>
                <li><strong>Auditable Source Code:</strong> Every cryptographic function and SQLite query is public and verifiable on GitHub.</li>
                <li><strong>Google Play Data Safety Compliance:</strong> Declared officially as collecting 0 bytes of personal or device data.</li>
              </ul>

              <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href="/privacy" className="btn-primary">
                  <span>Read Privacy Policy</span>
                </Link>
                <Link href="/data-safety" className="btn-outline" style={{ borderColor: 'var(--border-strong)', color: 'var(--ink)' }}>
                  <span>Data Safety Declarations</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
