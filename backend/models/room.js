const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number
});

module.exports = mongoose.model("Room", roomSchema);