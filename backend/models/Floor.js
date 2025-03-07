const mongoose = require("mongoose");

const FloorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: "Hall", required: true },
  level: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Floor", FloorSchema);
