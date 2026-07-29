import { useEffect, useState } from "react";

import {
    FaEdit,
    FaTrash,
    FaPlus
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import API from "../../../api/api";

import "./MovieList.css";



const SERVER_URL = "http://localhost:5001";





function MovieList(){


const navigate = useNavigate();


const [movies,setMovies] = useState([]);

const [search,setSearch] = useState("");

const [loading,setLoading] = useState(true);






useEffect(()=>{

getMovies();

},[]);








const getMovies = async()=>{


try{


const res = await API.get("/movies");


console.log(
"MOVIES RESPONSE",
res.data
);



setMovies(

res.data.movies || []

);



}

catch(error){


console.log(

"GET MOVIES ERROR",

error

);


}

finally{


setLoading(false);


}



};









const deleteMovie = async(id)=>{


try{


const confirmDelete = window.confirm(

"Delete this movie?"

);



if(!confirmDelete)

return;





await API.delete(

`/movies/${id}`

);




alert(

"Movie Deleted"

);



getMovies();



}

catch(error){


console.log(

"DELETE ERROR",

error

);



}



};









const getPoster = (poster)=>{


if(!poster)

return "https://via.placeholder.com/300x450?text=No+Poster";




if(poster.startsWith("http")){


return poster;


}



return SERVER_URL + poster;



};










const filteredMovies = movies.filter((movie)=>


movie.title

?.toLowerCase()

.includes(

search.toLowerCase()

)


);








if(loading){


return(

<h2 className="loading">

Loading Movies...

</h2>

);


}








return(


<div className="movie-page">







<div className="movie-header">


<h1>

Movie Management

</h1>





<button

onClick={()=>navigate("/admin/movies/add")}

>


<FaPlus/>

Add Movie


</button>



</div>









<input

className="movie-search"

placeholder="Search movie..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

/>









<div className="movie-grid">





{

filteredMovies.length > 0 ?



filteredMovies.map((movie)=>(



<div

className="movie-card"

key={movie._id}

>







<img


className="movie-poster"


src={getPoster(movie.poster)}


alt={movie.title}



onError={(e)=>{


e.currentTarget.src =

"https://via.placeholder.com/300x450?text=No+Poster";


}}



/>










<div className="movie-info">





<h2>

{movie.title}

</h2>







<p>

🎭 Genre:

{

Array.isArray(movie.genre)

?

movie.genre.join(", ")

:

movie.genre

}

</p>








<p>

🌐 Language:

{movie.language}

</p>








<p>

📍 City:

{movie.city}

</p>








<p>

⏱ Duration:

{movie.duration}

</p>









<div className="movie-actions">





<button

className="edit-btn"

onClick={()=>navigate(

`/admin/movies/edit/${movie._id}`

)}

>

<FaEdit/>

</button>







<button

className="delete-btn"

onClick={()=>deleteMovie(movie._id)}

>

<FaTrash/>

</button>







</div>







</div>







</div>



))



:



<div className="no-data">

No Movies Found

</div>



}






</div>







</div>


);


}



export default MovieList;