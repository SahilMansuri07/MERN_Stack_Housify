import express from "express";
import { AuthLogin, AuthSignup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",AuthSignup); 
router.post("/login",AuthLogin); 

export default router;