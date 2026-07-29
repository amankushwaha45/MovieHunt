import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaTimes,
  FaLocationArrow,
  FaCity,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./LocationModal.css";

const API = "http://localhost:5001/api/cities";

function LocationModal({
  isOpen,
  onClose,
  onSelectCity,
}) {
  const [cities, setCities] = useState([]);
  const [popularCities, setPopularCities] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCities();
      fetchPopularCities();
    }
  }, [isOpen]);

  

  const fetchCities = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);

      setCities(res.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  

  const fetchPopularCities = async () => {
    try {
      const res = await axios.get(API + "/popular");

      setPopularCities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } =
          position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await response.json();

          const detectedCity =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;

          if (detectedCity) {
            onSelectCity(detectedCity);
            onClose();
          }
        } catch (err) {
          console.log(err);
        }
      },
      () => {
        alert("Unable to detect location");
      }
    );
  };

  

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  
  const getCityIcon = (cityName) => {
    switch (cityName.toLowerCase()) {
      case "mumbai":
        return <FaBuilding />;

      case "delhi":
        return <FaCity />;

      case "lucknow":
        return <FaMapMarkerAlt />;

      case "hyderabad":
        return <FaBuilding />;

      case "bengaluru":
        return <FaCity />;

      case "kolkata":
        return <FaBuilding />;

      case "chennai":
        return <FaCity />;

      case "pune":
        return <FaBuilding />;

      case "jaipur":
        return <FaCity />;

      case "ahmedabad":
        return <FaBuilding />;

      default:
        return <FaMapMarkerAlt />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="location-overlay"
      onClick={onClose}
    >
      <div
        className="location-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="location-header">
          <h2>Select Your City</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Search */}

        <div className="search-city">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search your city..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* Detect Location */}

        <div
          className="detect-location"
          onClick={detectLocation}
        >
          <FaLocationArrow />

          <span>Detect My Location</span>
        </div>

        {/* Popular Cities */}

        <h3 className="section-title">
          Popular Cities
        </h3>

        <div className="popular-grid">
          {popularCities.length > 0 ? (
            popularCities.map((city) => (
              <div
                key={city._id}
                className="popular-card"
                onClick={() => {
                  onSelectCity(city.name);
                  onClose();
                }}
              >
                <div className="city-icon">
                  {getCityIcon(city.name)}
                </div>

                <h4>{city.name}</h4>

                <span>{city.state}</span>
              </div>
            ))
          ) : (
            <div className="loading">
              Loading Popular Cities...
            </div>
          )}
        </div>

        {/* All Cities */}

        <h3 className="section-title">
          All Cities
        </h3>

        <div className="city-grid">
                      {loading ? (
            <div className="loading">
              <h3>Loading Cities...</h3>
            </div>
          ) : filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city._id}
                className="city-card"
                onClick={() => {
                  onSelectCity(city.name);
                  onClose();
                }}
              >
                <div className="city-icon">
                  {getCityIcon(city.name)}
                </div>

                <h4>{city.name}</h4>

                <span>{city.state}</span>
              </div>
            ))
          ) : (
            <div className="no-city">
              <FaSearch
                style={{
                  fontSize: "55px",
                  marginBottom: "15px",
                  color: "#f84464",
                }}
              />

              <h3>No City Found</h3>

              <p>
                Try searching with another city
                name.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default LocationModal;