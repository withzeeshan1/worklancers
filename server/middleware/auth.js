import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { ApiError, asyncHandler } from '../utils/asyncHandler.js';

async function resolveAdmin(req) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return null;
  try {
    const { id } = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    return await Admin.findById(id);
  } catch { return null; }
}

export const protect = asyncHandler(async (req, _res, next) => {
  const admin = await resolveAdmin(req);
  if (!admin) throw new ApiError(401, 'Not authorized. Please log in.');
  req.admin = admin;
  next();
});

// Attaches req.admin when a valid token is present, otherwise continues as public.
export const optionalAuth = asyncHandler(async (req, _res, next) => { req.admin = await resolveAdmin(req); next(); });

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.admin || !roles.includes(req.admin.role)) return next(new ApiError(403, 'Forbidden'));
  next();
};
