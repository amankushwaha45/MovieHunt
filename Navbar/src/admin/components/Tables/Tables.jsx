import {
FaTicketAlt
} from "react-icons/fa";


import "./Tables.css";





function Tables({bookings=[]}){





return(


<div className="tables-container">





<div className="table-card">



<div className="table-header">


<h2>

Recent Bookings

</h2>


<FaTicketAlt/>


</div>







<div className="table-wrapper">


<table>



<thead>


<tr>


<th>

User

</th>


<th>

Movie

</th>


<th>

Theatre

</th>


<th>

Seats

</th>


<th>

Amount

</th>


<th>

Status

</th>


</tr>


</thead>









<tbody>



{

bookings.length > 0 ?


bookings.map((booking,index)=>(



<tr key={index}>


<td>

{

booking.user?.name ||

"Guest"

}

</td>





<td>

{

booking.movie?.title ||

"N/A"

}

</td>






<td>

{

booking.theatre?.name ||

"N/A"

}

</td>







<td>


{

booking.seats?.length ||

0

}


</td>







<td>


₹

{

booking.totalAmount ||

0

}


</td>








<td>


<span

className={

booking.paymentStatus === "Paid"

?

"paid-status"

:

"pending-status"

}

>


{

booking.paymentStatus ||

"Pending"

}


</span>



</td>





</tr>



))


:


<tr>


<td

colSpan="6"

className="no-data"

>


No Recent Bookings


</td>


</tr>



}



</tbody>



</table>



</div>




</div>






</div>


);


}



export default Tables;