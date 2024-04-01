const Joi = require("joi");

const createBorrowerSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  email: Joi.string().min(1).max(255).email().required(),
});

module.exports = createBorrowerSchema;
