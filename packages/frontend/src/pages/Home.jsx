import { useState, useEffect } from 'react';
import movieService from '../services/movieService';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
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

    fetchMovies();
  }, []);

  const handleSearch = async (query) => {
    if (!query) {
      // Optionally, refetch popular movies if search is cleared
      const fetchMovies = async () => {
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
      fetchMovies();
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
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
