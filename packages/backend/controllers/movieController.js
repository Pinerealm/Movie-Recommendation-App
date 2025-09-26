import asyncHandler from "express-async-handler";
import {
  fetchMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieRecommendations,
} from "../services/tmdbService.js";
import User from "../models/userModel.js";

// @desc    Fetch movies with sorting
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
  const movies = await fetchMovies(req.query);
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

// @desc    Get personalized movie recommendations
// @route   GET /api/movies/recommendations
// @access  Private
const getRecommendations = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user || user.favorites.length === 0) {
    // If no favorites, return a default list of popular movies
    const popularMovies = await fetchMovies({ sort_by: 'popularity.desc' });
    return res.json(popularMovies);
  }

  // Fetch recommendations based on the user's last favorite movie
  const lastFavoriteMovieId = user.favorites[user.favorites.length - 1];
  
  const recommendations = await fetchMovieRecommendations(lastFavoriteMovieId);

  if (recommendations.length > 0) {
    res.json(recommendations);
  } else {
    // Fallback to popular movies if no recommendations are found
    const popularMovies = await fetchMovies({ sort_by: 'popularity.desc' });
    res.json(popularMovies);
  }
});

export { getMovies, searchMoviesController, getMovieDetails, getRecommendations };
