const jwt = require("jsonwebtoken");


 

  
    const generageToken = (uid) => {
        
      return  jwt.sign({ userId:uid }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
    }

    

module.exports = generageToken;