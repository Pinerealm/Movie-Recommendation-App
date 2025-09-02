import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MovieApp
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
