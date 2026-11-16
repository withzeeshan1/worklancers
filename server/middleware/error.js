export const notFound = (req, _res, next) => { const e = new Error(`Not found: ${req.originalUrl}`); e.status = 404; next(e); };

export function errorHandler(err, _req, res, _next) {
  let status = err.status || 500;
  let message = err.message || 'Server error';
  if (err.name === 'ValidationError') { status = 400; message = Object.values(err.errors).map((e) => e.message).join(', '); }
  if (err.name === 'CastError') { status = 400; message = 'Invalid id'; }
  if (err.code === 11000) { status = 409; message = `${Object.keys(err.keyValue || {})[0] || 'value'} already exists`; }
  if (err.name === 'MulterError') { status = 400; }
  if (status >= 500) { console.error(err); if (process.env.NODE_ENV === 'production') message = 'Server error'; }
  res.status(status).json({ success: false, message, ...(err.details && { errors: err.details }) });
}
