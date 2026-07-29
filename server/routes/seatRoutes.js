const express = require("express");

const router = express.Router();

const {
  getSeatsByShow,
  bookSeats,
} = require("../controllers/seatController");

// Get all seats of a show
router.get("/:showId", getSeatsByShow);

// Book selected seats
router.post("/book", bookSeats);

module.exports = router;