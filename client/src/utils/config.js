export const SITE = {
  name: 'WORKLANCERS',
  tagline: 'We Build. We Design. We Grow.',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'worklancer.org@gmail.com',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '923356665416',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || 'c7846b09-cd51-4d10-97f0-85c5e9142b5b',
};
export const whatsappLink = (text = 'Hello Worklancers, I would like to discuss a project.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
