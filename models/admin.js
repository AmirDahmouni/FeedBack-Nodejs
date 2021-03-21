const Joi = require("joi"); //it's a class
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  feedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feedback",
    },
  ],
  userData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
const Admin = mongoose.model("admin", adminSchema);
function validateadmin(adminverify) {
  const schema = Joi.object({
    feedbacks: Joi.array().items(Joi.objectId()).required(),
    userData: Joi.objectId().required(),
  });
  return schema.validate(adminverify);
}
exports.Admin = Admin;
exports.validate = validateadmin;
