const mongoose = require("mongoose");
const mockRooms = require('../mockData/roomData');

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

const RoomModel = mongoose.model("Room", RoomSchema);

// Add mock methods for testing
if (process.env.NODE_ENV === 'test' || process.env.USE_MOCK_DB === 'true') {
  RoomModel.find = async () => {
    return mockRooms;
  };
  
  RoomModel.findById = async (id) => {
    return mockRooms.find(room => room._id === id);
  };
  
  RoomModel.prototype.save = async function() {
    return this;
  };
}

module.exports = RoomModel;
