# WORKLANCERS - Frontend

React + Vite + Tailwind CSS public website.

## Run locally
    npm install
    npm run dev        # http://localhost:5173

## Build
    npm run build      # output in dist/ (needs SPA fallback to index.html on the host)

## Configuration (copy .env.example to .env)
- VITE_API_URL            Backend API base URL (default http://localhost:5000/api)
- VITE_SITE_URL           Public site URL
- VITE_CONTACT_EMAIL      Shown on Contact page / footer
- VITE_WHATSAPP_NUMBER    Digits only with country code, e.g. 923001234567

Note: services, portfolio and blog currently use demo data in src/services/content.js.
The contact form posts to the backend (POST /leads); without the backend it shows an error.
