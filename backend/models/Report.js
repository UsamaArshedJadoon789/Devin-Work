const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  hall: String,
  income: { type: Number, default: 0 },
  occupancy: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", ReportSchema);
