import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/PageSchema';
export const metadata = pageMetadata('/how-it-works');
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <><PageSchema path="/how-it-works" />{children}</>;
}
