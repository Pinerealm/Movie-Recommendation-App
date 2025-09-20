import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import userService from "../services/userService";

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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ fontSize: '18px' }}>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ff6b8a',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Oops!</h2>
          <p style={{ fontSize: '18px' }}>{error}</p>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <h2>Movie not found</h2>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer'
            }}
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
          gap: '40px'
        }}>
          {/* Movie Poster */}
          <div style={{
            flex: '0 0 300px',
            alignSelf: 'flex-start'
          }}>
            <img
              src={posterUrl}
              alt={movie.title}
              style={{
                width: '100%',
                borderRadius: '15px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                border: '3px solid rgba(255, 255, 255, 0.2)'
              }}
            />
          </div>

          {/* Movie Info */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '20px',
              gap: '20px'
            }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                margin: '0',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '1.2'
              }}>
                {movie.title}
              </h1>
              
              {/* Favorite Button */}
              <button
                onClick={handleFavoriteToggle}
                disabled={favoriteLoading}
                style={{
                  background: isFavorite 
                    ? 'linear-gradient(135deg, #ff6b8a 0%, #ff8e91 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${isFavorite ? '#ff6b8a' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '12px',
                  padding: '12px 20px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: favoriteLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(10px)',
                  opacity: favoriteLoading ? 0.7 : 1
                }}
              >
                <span style={{ fontSize: '20px' }}>
                  {favoriteLoading ? '⏳' : (isFavorite ? '❤️' : '🤍')}
                </span>
                {favoriteLoading ? 'Updating...' : (isFavorite ? 'Remove from Favorites' : 'Add to Favorites')}
              </button>
            </div>

            {movie.tagline && (
              <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                "{movie.tagline}"
              </p>
            )}

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '25px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 215, 0, 0.2)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 215, 0, 0.3)'
              }}>
                <span style={{ fontSize: '20px' }}>⭐</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#ffd700' }}>
                  {movie.vote_average.toFixed(1)}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  ({movie.vote_count} votes)
                </span>
              </div>
              
              {movie.release_date && (
                <div style={{
                  background: 'rgba(67, 233, 123, 0.2)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid rgba(67, 233, 123, 0.3)',
                  color: '#43e97b'
                }}>
                  <strong>Released:</strong> {new Date(movie.release_date).getFullYear()}
                </div>
              )}
              
              {movie.runtime && (
                <div style={{
                  background: 'rgba(79, 172, 254, 0.2)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid rgba(79, 172, 254, 0.3)',
                  color: '#4facfe'
                }}>
                  <strong>Runtime:</strong> {movie.runtime} min
                </div>
              )}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '15px',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Overview
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                {movie.overview}
              </p>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '15px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  Genres
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
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
