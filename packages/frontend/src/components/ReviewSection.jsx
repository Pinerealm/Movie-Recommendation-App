import React, { useState, useEffect, useCallback } from "react";
import userService from "../services/userService";
import reviewService from "../services/reviewService";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import styles from "./ReviewSection.module.css";

const ReviewSection = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userService.getCurrentUser());
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedReviews = await reviewService.getMovieReviews(movieId);
      setReviews(fetchedReviews);

      if (user) {
        const fetchedUserReview = await reviewService.getUserMovieReview(
          movieId,
          user.token
        );
        setUserReview(fetchedUserReview);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, [movieId, user]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      setIsSubmitting(true);
      if (userReview) {
        // Update existing review
        await reviewService.updateReview(userReview._id, reviewData, user.token);
      } else {
        // Add new review
        await reviewService.addReview(movieId, reviewData, user.token);
      }
      await fetchReviews(); // Refresh reviews
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete your review?")) {
      try {
        await reviewService.deleteReview(reviewId, user.token);
        await fetchReviews(); // Refresh reviews
      } catch (error) {
        console.error("Error deleting review:", error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className={styles.reviewSection}>
      <h2>Ratings & Reviews</h2>
      {user && (
        <ReviewForm
          onSubmit={handleReviewSubmit}
          initialRating={userReview?.rating || 0}
          initialComment={userReview?.comment || ""}
          isSubmitting={isSubmitting}
          submitButtonText={userReview ? "Update Review" : "Submit Review"}
        />
      )}
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : (
        <ReviewList
          reviews={reviews}
          onDelete={handleReviewDelete}
          currentUserId={user?._id}
        />
      )}
    </div>
  );
};

export default ReviewSection;

