const express = require("express");

const router = express.Router();



const {

    createBooking,

    getBookingById,

    getMyBookings,

    getAllBookings,

    updateBookingStatus,

    deleteBooking


} = require("../controllers/bookingController");



const { protect } = require("../middleware/authMiddleware");












router.post(

"/",

protect,

createBooking

);









router.get(

"/my",

protect,

getMyBookings

);









router.get(

"/:id",

protect,

getBookingById

);













router.get(

"/admin/all",

getAllBookings

);









router.put(

"/:id/status",

updateBookingStatus

);









router.delete(

"/:id",

deleteBooking

);








module.exports = router;