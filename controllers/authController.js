const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

exports.register = async (req, res) => {
    try {
          

        const { username, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, role: "customer" });

        await user.save();
        res.status(201).json({ message: "User registered" });
        console.error("Registration error:", err);  // Add this
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for admin login
        if (username === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = jwt.sign({ username, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.json({ token, role: "admin" });
        }

        // Check for customer
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
