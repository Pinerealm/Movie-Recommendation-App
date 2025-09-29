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
    return (
      <div className={styles.watchlistContainer}>
        <div className={styles.content}>
          <div className={`${styles.stateCard} ${styles.loadingState}`}>
            <div className={styles.loadingSpinner} />
            <p>Loading your watchlist...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !watchlist) {
    return (
      <div className={styles.watchlistContainer}>
        <div className={styles.content}>
          <div className={`${styles.stateCard} ${styles.errorState}`}>
            <h2>We couldn&apos;t load this watchlist</h2>
            <p>{error || "Please refresh the page and try again."}</p>
          </div>
        </div>
      </div>
    );
  }

  const updatedLabel = watchlist.updatedAt
    ? new Date(watchlist.updatedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

  return (
    <div className={styles.watchlistContainer}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>{watchlist.name}</h1>
          <div className={styles.meta}>
            <span className={styles.metaBadge}>
              {movies.length} {movies.length === 1 ? "movie" : "movies"}
            </span>
            {updatedLabel && (
              <span className={styles.metaBadge}>Updated {updatedLabel}</span>
            )}
          </div>
        </div>

        {movies.length === 0 ? (
          <div className={`${styles.stateCard} ${styles.emptyState}`}>
            <h2>This watchlist is empty</h2>
            <p>Add movies from the browse pages to start building it out.</p>
          </div>
        ) : (
          <div className={styles.moviesGrid}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
