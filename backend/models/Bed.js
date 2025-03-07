const mongoose = require("mongoose");

const BedSchema = new mongoose.Schema({
  number: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  status: { 
    type: String, 
    enum: ["available", "occupied"], 
    default: "available",
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bed", BedSchema);
