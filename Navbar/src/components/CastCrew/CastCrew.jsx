import "./CastCrew.css";

function CastCrew({ cast }) {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <section className="cast-section">
      <div className="cast-container">
        <h2>Cast & Crew</h2>

        <div className="cast-list">
          {cast.map((person, index) => (
            <div className="cast-card" key={index}>
              <img src={person.image} alt={person.name} />

              <h3>{person.name}</h3>

              <p>{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CastCrew;