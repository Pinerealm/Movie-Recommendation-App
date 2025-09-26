import React from "react";
import StarRating from "./StarRating";
import styles from "./ReviewList.module.css";

const ReviewList = ({ reviews, onDelete, currentUserId }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet. Be the first to review this movie!</p>;
  }

  return (
    <div className={styles.reviewList}>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id} className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <strong>{review.user?.name || "Anonymous"}</strong>
            <StarRating rating={review.rating} isInteractive={false} />
          </div>
          <p className={styles.reviewComment}>{review.comment}</p>
          <small className={styles.reviewDate}>
            {new Date(review.createdAt).toLocaleDateString()}
          </small>
          {currentUserId === review.user?._id && (
            <button
              onClick={() => onDelete(review._id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
