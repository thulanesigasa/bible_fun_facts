import Link from 'next/link';
import { Footer } from '@/components/Footer';
const controls = [
  ['Secure session storage', 'Native secure storage protects account session credentials and selected account-scoped state. Other caches and downloaded resources have different storage boundaries.'],
  ['Private study choices', 'Private Study Mode limits relevant study synchronisation paths. Private notes, search discoverability, and public streak display are separate choices.'],
  ['Local app lock', 'Supported PIN and biometric controls protect access to the interface. The operating system performs biometric matching; these controls do not establish end-to-end encryption of all cloud data.'],
  ['Encrypted study archives', 'Supported encrypted exports use authenticated encryption. Ordinary exports, public avatars, and cloud records must be considered separately.'],
  ['Cloud account controls', 'Accounts and synchronised records use authentication and account access rules. Confirm server-backed changes rather than relying on an offline switch movement.'],
  ['Diagnostics and online providers', 'Sentry can send diagnostics when configured. Maps, content requests, downloads, and updates can also involve external providers.'],
];
export default function SafetyPage() {
  return <><main id="main"><header className="subpage-hero"><div className="wrap"><span className="section-kicker">Security and privacy</span><h1>Safety and Privacy Controls</h1><p>Understand the protections available to you and the boundaries of local storage, cloud accounts, public content, and external providers.</p></div></header><section className="subpage-content"><div className="wrap"><div className="cards-grid">{controls.map(([title,body])=><article className="feature-card" key={title}><h2>{title}</h2><p>{body}</p></article>)}</div><div className="prose-card"><h2>Read the full disclosures</h2><p>No security control guarantees protection from every device compromise, unauthorised export, or independent recipient copy. Protect your account and device, verify privacy changes, and use a private route to report suspected exposure.</p><div className="legal-related"><Link href="/privacy">Privacy Policy</Link><Link href="/data-safety">Data Safety</Link><Link href="/account-deletion">Account Deletion</Link><Link href="/report-a-problem">Report a Problem</Link></div></div></div></section></main><Footer /></>;
}
