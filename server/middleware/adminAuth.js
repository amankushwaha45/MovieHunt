const jwt = require("jsonwebtoken");



const adminAuth = (req,res,next)=>{


try{




const token = req.headers.authorization;





if(!token){


return res.status(401).json({


success:false,


message:"No token provided"


});


}










const actualToken = token.startsWith("Bearer ")

?

token.split(" ")[1]

:

token;










const decoded = jwt.verify(

actualToken,

process.env.JWT_SECRET

);












if(decoded.role !== "admin"){


return res.status(403).json({


success:false,


message:"Admin access denied"


});


}











req.admin = decoded;






next();



}

catch(error){


return res.status(401).json({


success:false,


message:"Invalid token"


});


}



};






module.exports = adminAuth;