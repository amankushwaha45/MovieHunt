import { NavLink } from "react-router-dom";

import {
FaHome,
FaFilm,
FaBuilding,
FaClock,
FaTicketAlt,
FaUsers,
FaUserCircle,
FaSignOutAlt
} from "react-icons/fa";


import "./Sidebar.css";





function Sidebar(){


const logout=()=>{


localStorage.removeItem(
"adminToken"
);


window.location.href="/movie-hunt-control-panel";


};





return(

<div className="admin-sidebar">


<div className="admin-logo">

Movie <span>Hunt</span>

</div>




<div className="sidebar-menu">



<NavLink to="/admin/dashboard">

<FaHome/>

Dashboard

</NavLink>




<NavLink to="/admin/movies">

<FaFilm/>

Movies

</NavLink>




<NavLink to="/admin/theatres">

<FaBuilding/>

Theatres

</NavLink>




<NavLink to="/admin/shows">

<FaClock/>

Shows

</NavLink>




<NavLink to="/admin/bookings">

<FaTicketAlt/>

Bookings

</NavLink>




<NavLink to="/admin/users">

<FaUsers/>

Users

</NavLink>




<NavLink to="/admin/profile">

<FaUserCircle/>

Profile

</NavLink>





<button

onClick={logout}

className="logout-side-btn"

>


<FaSignOutAlt/>

Logout


</button>





</div>


</div>

);


}


export default Sidebar;