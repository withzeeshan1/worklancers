import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, lowercase: true, trim: true, match: /^\S+@\S+\.\S+$/ },
  subject: { type: String, required: true, trim: true, maxlength: 150 },
  message: { type: String, required: true, trim: true, maxlength: 4000 },
}, { timestamps: true });

contactSchema.index({ createdAt: -1 });

export default mongoose.model('Contact', contactSchema);
