import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/PageSchema';
export const metadata = pageMetadata('/about');
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <><PageSchema path="/about" />{children}</>;
}
