import Admin from '../models/Admin.js';
import { ApiError, asyncHandler } from '../utils/asyncHandler.js';
import { signToken } from '../utils/helpers.js';

export const login = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email }).select('+password');
  // Same message for unknown email and wrong password.
  if (!admin || !(await admin.matchPassword(req.body.password))) throw new ApiError(401, 'Invalid email or password');
  res.json({ success: true, token: signToken(admin._id), admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
});

export const me = (req, res) => res.json({ success: true, admin: { id: req.admin._id, name: req.admin.name, email: req.admin.email, role: req.admin.role } });
