import { useEffect } from 'react';
import { SITE } from '../utils/config';

// Cloudflare Web Analytics: counts visits without cookies, so no cookie banner is needed.
// Off until VITE_CF_ANALYTICS_TOKEN is set (the security headers only allow Cloudflare then too).
// Loads after the page has finished loading, so it never slows the page down.
export default function Analytics() {
  useEffect(() => {
    const token = SITE.cfAnalyticsToken;
    if (!token || document.querySelector('script[data-cf-beacon]')) return undefined;
    const add = () => {
      const script = document.createElement('script');
      script.defer = true;
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      script.dataset.cfBeacon = JSON.stringify({ token, spa: true }); // spa: count page changes inside the site
      document.body.appendChild(script);
    };
    if (document.readyState === 'complete') { add(); return undefined; }
    window.addEventListener('load', add, { once: true });
    return () => window.removeEventListener('load', add);
  }, []);
  return null;
}
