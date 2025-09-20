import axios from "axios";

const API_URL = "/api/users";

// Get user profile
const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

// Update user profile
const updateProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/profile`, userData);
  return response.data;
};

// Add movie to favorites
const addToFavorites = async (movieId) => {
  const response = await axios.post(`${API_URL}/favorites`, { movieId });
  return response.data;
};

// Remove movie from favorites
const removeFromFavorites = async (movieId) => {
  const response = await axios.delete(`${API_URL}/favorites/${movieId}`);
  return response.data;
};

// Get user's favorite movies
const getFavorites = async () => {
  const response = await axios.get(`${API_URL}/favorites`);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Logout user (clear local storage)
const logout = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Basic token format validation
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch {
    return false;
  }
};

// Get current user from token
const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { id: payload.id };
  } catch {
    return null;
  }
};

const userService = {
  getProfile,
  updateProfile,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  login,
  register,
  logout,
  isAuthenticated,
  getCurrentUser,
};

export default userService;
