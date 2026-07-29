const City = require("../models/City");


const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 });

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getPopularCities = async (req, res) => {
  try {
    const cities = await City.find({ isPopular: true }).sort({ name: 1 });

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCities,
  getPopularCities,
  getCityById,
};