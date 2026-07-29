const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("./models/Admin");

require("dotenv").config();



mongoose.connect(process.env.MONGO_URI)
.then(async()=>{


console.log("MongoDB Connected");



const password = await bcrypt.hash(

"admin123",

10

);




const admin = await Admin.create({

name:"Movie Hunt Admin",

email:"admin@gmail.com",

password:password,

phone:"9999999999",

role:"admin",

isVerified:true

});





console.log("Admin Created");

console.log(admin);



process.exit();



})
.catch(error=>{


console.log(error);

});