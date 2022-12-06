const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.authenticate = async (req, res, next) => {
  try {
    // console.log("user", req.headers);
    const authHeader = req.header("Authorization").replace(`Bearer `, "");

    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = authHeader;
    return next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: `Not authorized to perform this action.` });
  }
};
