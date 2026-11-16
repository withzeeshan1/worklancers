import Contact from '../models/Contact.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { pick } from '../utils/helpers.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createContact = asyncHandler(async (req, res) => {
  const c = await Contact.create(pick(req.body, ['name', 'email', 'subject', 'message']));
  sendEmail({ subject: `Contact: ${c.subject}`, text: `From: ${c.name} <${c.email}>\n\n${c.message}` });
  res.status(201).json({ success: true, message: 'Message received. Thank you!' });
});

export const listContacts = asyncHandler(async (_req, res) => {
  const data = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, count: data.length, data });
});
