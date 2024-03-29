const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string().min(1).max(255),
  author: Joi.string().min(1).max(255),
  isbn: Joi.string().min(1).max(13),
  quantity: Joi.number().integer().min(1).max(Number.MAX_SAFE_INTEGER),
  shelf_location: Joi.string().min(1).max(255),
});
