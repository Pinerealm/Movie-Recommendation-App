import asyncHandler from "express-async-handler";
import { fetchPopularMovies } from "../services/tmdbService.js";

// @desc    Fetch popular movies
// @route   GET /api/movies/popular
// @access  Public
const getPopularMovies = asyncHandler(async (req, res) => {
  const movies = await fetchPopularMovies();
  res.json(movies);
});

export { getPopularMovies };
