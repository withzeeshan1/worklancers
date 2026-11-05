import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  category: { type: String, required: true, trim: true, maxlength: 80 },
  technologies: [{ type: String, trim: true }],
  image: { type: String, default: '' },
  gallery: [{ type: String }],
  liveUrl: { type: String, default: '', trim: true, validate: { validator: (v) => !v || /^https?:\/\//i.test(v), message: 'liveUrl must start with http:// or https://' } },
  isDemo: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

projectSchema.index({ isPublished: 1, category: 1 });
projectSchema.index({ isFeatured: 1 });

export default mongoose.model('Project', projectSchema);
