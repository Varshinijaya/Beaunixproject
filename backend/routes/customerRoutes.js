// routes/customerRoutes.js

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/", customerController.getAllCustomers);

router.get('/', async (req, res) => {
  const users = await User.find({ role: 'customer' });
  res.json(users);
});

module.exports = router;
