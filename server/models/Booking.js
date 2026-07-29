const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // Logged-in User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Movie
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    // Theatre
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },

    // Showtime
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },

    // Selected Seats
    seats: [
      {
        type: String,
        required: true,
      },
    ],

    // Total Price
    totalAmount: {
      type: Number,
      required: true,
    },

    // Payment Status
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // Booking Status
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    // Razorpay Payment ID
    paymentId: {
      type: String,
      default: "",
    },

    // Razorpay Order ID
    orderId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);