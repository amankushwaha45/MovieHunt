const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("⚠️ MONGO_URI not set. Continuing without MongoDB for local demo mode.");
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    });

    console.log("✅ MongoDB Connected");
    return true;
  } catch (error) {
    console.warn("⚠️ Database Connection Error:", error.message);
    return false;
  }
};

module.exports = connectDB;