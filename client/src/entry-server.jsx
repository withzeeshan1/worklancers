// Used only at build time by scripts/prerender.mjs to turn each route into static HTML.
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

// With React 19, react-helmet-async renders <title>/<meta>/<link> as normal React elements and
// React emits them at the very start of the HTML. We lift them out so they go into <head>.
const LEADING_HEAD_TAGS = /^(?:<title\b[^>]*>[^<]*<\/title>|<meta\b[^>]*>|<link\b[^>]*>)+/;

async function renderOnce(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}><App /></StaticRouter>
      </HelmetProvider>
    </StrictMode>,
    // React normally moves large sections (> ~12 KB) to the end of the HTML to reveal them
    // progressively. For static pages we want all content in place, so never split.
    { progressiveChunkSize: Infinity },
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}

export async function render(url) {
  // Pages are lazy-loaded. On the first pass React meets a page whose code isn't loaded yet and writes
  // a placeholder plus a hidden copy of the content (revealed later by a script, which causes a big
  // layout shift and hides the text from crawlers). The first pass loads the code, so the second pass
  // writes the page content directly in place.
  await renderOnce(url);
  const html = await renderOnce(url);
  if (html.includes('<template id="B:')) throw new Error(`Page ${url} still has a pending placeholder after pre-render`);
  const head = html.match(LEADING_HEAD_TAGS)?.[0] ?? '';
  return { head: head.replace(/></g, '>\n    <'), html: html.slice(head.length) };
}
