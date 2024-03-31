const validator = require("../../../middlewares/validator");
const createUserJoiSchema = require("../joiSchemas/createUser.joiSchema");
const userControler = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/", validator(createUserJoiSchema), userControler.createUser);

module.exports = router;
