// The site's public address, used for canonical links, sitemap.xml, robots.txt and Google data.
// These must be absolute (https://...), or Google treats them as broken relative links.
// Shared by the app (utils/config.js) and the build (vite.config.js).
export const DEFAULT_SITE_URL = 'https://worklancer.org';

// "worklancer.org", "https://worklancer.org/" and " https://worklancer.org " all become "https://worklancer.org".
export function normalizeSiteUrl(raw) {
  let url = String(raw ?? '').trim();
  if (!url) return DEFAULT_SITE_URL;
  if (!/^https?:\/\//i.test(url)) url = `${/^(localhost|127\.0\.0\.1)([:/]|$)/i.test(url) ? 'http' : 'https'}://${url}`;
  return url.replace(/\/+$/, '');
}
