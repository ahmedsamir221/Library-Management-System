const Joi = require("joi");

const pattern = /^\d{13}$/;
const maxIntegerValue = 2147483647;

const updateBookSchema = Joi.object({
  title: Joi.string().min(1).max(255),
  author: Joi.string().min(1).max(255),
  isbn: Joi.string()
    .pattern(pattern)
    .message("Invalid isbn. Must be a 13-digit number."),
  quantity: Joi.number().integer().min(0).max(maxIntegerValue),
  shelf_location: Joi.string().min(1).max(255),
}).min(1);

module.exports = updateBookSchema;
