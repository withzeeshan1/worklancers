import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true, minlength: 10, select: false },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
}, { timestamps: true });

adminSchema.pre('save', async function hash() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});
adminSchema.methods.matchPassword = function match(plain) { return bcrypt.compare(plain, this.password); };

export default mongoose.model('Admin', adminSchema);
