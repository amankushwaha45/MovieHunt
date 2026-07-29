import { useEffect, useState } from "react";

import {
    FaArrowLeft,
    FaSave
} from "react-icons/fa";


import {
    useNavigate
} from "react-router-dom";


import API from "../../../api/api";


import "./AddShow.css";





function AddShow(){


const navigate = useNavigate();




const [movies,setMovies] = useState([]);

const [theatres,setTheatres] = useState([]);




const [show,setShow] = useState({

movie:"",

theatre:"",

city:"",

screen:"",

date:"",

time:"",

ticketPrice:"",

totalSeats:100

});




const [loading,setLoading] = useState(false);

const [error,setError] = useState("");









useEffect(()=>{


fetchMovies();

fetchTheatres();


},[]);









const fetchMovies = async()=>{


try{


const res = await API.get(

"/movies"

);


setMovies(

res.data.movies || []

);



}

catch(error){


console.log(error);


}



};









const fetchTheatres = async()=>{


try{


const res = await API.get(

"/theatres"

);



setTheatres(

res.data.theatres || []

);



}

catch(error){


console.log(error);


}



};









const handleChange=(e)=>{


setShow({

...show,

[e.target.name]:e.target.value

});


};









const submitHandler=async(e)=>{


e.preventDefault();



try{


setLoading(true);


setError("");





const res = await API.post(

"/showtimes",

{

...show,

ticketPrice:Number(show.ticketPrice),

totalSeats:Number(show.totalSeats)

}

);








if(res.data.success){


alert(

"Show Added Successfully"

);



navigate(

"/admin/shows"

);


}




}

catch(err){


console.log(

"ADD SHOW ERROR",

err

);



setError(

err.response?.data?.message ||

"Failed to add show"

);



}



finally{


setLoading(false);


}



};









return(



<div className="add-show-page">





<div className="show-header">



<button

onClick={()=>navigate("/admin/shows")}

>


<FaArrowLeft/>

Back


</button>






<h1>

Add New Show

</h1>




</div>









<form

className="show-form"

onSubmit={submitHandler}

>









<select

name="movie"

value={show.movie}

onChange={handleChange}

required

>

<option value="">

Select Movie

</option>



{

movies.map((movie)=>(


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

required

>

<option value="">

Select Theatre

</option>



{

theatres.map((theatre)=>(


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

placeholder="City"

value={show.city}

onChange={handleChange}

required

/>









<input

name="screen"

placeholder="Screen Name"

value={show.screen}

onChange={handleChange}

required

/>









<input

type="date"

name="date"

value={show.date}

onChange={handleChange}

required

/>









<input

type="time"

name="time"

value={show.time}

onChange={handleChange}

required

/>









<input

type="number"

name="ticketPrice"

placeholder="Ticket Price"

value={show.ticketPrice}

onChange={handleChange}

required

/>









<input

type="number"

name="totalSeats"

placeholder="Total Seats"

value={show.totalSeats}

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

"Saving..."

:

"Create Show"

}



</button>








</form>








</div>



);



}



export default AddShow;