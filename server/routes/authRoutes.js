const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const otpController = require("../controllers/otpController");

console.log("AUTH:", authController);
console.log("OTP:", otpController);

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/google", authController.googleAuth);

router.post("/send-email-otp", otpController.sendEmailOTP);
router.post("/verify-email-otp", otpController.verifyEmailOTP);

module.exports = router;