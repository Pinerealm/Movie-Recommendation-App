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

export default {
  getMovies,
  searchMovies,
};
