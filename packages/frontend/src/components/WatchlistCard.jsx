import { Link } from "react-router-dom";
import styles from "./WatchlistCard.module.css";

const WatchlistCard = ({ watchlist }) => {
  return (
    <Link
      to={`/watchlists/${watchlist._id}`}
      className={styles.watchlistCard}
    >
      <h3>{watchlist.name}</h3>
      <p>{watchlist.movies.length} movies</p>
    </Link>
  );
};

export default WatchlistCard;
