import { useEffect, useState } from "react";

import API from "../../api/api";

import "./MyBookings.css";

function MyBookings(){

const [bookings,setBookings] = useState([]);

const [loading,setLoading] = useState(true);

useEffect(()=>{


fetchBookings();


},[]);

const fetchBookings = async()=>{


try{


const token = localStorage.getItem(

"token"

);



const res = await API.get(

"/bookings/my",

{

headers:{


Authorization:`Bearer ${token}`


}

}

);





setBookings(

res.data.bookings || []

);



}


catch(error){


console.log(

"BOOKING ERROR",

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

Loading Tickets...

</h2>

);


}








return(


<div className="my-bookings-page">





<h1>

🎟 My Tickets

</h1>







{

bookings.length===0

?

<h2>

No Bookings Found

</h2>


:

bookings.map(booking=>(



<div

className="ticket-card"

key={booking._id}

>





<div className="ticket-header">


<h2>

{booking.movie?.title}

</h2>



<span>

{booking.bookingStatus}

</span>



</div>









<div className="ticket-body">



<p>

🎭 Theatre :

{booking.theatre?.name}

</p>



<p>

🎟 Seats :

{booking.seats.join(", ")}

</p>




<p>

💰 Amount :

₹{booking.totalAmount}

</p>



<p>

📅 Date :

{

new Date(

booking.createdAt

)

.toLocaleDateString()

}

</p>

</div>
<div className="ticket-footer">


Booking ID:

{booking._id.slice(-8)}


</div>

</div>

))
}
</div>


);



}



export default MyBookings;