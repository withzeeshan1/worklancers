import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  icon: { type: String, default: 'Code2', trim: true },
  image: { type: String, default: '' },
  subServices: [{ type: String, trim: true }],
  features: [{ type: String, trim: true }],
  benefits: [{ type: String, trim: true }],
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

serviceSchema.index({ isPublished: 1, order: 1 });

export default mongoose.model('Service', serviceSchema);
