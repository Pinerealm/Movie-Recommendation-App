import axios from "axios";

const API_URL = "/api/watchlists";

// Get all watchlists for a user
const getWatchlists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create a new watchlist
const createWatchlist = async (watchlistData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, watchlistData, config);
  return response.data;
};

// Get a watchlist by ID
const getWatchlistById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

// Update a watchlist
const updateWatchlist = async (id, watchlistData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${id}`, watchlistData, config);
  return response.data;
};

// Delete a watchlist
const deleteWatchlist = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

// Add a movie to a watchlist
const addMovieToWatchlist = async (id, movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/${id}/movies`,
    { movieId },
    config
  );
  return response.data;
};

// Remove a movie from a watchlist
const removeMovieFromWatchlist = async (id, movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}/movies`, {
    data: { movieId },
    ...config,
  });
  return response.data;
};

const watchlistService = {
  getWatchlists,
  createWatchlist,
  getWatchlistById,
  updateWatchlist,
  deleteWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
};

export default watchlistService;
