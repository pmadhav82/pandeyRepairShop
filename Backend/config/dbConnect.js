const mongoose = require("mongoose");

const {logEvents} = require("../middleware/logger");

const connectDB = async ()=>{

    try{
await mongoose.connect(process.env.MONGO_DB_URL);
    }catch(err){
    console.log(err.message);
    }
}

module.exports = connectDB;