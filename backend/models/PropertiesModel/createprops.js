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
    required: true,
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
    required: true,
  },

  // Step 5: Admin Approval Workflow
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminReview: {
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Admin who reviewed
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    rejectionReason: {
      type: String,
      default: null
    },
    adminNotes: {
      type: String,
      default: null
    }
  },
  
  // Visibility on main site
  isPublished: {
    type: Boolean,
    default: false // Only true when status is 'approved'
  },

},{  timestamps: true});

// Indexes for better query performance
listingSchema.index({ status: 1 });
listingSchema.index({ userReference: 1 });
listingSchema.index({ propertyType: 1 });
listingSchema.index({ isPublished: 1 });

export default mongoose.model('Listing', listingSchema);
