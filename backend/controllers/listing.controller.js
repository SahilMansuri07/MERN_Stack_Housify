import mongoose from "mongoose";
import Listing from "../models/PropertiesModel/createprops.js";

// ✅ Create a new listing (now goes to pending status)
const createListing = async (req, res) => {
  try {
    console.log("=== CREATE LISTING DEBUG INFO ===");
    console.log("User:", req.user);
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    console.log("Files count:", req.files?.length || 0);
    
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ 
        message: 'Unauthorized: User ID missing',
        error: 'MISSING_USER_ID'
      });
    }

    // Validate required fields
    const { title, description, price, location, propertyType } = req.body;
    if (!title || !description || !price || !location || !propertyType) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, description, price, location, propertyType',
        error: 'MISSING_REQUIRED_FIELDS'
      });
    }

    // Check if files exist and are valid
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        message: "At least one image is required",
        error: 'NO_IMAGES_UPLOADED'
      });
    }

    // Extract local file paths and create URLs
    const imageUrls = req.files.map(file => {
      console.log("Processing file:", file.filename, "Path:", file.path);
      // Create URL for accessing the image
      const imageUrl = `/uploads/images/${file.filename}`;
      return imageUrl;
    });

    console.log("Image URLs:", imageUrls);

    // Validate price
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({
        message: 'Price must be a valid positive number',
        error: 'INVALID_PRICE'
      });
    }

    const listingData = {
      title: title.trim(),
      description: description.trim(),
      price: numericPrice,
      location: location.trim(),
      propertyType,
      userReference: userId,
      images: imageUrls,
      // These fields are set by the model defaults:
      // status: 'pending' (default)
      // isPublished: false (default)
    };

    console.log("Creating listing with data:", listingData);

    const listing = await Listing.create(listingData);
    
    console.log("Listing created successfully:", listing._id);
    console.log("Listing status:", listing.status);

    res.status(201).json({
      message: 'Listing submitted successfully! It will be reviewed by our admin team before being published.',
      data: {
        ...listing.toObject(),
        statusInfo: {
          current: 'pending',
          message: 'Your listing is pending admin approval. You will be notified once it is reviewed.'
        }
      },
    });
  } catch (error) {
    console.error('=== CREATE LISTING ERROR ===');
    console.error('Error details:', error);
    console.error('Stack trace:', error.stack);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        error: 'VALIDATION_ERROR',
        details: validationErrors
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate entry detected',
        error: 'DUPLICATE_ERROR'
      });
    }
    
    res.status(500).json({
      message: 'Error creating listing',
      error: 'SERVER_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};



// ✅ Edit/Update an existing listing
const editListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user?.id;

    if (!listingId || !userId) {
      return res.status(400).json({ message: "Listing ID or User ID missing" });
    }

    const listing = await Listing.findOneAndUpdate(
      { _id: listingId, userReference: userId },
      { ...req.body },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found or unauthorized" });
    }

    res.status(200).json({
      message: "Listing updated successfully",
      data: listing,
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(400).json({
      message: "Error updating listing",
      error: error.message,
    });
  }
};

// ✅ Delete a listing
const deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user?.id;

    if (!listingId || !userId) {
      return res.status(400).json({ message: "Listing ID or User ID missing" });
    }

    const listing = await Listing.findOneAndDelete({
      _id: listingId,
      userReference: userId,
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found or unauthorized" });
    }

    res.status(200).json({
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(400).json({
      message: "Error deleting listing",
      error: error.message,
    });
  }
};

// ✅ Get all listings (public - only shows approved/published listings)
const getAllListings = async (req, res) => {
  try {
    const { page = 1, limit = 10, propertyType, minPrice, maxPrice, city } = req.query;
    const skip = (page - 1) * limit;

    // Build filter for public listings (only approved and published)
    const filter = { 
      status: 'approved',
      isPublished: true 
    };

    if (propertyType) {
      filter.propertyType = propertyType;
    }
    if (city) {
      filter.city = new RegExp(city, 'i'); // Case insensitive search
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const listings = await Listing.find(filter)
      .populate('userReference', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalListings = await Listing.countDocuments(filter);

    res.status(200).json({
      message: 'Published listings retrieved successfully',
      data: {
        listings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalListings / limit),
          totalListings,
          hasNext: page * limit < totalListings,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error("Error fetching listings:", error.message);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

// ✅ Get seller's own listings (includes all statuses for their own listings)
const getSellerListings = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ 
        message: 'Unauthorized: User ID missing',
        error: 'MISSING_USER_ID'
      });
    }

    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    // Build filter for seller's listings
    const filter = { userReference: userId };
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      filter.status = status;
    }

    const listings = await Listing.find(filter)
      .populate('adminReview.reviewedBy', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalListings = await Listing.countDocuments(filter);

    // Get status counts for seller dashboard
    const statusCounts = await Listing.aggregate([
      { $match: { userReference: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      message: 'Your listings retrieved successfully',
      data: {
        listings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalListings / limit),
          totalListings,
          hasNext: page * limit < totalListings,
          hasPrev: page > 1
        },
        statusSummary: statusCounts.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, { pending: 0, approved: 0, rejected: 0 })
      }
    });
  } catch (error) {
    console.error("Error fetching seller listings:", error.message);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
};

// ✅ Get one listing by ID with ObjectId validation
const getOneListing = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Listing ID format" });
  }

  try {
    const property = await Listing.findById(id);
    if (!property) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching listing:", error.message);
    res.status(500).json({ error: "Failed to fetch listing" });
  }
};

// ✅ Export all controller functions
export {
  createListing,
  editListing,
  deleteListing,
  getAllListings,
  getOneListing,
  getSellerListings, // New function for seller dashboard
};
