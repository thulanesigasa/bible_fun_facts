'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const FAQS = [
  {
    q: 'What does "exégeomai" mean?',
    a: 'exégeomai (ἐξηγέομαι, Strong\'s G1834) is the classical Greek verb meaning "to lead out, draw forth in narrative, declare, or unfold divine mysteries". It is the biblical root from which we derive "exegesis" — letting Scripture speak for itself in its original historical, grammatical, and theological context.',
  },
  {
    q: 'Does exégeomai work completely offline without internet?',
    a: 'Yes! All 14,298 Strong\'s Greek and Hebrew definitions, 365 daily devotionals, and 32 full canonical Bible translations are stored in an optimized local SQLite database on your device. Once installed, zero internet access is required.',
  },
  {
    q: 'Is the app really 100% free with no ads or paywalls?',
    a: 'Absolutely. exégeomai is released under the permissive MIT Open Source license. There are no subscriptions, no locked features, no in-app purchases, and no third-party advertisements. As Matthew 10:8 teaches: "Freely you have received; freely give."',
  },
  {
    q: 'How does the app protect my privacy and study notes?',
    a: 'The application contains zero telemetry, zero analytics tracking, and zero advertising SDKs. All reading progress, private notes, and bookmarks are encrypted using Android Keystore AES-256 hardware encryption. Furthermore, FLAG_SECURE protects against background screen scrapers.',
  },
  {
    q: 'How do I install the Android APK directly on my phone?',
    a: 'Download the compiled APK directly from our GitHub Releases link below. Open the APK file on your Android device and tap "Install" (allowing installation from unknown sources if prompted). The app runs standalone on Android 8.0 through Android 15.',
  },
  {
    q: 'Can developers and scholars contribute to exégeomai?',
    a: 'Yes! exégeomai is completely open-source on GitHub. Community members are welcome to contribute bug fixes, new public domain translations, performance improvements, and linguistic commentary via pull requests.',
  },
  {
    q: 'Which Bible translations are included offline?',
    a: 'The bundled SQLite engine includes KJV, ASV, Young\'s Literal Translation, Darby, Bible in Basic English, Douay-Rheims, Latin Vulgate, Greek New Testament (Textus Receptus), and South African vernaculars (isiZulu, Afrikaans, Sepedi, Xhosa).',
  },
  {
    q: 'How do I permanently delete my account and data?',
    a: 'Since the app is 100% offline, there is no remote account to track you. You can wipe all local encrypted notes and settings instantly from Settings → Security → Nuclear Data Wipe, or submit a deletion confirmation request on our Data Deletion portal.',
  },
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Knowledge Base</span>
            <h1>Frequently Asked Questions</h1>
            <p>
              Everything you need to know about exégeomai: offline storage, cryptographic standards,
              canonical translations, and open-source contributions.
            </p>
          </div>
        </header>

        <section className="subpage-content">
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
