import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
FaArrowLeft,
FaPlus,
FaTrash,
FaSave
} from "react-icons/fa";


import API from "../../../api/api";


import "./AddTheatre.css";





function AddTheatre(){



const navigate = useNavigate();





const [theatre,setTheatre] = useState({


name:"",

city:"",

address:""


});






const [screens,setScreens] = useState([

{

screenName:"",

seatLayout:[

{

category:"",

price:"",

seats:""

}

]

}

]);







const [loading,setLoading]=useState(false);

const [error,setError]=useState("");









const handleChange=(e)=>{


setTheatre({

...theatre,

[e.target.name]:e.target.value

});


};









// ADD SCREEN

const addScreen=()=>{


setScreens([

...screens,


{

screenName:"",

seatLayout:[

{

category:"",

price:"",

seats:""

}

]

}

]);


};










// REMOVE SCREEN

const removeScreen=(index)=>{


const data=[...screens];


data.splice(index,1);


setScreens(data);


};









// SCREEN NAME CHANGE


const handleScreenChange=(index,value)=>{


const data=[...screens];


data[index].screenName=value;


setScreens(data);


};










// SEAT LAYOUT CHANGE


const handleSeatChange=(screenIndex,seatIndex,key,value)=>{


const data=[...screens];


data[screenIndex]
.seatLayout[seatIndex][key]=value;


setScreens(data);


};









// ADD CATEGORY


const addSeatLayout=(screenIndex)=>{


const data=[...screens];


data[screenIndex]
.seatLayout.push({

category:"",

price:"",

seats:""

});


setScreens(data);


};









const submitHandler=async(e)=>{


e.preventDefault();



try{


setLoading(true);


setError("");





const payload={


...theatre,


screens:screens.map((screen)=>({


screenName:screen.screenName,


seatLayout:screen.seatLayout.map((seat)=>(

{

category:seat.category,


price:Number(seat.price),


seats:seat.seats
.split(",")

.map(item=>item.trim())


}

))




}))



};







const res = await API.post(

"/theatres",

payload

);






if(res.data.success){


alert(

"Theatre Added Successfully"

);



navigate(

"/admin/theatres"

);


}




}


catch(err){


console.log(

"ADD THEATRE ERROR",

err

);



setError(

err.response?.data?.message ||

"Failed"

);


}



finally{


setLoading(false);


}


};









return(



<div className="add-theatre-page">





<div className="theatre-header">



<button

onClick={()=>navigate("/admin/theatres")}

>


<FaArrowLeft/>

Back


</button>




<h1>

Add Theatre

</h1>




</div>








<form

className="theatre-form"

onSubmit={submitHandler}

>






<input

name="name"

placeholder="Theatre Name"

value={theatre.name}

onChange={handleChange}

required

/>







<input

name="city"

placeholder="City"

value={theatre.city}

onChange={handleChange}

required

/>







<textarea

name="address"

placeholder="Full Address"

value={theatre.address}

onChange={handleChange}

required

/>











<h2>

Screens

</h2>








{

screens.map((screen,index)=>(



<div

className="screen-box"

key={index}

>






<div className="screen-title">


<h3>

Screen {index+1}

</h3>




<button

type="button"

onClick={()=>removeScreen(index)}

>

<FaTrash/>

</button>


</div>








<input

placeholder="Screen Name"

value={screen.screenName}

onChange={(e)=>

handleScreenChange(

index,

e.target.value

)

}

/>








{

screen.seatLayout.map((seat,sIndex)=>(



<div

className="seat-box"

key={sIndex}

>





<input

placeholder="Category (Gold)"

value={seat.category}

onChange={(e)=>

handleSeatChange(

index,

sIndex,

"category",

e.target.value

)

}

/>






<input

placeholder="Price"

type="number"

value={seat.price}

onChange={(e)=>

handleSeatChange(

index,

sIndex,

"price",

e.target.value

)

}

/>







<input

placeholder="Seats A1,A2,A3"

value={seat.seats}

onChange={(e)=>

handleSeatChange(

index,

sIndex,

"seats",

e.target.value

)

}

/>







</div>



))


}








<button

type="button"

onClick={()=>addSeatLayout(index)}

>


<FaPlus/>

Add Category


</button>







</div>



))


}







<button

type="button"

onClick={addScreen}

>


<FaPlus/>

Add Screen


</button>








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

"Save Theatre"

}



</button>







</form>







</div>



);



}



export default AddTheatre;