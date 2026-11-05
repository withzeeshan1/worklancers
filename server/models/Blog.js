import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt: { type: String, required: true, trim: true, maxlength: 400 },
  content: { type: String, required: true },
  featuredImage: { type: String, default: '' },
  category: { type: String, required: true, trim: true, maxlength: 80 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  authorName: { type: String, default: 'Worklancers Team', trim: true },
  metaTitle: { type: String, trim: true, maxlength: 70, default: '' },
  metaDescription: { type: String, trim: true, maxlength: 170, default: '' },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

blogSchema.index({ isPublished: 1, publishedAt: -1 });
blogSchema.index({ category: 1 });

export default mongoose.model('Blog', blogSchema);
