// Used only at build time by scripts/prerender.mjs to turn each route into static HTML.
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

// With React 19, react-helmet-async renders <title>/<meta>/<link> as normal React elements and
// React emits them at the very start of the HTML. We lift them out so they go into <head>.
const LEADING_HEAD_TAGS = /^(?:<title\b[^>]*>[^<]*<\/title>|<meta\b[^>]*>|<link\b[^>]*>)+/;

export async function render(url) {
  // prerenderToNodeStream waits for every lazy page to load before producing HTML.
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}><App /></StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  const head = html.match(LEADING_HEAD_TAGS)?.[0] ?? '';
  return { head: head.replace(/></g, '>\n    <'), html: html.slice(head.length) };
}
