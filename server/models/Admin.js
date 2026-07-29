const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({

    name:{

        type:String,

        required:true

    },


    email:{

        type:String,

        required:true,

        unique:true

    },


    password:{

        type:String,

        required:true

    },


    phone:{

        type:String,

        required:true

    },


    otp:{

        type:String,

        default:null

    },


    otpExpire:{

        type:Date,

        default:null

    },


    role:{

        type:String,

        default:"admin"

    },


    isVerified:{

        type:Boolean,

        default:false

    }



},{

    timestamps:true

});



module.exports = mongoose.model(

"Admin",

adminSchema

);