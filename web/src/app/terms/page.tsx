import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — exégeomai',
  description:
    'Terms of service and software license agreement for the exégeomai open-source Bible study application.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Terms of Agreement</span>
            <h1>Terms of Service</h1>
            <p>Last updated: October 2026 · Effective: October 1, 2026</p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="prose-card">
              <h2>1. Agreement to Terms</h2>
              <p>
                By downloading, installing, or using the exégeomai mobile application or website,
                you agree to be bound by these Terms of Service. If you do not agree, do not use the application.
              </p>

              <h2>2. Open Source License (MIT)</h2>
              <p>
                The source code of exégeomai is licensed under the permissive <strong>MIT License</strong>.
                You are free to inspect, fork, modify, compile, and distribute the code, provided that the original
                copyright notice and permission notice are included in all copies or substantial portions of the software.
              </p>

              <h2>3. Public Domain Biblical Texts</h2>
              <p>
                The Scripture texts, Strong&apos;s Greek and Hebrew lexicons, and historical concordances packaged
                within exégeomai are in the public domain or distributed under open permissive licenses.
                All rights to translations belong to their respective historical publishers or public heritage trusts.
              </p>

              <h2>4. Acceptable Use &amp; Fellowship</h2>
              <p>
                When submitting church listings, translation errata, or communicating in community spaces,
                you agree to adhere to our <Link href="/community-guidelines" style={{ color: 'var(--ink)', fontWeight: 700, textDecoration: 'underline' }}>Community Guidelines</Link>.
                You may not use the app to distribute malware, engage in harassment, or commit fraud.
              </p>

              <h2>5. Disclaimer of Warranties</h2>
              <p>
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                AND NONINFRINGEMENT.
              </p>

              <h2>6. Contact Information</h2>
              <p>
                For questions regarding these Terms, contact us at{' '}
                <a href="mailto:legal@exegeomai.app" style={{ color: 'var(--ink)', fontWeight: 700 }}>
                  legal@exegeomai.app
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
