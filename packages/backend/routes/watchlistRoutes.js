import express from "express";
import {
  getWatchlists,
  createWatchlist,
  getWatchlistById,
  updateWatchlist,
  deleteWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../controllers/watchlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createWatchlist).get(protect, getWatchlists);
router
  .route("/:id")
  .get(protect, getWatchlistById)
  .put(protect, updateWatchlist)
  .delete(protect, deleteWatchlist);

router.route("/:id/movies").post(protect, addMovieToWatchlist);
router.route("/:id/movies").delete(protect, removeMovieFromWatchlist);

export default router;
