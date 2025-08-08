// routes/listing.routes.js
import express from 'express';
import {
  createListing,
  editListing,
  deleteListing,
  getAllListings,
  getOneListing,
} from '../controllers/listing.controller.js';

import authenticateToken from '../Middleware/authenticateToken.js';
import authorizeRole from '../Middleware/authorizeRole.js';
import upload from '../Middleware/upload.js';

const router = express.Router();

// Public
router.get('/', getAllListings);
router.get('/:id', getOneListing);

// Protected for sellers
router.post(
  '/create',
  authenticateToken,
  authorizeRole('seller'),
  upload.array('images', 6), // Must match frontend key
  createListing
);

router.put('/:id', authenticateToken, authorizeRole('seller'), editListing);
router.delete('/:id', authenticateToken, authorizeRole('seller'), deleteListing);

export default router;
