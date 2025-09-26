import express from "express";
import {
  getMovies,
  searchMoviesController,
  getMovieDetails,
} from "../controllers/movieController.js";
import reviewRoutes from "./reviewRoutes.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMoviesController);
router.get("/:id", getMovieDetails);

// Nested review routes
router.use("/:movieId/reviews", reviewRoutes);

export default router;
