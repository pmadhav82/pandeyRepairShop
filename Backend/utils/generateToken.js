const jwt = require("jsonwebtoken");


 

  
    const generageToken = (userInfo) => {
      const accessToken =  jwt.sign({ userInfo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
      const refreshToken = jwt.sign({ userId: userInfo.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2m" });

      return{accessToken, refreshToken}
    }

  

module.exports = generageToken