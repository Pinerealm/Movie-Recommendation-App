import express from "express";
import {
  getMovies,
  searchMoviesController,
  getMovieDetails,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMoviesController);
router.get("/:id", getMovieDetails);

export default router;
