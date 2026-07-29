import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../../api/api";

import "./SeatSelection.css";



const buildFallbackShow = (id) => ({

    _id:id,


    movie:{
        _id:"demo-movie",
        title:"Demo Movie",
        language:"Hindi",
        format:"2D",
        duration:"2h 20m",
        certificate:"UA"
    },


    theatre:{
        _id:"demo-theatre",
        name:"Cinepolis",
        address:"MG Road",

        screens:[
            {
                screenName:"Screen 1",

                seatLayout:[

                    {
                        category:"Classic",
                        price:220,
                        seats:[
                            "A1","A2","A3","A4","A5","A6"
                        ]
                    },


                    {
                        category:"Prime",
                        price:280,
                        seats:[
                            "B1","B2","B3","B4","B5","B6"
                        ]
                    },


                    {
                        category:"Royal Club",
                        price:350,
                        seats:[
                            "C1","C2","C3","C4","C5","C6"
                        ]
                    },


                    {
                        category:"Recliner",
                        price:450,
                        seats:[
                            "D1","D2","D3","D4"
                        ]
                    }

                ]
            }
        ]
    },


    screen:"Screen 1",

    time:"7:30 PM",

    bookedSeats:[]

});







function SeatSelection(){


const {id}=useParams();


const navigate=useNavigate();



const [show,setShow]=useState(null);


const [selectedSeats,setSelectedSeats]=useState([]);


const [loading,setLoading]=useState(true);







useEffect(()=>{

    fetchShow();

},[]);







const fetchShow=async()=>{


try{


const res=await API.get(

`/showtimes/${id}`

);



setShow(

res.data.showtime

);



localStorage.setItem(

"selectedShow",

JSON.stringify(res.data.showtime)

);



}

catch(error){


console.log(error);



const saved=localStorage.getItem(

"selectedShow"

);



if(saved){


setShow(

JSON.parse(saved)

);


}

else{


setShow(

buildFallbackShow(id)

);


}



}


finally{


setLoading(false);


}



};
const selectSeat = (seat)=>{


if(show.bookedSeats?.includes(seat))

return;





if(selectedSeats.includes(seat)){


setSelectedSeats(

selectedSeats.filter(

s=>s!==seat

)

);


}

else{


setSelectedSeats([

...selectedSeats,

seat

]);


}


};








const calculatePrice = ()=>{


let total = 0;




const layout =

show?.theatre?.screens?.[0]?.seatLayout || [];






layout.forEach(section=>{


section.seats.forEach(seat=>{


if(selectedSeats.includes(seat)){


total += section.price;


}


});


});





return total;


};








const bookSeats = ()=>{


if(selectedSeats.length===0)

return;






const bookingData={



movie:show.movie._id,



theatre:show.theatre._id,



showtime:show._id || id,



seats:selectedSeats,



totalAmount:calculatePrice(),




movieDetails:{


title:show.movie.title


},




theatreDetails:{


name:show.theatre.name


}



};







localStorage.setItem(

"booking",

JSON.stringify(bookingData)

);






navigate("/addons");


};










const getSortedLayout = ()=>{


const layout =

show?.theatre?.screens?.[0]?.seatLayout || [];




const order={


"Classic":1,

"Prime":2,

"Royal Club":3,

"Recliner":4,



"Silver":1,

"Gold":2


};





return [...layout].sort((a,b)=>{


return (

order[a.category] || 999

)

-

(

order[b.category] || 999

);


});


};
const renderSeats = (section)=>{


const rows={};



section.seats.forEach(seat=>{


const row=seat[0];


if(!rows[row])

rows[row]=[];


rows[row].push(seat);


});





return Object.keys(rows).map(row=>(


<div

className="seat-row"

key={row}

>


<span className="row-name">

{row}

</span>





<div className="left-seat">


{

rows[row]

.slice(

0,

Math.ceil(rows[row].length/2)

)

.map(seat=>(


<SeatButton

key={seat}

seat={seat}

show={show}

selectedSeats={selectedSeats}

selectSeat={selectSeat}


/>


))


}



</div>





<div className="gap"></div>





<div className="right-seat">


{

rows[row]

.slice(

Math.ceil(rows[row].length/2)

)

.map(seat=>(


<SeatButton

key={seat}

seat={seat}

show={show}

selectedSeats={selectedSeats}

selectSeat={selectSeat}


/>


))


}



</div>



</div>


));


};









if(loading)

return (

<h2>

Loading...

</h2>

);



if(!show)

return (

<h2>

No Show Found

</h2>

);





const layout=getSortedLayout();








return(



<div className="seat-page">







<div className="seat-header">


<h1>

{show.movie?.title}

</h1>



<p>

{show.movie?.language}

 |

{show.movie?.format}

</p>



<p>

{show.theatre?.name}

</p>



<p>

{show.screen}

 |

{show.time}

</p>



</div>









<div className="screen">


SCREEN


</div>









<div className="seat-wrapper">



{

layout.map(section=>(


<div

className="seat-section"

key={section.category}

>


<h3>

{section.category}

&nbsp;

₹{section.price}

</h3>





{

renderSeats(section)

}



</div>


))


}



</div>
<div className="legend">


<span>

🟩 Available

</span>


<span>

⬜ Sold

</span>


<span>

🟥 Selected

</span>


</div>








<div className="bottom-bar">


<div>

Seats :

<b>

{selectedSeats.join(", ")}

</b>


</div>






<h2>

₹{calculatePrice()}

</h2>







<button

disabled={selectedSeats.length===0}

onClick={bookSeats}

>

Continue

</button>





</div>







</div>


);


}









function SeatButton({

seat,

show,

selectedSeats,

selectSeat

}){



return(


<button


className={


show.bookedSeats?.includes(seat)

?

"sold"


:


selectedSeats.includes(seat)

?

"selected"


:

"available"



}



onClick={()=>selectSeat(seat)}



>



{seat.substring(1)}



</button>



);


}








export default SeatSelection;