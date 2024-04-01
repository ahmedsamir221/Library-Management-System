// create validation middleware using joi schema
const validator = require("../../../middlewares/validator");
const createUserJoiSchema = require("../joiSchemas/createUser.joiSchema");
const userControler = require("../controllers/user.controller");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/", validator(createUserJoiSchema), userControler.createUser);

module.exports = userRouter;
