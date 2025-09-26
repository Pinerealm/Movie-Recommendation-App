import { useState } from 'react';
import styles from './Filter.module.css';

const Filter = ({ onFilterChange }) => {
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const handleApplyFilters = () => {
    const filters = {
      genre,
      year,
      'vote_average.gte': rating,
      'primary_release_date.gte': releaseDate,
      sort_by: sortBy,
    };
    onFilterChange(filters);
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
      <label htmlFor="rating">Min Rating: </label>
      <input
        type="number"
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="e.g., 7.5"
        step="0.1"
        min="0"
        max="10"
      />
      <label htmlFor="releaseDate">Min Release Date: </label>
      <input
        type="date"
        id="releaseDate"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />
      <label htmlFor="sortBy">Sort By: </label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="popularity.desc">Popularity Desc</option>
        <option value="popularity.asc">Popularity Asc</option>
        <option value="vote_average.desc">Rating Desc</option>
        <option value="vote_average.asc">Rating Asc</option>
        <option value="primary_release_date.desc">Release Date Desc</option>
        <option value="primary_release_date.asc">Release Date Asc</option>
      </select>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;
