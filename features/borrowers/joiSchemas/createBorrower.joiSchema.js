const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  email: Joi.string().min(1).max(255).email().required(),
});
