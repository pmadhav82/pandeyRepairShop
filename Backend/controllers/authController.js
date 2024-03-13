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
  const token = generageToken(userInfo.userId);



  res.cookie("jwt", token, {
    httpOnly:true,
    secure:true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });


  
  res.json({ userInfo });
});

// @desc Logout user
// @route POST /auth/logout
// @access Public

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies) return res.status();

  res.clearCookie("jwt",{httpOnly:true, secure: true, sameSite:"none"});
  
  res.status(200).json({ message: "Logout successfull" });

};

module.exports = { login, logout };
