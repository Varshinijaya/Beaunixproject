const express = require('express');
const router = express.Router();
const Order = require('../models/Order');



// Place a new order
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      items,
      total,
      address,
      paymentMethod
    } = req.body;

    // Basic validation
    if (!customerName || !items || !items.length || !total || !address || !paymentMethod) {
      return res.status(400).json({ message: "Missing or invalid order fields" });
    }

    const newOrder = new Order({
      customerName,
      items,
      total,
      address,
      paymentMethod
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({
      message: "Failed to place order",
      error: err.message
    });
  }
});



// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err });
  }
});
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});



// In orderRoutes.js
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err });
  }
});

// Get one order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order not found", error: err });
  }
});

// Update an order (e.g., status)
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err });
  }
});



module.exports = router;


