const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  status: { type: String, default: 'Pending' },
  total: Number,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    phone: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
