const _ = require("lodash");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


exports.getAllUsers= async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (ex) {
      next(ex);
    }
  }
exports.getUserById=async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
      if (!user) return res.status(400).send("user not found");
      return res.send(user);
    } catch (ex) {
      next(ex);
    }
  }
exports.getUserByToken=async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      res.send(user);
    } catch (ex) {
      next(ex);
    }
  }

  exports.removeUser=async (req, res) => {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.id });
      if (!user) return res.status(400).send("User not found !");
      return res.send(user);
    } catch (ex) {
      next(ex);
    }
  }

  exports.registerNewUser=async (req, res) => {
    //for registring user
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
    let user = await User.findOne({ adress: req.body.adress });
    if (user) return res.status(400).send("user already registred");
    user = new User(
      _.pick(req.body, [
        "name",
        "lastname",
        "adress",
        "password",
        "isAdmin",
        "type",
      ])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuth(); //generating json web token using user's id and private key
    res.header("x-auth-token", token).send(token);
  }
