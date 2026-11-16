// NoSQL-injection guard (express-mongo-sanitize is incompatible with Express 5).
// Strips keys beginning with "$" or containing "." from the body/params, and rejects such keys in the query string.
const isBad = (k) => k.startsWith('$') || k.includes('.');

function clean(value) {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') {
    for (const k of Object.keys(value)) {
      if (isBad(k)) delete value[k]; else value[k] = clean(value[k]);
    }
  }
  return value;
}
const hasBadKey = (value) => value && typeof value === 'object' && Object.keys(value).some((k) => isBad(k) || hasBadKey(value[k]));

export default function sanitize(req, res, next) {
  if (req.body) req.body = clean(req.body);
  if (req.params) clean(req.params);
  if (hasBadKey(req.query)) return res.status(400).json({ success: false, message: 'Invalid query parameters' });
  next();
}
