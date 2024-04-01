const Joi = require("joi");

const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])[^\s]{6,255}$/;

const message =
  "Strong passwords require at least 6 characters with a mix of lowercase, uppercase letters, numbers, and symbols.";

const createUserSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  email: Joi.string().min(1).max(255).email().required(),
  password: Joi.string()
    .min(6)
    .max(255)
    .required()
    .pattern(passwordPattern)
    .message(message),
});

module.exports = createUserSchema;
