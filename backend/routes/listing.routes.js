import express from 'express';
import { 
  createListing,
  editListing,
  deleteListing 
} from '../controllers/listing.controller.js';

import authenticateToken from '../Middleware/authenticateToken.js';
import authorizeRole from '../Middleware/authorizeRole.js';

const router = express.Router();

router.post('/create', authenticateToken, authorizeRole("seller"), createListing);

router.put('/edit/:id', authenticateToken, authorizeRole("seller"), editListing);

router.delete('/delete/:id', authenticateToken, authorizeRole("seller"), deleteListing);

export default router;
