import styles from './Filter.module.css';

const Filter = ({ onFilterChange }) => {
  return (
    <div className={styles.filterContainer}>
      <label htmlFor="sort-by">Sort by: </label>
      <select
        id="sort-by"
        onChange={(e) => onFilterChange(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="popularity.desc">Popularity</option>
        <option value="vote_average.desc">Rating</option>
        <option value="release_date.desc">Release Date</option>
      </select>
    </div>
  );
};

export default Filter;
