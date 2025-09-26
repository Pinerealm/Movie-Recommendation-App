import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel.js";
import Movie from "../models/movieModel.js"; // This might not be needed if we only use movieId

// @desc    Add a new review
// @route   POST /api/movies/:movieId/reviews
// @access  Private
const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { movieId } = req.params;

  // Simple validation
  if (!rating) {
    res.status(400);
    throw new Error("Rating is required");
  }

  // Check if a review already exists for this user and movie
  const existingReview = await Review.findOne({
    user: req.user._id,
    movieId: movieId,
  });

  if (existingReview) {
    res.status(400);
    throw new Error("You have already reviewed this movie");
  }

  const review = new Review({
    user: req.user._id,
    movieId: movieId,
    rating,
    comment,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

// @desc    Get reviews for a movie
// @route   GET /api/movies/:movieId/reviews
// @access  Public
const getMovieReviews = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const reviews = await Review.find({ movieId }).populate("user", "name");
  res.json(reviews);
});

// @desc    Get a user's review for a specific movie
// @route   GET /api/movies/:movieId/reviews/user
// @access  Private
const getUserMovieReview = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const review = await Review.findOne({ movieId, user: req.user._id });

  if (review) {
    res.json(review);
  } else {
    res.json(null); // Send null if no review exists
  }
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.findById(req.params.id);

  if (review) {
    // Check if the user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this review");
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this review");
    }

    await review.deleteOne();
    res.json({ message: "Review removed" });
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

export {
  addReview,
  getMovieReviews,
  getUserMovieReview,
  updateReview,
  deleteReview,
};
