import { LegalDocument } from '@/components/LegalDocument';
import sections from '@/content/terms.json';
export default function TermsPage() {
  return <LegalDocument title="Terms of Service" introduction="Use exégeomai for thoughtful study and responsible contributions. These terms cover accounts, educational limitations, directory authority, content rights, security, service changes, and your statutory protections." sections={sections} />;
}
