import { Helmet } from 'react-helmet-async';
import { BRAND, siteUrl } from '../seo/schema';

const DEFAULT_TITLE = 'Worklancers | Software House & Web Development Company';
const DEFAULT_IMAGE = '/og-image.jpg';

// Per-page SEO tags: title, description, canonical URL, social share previews
// (WhatsApp / LinkedIn / Facebook / X) and optional JSON-LD structured data.
export default function Seo({ title, description, path = '/', image = DEFAULT_IMAGE, imageAlt, type = 'website', jsonLd, noindex = false, fullTitle }) {
  const pageTitle = fullTitle || (title ? `${title} | ${BRAND}` : DEFAULT_TITLE);
  const url = siteUrl(path);
  const img = image.startsWith('http') ? image : siteUrl(image);
  const data = [].concat(jsonLd || []);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'} />
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={BRAND} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt || pageTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={img} />

      {data.map((d, i) => <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>)}
    </Helmet>
  );
}
