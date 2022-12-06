const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Welcome to Netflix Backenddcsd.");
});
app.use("/api/v1/auth", authRouter); //Using auth router's endpoint
app.use("/api/v1", adminRouter); //Using adminrouter's endpoint
app.use("/api/v1", userRouter); //Using user router's endpoint

module.exports = app;
