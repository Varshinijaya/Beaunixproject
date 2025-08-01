const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// CREATE
router.post("/", productController.addProduct);

// READ ALL (with pagination, filter, etc.)
router.get("/", productController.getProducts);

// ✅ READ ONE (needed for edit functionality)
router.get("/:id", productController.getProductById);




// UPDATE
router.put("/:id", productController.updateProduct);

// DELETE
router.delete("/:id", productController.deleteProduct);



module.exports = router;


