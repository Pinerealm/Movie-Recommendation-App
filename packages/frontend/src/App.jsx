import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Profile from './pages/Profile';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProtectedRoute from './components/ProtectedRoute';
import movieService from './services/movieService';
import setAuthToken from './utils/setAuthToken';
import Footer from './components/Footer';
import styles from './App.module.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Shared function to fetch popular movies
  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const popularMovies = await movieService.getPopularMovies();
      setMovies(popularMovies);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const handleSearch = async (query) => {
    if (!query) {
      fetchPopularMovies();
      return;
    }
    try {
      setLoading(true);
      const searchResults = await movieService.searchMovies(query);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      setError('Failed to search movies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home movies={movies} loading={loading} error={error} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
