import axios from "axios";

const API_URL = "/api/movies";

const getMovies = async (filters) => {
  const response = await axios.get(API_URL, {
    params: filters,
  });
  return response.data;
};

const searchMovies = async (query) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { query },
  });
  return response.data;
};

const getRecommendations = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/recommendations`, config);
  return response.data;
};

export default {
  getMovies,
  searchMovies,
  getRecommendations,
};
