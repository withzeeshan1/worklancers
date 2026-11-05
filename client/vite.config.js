import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { services, projects, posts } from './src/services/content.js'

// Writes sitemap.xml and robots.txt into the build, using VITE_SITE_URL as the domain.
function seoFiles(siteUrl) {
  const url = siteUrl.replace(/\/$/, '')
  const paths = ['/', '/about', '/services', '/custom-software', '/portfolio', '/blog', '/contact',
    ...services.map((s) => `/services/${s.slug}`), ...projects.map((p) => `/portfolio/${p.slug}`), ...posts.map((p) => `/blog/${p.slug}`)]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${url}${p}</loc></url>`).join('\n')}\n</urlset>\n`
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n` })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return { plugins: [react(), seoFiles(env.VITE_SITE_URL || 'http://localhost:5173')] }
})
