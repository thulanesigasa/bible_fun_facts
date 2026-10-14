import Link from 'next/link';
import { Footer } from './Footer';

type Section = { id: string; title: string; paragraphs: string[] };
type DataRow = [string, string, string, string];
export function LegalDocument({ title, introduction, sections, sources = [], rows = [] }: {
  title: string; introduction: string; sections: Section[];
  sources?: { label: string; href: string }[]; rows?: DataRow[];
}) {
  const words = sections.flatMap(s => [s.title, ...s.paragraphs]).join(' ').split(/\s+/).length;
  return <>
    <main id="main" className="legal-page">
      <header className="subpage-hero"><div className="wrap">
        <span className="section-kicker">EXÉGEOMAI · TRANSPARENCY</span>
        <h1>{title}</h1>
        <p>{introduction}</p>
        <p className="legal-meta">Updated 14 October 2026 · {words.toLocaleString('en-ZA')} words · Detailed reference with a quick summary and contents</p>
      </div></header>
      <div className="wrap legal-layout">
        <aside className="legal-contents">
          <details open><summary>On this page</summary><nav aria-label={`${title} contents`}>
            <a href="#quick-summary">Quick summary</a>
            {rows.length > 0 && <a href="#data-matrix">Data flow matrix</a>}
            {sections.map(s => <a key={s.id} href={`#${s.id}`}>{s.title}</a>)}
            {sources.length > 0 && <a href="#references">Official references</a>}
          </nav></details>
        </aside>
        <article className="prose-card legal-article">
          <section id="quick-summary"><h2>Quick summary</h2><p>{introduction}</p>
            <p>For privacy questions or account-data requests, contact <a href="mailto:privacy@exegeomai.co.za">privacy@exegeomai.co.za</a>. For waiting-list removal, contact <a href="mailto:joinus@exegeomai.co.za">joinus@exegeomai.co.za</a>.</p>
            <nav className="legal-related" aria-label="Related policies">
              <Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link><Link href="/data-safety">Data Safety</Link><Link href="/waitlist-privacy">Waitlist Privacy</Link><Link href="/account-deletion">Account Deletion</Link><Link href="/contact">Contact</Link>
            </nav>
          </section>
          {rows.length > 0 && <section id="data-matrix"><h2>Data flow matrix</h2><p>Feature-level transmission and visibility; app-store classifications also depend on the release configuration and provider relationship.</p>
            <div className="legal-table-scroll" tabIndex={0} role="region" aria-label="Data flow matrix, horizontally scrollable">
              <table><caption>What can leave your device, where it goes, and your choices</caption><thead><tr><th scope="col">Information</th><th scope="col">Off-device processing</th><th scope="col">Recipient or visibility</th><th scope="col">Purpose and choice</th></tr></thead><tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell,i) => i===0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table>
            </div>
          </section>}
          {sections.map(s => <section key={s.id} id={s.id}><h2>{s.title}</h2>{s.paragraphs.map((p,i) => <p key={i}>{p}</p>)}<a className="legal-back" href="#quick-summary">Back to summary ↑</a></section>)}
          {sources.length > 0 && <section id="references"><h2>Official references</h2><p>These resources explain the applicable frameworks. They do not certify this application or replace release-specific verification.</p><ul>{sources.map(s => <li key={s.href}><a href={s.href}>{s.label}</a></li>)}</ul></section>}
        </article>
      </div>
    </main><Footer />
  </>;
}
