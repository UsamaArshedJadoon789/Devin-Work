const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  hall: { type: String, required: true },
  floor: { type: String, required: true },
  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["available", "occupied"], 
    default: "available",
    required: true 
  },
  bookedBy: { type: String },
  arrivalDate: { type: Date },
  departureDate: { type: Date },
  cnic: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Room", RoomSchema);
