const { logEvents } = require("./logger");

const errorHandeler = (err, req, res, next) => {
  logEvents(
    `${err.name}:${err.message}\t ${req.method}\t${req.url}\t ${req.headers.origin}`,
    "error.log"
  );

  console.log(err.stack);

const status = res.stackCode ? res.statusCode : 500;

res.status(status);

res.json({message:err.message});

};

module.exports = errorHandeler;
