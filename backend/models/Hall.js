const mongoose = require("mongoose");

const HallSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  capacity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Hall", HallSchema);
