const express = require("express");

const router = express.Router();



const {


addShowtime,

getShowtimes,

getShowtimesByMovie,

getShowtimeById,

updateShowtime,

deleteShowtime


}=require("../controllers/showtimeController");





// ADD
router.post(
"/",
addShowtime
);




// ALL
router.get(
"/",
getShowtimes
);




// MOVIE SHOWS

router.get(
"/movie/:movieId",
getShowtimesByMovie
);




// SINGLE SHOW

router.get(
"/:id",
getShowtimeById
);




// UPDATE

router.put(
"/:id",
updateShowtime
);




// DELETE

router.delete(
"/:id",
deleteShowtime
);



module.exports=router;