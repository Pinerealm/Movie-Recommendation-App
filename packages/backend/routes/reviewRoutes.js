import express from "express";
import {
  addReview,
  getMovieReviews,
  updateReview,
  deleteReview,
  getUserMovieReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, addReview).get(getMovieReviews);
router.route("/user").get(protect, getUserMovieReview);
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

export default router;
