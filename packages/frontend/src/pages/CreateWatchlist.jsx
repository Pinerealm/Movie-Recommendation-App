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
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create New Watchlist</h1>
        <p className={styles.helperText}>
          Give your collection a name to start saving movies for later.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Watchlist Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Weekend Picks"
              className={styles.input}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Creating..." : "Create Watchlist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateWatchlist;
