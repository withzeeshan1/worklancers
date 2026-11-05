import Lead from '../models/Lead.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Settings from '../models/Settings.js';
import { ApiError, asyncHandler } from '../utils/asyncHandler.js';
import { pick } from '../utils/helpers.js';
import { uploadBuffer, uploadsConfigured } from '../utils/cloudinary.js';

export const stats = asyncHandler(async (_req, res) => {
  const [totalLeads, newLeads, projects, services, blogs] = await Promise.all([
    Lead.countDocuments(), Lead.countDocuments({ status: 'new' }), Project.countDocuments(), Service.countDocuments(), Blog.countDocuments(),
  ]);
  res.json({ success: true, data: { totalLeads, newLeads, projects, services, blogs } });
});

export const getSettings = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await Settings.findOneAndUpdate({ key: 'main' }, { $setOnInsert: { key: 'main' } }, { upsert: true, new: true }) });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const data = pick(req.body, ['agencyName', 'agencyEmail', 'whatsappNumber', 'phone', 'address', 'logo', 'social']);
  res.json({ success: true, data: await Settings.findOneAndUpdate({ key: 'main' }, data, { upsert: true, new: true, runValidators: true }) });
});

export const uploadImage = asyncHandler(async (req, res) => {
  if (!uploadsConfigured()) throw new ApiError(503, 'Image uploads are not configured. Set the CLOUDINARY_* environment variables.');
  if (!req.file) throw new ApiError(400, 'No image file provided (field name: image)');
  const result = await uploadBuffer(req.file.buffer);
  res.status(201).json({ success: true, url: result.secure_url });
});

export const sitemap = asyncHandler(async (_req, res) => {
  const base = (process.env.CLIENT_URL || '').split(',')[0].replace(/\/$/, '');
  const [services, projects, blogs] = await Promise.all([
    Service.find({ isPublished: true }, 'slug'), Project.find({ isPublished: true }, 'slug'), Blog.find({ isPublished: true }, 'slug'),
  ]);
  const urls = ['', '/about', '/services', '/portfolio', '/blog', '/contact',
    ...services.map((s) => `/services/${s.slug}`), ...projects.map((p) => `/portfolio/${p.slug}`), ...blogs.map((b) => `/blog/${b.slug}`)];
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${base}${u}</loc></url>`).join('\n')}\n</urlset>`);
});

export const robots = (_req, res) => {
  const base = (process.env.CLIENT_URL || '').split(',')[0].replace(/\/$/, '');
  res.type('text/plain').send(`User-agent: *\nDisallow: /admin\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
};
