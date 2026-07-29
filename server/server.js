const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();


const connectDB = require("./config/db");



// ==========================================
// DATABASE CONNECTION
// ==========================================

connectDB()
.then(()=>{

    console.log("✅ MongoDB Connected");

})
.catch((error)=>{

    console.log(
        "❌ Database Error:",
        error.message
    );

});




// ==========================================
// CREATE APP
// ==========================================

const app = express();




// ==========================================
// MIDDLEWARE
// ==========================================


app.use(

cors()

);



app.use(

express.json()

);




// ==========================================
// STATIC FILES
// MOVIE POSTERS
// ==========================================


app.use(

"/uploads",

express.static("uploads")

);




// ==========================================
// IMPORT ROUTES
// ==========================================


const authRoutes = require("./routes/authRoutes");


const movieRoutes = require("./routes/movieRoutes");


const theatreRoutes = require("./routes/theatreRoutes");


const showtimeRoutes = require("./routes/showtimeRoutes");


const bookingRoutes = require("./routes/bookingRoutes");


const seatRoutes = require("./routes/seatRoutes");


const cityRoutes = require("./routes/cityRoutes");


const adminRoutes = require("./routes/adminRoutes");


const userRoutes = require("./routes/userRoutes");




// ==========================================
// API ROUTES
// ==========================================



// USER AUTH

app.use(

"/api/auth",

authRoutes

);




// CITIES

app.use(

"/api/cities",

cityRoutes

);




// SEATS

app.use(

"/api/seats",

seatRoutes

);




// MOVIES

app.use(

"/api/movies",

movieRoutes

);




// THEATRES

app.use(

"/api/theatres",

theatreRoutes

);




// SHOWTIMES

app.use(

"/api/showtimes",

showtimeRoutes

);




// BOOKINGS

app.use(

"/api/bookings",

bookingRoutes

);




// ADMIN

app.use(

"/api/admin",

adminRoutes

);




// USERS

app.use(

"/api/users",

userRoutes

);






// ==========================================
// HOME ROUTE
// ==========================================


app.get("/",(req,res)=>{


res.send(

"🎬 Movie Booking Backend is Running..."

);


});






// ==========================================
// ERROR HANDLER
// ==========================================


app.use((err,req,res,next)=>{


console.log(

err

);



res.status(500).json({

success:false,

message:err.message

});


});






// ==========================================
// SERVER START
// ==========================================


const PORT = process.env.PORT || 5001;



app.listen(PORT,()=>{


console.log(

`🚀 Server running on http://localhost:${PORT}`

);


});