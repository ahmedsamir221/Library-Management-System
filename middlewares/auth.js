const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const accessToken = req.header("x-auth-token");
  if (!accessToken)
    return res.status(401).send("unauthorized, access token is missing");

  try {
    const user = jwt.verify(accessToken, config.get("jwt.secret"));
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("invalid access token");
  }
};
