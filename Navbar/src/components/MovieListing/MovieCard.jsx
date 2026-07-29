import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({
  id,
  image,
  title,
  language,
  rating,
}) {
  return (
    <Link
      to={`/movie/${id}`}
      className="movie-card-link"
    >
      <div className="movie-card">

        <div className="movie-image">

          <img
            src={image}
            alt={title}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/300x450?text=No+Poster";
            }}
          />

          <span className="favorite">
            ❤️
          </span>

          <span className="rating">
            ⭐ {rating}
          </span>

        </div>

        <div className="movie-info">

          <h3>{title}</h3>

          <p>{language}</p>

        </div>

      </div>
    </Link>
  );
}

export default MovieCard;