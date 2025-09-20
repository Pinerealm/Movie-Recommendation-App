import MovieCard from '../components/MovieCard';
import styles from '../App.module.css';

const Home = ({ movies, loading, error }) => {
  return (
    <div className={styles.homepage}>
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
