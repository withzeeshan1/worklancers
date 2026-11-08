export const SITE = {
  name: 'WORKLANCERS',
  tagline: 'We Build. We Design. We Grow.',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'info@worklancers.com',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '923356665416',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || '',
};
export const whatsappLink = (text = 'Hello Worklancers, I would like to discuss a project.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
