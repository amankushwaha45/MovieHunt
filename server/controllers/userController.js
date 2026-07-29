const User = require("../models/User");






const getAllUsers = async(req,res)=>{


try{


const users = await User.find()

.select("-password")

.sort({

createdAt:-1

});




res.status(200).json({

success:true,

count:users.length,

users

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



};










const getUserById = async(req,res)=>{


try{


const user = await User.findById(

req.params.id

)

.select("-password");





if(!user){


return res.status(404).json({

success:false,

message:"User not found"

});


}





res.json({

success:true,

user

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};












const deleteUser = async(req,res)=>{


try{


const user = await User.findByIdAndDelete(

req.params.id

);




if(!user){


return res.status(404).json({

success:false,

message:"User not found"

});


}




res.json({

success:true,

message:"User Deleted Successfully"

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};











const updateUserRole = async(req,res)=>{


try{


const {role}=req.body;



const user = await User.findByIdAndUpdate(

req.params.id,

{

role

},

{

new:true

}

).select("-password");





if(!user){


return res.status(404).json({

success:false,

message:"User not found"

});


}





res.json({

success:true,

message:"Role Updated",

user

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};








module.exports={


getAllUsers,

getUserById,

deleteUser,

updateUserRole


};