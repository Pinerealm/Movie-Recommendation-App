import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import MovieCard from '../components/MovieCard';
import styles from './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch user profile and favorites concurrently
        const [profileData, favoritesData] = await Promise.all([
          userService.getProfile(),
          userService.getFavorites()
        ]);

        setUser(profileData);
        setFavorites(favoritesData);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        if (err.response?.status === 401) {
          // Token invalid, redirect to login
          userService.logout();
          navigate('/login');
        } else {
          setError('Failed to load profile data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleLogout = () => {
    userService.logout();
    navigate('/');
  };

  const handleRemoveFromFavorites = async (movieId) => {
    try {
      await userService.removeFromFavorites(movieId);
      // Remove the movie from the local favorites state
      setFavorites(favorites.filter(movie => movie.id !== movieId));
    } catch (err) {
      console.error('Error removing from favorites:', err);
      setError('Failed to remove movie from favorites');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorState}>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
        </div>

        {user && (
          <div className={styles.userCard}>
            <div className={styles.userInfo}>
              <div className={styles.userDetail}>
                <svg className={styles.userDetailIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className={styles.userDetailLabel}>Name:</span>
                  <span className={styles.userDetailText}>{user.name}</span>
                </div>
              </div>
              
              <div className={styles.userDetail}>
                <svg className={styles.userDetailIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <span className={styles.userDetailLabel}>Email:</span>
                  <span className={styles.userDetailText}>{user.email}</span>
                </div>
              </div>

              <div className={styles.userDetail}>
                <svg className={styles.userDetailIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className={styles.userDetailLabel}>Favorite Movies:</span>
                  <span className={styles.userDetailText}>{favorites.length} movies</span>
                </div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button 
                className={styles.editButton}
                onClick={() => {
                  // TODO: Implement edit profile modal
                  alert('Edit profile feature coming soon!');
                }}
              >
                Edit Profile
              </button>
              <button className={styles.logoutButton} onClick={handleLogout}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}

        <div className={styles.favoritesSection}>
          <h2 className={styles.sectionTitle}>My Favorite Movies</h2>
          
          {favorites.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>🎬</div>
              <p>You haven't added any movies to your favorites yet.</p>
              <p>Start exploring and save the movies you love!</p>
            </div>
          ) : (
            <div className={styles.favoritesGrid}>
              {favorites.map((movie) => (
                <div key={movie.id} style={{ position: 'relative' }}>
                  <MovieCard movie={movie} />
                  <button
                    onClick={() => handleRemoveFromFavorites(movie.id)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(255, 107, 138, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      zIndex: 10
                    }}
                    title="Remove from favorites"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;