import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Profile from './pages/Profile';
import Watchlists from "./pages/Watchlists";
import Watchlist from "./pages/Watchlist";
import CreateWatchlist from "./pages/CreateWatchlist";
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

  const [filters, setFilters] = useState({ sortBy: 'popularity.desc' });

  // Shared function to fetch movies
  const fetchMovies = async (newFilters) => {
    try {
      setLoading(true);
      const movies = await movieService.getMovies(newFilters);
      setMovies(movies);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(filters);
  }, [filters]);

  const handleFilterChange = (newFilterValues) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilterValues }));
  };

  const handleSearch = async (query) => {
    if (!query) {
      fetchMovies(filters);
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
            element={
              <Home
                movies={movies}
                loading={loading}
                error={error}
                onFilterChange={handleFilterChange}
              />
            }
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
          <Route
            path="/watchlists/new"
            element={
              <ProtectedRoute>
                <CreateWatchlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlists"
            element={
              <ProtectedRoute>
                <Watchlists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlists/:id"
            element={
              <ProtectedRoute>
                <Watchlist />
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
