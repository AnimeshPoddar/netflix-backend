const express = require("express");
const {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserDetails,
  fetchStatsUser,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");
const { checkIsAdmin } = require("../middlewares/checkIsAdmin");
const router = express.Router();

//Route for updating a user
router.patch("/:id", authenticate, updateUser);

//route for deleting a user
//accessible by : admin
router.route("/:id").delete(authenticate, checkIsAdmin, deleteUser);

//route for getting all users
//accessible by : admin
router.route("/").get(authenticate, checkIsAdmin, getAllUsers);

//route for getting a single user details
//accessible by : user
router.route("/:id").get(authenticate, getUserDetails);

//route to fetch user stats from the last year
//accessible by : admin
router.route("/st/stats").get(authenticate, checkIsAdmin, fetchStatsUser);
module.exports = router;
