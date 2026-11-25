import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { allRoutes } from './src/seo/routes.js'
import { securityHeadersFor } from './security-headers.js'
import { normalizeSiteUrl } from './src/utils/siteUrl.js'

// Writes sitemap.xml and robots.txt into the build, using VITE_SITE_URL as the domain.
function seoFiles(siteUrl) {
  const url = normalizeSiteUrl(siteUrl)
  const today = new Date().toISOString().slice(0, 10)
  const priority = (p) => (p === '/' ? '1.0' : p === '/privacy-policy' ? '0.3' : p.split('/').length === 2 ? '0.8' : '0.6')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allRoutes.map((p) => `  <url><loc>${url}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`).join('\n')}\n</urlset>\n`
  return {
    name: 'seo-files',
    // client build only (not the server bundle used for pre-rendering)
    apply: (_config, env) => env.command === 'build' && !env.isSsrBuild,
    buildStart() {
      console.log(`\nSite address for SEO links: ${url}`)
      if (/localhost|127\.0\.0\.1/.test(url)) this.warn(`VITE_SITE_URL is ${url}: canonical links and sitemap.xml will point to this computer. Set the live domain before uploading.`)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n` })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // `vite preview` sends the production security headers (minus HTTPS-only ones) so they can be tested locally.
  const { 'Strict-Transport-Security': _hsts, ...previewHeaders } = securityHeadersFor(env)
  previewHeaders['Content-Security-Policy'] = previewHeaders['Content-Security-Policy'].replace('; upgrade-insecure-requests', '')
  return { plugins: [react(), seoFiles(env.VITE_SITE_URL)], preview: { headers: previewHeaders } }
})
