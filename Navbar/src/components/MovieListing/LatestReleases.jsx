import MovieCard from "./MovieCard";
import "./LatestReleases.css";

function LatestReleases({ movies }) {
  return (
    <section className="latest-releases-section">
      <div className="latest-releases-container">

        <div className="latest-releases-heading">
          <div>
            <span className="latest-releases-label">
              JUST RELEASED
            </span>

            <h2 className="latest-releases-title">
              Latest Releases
            </h2>
          </div>

          <span className="latest-releases-arrow">
            →
          </span>
        </div>


        <div className="latest-releases-row">

          {movies && movies.length > 0 ? (

            movies.map((movie) => (

              <div
                className="latest-releases-card"
                key={movie._id}
              >
                <MovieCard
                  id={movie._id}
                  image={movie.poster}
                  title={movie.title}
                  language={movie.language}
                  rating={movie.rating}
                />
              </div>

            ))

          ) : (

            <div className="latest-releases-empty">
              <span>🎬</span>
              <p>No Movies Found</p>
            </div>

          )}

        </div>

      </div>
    </section>
  );
}

export default LatestReleases;