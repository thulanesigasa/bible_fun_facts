import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — exégeomai',
  description:
    'exégeomai privacy policy — offline-first architecture, hardware-backed encryption, zero analytics, and GDPR/POPIA data rights.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Legal &amp; Privacy</span>
            <h1>Privacy Policy</h1>
            <p>Last updated: October 2026 · Effective: October 1, 2026</p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="prose-card">
              <h2>1. Overview</h2>
              <p>
                exégeomai (&quot;we&quot;, &quot;our&quot;, &quot;the app&quot;) is a free, open-source Bible study application.
                This Privacy Policy explains what information we collect, why we collect it, and how you can control it.
                We have designed the app to operate entirely offline with zero mandatory data collection.
              </p>

              <h2>2. Information We Do Not Collect</h2>
              <p>By default, exégeomai does <strong>not</strong> collect:</p>
              <ul>
                <li>Your name, email address, or any account credentials</li>
                <li>Your reading history, verse selections, or study habits</li>
                <li>Your journal entries, reflections, highlights, or bookmarks</li>
                <li>Device identifiers (IMEI, Google Advertising ID)</li>
                <li>Location data of any kind (church distance calculations execute locally)</li>
                <li>Biometric data — your fingerprint or Face ID is handled strictly by the device OS Keystore</li>
              </ul>

              <h2>3. On-Device Storage &amp; Cryptography</h2>
              <p>
                All personal data (such as notes, reading streak history, and bookmarks) is stored exclusively
                in an embedded SQLite database on your device. When PIN or biometric security is enabled, records
                are encrypted at rest using AES-256 GCM backed by the Android Hardware Keystore.
              </p>

              <h2>4. Third-Party Services &amp; Network Requests</h2>
              <p>
                The core app makes zero outbound network requests during typical Bible reading or lexicon exploration.
                We embed no third-party tracking libraries, analytics frameworks, or advertising SDKs.
              </p>

              <h2>5. Your Rights (GDPR &amp; POPIA Compliance)</h2>
              <p>
                Under the European General Data Protection Regulation (GDPR) and the South African Protection
                of Personal Information Act (POPIA), you have full sovereignty over your data:
              </p>
              <ul>
                <li><strong>Right to Erasure:</strong> You can delete all data at any time via the in-app Nuclear Wipe or our <Link href="/deletion" style={{ color: 'var(--ink)', fontWeight: 700, textDecoration: 'underline' }}>Account Deletion portal</Link>.</li>
                <li><strong>Right to Access:</strong> Because all records are stored locally in SQLite, your data is always directly accessible on your physical device.</li>
              </ul>

              <h2>6. Contact Us</h2>
              <p>
                If you have questions about our privacy practices, please contact us at{' '}
                <a href="mailto:privacy@exegeomai.app" style={{ color: 'var(--ink)', fontWeight: 700 }}>
                  privacy@exegeomai.app
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
