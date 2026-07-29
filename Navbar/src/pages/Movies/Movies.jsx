import { useEffect, useState } from "react";

import MovieCard from "../../components/MovieListing/MovieCard";

import API from "../../api/api";

import "./Movies.css";

function Movies(){

const [movies,setMovies] = useState([]);

const [loading,setLoading] = useState(true);



useEffect(()=>{

getMovies();

},[]);



const getMovies = async()=>{

try{

const res = await API.get("/movies");


console.log(
"ALL MOVIES",
res.data
);


setMovies(
res.data.movies || []
);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};



if(loading){

return <h2>Loading Movies...</h2>;

}



return(

<div className="movies-page">


<h1>
All Movies
</h1>



<div className="movies-grid">


{

movies.length > 0 ?


movies.map((movie)=>(


<MovieCard

key={movie._id}

id={movie._id}

image={movie.poster}

title={movie.title}

language={movie.language}

rating={movie.rating}

/>


))


:

<h2>
No Movies Found
</h2>


}


</div>


</div>

);


}


export default Movies;