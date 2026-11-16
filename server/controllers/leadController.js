import Lead, { LEAD_STATUSES } from '../models/Lead.js';
import { ApiError, asyncHandler } from '../utils/asyncHandler.js';
import { pick, escapeRegex } from '../utils/helpers.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createLead = asyncHandler(async (req, res) => {
  const fields = pick(req.body, ['fullName', 'email', 'phone', 'companyName', 'service', 'budget', 'description']);
  if (!fields.budget) delete fields.budget; // fall back to the schema default ("Not sure yet")
  const lead = await Lead.create(fields);
  // Email is best-effort: the lead is already saved, so a mail failure never loses the inquiry.
  sendEmail({
    subject: `New inquiry from ${lead.fullName} (${lead.service})`,
    text: `Name: ${lead.fullName}\nEmail: ${lead.email}\nPhone: ${lead.phone || '-'}\nCompany: ${lead.companyName || '-'}\nService: ${lead.service}\nBudget: ${lead.budget}\n\n${lead.description}`,
  });
  res.status(201).json({ success: true, message: 'Your request has been received. We will contact you soon.' });
});

export const listLeads = asyncHandler(async (req, res) => {
  const { search, service, status } = req.query;
  const q = {};
  if (typeof service === 'string' && service) q.service = service;
  if (typeof status === 'string' && LEAD_STATUSES.includes(status)) q.status = status;
  if (typeof search === 'string' && search) { const r = new RegExp(escapeRegex(search), 'i'); q.$or = [{ fullName: r }, { email: r }, { companyName: r }]; }
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
  const [data, total] = await Promise.all([Lead.find(q).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit), Lead.countDocuments(q)]);
  res.json({ success: true, total, page, pages: Math.ceil(total / limit), data });
});

export const getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) throw new ApiError(404, 'Lead not found');
  res.json({ success: true, data: lead });
});

export const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!lead) throw new ApiError(404, 'Lead not found');
  res.json({ success: true, data: lead });
});

export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) throw new ApiError(404, 'Lead not found');
  res.json({ success: true, message: 'Lead deleted' });
});
