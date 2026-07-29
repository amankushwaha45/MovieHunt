const OTP = require("../models/OTP");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTP } = require("../utils/sendOTP");


const sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    
    const otp = generateOTP();

    
    await OTP.deleteMany({
      identifier: email,
      type: "email",
    });

    
    await OTP.create({
      identifier: email,
      otp,
      type: "email",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    });

   
    await sendOTP(email, otp);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


const verifyEmailOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const otpData = await OTP.findOne({
      identifier: email,
      otp,
      type: "email",
    });

    if (!otpData) {

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    }

    if (otpData.expiresAt < new Date()) {

      await OTP.deleteOne({ _id: otpData._id });

      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });

    }

    let user = await User.findOne({ email });

    if (!user) {

      user = await User.create({

        name: email.split("@")[0],

        email,

        isEmailVerified: true,

      });

    } else {

      user.isEmailVerified = true;

      await user.save();

    }

    await OTP.deleteOne({
      _id: otpData._id,
    });

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.json({

      success: true,

      token,

      user,

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};

module.exports = {

  sendEmailOTP,

  verifyEmailOTP,

};