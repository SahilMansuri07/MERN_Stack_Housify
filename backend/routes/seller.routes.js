import express from 'express';
import  SellerSignup  from '../controllers/seller.controller.js';
import authenticateToken from '../Middleware/authenticateToken.js';
import authorizeRole from '../Middleware/authorizeRole.js';

const router = express.Router();

router.post('/seller',authenticateToken ,authorizeRole("seller") , SellerSignup);


export default router;