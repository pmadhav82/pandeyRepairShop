const jwt = require("jsonwebtoken");


 

    const getAccessToken = (userInfo) => {
        const { username, roles, userId } = userInfo;
      
     return   jwt.sign({ username, roles, userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
    }

    const getRefreshToken = (userId) => {
        
      return  jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    }

    

module.exports = {getAccessToken, getRefreshToken};