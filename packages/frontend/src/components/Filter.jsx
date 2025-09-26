import { useState } from 'react';
import styles from './Filter.module.css';

const Filter = ({ onFilterChange }) => {
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({ genre, year });
  };

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="genre">Genre: </label>
      <input
        type="text"
        id="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="e.g., 28 for Action"
      />
      <label htmlFor="year">Year: </label>
      <input
        type="text"
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="e.g., 2023"
      />
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;
