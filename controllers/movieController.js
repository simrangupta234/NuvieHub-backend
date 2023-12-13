const asyncHandler = require("express-async-handler");
const Movie = require("../models/movieModel");

//@desc Get all movies
//@route GET /api/movies
//@access public
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json(movies);
});

//@desc Get a movie
//@route GET /api/movies
//@access public
const getMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  res.status(200).json(movie);
});


//@desc add new movie
//@route POST /api/movies
//@access public
const addMovie = asyncHandler(async (req, res) => {
  console.log("The req body is : ", req.body);
  const { id, title, year, description } = req.body;

//   if (!id || !title || !year || !description) {
//     res.status(400);
//     throw Error("All fields are mendatory");
//   }
  const movie = await Movie.create({
    id,
    title,
    year,
    description,
  });
  res.status(201).json(movie);
});

//@desc Update A movie
//@route PUT /api/movies
//@access public
const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedMovie);
});

//@desc Delete a movie
//@route DELETE /api/movies
//@access public
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  await movie.deleteOne();

  res.status(200).json(movie);
});

module.exports = { getMovies, getMovie, addMovie, updateMovie, deleteMovie };
