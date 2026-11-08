import multer from 'multer';

export default multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => (/^image\/(jpeg|png|webp|gif|svg\+xml)$/.test(file.mimetype) ? cb(null, true) : cb(new Error('Only image files are allowed'))),
});
