// controllers/customerController.js

const User = require("../models/User");

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.status(200).json(customers);
  } catch (err) {
    console.error("Error fetching customers", err);
    res.status(500).json({ message: "Server error" });
  }
};
