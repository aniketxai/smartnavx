const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  rfid: { type: String, unique: true }
});

module.exports = mongoose.model("User", userSchema);