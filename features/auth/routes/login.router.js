// create validation middleware using joi schema
const validator = require("../../../middlewares/validator");
const loginJoiSchema = require("../joiSchemas/login.joiSchema");
const loginControler = require("../controllers/login.controller");
const express = require("express");
const loginRoute = express.Router();

loginRoute.post(
  "/",
  validator(loginJoiSchema),
  loginControler.authenticateUser
);

module.exports = loginRoute;
