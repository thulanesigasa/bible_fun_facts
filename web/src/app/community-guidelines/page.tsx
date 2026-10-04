import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Community Guidelines — exégeomai',
  description:
    'Guidelines for wholesome communication, Christ-centered discourse, and respectful fellowship within the exégeomai community.',
};

export default function CommunityGuidelinesPage() {
  return (
    <>
      <Header />

      <main id="main">
        <header className="subpage-hero">
          <div className="wrap">
            <span className="section-kicker">Christian Fellowship</span>
            <h1>Community Guidelines</h1>
            <p>
              Grounding our communication in love, theological truth, and mutual edification.
              &quot;Let your speech be alway with grace, seasoned with salt.&quot; (Colossians 4:6)
            </p>
          </div>
        </header>

        <section className="subpage-content">
          <div className="wrap">
            <div className="prose-card">
              <h2>1. Foundational Scriptural Standard</h2>
              <p>
                As an open-source biblical study community, our conduct and communications are governed
                by <strong>Ephesians 4:29</strong>:
              </p>
              <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 18, fontStyle: 'italic', margin: '18px 0', color: 'var(--ink)' }}>
                &quot;Let no corrupt communication proceed out of your mouth, but that which is good to the use of edifying,
                that it may minister grace unto the hearers.&quot;
              </blockquote>

              <h2>2. Wholesome &amp; Edifying Discourse</h2>
              <p>
                When participating in GitHub discussions, submitting church assembly listings, or discussing lexical interpretations:
              </p>
              <ul>
                <li><strong>Charity in Debates:</strong> Address theological differences with humility and biblical evidence, not personal attacks or sarcasm.</li>
                <li><strong>Focus on Christ:</strong> Maintain our shared reverence for the Holy Scriptures and the Lord Jesus Christ.</li>
                <li><strong>Constructive Contributions:</strong> Provide citations, ancient manuscript references, and historical evidence when proposing translation adjustments.</li>
              </ul>

              <h2>3. Prohibited Content &amp; Behavior</h2>
              <p>The following activities are strictly prohibited across all exégeomai platforms:</p>
              <ul>
                <li><strong>Profanity and Obscenity:</strong> Vulgar, abusive, or sexually explicit language.</li>
                <li><strong>Harassment &amp; Doxxing:</strong> Targeted hostility, personal intimidation, or sharing private details of other believers.</li>
                <li><strong>Commercial Spam:</strong> Promoting paid products, crypto tokens, affiliate schemes, or non-ministry sales.</li>
                <li><strong>False Ministry Impersonation:</strong> Submitting fraudulent church directories or misrepresenting pastoral leadership.</li>
              </ul>

              <h2>4. Reporting Violations</h2>
              <p>
                If you encounter behavior or listings that violate these standards, please alert our moderation team
                via our <Link href="/report-a-problem" style={{ color: 'var(--ink)', fontWeight: 700, textDecoration: 'underline' }}>Report a Problem</Link> portal
                or email <a href="mailto:support@exegeomai.app" style={{ color: 'var(--ink)', fontWeight: 700 }}>support@exegeomai.app</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
