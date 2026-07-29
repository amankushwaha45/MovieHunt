const multer = require("multer");

const storage = multer.diskStorage({


destination:(req,file,cb)=>{


cb(
null,
"uploads/movies"
);


},



filename:(req,file,cb)=>{


const uniqueName =

Date.now()
+
"-"
+
file.originalname.replace(/\s+/g,"_");

cb(
null,
uniqueName
);


}


});


const fileFilter = (req,file,cb)=>{


if(file.mimetype.startsWith("image")){


cb(null,true);


}

else{


cb(

new Error("Only image files allowed"),

false

);


}


};





const upload = multer({


storage,


fileFilter,


limits:{


fileSize:5 * 1024 * 1024


}


});

module.exports = upload;