import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie, showFavoriteButton = true, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const isAuthenticated = userService.isAuthenticated();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!isAuthenticated) return;
      
      try {
        const favorites = await userService.getFavorites();
        setIsFavorite(favorites.some(fav => fav.id === movie.id));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [movie.id, isAuthenticated]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault(); // Prevent navigation if inside a Link
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please log in to add movies to your favorites');
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        await userService.removeFromFavorites(movie.id);
        setIsFavorite(false);
        if (onFavoriteChange) {
          onFavoriteChange(movie.id, false);
        }
      } else {
        await userService.addToFavorites(movie.id);
        setIsFavorite(true);
        if (onFavoriteChange) {
          onFavoriteChange(movie.id, true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorites. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.movieCard}>
      <Link to={`/movie/${movie.id}`} className={styles.movieLink}>
        <img src={posterUrl} alt={movie.title} />
        <div className={styles.movieInfo}>
          <h3>{movie.title}</h3>
          {movie.vote_average && (
            <div className={styles.rating}>
              <span className={styles.star}>⭐</span>
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>
      </Link>
      
      {showFavoriteButton && isAuthenticated && (
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
          onClick={handleFavoriteToggle}
          disabled={isLoading}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isLoading ? (
            <span className={styles.loadingSpinner}>⏳</span>
          ) : (
            <span className={styles.heart}>
              {isFavorite ? '❤️' : '🤍'}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default MovieCard;
