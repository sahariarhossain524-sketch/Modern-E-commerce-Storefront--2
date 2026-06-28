import { v2 as cloudinary } from 'cloudinary';
import { logger } from './logger';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo',
});

export const uploadImage = async (fileBuffer: Buffer, folder: string) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, format: 'webp', transformation: [{ width: 800, crop: 'limit' }] },
      (error, result) => {
        if (result) {
          logger.info(`Image uploaded to Cloudinary: ${result.secure_url}`);
          resolve(result);
        } else {
          logger.error('Cloudinary upload error', error);
          reject(error);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export default cloudinary;
