const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

const router = express.Router();

// 🔹 Register Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // 🔒 Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("🚨 Register Error:", error);
        res.status(500).json({ message: "Server error." });
    }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
    console.log("📥 Login Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(400).json({ message: "User not found." });
        }

        console.log("🔎 User Found:", user);

        // 🔐 Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔑 Entered Password:", password);
        console.log("🔒 Stored Hashed Password:", user.password);
        console.log("✅ Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ Login Successful! Token Generated.");
        res.json({ token, message: "Login successful." });
    } catch (error) {
        console.error("🚨 Login Error:", error);
        res.status(500).json({ message: "Server error." });
    }
});

// Profile management routes
router.get("/profile", auth, authController.getProfile);
router.put("/profile", auth, upload.single("profilePicture"), authController.updateProfile);
router.put("/change-password", auth, authController.updatePassword);

module.exports = router;
