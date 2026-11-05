import { Helmet } from 'react-helmet-async';
import { SITE } from '../utils/config';

export default function Seo({ title, description, path = '' }) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE.url}${path}`} />
      <link rel="canonical" href={`${SITE.url}${path}`} />
    </Helmet>
  );
}
