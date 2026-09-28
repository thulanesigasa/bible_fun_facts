'use client';

import React, { useState } from 'react';
import { ChevronDownSvg } from './SvgIcons';

const faqs = [
  {
    q: 'Is exégeomai completely free?',
    a: 'Yes — 100% free with no ads, no subscriptions, and no in-app purchases. The full app including all 32 translations, 14,298 Strong\'s entries, and 365 devotionals is included in the single APK download.',
  },
  {
    q: 'Does the app work offline?',
    a: 'Entirely. All Bible translations, the Strong\'s lexicon, and devotional content are embedded in the app bundle. Once installed, the app works indefinitely without any network connection.',
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
    a: 'Absolutely! exégeomai is open source under the MIT license. Visit the GitHub repository to submit pull requests, report bugs, or suggest features. Lexicon data corrections and new translation additions are especially welcome.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'Android (6.0+) via standalone APK download. iOS support is in active development. The React Native codebase targets both platforms from a single code base.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Everything you need to know about exégeomai — from privacy to platform support.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div className="faq-item" key={i}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                id={`faq-btn-${i}`}
              >
                <span>{faq.q}</span>
                <ChevronDownSvg
                  size={18}
                  className="faq-icon"
                  style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              {openIndex === i && (
                <div className="faq-answer" role="region" aria-labelledby={`faq-btn-${i}`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
