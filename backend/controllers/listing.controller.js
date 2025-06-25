import Listing from "../models/PropertiesModel/createprops.js";

const createListing = async (req, res) => {
  try {
    // ✅ Attach user ID from authenticated user
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

export default createListing;
