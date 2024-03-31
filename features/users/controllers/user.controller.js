const userService = require("../services/user.service");
const {
  generateSuccessResponse,
  generatefailureResponse,
} = require("../../../utils/endUserResponses");

module.exports.createUser = async (req, res) => {
  let user = await userService.getUserByEmail(req.body.email);
  if (user)
    return res
      .status(400)
      .send(generatefailureResponse("email is already exsit"));

  user = await userService.createUser(req.body);
  res.status(201).send(generateSuccessResponse(user));
};
