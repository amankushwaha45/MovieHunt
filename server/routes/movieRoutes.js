const express = require("express");
const router = express.Router();

const {
  addMovie,
  getMovies,
  searchMovies,
  getMovieById,
  getSimilarMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const upload = require("../config/multer");

// ==========================================
// GET ALL MOVIES
// ==========================================
router.get("/", getMovies);

// ==========================================
// SEARCH MOVIES
// IMPORTANT: Keep ABOVE /:id
// ==========================================
router.get("/search/:keyword", searchMovies);

// ==========================================
// GET SIMILAR MOVIES
// ==========================================
router.get("/:id/similar", getSimilarMovies);

// ==========================================
// GET SINGLE MOVIE
// ==========================================
router.get("/:id", getMovieById);

// ==========================================
// ADD MOVIE
// ==========================================
router.post(
  "/",
  upload.single("poster"),
  addMovie
);

// ==========================================
// UPDATE MOVIE
// ==========================================
router.put(
  "/:id",
  upload.single("poster"),
  updateMovie
);

// ==========================================
// DELETE MOVIE
// ==========================================
router.delete(
  "/:id",
  deleteMovie
);

module.exports = router;