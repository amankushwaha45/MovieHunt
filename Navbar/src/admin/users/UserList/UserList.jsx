import { useEffect, useState } from "react";


import {
    FaTrash,
    FaBan,
    FaCheck,
    FaUserShield
} from "react-icons/fa";


import API from "../../../api/api";


import "./UserList.css";






function UserList(){



const [users,setUsers] = useState([]);

const [loading,setLoading] = useState(true);









useEffect(()=>{


fetchUsers();


},[]);









const fetchUsers = async()=>{


try{


const res = await API.get(

"/users"

);



console.log(

"USERS",

res.data

);



setUsers(

res.data.users || []

);



}


catch(error){


console.log(

"USER FETCH ERROR",

error

);


}



finally{


setLoading(false);


}



};









const deleteUser = async(id)=>{


const confirmDelete = window.confirm(

"Delete this user?"

);



if(!confirmDelete)

return;






try{


await API.delete(

`/users/${id}`

);



alert(

"User Deleted"

);



fetchUsers();



}

catch(error){


console.log(error);


}



};









const updateRole = async(id,role)=>{


try{


await API.put(

`/users/${id}/role`,

{

role

}

);



alert(

"Role Updated"

);



fetchUsers();



}

catch(error){


console.log(error);


}



};









if(loading){


return(

<h2 className="loading">

Loading Users...

</h2>

);


}









return(



<div className="user-page">





<div className="user-header">


<div>


<h1>

User Management

</h1>


<p>

Manage registered users

</p>


</div>



</div>









<div className="user-table-box">





<table>



<thead>


<tr>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Status</th>

<th>Joined</th>

<th>Action</th>


</tr>


</thead>







<tbody>





{

users.length>0

?

users.map((user)=>(



<tr

key={user._id}

>








<td>


<div className="user-name">


<div className="avatar">

<FaUserShield/>

</div>



<span>

{user.name}

</span>


</div>


</td>









<td>

{user.email}

</td>








<td>


<span className="role">


{user.role}

</span>


</td>









<td>


<span

className={

user.isBlocked

?

"blocked"

:

"active"

}

>

{

user.isBlocked

?

"Blocked"

:

"Active"

}


</span>


</td>









<td>


{

new Date(

user.createdAt

)

.toLocaleDateString()

}



</td>









<td>





<button

className="role-btn"

onClick={()=>updateRole(

user._id,

user.role==="user"

?

"admin"

:

"user"

)}

>

<FaUserShield/>

</button>








<button

className="delete-btn"

onClick={()=>deleteUser(user._id)}

>

<FaTrash/>

</button>






</td>







</tr>



))


:


<tr>


<td colSpan="6">

No Users Found

</td>


</tr>



}







</tbody>



</table>








</div>







</div>


);



}



export default UserList;