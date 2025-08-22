import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
  {
    tmdbId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
    },
    release_date: {
      type: String,
    },
    genres: [
      {
        type: String,
      },
    ],
    vote_average: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
