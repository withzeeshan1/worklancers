import { normalizeSiteUrl } from './siteUrl';

export const SITE = {
  name: 'WORKLANCERS',
  tagline: 'We Build. We Design. We Grow.',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'worklancer.org@gmail.com',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '923356665416',
  url: normalizeSiteUrl(import.meta.env.VITE_SITE_URL),
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || 'c7846b09-cd51-4d10-97f0-85c5e9142b5b',
  // Google reCAPTCHA v3 SITE key (public by design). The SECRET key belongs only in the Web3Forms dashboard.
  recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeJ1yMuAAAAAEHZhRZ4Hemu9PAY4-wqQ6gV8Zsm',
  // reCAPTCHA needs Web3Forms PRO: on the free plan Web3Forms refuses every submission that carries a
  // reCAPTCHA token. Switch this to true only after upgrading and saving the secret key in Web3Forms
  // (or set VITE_RECAPTCHA_ENABLED=true in the hosting settings).
  recaptchaEnabled: (import.meta.env.VITE_RECAPTCHA_ENABLED || 'false') === 'true',
};
export const whatsappLink = (text = 'Hello Worklancers, I would like to discuss a project.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
