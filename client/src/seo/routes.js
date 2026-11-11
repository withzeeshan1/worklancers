// Every public URL on the site. Used by the sitemap and by the pre-render step,
// so a new service, project or blog post in content.js is picked up automatically.
import { services, projects, posts } from '../services/content.js';

export const staticRoutes = ['/', '/services', '/custom-software', '/portfolio', '/about', '/blog', '/contact'];

export const allRoutes = [
  ...staticRoutes,
  ...services.map((s) => `/services/${s.slug}`),
  ...projects.map((p) => `/portfolio/${p.slug}`),
  ...posts.map((p) => `/blog/${p.slug}`),
];
