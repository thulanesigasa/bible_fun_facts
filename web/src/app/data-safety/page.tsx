import { LegalDocument } from '@/components/LegalDocument';
import sections from '@/content/data-safety.json';
export default function DataSafetyPage() {
  return <LegalDocument title="Data Safety Declaration" introduction="A feature-by-feature explanation of what stays local, what can be transmitted, which providers receive it, and what choices you have. This is a developer disclosure, not a Google Play certification or a blanket claim of zero collection." sections={sections} rows={[
    ['Account identity and contact details', 'Yes, when submitted', 'Supabase account infrastructure', 'Account access; edit supported fields'],
    ['Passwords, session and account identifiers', 'Yes, for authentication', 'Authentication service; secure local session storage', 'Sign-in and security; sign out or delete account'],
    ['Study preferences and progress', 'Conditional synchronisation', 'Account metadata and study tables', 'Study continuity; private-study controls'],
    ['Notes, favourites and highlights', 'Conditional synchronisation', 'Account-scoped cloud records', 'Local/private settings; record deletion'],
    ['Selected profile photo', 'Yes, when uploaded', 'Supabase storage; public image URL', 'Optional avatar; replace or request removal'],
    ['Directory names, contacts and locations', 'Yes, when submitted', 'Cloud directory; public readers', 'Public contribution; authority and correction'],
    ['Address queries and coordinates', 'Yes, for online lookup', 'Nominatim, Photon, LocationIQ where configured', 'Geographic result; avoid unnecessary precision'],
    ['Map areas and zoom levels', 'Yes, for online imagery', 'Map providers including Esri', 'Map display; optional interaction'],
    ['Passage and translation requests', 'Yes, for online content', 'Bible APIs, download hosts and mirrors', 'Content delivery; use downloaded resources'],
    ['Crash and performance diagnostics', 'When Sentry is configured', 'Sentry; restricted diagnostic operations', 'Reliability; release-dependent configuration'],
    ['Runtime and update delivery metadata', 'When update checks run', 'Expo update infrastructure', 'Compatible application delivery'],
    ['Biometric templates', 'No upload by reviewed app-lock path', 'Device operating system performs matching', 'Optional local lock; disable in settings'],
    ['Local reminder schedules', 'Local in reviewed reminder path', 'Device notification system', 'Optional reminders; device permission'],
    ['Exports and shared content', 'When you choose a destination', 'Selected app, recipient or storage provider', 'User-directed transfer; manage external copies'],
    ['Waitlist email, consent and rate-limit hash', 'Yes, on website submission', 'Supabase; Resend and team email when configured', 'Launch notifications; unsubscribe'],
    ['Support and website deletion-request details', 'Yes, when submitted', 'Team correspondence or hosting logs', 'Request handling; minimise attachments'],
  ]} sources={[
    { label: 'Google Play: Data safety definitions and form guidance', href: 'https://support.google.com/googleplay/android-developer/answer/10787469' },
    { label: 'Google Play: User Data policy', href: 'https://support.google.com/googleplay/android-developer/answer/10144311' },
    { label: 'Information Regulator: POPIA guidance', href: 'https://inforegulator.org.za/guidance-notes/' },
  ]} />;
}
