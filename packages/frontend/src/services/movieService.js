import axios from "axios";

const API_URL = "/api/movies";

const getPopularMovies = async () => {
  const response = await axios.get(`${API_URL}/popular`);
  return response.data;
};

const searchMovies = async (query) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { query },
  });
  return response.data;
};

export default {
  getPopularMovies,
  searchMovies,
};
