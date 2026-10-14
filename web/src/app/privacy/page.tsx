import { LegalDocument } from '@/components/LegalDocument';
import sections from '@/content/privacy.json';
export default function PrivacyPage() {
  return <LegalDocument title="Privacy Policy" introduction="Your study, your choices. Offline reading can stay on your device; account features, synchronisation, public avatars, online maps, configured diagnostics, and launch emails involve different data flows. This policy explains each one, your controls, and the limits of deletion." sections={sections} sources={[
    { label: 'South Africa: Protection of Personal Information Act', href: 'https://www.gov.za/documents/protection-personal-information-act' },
    { label: 'Information Regulator: guidance and complaints', href: 'https://inforegulator.org.za/' },
    { label: 'European Union: General Data Protection Regulation', href: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' },
  ]} />;
}
