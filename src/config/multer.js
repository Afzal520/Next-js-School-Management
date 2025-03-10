// filepath: /c:/e-commerce-new/backend/config/multerConfig.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_photos',
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

export default upload;