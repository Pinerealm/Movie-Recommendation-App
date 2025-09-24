import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import watchlistService from "../services/watchlistService";
import WatchlistCard from "../components/WatchlistCard";
import styles from "./Watchlists.module.css";

const Watchlists = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await watchlistService.getWatchlists(token);
          setWatchlists(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlists();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.watchlistsContainer}>
      <h1>My Watchlists</h1>
      <Link to="/watchlists/new" className={styles.createButton}>
        Create New Watchlist
      </Link>
      <div className={styles.watchlistsGrid}>
        {watchlists.map((watchlist) => (
          <WatchlistCard key={watchlist._id} watchlist={watchlist} />
        ))}
      </div>
    </div>
  );
};

export default Watchlists;
