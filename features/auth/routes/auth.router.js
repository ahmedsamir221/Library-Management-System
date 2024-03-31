const validator = require("../../../middlewares/validator");
const loginJoiSchema = require("../joiSchemas/login.joiSchema copy");
const authControler = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/", validator(loginJoiSchema), authControler.authenticateUser);

module.exports = router;
