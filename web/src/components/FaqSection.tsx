'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'Is exégeomai completely free?',
    a: "Yes — 100% free with no ads, no subscriptions, and no in-app purchases. The full app including all 32 translations, 14,298 Strong's entries, and 365 devotionals is included in the single APK download.",
  },
  {
    q: 'Does the app work offline?',
    a: "Entirely. All Bible translations, the Strong's lexicon, and devotional content are embedded in the app bundle. Once installed, the app works indefinitely without any network connection.",
  },
  {
    q: 'How is my data kept private?',
    a: 'Your reading history, bookmarks, PIN, and biometric keys never leave your device by default. The PIN is hashed with PBKDF2 and encrypted notes use AES-256-CBC via the Android Keystore or iOS Secure Enclave — hardware-backed security that even a rooted device cannot bypass.',
  },
  {
    q: 'What is the screen privacy shield?',
    a: 'When you switch apps or open the recent-apps drawer, exégeomai automatically replaces its preview with a solid screen so your reading content and notes are not visible to anyone looking at your screen.',
  },
  {
    q: 'How do I delete my account and all my data?',
    a: 'You can request permanent deletion of all your data via the Account Deletion portal on this website, or within the app under Settings → Account → Delete Account. Your data is purged within 30 days as required by GDPR and Google Play Policy.',
  },
  {
    q: 'Can I contribute to the project?',
    a: 'Absolutely! exégeomai is open source under the MIT license. Visit the GitHub repository to submit pull requests, report bugs, or suggest features.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'Android (6.0+) via standalone APK download. iOS support is in active development. The React Native codebase targets both platforms from a single code base.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="page-section" id="faq">
      <div className="wrap">
        <header className="section-intro">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about exégeomai — privacy, offline use, and platform support.</p>
        </header>

        <dl className="faq-list">
          {faqs.map((f, i) => (
            <React.Fragment key={i}>
              <dt>
                <button
                  className="faq-trigger"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  id={`faq-${i}`}
                >
                  {f.q}
                  <span className="faq-sign" aria-hidden="true">{open === i ? '−' : '+'}</span>
                </button>
              </dt>
              {open === i && (
                <dd className="faq-body" role="region" aria-labelledby={`faq-${i}`}>
                  {f.a}
                </dd>
              )}
            </React.Fragment>
          ))}
        </dl>
      </div>
    </section>
  );
}
