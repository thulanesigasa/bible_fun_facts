import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About exégeomai — The Vision & Theological Foundation',
  description:
    'Learn about exégeomai, our mission of unfolding the original biblical languages, historical author timelines, and open source theological integrity.',
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Theological Foundation</span>
            <h1>About exégeomai</h1>
            <p>
              Dedicated to unfolding the sacred depth of Scripture through original biblical languages,
              historical context, and faithful open-source stewardship.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="prose-card">
              <h2>The Meaning of ἐξηγέομαι</h2>
              <p>
                In <strong>John 1:18</strong>, the Apostle John writes:{' '}
                <em>&quot;No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared him.&quot;</em>
              </p>
              <p>
                The Greek word translated &quot;declared&quot; is <strong>ἐξηγέομαι (exégeomai, Strong&apos;s G1834)</strong>,
                derived from <em>ek</em> (&quot;out of&quot;) and <em>hēgeomai</em> (&quot;to lead&quot;).
                It literally means <strong>&quot;to lead out, draw forth in narrative, recount, explain, or unfold divine secrets&quot;</strong>.
                Christ did not merely summarize the Father; He completely unfolded the unseen reality of the living God.
              </p>
              <p>
                From this root verb comes our English word <strong>exegesis</strong> — the disciplined, reverent act of drawing
                out of Scripture what the Holy Spirit inspired, rather than reading our own cultural preferences into the text (eisegesis).
              </p>

              <h2>Our Core Principles</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, margin: '24px 0 36px' }}>
                <div style={{ background: 'var(--surface-alt)', padding: 20, borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                  <h3 style={{ marginTop: 0, fontSize: 17, color: 'var(--ink)' }}>1. Linguistic Fidelity</h3>
                  <p style={{ fontSize: 14, margin: 0, color: 'var(--body-text)' }}>
                    Immediate access to 14,298 Strong&apos;s Hebrew and Greek entries so believers understand original roots, morphology, and idioms.
                  </p>
                </div>
                <div style={{ background: 'var(--surface-alt)', padding: 20, borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                  <h3 style={{ marginTop: 0, fontSize: 17, color: 'var(--ink)' }}>2. Historical Context</h3>
                  <p style={{ fontSize: 14, margin: 0, color: 'var(--body-text)' }}>
                    Every testament, prophet, and apostle understood within their royal chronology, geography, and divine covenants.
                  </p>
                </div>
                <div style={{ background: 'var(--surface-alt)', padding: 20, borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                  <h3 style={{ marginTop: 0, fontSize: 17, color: 'var(--ink)' }}>3. Complete Software Freedom</h3>
                  <p style={{ fontSize: 14, margin: 0, color: 'var(--body-text)' }}>
                    100% Free and Open Source under the MIT license. No paywalls, no proprietary lock-in, and zero advertising trackers.
                  </p>
                </div>
              </div>

              <h2>Why We Built exégeomai</h2>
              <p>
                Many modern mobile Bible apps have shifted from spiritual tools to attention-economy platforms:
                bombarding readers with notifications, tracking their reading times for ad targeting, and charging
                steep subscriptions for concordances and lexicon lookups.
              </p>
              <p>
                We believed believers deserved better: a fast, offline-first application engineered in React Native
                with embedded SQLite, protected by hardware-backed encryption, and freely shared with the global church.
              </p>

              <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="/#download" className="btn-primary">
                  <span>Download the Application</span>
                </a>
                <Link href="/community-guidelines" className="btn-outline" style={{ borderColor: 'var(--border-strong)', color: 'var(--ink)' }}>
                  <span>Community Guidelines</span>
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
