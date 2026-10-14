import { pages, SITE_URL, SITE_UPDATED } from '@/lib/seo';
export function PageSchema({ path }: { path: string }) {
  const page = pages[path];
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const graph = [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: 'en', dateModified: SITE_UPDATED,
      isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#organization` } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...(path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.title, item: url }]),
    ] },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }} />;
}
