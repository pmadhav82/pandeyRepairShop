const rateLimit = require("express-rate-limit");
const {logEvents} = require("../middleware/logger");
const loginLimiter = rateLimit({
windowMs:60*1000,
max:4,
message:"Too many login attems, try again after 60 second",
handler:(req,res,next,options) =>{
    logEvents(`Too many login attemts:${req.method} \t ${req.headers.origin}`,"error.log")
    res.status(options.statusCode).json({message:options.message})
},
standardHeaders:true,
legacyHeaders:false
})


module.exports = loginLimiter;