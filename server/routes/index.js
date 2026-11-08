import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { protect, optionalAuth, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import upload from '../middleware/upload.js';
import { loginRules, leadRules, leadStatusRules, contactRules, serviceRules, projectRules, blogRules, optionalAll } from '../middleware/validators.js';
import { login, me } from '../controllers/authController.js';
import { createLead, listLeads, getLead, updateLead, deleteLead } from '../controllers/leadController.js';
import { createContact, listContacts } from '../controllers/contactController.js';
import { stats, getSettings, updateSettings, uploadImage } from '../controllers/miscController.js';
import services from '../controllers/serviceController.js';
import projects from '../controllers/projectController.js';
import blogs from '../controllers/blogController.js';

const router = Router();
const admin = [protect, authorize('admin', 'superadmin')];
const strict = (max) => rateLimit({ windowMs: 15 * 60 * 1000, limit: max, standardHeaders: true, legacyHeaders: false, message: { success: false, message: 'Too many requests, please try again later.' }, skip: () => process.env.NODE_ENV === 'test' });

router.post('/auth/login', strict(10), loginRules, validate, login);
router.get('/auth/me', ...admin, me);

const content = (path, c, rules) => {
  router.get(`/${path}`, optionalAuth, c.list);
  router.get(`/${path}/:slug`, optionalAuth, c.getBySlug);
  router.post(`/${path}`, ...admin, rules(), validate, c.create);
  router.put(`/${path}/:id`, ...admin, optionalAll(rules()), validate, c.update);
  router.delete(`/${path}/:id`, ...admin, c.remove);
};
content('services', services, serviceRules);
content('projects', projects, projectRules);
content('blogs', blogs, blogRules);

router.post('/leads', strict(10), leadRules, validate, createLead);
router.get('/leads', ...admin, listLeads);
router.get('/leads/:id', ...admin, getLead);
router.put('/leads/:id', ...admin, leadStatusRules, validate, updateLead);
router.delete('/leads/:id', ...admin, deleteLead);

router.post('/contacts', strict(10), contactRules, validate, createContact);
router.get('/contacts', ...admin, listContacts);

router.get('/stats', ...admin, stats);
router.get('/settings', getSettings);
router.put('/settings', ...admin, updateSettings);
router.post('/upload', ...admin, upload.single('image'), uploadImage);

export default router;
