import { useEffect, useState } from "react";

import {
    FaCheck,
    FaTimes,
    FaTrash
} from "react-icons/fa";


import API from "../../../api/api";


import "./BookingList.css";





function BookingList(){



const [bookings,setBookings] = useState([]);

const [loading,setLoading] = useState(true);










useEffect(()=>{


fetchBookings();


},[]);









const fetchBookings = async()=>{


try{


const res = await API.get(

"/bookings/admin/all"

);



console.log(

"BOOKINGS",

res.data

);



setBookings(

res.data.bookings || []

);



}


catch(error){


console.log(

"BOOKING FETCH ERROR",

error

);


}


finally{


setLoading(false);


}



};









const updateStatus = async(id,status)=>{


try{


await API.put(

`/bookings/${id}/status`,

{

bookingStatus:status,

paymentStatus:

status==="Confirmed"

?

"Paid"

:

"Pending"

}

);





alert(

"Booking Updated"

);



fetchBookings();



}

catch(error){


console.log(error);


}



};









const deleteBooking = async(id)=>{


const confirmDelete = window.confirm(

"Delete this booking?"

);



if(!confirmDelete)

return;






try{


await API.delete(

`/bookings/${id}`

);



alert(

"Booking Deleted"

);



fetchBookings();



}

catch(error){


console.log(error);


}



};









if(loading){


return(

<h2 className="loading">

Loading Bookings...

</h2>

);


}









return(



<div className="booking-page">





<div className="booking-header">


<h1>

Booking Management

</h1>


<p>

Manage customer bookings

</p>


</div>









<div className="booking-table-box">






<table>



<thead>


<tr>


<th>User</th>

<th>Movie</th>

<th>Theatre</th>

<th>Seats</th>

<th>Amount</th>

<th>Payment</th>

<th>Status</th>

<th>Action</th>


</tr>


</thead>







<tbody>





{

bookings.length > 0

?

bookings.map((booking)=>(



<tr

key={booking._id}

>







<td>


<p>

{booking.user?.name}

</p>


<small>

{booking.user?.email}

</small>


</td>









<td>


{booking.movie?.title}



</td>









<td>


{booking.theatre?.name}



<br/>

<small>

{booking.theatre?.city}

</small>


</td>









<td>


{

booking.seats?.join(", ")

}



</td>








<td>


₹{booking.totalAmount}



</td>









<td>


<span

className={

booking.paymentStatus

.toLowerCase()

}


>

{booking.paymentStatus}

</span>



</td>









<td>


<span

className={

booking.bookingStatus

.toLowerCase()

}

>

{booking.bookingStatus}

</span>


</td>









<td>





<button

className="confirm-btn"

onClick={()=>updateStatus(

booking._id,

"Confirmed"

)}

>

<FaCheck/>

</button>








<button

className="cancel-btn"

onClick={()=>updateStatus(

booking._id,

"Cancelled"

)}

>

<FaTimes/>

</button>








<button

className="delete-btn"

onClick={()=>deleteBooking(

booking._id

)}

>

<FaTrash/>

</button>







</td>









</tr>



))


:


<tr>

<td colSpan="8">

No Bookings Found

</td>

</tr>



}







</tbody>





</table>









</div>







</div>


);



}



export default BookingList;