const rateLimit = require("express-rate-limit");
const {logEvents} = require("../middleware/logger");
const loginLimiter = rateLimit({
windowMs:60*1000,
max:4,
message:"Too many login attempts, try again after 60 second",
handler:(req,res,next,options) =>{
    res.status(options.statusCode).json({message:options.message});
    throw new Error(`Too many login attempts, try again after 60 second`);
},
standardHeaders:true,
legacyHeaders:false
})


module.exports = loginLimiter;