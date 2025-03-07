const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Import routes
const authRoutes = require("./routes/authRoutes");
const residentRoutes = require("./routes/residentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reportRoutes = require("./routes/reportRoutes");
const hallRoutes = require("./routes/hallRoutes");
const floorRoutes = require("./routes/floorRoutes");
const bedRoutes = require("./routes/bedRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/halls", hallRoutes);
app.use("/api/floors", floorRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/payments", paymentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
