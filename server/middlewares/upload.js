import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../configs/cloudinary.js';
import multer from 'multer';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cricbid',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mkv', 'avi', 'pdf']
    }
})

const upload = multer({ storage })

export default upload;