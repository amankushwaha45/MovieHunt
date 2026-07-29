import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

import LocationModal from "../LocationModal/LocationModal";

import logo from "../../assets/logo.jpeg";

import {
  FaBars,
  FaMapMarkerAlt,
  FaHome,
  FaFilm,
  FaTicketAlt,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  // ==========================
  // STATES
  // ==========================

  const [city, setCity] = useState(
    localStorage.getItem("city") || "Detecting..."
  );

  const [locationModal, setLocationModal] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ==========================
  // SEARCH
  // ==========================

  const handleSearch = () => {
    const value = search.trim();

    if (value) {
      navigate(`/search?query=${encodeURIComponent(value)}`);
    }
  };

  // ==========================
  // CITY SELECT
  // ==========================

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);

    localStorage.setItem("city", selectedCity);

    window.dispatchEvent(new Event("cityChanged"));

    setLocationModal(false);
  };

  // ==========================
  // LOCATION DETECT
  // ==========================

  useEffect(() => {
    if (!localStorage.getItem("city")) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

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
              setCity(detectedCity);

              localStorage.setItem("city", detectedCity);
            }
          } catch (err) {
            console.log(err);
          }
        });
      }
    }
  }, []);

  // ==========================
  // BODY SCROLL LOCK
  // ==========================

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);
  return (
  <>
    <div className="navbar">

      {/* LOGO */}
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="logo"
        />
      </Link>

      {/* ==========================
          SEARCH BOX
      ========================== */}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Movies, Events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      {/* LOCATION */}

      <div
        className="location"
        onClick={() => setLocationModal(true)}
      >
        <FaMapMarkerAlt
          style={{
            color: "#ff0055",
            marginRight: "8px",
          }}
        />

        {city}
      </div>

      {/* LOGIN */}

      <div className="sign">
        {user ? (
          <span className="sign-link">
            <FaUserCircle
              style={{
                marginRight: "8px",
              }}
            />

            {user.name}
          </span>
        ) : (
          <Link
            to="/auth"
            className="sign-link"
          >
            Login
          </Link>
        )}
      </div>

      {/* MENU */}

      <div className="menu-container">
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>

    </div>
          {/* OVERLAY */}
      {menuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* SIDE MENU */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>

        <div className="menu-header">
          <div>
            <h2>
              {user ? `Hi, ${user.name}` : "Welcome 👋"}
            </h2>

            <p>
              {user ? user.email : "Login to continue"}
            </p>
          </div>

          <button
            className="close-btn"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <ul>

          <li
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            <FaHome style={{ marginRight: "15px" }} />
            Home
          </li>

          <li
            onClick={() => {
              navigate("/movies");
              setMenuOpen(false);
            }}
          >
            <FaFilm style={{ marginRight: "15px" }} />
            Movies
          </li>

          {user && (
            <li
              onClick={() => {
                navigate("/my-bookings");
                setMenuOpen(false);
              }}
            >
              <FaTicketAlt style={{ marginRight: "15px" }} />
              My Bookings
            </li>
          )}

          <li
            onClick={() => {
              navigate("/wishlist");
              setMenuOpen(false);
            }}
          >
            <FaHeart style={{ marginRight: "15px" }} />
            Wishlist
          </li>

          <li
            onClick={() => {
              navigate("/settings");
              setMenuOpen(false);
            }}
          >
            <FaCog style={{ marginRight: "15px" }} />
            Settings
          </li>

          {user ? (
            <li
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              <FaSignOutAlt style={{ marginRight: "15px" }} />
              Logout
            </li>
          ) : (
            <li
              onClick={() => {
                navigate("/auth");
                setMenuOpen(false);
              }}
            >
              <FaUserCircle style={{ marginRight: "15px" }} />
              Login
            </li>
          )}

        </ul>
      </div>

      {/* LOCATION MODAL */}
      <LocationModal
        isOpen={locationModal}
        onClose={() => setLocationModal(false)}
        onSelectCity={handleCitySelect}
      />
    </>
  );
}

export default Navbar;