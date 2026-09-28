import React from 'react';

const pillars = [
  {
    title: 'AES-256-CBC Encryption',
    body: 'All sensitive data encrypted via Android Keystore / iOS Secure Enclave hardware. Keys are generated inside the hardware security module and are never exportable to userspace.',
  },
  {
    title: 'PBKDF2 PIN Hashing',
    body: '310,000 HMAC-SHA256 iterations per the OWASP 2023 guidance. The PIN is never stored — only its derived hash. Brute-force is computationally infeasible.',
  },
  {
    title: 'App Switcher Shield',
    body: 'FLAG_SECURE prevents screenshots and replaces the app preview with a solid screen in the Android recents drawer, protecting your reading content from shoulder-surfing.',
  },
];

const practices = [
  'Reading history stays on-device only',
  'No analytics SDK or third-party tracking',
  'Crash reports opt-in only, anonymized',
  'Optional Supabase sync with row-level security',
  'GDPR-compliant data deletion within 30 days',
  'Open source — auditable by anyone',
];

export function SecuritySection() {
  return (
    <section className="page-section" id="security">
      <div className="wrap">
        <div className="split">
          <header className="split-lead">
            <h2>Designed for Confidential Study</h2>
            <p>
              Your faith journey is personal. exégeomai uses hardware-backed cryptography
              and a zero-data-collection design so your annotations and reading patterns
              remain entirely private.
            </p>
            <p>
              Built on the same security primitives used by mobile banking — Android Keystore
              and iOS Secure Enclave — with no custom cryptography layer.
            </p>
          </header>

          <ul className="pillar-list" role="list">
            {pillars.map((p) => (
              <li className="pillar-entry" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <aside style={{ marginTop: '64px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Our Data Practices
          </h3>
          <ul className="practices-list" role="list">
            {practices.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
}
