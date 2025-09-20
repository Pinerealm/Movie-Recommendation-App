import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = userService.isAuthenticated();

  const handleLogout = () => {
    userService.logout();
    navigate('/');
    // Force a page refresh to update the authentication state
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
