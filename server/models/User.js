const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    
    name:{
        type:String,
        required:true,
        trim:true
    },

    
    email:{
        type:String,
        unique:true,
        sparse:true,
        lowercase:true,
        trim:true
    },

    
    password:{
        type:String,
        default:null
    },

    
    googleId:{
        type:String,
        default:null
    },

    
    phone:{
        type:String,
        unique:true,
        sparse:true,
        default:null
    },

    
    isEmailVerified:{
        type:Boolean,
        default:false
    },

    
    isPhoneVerified:{
        type:Boolean,
        default:false
    },

    
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },

    
    isBlocked:{
        type:Boolean,
        default:false
    },

    
    profileImage:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);