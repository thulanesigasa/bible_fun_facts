import Link from 'next/link';
import { Footer } from '@/components/Footer';


export default function FeaturesPage() {
  const featureList = [
    {
      title: "14,298 Strong's Concordance Entries",
      category: 'LEXICAL SCHOLARSHIP',
      desc: 'Instant access to all 8,674 Hebrew and 5,624 Greek lemmas. Tap any word to view phonetic transliteration, lexical definition, morphology, and every biblical verse where the root occurs.',
    },
    {
      title: 'Translation Resources',
      category: 'CANONICAL TEXTS',
      desc: 'Explore supported bundled, downloadable, and online Scripture resources. Availability and offline behaviour depend on the selected translation and release.',
    },
    {
      title: '365 Daily Exegetical Devotionals',
      category: 'DISCIPLESHIP',
      desc: 'Calendar-synchronized theological devotionals that analyze scripture through original linguistic roots, historical author intent, and practical Christian application.',
    },
    {
      title: 'Historical Author Chronologies',
      category: 'HISTORICAL CONTEXT',
      desc: 'Contextual timelines for every biblical writer, covering ancient Near-Eastern geography, royal reigns, governing covenants, and prophetic historical milestones.',
    },
    {
      title: 'Ministry Directory',
      category: 'LOCAL FELLOWSHIP',
      desc: 'Discover verified orthodox, Christ-centered church assemblies with exact geo-coordinates, meeting times, and pastoral leadership information.',
    },
    {
      title: 'Security and Privacy Controls',
      category: 'PRIVACY & SECURITY',
      desc: 'Use local app locks, secure account storage, supported encrypted exports, and account privacy controls. Cloud and public content have distinct boundaries.',
    },
  ];

  return (
    <>
      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Features Catalog</span>
            <h1>Everything a Serious Bible Student Needs</h1>
            <p>
              Built for depth, not commercial engagement metrics. Every tool serves the goal of
              unfolding Scripture in its original linguistic, cultural, and theological context.
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="cards-grid" style={{ marginBottom: 64 }}>
              {featureList.map((f, i) => (
                <div key={i} className="feature-card">
                  <span className="pm-badge" style={{ alignSelf: 'flex-start' }}>{f.category}</span>
                  <h2>{f.title}</h2>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="prose-card" style={{ maxWidth: 1000 }}>
              <h2>Your choices, explained</h2>
              <p>Downloaded resources can support offline study. Accounts, cloud synchronisation, online maps, resource downloads, updates, and configured diagnostics can involve external providers.</p>
              <nav className="legal-related" aria-label="Feature disclosures"><Link href="/privacy">Privacy Policy</Link><Link href="/data-safety">Data Safety</Link><Link href="/safety">Privacy controls</Link></nav>
              <div style={{ marginTop: 40, textAlign: 'center' }}>
                <a href="/#waitlist" className="btn-primary">
                  <span>Join Waiting List</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
