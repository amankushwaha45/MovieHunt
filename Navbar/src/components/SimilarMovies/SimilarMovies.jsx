import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import MovieCard from "../MovieListing/MovieCard";

import "./SimilarMovies.css";

function SimilarMovies() {
  const { id } = useParams();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchSimilarMovies();
  }, [id]);

  const fetchSimilarMovies = async () => {
    try {
      const res = await API.get(`/movies/${id}/similar`);

      console.log("Similar Movies:", res.data);

      setMovies(res.data.movies);
    } catch (error) {
      console.log("Error fetching similar movies:", error);
    }
  };

  // Don't show section if no similar movies
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="similar-movies-section">
      <div className="similar-movies-container">

        <h2 className="similar-movies-title">
          You May Also Like
        </h2>

        <div className="similar-movies-grid">

          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              id={movie._id}
              image={movie.poster}
              title={movie.title}
              language={movie.language}
              rating={movie.rating}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default SimilarMovies;