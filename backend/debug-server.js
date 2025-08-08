import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import upload from './Middleware/upload.js';

dotenv.config();

const app = express();
const PORT = 3002;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Debug server is running!' });
});

// Test upload without database
app.post('/test-upload', upload.array('images', 6), (req, res) => {
  try {
    console.log("=== DEBUG UPLOAD TEST ===");
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    console.log("Files count:", req.files?.length || 0);
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        message: "No images uploaded",
        error: 'NO_IMAGES_UPLOADED'
      });
    }

    const imageUrls = req.files.map(file => {
      console.log("File processed:", file.filename, "URL:", file.path);
      return file.path;
    });
    
    res.status(200).json({
      message: 'Images uploaded successfully to Cloudinary!',
      data: {
        uploadedImages: imageUrls,
        imageCount: req.files.length,
        formData: req.body
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: 'Upload failed',
      error: error.message
    });
  }
});

// Error handling
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({ 
    message: 'Server error', 
    error: error.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Debug server running on http://localhost:${PORT}`);
  console.log('Environment variables check:');
  console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET');
  console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET');
  console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET');
});