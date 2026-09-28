import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'exégeomai Privacy Policy — how we handle your data, what we collect, and your rights under GDPR and CCPA.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <div className="wrap">
          <article className="legal-body">
            <h1>Privacy Policy</h1>
            <span className="legal-meta">Last updated: October 2026 · Effective: October 1, 2026</span>

          <div className="legal-section">
            <h2>1. Overview</h2>
            <p>
              exégeomai (&quot;we&quot;, &quot;our&quot;, &quot;the app&quot;) is a free, open-source Bible study application.
              This Privacy Policy explains what information we collect, why we collect it,
              and how you can control it. We are committed to your privacy and have designed
              the app to operate entirely offline with zero mandatory data collection.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. Information We Do Not Collect</h2>
            <p>By default, exégeomai does <strong>not</strong> collect:</p>
            <ul>
              <li>Your name, email address, or any account credentials</li>
              <li>Your reading history, verse selections, or study habits</li>
              <li>Your journal entries, notes, highlights, or bookmarks</li>
              <li>Device identifiers (IMEI, advertising IDs)</li>
              <li>Location data of any kind</li>
              <li>Biometric data — your fingerprint/Face ID never leaves your hardware</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Information That May Be Collected (Optional Features)</h2>
            <p>
              If you choose to enable optional cloud synchronization via our Supabase backend,
              we may store:
            </p>
            <ul>
              <li>Your email address (used solely as your account identifier)</li>
              <li>Encrypted backups of bookmarks, highlights, and notes</li>
              <li>Anonymous usage statistics (no personal identifiers) if you opt in</li>
            </ul>
            <p>
              Cloud sync is opt-in and can be disabled or deleted at any time via Settings
              or through the <a href="/deletion" style={{ color: 'var(--accent-hover)' }}>Account Deletion portal</a>.
            </p>
          </div>

          <div className="legal-section">
            <h2>4. Crash Reporting</h2>
            <p>
              If you consent to crash reporting, anonymized technical reports (stack traces,
              device OS version, app version) may be sent to our crash monitoring service.
              No personal identifiers, account data, or reading content are included.
              Consent can be withdrawn at any time in Settings → Privacy.
            </p>
          </div>

          <div className="legal-section">
            <h2>5. Security</h2>
            <p>
              All locally stored sensitive data (notes, encrypted text, PIN hash) is protected
              via AES-256-CBC encryption with keys generated in and never exported from the
              Android Keystore or iOS Secure Enclave. PIN values are hashed using PBKDF2 with
              310,000 HMAC-SHA256 iterations. Biometric authentication delegates entirely to
              your device OS — we never receive your biometric data.
            </p>
          </div>

          <div className="legal-section">
            <h2>6. Your Rights (GDPR / CCPA)</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> any data we hold about you</li>
              <li><strong>Rectify</strong> inaccurate personal information</li>
              <li><strong>Erase</strong> all your data (&quot;right to be forgotten&quot;)</li>
              <li><strong>Port</strong> your data to another service</li>
              <li><strong>Object</strong> to processing or withdraw consent at any time</li>
            </ul>
            <p>
              Submit requests via our <a href="/deletion" style={{ color: 'var(--accent-hover)' }}>Account Deletion portal</a> or
              email <a href="mailto:privacy@exegeomai.app" style={{ color: 'var(--accent-hover)' }}>privacy@exegeomai.app</a>.
              We respond within 30 days.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Third-Party Services</h2>
            <p>
              The app may use the following third-party services:
            </p>
            <ul>
              <li><strong>Supabase</strong> — Optional cloud sync. Data processed in the EU (Frankfurt region). See <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-hover)' }}>Supabase Privacy Policy</a>.</li>
              <li><strong>Google Play Services</strong> — For app distribution and optional in-app update checks. No personal data from exégeomai is shared with Google Play.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>8. Children&apos;s Privacy</h2>
            <p>
              exégeomai is not directed at children under 13 (or 16 in the EU). We do not
              knowingly collect information from minors. If you believe a minor has provided
              information, contact us immediately at privacy@exegeomai.app.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this policy to reflect changes to the app or legal requirements.
              Significant changes will be communicated via an in-app notification. Continued
              use after changes constitutes acceptance.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Contact</h2>
            <p>
              For privacy inquiries: <a href="mailto:privacy@exegeomai.app" style={{ color: 'var(--accent-hover)' }}>privacy@exegeomai.app</a>
              <br />
              For general support: <a href="mailto:support@exegeomai.app" style={{ color: 'var(--accent-hover)' }}>support@exegeomai.app</a>
              <br />
              GitHub: <a href="https://github.com/thulanesigasa/bible_fun_facts" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-hover)' }}>thulanesigasa/bible_fun_facts</a>
            </p>
          </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
