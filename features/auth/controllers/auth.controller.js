const authService = require("../services/auth.service");
const {userService} = require('../../users/index')
const {
  generateSuccessResponse,
  generatefailureResponse,
} = require("../../../utils/endUserResponses");

module.exports.authenticateUser = async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (!user)
    return res
      .status(400)
      .send(generatefailureResponse("invalid email or password"));

  if (!(await authService.isValidPassword(req.body.password, user)))
    return res
      .status(400)
      .send(generatefailureResponse("invalid email or password"));

  const accesstoken = authService.generateAccessToken(user);

  res.send(generateSuccessResponse({ accesstoken }));
};
