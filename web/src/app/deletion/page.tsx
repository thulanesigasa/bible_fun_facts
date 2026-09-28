import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DeletionForm } from '@/components/DeletionForm';

export const metadata: Metadata = {
  title: 'Account Deletion Request',
  description: 'Request permanent deletion of your exégeomai account and all associated data. GDPR and Google Play Policy compliant.',
  robots: { index: true, follow: false },
};

const deleted = [
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
        <section className="page-section">
          <div className="wrap">
            <header className="section-intro">
              <h1>Account &amp; Data Deletion Request</h1>
              <p>
                You have the right to request permanent deletion of your exégeomai account
                and all associated personal data — compliant with GDPR Article 17, CCPA,
                and Google Play data safety requirements.
              </p>
            </header>

            <div className="deletion-split">
              <article className="deletion-col">
                <h2>What Will Be Deleted</h2>
                <ul>
                  {deleted.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className="notice">
                  Deletion is <strong>permanent and irreversible</strong>. Your data will
                  be fully purged within 30 days of your request being confirmed.
                </p>
              </article>

              <article className="deletion-col">
                <h2>What Is Retained</h2>
                <p>
                  Certain anonymized records may be retained where legally required —
                  specifically aggregate crash-report metrics (no personal identifiers)
                  and financial transaction records required by applicable tax law.
                </p>
                <p style={{ marginTop: '14px' }}>
                  All retained records are fully anonymized. No name, email, or device
                  identifier is included.
                </p>
              </article>
            </div>

            <DeletionForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
