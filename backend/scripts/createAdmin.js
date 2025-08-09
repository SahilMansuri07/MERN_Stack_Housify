import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Connected to MongoDB');

    // Admin user details
    const adminData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123', // Change this to a secure password
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      $or: [
        { email: adminData.email },
        { username: adminData.username }
      ]
    });

    if (existingAdmin) {
      console.log('❌ Admin user already exists:');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create admin user
    const admin = new User({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('Username:', adminData.username);
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('Role:', adminData.role);
    console.log('');
    console.log('🔑 You can now login to the admin panel with these credentials');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the script
createAdmin();