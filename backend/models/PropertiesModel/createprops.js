import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  // Step 1: House Details
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },

  // Step 2: Specifications
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  squareFootage: {
    type: Number,
    required: true,
  },
  propertyType: {
    type: String,
    enum: ['Apartment', 'Villa', 'Independent House', 'Flat', 'Plot', 'Other'],
    required: true,
  },
  yearBuilt: {
    type: Number,
    required: true,
  },
  features: {
    type: [String], 
    default: [],
  },

  // Step 3: Images
  images: {
    type: [String], // Store image URLs or file paths
    default: [],
  },

  // Step 4: Contact Info
  contactName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },

},{  timestamps: true});

export default mongoose.model('Listing', listingSchema);
