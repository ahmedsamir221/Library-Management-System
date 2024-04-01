const userService = require("../services/user.service");
const {
  generateSuccessResponse,
  generatefailureResponse,
} = require("../../../utils/endUserResponses");

module.exports.createUser = async (req, res) => {
  const transaction = await global.sequelize.transaction();
  try {
    if (await userService.isEmailExsit(req.body.email))
      return res
        .status(400)
        .send(generatefailureResponse("email is already exsit"));

    const createdUser = await userService.createUser(req.body, transaction);

    await transaction.commit();
    res.status(201).send(generateSuccessResponse(createdUser));
  } catch (ex) {
    await transaction.rollback();
    // throw error to be logged and handled by error middleware
    throw new Error(ex);
  }
};
