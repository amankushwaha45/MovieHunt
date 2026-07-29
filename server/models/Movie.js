const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    // Large background image for Movie Details page
    banner: {
      type: String,
      default: "",
    },

    trailer: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      required: true,
    },
    city: {
  type: String,
  required: true,
  trim: true,
},

    genre: [
      {
        type: String,
      },
    ],

    format: {
      type: String,
      default: "2D",
    },

    duration: {
      type: String,
      required: true,
    },

    certificate: {
      type: String,
      default: "U",
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    // Movie Cast
    cast: [
      {
        name: String,
        image: String,
        role: String,
      },
    ],

    // Director
    director: {
      type: String,
      default: "",
    },

    // Producer
    producer: {
      type: String,
      default: "",
    },

    // Music
    musicDirector: {
      type: String,
      default: "",
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    isRecommended: {
      type: Boolean,
      default: true,
    },

    isLatest: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);