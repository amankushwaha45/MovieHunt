import { useEffect, useState } from "react";

import {
    FaArrowLeft,
    FaSave
} from "react-icons/fa";


import {
    useNavigate,
    useParams
} from "react-router-dom";


import API from "../../../api/api";


import "./EditShow.css";





function EditShow(){


const navigate = useNavigate();

const {id}=useParams();




const [movies,setMovies]=useState([]);

const [theatres,setTheatres]=useState([]);





const [show,setShow]=useState({

movie:"",

theatre:"",

city:"",

screen:"",

date:"",

time:"",

ticketPrice:"",

totalSeats:""

});





const [loading,setLoading]=useState(false);

const [fetching,setFetching]=useState(true);

const [error,setError]=useState("");









useEffect(()=>{


fetchData();


},[]);









const fetchData=async()=>{


try{


const movieRes = await API.get(

"/movies"

);



const theatreRes = await API.get(

"/theatres"

);




setMovies(

movieRes.data.movies || []

);



setTheatres(

theatreRes.data.theatres || []

);






const showRes = await API.get(

`/showtimes/${id}`

);





const data = showRes.data.showtime;





setShow({


movie:data.movie?._id || data.movie,


theatre:data.theatre?._id || data.theatre,


city:data.city,


screen:data.screen,


date:data.date?.substring(0,10),


time:data.time,


ticketPrice:data.ticketPrice,


totalSeats:data.totalSeats



});



}



catch(error){


console.log(

"EDIT SHOW ERROR",

error

);


}



finally{


setFetching(false);


}



};









const handleChange=(e)=>{


setShow({

...show,

[e.target.name]:e.target.value

});


};









const updateShow=async(e)=>{


e.preventDefault();



try{


setLoading(true);


setError("");





const res = await API.put(

`/showtimes/${id}`,

{

...show,

ticketPrice:Number(show.ticketPrice),

totalSeats:Number(show.totalSeats)

}

);







if(res.data.success){


alert(

"Show Updated Successfully"

);



navigate(

"/admin/shows"

);



}



}

catch(error){


console.log(

"UPDATE ERROR",

error

);



setError(

error.response?.data?.message ||

"Update Failed"

);



}

finally{


setLoading(false);


}



};









if(fetching){


return(

<h2 className="loading">

Loading Show...

</h2>

);


}









return(



<div className="edit-show-page">






<div className="show-header">



<button

onClick={()=>navigate("/admin/shows")}

>


<FaArrowLeft/>

Back


</button>







<h1>

Edit Show

</h1>




</div>








<form

className="show-form"

onSubmit={updateShow}

>







<select

name="movie"

value={show.movie}

onChange={handleChange}

>


<option value="">

Select Movie

</option>



{

movies.map(movie=>(


<option

key={movie._id}

value={movie._id}

>

{movie.title}

</option>


))


}



</select>









<select

name="theatre"

value={show.theatre}

onChange={handleChange}

>


<option value="">

Select Theatre

</option>



{

theatres.map(theatre=>(


<option

key={theatre._id}

value={theatre._id}

>

{theatre.name}

</option>


))


}



</select>









<input

name="city"

value={show.city}

placeholder="City"

onChange={handleChange}

/>









<input

name="screen"

value={show.screen}

placeholder="Screen"

onChange={handleChange}

/>









<input

type="date"

name="date"

value={show.date}

onChange={handleChange}

/>









<input

type="time"

name="time"

value={show.time}

onChange={handleChange}

/>









<input

type="number"

name="ticketPrice"

value={show.ticketPrice}

placeholder="Ticket Price"

onChange={handleChange}

/>









<input

type="number"

name="totalSeats"

value={show.totalSeats}

placeholder="Total Seats"

onChange={handleChange}

/>








{

error &&

<p className="error-msg">

{error}

</p>

}








<button

className="save-btn"

disabled={loading}

>


<FaSave/>

{

loading

?

"Updating..."

:

"Update Show"

}



</button>







</form>







</div>



);



}



export default EditShow;