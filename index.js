const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const express = require("express");
const app = express();
const winston = require("winston");
const config = require("config");
const cors = require("cors");


app.enable("trust proxy");
app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
require("./startups/config")();

require("./startups/connectdb")();
require("./startups/routes")(app, express);


const port = process.env.port || config.get("port");
const server = app.listen(port, () =>
  winston.info(`listening on port ${port}...`)
);
module.exports = server;
