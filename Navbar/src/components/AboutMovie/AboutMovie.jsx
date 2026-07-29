import "./AboutMovie.css";

function AboutMovie({ movie }) {
  return (
    <section className="about-movie">
      <div className="about-container">
        <h2>About the Movie</h2>

        <p>{movie.description}</p>

        <div className="movie-details-grid">
          <div>
            <h4>Language</h4>
            <p>{movie.language}</p>
          </div>

          <div>
            <h4>Genre</h4>
            <p>{movie.genre.join(", ")}</p>
          </div>

          <div>
            <h4>Duration</h4>
            <p>{movie.duration}</p>
          </div>

          <div>
            <h4>Certificate</h4>
            <p>{movie.certificate}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMovie;