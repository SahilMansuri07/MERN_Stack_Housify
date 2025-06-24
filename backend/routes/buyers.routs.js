import express from 'express';
import  BuyersSignup  from '../controllers/buyers.controller.js';
import authenticateToken from '../Middleware/authenticateToken.js';
import authorizeRole from '../Middleware/authorizeRole.js';

const router = express.Router();

router.post('/buyers',authenticateToken ,authorizeRole("buyer") , BuyersSignup);


export default router;