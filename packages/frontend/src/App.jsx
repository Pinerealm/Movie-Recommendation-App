import { useState } from 'react';
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
import ProtectedRoute from './components/ProtectedRoute';
import setAuthToken from './utils/setAuthToken';
import Footer from './components/Footer';
import styles from './App.module.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [filters, setFilters] = useState({ sortBy: 'popularity.desc' });
  const [searchQuery, setSearchQuery] = useState('');


  const handleFilterChange = (newFilterValues) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilterValues }));
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.app}>
      <Header onSearch={handleSearch} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                filters={filters}
                searchQuery={searchQuery}
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
