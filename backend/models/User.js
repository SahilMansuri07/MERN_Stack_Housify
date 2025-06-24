import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['guest', 'seller', 'buyer'],
    default: 'guest'
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User; 