import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from './Middleware/upload.js';

dotenv.config();

// Get current directory (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
      console.log("File processed:", file.filename, "Local path:", file.path);
      // Create URL for accessing the image
      const imageUrl = `/uploads/images/${file.filename}`;
      return imageUrl;
    });
    
    res.status(200).json({
      message: 'Images uploaded successfully to local disk!',
      data: {
        uploadedImages: imageUrls,
        imageCount: req.files.length,
        formData: req.body,
        serverUrl: `http://localhost:${PORT}`
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
  console.log(`📁 Images served at http://localhost:${PORT}/uploads/images/`);
  console.log('Local storage setup completed!');
});