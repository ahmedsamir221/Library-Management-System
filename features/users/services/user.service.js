const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.createUser = async function (user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await User.create(user);
  user = user.toJSON();
  delete user["password"];
  return user;
};

module.exports.getUserByEmail = function (email) {
  return User.findOne({ where: { email } });
};
