import MovieCard from '../components/MovieCard';
import styles from '../App.module.css';

const Home = ({ movies, loading, error }) => {
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={styles.moviesContainer}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
