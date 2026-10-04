import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Data Safety Declarations — Google Play Compliant',
  description:
    'Official Data Safety disclosures for exégeomai. Zero personal data collected, zero third-party tracking, 100% offline security.',
};

export default function DataSafetyPage() {
  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Compliance &amp; Transparency</span>
            <h1>Data Safety Declarations</h1>
            <p>
              Official disclosures compliant with Google Play Store Data Safety policies,
              GDPR Article 13, and South African Protection of Personal Information Act (POPIA).
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="prose-card">
              <h2>1. Data Collection Summary</h2>
              <div style={{ background: 'var(--surface-alt)', padding: '20px 24px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#16A34A' }}></span>
                  <strong style={{ fontSize: 16, color: 'var(--ink)' }}>No Personal Data Collected</strong>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, color: 'var(--body-text)' }}>
                  exégeomai does not collect, record, harvest, or transmit any personal identifiable information,
                  device identifiers, contact books, or browsing history to remote servers.
                </p>
              </div>

              <h2>2. Data Safety Checklist</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14, margin: '20px 0 32px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', background: 'var(--surface-alt)' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 700 }}>Data Category</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700 }}>Collected?</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700 }}>Shared with 3rd Parties?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>Location (Precise / Coarse)</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No (Calculated on-device)</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>Personal Info (Name, Email)</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>Financial / Payment Info</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>App Activity &amp; Search Queries</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>Device Identifiers / Advertising ID</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No</td>
                    <td style={{ padding: '12px 16px', color: '#16A34A', fontWeight: 600 }}>No</td>
                  </tr>
                </tbody>
              </table>

              <h2>3. Security Practices</h2>
              <ul>
                <li><strong>Hardware Cryptographic Storage:</strong> User notes and reading bookmarks are stored encrypted at rest using AES-256 GCM backed by the Android Keystore.</li>
                <li><strong>FLAG_SECURE Window Protection:</strong> App switcher window screenshots are disabled at the OS level to protect sensitive personal reflections.</li>
                <li><strong>User Deletion Mechanism:</strong> Users can permanently purge all stored data via the in-app Nuclear Data Wipe or via our <Link href="/deletion" style={{ color: 'var(--ink)', fontWeight: 700, textDecoration: 'underline' }}>Account Deletion Portal</Link>.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
