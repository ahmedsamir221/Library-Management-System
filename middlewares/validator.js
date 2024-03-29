const { generatefailureResponse } = require("../utils/endUserResponses");

module.exports = function (joiSchema) {
  return function (req, res, next) {
    const { error } = joiSchema.validate(req.body);
    if (error)
      return res.status(400).send(generatefailureResponse(error.message));

    next();
  };
};
