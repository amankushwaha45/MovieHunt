import { useEffect, useState } from "react";

import {
    FaArrowLeft,
    FaSave,
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
    const { id } = useParams();

    const [loading,setLoading] = useState(false);
    const [fetching,setFetching] = useState(true);
    const [error,setError] = useState("");

    const [theatre,setTheatre] = useState({

        name:"",
        city:"",
        address:""

    });

    const [screens,setScreens] = useState([]);

    useEffect(()=>{

        getTheatre();

    },[]);

    const getTheatre = async()=>{

        try{

            const res = await API.get("/theatres");

            const data = res.data.theatres.find(

                item=>item._id===id

            );

            if(data){

                setTheatre({

                    name:data.name,

                    city:data.city,

                    address:data.address

                });

                setScreens(data.screens || []);

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

                screenName:`Screen ${screens.length+1}`,

                seatLayout:[

                    {

                        category:"Classic",

                        price:"",

                        seats:[]

                    },

                    {

                        category:"Prime",

                        price:"",

                        seats:[]

                    },

                    {

                        category:"Royal Club",

                        price:"",

                        seats:[]

                    },

                    {

                        category:"Recliner",

                        price:"",

                        seats:[]

                    }

                ]

            }

        ]);

    };

    const deleteScreen=(index)=>{

        const data=[...screens];

        data.splice(index,1);

        setScreens(data);

    };
    const saveChanges = async (e) => {

    e.preventDefault();

    try{

        setLoading(true);

        setError("");

        const payload = {

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

                    seat.seats
                    .split(",")

                    .map(item=>item.trim())

                    .filter(Boolean)

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

        console.log(err);

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

{/* Fixed Category */}

<div

className="category-label"

style={{

width:"170px",

padding:"12px",

background:"#181818",

border:"1px solid #333",

borderRadius:"8px",

color:"#ff004f",

fontWeight:"700",

textAlign:"center"

}}

>

{seat.category}

</div>

<input

type="number"

placeholder={`${seat.category} Price`}

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

placeholder={`${seat.category} Seats (A1,A2,A3...)`}

value={

Array.isArray(seat.seats)

?

seat.seats.join(",")

:

seat.seats

}

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

</div>

))

}
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

{/* Fixed Category */}

<div

className="category-label"

style={{

width:"170px",

padding:"12px",

background:"#181818",

border:"1px solid #333",

borderRadius:"8px",

color:"#ff004f",

fontWeight:"700",

textAlign:"center"

}}

>

{seat.category}

</div>

<input

type="number"

placeholder={`${seat.category} Price`}

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

placeholder={`${seat.category} Seats (A1,A2,A3...)`}

value={

Array.isArray(seat.seats)

?

seat.seats.join(",")

:

seat.seats

}

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

</div>

))

}
<button

type="button"

onClick={addScreen}

>

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

type="submit"

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