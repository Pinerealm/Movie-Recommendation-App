import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import userService from "../services/userService";
import styles from "./MovieDetails.module.css";

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
    return (
      <div className={styles.notFoundContainer}>
        <div>
          <h2>Movie not found</h2>
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

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.movieDetailsLayout}>
          {/* Movie Poster */}
          <div className={styles.posterContainer}>
            <img
              src={posterUrl}
              alt={movie.title}
              className={styles.posterImage}
            />
          </div>

          {/* Movie Info */}
          <div className={styles.movieInfo}>
            <div className={styles.titleContainer}>
              <h1 className={styles.movieTitle}>
                {movie.title}
              </h1>
              
              {/* Favorite Button */}
              <button
                onClick={handleFavoriteToggle}
                disabled={favoriteLoading}
                className={`${styles.favoriteButton} ${
                  favoriteLoading 
                    ? styles.favoriteButtonLoading 
                    : isFavorite 
                      ? styles.favoriteButtonActive 
                      : styles.favoriteButtonInactive
                }`}
              >
                <span className={styles.favoriteIcon}>
                  {favoriteLoading ? '⏳' : (isFavorite ? '❤️' : '🤍')}
                </span>
                {favoriteLoading ? 'Updating...' : (isFavorite ? 'Remove from Favorites' : 'Add to Favorites')}
              </button>
            </div>

            {movie.tagline && (
              <p className={styles.tagline}>
                "{movie.tagline}"
              </p>
            )}

            <div className={styles.movieMeta}>
              <div className={styles.ratingBadge}>
                <span className={styles.ratingIcon}>⭐</span>
                <span className={styles.ratingValue}>
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className={styles.ratingCount}>
                  ({movie.vote_count} votes)
                </span>
              </div>
              
              {movie.release_date && (
                <div className={styles.releaseBadge}>
                  <strong>Released:</strong> {new Date(movie.release_date).getFullYear()}
                </div>
              )}
              
              {movie.runtime && (
                <div className={styles.runtimeBadge}>
                  <strong>Runtime:</strong> {movie.runtime} min
                </div>
              )}
            </div>

            <div className={styles.overviewSection}>
              <h3 className={styles.sectionTitle}>
                Overview
              </h3>
              <p className={styles.overviewText}>
                {movie.overview}
              </p>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div>
                <h3 className={styles.genresTitle}>
                  Genres
                </h3>
                <div className={styles.genresContainer}>
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className={styles.genreBadge}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
