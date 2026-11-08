import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  key: { type: String, default: 'main', unique: true },
  agencyName: { type: String, default: 'WORKLANCERS' },
  agencyEmail: { type: String, default: '' },
  whatsappNumber: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  logo: { type: String, default: '' },
  social: { facebook: String, instagram: String, linkedin: String, twitter: String, github: String },
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
