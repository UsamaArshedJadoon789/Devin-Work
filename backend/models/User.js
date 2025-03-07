const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },  // ✅ Ensure name is required
  email: { type: String, unique: true, required: true },  // ✅ Ensure email is required
  password: { type: String, required: true },  // ✅ Ensure password is required
  role: { type: String, enum: ["admin", "resident"], default: "resident" }
});

module.exports = mongoose.model("User", UserSchema);
