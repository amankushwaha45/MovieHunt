import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./HeroSlider.css";

function HeroSlider({ movies }) {

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);


  

  const trendingMovies = movies.filter(
    (movie) => movie.isTrending === true
  );


  

  useEffect(() => {

    
    if (trendingMovies.length <= 1) {
      return;
    }


    const interval = setInterval(() => {

      setCurrent((prev) => {

        return (
          (prev + 1) %
          trendingMovies.length
        );

      });

    }, 4000);


    

    return () => {
      clearInterval(interval);
    };

  }, [trendingMovies.length]);


  

  useEffect(() => {

    if (
      current >= trendingMovies.length
    ) {

      setCurrent(0);

    }

  }, [
    current,
    trendingMovies.length
  ]);


  

  if (
    !movies ||
    trendingMovies.length === 0
  ) {

    return null;

  }


  

  const movie =
    trendingMovies[current];


  

  const nextSlide = () => {

    setCurrent(
      (prev) =>
        (prev + 1) %
        trendingMovies.length
    );

  };


  
  const prevSlide = () => {

    setCurrent((prev) => {

      if (prev === 0) {

        return (
          trendingMovies.length - 1
        );

      }

      return prev - 1;

    });

  };


  

  const handleBookNow = () => {

    navigate(
      `/movie/${movie._id}`
    );

  };


  return (

    <section className="hero-slider">


      

      <div
        className="hero-bg"
        style={{
          backgroundImage:
            `url(${
              movie.banner ||
              movie.poster
            })`,
        }}
      ></div>


      

      <div className="hero-overlay">


        

        <div className="hero-text">


          

          <span className="hero-label">
            TRENDING NOW
          </span>


          

          <h1>
            {movie.title}
          </h1>


          

          <h3>

            {movie.genre &&
              movie.genre.length > 0
              ? movie.genre.join(" • ")
              : "Movie"
            }

          </h3>


          
          <div className="hero-rating">

            ⭐ {movie.rating || "N/A"}

          </div>


          

          <p className="description">

            {movie.description}

          </p>


          

          <button
            className="book-btn"
            onClick={handleBookNow}
          >

            🎟 Book Now

          </button>


        </div>


        
        <div className="hero-poster">

          <img
            src={
              movie.poster ||
              movie.banner
            }
            alt={movie.title}
          />

        </div>


      </div>


      

      {trendingMovies.length > 1 && (

        <button
          className="arrow left"
          onClick={prevSlide}
          aria-label="Previous movie"
        >

          ❮

        </button>

      )}


      
      {trendingMovies.length > 1 && (

        <button
          className="arrow right"
          onClick={nextSlide}
          aria-label="Next movie"
        >

          ❯

        </button>

      )}


      

      {trendingMovies.length > 1 && (

        <div className="dots">

          {trendingMovies.map(
            (movie, index) => (

              <button
                key={movie._id}
                className={
                  current === index
                    ? "dot active"
                    : "dot"
                }
                onClick={() =>
                  setCurrent(index)
                }
                aria-label={
                  `Go to slide ${index + 1}`
                }
              ></button>

            )
          )}

        </div>

      )}

    </section>

  );

}

export default HeroSlider;