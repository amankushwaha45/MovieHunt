import React from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";


function Settings(){

const navigate = useNavigate();



const logout = ()=>{

localStorage.removeItem("user");
localStorage.removeItem("token");

navigate("/auth");

};



const deleteAccount = ()=>{

const confirmDelete = window.confirm(
"Are you sure you want to delete account?"
);


if(confirmDelete){

localStorage.clear();

navigate("/auth");

}

};



return(

<div className="settings-page">


<h1>
Settings
</h1>



<div className="settings-card">


<h2>
Logout
</h2>


<button
onClick={logout}
>
Logout
</button>


</div>






<div className="settings-card">


<h2>
Delete Account
</h2>


<button

className="delete"

onClick={deleteAccount}

>
Delete Account
</button>


</div>



</div>


);

}


export default Settings;