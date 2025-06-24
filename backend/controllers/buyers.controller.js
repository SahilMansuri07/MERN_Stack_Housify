import Buyers from "../models/Buyers.js";

const BuyersSignup = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { preferance, budget, location, contact_number } =
      req.body;

    // Validate required fields
    if ( !contact_number || !preferance || !budget || !location) {
      return res.status(400).json({ message: "Above details is Required" });
    }

    // Check if buyer already exists for this user
    const existingBuyer = await Buyers.findOne({ user_id });
    if (existingBuyer) {
      return res
        .status(409)
        .json({ message: "Buyer profile already exists for this user" });
    }

    // Create buyer profile
    const newBuyer = new Buyers({
      user_id,
      preferance,
      budget,
      location,
      contact_number,
      verified: false, // default from schema, can omit explicitly
    });

    const buyer = await newBuyer.save();

    res.status(201).json({
      message: "Buyer profile created successfully",
      buyer,
    });
  } catch (error) {
    console.error("Error creating buyer profile:", error.message);
    res.status(500).json({
      message: "Failed to create buyer profile",
      error: error.message,
    });
  }
};

export default BuyersSignup;
