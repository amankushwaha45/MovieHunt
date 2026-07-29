const Seat = require("../models/Seat");


const getSeatsByShow = async (req, res) => {
  try {
    const { showId } = req.params;

    const seats = await Seat.find({
      showtime: showId,
    });

    res.status(200).json({
      success: true,
      seats,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch seats",
    });

  }
};


const bookSeats = async (req, res) => {
  try {

    const { showId, seats } = req.body;

    await Seat.updateMany(
      {
        showtime: showId,
        seatNumber: { $in: seats },
      },
      {
        $set: {
          status: "booked",
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Seats booked successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Booking failed",
    });

  }
};

module.exports = {
  getSeatsByShow,
  bookSeats,
};