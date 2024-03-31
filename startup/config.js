const config = require("config");

module.exports = function () {
  if (!config.get("jwt")) {
    throw new Error("jwt settings are not found");
  }

  if (!config.get("db")) {
    throw new Error("database settings are not found");
  }
};
