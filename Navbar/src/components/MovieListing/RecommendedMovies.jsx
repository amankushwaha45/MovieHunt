import { useMemo, useState } from "react";
import MovieCard from "./MovieCard";
import TheaterFilters from "../../components/TheaterFilters/TheaterFilters";

import "./RecommendedMovies.css";

function RecommendedMovies({
  movies = [],
}) {

  const [
    appliedFilters,
    setAppliedFilters,
  ] = useState({
    Genre: [],
    Language: [],
    Format: [],
  });


  
  const filteredMovies = useMemo(() => {

    return movies.filter(
      (movie) => {

        
        if (
          appliedFilters.Language
            .length > 0
        ) {

          if (
            !appliedFilters.Language.includes(
              movie.language
            )
          ) {
            return false;
          }

        }


        
        if (
          appliedFilters.Genre
            .length > 0
        ) {

          const movieGenres =
            Array.isArray(
              movie.genre
            )
              ? movie.genre
              : [movie.genre];


          const hasMatchingGenre =
            appliedFilters.Genre.some(
              (genre) =>
                movieGenres.includes(
                  genre
                )
            );


          if (!hasMatchingGenre) {
            return false;
          }

        }


        
        if (
          appliedFilters.Format
            .length > 0
        ) {

          if (
            !appliedFilters.Format.includes(
              movie.format
            )
          ) {
            return false;
          }

        }


        return true;

      }
    );

  }, [
    movies,
    appliedFilters,
  ]);


  return (

    <section className="recommended-movies-section">

      <div className="recommended-movies-container">


        

        <div className="recommended-movies-header">

          <div>

            <span className="recommended-movies-label">
              CURATED FOR YOU
            </span>

            <h2 className="recommended-movies-title">
              Recommended Movies
            </h2>

          </div>


          <span className="recommended-results-count">

            {filteredMovies.length}

            {" "}

            Movies

          </span>

        </div>


        

        <div className="recommended-theater-filter">

          <TheaterFilters
            onApplyFilters={
              setAppliedFilters
            }
          />

        </div>


        
        {filteredMovies.length > 0 ? (

          <div className="recommended-movies-grid">

            {filteredMovies.map(
              (movie) => (

                <div
                  className="recommended-movie-item"
                  key={movie._id}
                >

                  <MovieCard
                    id={movie._id}
                    image={movie.poster}
                    title={movie.title}
                    language={
                      movie.language
                    }
                    rating={
                      movie.rating
                    }
                  />

                </div>

              )
            )}

          </div>

        ) : (

          <div className="recommended-empty">

            <div>
              🎬
            </div>

            <h3>
              No Movies Found
            </h3>

            <p>
              Try changing your filters.
            </p>

          </div>

        )}

      </div>

    </section>

  );

}

export default RecommendedMovies;