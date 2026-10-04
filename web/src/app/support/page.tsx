import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Support & Help Hub — exégeomai',
  description:
    'Find answers, troubleshoot offline canon issues, submit bug reports, or contact the exégeomai open source support team.',
};

export default function SupportPage() {
  const supportChannels = [
    {
      title: 'Frequently Asked Questions',
      desc: 'Browse answers regarding offline storage, Strong’s concordance accuracy, translations, and APK installation.',
      link: '/faq',
      cta: 'View FAQ',
    },
    {
      title: 'Help Centre & Guides',
      desc: 'Step-by-step documentation for installing APKs on Android, managing translations, and biometric locking.',
      link: '/help',
      cta: 'Go to Help Centre',
    },
    {
      title: 'Contact Support',
      desc: 'Reach out to our maintainers for assistance with app crashes, translation issues, or church ministry submissions.',
      link: '/contact',
      cta: 'Contact Support',
    },
    {
      title: 'Report a Problem',
      desc: 'Submit technical bug reports, errata in lexicon entries, or security vulnerability disclosures directly.',
      link: '/report-a-problem',
      cta: 'Report Problem',
    },
    {
      title: 'Account & Data Deletion',
      desc: 'Review instructions for local data wiping or submit an account deletion request under Google Play policies.',
      link: '/deletion',
      cta: 'Data Deletion Portal',
    },
    {
      title: 'GitHub Issue Tracker',
      desc: 'Developer and community issues, feature requests, and pull request tracking on our public repository.',
      link: 'https://github.com/thulanesigasa/bible_fun_facts/issues',
      cta: 'Open GitHub Issues',
      external: true,
    },
  ];

  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Help &amp; Assistance</span>
            <h1>Support &amp; Community Resources</h1>
            <p>
              We are here to help you get the most out of your scriptural study.
              Explore our guides, FAQs, or contact our open-source maintainers.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="cards-grid" style={{ marginBottom: 64 }}>
              {supportChannels.map((c, i) => (
                <div key={i} className="feature-card">
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div style={{ marginTop: 20 }}>
                    {c.external ? (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-btn"
                        style={{ display: 'inline-flex', fontSize: 13, padding: '8px 16px' }}
                      >
                        <span>{c.cta}</span>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      </a>
                    ) : (
                      <Link
                        href={c.link}
                        className="cta-btn"
                        style={{ display: 'inline-flex', fontSize: 13, padding: '8px 16px' }}
                      >
                        <span>{c.cta}</span>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="9 18 15 12 9 6" /></svg>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="prose-card" style={{ textAlign: 'center' }}>
              <h2>Direct Email Support</h2>
              <p>
                Need personal assistance? Email our core open source maintainers directly at{' '}
                <a href="mailto:support@exegeomai.app" style={{ color: 'var(--ink)', fontWeight: 700, textDecoration: 'underline' }}>
                  support@exegeomai.app
                </a>
              </p>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
                We typically respond within 24–48 hours. Please include your Android OS version and device model.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
