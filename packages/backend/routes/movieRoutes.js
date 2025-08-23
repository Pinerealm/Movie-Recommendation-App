import express from "express";
import {
  getPopularMovies,
  searchMoviesController,
  getMovieDetails,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/popular", getPopularMovies);
router.get("/search", searchMoviesController);
router.get("/:id", getMovieDetails);

export default router;
