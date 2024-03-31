require("express-async-errors");
const winston = require("winston");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "logs/exceptions.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );

  winston.rejections.handle(
    new winston.transports.File({ filename: "logs/rejections.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );

  winston.add(new winston.transports.File({ filename: "logs/logFile.log" }));
  // winston.add(
  //   new winston.transports.Console({ colorize: true, prettyPrint: true })
  // );
};
