import type { MetadataRoute } from 'next';
import { pages, SITE_URL, SITE_UPDATED } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(pages).map(path => ({
    url: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified: new Date(`${SITE_UPDATED}T00:00:00Z`),
  }));
}
