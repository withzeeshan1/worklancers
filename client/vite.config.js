import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { allRoutes } from './src/seo/routes.js'

// Writes sitemap.xml and robots.txt into the build, using VITE_SITE_URL as the domain.
function seoFiles(siteUrl) {
  const url = siteUrl.replace(/\/$/, '')
  const today = new Date().toISOString().slice(0, 10)
  const priority = (p) => (p === '/' ? '1.0' : p.split('/').length === 2 ? '0.8' : '0.6')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allRoutes.map((p) => `  <url><loc>${url}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`).join('\n')}\n</urlset>\n`
  return {
    name: 'seo-files',
    // client build only (not the server bundle used for pre-rendering)
    apply: (_config, env) => env.command === 'build' && !env.isSsrBuild,
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
