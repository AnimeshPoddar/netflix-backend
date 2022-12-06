const app = require("./app");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
dotenv.config();

connectDB(); //Connecting with mongodb database

//Starting the server-----------
app.listen(process.env.PORT, () => {
  console.log(`Server is started at port ${process.env.PORT}`);
});
