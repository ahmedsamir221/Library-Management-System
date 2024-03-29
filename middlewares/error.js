const winston = require("winston");
const { generatefailureResponse } = require("../utils/endUserResponses");

module.exports = function (error, req, res, next) {
  const response = generatefailureResponse("internal server error");
  winston.error({
    requestPath: req.path,
    requestBody: req.body,
    response,
    error: error.message,
  });

  res.status(500).send(response);
};
