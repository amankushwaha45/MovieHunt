import { useEffect, useState } from "react";

import {
    FaFilm,
    FaBuilding,
    FaUsers,
    FaTicketAlt,
    FaRupeeSign
} from "react-icons/fa";


import { motion } from "framer-motion";


import API from "../../../api/api";


import Charts from "../../components/Charts/Charts";


import "./DashboardHome.css";
import Tables from "../../components/Tables/Tables";




function DashboardHome(){


const [dashboard,setDashboard] = useState(null);

const [loading,setLoading] = useState(true);







useEffect(()=>{

fetchDashboard();

},[]);








const fetchDashboard = async()=>{


try{


const token = localStorage.getItem(
"adminToken"
);




const res = await API.get(

"/admin/dashboard",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);





setDashboard(

res.data.dashboard

);



}

catch(error){


console.log(

"Dashboard Error",

error

);


}

finally{


setLoading(false);


}


};









if(loading){


return(

<h2 className="loading">

Loading Dashboard...

</h2>

);


}








if(!dashboard){


return(

<h2 className="loading">

No Data Found

</h2>

);


}









const cards=[


{

title:"Movies",

value:dashboard.totalMovies,

icon:<FaFilm/>

},



{

title:"Theatres",

value:dashboard.totalTheatres,

icon:<FaBuilding/>

},



{

title:"Users",

value:dashboard.totalUsers,

icon:<FaUsers/>

},



{

title:"Bookings",

value:dashboard.totalBookings,

icon:<FaTicketAlt/>

},



{

title:"Revenue",

value:`₹${dashboard.revenue}`,

icon:<FaRupeeSign/>

}



];









return(


<div className="dashboard-page">





<h1>

Movie Hunt Dashboard

</h1>







<div className="stats-container">


{

cards.map((card,index)=>(



<motion.div


className="stat-card"


key={index}



initial={{

opacity:0,

y:30

}}



animate={{

opacity:1,

y:0

}}



transition={{

delay:index*0.1

}}



whileHover={{

scale:1.05

}}


>



<div className="card-icon">

{card.icon}

</div>




<div>


<h3>

{card.title}

</h3>



<h2>

{card.value}

</h2>



</div>




</motion.div>



))


}



</div>









{/* CHART SECTION */}


<Charts


bookingData={dashboard.bookingChart}


revenueData={dashboard.revenueChart}


movieData={dashboard.topMovies}


/>
<Tables

bookings={dashboard.recentBookings}

/>








</div>


);


}





export default DashboardHome;