import {
FaBell,
FaSearch,
FaUserCircle
} from "react-icons/fa";


import "./Navbar.css";



function Navbar(){


return(


<div className="admin-navbar">





<div className="search-box">


<FaSearch/>


<input

type="text"

placeholder="Search movies, users..."

/>


</div>







<div className="nav-right">



<div className="notification">


<FaBell/>


<span>

3

</span>


</div>







<div className="admin-profile">


<FaUserCircle/>


<div>


<h4>

Admin

</h4>


<p>

Super Admin

</p>


</div>



</div>






</div>






</div>


);


}



export default Navbar;