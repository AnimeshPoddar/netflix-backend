const express = require("express");
const { getAllUsers } = require("../controllers/adminController");
const router = express.Router();

// router.route("/admin/users").get(getAllUsers);

module.exports = router;