const mongoose = require("mongoose");

const accessSchema = new mongoose.Schema({
  rfid: String,
  roomId: String,
  time: { type: Date, default: Date.now },
  status: String
});

module.exports = mongoose.model("AccessLog", accessSchema);