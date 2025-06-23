// controllers/auth.controller.js
import User from '../models/User.js'; // must use default export from ES module
import bcrypt from 'bcryptjs'; // 🧪 for password hashing
import jwt from 'jsonwebtoken'; // 🔐 for token generation

export const AuthSignup = async (req, res) => {
  try {
    console.log("Signup request:", req.body); // 🧪 log incoming data

    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
     
    const newUser = new User({ username, password:hashedPassword, email });
    const savedUser = await newUser.save(); // 🔥 This line actually writes to MongoDB

   
    res.status(201).json({
      message: "User created successfully",
      user: savedUser
    });
  } catch (error) {
    console.error("❌ Error saving user:", error.message);
    res.status(500).json({ message: "Failed to save user", error: error.message });
  }
};

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

    const validPassword = await bcrypt.compare(password, validUser.password); // Fixed typo here
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res.cookie("accesstoken", token, { httpOnly: true }); // also fixed typo in cookie name
    res.status(200).json({ message: "Login successful", token }); // recommended to return a response
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};
