import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DeletionForm } from '@/components/DeletionForm';

export const metadata: Metadata = {
  title: 'Account & Data Deletion Request',
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

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Data Sovereignty</span>
            <h1>Account &amp; Data Deletion Request</h1>
            <p>
              You have the right to request the permanent erasure of your personal data
              at any time — compliant with GDPR Article 17, POPIA, and Google Play Developer Policies.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="prose-card" style={{ maxWidth: 840, marginBottom: 40 }}>
              <h2>What Will Be Erased</h2>
              <ul>
                {deletedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p style={{ background: 'var(--surface-alt)', padding: '14px 18px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', fontSize: 14 }}>
                <strong>Important Notice:</strong> Erasure is permanent and irreversible. Because exégeomai operates offline-first, you can also immediately wipe all local records directly on your device via <em>Settings → Security → Nuclear Data Wipe</em>.
              </p>
            </div>

            <div className="prose-card" style={{ maxWidth: 840 }}>
              <DeletionForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
