const express = require("express");

const router = express.Router();

const {
  registerAdmin,
  adminLogin,
  verifyAdminOTP,
  getDashboardData,
  getAdminProfile,
  updateAdminProfile,
  getAllAdmins,
  deleteAdmin,
  changePassword,
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");




router.post("/register", registerAdmin);


router.post("/login", adminLogin);


router.post("/verify-otp", verifyAdminOTP);


router.get(
  "/dashboard",
  adminAuth,
  getDashboardData
);


router.get(
  "/profile",
  adminAuth,
  getAdminProfile
);


router.put(
  "/profile",
  adminAuth,
  updateAdminProfile
);


router.put(
  "/change-password",
  adminAuth,
  changePassword
);




router.get(
  "/all",
  adminAuth,
  getAllAdmins
);


router.delete(
  "/:id",
  adminAuth,
  deleteAdmin
);

module.exports = router;