import { v2 as cloudinary } from 'cloudinary';

export const uploadsConfigured = () => Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

export function uploadBuffer(buffer, folder = 'worklancers') {
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (err, result) => (err ? reject(err) : resolve(result))).end(buffer);
  });
}
