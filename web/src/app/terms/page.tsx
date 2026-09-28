import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'exégeomai Terms of Service — usage conditions, intellectual property, disclaimers, and governing law.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="legal-main">
        <article className="legal-body">
          <h1>Terms of Service</h1>
          <span className="legal-meta">
            Last updated: October 2026 · Effective: October 1, 2026
          </span>

          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using exégeomai (the &quot;Application&quot;)
              or visiting this website, you agree to be bound by these Terms of Service.
              If you do not agree, please uninstall the application and discontinue use.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. License</h2>
            <p>
              exégeomai is released under the MIT License. You are free to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies of the
              software, subject to the conditions of the MIT License included with the
              source code.
            </p>
            <p>
              All biblical text content is sourced from translations in the public domain
              or licensed under Creative Commons. See in-app attribution for per-translation
              details.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the application to infringe upon any intellectual property rights</li>
              <li>Attempt to reverse-engineer or extract proprietary components</li>
              <li>Use the application for any unlawful purpose</li>
              <li>Distribute modified versions without complying with the MIT License terms</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Bible Content &amp; Copyright</h2>
            <p>
              The application includes Bible translations in the public domain (KJV, ASV,
              WEB, and others) and translations distributed under open licenses.
              Translations that carry commercial restrictions are not included. Strong&apos;s
              Concordance (1890) is fully in the public domain.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              THE APPLICATION IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED. THE DEVELOPER DOES NOT WARRANT THAT THE APPLICATION WILL BE
              ERROR-FREE, UNINTERRUPTED, OR THAT ALL DEFECTS WILL BE CORRECTED. USE IS AT
              YOUR OWN RISK.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, the developers of exégeomai shall not
              be liable for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of the application or this website.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Data &amp; Privacy</h2>
            <p>
              Your use of the application is also governed by our{' '}
              <a href="/privacy" style={{ color: 'var(--accent-hover)' }}>
                Privacy Policy
              </a>
              , which is incorporated by reference into these Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of South Africa, without regard
              to its conflict of law provisions. Any disputes shall be resolved in the
              courts of South Africa.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Material changes
              will be communicated via an in-app notification. Continued use of the
              application after changes become effective constitutes acceptance of the
              revised Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Contact</h2>
            <p>
              For legal inquiries: <a href="mailto:legal@exegeomai.app" style={{ color: 'var(--accent-hover)' }}>legal@exegeomai.app</a>
              <br />
              GitHub Issues: <a href="https://github.com/thulanesigasa/bible_fun_facts/issues" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-hover)' }}>github.com/thulanesigasa/bible_fun_facts/issues</a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
