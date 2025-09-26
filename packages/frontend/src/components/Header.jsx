import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

const Header = ({ onSearch }) => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          MovieApp
        </Link>
        <Navbar />
      </div>
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;
