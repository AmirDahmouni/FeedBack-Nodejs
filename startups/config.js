const config = require("config");

module.exports = function () {
  if (
    !config.get("jwtPrivateKey") &&
    !config.get("db") &&
    !config.get("port")
  ) {
    throw new Error("fatal error in configuration");
  }
};
