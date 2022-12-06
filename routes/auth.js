const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");


router.route("/register").post(registerUser); //Route for registering a new user
router.route("/login").post(loginUser)//Route for user login


module.exports = router;
