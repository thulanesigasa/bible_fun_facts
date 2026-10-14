import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/PageSchema';
export const metadata = pageMetadata('/help');
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <><PageSchema path="/help" />{children}</>;
}
