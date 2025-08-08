import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  // Step 1: House Details
  title: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  price: {
    type: Number,
    
  },
  
  address: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  state: {
    type: String,
    
  },
  pinCode: {
    type: String,
    
  },

  // Step 2: Specifications
  bedrooms: {
    type: Number,
    
  },
  bathrooms: {
    type: Number,
    
  },
  squareFootage: {
    type: Number,
    
  },
  propertyType: {
    type: String,
    enum: ['Apartment', 'Villa', 'Independent House', 'Flat', 'Plot', 'Other'],
    
  },
  yearBuilt: {
    type: Number,
    
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
    
  },
  contactEmail: {
    type: String,
    
  },
  contactPhone: {
    type: String,
    
  },
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    
  },

},{  timestamps: true});

export default mongoose.model('Listing', listingSchema);
