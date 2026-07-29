import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";

import SimilarMovies from "../../components/SimilarMovies/SimilarMovies";
import CastCrew from "../../components/CastCrew/CastCrew";
import AboutMovie from "../../components/AboutMovie/AboutMovie";
import Trailer from "../../components/Trailer/Trailer";
import MovieBanner from "../../components/MovieBanner/MovieBanner";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import Qna from "../../components/qna/qna";

import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [theme, setTheme] = useState("light");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await API.get(`/movies/${id}`);

      setMovie(res.data.movie);
    } catch (err) {
      console.log("Movie Details Error:", err);
    }
  };

  if (!movie) {
    return (
      <div className="movie-details-loading">
        <div className="movie-details-loader"></div>

        <p>Loading movie...</p>
      </div>
    );
  }

  return (
    <div className="movie-details-page">

      <Navbar
        theme={theme}
        setTheme={setTheme}
      />

      <main className="movie-details-container">

        
        <section className="movie-details-banner-section">
          <MovieBanner movie={movie} />
        </section>


        
        <section className="movie-details-about-section">
          <AboutMovie movie={movie} />
        </section>


        
        <section className="movie-details-cast-section">
          <CastCrew cast={movie.cast} />
        </section>


        
        <section className="movie-details-trailer-section">
          <Trailer trailer={movie.trailer} />
        </section>


        
        <section className="movie-details-similar-section">
          <SimilarMovies />
        </section>

      </main>


      
      <section className="movie-details-qna-section">
        <Qna />
      </section>


      
      <Footer />

    </div>
  );
}

export default MovieDetails;