import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/movies/${id}`);
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-600 mt-2">{movie.tagline}</p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-500 font-bold text-lg">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-600 ml-2">
              ({movie.vote_count} votes)
            </span>
          </div>
          <p className="mt-4">{movie.overview}</p>
          <div className="mt-4">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
