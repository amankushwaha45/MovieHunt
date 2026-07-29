const express = require("express");
const router = express.Router();

const {
  getAllCities,
  getPopularCities,
  getCityById,
} = require("../controllers/cityController");

router.get("/", getAllCities);
router.get("/popular", getPopularCities);
router.get("/:id", getCityById);

module.exports = router;