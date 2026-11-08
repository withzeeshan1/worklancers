import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

const { ADMIN_NAME = 'Admin', ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) { console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env first.'); process.exit(1); }
if (ADMIN_PASSWORD.length < 10) { console.error('ADMIN_PASSWORD must be at least 10 characters.'); process.exit(1); }

await connectDB();
if (await Admin.exists({ email: ADMIN_EMAIL.toLowerCase() })) console.log('Admin already exists. Nothing changed.');
else { await Admin.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'superadmin' }); console.log(`Admin created: ${ADMIN_EMAIL}`); }
await mongoose.disconnect();
