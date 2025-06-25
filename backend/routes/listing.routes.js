import express from 'express';
import createListing from '../controllers/listing.controller.js';

import authenticateToken from '../Middleware/authenticateToken.js';
import authorizeRole from '../Middleware/authorizeRole.js';

const router = express.Router();

router.post('/create',authenticateToken ,authorizeRole("seller"),  createListing);

export default router;