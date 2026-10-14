'use client';

import React, { useState } from 'react';
import { Footer } from '@/components/Footer';

const FAQS = [
  { q: 'What does exégeomai mean?', a: 'The Greek verb ἐξηγέομαι means to explain, recount, or make known. The app encourages thoughtful study of Scripture in its linguistic and historical context.' },
  { q: 'Can I study offline?', a: 'Supported bundled or downloaded resources work offline. Accounts, synchronisation, maps, content downloads, updates, and configured diagnostics can still involve online services.' },
  { q: 'Is the app available to download now?', a: 'This website announces the upcoming launch. Join the waiting list for official availability news; do not rely on an unofficial download link.' },
  { q: 'Does the app collect personal information?', a: 'Account registration, cloud study records, selected avatars, directory submissions, and configured online services involve information processing. See the detailed Privacy Policy and Data Safety Declaration for the relevant features and choices.' },
  { q: 'What does Private Study Mode do?', a: 'It limits relevant study synchronisation paths. It does not erase older cloud records or disable every authentication, map, update, content, or diagnostic request.' },
  { q: 'Are profile pictures private?', a: 'The reviewed avatar implementation creates a public image URL. Choose an image suitable for that audience, and request removal of an old avatar if replacing the current display is insufficient.' },
  { q: 'How do I delete my account?', a: 'Use the authenticated in-app deletion flow when available. It needs online server confirmation. If you cannot access the account, contact privacy@exegeomai.co.za. Exported backups and recipient copies need separate management.' },
  { q: 'How do I leave the launch waiting list?', a: 'Email joinus@exegeomai.co.za from the subscribed address with an unsubscribe request. Waiting-list removal does not delete your app account.' },
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Knowledge Base</span>
            <h1>Frequently Asked Questions</h1>
            <p>
              Everything you need to know about exégeomai: offline storage, cryptographic standards,
              available resources, accounts, and privacy choices.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap legal-related"><a href="/privacy">Privacy Policy</a><a href="/data-safety">Data Safety</a><a href="/account-deletion">Account Deletion</a></div>
          <div className="wrap">
            <div className="faq-wrap">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className={`faq-item ${openFaq === idx ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="prose-card" style={{ marginTop: 64, textAlign: 'center' }}>
              <h2>Still Have a Question?</h2>
              <p>Can&apos;t find what you&apos;re looking for? Reach out to our maintainers anytime.</p>
              <a href="/contact" className="btn-primary" style={{ display: 'inline-flex', marginTop: 12 }}>
                <span>Contact Support</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
