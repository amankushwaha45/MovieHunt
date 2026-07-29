import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
FaArrowLeft,
FaSave,
FaImage
} from "react-icons/fa";


import API from "../../../api/api";

import "./AddMovie.css";




function AddMovie(){


const navigate = useNavigate();



const [movie,setMovie] = useState({

title:"",

description:"",

genre:"",

language:"",

city:"",

duration:"",

releaseDate:"",

cast:"",

trailer:""

});



const [poster,setPoster] = useState(null);


const [loading,setLoading] = useState(false);


const [error,setError] = useState("");






const handleChange=(e)=>{


setMovie({

...movie,

[e.target.name]:e.target.value

});


};








const handleSubmit=async(e)=>{


e.preventDefault();


try{


setLoading(true);

setError("");



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

else{


setError(
"Please upload poster"
);


setLoading(false);

return;


}






const token = localStorage.getItem(

"adminToken"

);






const res = await API.post(

"/movies",

formData,

{

headers:{


Authorization:`Bearer ${token}`,

"Content-Type":"multipart/form-data"


}

}

);







console.log(

res.data

);






if(res.data.success){


alert(

"Movie Added Successfully"

);


navigate(

"/admin/movies"

);


}



}


catch(error){


console.log(

"ADD MOVIE ERROR",

error.response?.data

);



setError(

error.response?.data?.message ||

"Movie Add Failed"

);


}



finally{


setLoading(false);


}


};








return(


<div className="add-movie-page">



<div className="add-header">


<button

type="button"

onClick={()=>navigate("/admin/movies")}

>

<FaArrowLeft/>

Back

</button>



<h1>

Add New Movie

</h1>


</div>








<form

className="movie-form"

onSubmit={handleSubmit}

>






<input

name="title"

placeholder="Movie Title"

value={movie.title}

onChange={handleChange}

required

/>







<textarea

name="description"

placeholder="Description"

value={movie.description}

onChange={handleChange}

required

/>








<input

name="genre"

placeholder="Genre (Action,Drama)"

value={movie.genre}

onChange={handleChange}

required

/>







<input

name="language"

placeholder="Language"

value={movie.language}

onChange={handleChange}

required

/>








<input

name="city"

placeholder="City"

value={movie.city}

onChange={handleChange}

required

/>








<input

name="duration"

placeholder="Duration"

value={movie.duration}

onChange={handleChange}

required

/>








<input

type="date"

name="releaseDate"

value={movie.releaseDate}

onChange={handleChange}

required

/>








<input

name="cast"

placeholder="Cast (Actor1,Actor2)"

value={movie.cast}

onChange={handleChange}

/>








<input

name="trailer"

placeholder="Trailer URL"

value={movie.trailer}

onChange={handleChange}

/>









<label className="upload-box">


<FaImage/>

Upload Poster


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







{

poster &&

<p className="file-name">

{poster.name}

</p>

}







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

"Save Movie"

}


</button>





</form>



</div>


);


}



export default AddMovie;