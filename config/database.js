const mongoose = require("mongoose");


//Function for connecting database
exports.connectDB = ()=>{
    mongoose.connect(`${process.env.MONGODB_URI}`).then((data)=>{
        console.log(`Database is connected successfully.`)
    }).catch((err)=>{
        console.log(err);
    })
}
