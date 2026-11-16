// Build step: renders every route to static HTML so search engines and link previews
// (WhatsApp, LinkedIn, Facebook) see real content and per-page tags without running JavaScript.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.jsx` (server bundle).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render } = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href);
const { allRoutes } = await import(pathToFileURL(path.join(root, 'src', 'seo', 'routes.js')).href);

// Page template from the client build, minus the generic title/description (each page sets its own).
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/\s*<meta name="description"[^>]*>/, '');

const fileFor = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);

async function write(route, file) {
  const { html, head } = await render(route);
  const page = template
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  const title = head.match(/<title[^>]*>([^<]*)/)?.[1] ?? '';
  console.log(`  ${route.padEnd(36)} -> ${file.padEnd(40)} ${title}`);
}

console.log(`Pre-rendering ${allRoutes.length} pages + 404:`);
for (const route of allRoutes) await write(route, fileFor(route));
await write('/404-page-not-found', '404.html');
fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
console.log('Done.');
