import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    movieId: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0.5,
      max: 5,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Users can only leave one review per movie
reviewSchema.index({ user: 1, movieId: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
