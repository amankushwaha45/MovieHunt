import { useEffect, useState } from "react";
import "./Home.css";

import API from "../../api/api";

import Navbar from "../../components/navbar/navbar";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import LatestReleases from "../../components/MovieListing/LatestReleases";
import RecommendedMovies from "../../components/MovieListing/RecommendedMovies";
import Footer from "../../components/Footer/Footer";
import Qna from "../../components/qna/qna";

function Home() {
  const [theme, setTheme] = useState("light");
  const [movies, setMovies] = useState([]);
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("city") || ""
  );

  

  useEffect(() => {
    const handleStorage = () => {
      setSelectedCity(localStorage.getItem("city") || "");
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  

  useEffect(() => {
    fetchMovies();
  }, [selectedCity]);

  

  const fetchMovies = async () => {
    try {
      let url = "/movies";

      if (
        selectedCity &&
        selectedCity !== "Detecting..."
      ) {
        url += `?city=${selectedCity}`;
      }

      const res = await API.get(url);

      console.log("Selected City:", selectedCity);
      console.log("Movies:", res.data);

      setMovies(res.data.movies || []);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  return (
    <>
      
      <Navbar
        theme={theme}
        setTheme={setTheme}
      />

      <main>
        

        <HeroSlider movies={movies} />

        

        <LatestReleases movies={movies} />

        

        <RecommendedMovies movies={movies} />
      </main>

      

      <Qna />

     

      <Footer />
    </>
  );
}

export default Home;