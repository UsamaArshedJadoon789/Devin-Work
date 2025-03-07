const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now, required: true },
  paymentMethod: { type: String, required: true },
  receiptNumber: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "completed", "failed"], 
    default: "pending",
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
