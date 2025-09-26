import axios from "axios";

const TMDB_API_URL = "https://api.themoviedb.org/3";

const fetchMovies = async (filters) => {
  const {
    sortBy = "popularity.desc",
    genre,
    year,
    rating,
    releaseDate,
  } = filters;
  try {
    const params = {
      api_key: process.env.TMDB_API_KEY,
      sort_by: sortBy,
      include_adult: false,
      page: 1,
    };

    if (genre) params.with_genres = genre;
    if (year) params.primary_release_year = year;
    if (rating) {
      params["vote_average.gte"] = rating.min;
      params["vote_average.lte"] = rating.max;
    }
    if (releaseDate) {
      params["primary_release_date.gte"] = releaseDate.min;
      params["primary_release_date.lte"] = releaseDate.max;
    }

    const response = await axios.get(`${TMDB_API_URL}/discover/movie`, {
      params,
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies from TMDB:", error);
    throw new Error("Error fetching movies from TMDB");
  }
};

const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies from TMDB:", error);
    throw new Error("Error searching movies from TMDB");
  }
};

const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/${movieId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details from TMDB:", error);
    throw new Error("Error fetching movie details from TMDB");
  }
};

export { fetchMovies, searchMovies, fetchMovieDetails };
