import express from "express";
import {
  getMovies,
  searchMoviesController,
  getMovieDetails,
  getRecommendations,
} from "../controllers/movieController.js";
import { protect } from "../middleware/authMiddleware.js";
import reviewRoutes from "./reviewRoutes.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMoviesController);
router.get("/recommendations", protect, getRecommendations);
router.get("/:id", getMovieDetails);

// Nested review routes
router.use("/:movieId/reviews", reviewRoutes);

export default router;
