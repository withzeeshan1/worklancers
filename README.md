# WORKLANCER - Digital Agency Website (static)

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
- `VITE_SITE_URL`: your live domain, https://worklancer.org (used for SEO, sitemap.xml, robots.txt).
- `VITE_CONTACT_EMAIL`, `VITE_WHATSAPP_NUMBER`: shown on the site (WhatsApp number in international format, digits only).
- `VITE_WEB3FORMS_KEY`: free key from https://web3forms.com (sign up with the email that should receive leads).
  With a key, every form (contact, free audit, software estimate) is emailed to you.
  Without a key, the forms show a "Send on WhatsApp" button with the visitor's details pre-filled.
- `VITE_RECAPTCHA_ENABLED` (default `false`) and `VITE_RECAPTCHA_SITE_KEY`: Google reCAPTCHA **v3** on all three forms.
  **Only works with Web3Forms Pro:** on the free plan Web3Forms refuses every submission that carries a
  reCAPTCHA token ("You are trying to use a Pro feature"), so it is switched off by default. To turn it on:
  1. Upgrade Web3Forms to Pro. In its dashboard open the form's Settings, choose **recaptcha** as the
     captcha provider, paste the **secret key** and save.
  2. In the Google reCAPTCHA admin (https://www.google.com/recaptcha/admin), list your live domain
     (and `localhost` if you want to test locally).
  3. Set `VITE_RECAPTCHA_ENABLED=true` (hosting settings or `.env`) and rebuild, or change the default in
     `src/utils/config.js`. The site key (public) has a default in the same file.
  If Web3Forms ever answers "Pro feature" again (for example an expired plan), the form re-sends without
  the token, so leads keep arriving.
  **Never put the secret key in `.env` or anywhere in this repository:** everything in the site's code is public.
  If reCAPTCHA can't load (ad blocker) or flags a visitor, the form hands their message to WhatsApp instead.
- `VITE_CF_ANALYTICS_TOKEN` (default empty = no analytics): Cloudflare Web Analytics, free visitor statistics
  without cookies (so no cookie banner). In Cloudflare: Analytics & Logs > Web Analytics > Add a site >
  `worklancer.org`, choose the JavaScript snippet (the domain doesn't need to use Cloudflare) and copy the
  `token` value from it. Set it in the hosting settings and redeploy: the build then allows Cloudflare in the
  security headers, loads the counter after each page has loaded, and the Privacy Policy mentions it.

Settings are baked in at build time, so rebuild after changing `.env`.

## Deploy
    cd client
    npm run build               # output: client/dist/

After a deploy is live, tell Bing/Yandex (IndexNow) to re-crawl the pages:

    npm run indexnow            # submits every URL in the live sitemap.xml

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

After adding or replacing a photo in `client/public/images/`, make its phone-size copies:

    cd client
    npm run images              # needs cwebp (macOS: brew install webp)

It writes smaller WebP copies (`name-480w.webp`, `-800w`, `-1200w`) next to each photo and lists them
in `src/utils/image-srcsets.json`, so phones download a small image instead of the desktop one.
Commit the copies too. A photo without copies still works; it just isn't resized.
