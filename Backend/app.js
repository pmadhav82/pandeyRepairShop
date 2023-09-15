const express = require('express');
const  path = require('path');
const cookieParser = require('cookie-parser');
const {logger} = require("./middleware/logger");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
const PORT =  process.env.PORT || 8000;


//app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}` );
})
