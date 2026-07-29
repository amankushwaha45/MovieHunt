import { useEffect, useState } from "react";

import {
    FaArrowLeft,
    FaSave,
    FaPlus,
    FaTrash
} from "react-icons/fa";

import {
    useNavigate,
    useParams
} from "react-router-dom";


import API from "../../../api/api";


import "./EditTheatre.css";





function EditTheatre(){



const navigate = useNavigate();

const {id} = useParams();





const [theatre,setTheatre] = useState({

name:"",

city:"",

address:""

});




const [screens,setScreens] = useState([]);

const [loading,setLoading] = useState(false);

const [fetching,setFetching] = useState(true);

const [error,setError] = useState("");









useEffect(()=>{


getTheatre();


},[]);









const getTheatre = async()=>{


try{


const res = await API.get(

`/theatres`

);




const data = res.data.theatres.find(

(item)=>item._id===id

);




if(data){


setTheatre({

name:data.name,

city:data.city,

address:data.address

});



setScreens(

data.screens || []

);


}



}



catch(err){


console.log(err);


}



finally{


setFetching(false);


}



};









const handleChange=(e)=>{


setTheatre({

...theatre,

[e.target.name]:e.target.value

});


};









const handleScreenChange=(index,value)=>{


const data=[...screens];


data[index].screenName=value;


setScreens(data);


};









const handleSeatChange=(screenIndex,seatIndex,key,value)=>{


const data=[...screens];


data[screenIndex]

.seatLayout[seatIndex][key]=value;


setScreens(data);


};









const addScreen=()=>{


setScreens([

...screens,


{

screenName:"New Screen",

seatLayout:[

{

category:"",

price:"",

seats:[]

}

]

}


]);


};









const addCategory=(screenIndex)=>{


const data=[...screens];


data[screenIndex]

.seatLayout.push({

category:"",

price:"",

seats:[]

});



setScreens(data);


};









const deleteScreen=(index)=>{


const data=[...screens];


data.splice(index,1);


setScreens(data);


};









const saveChanges=async(e)=>{


e.preventDefault();



try{


setLoading(true);


setError("");





const payload={


...theatre,


screens:screens.map((screen)=>({

screenName:screen.screenName,


seatLayout:screen.seatLayout.map((seat)=>({

category:seat.category,


price:Number(seat.price),


seats:Array.isArray(seat.seats)

?

seat.seats

:

seat.seats.split(",")
.map(item=>item.trim())


}))


}))


};








const res = await API.put(

`/theatres/${id}`,

payload

);






if(res.data.success){


alert(

"Theatre Updated Successfully"

);



navigate(

"/admin/theatres"

);


}



}



catch(err){


console.log(

"UPDATE ERROR",

err

);


setError(

err.response?.data?.message ||

"Update Failed"

);



}



finally{


setLoading(false);


}



};









if(fetching){


return(

<h2 className="loading">

Loading Theatre...

</h2>

);


}










return(



<div className="edit-theatre-page">







<div className="edit-header">



<button

onClick={()=>navigate("/admin/theatres")}

>

<FaArrowLeft/>

Back

</button>





<h1>

Edit Theatre

</h1>




</div>









<form

className="theatre-form"

onSubmit={saveChanges}

>








<input

name="name"

value={theatre.name}

onChange={handleChange}

placeholder="Theatre Name"

/>







<input

name="city"

value={theatre.city}

onChange={handleChange}

placeholder="City"

/>








<textarea

name="address"

value={theatre.address}

onChange={handleChange}

placeholder="Address"

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

onClick={()=>deleteScreen(index)}

>

<FaTrash/>

</button>


</div>







<input

value={screen.screenName}

onChange={(e)=>

handleScreenChange(

index,

e.target.value

)

}

placeholder="Screen Name"

/>









{

screen.seatLayout?.map((seat,sIndex)=>(



<div

className="seat-box"

key={sIndex}

>







<input

value={seat.category}

placeholder="Category"

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

type="number"

value={seat.price}

placeholder="Price"

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

value={

Array.isArray(seat.seats)

?

seat.seats.join(",")

:

seat.seats

}

placeholder="A1,A2,A3"

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

onClick={()=>addCategory(index)}

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

"Updating..."

:

"Update Theatre"

}



</button>









</form>







</div>



);


}



export default EditTheatre;