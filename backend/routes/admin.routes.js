import express from 'express';
import {
  getPendingListings,
  getAllListingsAdmin,
  approveListing,
  rejectListing,
  getAnalytics,
  getListingForReview
} from '../controllers/admin.controller.js';

import authenticateToken from '../Middleware/authenticateToken.js';
import authorizeAdmin from '../Middleware/authorizeAdmin.js';

const router = express.Router();

// ✅ All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(authorizeAdmin);

// ✅ Analytics Dashboard
router.get('/analytics', getAnalytics);

// ✅ Listing Management
router.get('/listings/pending', getPendingListings);
router.get('/listings', getAllListingsAdmin);
router.get('/listings/:listingId', getListingForReview);

// ✅ Listing Actions
router.put('/listings/:listingId/approve', approveListing);
router.put('/listings/:listingId/reject', rejectListing);

export default router;