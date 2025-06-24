import Seller from "../models/Seller.js";


const SellerSignup = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { agency_name, license_number, contact_number } = req.body;

    // Validate required fields
    if (!contact_number) {
      return res.status(400).json({ message: "Contact number is required" });
    }

    // Check if seller already exists for this user
    const existingSeller = await Seller.findOne({ user_id });
    if (existingSeller) {
      return res.status(409).json({ message: "Seller profile already exists for this user" });
    }

    // Create seller profile
    const newSeller = new Seller({
      user_id,
      agency_name: agency_name || null,
      license_number: license_number || null,
      contact_number,
      verified: false // default from schema, can omit explicitly
    });

    const seller = await newSeller.save();

    res.status(201).json({
      message: "Seller profile created successfully",
      seller
    });
  } catch (error) {
    console.error("Error creating seller profile:", error.message);
    res.status(500).json({
      message: "Failed to create seller profile",
      error: error.message
    });
  }
};


export default SellerSignup;