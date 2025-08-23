import asyncHandler from "express-async-handler";
import {
  fetchPopularMovies,
  searchMovies,
  fetchMovieDetails,
} from "../services/tmdbService.js";

// @desc    Fetch popular movies
// @route   GET /api/movies/popular
// @access  Public
const getPopularMovies = asyncHandler(async (req, res) => {
  const movies = await fetchPopularMovies();
  res.json(movies);
});

// @desc    Search movies
// @route   GET /api/movies/search
// @access  Public
const searchMoviesController = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    res.status(400);
    throw new Error("Query parameter is required");
  }
  const movies = await searchMovies(query);
  res.json(movies);
});

// @desc    Fetch movie details
// @route   GET /api/movies/:id
// @access  Public
const getMovieDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await fetchMovieDetails(id);
  res.json(movie);
});

export { getPopularMovies, searchMoviesController, getMovieDetails };
