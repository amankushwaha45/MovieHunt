import { useEffect, useState } from "react";

import {
FaEdit,
FaTrash,
FaPlus,
FaBuilding
} from "react-icons/fa";


import { useNavigate } from "react-router-dom";


import API from "../../../api/api";


import "./TheatreList.css";






function TheatreList(){


const navigate = useNavigate();



const [theatres,setTheatres] = useState([]);

const [search,setSearch] = useState("");

const [loading,setLoading] = useState(true);









useEffect(()=>{


fetchTheatres();


},[]);









const fetchTheatres = async()=>{


try{


const res = await API.get(

"/theatres"

);



console.log(

"THEATRE DATA",

res.data

);




setTheatres(

res.data.theatres || []

);



}

catch(error){


console.log(

"THEATRE FETCH ERROR",

error

);


}


finally{


setLoading(false);


}



};









const deleteTheatre = async(id)=>{


const confirmDelete = window.confirm(

"Delete this theatre?"

);



if(!confirmDelete)

return;






try{


await API.delete(

`/theatres/${id}`

);



alert(

"Theatre Deleted Successfully"

);



fetchTheatres();



}



catch(error){


console.log(

"DELETE ERROR",

error

);


}


};









const filteredTheatres = theatres.filter((theatre)=>


theatre.name

?.toLowerCase()

.includes(

search.toLowerCase()

)


);








if(loading){


return(

<h2 className="loading">

Loading Theatres...

</h2>

);


}










return(



<div className="theatre-page">







<div className="theatre-header">



<div>


<h1>

Theatre Management

</h1>


<p>

Manage Cinemas & Screens

</p>


</div>






<button

onClick={()=>navigate("/admin/theatres/add")}

>


<FaPlus/>

Add Theatre


</button>





</div>









<input

className="theatre-search"

placeholder="Search Theatre..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

/>









<div className="theatre-grid">







{

filteredTheatres.length > 0

?

filteredTheatres.map((theatre)=>(



<div

className="theatre-card"

key={theatre._id}

>







<div className="theatre-icon">

<FaBuilding/>

</div>







<div className="theatre-info">


<h2>

{theatre.name}

</h2>





<p>

📍 {theatre.city}

</p>





<p>

🏢 {theatre.address}

</p>






<p>

🎬 Screens:

{

theatre.screens?.length || 0

}

</p>





<div className="theatre-actions">





<button

className="edit-btn"

onClick={()=>navigate(

`/admin/theatres/edit/${theatre._id}`

)}

>

<FaEdit/>

</button>







<button

className="delete-btn"

onClick={()=>deleteTheatre(theatre._id)}

>

<FaTrash/>

</button>






</div>







</div>







</div>



))


:



<div className="no-data">

No Theatres Found

</div>



}








</div>








</div>



);



}



export default TheatreList;