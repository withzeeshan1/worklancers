import mongoose from 'mongoose';

export const LEAD_STATUSES = ['new', 'contacted', 'in-progress', 'won', 'lost'];

const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, lowercase: true, trim: true, match: /^\S+@\S+\.\S+$/ },
  phone: { type: String, trim: true, maxlength: 30, default: '' },
  companyName: { type: String, trim: true, maxlength: 120, default: '' },
  service: { type: String, required: true, trim: true, maxlength: 120 },
  budget: { type: String, trim: true, maxlength: 60, default: 'Not sure yet' },
  description: { type: String, required: true, trim: true, minlength: 20, maxlength: 4000 },
  status: { type: String, enum: LEAD_STATUSES, default: 'new' },
}, { timestamps: true });

leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ service: 1 });
leadSchema.index({ fullName: 'text', email: 'text', companyName: 'text' });

export default mongoose.model('Lead', leadSchema);
