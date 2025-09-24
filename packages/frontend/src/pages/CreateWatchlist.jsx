import { useState } from "react";
import { useNavigate } from "react-router-dom";
import watchlistService from "../services/watchlistService";
import styles from "./CreateWatchlist.module.css";

const CreateWatchlist = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await watchlistService.createWatchlist({ name }, token);
        navigate("/watchlists");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create watchlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createWatchlistContainer}>
      <h1>Create New Watchlist</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Watchlist Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateWatchlist;
