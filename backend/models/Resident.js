const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
  title: String,
  name: String,
  fathersName: String,
  nicOrPassport: String,
  nationality: String,
  address: String,
  city: String,
  phoneResidence: String,
  phoneOffice: String,
  emergencyContact: String,
  stayFrom: Date,
  stayTo: Date,
  purposeOfStay: String,
  role: String,
  registrationNumber: String,
  department: String,
  semester: String,
  employeeId: String,
  organization: String,
  accompaniedBy: String,
  relation: String,
  referredBy: String,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null }, // ✅ Add this line
});

module.exports = mongoose.model("Resident", ResidentSchema);
