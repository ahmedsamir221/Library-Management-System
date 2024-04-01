const Joi = require("joi");

const pattern = /^\d{13}$/;
const maxIntegerValue = 2147483647;

const createBookSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  author: Joi.string().min(1).max(255).required(),
  isbn: Joi.string()
    .required()
    .pattern(pattern)
    .message("Invalid isbn. Must be a 13-digit number."),
  quantity: Joi.number().integer().min(0).max(maxIntegerValue).required(),
  shelf_location: Joi.string().min(1).max(255).required(),
});

module.exports = createBookSchema;
