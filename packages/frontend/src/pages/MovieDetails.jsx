import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import userService from "../services/userService";
import styles from "./MovieDetails.module.css";
import ReviewSection from "../components/ReviewSection";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const isAuthenticated = userService.isAuthenticated();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError('');
        
        const { data } = await axios.get(`/api/movies/${id}`);
        setMovie(data);
        
        // Check if movie is in user's favorites
        if (isAuthenticated) {
          try {
            const favorites = await userService.getFavorites();
            setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
          } catch (err) {
            console.error('Error checking favorite status:', err);
          }
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, isAuthenticated]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      alert('Please log in to add movies to your favorites');
      navigate('/login');
      return;
    }

    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await userService.removeFromFavorites(movie.id);
        setIsFavorite(false);
      } else {
        await userService.addToFavorites(movie.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorites. Please try again.');
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div>
          <h2 className={styles.errorTitle}>Oops!</h2>
          <p className={styles.errorText}>{error}</p>
          <button
            onClick={() => navigate('/')}
            className={styles.errorButton}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const {
    title,
    overview,
    release_date,
    poster_path,
    backdrop_path,
    genres,
    runtime,
    vote_average,
    vote_count,
  } = movie;

  return (
    <div className={styles.movieDetailsContainer}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      ></div>
      <div className={styles.content}>
        <div className={styles.poster}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <span>{new Date(release_date).getFullYear()}</span>
            <span>{genres.map((g) => g.name).join(", ")}</span>
            <span>{runtime} min</span>
          </div>
          <div className={styles.rating}>
            <span>
              Rating: {vote_average.toFixed(1)} ({vote_count} votes)
            </span>
          </div>
          <p className={styles.overview}>{overview}</p>
          <div className={styles.actions}>
            <button onClick={handleFavoriteToggle} disabled={favoriteLoading}>
              {favoriteLoading
                ? "..."
                : isFavorite
                ? "★ Remove from Favorites"
                : "☆ Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
      <ReviewSection movieId={id} />
    </div>
  );
};

export default MovieDetails;
