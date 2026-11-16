import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// Self-hosted fonts (no request to Google Fonts, which was blocking the first paint).
import '@fontsource-variable/geist/wght.css';
import '@fontsource/geist-mono/latin-400.css';
import '@fontsource/geist-mono/latin-500.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import './index.css';
import App from './App.jsx';

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter><App /></BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Built pages arrive pre-rendered (see scripts/prerender.mjs), so attach to that HTML;
// in `npm run dev` the root is empty and we render from scratch.
const root = document.getElementById('root');
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
