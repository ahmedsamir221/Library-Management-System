const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  author: Joi.string().min(1).max(255).required(),
  isbn: Joi.string().min(1).max(13).required(),
  quantity: Joi.number()
    .integer()
    .min(1)
    .max(Number.MAX_SAFE_INTEGER)
    .required(),
  shelf_location: Joi.string().min(1).max(255).required(),
});
