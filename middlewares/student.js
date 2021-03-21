const config = require("config");
module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) return next();
  if (req.user.type !== "student") return res.status(403).send("access denied");
  next();
};
