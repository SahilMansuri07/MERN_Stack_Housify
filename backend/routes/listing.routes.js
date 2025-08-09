// routes/listing.routes.js
import express from 'express';
import {
  createListing,
  editListing,
  deleteListing,
  getAllListings,
  getOneListing,
  getSellerListings,
} from '../controllers/listing.controller.js';

import authenticateToken from '../Middleware/authenticateToken.js';
import authorizeRole from '../Middleware/authorizeRole.js';
import upload, { handleMulterError } from '../Middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllListings);
router.get('/:id', getOneListing);

// Test route without authentication for debugging
router.post(
  '/test-upload',
  upload.array('images', 6),
  handleMulterError,
  async (req, res) => {
    try {
      console.log("=== TEST UPLOAD DEBUG ===");
      console.log("Body:", req.body);
      console.log("Files:", req.files);
      
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ 
          message: "No images uploaded",
          error: 'NO_IMAGES_UPLOADED'
        });
      }

      const imageUrls = req.files.map(file => {
        const imageUrl = `/uploads/images/${file.filename}`;
        return imageUrl;
      });
      
      res.status(200).json({
        message: 'Images uploaded successfully to local disk!',
        data: {
          uploadedImages: imageUrls,
          imageCount: req.files.length,
          formData: req.body,
          serverUrl: `http://localhost:3000`
        }
      });
    } catch (error) {
      console.error("Test upload error:", error);
      res.status(500).json({
        message: 'Test upload failed',
        error: error.message
      });
    }
  }
);

// Protected seller routes
router.post(
  '/create',
  authenticateToken,
  authorizeRole('seller'),
  upload.array('images', 6),
  handleMulterError,
  createListing
);

// Seller dashboard - get their own listings
router.get(
  '/seller/my-listings',
  authenticateToken,
  authorizeRole('seller'),
  getSellerListings
);

router.put('/:id', authenticateToken, authorizeRole('seller'), editListing);
router.delete('/:id', authenticateToken, authorizeRole('seller'), deleteListing);

export default router;
