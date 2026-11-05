# WORKLANCERS - Digital Agency Website (MERN)

    worklancers/
      client/   React + Vite + Tailwind (public site + admin dashboard)
      server/   Node + Express + MongoDB API

## Requirements
Node.js 20+ and a MongoDB database (local, or a free MongoDB Atlas cluster).

## 1. Backend
    cd server
    npm install
    cp .env.example .env        # then edit .env
Set at minimum: MONGO_URI, JWT_SECRET (long random string), CLIENT_URL.
Create your admin account (there is no public registration):
set ADMIN_EMAIL and ADMIN_PASSWORD (10+ characters) in .env, then
    npm run seed
Remove ADMIN_PASSWORD from .env afterwards. Start the API:
    npm run dev                 # http://localhost:5000
Run the tests (needs a MongoDB; set TEST_MONGO_URI):
    npm test

## 2. Frontend
    cd client
    npm install
    cp .env.example .env
    npm run dev                 # http://localhost:5173
Admin dashboard: http://localhost:5173/admin/login

## Optional integrations (leave blank if unused)
- Image uploads: CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET. Without them uploads return a clear
  "not configured" error; you can paste image URLs instead.
- Email notifications for new inquiries: SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / MAIL_FROM / NOTIFY_EMAIL.
  Without them, inquiries are still saved and visible in the dashboard.

## Deployment (outline)
- API: any Node host (Render, Railway, VPS). Set the env vars above, NODE_ENV=production,
  CLIENT_URL = your website URL (comma-separate multiple origins).
- Client: `npm run build`, deploy `dist/` to Netlify/Vercel/any static host with SPA fallback
  (all routes -> index.html). Set VITE_API_URL to your API URL + /api before building.
- Serve /sitemap.xml and /robots.txt from the API domain or proxy them from the website domain.

## Current status
- Done and tested: backend API, admin dashboard, public pages, contact form -> database.
- Not yet done: public Services/Portfolio/Blog pages still read demo data from
  client/src/services/content.js instead of the API; Settings are saved but not yet shown on the public site.
