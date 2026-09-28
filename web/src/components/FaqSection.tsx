'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'Is exégeomai completely free to use?',
    a: "Yes — 100% free with zero advertisements, no premium subscriptions, and no in-app purchases. All 32 Bible translations, 14,298 Strong's entries, and 365 devotionals are included in the single standalone native binary.",
  },
  {
    q: 'Does the application operate fully offline?',
    a: "Entirely. All biblical texts, lexicons, transliterations, and daily devotional reflections are packaged locally within the embedded SQLite database. Once downloaded, the application requires zero network connectivity.",
  },
  {
    q: 'How does exégeomai protect user privacy?',
    a: 'Reading history, bookmarks, notes, and preferences remain solely on your device. When optional PIN security is enabled, data is encrypted using AES-256-CBC with keys generated inside the device Hardware Security Module (Keystore / Secure Enclave).',
  },
  {
    q: 'What is the app switcher privacy shield?',
    a: 'Using Android FLAG_SECURE and iOS secure blur primitives, exégeomai obscures screen content whenever the app moves to the background or the app switcher drawer, preventing shoulder-surfing and OS thumbnail storage.',
  },
  {
    q: 'How do I permanently delete my account and data?',
    a: 'You can submit a verified deletion request through the dedicated Account Deletion portal on this website or within the app under Settings → Security → Delete Account. All associated records are permanently purged within 30 days per GDPR Article 17.',
  },
  {
    q: 'Can developers and scholars contribute to exégeomai?',
    a: 'Yes! exégeomai is completely open-source under the MIT license on GitHub. Community members are welcome to contribute bug fixes, new public domain translations, performance improvements, and linguistic commentary.',
  },
  {
    q: 'Which mobile operating systems are supported?',
    a: 'Native Android 6.0 (API 23) and higher via direct APK download from GitHub Releases. iOS builds are compiled and managed via the same shared React Native codebase.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="page-section" id="faq">
      <header className="section-intro">
        <h2>Frequently Asked Questions</h2>
        <p>
          Everything you need to know about exégeomai — offline functionality,
          cryptographic standards, data privacy, and open-source contributions.
        </p>
      </header>

      <dl className="faq-list">
        {faqs.map((f, i) => (
          <React.Fragment key={f.q}>
            <dt>
              <button
                type="button"
                className="faq-trigger"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                id={`faq-${i}`}
              >
                <span>{f.q}</span>
                <span className="faq-sign" aria-hidden="true">
                  {open === i ? '−' : '+'}
                </span>
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
    </section>
  );
}
