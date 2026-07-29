const Admin = require("../models/Admin");

const Movie = require("../models/Movie");
const Theatre = require("../models/Theatre");
const User = require("../models/User");
const Booking = require("../models/Booking");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateOTP, sendOTP } = require("../utils/sendOTP");




const registerAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    
    const otp = generateOTP();

    
    admin.otp = otp;
    admin.otpExpire = Date.now() + 5 * 60 * 1000;

    await admin.save();

   
    await sendOTP(admin.email, otp);

    return res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};











const verifyAdminOTP = async(req,res)=>{


try{


const {email,otp}=req.body;



const admin = await Admin.findOne({

email

});





if(!admin){


return res.status(404).json({

success:false,

message:"Admin not found"

});

}





if(

admin.otp !== otp ||

admin.otpExpire < Date.now()

){


return res.status(400).json({

success:false,

message:"Invalid OTP"

});


}








const token = jwt.sign(

{

id:admin._id,

role:admin.role

},

process.env.JWT_SECRET,


{

expiresIn:"1d"

}

);








admin.otp=null;

admin.otpExpire=null;

admin.isVerified=true;



await admin.save();







res.json({

success:true,

message:"Login Successful",

token

});






}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



};












const getDashboardData = async(req,res)=>{


try{



const totalMovies = await Movie.countDocuments();


const totalTheatres = await Theatre.countDocuments();


const totalUsers = await User.countDocuments();


const totalBookings = await Booking.countDocuments();








const revenueData = await Booking.aggregate([


{

$match:{

paymentStatus:"Paid"

}

},



{

$group:{


_id:null,


totalRevenue:{

$sum:"$totalAmount"

}


}

}


]);






const revenue =

revenueData[0]?.totalRevenue || 0;








const bookingChart = await Booking.aggregate([


{

$group:{


_id:{

$dateToString:{

format:"%Y-%m-%d",

date:"$createdAt"

}

},


bookings:{

$count:{}

}


}

},



{

$sort:{

_id:1

}

}



]);









const revenueChart = await Booking.aggregate([


{

$match:{

paymentStatus:"Paid"

}

},



{

$group:{


_id:{

$month:"$createdAt"

},


revenue:{

$sum:"$totalAmount"

}


}

},



{

$sort:{

_id:1

}

}



]);









const topMovies = await Booking.aggregate([


{

$group:{


_id:"$movie",


tickets:{


$sum:{

$size:"$seats"

}


}


}

},



{

$sort:{

tickets:-1

}

},



{

$limit:5

},



{

$lookup:{


from:"movies",


localField:"_id",


foreignField:"_id",


as:"movie"


}

},



{

$unwind:"$movie"

}



]);









const recentBookings = await Booking.find()


.sort({

createdAt:-1

})


.limit(5)


.populate("user")

.populate("movie")

.populate("theatre")

.populate("showtime");









res.json({

success:true,

dashboard:{


totalMovies,

totalTheatres,

totalUsers,

totalBookings,

revenue,

bookingChart,

revenueChart,

topMovies,

recentBookings


}


});







}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



};


const getAdminProfile = async(req,res)=>{


try{


const admin = await Admin.findById(

req.admin.id

)

.select("-password -otp -otpExpire");


if(!admin){


return res.status(404).json({

success:false,

message:"Admin not found"

});


}


res.json({

success:true,

admin

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};

const updateAdminProfile = async(req,res)=>{


try{


const {

name,

phone

}=req.body;

const admin = await Admin.findByIdAndUpdate(

req.admin.id,

{

name,

phone

},

{

new:true

}

)

.select("-password -otp -otpExpire");

if(!admin){


return res.status(404).json({

success:false,

message:"Admin not found"

});


}

res.json({

success:true,

message:"Profile Updated Successfully",

admin

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};

const getAllAdmins = async (req, res) => {
  try {

    const admins = await Admin.find()
      .select("-password -otp -otpExpire")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      admins,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const deleteAdmin = async (req, res) => {
  try {

    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await Admin.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Admin deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const match = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    admin.password = hashedPassword;

    await admin.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  registerAdmin,
  adminLogin,
  verifyAdminOTP,
  getDashboardData,
  getAdminProfile,
  updateAdminProfile,
  getAllAdmins,
  deleteAdmin,
  changePassword,
};