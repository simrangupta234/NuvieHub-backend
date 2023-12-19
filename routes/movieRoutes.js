const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  movieApi,
} = require("../controllers/movieController");
// const validateToken = require("../middlewares/validateTokenHandler");

// router.use(validateToken);
router.route("/").post(addMovie).get(getMovies);
router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

module.exports = router;
