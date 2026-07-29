import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import "./SearchPage.css";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `http://localhost:5001/api/movies/search/${encodeURIComponent(query)}`
        );

        if (res.data.success) {
          setMovies(res.data.movies);
        } else {
          setMovies([]);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while searching.");
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      fetchMovies();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h2>Search Results</h2>
        <p>
          Showing results for <span>"{query}"</span>
        </p>
      </div>

      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : error ? (
        <div className="no-result">
          <h2>{error}</h2>
        </div>
      ) : movies.length === 0 ? (
        <div className="no-result">
          <h2>No Movies Found 🎬</h2>
        </div>
      ) : (
        <div className="search-grid">
          {movies.map((movie) => (
            <Link
              key={movie._id}
              to={`/movie/${movie._id}`}
              className="search-card"
            >
              <img
                src={
                  movie.poster.startsWith("http")
                    ? movie.poster
                    : `http://localhost:5001${movie.poster}`
                }
                alt={movie.title}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/300x450?text=No+Poster";
                }}
              />

              <div className="card-content">
                <h3>{movie.title}</h3>

                <p>{movie.language}</p>

                <div className="movie-info">
                  <span>{movie.duration}</span>
                  <span>{movie.city}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;