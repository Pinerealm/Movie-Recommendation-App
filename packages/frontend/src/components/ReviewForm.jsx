import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import styles from "./ReviewForm.module.css";

const ReviewForm = ({
  onSubmit,
  initialRating = 0,
  initialComment = "",
  isSubmitting,
  submitButtonText = "Submit",
}) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setRating(initialRating);
    setComment(initialComment);
  }, [initialRating, initialComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit({ rating, comment });
    } else {
      alert("Please select a rating.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h3>Your Review</h3>
      <div className={styles.ratingContainer}>
        <label>Rating:</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      <div className={styles.commentContainer}>
        <label htmlFor="comment">Comment (optional):</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        />
      </div>
      <button type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? "Submitting..." : submitButtonText}
      </button>
    </form>
  );
};

export default ReviewForm;
