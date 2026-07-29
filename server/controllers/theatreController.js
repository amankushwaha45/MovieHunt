const Theatre = require("../models/Theatre");






const getTheatres = async(req,res)=>{


try{


const theatres = await Theatre.find();



res.status(200).json({

success:true,

count:theatres.length,

theatres

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};












const addTheatre = async(req,res)=>{


try{


const theatre = await Theatre.create(

req.body

);



res.status(201).json({

success:true,

message:"Theatre Added Successfully",

theatre

});



}


catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};











const getTheatresByCity = async(req,res)=>{


try{


const {city}=req.params;



const theatres = await Theatre.find({

city:{

$regex:city,

$options:"i"

}

});






res.status(200).json({

success:true,

count:theatres.length,

theatres

});



}


catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};











const updateTheatre = async(req,res)=>{


try{


const theatre = await Theatre.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true

}

);





if(!theatre){


return res.status(404).json({

success:false,

message:"Theatre not found"

});


}






res.status(200).json({

success:true,

message:"Theatre Updated Successfully",

theatre

});



}



catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};












const deleteTheatre = async(req,res)=>{


try{


const theatre = await Theatre.findByIdAndDelete(

req.params.id

);






if(!theatre){


return res.status(404).json({

success:false,

message:"Theatre not found"

});


}







res.status(200).json({

success:true,

message:"Theatre Deleted Successfully"

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


getTheatres,

addTheatre,

getTheatresByCity,

updateTheatre,

deleteTheatre


};