import { useEffect,useState } from "react";

import {
FaEdit,
FaTrash,
FaPlus
} from "react-icons/fa";


import {useNavigate} from "react-router-dom";


import API from "../../../api/api";


import "./ShowList.css";




function ShowList(){


const navigate = useNavigate();


const [shows,setShows] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");








useEffect(()=>{


fetchShows();


},[]);









const fetchShows = async()=>{


try{


const res = await API.get(

"/showtimes"

);



console.log(

res.data

);



setShows(

res.data.showtimes || []

);



}

catch(error){


console.log(

"SHOW FETCH ERROR",

error

);


}

finally{


setLoading(false);


}



};









const deleteShow = async(id)=>{


const confirmDelete = window.confirm(

"Delete this show?"

);



if(!confirmDelete)

return;




try{


await API.delete(

`/showtimes/${id}`

);



alert(

"Show Deleted Successfully"

);



fetchShows();



}

catch(error){


console.log(error);


}



};









const filteredShows = shows.filter((show)=>


show.movie?.title

?.toLowerCase()

.includes(

search.toLowerCase()

)


);










if(loading){


return(

<h2 className="loading">

Loading Shows...

</h2>

);


}









return(



<div className="show-page">





<div className="show-header">


<div>

<h1>

Show Management

</h1>


<p>

Manage Movie Showtimes

</p>


</div>







<button

onClick={()=>navigate("/admin/shows/add")}

>


<FaPlus/>

Add Show


</button>




</div>








<input

className="show-search"

placeholder="Search movie..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

/>









<div className="show-grid">





{

filteredShows.length > 0

?

filteredShows.map((show)=>(



<div

className="show-card"

key={show._id}

>







<h2>

{show.movie?.title}

</h2>






<p>

🏢 {show.theatre?.name}

</p>






<p>

📍 {show.city}

</p>






<p>

🖥 {show.screen}

</p>






<p>

📅

{

new Date(show.date)

.toLocaleDateString()

}

</p>






<p>

⏰ {show.time}

</p>






<p>

💰 ₹{show.ticketPrice}

</p>







<div className="show-actions">





<button

className="edit-btn"

onClick={()=>navigate(

`/admin/shows/edit/${show._id}`

)}

>

<FaEdit/>

</button>








<button

className="delete-btn"

onClick={()=>deleteShow(show._id)}

>

<FaTrash/>

</button>






</div>







</div>



))


:

<div className="no-data">

No Shows Found

</div>



}








</div>






</div>


);



}



export default ShowList;