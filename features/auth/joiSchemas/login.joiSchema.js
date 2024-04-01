const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().min(1).max(255).email().required(),
  password: Joi.string().min(6).max(255).required(),
});

module.exports = loginSchema;
