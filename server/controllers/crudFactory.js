import { ApiError, asyncHandler } from '../utils/asyncHandler.js';
import { pick, uniqueSlug, escapeRegex } from '../utils/helpers.js';

// Public requests only ever see published documents. Admins may pass ?all=true.
export default function crudFactory(Model, { fields, filterFields = [], sort = { createdAt: -1 }, onCreate, onUpdate, populate }) {
  const visibility = (req) => (req.admin && req.query.all === 'true' ? {} : { isPublished: true });

  const list = asyncHandler(async (req, res) => {
    const q = { ...visibility(req) };
    filterFields.forEach((f) => { if (typeof req.query[f] === 'string' && req.query[f]) q[f] = req.query[f]; });
    if (typeof req.query.search === 'string' && req.query.search) q.title = new RegExp(escapeRegex(req.query.search), 'i');
    let query = Model.find(q).sort(sort);
    if (populate) query = query.populate(populate);
    const items = await query;
    res.json({ success: true, count: items.length, data: items });
  });

  const getBySlug = asyncHandler(async (req, res) => {
    let query = Model.findOne({ slug: req.params.slug, ...visibility(req) });
    if (populate) query = query.populate(populate);
    const item = await query;
    if (!item) throw new ApiError(404, 'Not found');
    res.json({ success: true, data: item });
  });

  const create = asyncHandler(async (req, res) => {
    const data = pick(req.body, fields);
    data.slug = await uniqueSlug(Model, req.body.slug || data.title);
    if (onCreate) await onCreate(data, req);
    res.status(201).json({ success: true, data: await Model.create(data) });
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) throw new ApiError(404, 'Not found');
    const data = pick(req.body, fields);
    if (req.body.slug && req.body.slug !== item.slug) data.slug = await uniqueSlug(Model, req.body.slug, item._id);
    if (onUpdate) await onUpdate(data, item, req);
    item.set(data);
    res.json({ success: true, data: await item.save() });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, 'Not found');
    res.json({ success: true, message: 'Deleted' });
  });

  return { list, getBySlug, create, update, remove };
}
