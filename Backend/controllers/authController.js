
const asyncHandeler = require("express-async-handler");

const login = asyncHandeler((req,res)=>{
    res.status(404);
    throw new Error("This is error message");

})


module.exports = {login}
