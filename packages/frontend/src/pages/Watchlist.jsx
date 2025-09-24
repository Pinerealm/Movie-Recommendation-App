import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import watchlistService from "../services/watchlistService";
import movieService from "../services/movieService";
import MovieCard from "../components/MovieCard";
import styles from "./Watchlist.module.css";

const Watchlist = () => {
  const { id } = useParams();
  const [watchlist, setWatchlist] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const watchlistData = await watchlistService.getWatchlistById(
            id,
            token
          );
          setWatchlist(watchlistData);

          const moviePromises = watchlistData.movies.map((movieId) =>
            movieService.getMovieDetails(movieId)
          );
          const movieResults = await Promise.all(moviePromises);
          setMovies(movieResults);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.watchlistContainer}>
      <h1>{watchlist.name}</h1>
      <div className={styles.moviesGrid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
