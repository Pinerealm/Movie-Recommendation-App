import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3";

const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        // language: 'en-US',
        // page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies from TMDB:", error);
    throw new Error("Error fetching popular movies from TMDB");
  }
};

export { fetchPopularMovies };
