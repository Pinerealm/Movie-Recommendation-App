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
    return (
      <div className={styles.watchlistsContainer}>
        <div className={styles.content}>
          <div className={`${styles.stateCard} ${styles.loadingState}`}>
            <div className={styles.loadingSpinner} />
            <p>Loading your watchlists...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.watchlistsContainer}>
        <div className={styles.content}>
          <div className={`${styles.stateCard} ${styles.errorState}`}>
            <h2>We couldn&apos;t load your watchlists</h2>
            <p>{error}</p>
            <p>Please refresh the page and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.watchlistsContainer}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>My Watchlists</h1>
            <Link to="/watchlists/new" className={styles.createButton}>
              Create New Watchlist
            </Link>
          </div>
          <p className={styles.subtitle}>
            Curate collections of films to revisit later or share with friends.
          </p>
        </div>

        {watchlists.length === 0 ? (
          <div className={`${styles.stateCard} ${styles.emptyState}`}>
            <h2>No watchlists yet</h2>
            <p>Start your first collection by creating a new watchlist.</p>
          </div>
        ) : (
          <div className={styles.watchlistsGrid}>
            {watchlists.map((watchlist) => (
              <WatchlistCard key={watchlist._id} watchlist={watchlist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlists;
