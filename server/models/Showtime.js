const mongoose = require("mongoose");


const showtimeSchema = new mongoose.Schema({

    movie: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Movie",

        required: true

    },


    theatre: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Theatre",

        required: true

    },


    city: {

        type:String,

        required:true

    },


    screen: {

        type:String,

        required:true

    },


    date: {

        type:Date,

        required:true

    },


    time: {

        type:String,

        required:true

    },


    ticketPrice: {

        type:Number,

        required:true

    },


    totalSeats: {

        type:Number,

        default:100

    },


    bookedSeats:[

        {

            type:String

        }

    ]


},{

    timestamps:true

});



module.exports = mongoose.model(
    "Showtime",
    showtimeSchema
);