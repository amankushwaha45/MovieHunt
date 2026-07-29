import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { FaKey } from "react-icons/fa";


import API from "../../../api/api";


import "./VerifyOTP.css";







function VerifyOTP(){



const navigate = useNavigate();



const [otp,setOtp] = useState("");

const [error,setError] = useState("");

const [loading,setLoading] = useState(false);





const email = localStorage.getItem(
"adminEmail"
);








const verifyOTP = async(e)=>{


e.preventDefault();



setError("");






if(!email){


setError(
"Email not found. Login again"
);


return;


}







try{


setLoading(true);






const res = await API.post(

"/admin/verify-otp",

{

email,

otp

}

);







console.log(

"VERIFY RESPONSE:",

res.data

);







if(res.data.success){



if(!res.data.token){


setError(
"Token missing from server"
);


return;


}







localStorage.setItem(

"adminToken",

res.data.token

);






console.log(

"SAVED TOKEN:",

localStorage.getItem(
"adminToken"
)

);







navigate(
"/admin/dashboard"
);



}

else{


setError(

res.data.message ||

"OTP Failed"

);


}



}

catch(err){



console.log(

"VERIFY ERROR:",

err

);



setError(

err.response?.data?.message ||

"Invalid OTP"

);



}



finally{


setLoading(false);


}



};










return(



<div className="otp-page">





<motion.div

className="otp-card"

initial={{

opacity:0,

y:40

}}

animate={{

opacity:1,

y:0

}}

>





<div className="otp-icon">


<FaKey/>


</div>





<h1>

VERIFY OTP

</h1>




<p>

Enter OTP sent to admin account

</p>







<form onSubmit={verifyOTP}>


<input

className="otp-input"

type="text"

maxLength="6"

placeholder="Enter 6 Digit OTP"

value={otp}

onChange={(e)=>
setOtp(e.target.value)
}

required

/>








{

error &&

<p className="otp-error">

{error}

</p>

}








<button

disabled={loading}

>


{

loading

?

"VERIFYING..."

:

"VERIFY"

}


</button>







</form>






</motion.div>





</div>


);


}



export default VerifyOTP;