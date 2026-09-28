import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DeletionForm } from '@/components/DeletionForm';
import { ShieldSvg, TrashSvg, CheckSvg } from '@/components/SvgIcons';

export const metadata: Metadata = {
  title: 'Account Deletion Request',
  description:
    'Request permanent deletion of your exégeomai account and all associated data. GDPR and Google Play Policy compliant.',
  robots: { index: true, follow: false },
};

const dataItems = [
  'Account credentials and profile information',
  'Reading history and progress tracking',
  'Bookmarks, highlights, and notes',
  'Biometric and PIN security configurations',
  'Any optional cloud-synced data via Supabase',
];

export default function DeletionPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="section-label">Data Rights</span>
              <h1 className="section-title">Account &amp; Data Deletion Request</h1>
              <p className="section-desc">
                You have the right to request permanent deletion of your exégeomai
                account and all associated personal data. This is compliant with GDPR
                Article 17, CCPA, and Google Play data safety requirements.
              </p>
            </div>

            {/* What gets deleted */}
            <div className="deletion-info-grid">
              <div className="deletion-info-card">
                <div className="deletion-info-header">
                  <div className="security-icon-large">
                    <TrashSvg size={22} />
                  </div>
                  <h2>What Will Be Deleted</h2>
                </div>
                <ul className="deletion-data-list">
                  {dataItems.map((item) => (
                    <li key={item} className="deletion-data-item">
                      <div className="data-check">
                        <CheckSvg size={14} color="var(--text-primary)" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="deletion-notice">
                  Deletion is permanent and irreversible. Your data will be fully
                  purged within <strong>30 days</strong> of your request being confirmed.
                </div>
              </div>

              <div className="deletion-info-card">
                <div className="deletion-info-header">
                  <div className="security-icon-large">
                    <ShieldSvg size={22} />
                  </div>
                  <h2>What Is Retained</h2>
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Certain anonymized records may be retained where legally required — specifically
                  aggregate crash-report metrics (which contain no personal identifiers) and
                  financial transaction records required by applicable tax law.
                </p>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '12px' }}>
                  All retained records are fully anonymized. No name, email, or device
                  identifier is included.
                </p>
              </div>
            </div>

            {/* Deletion Form */}
            <div style={{ marginTop: '40px' }}>
              <DeletionForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
