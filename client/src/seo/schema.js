// Structured data (schema.org JSON-LD) so search engines understand who Worklancers is
// and can show rich results (FAQs, breadcrumbs, articles).
import { SITE } from '../utils/config';

export const BRAND = 'Worklancers';
export const siteUrl = (path = '') => `${SITE.url.replace(/\/$/, '')}${path === '/' ? '' : path}`;
const ORG_ID = () => `${siteUrl()}/#organization`;

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID(),
    name: BRAND,
    alternateName: 'Worklancers Software House',
    description: 'Software house and digital agency building websites, custom software, mobile apps, e-commerce stores and AI automation for growing businesses.',
    url: siteUrl('/'),
    logo: siteUrl('/worklancer-logo.png'),
    image: siteUrl('/og-image.jpg'),
    email: SITE.email,
    telephone: `+${SITE.whatsapp}`,
    address: { '@type': 'PostalAddress', addressCountry: 'PK' },
    areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'Place', name: 'Worldwide' }],
    knowsAbout: ['Web development', 'Custom software development', 'Mobile app development', 'UI/UX design', 'Search engine optimization', 'E-commerce development', 'AI automation'],
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: SITE.email, telephone: `+${SITE.whatsapp}`, availableLanguage: ['English', 'Urdu'] },
  };
}

export function website() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteUrl()}/#website`, name: BRAND, url: siteUrl('/'), publisher: { '@id': ORG_ID() }, inLanguage: 'en' };
}

// items: [['Home', '/'], ['Services', '/services'], ...]
export function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl(path) })),
  };
}

export function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function serviceSchema({ name, description, path, offers = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    description,
    url: siteUrl(path),
    provider: { '@id': ORG_ID() },
    areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'Place', name: 'Worldwide' }],
    ...(offers.length && {
      hasOfferCatalog: { '@type': 'OfferCatalog', name, itemListElement: offers.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o } })) },
    }),
  };
}

export function blogPosting(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    author: { '@type': 'Organization', name: post.author || BRAND },
    publisher: { '@id': ORG_ID() },
    mainEntityOfPage: siteUrl(`/blog/${post.slug}`),
    image: siteUrl('/og-image.jpg'),
    inLanguage: 'en',
  };
}
