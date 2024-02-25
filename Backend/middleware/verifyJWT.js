const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer")) return res.status(401).json({ message: "Unauthorized" })
const token = authHeader.split(" ")[1];
jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(error, decoded)=>{
    if(error) return res.status(403).json({message:"Forbidden", error});
  const {userId, roles, username} = decoded;
  
  req.username = username;
  req.userId = userId;
  req.roles = roles;

  next()
})


}
module.exports = verifyJWT;