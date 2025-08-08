import mongoose from "mongoose";
import Listing from "../models/PropertiesModel/createprops.js";

// ✅ Create a new listing
const createListing = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    // Check if files exist
    const imageUrls = req.files?.map(file => file.path) || [];
    if (imageUrls.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const listing = await Listing.create({
      ...req.body,
      userReference: userId,
      images: imageUrls,
    });
    console.log("REQ FILES", req.files);
console.log("REQ BODY", req.body);

    res.status(201).json({
      message: 'Listing created successfully',
      data: listing,
    });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({
      message: 'Error creating listing',
      error: error.message,
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

// ✅ Get all listings
const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error.message);
    res.status(500).json({ message: "Failed to fetch listings" });
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
};
