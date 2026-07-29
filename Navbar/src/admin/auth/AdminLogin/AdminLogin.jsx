import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaEnvelope, FaLock } from "react-icons/fa";

import { motion } from "framer-motion";


import API from "../../../api/api";


import "./AdminLogin.css";





function AdminLogin(){



const navigate = useNavigate();



const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");







const handleLogin = async(e)=>{


e.preventDefault();



setError("");



try{


setLoading(true);





const res = await API.post(

"/admin/login",

{

email,

password

}

);







console.log(
"LOGIN RESPONSE:",
res.data
);







if(res.data.success){



localStorage.setItem(

"adminEmail",

email

);




console.log(

"ADMIN EMAIL SAVED:",

localStorage.getItem("adminEmail")

);




navigate(
"/admin/verify-otp"
);



}

else{


setError(

res.data.message ||

"Login failed"

);


}



}



catch(err){



console.log(
"LOGIN ERROR:",
err
);



setError(

err.response?.data?.message ||

"Login Failed"

);



}



finally{


setLoading(false);


}



};








return(


<div className="admin-login-page">



<div className="login-overlay"></div>





<motion.div

className="admin-login-card"

initial={{

opacity:0,

y:50

}}

animate={{

opacity:1,

y:0

}}

transition={{

duration:.6

}}

>





<div className="admin-logo">

🎬

</div>





<h1>

MOVIE HUNT

</h1>




<p>

ADMIN PANEL

</p>







<form onSubmit={handleLogin}>


<div className="input-box">


<FaEnvelope/>


<input

type="email"

placeholder="Admin Email"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

required

/>

</div>







<div className="input-box">


<FaLock/>


<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

required

/>


</div>







{

error &&

<p className="login-error">

{error}

</p>

}







<button

className="login-btn"

disabled={loading}

>


{

loading

?

"CHECKING..."

:

"LOGIN"

}


</button>






</form>







</motion.div>




</div>


);


}



export default AdminLogin;