import React from 'react';
import { ShieldSvg, LockSvg, KeySvg, EyeOffSvg, CheckSvg } from './SvgIcons';

const pillars = [
  {
    icon: <KeySvg size={18} />,
    title: 'AES-256-CBC Encryption',
    text: 'All sensitive data encrypted via Android Keystore / iOS Secure Enclave hardware. Keys never exportable to userspace.',
  },
  {
    icon: <LockSvg size={18} />,
    title: 'PBKDF2 PIN Hashing',
    text: '310,000 HMAC-SHA256 iterations per the OWASP 2023 guidance. Brute-force computationally infeasible.',
  },
  {
    icon: <EyeOffSvg size={18} />,
    title: 'App Switcher Shield',
    text: 'FLAG_SECURE prevents screenshots and replaces the app preview with a solid screen in the recents drawer.',
  },
];

const dataPoints = [
  'Reading history stays on-device only',
  'No analytics SDK or third-party tracking',
  'Crash reports opt-in only, anonymized',
  'Optional Supabase sync with row-level security',
  'GDPR-compliant data deletion within 30 days',
  'Open source — auditable by anyone',
];

export function SecuritySection() {
  return (
    <section className="section" id="security">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Security &amp; Privacy</span>
          <h2 className="section-title">Designed for Confidential Study</h2>
          <p className="section-desc">
            Your faith journey is personal. exégeomai uses hardware-backed cryptography
            and a zero-data-collection design to ensure your annotations and reading
            patterns remain entirely private.
          </p>
        </div>

        <div className="security-banner">
          <div className="security-header">
            <div className="security-icon-large">
              <ShieldSvg size={26} />
            </div>
            <div>
              <h3 className="security-title">Hardware-Backed Security Architecture</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
                Built on Android Keystore &amp; iOS Secure Enclave — the same primitives used
                by mobile banking applications.
              </p>
            </div>
          </div>

          <p className="security-desc">
            Notes, highlights, and journal entries are encrypted at rest using AES-256-CBC with
            keys generated inside the hardware security module. The PIN is never stored — only its
            PBKDF2 hash derived with 310,000 iterations. Biometric verification (fingerprint /
            Face ID) authenticates against the hardware token without the raw credential ever
            entering application memory.
          </p>

          <div className="security-pillars">
            {pillars.map((p) => (
              <div className="pillar-item" key={p.title}>
                <div className="pillar-title">
                  {p.icon}
                  {p.title}
                </div>
                <p className="pillar-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data practices */}
        <div className="data-practices">
          <h3 className="data-practices-title">Our Data Practices</h3>
          <div className="data-grid">
            {dataPoints.map((point) => (
              <div className="data-point" key={point}>
                <div className="data-check">
                  <CheckSvg size={14} color="var(--text-primary)" />
                </div>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
