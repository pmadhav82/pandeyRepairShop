const allowedOrigins = ["http://localhost:3ooo", "http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    callback(null, true)   
    }else {
        callback(new Error("Not allowed by CORS"))
    }
  },
  Credential: true,
  optionsSuccessStatus:200
};

module.exports = corsOptions;
