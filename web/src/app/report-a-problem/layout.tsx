import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/PageSchema';
export const metadata = pageMetadata('/report-a-problem');
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <><PageSchema path="/report-a-problem" />{children}</>;
}
