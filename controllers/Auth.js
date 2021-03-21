
const { User } = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

function validate(userlogin) {
    const schema = Joi.object({
      adress: Joi.string().email().required(),
      password: Joi.string().min(8).max(20).required(),
    });
    return schema.validate(userlogin);
  }


exports.Authentification=async (req, res) => {
    //for loging user
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
  
    let user = await User.findOne({ adress: req.body.adress });
    if (!user) return res.status(400).send("user is invalid !");
     
    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if (!validpassword) return res.status(400).send("password is invalid !");
    const token = user.generateAuth(); //generating json web token using user's id and private key
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(token);
  }