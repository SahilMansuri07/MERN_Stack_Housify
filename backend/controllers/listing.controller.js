import Listing from "../models/PropertiesModel/createprops.js";

// Create a new listing
const createListing = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const listing = await Listing.create({
      ...req.body,
      userReference: userId,
    });

    res.status(201).json({
      message: "Listing created successfully",
      data: listing,
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(400).json({
      message: "Error creating listing",
      error: error.message,
    });
  }
};

// Edit/Update an existing listing
const editListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user?.id;

    if (!listingId || !userId) {
      return res.status(400).json({ message: "Listing ID or User ID missing" });
    }

    const listing = await Listing.findOneAndUpdate(
      { _id: listingId, userReference: userId }, // Make sure user owns the listing
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

// Delete a listing
const deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user?.id;

    if (!listingId || !userId) {
      return res.status(400).json({ message: "Listing ID or User ID missing" });
    }

    const listing = await Listing.findOneAndDelete({
      _id: listingId,
      userReference: userId, // Only delete if user owns it
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

export { createListing, editListing, deleteListing };
