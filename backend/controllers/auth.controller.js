// controllers/auth.controller.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ==================== Signup ====================
export const AuthSignup = async (req, res) => {
  try {
    console.log("Signup request:", req.body);

    const { username, password, email, role } = req.body;

    // Optional: validate role
    if (!['buyer', 'seller', 'guest'].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be buyer, seller, or guest" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, role });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role
      }
    });
  } catch (error) {
    console.error("❌ Error saving user:", error.message);
    res.status(500).json({ message: "Failed to save user", error: error.message });
  }
};

// ==================== Login ====================
export const AuthLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Get role from user
    const { role } = validUser;
    if (!role) {
      return res.status(400).json({ message: "User role is not defined" });
    }

    // Create JWT
    const token = jwt.sign({ id: validUser._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("accesstoken", token, { httpOnly: true });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: validUser._id,
        username: validUser.username,
        email: validUser.email,
        role: validUser.role  // ✅ FIXED typo here
      }
    });

  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};
