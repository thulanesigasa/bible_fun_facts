import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DeletionForm } from '@/components/DeletionForm';

export const metadata: Metadata = {
  title: 'Account Deletion Request',
  description:
    'Request permanent deletion of your exégeomai account and all associated data. GDPR Article 17 and Google Play policy compliant.',
  robots: { index: true, follow: false },
};

const deletedItems = [
  'Account credentials and profile authentication data',
  'Reading history, unfolded progress, and streak statistics',
  'Personal study journals, bookmarks, and highlights',
  'Biometric and PIN security derivation credentials',
  'Any optional cloud-synced databases via Supabase',
];

export default function DeletionPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-section">
          <header className="section-intro">
            <h1>Account &amp; Data Deletion Request</h1>
            <p>
              You have the right to request the permanent erasure of your personal data
              at any time — compliant with GDPR Article 17, the California Consumer
              Privacy Act (CCPA), and Google Play Developer Policies.
            </p>
          </header>

          <section className="deletion-split">
            <article className="deletion-col">
              <h2>What Will Be Erased</h2>
              <ul>
                {deletedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="notice">
                Erasure is <strong>permanent and irreversible</strong>. Your data
                will be permanently purged from all operational stores within 30 days.
              </p>
            </article>

            <article className="deletion-col">
              <h2>Data Retention Policy</h2>
              <p>
                In strict compliance with statutory obligations, only non-personally
                identifiable telemetry (such as aggregate crash statistics without device
                identifiers) and mandatory tax records are retained if applicable.
              </p>
              <p style={{ marginTop: '16px' }}>
                All user journals, reading milestones, and credentials are destroyed
                with cryptographically unrecoverable key erasure.
              </p>
            </article>
          </section>

          <DeletionForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
