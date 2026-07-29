import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/api";

import "./Payment.css";



function Payment(){


const navigate = useNavigate();



const [booking,setBooking] = useState(null);


const [selectedMethod,setSelectedMethod] = useState("card");


const [cardNumber,setCardNumber] = useState("");

const [expiry,setExpiry] = useState("");

const [cvv,setCvv] = useState("");

const [upiId,setUpiId] = useState("");

const [walletPhone,setWalletPhone] = useState("");

const [walletProvider,setWalletProvider] = useState("Paytm");



const [isProcessing,setIsProcessing] = useState(false);


const [isPaid,setIsPaid] = useState(false);


const [errorMessage,setErrorMessage] = useState("");









useEffect(()=>{


const storedBooking = localStorage.getItem(

"booking"

);



if(storedBooking){


try{


setBooking(

JSON.parse(storedBooking)

);


}

catch(error){


console.log(error);


}



}



},[]);














const loadRazorpay = ()=>{


return new Promise((resolve)=>{


const script = document.createElement("script");



script.src =

"https://checkout.razorpay.com/v1/checkout.js";




script.onload = ()=>{


resolve(true);


};



script.onerror = ()=>{


resolve(false);


};



document.body.appendChild(script);



});


};














const createBooking = async(paymentId)=>{


try{


const token = localStorage.getItem("token");




await API.post(

"/bookings",

{


movie:booking.movie,


theatre:booking.theatre,


showtime:booking.showtime,


seats:booking.seats,


totalAmount:

booking.grandTotal || booking.totalAmount,



paymentId:paymentId,


paymentStatus:"Paid",


bookingStatus:"Confirmed"



},


{


headers:{


Authorization:`Bearer ${token}`


}


}


);



return true;



}

catch(error){


console.log(

"BOOKING CREATE ERROR",

error

);



return false;


}



};













const handlePayment = async()=>{


try{


setErrorMessage("");



if(!booking){


setErrorMessage(

"Booking data not found"

);


return;


}





setIsProcessing(true);





const loaded = await loadRazorpay();





if(!loaded){


setErrorMessage(

"Razorpay failed to load"

);


return;


}











const orderResponse = await API.post(

"/payment/create-order",

{


amount:

booking.grandTotal || booking.totalAmount



}

);






const order = orderResponse.data.order;







const options = {


key:

import.meta.env.VITE_RAZORPAY_KEY_ID,



amount:

order.amount,



currency:"INR",



name:"Movie Hunt",



description:"Movie Ticket Booking",



order_id:order.id,





handler:async function(response){



const verify = await API.post(

"/payment/verify",

{


razorpay_order_id:

response.razorpay_order_id,


razorpay_payment_id:

response.razorpay_payment_id,


razorpay_signature:

response.razorpay_signature


}

);







if(verify.data.success){



const bookingDone = await createBooking(

response.razorpay_payment_id

);





if(bookingDone){


setIsPaid(true);



localStorage.setItem(

"bookingStatus",

"confirmed"

);



navigate(

"/my-bookings"

);



}



}



},






theme:{


color:"#ef4444"


}



};







const razorpay = new window.Razorpay(

options

);



razorpay.open();



}

catch(error){


console.log(

"PAYMENT ERROR",

error

);



setErrorMessage(

"Payment Failed"

);


}

finally{


setIsProcessing(false);


}



};









const ticketPrice =

booking?.totalAmount ||

booking?.amount ||

0;





const addonAmount =

booking?.addonAmount ||

0;






const convenienceFee =

Math.max(

20,

Math.round(ticketPrice*0.05)

);






const totalAmount =

ticketPrice +

addonAmount +

convenienceFee;







const bookingId="#BMS123456";




const methodLabel =

selectedMethod==="card"

?

"Card"

:

selectedMethod==="upi"

?

"UPI"

:

"Wallet";
return (

<div className="payment-page">


<div className="payment-shell">






<div className="payment-card payment-main">





<div className="payment-header">


<div>

<p className="payment-eyebrow">

Secure Checkout

</p>


<h1>

Review your booking

</h1>


</div>




<div className="payment-badge">

BMS

</div>



</div>












<div className="booking-summary-card">


<div className="booking-summary-title">


<h2>

{booking?.movieDetails?.title || booking?.movie || "Movie title"}

</h2>



<span>

Ticket confirmed

</span>



</div>







<div className="booking-details-grid">



<div>

<p className="detail-label">

Theatre

</p>


<p className="detail-value">

{

booking?.theatreDetails?.name ||

booking?.theatre ||

"Premium cinema"

}

</p>


</div>







<div>

<p className="detail-label">

Seats

</p>


<p className="detail-value">


{

booking?.seats?.length

?

booking.seats.join(", ")

:

"Select seats"

}


</p>


</div>








<div>

<p className="detail-label">

Showtime

</p>


<p className="detail-value">

Today • 7:30 PM

</p>


</div>







<div>

<p className="detail-label">

Booking ID

</p>


<p className="detail-value">

{bookingId}

</p>


</div>





</div>


</div>












<div className="payment-methods">


<h3>

Choose payment method

</h3>




<div className="method-list">



<button

type="button"

className={

`method-option ${

selectedMethod==="card"

?

"active"

:

""

}`

}

onClick={()=>setSelectedMethod("card")}

>

💳 Credit / Debit Card

</button>







<button

type="button"

className={

`method-option ${

selectedMethod==="upi"

?

"active"

:

""

}`

}

onClick={()=>setSelectedMethod("upi")}

>

📱 UPI

</button>








<button

type="button"

className={

`method-option ${

selectedMethod==="wallet"

?

"active"

:

""

}`

}

onClick={()=>setSelectedMethod("wallet")}

>

👜 Wallet

</button>







</div>


</div>













<div className="payment-form-card">


<div className="method-banner">


<h4>

{

selectedMethod==="card"

?

"Card details"

:

selectedMethod==="upi"

?

"UPI details"

:

"Wallet details"

}


</h4>



<p>

Enter your details to continue payment.

</p>


</div>








{

selectedMethod==="card"

&&

<>


<label className="field-label">

Card Number

</label>


<input

type="text"

placeholder="0000 0000 0000 0000"

value={cardNumber}

onChange={(e)=>setCardNumber(e.target.value)}

/>





<div className="field-row">


<div>

<label className="field-label">

Expiry

</label>


<input

placeholder="MM/YY"

value={expiry}

onChange={(e)=>setExpiry(e.target.value)}

/>


</div>






<div>

<label className="field-label">

CVV

</label>


<input

type="password"

placeholder="123"

value={cvv}

onChange={(e)=>setCvv(e.target.value)}

/>


</div>


</div>



</>

}










{

selectedMethod==="upi"

&&

<>

<label className="field-label">

UPI ID

</label>


<input

placeholder="name@upi"

value={upiId}

onChange={(e)=>setUpiId(e.target.value)}

/>



</>


}









{

selectedMethod==="wallet"

&&

<>


<label className="field-label">

Wallet Provider

</label>


<select

value={walletProvider}

onChange={(e)=>setWalletProvider(e.target.value)}

>


<option>

Paytm

</option>


<option>

PhonePe

</option>


<option>

Amazon Pay

</option>


</select>






<label className="field-label">

Phone Number

</label>



<input

placeholder="Enter your phone number"

value={walletPhone}

onChange={(e)=>setWalletPhone(e.target.value)}

/>



</>


}





</div>









{

errorMessage &&

<div className="error-box">

<p>

⚠️ {errorMessage}

</p>

</div>

}




{

isPaid

?

<div className="success-box">


<h3>

Payment Successful

</h3>



<p>

Your ticket has been booked successfully.

</p>



<button

className="primary-btn"

onClick={()=>navigate("/my-bookings")}

>

View Tickets

</button>



</div>



:

<button

className="primary-btn pay-btn"

onClick={handlePayment}

disabled={isProcessing}

>


{

isProcessing

?

"Processing Payment..."

:

`Pay ₹${totalAmount} via ${methodLabel}`

}



</button>



}



</div>












<div className="payment-card payment-sidebar">


<h3>

Order summary

</h3>





<div className="summary-row">

<span>

Ticket price

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

₹{addonAmount}

</strong>


</div>







<div className="summary-row">

<span>

Convenience fee

</span>


<strong>

₹{convenienceFee}

</strong>


</div>







<div className="summary-row total-row">


<span>

Total payable

</span>


<strong>

₹{totalAmount}

</strong>


</div>








<div className="secure-note">


<p>

🔒 Safe and secure payment

</p>



<span>

Instant confirmation after payment

</span>



</div>








<button

type="button"

className="ghost-btn"

onClick={()=>navigate(-1)}

>

Go back

</button>





</div>







</div>


</div>


);


}



export default Payment;