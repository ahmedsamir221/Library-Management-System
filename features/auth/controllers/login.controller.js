const loginService = require("../services/login.service");
const { userService } = require("../../users/index");
const {
  generateSuccessResponse,
  generatefailureResponse,
} = require("../../../utils/endUserResponses");

module.exports.authenticateUser = async (req, res) => {
  if (!(await userService.isEmailExsit(req.body.email)))
    return res
      .status(400)
      .send(generatefailureResponse("invalid email or password"));

  const user = await userService.getUserByEmail(req.body.email);
  if (!(await loginService.isValidPassword(req.body.password, user)))
    return res
      .status(400)
      .send(generatefailureResponse("invalid email or password"));

  const accesstoken = loginService.generateAccessToken(user);

  res.send(generateSuccessResponse({ accesstoken }));
};
