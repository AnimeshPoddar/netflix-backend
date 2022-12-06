const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

//Sign in a user
UserSchema.statics.findIdByCredentials = async(email,password)=>{
  const user = await User.findOne({email});
  if(!user){
    throw new Error("Invalid credentials.");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if(!isMatched){
    throw new Error("Invalid credentials.");
  }
  return user;
}

//Generate an auth token using JWT
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  return token;
};

//Checking for same emails and usernames
UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const keyPattern = Object.keys(error.keyPattern);
    const key = keyPattern[0];
    next(new Error(`${key} already taken!`));
  } else {
    next();
  }
});

//Hashing a user password
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
