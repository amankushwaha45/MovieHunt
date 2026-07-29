import { useEffect, useState } from "react";

import {
useNavigate,
useParams
} from "react-router-dom";


import {
FaArrowLeft,
FaSave,
FaImage
} from "react-icons/fa";


import API from "../../../api/api";


import "./EditMovie.css";





function EditMovie(){


const navigate = useNavigate();


const {id}=useParams();




const [movie,setMovie]=useState({

title:"",

description:"",

genre:"",

language:"",

duration:"",

releaseDate:"",

cast:"",

trailer:""

});





const [poster,setPoster]=useState(null);


const [oldPoster,setOldPoster]=useState("");

const [loading,setLoading]=useState(false);








useEffect(()=>{


fetchMovie();


},[]);









const fetchMovie=async()=>{


try{


const res = await API.get(

`/movies/${id}`

);



const data = res.data.movie || res.data;



setMovie({

title:data.title || "",

description:data.description || "",

genre:data.genre || "",

language:data.language || "",

duration:data.duration || "",

releaseDate:data.releaseDate?.slice(0,10) || "",

cast:data.cast || "",

trailer:data.trailer || ""

});



setOldPoster(data.poster);



}

catch(error){


console.log(

"FETCH MOVIE ERROR",

error

);


}



};









const handleChange=(e)=>{


setMovie({

...movie,

[e.target.name]:e.target.value

});


};









const handleUpdate=async(e)=>{


e.preventDefault();



try{


setLoading(true);



const formData = new FormData();





Object.keys(movie).forEach((key)=>{


formData.append(

key,

movie[key]

);


});







if(poster){


formData.append(

"poster",

poster

);


}







const token = localStorage.getItem(

"adminToken"

);







await API.put(

`/movies/${id}`,

formData,

{

headers:{


Authorization:

`Bearer ${token}`,


"Content-Type":

"multipart/form-data"


}

}

);






alert(

"Movie Updated Successfully"

);



navigate(

"/admin/movies"

);



}



catch(error){


console.log(

"UPDATE ERROR",

error

);


alert(

"Update Failed"

);


}



finally{


setLoading(false);


}



};









return(



<div className="edit-movie-page">







<div className="edit-header">



<button

onClick={()=>navigate("/admin/movies")}

>


<FaArrowLeft/>

Back


</button>





<h1>

Edit Movie

</h1>




</div>









<form

className="movie-form"

onSubmit={handleUpdate}

>







<input

name="title"

placeholder="Movie Title"

value={movie.title}

onChange={handleChange}

/>







<textarea

name="description"

placeholder="Description"

value={movie.description}

onChange={handleChange}

/>








<input

name="genre"

placeholder="Genre"

value={movie.genre}

onChange={handleChange}

/>








<input

name="language"

placeholder="Language"

value={movie.language}

onChange={handleChange}

/>








<input

name="duration"

placeholder="Duration"

value={movie.duration}

onChange={handleChange}

/>








<input

type="date"

name="releaseDate"

value={movie.releaseDate}

onChange={handleChange}

/>








<input

name="cast"

placeholder="Cast"

value={movie.cast}

onChange={handleChange}

/>








<input

name="trailer"

placeholder="Trailer URL"

value={movie.trailer}

onChange={handleChange}

/>









{

oldPoster &&


<img

className="old-poster"

src={oldPoster}

alt="poster"

/>


}









<label className="upload-box">


<FaImage/>


Change Poster



<input

type="file"

accept="image/*"

onChange={(e)=>

setPoster(

e.target.files[0]

)

}


/>


</label>









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

"Update Movie"

}



</button>







</form>







</div>



);


}



export default EditMovie;