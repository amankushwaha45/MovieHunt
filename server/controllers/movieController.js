const Movie = require("../models/Movie");

// ==========================================
// ADD MOVIE
// ==========================================

const addMovie = async (req, res) => {
  try {
    const movieData = {
      title: req.body.title,
      description: req.body.description,

      poster: req.file
        ? `/uploads/movies/${req.file.filename}`
        : "",

      language: req.body.language,
      city: req.body.city,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
      trailer: req.body.trailer || "",
      banner: req.body.banner || "",
      director: req.body.director || "",
      producer: req.body.producer || "",
      musicDirector: req.body.musicDirector || "",
      format: req.body.format || "2D",
      certificate: req.body.certificate || "U",

      genre: req.body.genre
        ? req.body.genre.split(",")
        : [],

      cast: req.body.cast
        ? req.body.cast.split(",").map((actor) => ({
            name: actor.trim(),
          }))
        : [],

      isTrending: req.body.isTrending || false,
      isLatest: req.body.isLatest || true,
      isRecommended: req.body.isRecommended || true,
    };

    const movie = await Movie.create(movieData);

    res.status(201).json({
      success: true,
      message: "Movie Added Successfully",
      movie,
    });

  } catch (error) {
    console.log("ADD MOVIE ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL MOVIES
// ==========================================

const getMovies = async (req, res) => {
  try {

    const movies = await Movie.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: movies.length,
      movies,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================================
// SEARCH MOVIES
// ==========================================

const searchMovies = async (req, res) => {
  try {

    const keyword = req.params.keyword?.trim();

    if (!keyword) {
      return res.status(200).json({
        success: true,
        count: 0,
        movies: [],
      });
    }

    const movies = await Movie.find({

      $or: [

        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          language: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          city: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          genre: {
            $elemMatch: {
              $regex: keyword,
              $options: "i",
            },
          },
        },

      ],

    }).sort({
      createdAt: -1,
    });

    res.status(200).json({

      success: true,
      count: movies.length,
      movies,

    });

  } catch (error) {

    console.log("SEARCH ERROR :", error);

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }
};

// ==========================================
// GET SINGLE MOVIE
// ==========================================

const getMovieById = async (req, res) => {

  try {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {

      return res.status(404).json({

        success: false,
        message: "Movie not found",

      });

    }

    res.status(200).json({

      success: true,
      movie,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};
// ==========================================
// UPDATE MOVIE
// ==========================================

const updateMovie = async (req, res) => {
  try {

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.poster = `/uploads/movies/${req.file.filename}`;
    }

    if (req.body.genre) {
      updateData.genre = req.body.genre.split(",");
    }

    if (req.body.cast) {
      updateData.cast = req.body.cast
        .split(",")
        .map((actor) => ({
          name: actor.trim(),
        }));
    }

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie Updated Successfully",
      movie,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// DELETE MOVIE
// ==========================================

const deleteMovie = async (req, res) => {
  try {

    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// SIMILAR MOVIES
// ==========================================

const getSimilarMovies = async (req, res) => {
  try {

    const currentMovie = await Movie.findById(req.params.id);

    if (!currentMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const movies = await Movie.find({

      _id: {
        $ne: req.params.id,
      },

      genre: {
        $in: currentMovie.genre,
      },

    }).limit(8);

    res.status(200).json({
      success: true,
      movies,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  addMovie,
  getMovies,
  searchMovies,
  getMovieById,
  getSimilarMovies,
  updateMovie,
  deleteMovie,
};