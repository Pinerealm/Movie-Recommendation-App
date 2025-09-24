import MovieCard from '../components/MovieCard';
import Filter from '../components/Filter';
import styles from '../App.module.css';

const Home = ({ movies, loading, error, onFilterChange }) => {
  return (
    <div className={styles.homepage}>
      <Filter onFilterChange={onFilterChange} />
      {loading && <p className={styles.loadingText}>Loading amazing movies...</p>}
      {error && <p className={styles.errorText}>{error}</p>}
      <div className={styles.moviesContainer}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
