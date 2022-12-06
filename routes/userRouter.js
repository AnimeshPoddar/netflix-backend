const express = require("express");
const { updateUser, deleteUser, getAllUsers, getUserDetails } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const router = express.Router();

//Route for updating a user
router.patch("/users/:id", authenticate, updateUser);

//route for deleting a user
//accessible by : admin
router.route("/users/:id").delete(authenticate, checkIsAdmin, deleteUser);

//route for getting all users
//accessible by : admin
router.route("/users").get(authenticate, checkIsAdmin, getAllUsers);

//route for getting a single user details
//accessible by : user
router.route("/users/:id").get(authenticate, getUserDetails);

module.exports = router;
