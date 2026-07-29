const express = require("express");

const router = express.Router();



const {

getAllUsers,

getUserById,

deleteUser,

updateUserRole


}=require("../controllers/userController");






// GET ALL USERS

router.get(

"/",

getAllUsers

);






// GET SINGLE USER

router.get(

"/:id",

getUserById

);






// DELETE USER

router.delete(

"/:id",

deleteUser

);






// UPDATE ROLE

router.put(

"/:id/role",

updateUserRole

);






module.exports = router;