const User = require("../models/user");
const Room = require("../models/room");
const Booking = require("../models/booking");
const AccessLog = require("../models/access");

// Get rooms
exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

// Book room
exports.bookRoom = async (req, res) => {
  const { rfid, roomId, startTime, endTime } = req.body;

  const user = await User.findOne({ rfid });
  if (!user) return res.status(400).json({ msg: "User not found" });

  // Check conflict
  const conflict = await Booking.findOne({
    roomId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime }
  });

  if (conflict) {
    return res.status(400).json({ msg: "Room already booked" });
  }

  const booking = new Booking({
    userId: user._id,
    roomId,
    startTime,
    endTime
  });

  await booking.save();
  res.json({ msg: "Booking successful" });
};

// Get bookings
exports.getBookings = async (req, res) => {
  const bookings = await Booking.find().populate("roomId");
  res.json(bookings);
};

// RFID access check (MOST IMPORTANT)
exports.checkAccess = async (req, res) => {
  const { rfid, roomId } = req.body;

  const user = await User.findOne({ rfid });
  if (!user) {
    await AccessLog.create({ rfid, roomId, status: "denied" });
    return res.json({ access: false });
  }

  const now = new Date();

  const booking = await Booking.findOne({
    userId: user._id,
    roomId,
    startTime: { $lte: now },
    endTime: { $gte: now }
  });

  if (booking) {
    await AccessLog.create({ rfid, roomId, status: "granted" });
    return res.json({ access: true });
  } else {
    await AccessLog.create({ rfid, roomId, status: "denied" });
    return res.json({ access: false });
  }
};