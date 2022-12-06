const User = require("../models/Users");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    if (users) {
      return res.status(201).json({ success: true, users });
    } else {
      return res.status(201).json({ success: true, message: "No users found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
