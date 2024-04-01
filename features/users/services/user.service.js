const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async function (user, transaction) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;

  const createdUser = await User.create(user, { transaction });
  const userWithoutPassword = createdUser.toJSON();
  delete userWithoutPassword.password;
  return userWithoutPassword;
};

const getUserByEmail = function (email) {
  return User.findOne({ where: { email } });
};

const isEmailExsit = async function (email) {
  const user = await getUserByEmail(email);

  return user ? true : false;
};

module.exports = {
  createUser,
  isEmailExsit,
  getUserByEmail,
};
