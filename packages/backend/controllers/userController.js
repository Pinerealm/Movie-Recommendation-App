import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { fetchMovieDetails } from "../services/tmdbService.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Add movie to favorites
// @route   POST /api/users/favorites
// @access  Private
const addFavoriteMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    if (user.favorites.includes(movieId)) {
      res.status(400);
      throw new Error("Movie already in favorites");
    }

    user.favorites.push(movieId);
    await user.save();
    res.status(201).json(user.favorites);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Remove movie from favorites
// @route   DELETE /api/users/favorites/:movieId
// @access  Private
const removeFavoriteMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const user = await User.findById(req.user._id);

  if (user) {
    user.favorites = user.favorites.filter((id) => id.toString() !== movieId);
    await user.save();
    res.json({ message: "Movie removed from favorites" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user's favorite movies
// @route   GET /api/users/favorites
// @access  Private
const getFavoriteMovies = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const favoriteMovies = await Promise.all(
      user.favorites.map(async (movieId) => {
        return await fetchMovieDetails(movieId);
      })
    );
    res.json(favoriteMovies);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  addFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
};
