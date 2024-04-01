const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.isValidPassword = function (password, user) {
  return bcrypt.compare(password, user.password);
};

module.exports.generateAccessToken = function (user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    config.get("jwt.secret"),
    { expiresIn: config.get("jwt.expireIn") }
  );
};
