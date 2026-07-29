const Booking = require("../models/Booking");







const createBooking = async (req, res) => {


    try {


        const {
            movie,
            theatre,
            showtime,
            seats,
            totalAmount,
        } = req.body;





        

        const existingBooking = await Booking.findOne({

            showtime,

            seats: {
                $in: seats
            },

            bookingStatus:"Confirmed"

        });





        if(existingBooking){


            return res.status(400).json({

                success:false,

                message:"One or more seats already booked"

            });


        }








        const booking = await Booking.create({

            user:req.user.id,

            movie,

            theatre,

            showtime,

            seats,

            totalAmount,

            paymentStatus:"Pending",

            bookingStatus:"Pending"

        });







        res.status(201).json({

            success:true,

            message:"Booking Created Successfully",

            booking

        });





    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};












const getMyBookings = async(req,res)=>{


    try{


        const bookings = await Booking.find({

            user:req.user.id

        })


        .populate("movie")

        .populate("theatre")

        .populate("showtime")


        .sort({

            createdAt:-1

        });







        res.status(200).json({

            success:true,

            count:bookings.length,

            bookings

        });



    }


    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};














const getBookingById = async(req,res)=>{


    try{


        const booking = await Booking.findById(

            req.params.id

        )


        .populate(

            "user",

            "name email"

        )


        .populate("movie")

        .populate("theatre")

        .populate("showtime");







        if(!booking){


            return res.status(404).json({

                success:false,

                message:"Booking Not Found"

            });


        }







        res.status(200).json({

            success:true,

            booking

        });





    }


    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};














const getAllBookings = async(req,res)=>{


    try{


        const bookings = await Booking.find()


        .populate(

            "user",

            "name email"

        )


        .populate(

            "movie",

            "title poster"

        )


        .populate(

            "theatre",

            "name city"

        )


        .populate("showtime")


        .sort({

            createdAt:-1

        });







        res.status(200).json({

            success:true,

            count:bookings.length,

            bookings

        });





    }


    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};













const updateBookingStatus = async(req,res)=>{


    try{


        const {

            bookingStatus,

            paymentStatus

        } = req.body;







        const booking = await Booking.findByIdAndUpdate(

            req.params.id,

            {

                bookingStatus,

                paymentStatus

            },

            {

                new:true

            }

        );








        if(!booking){


            return res.status(404).json({

                success:false,

                message:"Booking Not Found"

            });


        }








        res.status(200).json({

            success:true,

            message:"Booking Updated Successfully",

            booking

        });






    }


    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};














const deleteBooking = async(req,res)=>{


    try{


        const booking = await Booking.findByIdAndDelete(

            req.params.id

        );






        if(!booking){


            return res.status(404).json({

                success:false,

                message:"Booking Not Found"

            });


        }








        res.status(200).json({

            success:true,

            message:"Booking Deleted Successfully"

        });






    }


    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};











module.exports = {


    createBooking,

    getMyBookings,

    getBookingById,

    getAllBookings,

    updateBookingStatus,

    deleteBooking


};