import asyncHandler from "express-async-handler";
import Watchlist from "../models/watchlistModel.js";

// @desc    Get all watchlists for a user
// @route   GET /api/watchlists
// @access  Private
const getWatchlists = asyncHandler(async (req, res) => {
  const watchlists = await Watchlist.find({ user: req.user._id });
  res.json(watchlists);
});

// @desc    Create a new watchlist
// @route   POST /api/watchlists
// @access  Private
const createWatchlist = asyncHandler(async (req, res) => {
  const { name, movies } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a name for the watchlist");
  }

  const watchlist = new Watchlist({
    name,
    user: req.user._id,
    movies: movies || [],
  });

  const createdWatchlist = await watchlist.save();
  res.status(201).json(createdWatchlist);
});

// @desc    Get a watchlist by ID
// @route   GET /api/watchlists/:id
// @access  Private
const getWatchlistById = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.findById(req.params.id);

  if (watchlist && watchlist.user.toString() === req.user._id.toString()) {
    res.json(watchlist);
  } else {
    res.status(404);
    throw new Error("Watchlist not found");
  }
});

// @desc    Update a watchlist's name
// @route   PUT /api/watchlists/:id
// @access  Private
const updateWatchlist = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const watchlist = await Watchlist.findById(req.params.id);

  if (watchlist && watchlist.user.toString() === req.user._id.toString()) {
    watchlist.name = name || watchlist.name;
    const updatedWatchlist = await watchlist.save();
    res.json(updatedWatchlist);
  } else {
    res.status(404);
    throw new Error("Watchlist not found");
  }
});

// @desc    Delete a watchlist
// @route   DELETE /api/watchlists/:id
// @access  Private
const deleteWatchlist = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.findById(req.params.id);

  if (watchlist && watchlist.user.toString() === req.user._id.toString()) {
    await watchlist.deleteOne();
    res.json({ message: "Watchlist removed" });
  } else {
    res.status(404);
    throw new Error("Watchlist not found");
  }
});

// @desc    Add a movie to a watchlist
// @route   POST /api/watchlists/:id/movies
// @access  Private
const addMovieToWatchlist = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  const watchlist = await Watchlist.findById(req.params.id);

  if (watchlist && watchlist.user.toString() === req.user._id.toString()) {
    if (watchlist.movies.includes(movieId)) {
      res.status(400);
      throw new Error("Movie already in watchlist");
    }
    watchlist.movies.push(movieId);
    const updatedWatchlist = await watchlist.save();
    res.json(updatedWatchlist);
  } else {
    res.status(404);
    throw new Error("Watchlist not found");
  }
});

// @desc    Remove a movie from a watchlist
// @route   DELETE /api/watchlists/:id/movies
// @access  Private
const removeMovieFromWatchlist = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  const watchlist = await Watchlist.findById(req.params.id);

  if (watchlist && watchlist.user.toString() === req.user._id.toString()) {
    watchlist.movies = watchlist.movies.filter(
      (movie) => movie.toString() !== movieId.toString()
    );
    const updatedWatchlist = await watchlist.save();
    res.json(updatedWatchlist);
  } else {
    res.status(404);
    throw new Error("Watchlist not found");
  }
});

export {
  getWatchlists,
  createWatchlist,
  getWatchlistById,
  updateWatchlist,
  deleteWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
};
