import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getFavoriteMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/favorites")
  .get(protect, getFavoriteMovies)
  .post(protect, addFavoriteMovie);

router.route("/favorites/:movieId").delete(protect, removeFavoriteMovie);

export default router;
