import { useQuery } from '@tanstack/react-query';
import MovieCard from '../components/MovieCard';
import Filter from '../components/Filter';
import styles from '../App.module.css';
import movieService from '../services/movieService';

const Home = ({ filters, searchQuery, onFilterChange }) => {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', { filters, searchQuery }],
    queryFn: () =>
      searchQuery
        ? movieService.searchMovies(searchQuery)
        : movieService.getMovies(filters),
    enabled: !!(filters || searchQuery),
  });

  return (
    <div className={styles.homepage}>
      <Filter onFilterChange={onFilterChange} />
      {isLoading && <p className={styles.loadingText}>Loading amazing movies...</p>}
      {error && <p className={styles.errorText}>{error.message}</p>}
      <div className={styles.moviesContainer}>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
