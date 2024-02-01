require("dotenv").config();
const express = require('express');
const  path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const {logger, logEvents} = require("./middleware/logger");
const corsOptions = require("./config/allowedOrigins");
const errorHandeler = require("./middleware/errorHandeler")
const userRouter = require('./routes/userRouter');
const rootRouter = require("./routes/rootRouter");
const noteRouter = require("./routes/noteRouter")
const connectDB = require("./config/dbConnect");

const app = express();
const PORT =  process.env.PORT || 8000;


app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use("/", rootRouter);
app.use('/user', userRouter);
app.use("/note", noteRouter);

app.all("*",(req,res)=>{
    res.json({message:"Page not found"})
})

app.use(errorHandeler);



connectDB();

mongoose.connection.once("open", ()=>{
    console.log("connected to database");
    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}` );
    })
})


mongoose.connection.on("error", (err)=>{
    console.log(err.message);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrorLog.log")
})

