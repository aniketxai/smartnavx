const User = require("../models/user");
const Room = require("../models/room");
const Booking = require("../models/booking");
const AccessLog = require("../models/access");
const mongoose = require("mongoose");

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

  const conflict = await Booking.findOne({
    roomId: new mongoose.Types.ObjectId(roomId),
    startTime: { $lt: new Date(endTime) },
    endTime: { $gt: new Date(startTime) }
  });

  if (conflict) {
    return res.status(400).json({ msg: "Room already booked" });
  }

  const booking = new Booking({
    userId: user._id,
    roomId: new mongoose.Types.ObjectId(roomId),
    startTime: new Date(startTime),
    endTime: new Date(endTime)
  });

  await booking.save();
  res.json({ msg: "Booking successful" });
};

// Get bookings
exports.getBookings = async (req, res) => {
  const bookings = await Booking.find().populate("roomId");
  res.json(bookings);
};

// RFID Access Check (🔥 FINAL FIXED)
exports.checkAccess = async (req, res) => {
  try {
    const rfid = req.body?.rfid || req.query?.rfid;
    const roomId = req.body?.roomId || req.query?.roomId;

    console.log("RFID:", rfid);
    console.log("RoomId:", roomId);

    if (!rfid || !roomId) {
      return res.status(400).json({ access: false });
    }

    const user = await User.findOne({ rfid });
    console.log("User:", user);

    if (!user) {
      await AccessLog.create({ rfid, roomId, status: "denied" });
      return res.json({ access: false });
    }

    const now = new Date();
    console.log("Current Time:", now);

    const booking = await Booking.findOne({
      userId: user._id,
      roomId: new mongoose.Types.ObjectId(roomId),
      startTime: { $lte: now },
      endTime: { $gte: now }
    });

    console.log("Booking Found:", booking);

    if (booking) {
      await AccessLog.create({ rfid, roomId, status: "granted" });
      return res.json({ access: true });
    }

    await AccessLog.create({ rfid, roomId, status: "denied" });
    return res.json({ access: false });

  } catch (err) {
    console.error(err);
    res.status(500).json({ access: false });
  }
};