import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import movieService from "../services/movieService";
import userService from "../services/userService";
import watchlistService from "../services/watchlistService";
import styles from "./MovieDetails.module.css";
import ReviewSection from "../components/ReviewSection";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedWatchlist, setSelectedWatchlist] = useState('');

  const isAuthenticated = userService.isAuthenticated();
  const token = localStorage.getItem("token");

  const { data: movie, isLoading: movieLoading, error: movieError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieService.getMovieDetails(id),
    enabled: !!id,
  });

  const { data: favorites, isLoading: favoritesLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => userService.getFavorites(),
    enabled: isAuthenticated,
  });

  const { data: watchlists, isLoading: watchlistsLoading } = useQuery({
    queryKey: ['watchlists'],
    queryFn: () => watchlistService.getWatchlists(token),
    enabled: isAuthenticated,
    onSuccess: (data) => {
      if (data.length > 0 && !selectedWatchlist) {
        setSelectedWatchlist(data[0]._id);
      }
    }
  });

  const isFavorite = favorites?.some(fav => fav.id === parseInt(id));

  const favoriteMutation = useMutation({
    mutationFn: (isFavorite) => 
      isFavorite 
        ? userService.removeFromFavorites(movie.id) 
        : userService.addToFavorites(movie.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
    },
    onError: (error) => {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorites. Please try again.');
    }
  });

  const addToWatchlistMutation = useMutation({
    mutationFn: (watchlistId) => watchlistService.addMovieToWatchlist(watchlistId, movie.id, token),
    onSuccess: () => {
      alert(`Movie added to watchlist!`);
    },
    onError: (error) => {
      console.error('Error adding to watchlist:', error);
      alert('Failed to add movie to watchlist. Please try again.');
    }
  });


  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      alert('Please log in to add movies to your favorites');
      navigate('/login');
      return;
    }
    favoriteMutation.mutate(isFavorite);
  };

  const handleAddToWatchlist = () => {
    if (!isAuthenticated) {
      alert('Please log in to add movies to a watchlist');
      navigate('/login');
      return;
    }
    if (!selectedWatchlist) {
      alert('Please select a watchlist.');
      return;
    }
    addToWatchlistMutation.mutate(selectedWatchlist);
  };

  if (movieLoading || favoritesLoading || watchlistsLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (movieError) {
    return (
      <div className={styles.errorContainer}>
        <div>
          <h2 className={styles.errorTitle}>Oops!</h2>
          <p className={styles.errorText}>{movieError.message}</p>
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
            <button onClick={handleFavoriteToggle} disabled={favoriteMutation.isPending}>
              {favoriteMutation.isPending
                ? "..."
                : isFavorite
                ? "★ Remove from Favorites"
                : "☆ Add to Favorites"}
            </button>
            {isAuthenticated && watchlists && watchlists.length > 0 && (
              <div className={styles.watchlistActions}>
                <select 
                  value={selectedWatchlist} 
                  onChange={(e) => setSelectedWatchlist(e.target.value)}
                  disabled={addToWatchlistMutation.isPending}
                >
                  {watchlists.map(wl => (
                    <option key={wl._id} value={wl._id}>{wl.name}</option>
                  ))}
                </select>
                <button onClick={handleAddToWatchlist} disabled={addToWatchlistMutation.isPending}>
                  {addToWatchlistMutation.isPending ? 'Adding...' : 'Add to Watchlist'}
                </button>
              </div>
            )}
             {isAuthenticated && watchlists && watchlists.length === 0 && (
              <p className={styles.createWatchlistPrompt}>
                Create a watchlist on your <a href="/watchlists">watchlists page</a> to add movies.
              </p>
            )}
          </div>
        </div>
      </div>
      <ReviewSection movieId={id} />
    </div>
  );
};

export default MovieDetails;
