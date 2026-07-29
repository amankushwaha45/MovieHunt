const express = require("express");

const router = express.Router();



const {

getTheatres,

addTheatre,

getTheatresByCity,

updateTheatre,

deleteTheatre


}=require("../controllers/theatreController");







// GET ALL

router.get(

"/",

getTheatres

);







// ADD

router.post(

"/",

addTheatre

);







// CITY SEARCH

router.get(

"/city/:city",

getTheatresByCity

);







// UPDATE

router.put(

"/:id",

updateTheatre

);







// DELETE

router.delete(

"/:id",

deleteTheatre

);







module.exports = router;