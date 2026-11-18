// Single source of truth for the site's browser security headers.
// `npm run build` runs scripts/sync-security-headers.mjs, which writes these values into
// public/.htaccess (Apache/cPanel), public/_headers (Netlify) and vercel.json (Vercel),
// and `vite preview` sends them too, so they can be tested locally.

// Content Security Policy: only the site's own files may load or run.
// - Outside services the browser may contact: Web3Forms (contact forms) and Google reCAPTCHA
//   (only its /recaptcha/ paths, loaded once a visitor starts filling in a form).
// - style-src-elem 'self' blocks injected <style> blocks; style-src-attr allows the inline
//   style attributes set by the animation library. style-src is the fallback for older browsers.
const recaptchaScripts = 'https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/';
const recaptchaFrames = 'https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/';

export const csp = [
  "default-src 'self'",
  `script-src 'self' ${recaptchaScripts}`,
  "style-src 'self' 'unsafe-inline'",
  "style-src-elem 'self'",
  "style-src-attr 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com https://www.google.com/recaptcha/",
  "media-src 'none'",
  `frame-src ${recaptchaFrames}`,
  "worker-src 'none'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

// Browser features the site never needs are switched off for it and anything embedded in it.
const permissionsPolicy = [
  'accelerometer=()', 'autoplay=()', 'bluetooth=()', 'browsing-topics=()', 'camera=()', 'display-capture=()',
  'geolocation=()', 'gyroscope=()', 'hid=()', 'idle-detection=()', 'magnetometer=()', 'microphone=()',
  'midi=()', 'payment=()', 'publickey-credentials-get=()', 'screen-wake-lock=()', 'serial=()', 'usb=()',
  'xr-spatial-tracking=()',
].join(', ');

export const securityHeaders = {
  'Content-Security-Policy': csp,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': permissionsPolicy,
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
  // HTTPS only, for 2 years. Add "; includeSubDomains" once every subdomain also has HTTPS.
  'Strict-Transport-Security': 'max-age=63072000',
};
