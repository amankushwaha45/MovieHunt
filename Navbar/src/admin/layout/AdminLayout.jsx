import { Outlet } from "react-router-dom";


import Sidebar from "../components/Sidebar/Sidebar";

import Navbar from "../components/Navbar/Navbar";


import "./AdminLayout.css";





function AdminLayout(){


return(


<div className="admin-layout">


<Sidebar/>




<div className="admin-main">


<Navbar/>




<div className="admin-content">


<Outlet/>


</div>




</div>




</div>


);


}



export default AdminLayout;