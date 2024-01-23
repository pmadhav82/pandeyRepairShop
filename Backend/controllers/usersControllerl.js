const User = require("../modules/User");
const Note = require("../modules/Note");
const bcrypt = require("bcrypt");
const asyncHandeler = require("express-async-handler");

// get all users
const getAllUsers = asyncHandeler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

// create user

const createNewUser = asyncHandeler(async (req, res) => {
  const { username, password, roles } = req.body;
  
  // validate data
  if (!username || !password || !roles|| !Array.isArray(roles)) {
 
    return res.status(400).json({ message: "All fields are required" });
  }

  //check for dublicate user
  const dublicate = await User.findOne({ username }).lean().exec();
  if (dublicate) {
    return res.status(400).json({ message: "Dublicate username" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user object
  const userObject = {
    username,
    password: hashedPassword,
    roles,
  };

  // create new user and save it database

  const newUser = await User.create(userObject);

  if (newUser) {
    res.status(201).json({ message: `New user ${username} is created` });
  } else {
    res.status(400).json({ message: " Invalid user data received" });
  }
});
   
// update user

const updateUser = asyncHandeler(async (req, res) => {
  const { id, password, username, roles, isActive } = req.body;

  if (!id || !username || !roles.length || typeof isActive !== "boolean") {
    return res
      .status(400)
      .json({ message: "All field except password are required to fill" });
  }
  
  //Does user exist to update?
const user = await User.findById(id).exec();

if(!user){
    return res
    .status(400)
    .json({message:"User is not found"})
}
// check for dublicate username
const dublicate = await User.findOne({username}).lean().exec();
// update user details
if(dublicate && dublicate?._id.toString()!==id){
return res
.status(400)
.json({message:"Dublicate username"})
}
user.username = username,
user.roles = roles,
user.isActive = isActive

// if new password is provided hash it and update it
if(password){
    user.password = await bcrypt.hash(password,10);
}

const updatedUser = await user.save();
res.status(200).json({message:`${updatedUser.username} is updated`})

});


const deleteUser = asyncHandeler(async (req, res)=>{
const {id} = req.body;
if(!id){
    return res
    .status(400)
    .json({message:"Id is required"})
}

// Does the user still have assigned notes?
const note = await Note.findOne({user:id}).lean().exec();
console.log(note);
if(note){
    return res
    .status(400)
    .json({message : "User still have assigned notes"})
}

// find user to delete
const user = await User.findById(id);
if(!user){
    return res
    .status(400)
    .json({message: "User not found"})
}

const success = await user.deleteOne();
res.json({message:`${user.username} is deleted`})

})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}