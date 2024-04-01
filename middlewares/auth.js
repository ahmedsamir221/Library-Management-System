const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const accessToken = req.header("x-auth-token");
  if (!accessToken)
    return res
      .status(401)
      .send(
        "Authorization failed: Missing access token. Please provide a valid access token in the request header x-auth-token."
      );

  try {
    const user = jwt.verify(accessToken, config.get("jwt.secret"));
    req.user = user;
    next();
  } catch (ex) {
    res
      .status(401)
      .send(
        "Authorization failed: Access token is invalid. Please re-authenticate or obtain a valid token."
      );
  }
};
