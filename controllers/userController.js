const { use } = require("../app");
const User = require("../models/Users");

//Controller for user login
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findIdByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    const { password, ...info } = user._doc;
    res.status(201).json({
      success: true,
      message: `User is signed in successfully.`,
      token,
      info,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Controller for registering a new user----------------------
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token = await newUser.generateAuthToken();
    res
      .status(200)
      .json({ success: true, message: `User registered successfully.`, token });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

//Controller for updating a user's profile
exports.updateUser = async (req, res) => {
  if (req.user._id == req.params.id) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["username", "email", "isAdmin"];
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates." });
    }
    updates.forEach((update) => (req.user[update] = req.body[update]));
    try {
      await req.user.save();
      res.status(201).json({ message: "Profile updated successfully." });
    } catch (err) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.json({ message: `You can update only your account.` });
  }
};

//controller for deleting an user account
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }
  await user.remove();
  res.status(201).json({ message: "User deleted successfully." });
};

//Controller for getting all users
//accessible by : admin
exports.getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find({ isAdmin: false }).limit(query).sort({ _id: -1 })
      : await User.find({ isAdmin: false }).sort({ _id: -1 });
    res.status(201).json({
      message: "Successful",
      users,
    });
  } catch (err) {
    res.status(404).json({
      message: "Not fulfilled.",
      error: error.message,
    });
  }
};

//controller for getting a single user details----
// accessible by : user
exports.getUserDetails = async (req, res) => {
  try {
    if (req.user._id == req.params.id) {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }
      res.status(201).json({
        user,
      });
    } else {
      return res.status(404).json({
        message: "User not found.",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};

//Controller for fetching the user stats from the last year
// accessible by : admin
exports.fetchStatsUser = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
