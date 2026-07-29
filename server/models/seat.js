const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },

    seatNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seat", seatSchema);