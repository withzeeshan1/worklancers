import { SITE } from '../utils/config';

// Google reCAPTCHA v3: invisible, no puzzles. Google scores each visitor in the background and
// Web3Forms checks that score server-side, using the SECRET key saved in the Web3Forms dashboard.
// Never put the secret key in this code or in any VITE_ variable: everything here is public.
//
// Google's script is loaded only once a visitor starts filling in a form (primeRecaptcha),
// so normal page views stay fast and don't contact Google at all.

const LOAD_TIMEOUT_MS = 10000;
const EXECUTE_TIMEOUT_MS = 10000;
let pending;

const withTimeout = (promise, ms, message) => Promise.race([
  promise,
  new Promise((_, reject) => { setTimeout(() => reject(new Error(message)), ms); }),
]);

export const recaptchaEnabled = () => Boolean(SITE.recaptchaSiteKey);

export function loadRecaptcha() {
  if (typeof window === 'undefined' || !recaptchaEnabled()) return Promise.reject(new Error('reCAPTCHA is not available'));
  pending ??= withTimeout(new Promise((resolve, reject) => {
    const whenReady = () => (window.grecaptcha?.ready ? window.grecaptcha.ready(() => resolve(window.grecaptcha)) : reject(new Error('reCAPTCHA failed to start')));
    if (window.grecaptcha?.ready) return whenReady();
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE.recaptchaSiteKey)}`;
    script.async = true;
    script.onload = whenReady;
    script.onerror = () => { script.remove(); reject(new Error('reCAPTCHA could not load')); };
    document.head.appendChild(script);
  }), LOAD_TIMEOUT_MS, 'reCAPTCHA took too long to load').catch((e) => { pending = undefined; throw e; });
  return pending;
}

// Start loading early (on first focus inside a form) so submitting isn't delayed.
export function primeRecaptcha() {
  if (recaptchaEnabled()) loadRecaptcha().catch(() => { /* retried on submit */ });
}

// A fresh token for one submission. Tokens expire after 2 minutes, so call this at submit time.
// `action` names the form in the reCAPTCHA admin console (letters, numbers, / and _ only).
export async function getRecaptchaToken(action) {
  const grecaptcha = await loadRecaptcha();
  const token = await withTimeout(
    Promise.resolve(grecaptcha.execute(SITE.recaptchaSiteKey, { action: String(action).replace(/[^A-Za-z0-9/_]/g, '_') })),
    EXECUTE_TIMEOUT_MS, 'reCAPTCHA did not respond',
  );
  if (!token) throw new Error('reCAPTCHA returned no token');
  return token;
}
