const asyncHandeler = require("express-async-handler");
const User = require("../modules/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generageToken = require("../utils/generateToken");

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandeler(async (req, res) => {

  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "All fields are required to fill" });


    
  // check for user
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.status(401).json({ message: "User not found" });
  if (!foundUser.isActive)
    return res.status(401).json({ message: "Account has been deactivited" });

  // check for password
  const isValidPassword = await bcrypt.compare(password, foundUser.password);
  if (!isValidPassword)
    return res.status(401).json({ message: "Password is incorrect" });



  const userInfo = {
    username: foundUser.username,
    roles: foundUser.roles,
    userId: foundUser._id,
  };
  


  //generate tokens
  const {accessToken, refreshToken} = generageToken(userInfo); 
  //const token = generageToken(userInfo.userId);



  res.cookie("jwt", refreshToken, {
    httpOnly:true,
    secure:true,
    sameSite: "none",
    maxAge: 2*60*1000
  });


  
  res.json({ accessToken });
});



// @desc Refresh
// @route GET /auth/refresh
// @access Public 
const refresh = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,asyncHandeler(async(err, decoded)=>{
    if(err) return res.status(403).json({message: err})
    
    const foundUser = await User.findById({_id:decoded.userId}).exec();
    if(!foundUser) return res.status(401).json({message:"Unauthorized"});
    const userInfo = {username:foundUser.username, roles:foundUser.roles, userId: foundUser._id.toString()}
    
  const {accessToken} = generageToken(userInfo);

  res.json({accessToken})  
    
    }))


}






// @desc Logout user
// @route POST /auth/logout
// @access Public

function logout(req, res) {
  const cookies = req.cookies;
  if (!cookies) return res.status();

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });

  res.status(200).json({ message: "Logout successfull" });

}

module.exports = { login, logout, refresh};
