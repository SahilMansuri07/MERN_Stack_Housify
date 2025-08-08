// backend/middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure local disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    const filename = `listing_${timestamp}_${originalName}${extension}`;
    cb(null, filename);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, JPEG, PNG, WEBP) are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 6 // Maximum 6 files
  }
});

// Error handling middleware for multer
export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File too large. Maximum size is 5MB per image.',
        error: 'FILE_TOO_LARGE'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        message: 'Too many files. Maximum 6 images allowed.',
        error: 'TOO_MANY_FILES'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: 'Unexpected field name. Use "images" as the field name.',
        error: 'UNEXPECTED_FIELD'
      });
    }
  }
  
  if (error.message === 'Only image files (JPG, JPEG, PNG, WEBP) are allowed!') {
    return res.status(400).json({
      message: 'Only image files (JPG, JPEG, PNG, WEBP) are allowed.',
      error: 'INVALID_FILE_TYPE'
    });
  }
  
  // General file upload errors
  return res.status(500).json({
    message: 'File upload error. Please try again.',
    error: 'UPLOAD_ERROR'
  });
};

export default upload;