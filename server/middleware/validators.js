import { body } from 'express-validator';
import { LEAD_STATUSES } from '../models/Lead.js';

const str = (f, { min = 1, max = 200, optional = false } = {}) => {
  const c = body(f);
  return (optional ? c.optional({ values: 'falsy' }) : c).isString().withMessage(`${f} must be text`).trim().isLength({ min, max }).withMessage(`${f} must be ${min}-${max} characters`);
};

export const loginRules = [body('email').isEmail().withMessage('Valid email required').normalizeEmail(), body('password').isString().notEmpty().withMessage('Password required')];

export const leadRules = [
  str('fullName', { min: 2, max: 100 }), body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('phone').optional({ values: 'falsy' }).isString().trim().matches(/^[+\d][\d\s()-]{6,18}$/).withMessage('Valid phone number required'),
  str('companyName', { max: 120, optional: true }), str('service', { max: 120 }), str('budget', { max: 60, optional: true }), str('description', { min: 20, max: 4000 }),
];
export const leadStatusRules = [body('status').isIn(LEAD_STATUSES).withMessage(`status must be one of: ${LEAD_STATUSES.join(', ')}`)];

export const contactRules = [str('name', { min: 2, max: 100 }), body('email').isEmail().withMessage('Valid email required').normalizeEmail(), str('subject', { max: 150 }), str('message', { min: 10, max: 4000 })];

const arrayOfStrings = (f) => body(f).optional().isArray({ max: 50 }).withMessage(`${f} must be a list`);
export const serviceRules = () => [str('title', { max: 120 }), str('description', { max: 1000 }), arrayOfStrings('features'), arrayOfStrings('benefits'), arrayOfStrings('subServices')];
export const projectRules = () => [str('title', { max: 120 }), str('description', { max: 2000 }), str('category', { max: 80 }), arrayOfStrings('technologies'),
  body('liveUrl').optional({ values: 'falsy' }).isURL({ require_protocol: true, protocols: ['http', 'https'] }).withMessage('liveUrl must be a valid http(s) URL')];
export const blogRules = () => [str('title', { max: 160 }), str('excerpt', { max: 400 }), str('content', { min: 1, max: 100000 }), str('category', { max: 80 })];
// For PUT, every field is optional so partial updates (e.g. publish toggle) work.
// Rule sets are factories: each route gets fresh chains (chains are mutable, so sharing them leaks .optional() into POST).
export const optionalAll = (rules) => rules.map((r) => r.optional({ values: 'falsy' }));
