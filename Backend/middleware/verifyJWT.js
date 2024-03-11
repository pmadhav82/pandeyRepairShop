const jwt = require("jsonwebtoken")
const User = require("../modules/User");
const verifyJWT = (req, res, next) => {
const asyncHandeler = require("express-async-handler");
  const cookies = req.cookies;

  if(!cookies?.jwt) return res.status(401).json({message:"Unauthorized"});

const token = cookies.jwt;



jwt.verify(token, process.env.TOKEN_SECRET,asyncHandeler(async(err, decoded)=>{
if(err) return res.status(403).json({message:"Forbidden"})

const foundUser = await User.findById({_id:decoded.userId}).exec();
if(!foundUser) return res.status(401).json({message:"Unauthorized"});
const userInfo = {username:foundUser.username, roles:foundUser.roles, userId: foundUser._id.toString()}

req.userInfo = userInfo;
next()


}))


}



module.exports = verifyJWT;