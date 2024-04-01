const Joi = require("joi");

const updateBorrowerSchema = Joi.object({
  name: Joi.string().min(1).max(255),
  email: Joi.string().min(1).max(255).email(),
}).min(1);

module.exports = updateBorrowerSchema;
