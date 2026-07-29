import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import "./Booking.css";

function Booking() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await API.get(`/movies/${id}`);

      console.log("Booking Movie:", res.data);

      setMovie(res.data.movie);
    } catch (error) {
      console.log("Error fetching movie:", error);
    }
  };

  if (!movie) {
    return <h2>Loading movie...</h2>;
  }

  return (
    <div className="booking-page">

      <h1>Book Tickets</h1>

      <div className="booking-movie">

        <img
          src={movie.poster}
          alt={movie.title}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/300x450?text=No+Poster";
          }}
        />

        <div className="booking-movie-info">

          <h2>{movie.title}</h2>

          <p>🌐 {movie.language}</p>

          <p>⭐ {movie.rating}/10</p>

          <p>🎭 {movie.genre.join(", ")}</p>

          <p>⏱ {movie.duration}</p>

        </div>

      </div>

      <div className="city-section">

        <h2>Select City</h2>

        <button>Delhi</button>

        <button>Mumbai</button>

        <button>Noida</button>

      </div>

    </div>
  );
}

export default Booking;