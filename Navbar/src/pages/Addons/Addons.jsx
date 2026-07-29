import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Addons.css";



const addonGroups = [

{
title:"Popcorn & Treats",

items:[

{
id:"popcorn-classic",
name:"Classic Popcorn",
description:"Salted popcorn bucket",
price:149,
icon:"🍿"
},


{
id:"popcorn-cheese",
name:"Cheese Popcorn",
description:"Loaded cheesy popcorn",
price:189,
icon:"🧀"
},


{
id:"popcorn-caramel",
name:"Caramel Popcorn",
description:"Sweet caramel crunch",
price:179,
icon:"🍭"
},


{
id:"nachos",
name:"Loaded Nachos",
description:"Spicy nachos with cheese",
price:169,
icon:"🫑"
}

]

},





{
title:"Burgers & Wraps",

items:[

{
id:"burger",
name:"Burger Bite",
description:"Crispy veg burger with fries",
price:169,
icon:"🍔"
},


{
id:"wrap",
name:"Crispy Wrap",
description:"Crunchy veggie wrap",
price:159,
icon:"🌯"
},


{
id:"pizza-slice",
name:"Pizza Slice",
description:"Cheesy pizza slice",
price:139,
icon:"🍕"
},


{
id:"sandwich",
name:"Club Sandwich",
description:"Classic sandwich combo",
price:179,
icon:"🥪"
}

]

},






{
title:"Beverages",

items:[

{
id:"cold-drink",
name:"Cold Drink",
description:"Refreshing soft drink",
price:99,
icon:"🥤"
},


{
id:"coffee",
name:"Hot Coffee",
description:"Fresh brewed coffee",
price:109,
icon:"☕"
},


{
id:"mocktail",
name:"Mocktail",
description:"Sparkling fruit mocktail",
price:129,
icon:"🍹"
},


{
id:"smoothie",
name:"Fruit Smoothie",
description:"Cool fruit smoothie",
price:149,
icon:"🥝"
}

]

},





{
title:"Combos & Premium",

items:[

{
id:"combo",
name:"Theatre Snack Pack",
description:"Nachos, candy and soda",
price:249,
icon:"🍬"
},


{
id:"party-pack",
name:"Party Pack",
description:"Popcorn, fries and drink",
price:329,
icon:"🎉"
},


{
id:"premium-bucket",
name:"Premium Bucket",
description:"Large bucket with extras",
price:399,
icon:"🏆"
},


{
id:"family-combo",
name:"Family Combo",
description:"Perfect for 2-3 movie lovers",
price:499,
icon:"👨‍👩‍👧‍👦"
}

]

}

];









function Addons(){


const navigate = useNavigate();




const [booking] = useState(()=>{


const storedBooking = localStorage.getItem(

"booking"

);



if(!storedBooking)

return null;



try{


return JSON.parse(storedBooking);


}

catch(error){


console.log(error);


return null;


}


});








const [selectedAddons,setSelectedAddons]=useState([]);









const toggleAddon=(addon)=>{


setSelectedAddons((prev)=>{


const exists = prev.some(

item=>item.id===addon.id

);




const updated = exists

?

prev.filter(

item=>item.id!==addon.id

)

:

[

...prev,

addon

];





localStorage.setItem(

"addons",

JSON.stringify(updated)

);



return updated;


});



};









const addonsTotal = useMemo(()=>{


return selectedAddons.reduce(

(sum,item)=>

sum + item.price,

0

);


},[selectedAddons]);









const ticketPrice = booking?.totalAmount || booking?.amount || 0;



const totalAmount = ticketPrice + addonsTotal;












const continueToPayment=()=>{


const nextBooking={


...(booking || {}),


addons:selectedAddons,


addonAmount:addonsTotal,


grandTotal:totalAmount



};







localStorage.setItem(

"booking",

JSON.stringify(nextBooking)

);



localStorage.setItem(

"addons",

JSON.stringify(selectedAddons)

);





navigate("/payment");


};











const skipAddons=()=>{


const nextBooking={


...(booking || {}),


addons:[],


addonAmount:0,


grandTotal:ticketPrice



};







localStorage.setItem(

"addons",

JSON.stringify([])

);





localStorage.setItem(

"booking",

JSON.stringify(nextBooking)

);





navigate("/payment");


};









if(!booking){


return(

<div className="addons-page">


<div className="addons-card">


<h2>

No booking found

</h2>


<p>

Please go back and choose your seats first.

</p>




<button

className="primary-btn"

onClick={()=>navigate(-1)}

>

Go back

</button>



</div>


</div>

);


}









return(


<div className="addons-page">



<div className="addons-shell">






<div className="addons-card addons-main">






<div className="addons-header">


<div>


<p className="addons-eyebrow">

Optional extras

</p>


<h1>

Make your movie night better

</h1>


</div>




<div className="addons-badge">

BMS

</div>



</div>









<p className="addons-copy">

Add snacks or drinks before you pay. You can skip this step if you do not want anything.

</p>








<div className="addons-catalog">



{

addonGroups.map(group=>(


<div

className="addon-group"

key={group.title}

>


<h3>

{group.title}

</h3>





<div className="addons-grid">



{

group.items.map(addon=>{


const selected = selectedAddons.some(

item=>item.id===addon.id

);



return(



<button

key={addon.id}

type="button"

className={

`addon-card ${

selected

?

"selected"

:

""

}`

}

onClick={()=>toggleAddon(addon)}

>




<div className="addon-icon">

{addon.icon}

</div>






<div className="addon-content">


<h3>

{addon.name}

</h3>



<p>

{addon.description}

</p>



<strong>

₹{addon.price}

</strong>


</div>





</button>



);


})


}



</div>



</div>



))


}



</div>









<div className="addons-actions">



<button

className="ghost-btn"

onClick={skipAddons}

>


Skip

</button>







<button

className="primary-btn"

onClick={continueToPayment}

>


Continue to payment • ₹{totalAmount}

</button>




</div>







</div>









<div className="addons-card addons-sidebar">





<h3>

Selected items

</h3>







{

selectedAddons.length===0

?

<p className="empty-state">

No add-ons selected yet.

</p>


:

<ul className="addons-list">


{

selectedAddons.map(item=>(


<li key={item.id}>


<span>

{item.name}

</span>


<strong>

₹{item.price}

</strong>



</li>


))


}



</ul>



}









<div className="summary-box">



<div className="summary-row">

<span>

Tickets

</span>


<strong>

₹{ticketPrice}

</strong>


</div>





<div className="summary-row">

<span>

Add-ons

</span>


<strong>

₹{addonsTotal}

</strong>


</div>







<div className="summary-row total-row">


<span>

Total

</span>


<strong>

₹{totalAmount}

</strong>



</div>





</div>








</div>







</div>


</div>


);



}



export default Addons;