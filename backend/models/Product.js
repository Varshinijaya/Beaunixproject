const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  stock_quantity: { type: Number, required: true, min: 0 },
  image: String, // store image URL or path
}, { timestamps: true }); // includes createdAt, updatedAt

module.exports = mongoose.model("Product", productSchema);
