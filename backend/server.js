const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const residentRoutes = require("./routes/residentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// 🔹 Middleware (MUST be before routes)
app.use(cors());
app.use(express.json()); // ✅ Ensures JSON request body is parsed

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reports", reportRoutes);

// 🔹 Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("✅ Backend is running! 🎉");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
