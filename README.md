# WORKLANCERS - Digital Agency Website (static)

    worklancers/
      client/   The website: React + Vite + Tailwind + Framer Motion. Builds to plain static files.
      server/   Old Node/Express/MongoDB API + admin dashboard. NOT used by the static site.

The website needs no server or database. `npm run build` produces a `client/dist/` folder of
HTML/CSS/JS that you can upload to any web host.

## Run locally
    cd client
    npm install
    cp .env.example .env        # then edit .env
    npm run dev                 # http://localhost:5173

## Settings (client/.env)
- `VITE_SITE_URL`: your live domain, e.g. https://www.worklancers.com (used for SEO, sitemap.xml, robots.txt).
- `VITE_CONTACT_EMAIL`, `VITE_WHATSAPP_NUMBER`: shown on the site (WhatsApp number in international format, digits only).
- `VITE_WEB3FORMS_KEY`: free key from https://web3forms.com (sign up with the email that should receive leads).
  With a key, every form (contact, free audit, software estimate) is emailed to you.
  Without a key, the forms show a "Send on WhatsApp" button with the visitor's details pre-filled.

Settings are baked in at build time, so rebuild after changing `.env`.

## Deploy
    cd client
    npm run build               # output: client/dist/

Upload the **contents** of `client/dist/` (including the hidden `.htaccess` file) to your host:
- **cPanel / Apache / MAMP:** upload to `public_html/` (or the htdocs root). `.htaccess` makes links like
  /services/web-development work on refresh. The site must be at the domain root, not in a subfolder.
- **Netlify:** drag and drop the `dist` folder (the included `_redirects` file handles links).
- **Vercel:** import the repo with root directory `client` (the included `vercel.json` handles links).

## Editing content
All text for services, portfolio, blog posts, FAQs and the home page promises is in
`client/src/services/content.js`. The custom software landing page text is at the top of
`client/src/pages/CustomSoftware.jsx`. Add real client reviews to `testimonials` in `content.js`
and the testimonials section appears automatically.
