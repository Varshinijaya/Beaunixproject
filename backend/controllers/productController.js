const Product = require("../models/Product");

// Create
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, image } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock_quantity,
      image,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid product data", error: err.message });
  }
};

// Read with pagination, sort, filter
// Read all products (no pagination, for full frontend list)
exports.getProducts = async (req, res) => {
  const { sortBy = "createdAt", order = "desc", filter = "" } = req.query;

  const query = {
    name: { $regex: filter, $options: "i" }
  };

  try {
    const products = await Product.find(query).sort({ [sortBy]: order === "asc" ? 1 : -1 });

    res.json({ products }); // ✅ Removed pagination
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// Update
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




// Delete
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Check if product exists in orders before delete

    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
