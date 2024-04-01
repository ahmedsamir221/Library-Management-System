const Joi = require("joi");

const maxIntegerValue = 2147483647;

const isValidPositaveInteger = function (number) {
  const schema = Joi.number().integer().min(1).max(maxIntegerValue).required();
  const { value, error } = schema.validate(number);

  return !error;
};

module.exports = {
  isValidPositaveInteger,
};
