import "./MovieBanner.css";
import { useNavigate } from "react-router-dom";

function MovieBanner({ movie }) {
  const navigate = useNavigate();

  return (
    <section
      className="movie-banner"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.9)), url(${
          movie.banner || movie.poster
        })`,
      }}
    >
      <div className="movie-banner-content">

        <div className="movie-banner-poster">
          <img
            src={movie.poster}
            alt={movie.title}
          />
        </div>

        <div className="movie-banner-info">

          <h1>{movie.title}</h1>

          <div className="movie-rating">
            ⭐ {movie.rating}/10
          </div>

          <div className="movie-tags">
            <span>{movie.language}</span>

            <span>{movie.format}</span>

            <span>{movie.certificate}</span>
          </div>

          <div className="movie-extra">

            <span>
              {movie.genre?.join(" • ")}
            </span>

            <span> | </span>

            <span>
              {movie.duration}
            </span>

            <span> | </span>

            <span>
              {new Date(
                movie.releaseDate
              ).toLocaleDateString()}
            </span>

          </div>


          <button
            className="book-btn"
            onClick={() =>
              navigate(
                `/movie/${movie._id}/showtimes`
              )
            }
          >
            🎟 Book Tickets
          </button>

        </div>

      </div>
    </section>
  );
}

export default MovieBanner;