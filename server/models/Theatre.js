const mongoose = require("mongoose");



const seatLayoutSchema = new mongoose.Schema({

    category:{

        type:String,

        required:true

    },


    price:{

        type:Number,

        required:true

    },


    seats:[

        String

    ]

});







const screenSchema = new mongoose.Schema({


    screenName:{


        type:String,

        required:true


    },



    seatLayout:[

        seatLayoutSchema

    ]



});








const theatreSchema = new mongoose.Schema({


    name:{


        type:String,

        required:true


    },


    city:{


        type:String,

        required:true


    },


    address:{


        type:String,


        required:true


    },



    screens:[

        screenSchema

    ]




},{

timestamps:true

});








module.exports = mongoose.model(

"Theatre",

theatreSchema

);