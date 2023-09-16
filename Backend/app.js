require("dotenv").config();
const express = require('express');
const  path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const {logger, logEvents} = require("./middleware/logger");
const corsOptions = require("./config/allowedOrigins");
const errorHandeler = require("./middleware/errorHandeler")
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connectDB = require("./config/dbConnect");

const app = express();
const PORT =  process.env.PORT || 8000;


app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.use(errorHandeler);



connectDB();

mongoose.connection.once("open", ()=>{
    console.log("connected to database");
})


mongoose.connection.on("error", (err)=>{
    console.log(er.message);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrorLog.log")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}` );
})
