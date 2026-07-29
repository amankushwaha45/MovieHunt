import { BrowserRouter, Routes, Route } from "react-router-dom";

// =====================
// USER PAGES
// =====================

import Home from "./pages/home/Home";
import Auth from "./pages/Auth/Auth";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Booking from "./pages/Booking/Booking";
import ShowtimePage from "./pages/ShowtimePage/ShowtimePage";
import SeatSelection from "./pages/SeatSelection/SeatSelection";
import Addons from "./pages/Addons/Addons";
import Payment from "./pages/Payment/Payment";
import MyBookings from "./pages/MyBookings/MyBookings";
import Movies from "./pages/Movies/Movies";
import Settings from "./pages/Settings/Settings";

// ✅ SEARCH PAGE
import SearchPage from "./pages/SearchPage/SearchPage";

// =====================
// ADMIN AUTH
// =====================

import AdminLogin from "./admin/auth/AdminLogin/AdminLogin";
import VerifyOTP from "./admin/auth/VerifyOTP/VerifyOTP";

// =====================
// ADMIN PROTECTION
// =====================

import ProtectedRoute from "./admin/ProtectedRoute";

// =====================
// ADMIN LAYOUT
// =====================

import AdminLayout from "./admin/layout/AdminLayout";

// =====================
// ADMIN DASHBOARD
// =====================

import DashboardHome from "./admin/dashboard/DashboardHome/DashboardHome";

// =====================
// ADMIN MOVIES
// =====================

import MovieList from "./admin/movies/MovieList/MovieList";
import AddMovie from "./admin/movies/AddMovie/AddMovie";
import EditMovie from "./admin/movies/EditMovie/EditMovie";

// =====================
// ADMIN THEATRES
// =====================

import TheatreList from "./admin/theatres/TheatreList/TheatreList";
import AddTheatre from "./admin/theatres/AddTheatre/AddTheatre";
import EditTheatre from "./admin/theatres/EditTheatre/EditTheatre";

// =====================
// ADMIN SHOWS
// =====================

import ShowList from "./admin/shows/ShowList/ShowList";
import AddShow from "./admin/shows/AddShow/AddShow";
import EditShow from "./admin/shows/EditShow/EditShow";

// =====================
// ADMIN BOOKINGS
// =====================

import BookingList from "./admin/bookings/BookingList/BookingList";

// =====================
// ADMIN USERS
// =====================

import UserList from "./admin/users/UserList/UserList";

// =====================
// ADMIN PROFILE
// =====================

import Profile from "./admin/profile/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* USER ROUTES */}

        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route
          path="/movie/:id/showtimes"
          element={<ShowtimePage />}
        />

        <Route path="/booking/:id" element={<Booking />} />

        <Route path="/seat/:id" element={<SeatSelection />} />

        <Route path="/addons" element={<Addons />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/movies" element={<Movies />} />

        {/* ✅ SEARCH ROUTE */}
        <Route path="/search" element={<SearchPage />} />

        <Route path="/settings" element={<Settings />} />
                {/* =====================
              ADMIN AUTH
        ===================== */}

        <Route
          path="/movie-hunt-control-panel"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/verify-otp"
          element={<VerifyOTP />}
        />

        {/* =====================
              ADMIN PANEL
        ===================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<DashboardHome />}
          />

          {/* Movies */}
          <Route
            path="movies"
            element={<MovieList />}
          />

          <Route
            path="movies/add"
            element={<AddMovie />}
          />

          <Route
            path="movies/edit/:id"
            element={<EditMovie />}
          />

          {/* Theatres */}
          <Route
            path="theatres"
            element={<TheatreList />}
          />

          <Route
            path="theatres/add"
            element={<AddTheatre />}
          />

          <Route
            path="theatres/edit/:id"
            element={<EditTheatre />}
          />

          {/* Shows */}
          <Route
            path="shows"
            element={<ShowList />}
          />

          <Route
            path="shows/add"
            element={<AddShow />}
          />

          <Route
            path="shows/edit/:id"
            element={<EditShow />}
          />

          {/* Bookings */}
          <Route
            path="bookings"
            element={<BookingList />}
          />

          {/* Users */}
          <Route
            path="users"
            element={<UserList />}
          />

          {/* Profile */}
          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;