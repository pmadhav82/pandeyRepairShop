

const requiredRole = (allowedRoles =["Employee"]) =>{

return(req,res,next) =>{
const {roles} = req.userInfo;

if(!roles || !roles.some((role)=> allowedRoles.includes(role)))
return res.status(401).json({message:"Unauthorized"})

next()
}
}

module.exports = requiredRole;