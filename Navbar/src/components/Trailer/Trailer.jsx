import "./Trailer.css";

function Trailer({ trailer }) {
  if (!trailer) return null;

  return (
    <section className="trailer-section">
      <div className="trailer-container">
        <h2>Trailer</h2>

        <div className="trailer-video">
          <iframe
            width="100%"
            height="500"
            src={trailer}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Trailer;