const Joi = require("joi"); //it's a class
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, match: /.*[a-zA-Z ].*/ },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    match: /.*[a-zA-Z ].*/,
  },
  adress: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  isAdmin: { type: Boolean, required: true },
  type: {
    type: String,
    enum: ["student", "professor", "admin"],
    default: "",
  },
});
userSchema.methods.generateAuth = function () {
  return jwt.sign(
    { _id: this._id, type: this.type, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};
const User = mongoose.model("user", userSchema);

function validateUser(userverify) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(15).required(),
    lastname: Joi.string().min(4).max(15).required(),
    adress: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
    isAdmin: Joi.boolean().required(),
    type: Joi.string().valid("student", "professor", "admin"),
  });
  return schema.validate(userverify);
};
exports.validate = validateUser;
exports.userSchema = userSchema;
exports.User = User;

