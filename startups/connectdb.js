const config = require("config");
const mongose = require("mongoose");
const winston = require("winston");
module.exports = function () {
  const db = config.get("db");
  mongose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info(`connected to ${db}`))
    .catch(() => winston.warn(`failed coonection to ${db}`));
};
