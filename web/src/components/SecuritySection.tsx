import React from 'react';

const pillars = [
  {
    title: 'AES-256-CBC Encryption',
    body: 'All journal reflections, personal notes, and bookmarks are encrypted via Android Keystore and iOS Secure Enclave hardware. Keys are generated inside the hardware security module and are non-exportable to userspace.',
  },
  {
    title: 'PBKDF2 PIN Hashing',
    body: '310,000 HMAC-SHA256 iterations adhering strictly to OWASP 2023 authentication guidelines. PINs are salted with 16 bytes of cryptographically secure random bytes and never stored in plaintext.',
  },
  {
    title: 'App Switcher Privacy Shield',
    body: 'FLAG_SECURE replaces the application screenshot with a clean, blank screen in the Android recents task switcher, preventing shoulder-surfing and automated OS snapshot harvesting.',
  },
];

const cryptoSpecs = [
  { spec: 'Cipher Suite', val: 'AES-256-CBC with PKCS7 padding' },
  { spec: 'Hardware Keystore', val: 'Android Keystore (TEE / StrongBox) · iOS Secure Enclave' },
  { spec: 'Key Derivation', val: 'PBKDF2 with HMAC-SHA256, 310,000 iterations' },
  { spec: 'Salt Entropy', val: '128-bit CSPRNG salt generated per credential' },
  { spec: 'Biometric Integration', val: 'Expo LocalAuthentication (Fingerprint, Touch ID, Face ID)' },
  { spec: 'Storage Engine', val: 'Encrypted SQLite with local-first relational indexing' },
];

const practices = [
  'Reading history and progress stay 100% on-device',
  'Zero third-party analytics SDKs, ads, or trackers',
  'Crash reporting strictly opt-in and fully anonymized',
  'Optional Supabase cloud sync with Row-Level Security (RLS)',
  'GDPR Article 17 self-service data eradication portal',
  'Auditable open-source code under the MIT license',
];

export function SecuritySection() {
  return (
    <>
      <section className="split-section" id="security">
        <header className="split-lead">
          <h2>Designed for Confidential Study</h2>
          <p>
            Your spiritual journey and theological notes are strictly personal.
            exégeomai employs the same hardware-backed cryptographic primitives
            trusted by modern mobile banking applications.
          </p>
          <p>
            Keys are held within the device’s Hardware Security Module (HSM). Even
            in the event of a device backup or rooted operating system, your
            encrypted journals cannot be extracted in plaintext.
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
      </section>

      {/* ── Cryptographic Specifications Table ── */}
      <section className="page-section section-alt">
        <header className="section-intro">
          <h2>Cryptographic Specifications</h2>
          <p>
            Verifiable security parameters implemented across both Android and iOS targets.
          </p>
        </header>

        <table className="specs-table">
          <thead>
            <tr>
              <th scope="col">Parameter</th>
              <th scope="col">Implementation Standard</th>
            </tr>
          </thead>
          <tbody>
            {cryptoSpecs.map((row) => (
              <tr key={row.spec}>
                <td>{row.spec}</td>
                <td>{row.val}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <aside style={{ marginTop: '48px' }}>
          <h3
            style={{
              marginBottom: '18px',
              fontSize: '1.05rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-muted)',
            }}
          >
            Verified Data Practices
          </h3>
          <ul className="practices-list" role="list">
            {practices.map((p) => (
              <li className="practice-item" key={p}>
                {p}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
