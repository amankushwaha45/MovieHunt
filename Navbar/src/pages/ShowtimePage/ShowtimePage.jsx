import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../api/api";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import Qna from "../../components/qna/qna";

import SeatCountModal from "../../components/SeatCountModal/SeatCountModal";

import "./ShowtimePage.css";

const buildFallbackShowtimes = (selectedDate, movie) => {
  const baseDate = selectedDate || new Date().toISOString().split("T")[0];
  const movieId = movie?._id || "demo-movie";

  return [
    {
      _id: `${movieId}-morning`,
      movie,
      theatre: {
        _id: "demo-theatre-1",
        name: "Cinepolis",
        address: "MG Road",
      },
      city: "Delhi",
      screen: "Screen 1",
      date: baseDate,
      time: "10:30 AM",
      ticketPrice: 220,
      totalSeats: 100,
      bookedSeats: [],
    },
    {
      _id: `${movieId}-afternoon`,
      movie,
      theatre: {
        _id: "demo-theatre-2",
        name: "INOX",
        address: "Sector 18",
      },
      city: "Delhi",
      screen: "Screen 2",
      date: baseDate,
      time: "2:00 PM",
      ticketPrice: 260,
      totalSeats: 100,
      bookedSeats: [],
    },
    {
      _id: `${movieId}-evening`,
      movie,
      theatre: {
        _id: "demo-theatre-3",
        name: "PVR",
        address: "Connaught Place",
      },
      city: "Delhi",
      screen: "Screen 3",
      date: baseDate,
      time: "7:30 PM",
      ticketPrice: 320,
      totalSeats: 100,
      bookedSeats: [],
    },
  ];
};

function ShowtimePage(){


const {id}=useParams();

const navigate=useNavigate();



const [movie,setMovie]=useState(null);

const [showtimes,setShowtimes]=useState([]);



const [selectedDate,setSelectedDate]=useState(
new Date().toISOString().split("T")[0]
);



const [city,setCity]=useState("All");

const [language,setLanguage]=useState("All");

const [format,setFormat]=useState("All");


const [loading,setLoading]=useState(true);





const [seatModal,setSeatModal]=useState(false);

const [selectedShow,setSelectedShow]=useState(null);

const [seatCount,setSeatCount]=useState(1);







useEffect(()=>{


const fetchMovie=async()=>{


try{


const res=await API.get(
`/movies/${id}`
);


setMovie(
res.data.movie
);


}

catch(err){

console.log(err);

}


};


fetchMovie();


},[id]);










useEffect(() => {
    const fetchShows = async () => {
        try {
            setLoading(true);

            const res = await API.get(
                `/showtimes/movie/${id}?date=${selectedDate}`
            );

            console.log("SHOW DATA:", res.data);

            const nextShowtimes =
                res.data.showtimes?.length > 0
                    ? res.data.showtimes
                    : buildFallbackShowtimes(selectedDate, movie);

            setShowtimes(nextShowtimes);

        } catch (err) {
            console.log("Show Error:", err);

            setShowtimes(
                buildFallbackShowtimes(selectedDate, movie)
            );

        } finally {
            setLoading(false);
        }
    };

    fetchShows();

}, [id, selectedDate, movie]);










const cities=useMemo(()=>{


return [

"All",

...new Set(

showtimes.map(
s=>s.city
)

)

];


},[showtimes]);




const languages=useMemo(()=>{


return [

"All",

...new Set(

showtimes

.map(
s=>s.movie?.language
)

.filter(Boolean)

)

];


},[showtimes]);




const formats=useMemo(()=>{


return [

"All",

...new Set(

showtimes

.map(
s=>s.movie?.format
)

.filter(Boolean)

)

];


},[showtimes]);


const filteredShows=

showtimes.filter((show)=>{


if(

city!=="All" &&

show.city!==city

)

return false;



if(

language!=="All" &&

show.movie?.language!==language

)

return false;



if(

format!=="All" &&

show.movie?.format!==format

)

return false;



return true;


});











const groupedShows=

useMemo(()=>{


const data={};



filteredShows.forEach(show=>{


const theatreId =

show.theatre?._id ||

show.theatre ||

show._id;



if(!data[theatreId]){


data[theatreId]={


theatre:

show.theatre || {


name:"Cinema Hall",

address:show.city

},


shows:[]

};



}



data[theatreId].shows.push(show);



});



return Object.values(data);



},[filteredShows]);












const dates=Array.from(

{length:7},

(_,i)=>{


const d=new Date();


d.setDate(

d.getDate()+i

);



return {


value:d.toISOString()
.split("T")[0],


day:d.toLocaleDateString(

"en-US",

{

weekday:"short"

}

),


date:d.getDate(),


month:d.toLocaleDateString(

"en-US",

{

month:"short"

}

)


};


}

);






if(!movie)

return <h2>Loading...</h2>;







return (

<>


<Navbar/>




<main className="premium-showtime-page">





<section className="premium-movie-info">


<span>

SELECT SHOWTIMES FOR

</span>


<h2>

{movie.title}

</h2>



<div className="movie-meta">


<span>

{movie.language}

</span>


<span>

•

</span>


<span>

{movie.duration}

</span>


<span>

•

</span>


<span>

{movie.certificate}

</span>


</div>



</section>









<section className="date-wrapper">


<div className="date-scroll">


{

dates.map(d=>(


<button

key={d.value}


className={

selectedDate===d.value

?

"premium-date active"

:

"premium-date"

}


onClick={()=>setSelectedDate(d.value)}

>


<span>

{d.day}

</span>


<strong>

{d.date}

</strong>


<small>

{d.month}

</small>



</button>



))


}


</div>


</section>









<section className="premium-filter-bar">


<select

value={city}

onChange={
e=>setCity(e.target.value)
}

>


{

cities.map(c=>(

<option key={c}>

{c}

</option>

))

}


</select>






<select

value={language}

onChange={
e=>setLanguage(e.target.value)
}

>


{

languages.map(l=>(

<option key={l}>

{l}

</option>

))

}


</select>






<select

value={format}

onChange={
e=>setFormat(e.target.value)
}

>


{

formats.map(f=>(

<option key={f}>

{f}

</option>

))

}


</select>





<button

onClick={()=>{

setCity("All");

setLanguage("All");

setFormat("All");

}}

>

Reset

</button>



</section>









<section className="results-section">


<h2>

{filteredShows.length}

Shows Available

</h2>





{

loading ?

<h3>

Loading Shows...

</h3>


:


groupedShows.map(item=>(



<article

key={item.shows[0]._id}

className="premium-theatre-card"

>




<div className="theatre-header">


<h3>

{item.theatre?.name || "Cinema Hall"}

</h3>


<p>

📍

{item.theatre?.address || item.shows[0].city}

</p>


</div>







<div className="premium-showtimes">


{


item.shows.map(show=>(



<button

key={show._id}

className="premium-showtime"


onClick={()=>{


setSelectedShow(show);

setSeatModal(true);


}}



>


<strong>

{show.time}

</strong>


<span>

₹{show.ticketPrice}

</span>



<small>

Available

</small>



</button>



))


}



</div>



</article>



))


}



</section>






</main>





<SeatCountModal


open={seatModal}


show={selectedShow}


seatCount={seatCount}


setSeatCount={setSeatCount}



close={()=>setSeatModal(false)}



onContinue={()=>{

const showToStore = {

  ...(selectedShow || {}),

  _id: selectedShow?._id || `${selectedShow?.movie?._id || id}-${seatCount}`,

};

localStorage.setItem("selectedShow", JSON.stringify(showToStore));

navigate(`/seat/${showToStore._id}?count=${seatCount}`);

}}


/>





<Qna/>


<Footer/>


</>


);


}



export default ShowtimePage;