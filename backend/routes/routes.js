const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");

router.get("/rooms", controller.getRooms);
router.post("/book", controller.bookRoom);
router.get("/bookings", controller.getBookings);
router.post("/check-access", controller.checkAccess);

module.exports = router;