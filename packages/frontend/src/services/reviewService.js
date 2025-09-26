import axios from "axios";

const API_URL = "/api/movies";

// Add a review for a movie
const addReview = async (movieId, reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/${movieId}/reviews`,
    reviewData,
    config
  );
  return response.data;
};

// Get reviews for a movie
const getMovieReviews = async (movieId) => {
  const response = await axios.get(`${API_URL}/${movieId}/reviews`);
  return response.data;
};

// Get a user's review for a movie
const getUserMovieReview = async (movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}/${movieId}/reviews/user`,
    config
  );
  return response.data;
};

// Update a review
const updateReview = async (reviewId, reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `/api/reviews/${reviewId}`,
    reviewData,
    config
  );
  return response.data;
};

// Delete a review
const deleteReview = async (reviewId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`/api/reviews/${reviewId}`, config);
  return response.data;
};

const reviewService = {
  addReview,
  getMovieReviews,
  getUserMovieReview,
  updateReview,
  deleteReview,
};

export default reviewService;
