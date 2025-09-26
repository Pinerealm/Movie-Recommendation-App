import React from "react";
import styles from "./StarRating.module.css";

const StarRating = ({ rating, onRatingChange, isInteractive = true }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.starRating}>
      {stars.map((star) => (
        <span
          key={star}
          className={`${styles.star} ${rating >= star ? styles.filled : ""} ${
            isInteractive ? styles.interactive : ""
          }`}
          onClick={() => isInteractive && onRatingChange(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
